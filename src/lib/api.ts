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

export interface Stats {
  food_count: number
  condition_count: number
}

const STATS_CACHE_KEY = 'ng:stats'
const STATS_CACHE_TTL = 60 * 60 * 24 * 1000 // 24h in ms

export async function getStats(): Promise<Stats> {
  // Check browser localStorage cache
  try {
    const raw = localStorage.getItem(STATS_CACHE_KEY)
    if (raw) {
      const { data, expiry } = JSON.parse(raw) as { data: Stats; expiry: number }
      if (Date.now() < expiry) return data
    }
  } catch { /* ignore */ }

  const res = await fetch(`${WORKER_BASE}/api/stats`)
  if (!res.ok) throw new Error('統計資料載入失敗')
  const data: Stats = await res.json()

  // Store in localStorage with expiry
  try {
    localStorage.setItem(STATS_CACHE_KEY, JSON.stringify({ data, expiry: Date.now() + STATS_CACHE_TTL }))
  } catch { /* ignore quota errors */ }

  return data
}

export async function getFoodById(id: string): Promise<FoodItem> {
  const res = await fetch(`${WORKER_BASE}/api/foods/${id}`)
  if (!res.ok) throw new Error('食物資料載入失敗')
  return res.json()
}

export interface AnalysisResult {
  summary: string
  recommendations: string[]
  riskHighlights: string[]
}

export async function analyzeLog(payload: {
  conditions: string[]
  foodLogs: Array<{
    food_name: string
    risks: { gout: number; lipids: number; diabetes: number; hypertension: number }
  }>
}): Promise<AnalysisResult> {
  const res = await fetch(`${WORKER_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, language: 'zh' }),
  })
  if (!res.ok) {
    const err = await res.json() as { message?: string; error: string }
    throw new Error(err.message ?? err.error ?? 'AI 分析失敗')
  }
  return res.json()
}
