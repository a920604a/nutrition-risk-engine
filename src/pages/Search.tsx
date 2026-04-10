import { useState, useEffect, useCallback } from 'react'
import { Search as SearchIcon, Filter } from 'lucide-react'
import { FoodCard } from '../components/FoodCard'
import { searchFoods, type FoodItem } from '../lib/api'
import { useAppStore } from '../store/useAppStore'
import { db } from '../lib/firebase'
import { doc, setDoc, deleteDoc, collection, getDocs, serverTimestamp, addDoc } from 'firebase/firestore'
import type { Condition } from '../engine/riskEngine'
import { evaluateAll } from '../engine/riskEngine'

const CATEGORIES = [
  { value: '', label: '全部' },
  { value: 'meat', label: '🥩 肉類' },
  { value: 'seafood', label: '🦐 海鮮' },
  { value: 'vegetable', label: '🥦 蔬菜' },
  { value: 'fruit', label: '🍎 水果' },
  { value: 'drink', label: '🥤 飲料' },
  { value: 'grain', label: '🌾 主食' },
  { value: 'dairy', label: '🥛 乳品' },
  { value: 'other', label: '🍽️ 其他' },
]

export function Search() {
  const { user, conditions } = useAppStore()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const fetchFoods = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const results = await searchFoods({ q: query, category: category || undefined })
      setFoods(results)
    } catch {
      setError('食物資料載入失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }, [query, category])

  // Load favorites
  useEffect(() => {
    if (!user) { setFavorites(new Set()); return }
    getDocs(collection(db, 'users', user.uid, 'favorites')).then((snap) => {
      setFavorites(new Set(snap.docs.map((d) => d.id)))
    })
  }, [user])

  useEffect(() => {
    const timer = setTimeout(fetchFoods, 300)
    return () => clearTimeout(timer)
  }, [fetchFoods])

  const handleToggleFavorite = async (food: FoodItem) => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, 'favorites', food.id)
    if (favorites.has(food.id)) {
      await deleteDoc(ref)
      setFavorites((prev) => { const n = new Set(prev); n.delete(food.id); return n })
    } else {
      await setDoc(ref, { food_id: food.id, food_name_zh: food.name_zh, food_name_en: food.name_en, added_at: serverTimestamp() })
      setFavorites((prev) => new Set([...prev, food.id]))
    }
  }

  const handleAddDiary = async (food: FoodItem) => {
    if (!user) return
    const allRisks = evaluateAll(food.tags as any, conditions as Condition[])
    await addDoc(collection(db, 'users', user.uid, 'food_logs'), {
      food_id: food.id,
      food_name: food.name_zh,
      timestamp: serverTimestamp(),
      risks: {
        gout: allRisks.gout.score,
        lipids: allRisks.hyperlipidemia.score,
        diabetes: allRisks.diabetes.score,
        hypertension: allRisks.hypertension.score,
      },
    })
    // Simple toast feedback
    const btn = document.activeElement as HTMLElement
    btn?.blur()
    alert(`已將「${food.name_zh}」加入飲食日記`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">食物查詢</h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="搜尋食物名稱（中文或英文）..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-9 pr-8 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="text-center py-12 text-gray-400">載入中...</div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}
      {!loading && !error && foods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">找不到相關食物，試試其他關鍵字</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onToggleFavorite={handleToggleFavorite}
            onAddDiary={handleAddDiary}
            isFavorited={favorites.has(food.id)}
          />
        ))}
      </div>
    </div>
  )
}
