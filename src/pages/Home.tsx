import { Link } from 'react-router-dom'
import { Search, BookOpen, Heart, ChevronRight } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { CONDITION_LABELS } from '../engine/riskEngine'
import type { Condition } from '../engine/riskEngine'

const CONDITIONS: Condition[] = ['gout', 'hyperlipidemia', 'diabetes', 'hypertension']

const CONDITION_EMOJIS: Record<Condition, string> = {
  gout: '🦵',
  hyperlipidemia: '🩸',
  diabetes: '🍬',
  hypertension: '💊',
}

export function Home() {
  const { conditions, toggleCondition, user } = useAppStore()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-green-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-4">🥗</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Nutrition Guard
          </h1>
          <p className="text-lg text-gray-500 mb-2">多族群飲食風險管理系統</p>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            食物對不同疾病的影響不同。選擇你的健康條件，即時查詢食物風險，做出更聰明的飲食決策。
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
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
            return (
              <button
                key={c}
                onClick={() => toggleCondition(c)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all font-medium text-sm ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <span className="text-3xl">{CONDITION_EMOJIS[c]}</span>
                <span>{label.zh}</span>
                <span className="text-xs text-gray-400 font-normal">{label.en}</span>
              </button>
            )
          })}
        </div>
        {conditions.length > 0 && (
          <p className="mt-4 text-sm text-indigo-600 font-medium">
            已選擇：{conditions.map((c) => CONDITION_LABELS[c].zh).join('、')}
          </p>
        )}
      </section>

      {/* Feature Cards */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-lg font-bold text-gray-900 mb-5">功能一覽</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link to="/search" className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
            <Search size={24} className="text-indigo-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">食物查詢</h3>
            <p className="text-sm text-gray-500">搜尋任意食物，即時查看各疾病風險等級</p>
            <div className="flex items-center gap-1 text-indigo-600 text-sm mt-3 group-hover:gap-2 transition-all">
              立即查詢 <ChevronRight size={14} />
            </div>
          </Link>

          <Link to="/knowledge" className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
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
            className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
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
    </div>
  )
}
