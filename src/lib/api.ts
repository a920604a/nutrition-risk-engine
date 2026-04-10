import type { Condition } from '../engine/riskEngine'

const WORKER_BASE = import.meta.env.VITE_WORKER_URL ?? 'http://localhost:8787'

export interface FoodItem {
  id: string
  name_zh: string
  name_en: string
  category: string
  tags: Record<Condition, string[]>
}

export async function searchFoods(params: {
  q?: string
  condition?: Condition
  category?: string
}): Promise<FoodItem[]> {
  const url = new URL(`${WORKER_BASE}/api/foods`)
  if (params.q) url.searchParams.set('q', params.q)
  if (params.condition) url.searchParams.set('condition', params.condition)
  if (params.category) url.searchParams.set('category', params.category)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('食物資料載入失敗')
  const data = await res.json() as { foods: FoodItem[] }
  return data.foods
}

export async function getFoodById(id: string): Promise<FoodItem> {
  const res = await fetch(`${WORKER_BASE}/api/foods/${id}`)
  if (!res.ok) throw new Error('食物資料載入失敗')
  return res.json()
}
