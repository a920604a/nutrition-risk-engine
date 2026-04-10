import { useState, useEffect } from 'react'
import { searchFoods, type FoodItem } from '../lib/api'
import { evaluateAll, CONDITION_LABELS } from '../engine/riskEngine'
import type { Condition } from '../engine/riskEngine'
import { useAppStore } from '../store/useAppStore'
import { Link } from 'react-router-dom'

const ALL_CONDITIONS: Condition[] = ['gout', 'hyperlipidemia', 'diabetes', 'hypertension']

export function Recommendations() {
  const { conditions } = useAppStore()
  const [activeTab, setActiveTab] = useState<Condition>('gout')
  const [allFoods, setAllFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(false)

  const displayConditions = conditions.length > 0 ? conditions : ALL_CONDITIONS

  useEffect(() => {
    if (!activeTab) return
    setLoading(true)
    searchFoods({}).then(setAllFoods).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!displayConditions.includes(activeTab)) {
      setActiveTab(displayConditions[0])
    }
  }, [conditions])

  const getFilteredFoods = (level: 'high' | 'low') => {
    return allFoods
      .map((food) => {
        const risks = evaluateAll(food.tags as any, [activeTab])
        return { food, risk: risks[activeTab] }
      })
      .filter(({ risk }) => risk.level === level)
      .sort((a, b) => level === 'high' ? b.risk.score - a.risk.score : a.risk.score - b.risk.score)
      .slice(0, 12)
  }

  const avoidFoods = getFilteredFoods('high')
  const safeFoods = getFilteredFoods('low')

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">飲食建議</h1>
      <p className="text-sm text-gray-500 mb-6">依您選擇的疾病條件，列出建議避免與可安心食用的食物</p>

      {/* Condition Tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {displayConditions.map((c) => (
          <button
            key={c}
            onClick={() => setActiveTab(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === c
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            {CONDITION_LABELS[c].zh}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">載入中...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Avoid */}
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold text-red-600 mb-4">
              <span>🔴</span> 建議避免
            </h2>
            {avoidFoods.length === 0 ? (
              <p className="text-gray-400 text-sm">資料載入中...</p>
            ) : (
              <div className="space-y-2">
                {avoidFoods.map(({ food, risk }) => (
                  <div key={food.id} className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-3">
                    <div>
                      <span className="font-medium text-gray-900 text-sm">{food.name_zh}</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {risk.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-red-500 font-semibold ml-2 shrink-0">風險 {risk.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safe */}
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold text-green-600 mb-4">
              <span>🟢</span> 可安心食用
            </h2>
            {safeFoods.length === 0 ? (
              <p className="text-gray-400 text-sm">資料載入中...</p>
            ) : (
              <div className="space-y-2">
                {safeFoods.map(({ food }) => (
                  <div key={food.id} className="flex items-center bg-green-50 rounded-xl px-4 py-3">
                    <span className="font-medium text-gray-900 text-sm">{food.name_zh}</span>
                    <span className="text-xs text-gray-400 ml-2">{food.name_en}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-indigo-50 rounded-xl text-sm text-indigo-700">
        想查詢特定食物的詳細風險？
        <Link to="/search" className="font-semibold underline ml-1">前往食物查詢</Link>
      </div>
    </div>
  )
}
