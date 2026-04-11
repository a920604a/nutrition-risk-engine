export interface Env {
  DB: D1Database
  AI: Ai
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS_HEADERS })
}

async function buildFoodResponse(db: D1Database, foodRows: any[]) {
  if (foodRows.length === 0) return []

  const ids = foodRows.map((f) => f.id)
  const placeholders = ids.map(() => '?').join(',')
  const tagRows = await db
    .prepare(`SELECT food_id, condition, tag FROM food_tags WHERE food_id IN (${placeholders})`)
    .bind(...ids)
    .all()

  const tagsMap: Record<string, Record<string, string[]>> = {}
  for (const row of tagRows.results as any[]) {
    if (!tagsMap[row.food_id]) tagsMap[row.food_id] = { 痛風: [], 高血脂: [], 糖尿病: [], 高血壓: [] }
    if (!tagsMap[row.food_id][row.condition]) tagsMap[row.food_id][row.condition] = []
    tagsMap[row.food_id][row.condition].push(row.tag)
  }

  return foodRows.map((food) => ({
    id: food.id,
    name_zh: food.name_zh,
    name_en: food.name_en,
    category: food.category,
    tags: tagsMap[food.id] ?? { 痛風: [], 高血脂: [], 糖尿病: [], 高血壓: [] },
  }))
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: CORS_HEADERS })
      }

      const url = new URL(request.url)
      const path = url.pathname

      const matchSingle = path.match(/^\/api\/foods\/([^/]+)$/)
      if (matchSingle) {
        const id = matchSingle[1]
        const row = await env.DB.prepare(
          'SELECT * FROM foods WHERE id = ?'
        ).bind(id).first()

        if (!row) return json({ error: 'Not found' }, 404)

        const foods = await buildFoodResponse(env.DB, [row])
        return json(foods[0])
      }

      if (path === '/api/foods') {
        const q = url.searchParams.get('q') ?? ''
        const category = url.searchParams.get('category') ?? ''

        let query = 'SELECT * FROM foods WHERE 1=1'
        const params: string[] = []

        if (q) {
          query += ' AND (name_zh LIKE ? OR name_en LIKE ?)'
          params.push(`%${q}%`, `%${q}%`)
        }

        if (category) {
          query += ' AND category = ?'
          params.push(category)
        }

        query += ' LIMIT 50'

        const stmt = env.DB.prepare(query)
        const rows = params.length
          ? await stmt.bind(...params).all()
          : await stmt.all()

        const foods = await buildFoodResponse(env.DB, rows.results as any[])
        return json({ foods })
      }

      if (path === '/api/analyze' && request.method === 'POST') {
        const body = await request.json() as {
          conditions: string[]
          foodLogs: Array<{
            food_name: string
            risks: { gout: number; lipids: number; diabetes: number; hypertension: number }
          }>
          language: string
        }

        if (!body.foodLogs || !Array.isArray(body.foodLogs) || body.foodLogs.length < 3) {
          return json({ error: 'INSUFFICIENT_LOGS', message: '飲食記錄不足，請至少記錄 3 筆飲食後再進行分析' }, 422)
        }
        if (!body.conditions || body.conditions.length === 0) {
          return json({ error: 'MISSING_CONDITIONS', message: '請先選擇您的疾病條件' }, 422)
        }

        const conditionLabels = body.conditions.join('、')

        const highRiskFoods = body.foodLogs.filter((log) =>
          Math.max(log.risks.gout, log.risks.lipids, log.risks.diabetes, log.risks.hypertension) >= 4
        )
        const freq: Record<string, number> = {}
        for (const log of highRiskFoods) {
          freq[log.food_name] = (freq[log.food_name] ?? 0) + 1
        }
        const topRiskyList = Object.entries(freq)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => `- ${name}（出現 ${count} 次）`)
          .join('\n') || '（無高風險記錄）'

        const allFoodNames = [...new Set(body.foodLogs.map((l) => l.food_name))].slice(0, 20).join('、')

        const userPrompt = `病患疾病：${conditionLabels}

近7天飲食紀錄（共 ${body.foodLogs.length} 筆）：
${allFoodNames}

高風險飲食（分數 ≥ 4）：
${topRiskyList}

請以 JSON 格式回應，不要輸出任何 JSON 以外的內容：
{
  "summary": "一段 2-3 句的整體飲食評估（繁體中文）",
  "recommendations": [
    "具體建議 1",
    "具體建議 2",
    "具體建議 3"
  ],
  "riskHighlights": [
    "需注意的高風險食物或習慣 1",
    "需注意的高風險食物或習慣 2"
  ]
}

注意：
- 所有文字使用繁體中文
- recommendations 提供 3-4 條針對該病患疾病的具體可行建議
- riskHighlights 指出 2-3 項本週最需要注意的風險項目
- 語氣友善、鼓勵，避免過度嚇嚇病患`

        const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct' as any, {
          messages: [
            { role: 'system', content: '你是一位慢性病飲食衛教師，只輸出 JSON，不輸出任何多餘文字。' },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: 800,
        } as any)

        const raw = (aiResponse as any).response as string

        let parsed: { summary: string; recommendations: string[]; riskHighlights: string[] }
        try {
          const cleaned = raw.replace(/^```(?:json)?\s*/m, '').replace(/\s*```$/m, '').trim()
          parsed = JSON.parse(cleaned)
        } catch {
          parsed = { summary: raw.slice(0, 300), recommendations: [], riskHighlights: [] }
        }

        return json(parsed)
      }

      return json({ error: 'Not found' }, 404)

    } catch (err: any) {
      return json(
        { error: 'Internal Error', detail: err?.message },
        500
      )
    }
  }
}