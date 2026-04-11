import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAppStore } from '../store/useAppStore'
import { useToast } from '../components/Toast'
import { useAnalysis } from '../hooks/useAnalysis'
import { DiaryAnalysis } from '../components/DiaryAnalysis'
import { CONDITION_LABELS } from '../engine/riskEngine'
import type { Condition } from '../engine/riskEngine'
import { Trash2, BookOpen, FileDown } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Article {
  id: string
  title: string
  condition_tags: string[]
}

interface LogEntry {
  id: string
  food_name: string
  timestamp: Timestamp
  risks: { gout: number; lipids: number; diabetes: number; hypertension: number }
}

const RISK_COLOR = (score: number) =>
  score >= 4 ? 'text-red-700 bg-red-50 ring-1 ring-red-200' : score >= 2 ? 'text-yellow-700 bg-yellow-50 ring-1 ring-yellow-200' : 'text-green-700 bg-green-50 ring-1 ring-green-200'

const RISK_BORDER = (score: number) =>
  score >= 4 ? 'border-l-red-400' : score >= 2 ? 'border-l-yellow-400' : 'border-l-green-400'

// const BAR_COLOR = (score: number) =>
//   score >= 4 ? 'bg-red-400' : score >= 2 ? 'bg-yellow-400' : 'bg-green-400'

// Get past 7 days labels
function getPast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d
  })
}

function getDateKey(date: Date) {
  return date.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })
}

export function Diary() {
  const { user, conditions } = useAppStore()
  const { addToast } = useToast()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [pdfLoading, setPdfLoading] = useState(false)
  const { result: analysisResult, loading: analysisLoading, error: analysisError, run: runAnalysis, canAnalyze } = useAnalysis()

  const fetchLogs = async () => {
    if (!user) return
    setLoading(true)
    const q = query(
      collection(db, 'users', user.uid, 'food_logs'),
      orderBy('timestamp', 'desc'),
      limit(30)
    )
    const snap = await getDocs(q)
    setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as LogEntry)))
    setLoading(false)
  }

  useEffect(() => { fetchLogs() }, [user])

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('created_at', 'desc'))
    getDocs(q).then((snap) =>
      setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article)))
    )
  }, [])

  const handleDelete = async (log: LogEntry) => {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'food_logs', log.id))
    setLogs((prev) => prev.filter((l) => l.id !== log.id))
    addToast(`已刪除「${log.food_name}」`, 'info')
  }

  const handleAnalyze = () => {
    const past7Start = new Date()
    past7Start.setDate(past7Start.getDate() - 6)
    past7Start.setHours(0, 0, 0, 0)
    const recentLogs = logs.filter((l) => l.timestamp?.toDate() >= past7Start)
    runAnalysis(recentLogs.map((l) => ({ food_name: l.food_name, risks: l.risks })), conditions)
  }

  const handleExportPDF = async () => {
    const past7Start = new Date()
    past7Start.setDate(past7Start.getDate() - 6)
    past7Start.setHours(0, 0, 0, 0)
    const recentLogs = logs.filter((l) => l.timestamp?.toDate() >= past7Start)
    const logsForAI = recentLogs.map((l) => ({ food_name: l.food_name, risks: l.risks }))

    const highRiskFreq: Record<string, number> = {}
    for (const log of recentLogs) {
      if (Math.max(log.risks.gout, log.risks.lipids, log.risks.diabetes, log.risks.hypertension) >= 4) {
        highRiskFreq[log.food_name] = (highRiskFreq[log.food_name] ?? 0) + 1
      }
    }
    const highRiskFoods = Object.entries(highRiskFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }))

    const relatedArticles = articles.filter((a) =>
      a.condition_tags?.some((tag) => conditions.includes(tag as Condition))
    )

    setPdfLoading(true)
    try {
      let result = analysisResult
      if (!result) {
        result = await runAnalysis(logsForAI, conditions)
      }
      if (!result) return

      const now = new Date()
      const start = new Date()
      start.setDate(now.getDate() - 6)
      const conditionLabels = conditions.map((c) => CONDITION_LABELS[c]?.zh ?? c)

      const { downloadReport } = await import('../components/ReportPDF')
      await downloadReport({
        reportDate: now.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }),
        dateRange: `${start.toLocaleDateString('zh-TW')} – ${now.toLocaleDateString('zh-TW')}`,
        conditions: conditionLabels,
        chartData,
        highRiskFoods,
        analysis: result,
        relatedArticles,
      })
    } catch {
      addToast('PDF 生成失敗，請稍後再試', 'error')
    } finally {
      setPdfLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">飲食日記</h2>
        <p className="text-gray-500 mb-6">登入後即可記錄每日飲食，追蹤飲食風險趨勢</p>
        <button
          onClick={() => useAppStore.getState().openLoginModal()}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          立即登入
        </button>
      </div>
    )
  }

  // Group by date
  const grouped: Record<string, LogEntry[]> = {}
  for (const log of logs) {
    const date = log.timestamp?.toDate().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' }) ?? '未知日期'
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(log)
  }

  const today = new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' })
  const todayLogs = grouped[today] ?? []
  const todayHighRisk = todayLogs.filter((l) =>
    Math.max(l.risks.gout, l.risks.lipids, l.risks.diabetes, l.risks.hypertension) >= 4
  ).length

  // Build 7-day chart data
  const past7 = getPast7Days()
  const chartData = past7.map((d) => {
    const key = d.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' })
    const dayLogs = grouped[key] ?? []
    const highCount = dayLogs.filter((l) =>
      Math.max(l.risks.gout, l.risks.lipids, l.risks.diabetes, l.risks.hypertension) >= 4
    ).length
    return {
      label: getDateKey(d),
      total: dayLogs.length,
      highCount,
      isToday: getDateKey(d) === getDateKey(new Date()),
    }
  })
  const maxTotal = Math.max(...chartData.map((d) => d.total), 1)

  // Derived data for AI analysis and PDF
  const past7Start = new Date()
  past7Start.setDate(past7Start.getDate() - 6)
  past7Start.setHours(0, 0, 0, 0)
  const recentLogs = logs.filter((l) => l.timestamp?.toDate() >= past7Start)

  const relatedArticles = articles.filter((a) =>
    a.condition_tags?.some((tag) => conditions.includes(tag as Condition))
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">飲食日記</h1>
        {!loading && canAnalyze(recentLogs.length, conditions.length) && (
          <button
            onClick={handleExportPDF}
            disabled={pdfLoading}
            className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {pdfLoading ? (
              <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : (
              <FileDown size={16} />
            )}
            匯出報告
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">今日記錄</p>
          <p className="text-3xl font-bold text-gray-900">{todayLogs.length}</p>
          <p className="text-xs text-gray-400">筆</p>
        </div>
        <div className={`border rounded-xl p-4 shadow-sm ${todayHighRisk > 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
          <p className="text-xs text-gray-500 mb-1">今日高風險</p>
          <p className={`text-3xl font-bold ${todayHighRisk > 0 ? 'text-red-600' : 'text-green-600'}`}>{todayHighRisk}</p>
          <p className="text-xs text-gray-400">次</p>
        </div>
      </div>

      {/* 7-day bar chart */}
      {!loading && logs.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-6">
          <p className="text-xs font-semibold text-gray-500 mb-4">近 7 天記錄量</p>
          <div className="flex items-end gap-2 h-20">
            {chartData.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end" style={{ height: '64px' }}>
                  <div
                    className={`w-full rounded-t transition-all ${d.highCount > 0 ? 'bg-red-300' : 'bg-indigo-300'} ${d.isToday ? 'opacity-100' : 'opacity-60'}`}
                    style={{ height: `${Math.round((d.total / maxTotal) * 100)}%`, minHeight: d.total > 0 ? '4px' : '0' }}
                  />
                </div>
                <span className={`text-[10px] ${d.isToday ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Analysis */}
      {!loading && logs.length > 0 && (
        <DiaryAnalysis
          loading={analysisLoading}
          error={analysisError}
          result={analysisResult}
          relatedArticles={relatedArticles}
          conditions={conditions}
          onAnalyze={handleAnalyze}
          logCount={recentLogs.length}
        />
      )}

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 px-4 py-3 animate-pulse h-14" />
          ))}
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">還沒有飲食紀錄</p>
          <Link to="/search" className="text-indigo-600 font-medium hover:underline">前往食物查詢，記錄第一筆</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, entries]) => (
            <div key={date}>
              <h2 className="text-sm font-semibold text-gray-500 mb-3">{date}</h2>
              <div className="space-y-2">
                {entries.map((log) => {
                  const maxScore = Math.max(log.risks.gout, log.risks.lipids, log.risks.diabetes, log.risks.hypertension)
                  return (
                    <div key={log.id} className={`bg-white border border-gray-100 border-l-4 ${RISK_BORDER(maxScore)} rounded-xl px-4 py-3 flex items-center justify-between shadow-sm`}>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{log.food_name}</p>
                        <p className="text-xs text-gray-400">
                          {log.timestamp?.toDate().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${RISK_COLOR(maxScore)}`}>
                          {maxScore >= 4 ? '高風險' : maxScore >= 2 ? '中風險' : '低風險'}
                        </span>
                        <button
                          onClick={() => handleDelete(log)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
