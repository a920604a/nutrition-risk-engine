export type Condition = '痛風' | '高血脂' | '糖尿病' | '高血壓'

export type RiskLevel = 'low' | 'medium' | 'high'

export interface FoodRisk {
  score: number
  level: RiskLevel
  tags: string[]
}

export interface FoodTags {
  痛風: string[]
  高血脂: string[]
  糖尿病: string[]
  高血壓: string[]
}

// Tag score weights per condition
const TAG_SCORES: Record<Condition, Record<string, number>> = {
  痛風: {
    high_purine: 3,
    organ_meat: 3,
    alcohol: 3,
    seafood_high_risk: 2,
    moderate_purine: 1,
    low_purine: 0,
  },
  高血脂: {
    trans_fat: 3,
    high_saturated_fat: 3,
    high_cholesterol: 2,
    fried_food: 2,
    high_calorie: 1,
  },
  糖尿病: {
    high_sugar: 3,
    refined_carbs: 3,
    sweetened_drink: 3,
    high_glycemic_index: 2,
    low_glycemic_index: 0,
  },
  高血壓: {
    high_sodium: 3,
    processed_food: 2,
    canned_food: 2,
    pickled_food: 2,
  },
}

export function evaluate(tags: string[], condition: Condition): FoodRisk {
  const weights = TAG_SCORES[condition]
  let score = 0
  const triggeredTags: string[] = []

  for (const tag of tags) {
    const weight = weights[tag]
    if (weight !== undefined && weight > 0) {
      score += weight
      triggeredTags.push(tag)
    }
  }

  const level: RiskLevel = score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low'

  return { score, level, tags: triggeredTags }
}

export function evaluateAll(foodTags: FoodTags, _conditions?: Condition[]): Record<Condition, FoodRisk> {
  const result = {} as Record<Condition, FoodRisk>
  const allConditions: Condition[] = ['痛風', '高血脂', '糖尿病', '高血壓']

  for (const condition of allConditions) {
    result[condition] = evaluate(foodTags[condition] ?? [], condition)
  }

  return result
}

export const CONDITION_LABELS: Record<Condition, { zh: string; en: string; color: string }> = {
  痛風: { zh: '痛風', en: 'Gout', color: 'yellow' },
  高血脂: { zh: '高血脂', en: 'Hyperlipidemia', color: 'red' },
  糖尿病: { zh: '糖尿病', en: 'Diabetes', color: 'orange' },
  高血壓: { zh: '高血壓', en: 'Hypertension', color: 'blue' },
}

export const RISK_LABELS: Record<RiskLevel, { zh: string; emoji: string; className: string }> = {
  low: { zh: '低風險', emoji: '🟢', className: 'text-green-700 bg-green-50 ring-1 ring-green-200' },
  medium: { zh: '中風險', emoji: '🟡', className: 'text-yellow-700 bg-yellow-50 ring-1 ring-yellow-200' },
  high: { zh: '高風險', emoji: '🔴', className: 'text-red-700 bg-red-50 ring-1 ring-red-200' },
}

export const TAG_LABELS: Partial<Record<string, string>> = {
  high_purine: '高嘌呤',
  organ_meat: '內臟類',
  alcohol: '含酒精',
  seafood_high_risk: '高風險海鮮',
  moderate_purine: '中等嘌呤',
  low_purine: '低嘌呤',
  trans_fat: '反式脂肪',
  high_saturated_fat: '高飽和脂肪',
  high_cholesterol: '高膽固醇',
  fried_food: '油炸食品',
  high_calorie: '高熱量',
  high_sugar: '高糖',
  refined_carbs: '精緻澱粉',
  sweetened_drink: '含糖飲料',
  high_glycemic_index: '高升糖指數',
  low_glycemic_index: '低升糖指數',
  high_sodium: '高鈉',
  processed_food: '加工食品',
  canned_food: '罐頭食品',
  pickled_food: '醃製食品',
}
