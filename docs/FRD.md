# FRD — Nutrition Guard 功能需求文件

## 功能完成狀態

### Phase 1 — 基礎建設 ✅

| 功能 | 檔案 | 狀態 |
|------|------|------|
| SPA 路由修正 | `public/_redirects` | ✅ |
| 頁面淡入動畫 | `tailwind.config.js` + `PageTransition.tsx` | ✅ |
| 全域 Toast 通知 | `src/components/Toast.tsx` | ✅ |
| 健康條件雙向同步 | `src/hooks/useConditionsSync.ts` | ✅ |
| 404 頁面 | `src/pages/NotFound.tsx` | ✅ |

### Phase 2 — App 核心接線 ✅

| 功能 | 詳情 | 狀態 |
|------|------|------|
| ToastProvider 接入 | `App.tsx` 包裹 `<ToastProvider>` | ✅ |
| PageTransition 接入 | `Routes` 包裹 `<PageTransition>` | ✅ |
| useConditionsSync 接入 | `AppInner` 元件呼叫 hook | ✅ |
| NotFound route | `<Route path="*">` | ✅ |

### Phase 3 — Engine + 共用元件美化 ✅

| 功能 | 詳情 | 狀態 |
|------|------|------|
| RiskBadge border ring | `RISK_LABELS` className 加 `ring-1` | ✅ |
| FoodCard 左側色條 | 依最高風險決定 `border-l-*` 顏色 | ✅ |
| FoodCard useToast | 取代 `alert()`，收藏/取消收藏時 toast | ✅ |
| FoodCard hover lift | `hover:-translate-y-0.5` + `transition-all` | ✅ |
| Navbar active pill | `bg-indigo-600 text-white` 實心填充 | ✅ |

### Phase 4 — 頁面美化 ✅

| 頁面 | 功能 | 狀態 |
|------|------|------|
| Home | 深色漸層 Hero（indigo-900 → indigo-700）| ✅ |
| Home | Stats bar（42食物 · 4疾病 · 即時評估）| ✅ |
| Home | 各疾病專屬色卡（yellow/red/orange/blue）| ✅ |
| Home | Sticky CTA（選完條件後固定底部，z-30）| ✅ |
| Search | Skeleton loading cards | ✅ |
| Search | Category 改橫向 pill 篩選 | ✅ |
| Search | 加入日記 toast 回饋 | ✅ |
| Favorites | `Promise.allSettled` 並行呼叫 Worker | ✅ |
| Favorites | 取得 tags 後渲染 RiskBadge | ✅ |
| Favorites | 移除收藏 toast | ✅ |
| Knowledge | `author_id` 欄位 | ✅ |
| Knowledge | 作者才看到「編輯」按鈕（Pencil icon）| ✅ |
| Knowledge | `updateDoc` 支援編輯現有文章 | ✅ |
| Knowledge | Skeleton loading + toast on submit | ✅ |
| Diary | 7 天純 CSS bar chart（inline style height）| ✅ |
| Diary | Log 列左側色條（依最高風險分數）| ✅ |
| Diary | 刪除日記 toast | ✅ |
| FAQ | `max-h-0/max-h-48 transition-all` 動畫 | ✅ |
| FAQ | Chevron rotate（`rotate-180`）| ✅ |
| Recommendations | 各疾病 tab 專屬色 | ✅ |
| Recommendations | 食物列左側色條（red/green）| ✅ |
| Recommendations | Skeleton loading | ✅ |

### Phase 5 — 文件 ✅

| 文件 | 狀態 |
|------|------|
| `README.md` | ✅ 完整覆寫（含部署步驟） |
| `docs/PRD.md` | ✅ 更新 |
| `docs/FRD.md` | ✅ 本文件 |

### Phase 6 — AI 分析 + PDF 匯出 ✅

| 功能 | 檔案 | 狀態 |
|------|------|------|
| Workers AI `/api/analyze` | `worker/index.ts` | ✅ |
| AI 呼叫 + module-level 快取 | `src/hooks/useAnalysis.ts` | ✅ |
| Diary inline AI 分析 UI | `src/components/DiaryAnalysis.tsx` | ✅ |
| PDF 報告模板（SVG 圖表 + 中文字體）| `src/components/ReportPDF.tsx` | ✅ |
| PDF 匯出按鈕（lazy loaded）| `src/pages/Diary.tsx` | ✅ |
| NotoSansSC 中文字體 | `public/fonts/NotoSansSC-Regular.ttf` | ✅ |

### Phase 7 — 資料庫擴充 + 架構優化 ✅

| 功能 | 詳情 | 狀態 |
|------|------|------|
| 食物資料庫擴充 | 42 → 140 種食物，289 個標籤 | ✅ |
| Condition 改為中文 key | `Condition` type 改 `'痛風'｜'高血脂'｜'糖尿病'｜'高血壓'` | ✅ |
| localStorage / Firestore migration | `onRehydrateStorage` + `useConditionsSync` 自動轉換舊英文值 | ✅ |
| Workers KV 快取 `/api/stats` | 食物數量 24h KV 快取，首頁動態顯示 | ✅ |

---

## 技術規格

### Rule Engine

```typescript
evaluate(tags: string[], condition: Condition): FoodRisk
// → { score: number, level: 'low'|'medium'|'high', tags: string[] }

evaluateAll(foodTags: FoodTags, conditions?: Condition[]): Record<Condition, FoodRisk>
```

分數門檻：`>= 4 → high`, `>= 2 → medium`, `< 2 → low`

### useConditionsSync 防迴圈機制

```
Firebase 讀取 → setConditions → isSyncing.current = true
                               ↓ 500ms 後 isSyncing = false
conditions 變動 → 若 isSyncing → skip write
               → 若非 isSyncing → debounce 500ms → setDoc
```

### Favorites 兩階段渲染

```
Firestore getDocs → setFavorites(base)  [顯示名稱]
                 ↓
Promise.allSettled(base.map(fav => getFoodById(fav.food_id)))
                 ↓
setFavorites(base + risks)             [疊加風險徽章]
```

---

## 已知限制

- 食物資料庫 140 筆，新增需手動更新 D1 seed 並重跑 `wrangler d1 execute`
- Firestore 免費方案：每日讀取 50k 次、寫入 20k 次
- Cloudflare D1 免費方案：每日 500k 次 row reads
- Cloudflare KV 免費方案：每日 100k 次讀取、1k 次寫入
- Workers AI：每日 10k neurons 免費額度（`@cf/meta/llama-3.1-8b-instruct`）
- KV stats 快取 TTL 24h，新增食物後需等待最多 24h 首頁才更新（或手動刪 KV key）
