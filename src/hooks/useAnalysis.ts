import { useState, useCallback, useRef } from 'react'
import { analyzeLog, type AnalysisResult } from '../lib/api'
import type { Condition } from '../engine/riskEngine'

interface LogEntry {
  food_name: string
  risks: { gout: number; lipids: number; diabetes: number; hypertension: number }
}

interface UseAnalysisReturn {
  result: AnalysisResult | null
  loading: boolean
  error: string | null
  run: (logs: LogEntry[], conditions: Condition[]) => Promise<AnalysisResult | null>
  canAnalyze: (logCount: number, conditionCount: number) => boolean
}

// Module-level cache — survives re-renders and navigation, clears on page refresh
let cachedResult: AnalysisResult | null = null
let cachedLogCount = -1
let cachedConditionKey = ''

export function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(cachedResult)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const canAnalyze = useCallback((logCount: number, conditionCount: number) => {
    return logCount >= 3 && conditionCount > 0
  }, [])

  const run = useCallback(async (logs: LogEntry[], conditions: Condition[]): Promise<AnalysisResult | null> => {
    const conditionKey = [...conditions].sort().join(',')

    // Return cache if log count and conditions haven't changed
    if (
      cachedResult &&
      cachedLogCount === logs.length &&
      cachedConditionKey === conditionKey
    ) {
      setResult(cachedResult)
      return cachedResult
    }

    // Cancel any in-flight request
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const analysisResult = await analyzeLog({ conditions, foodLogs: logs })

      cachedResult = analysisResult
      cachedLogCount = logs.length
      cachedConditionKey = conditionKey

      setResult(analysisResult)
      return analysisResult
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return null
      const message = err instanceof Error ? err.message : 'AI 分析失敗，請稍後再試'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { result, loading, error, run, canAnalyze }
}
