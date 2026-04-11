import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Heart, ChevronRight, Utensils, Activity, Zap } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { CONDITION_LABELS } from '../engine/riskEngine'
import type { Condition } from '../engine/riskEngine'
import { getStats } from '../lib/api'

const CONDITIONS: Condition[] = ['痛風', '高血脂', '糖尿病', '高血壓']

const CONDITION_EMOJIS: Record<Condition, string> = {
  痛風: '🦵',
  高血脂: '🩸',
  糖尿病: '🍬',
  高血壓: '💊',
}

const CONDITION_COLORS: Record<Condition, { border: string; bg: string; text: string; selectedBorder: string; selectedBg: string; selectedText: string }> = {
  痛風: {
    border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-700',
    selectedBorder: 'border-yellow-500', selectedBg: 'bg-yellow-50', selectedText: 'text-yellow-800',
  },
  高血脂: {
    border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-700',
    selectedBorder: 'border-red-500', selectedBg: 'bg-red-50', selectedText: 'text-red-800',
  },
  糖尿病: {
    border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-700',
    selectedBorder: 'border-orange-500', selectedBg: 'bg-orange-50', selectedText: 'text-orange-800',
  },
  高血壓: {
    border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700',
    selectedBorder: 'border-blue-500', selectedBg: 'bg-blue-50', selectedText: 'text-blue-800',
  },
}

export function Home() {
  const { conditions, toggleCondition, user } = useAppStore()
  const [stats, setStats] = useState<{ food_count: number; condition_count: number } | null>(null)

  useEffect(() => {
    getStats().then(setStats).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen pb-28">
      {/* Hero — dark gradient */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-4">🥗</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Nutrition Guard
          </h1>
          <p className="text-lg text-indigo-200 mb-2">多族群飲食風險管理系統</p>
          <p className="text-indigo-300 max-w-xl mx-auto mb-10">
            食物對不同疾病的影響不同。選擇你的健康條件，即時查詢食物風險，做出更聰明的飲食決策。
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 text-sm text-indigo-200 mb-10">
            <div className="flex items-center gap-1.5">
              <Utensils size={15} />
              <span>{stats ? `${stats.food_count} 種食物` : '…'}</span>
            </div>
            <div className="w-px h-4 bg-indigo-600" />
            <div className="flex items-center gap-1.5">
              <Activity size={15} />
              <span>{stats ? `${stats.condition_count} 種疾病` : '…'}</span>
            </div>
            <div className="w-px h-4 bg-indigo-600" />
            <div className="flex items-center gap-1.5">
              <Zap size={15} />
              <span>即時評估</span>
            </div>
          </div>

          <Link
            to="/search"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-md"
          >
            <Search size={18} />
            開始查詢食物
          </Link>
        </div>
      </section>

      {/* Condition Selector */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-1">選擇你的健康條件</h2>
        <p className="text-sm text-gray-500 mb-5">可多選，系統將依此顯示個人化風險評估</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CONDITIONS.map((c) => {
            const label = CONDITION_LABELS[c]
            const selected = conditions.includes(c)
            const colors = CONDITION_COLORS[c]
            return (
              <button
                key={c}
                onClick={() => toggleCondition(c)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all font-medium text-sm ${
                  selected
                    ? `${colors.selectedBorder} ${colors.selectedBg} ${colors.selectedText} shadow-sm`
                    : `${colors.border} bg-white ${colors.text} hover:${colors.selectedBorder} hover:${colors.selectedBg}`
                }`}
              >
                <span className="text-3xl">{CONDITION_EMOJIS[c]}</span>
                <span>{label.zh}</span>
                <span className="text-xs opacity-60 font-normal">{label.en}</span>
                {selected && <span className="text-xs font-bold">✓ 已選</span>}
              </button>
            )
          })}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-3xl mx-auto px-4 pb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-5">功能一覽</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link to="/search" className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <Search size={24} className="text-indigo-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">食物查詢</h3>
            <p className="text-sm text-gray-500">搜尋任意食物，即時查看各疾病風險等級</p>
            <div className="flex items-center gap-1 text-indigo-600 text-sm mt-3 group-hover:gap-2 transition-all">
              立即查詢 <ChevronRight size={14} />
            </div>
          </Link>

          <Link to="/knowledge" className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <BookOpen size={24} className="text-green-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">知識專區</h3>
            <p className="text-sm text-gray-500">深入了解各疾病的飲食注意事項</p>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-3 group-hover:gap-2 transition-all">
              瀏覽文章 <ChevronRight size={14} />
            </div>
          </Link>

          <Link
            to={user ? '/favorites' : '#'}
            onClick={() => !user && useAppStore.getState().openLoginModal()}
            className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <Heart size={24} className="text-red-400 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">我的收藏</h3>
            <p className="text-sm text-gray-500">收藏常用食物，快速查閱風險</p>
            <div className="flex items-center gap-1 text-red-500 text-sm mt-3 group-hover:gap-2 transition-all">
              {user ? '查看收藏' : '登入使用'} <ChevronRight size={14} />
            </div>
          </Link>
        </div>
      </section>

      {/* Sticky CTA — only when conditions selected */}
      {conditions.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 shadow-lg">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              已選：<span className="font-semibold text-indigo-700">{conditions.map((c) => CONDITION_LABELS[c].zh).join('、')}</span>
            </p>
            <Link
              to="/search"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Search size={15} />
              查詢食物風險
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
