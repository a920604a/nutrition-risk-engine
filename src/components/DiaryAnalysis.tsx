import { Brain, AlertTriangle, BookOpen, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AnalysisResult } from '../lib/api'
import type { Condition } from '../engine/riskEngine'

interface Article {
  id: string
  title: string
  condition_tags: string[]
}

interface Props {
  loading: boolean
  error: string | null
  result: AnalysisResult | null
  relatedArticles: Article[]
  conditions: Condition[]
  onAnalyze: () => void
  logCount: number
}

export function DiaryAnalysis({ loading, error, result, relatedArticles, conditions, onAnalyze, logCount }: Props) {
  const insufficient = logCount < 3
  const noConditions = conditions.length === 0

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain size={18} className="text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-800">AI 飲食分析</h2>
        </div>
        {!result && (
          <button
            onClick={onAnalyze}
            disabled={loading || insufficient || noConditions}
            className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                分析中...
              </>
            ) : '分析'}
          </button>
        )}
      </div>

      {insufficient && (
        <p className="text-xs text-gray-400 text-center py-4">
          至少需要 3 筆飲食記錄才能進行 AI 分析（目前 {logCount} 筆）
        </p>
      )}

      {!insufficient && noConditions && (
        <p className="text-xs text-yellow-600 bg-yellow-50 rounded-lg p-3">
          請先至首頁選擇您的疾病條件，AI 才能給出個人化建議
        </p>
      )}

      {error && (
        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-lg p-3">
          <AlertTriangle size={15} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="space-y-2 mt-2 animate-pulse">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-4/5" />
          <div className="h-3 bg-gray-100 rounded w-3/5 mb-4" />
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>

          {result.riskHighlights.length > 0 && (
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-red-600 mb-2">本週需注意</p>
              <ul className="space-y-1">
                {result.riskHighlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">具體建議</p>
              <ul className="space-y-1.5">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5 text-xs font-bold shrink-0">{i + 1}.</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedArticles.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <BookOpen size={12} /> 相關衛教文章
              </p>
              <div className="space-y-1.5">
                {relatedArticles.slice(0, 3).map((article) => (
                  <Link
                    key={article.id}
                    to="/knowledge"
                    className="flex items-center justify-between text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-lg px-3 py-2 transition-colors"
                  >
                    <span className="line-clamp-1">{article.title}</span>
                    <ChevronRight size={12} className="shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onAnalyze}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            重新分析
          </button>
        </div>
      )}
    </div>
  )
}
