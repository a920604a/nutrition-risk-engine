import { useState } from 'react'
import { Heart, BookOpen } from 'lucide-react'
import { RiskBadge } from './RiskBadge'
import { evaluateAll, CONDITION_LABELS } from '../engine/riskEngine'
import type { FoodItem } from '../lib/api'
import type { Condition } from '../engine/riskEngine'
import { useAppStore } from '../store/useAppStore'

const CATEGORY_ICONS: Record<string, string> = {
  meat: '🥩',
  seafood: '🦐',
  vegetable: '🥦',
  fruit: '🍎',
  drink: '🥤',
  grain: '🌾',
  dairy: '🥛',
  other: '🍽️',
}

interface FoodCardProps {
  food: FoodItem
  onAddDiary?: (food: FoodItem) => void
  onToggleFavorite?: (food: FoodItem) => void
  isFavorited?: boolean
}

export function FoodCard({ food, onAddDiary, onToggleFavorite, isFavorited = false }: FoodCardProps) {
  const { conditions, user, openLoginModal } = useAppStore()
  const [expanded, setExpanded] = useState(false)

  const allRisks = evaluateAll(food.tags as any, conditions)
  const displayConditions: Condition[] = conditions.length > 0
    ? conditions
    : ['gout', 'hyperlipidemia', 'diabetes', 'hypertension']

  const icon = CATEGORY_ICONS[food.category] ?? '🍽️'

  const handleFavorite = () => {
    if (!user) { openLoginModal(); return }
    onToggleFavorite?.(food)
  }

  const handleDiary = () => {
    if (!user) { openLoginModal(); return }
    onAddDiary?.(food)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{food.name_zh}</h3>
            <p className="text-xs text-gray-400">{food.name_en}</p>
          </div>
        </div>
        <button
          onClick={handleFavorite}
          className={`p-1.5 rounded-lg transition-colors ${isFavorited ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-400 hover:bg-red-50'}`}
          title="加入收藏"
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Risk Badges */}
      <div className="divide-y divide-gray-50">
        {displayConditions.map((condition) => (
          <RiskBadge
            key={condition}
            condition={condition}
            level={allRisks[condition].level}
          />
        ))}
      </div>

      {/* Expand for tag details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          {displayConditions.map((condition) => {
            const risk = allRisks[condition]
            if (risk.tags.length === 0) return null
            return (
              <div key={condition} className="mb-2">
                <span className="text-xs font-medium text-gray-500">{CONDITION_LABELS[condition].zh}：</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {risk.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {expanded ? '收起原因' : '查看原因'}
        </button>
        <button
          onClick={handleDiary}
          className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
        >
          <BookOpen size={12} />
          記錄日記
        </button>
      </div>
    </div>
  )
}
