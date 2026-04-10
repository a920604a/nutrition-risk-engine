export interface Env {
  DB: D1Database
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
    if (!tagsMap[row.food_id]) tagsMap[row.food_id] = { gout: [], hyperlipidemia: [], diabetes: [], hypertension: [] }
    if (!tagsMap[row.food_id][row.condition]) tagsMap[row.food_id][row.condition] = []
    tagsMap[row.food_id][row.condition].push(row.tag)
  }

  return foodRows.map((food) => ({
    id: food.id,
    name_zh: food.name_zh,
    name_en: food.name_en,
    category: food.category,
    tags: tagsMap[food.id] ?? { gout: [], hyperlipidemia: [], diabetes: [], hypertension: [] },
  }))
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname

    // GET /api/foods/:id
    const matchSingle = path.match(/^\/api\/foods\/([^/]+)$/)
    if (matchSingle) {
      const id = matchSingle[1]
      const row = await env.DB.prepare('SELECT * FROM foods WHERE id = ?').bind(id).first()
      if (!row) return json({ error: 'Not found' }, 404)
      const foods = await buildFoodResponse(env.DB, [row])
      return json(foods[0])
    }

    // GET /api/foods
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
      const rows = params.length > 0
        ? await stmt.bind(...params).all()
        : await stmt.all()

      const foods = await buildFoodResponse(env.DB, rows.results as any[])
      return json({ foods })
    }

    return json({ error: 'Not found' }, 404)
  },
}
