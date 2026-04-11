# Nutrition Guard

多族群飲食風險管理系統 — 幫助痛風、高血脂、糖尿病、高血壓患者做出更聰明的飲食決策。

**Live Demo:** [nutrition-guard.pages.dev](https://nutrition-guard.pages.dev)

---

## 功能總覽

| 功能 | 登入需求 | 說明 |
|------|----------|------|
| 食物查詢 | 不需要 | 搜尋 140 種食物，即時查看各疾病風險評分 |
| 飲食建議 | 不需要 | 依疾病條件列出應避免 / 可安心食用的食物 |
| 知識專區 | 閱讀不需要 | Markdown 文章，登入後可新增/編輯自己的文章 |
| FAQ | 不需要 | 12 題常見問答，可依疾病分類篩選 |
| 飲食日記 | 需要 | 記錄每日飲食，7 天長條圖視覺化 |
| AI 飲食分析 | 需要 | 由 Workers AI 根據近 7 天記錄生成個人化建議 |
| PDF 報告匯出 | 需要 | 含圖表 + AI 建議的 A4 報告，一鍵下載 |
| 我的收藏 | 需要 | 儲存常用食物，同步顯示當前疾病風險 |

---

## Tech Stack

| 層 | 技術 |
|----|------|
| Frontend | Vite 5 + React 18 + TypeScript |
| 樣式 | TailwindCSS v3 |
| 狀態管理 | Zustand（localStorage 持久化） |
| 路由 | React Router v6 |
| 風險引擎 | 純 TypeScript（tag 評分，無 AI） |
| 食物 API | Cloudflare Worker |
| 食物資料庫 | Cloudflare D1（SQLite，140 種食物） |
| AI 分析 | Cloudflare Workers AI（llama-3.1-8b-instruct） |
| PDF 生成 | @react-pdf/renderer（前端，lazy loaded） |
| 驗證 | Firebase Auth（Google OAuth） |
| 使用者資料 | Firebase Firestore |
| Hosting | Cloudflare Pages |
| **月費用** | **$0** |

---

## 專案結構

```
nutrition-risk-engine/
├── public/
│   ├── fonts/
│   │   └── NotoSansSC-Regular.ttf   # PDF 中文字體
│   └── _redirects                   # Cloudflare Pages SPA routing
├── src/
│   ├── engine/
│   │   └── riskEngine.ts            # evaluate(tags, condition) → FoodRisk
│   ├── lib/
│   │   ├── firebase.ts              # Firebase app / auth / firestore
│   │   └── api.ts                   # Worker API client（searchFoods, getFoodById, analyzeLog）
│   ├── store/
│   │   └── useAppStore.ts           # Zustand store（user, conditions, modal）
│   ├── hooks/
│   │   ├── useConditionsSync.ts     # 雙向同步 conditions ↔ Firestore
│   │   └── useAnalysis.ts           # AI 分析 + module-level 快取
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── FoodCard.tsx
│   │   ├── RiskBadge.tsx
│   │   ├── LoginModal.tsx
│   │   ├── Toast.tsx
│   │   ├── PageTransition.tsx
│   │   ├── DiaryAnalysis.tsx        # AI 分析 inline UI
│   │   └── ReportPDF.tsx            # PDF 模板 + downloadReport()
│   └── pages/
│       ├── Home.tsx
│       ├── Search.tsx
│       ├── Recommendations.tsx
│       ├── Diary.tsx                # 7 天圖表 + AI 分析 + PDF 匯出
│       ├── Knowledge.tsx
│       ├── FAQ.tsx
│       ├── Favorites.tsx
│       └── NotFound.tsx
├── worker/
│   ├── index.ts                     # GET /api/foods, GET /api/foods/:id, GET /api/stats, POST /api/analyze
│   ├── schema.sql                   # D1 schema
│   └── seed.sql                     # 140 種食物，~300 個標籤
├── docs/
│   ├── PRD.md
│   └── FRD.md
├── wrangler.toml                    # Worker + D1 + AI binding 設定
└── .env                             # 本機環境變數（不 commit）
```

---

## 本機開發

### 前置需求
- Node.js 18+
- Cloudflare 帳號（免費）
- Firebase 專案（免費）

### 1. 安裝依賴

```bash
npm install
```

### 2. 建立 `.env`

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_WORKER_URL=http://localhost:8787
```

### 3. 啟動

```bash
# Terminal 1：Worker（含 AI 需加 --remote）
npm run worker:dev
# 或使用遠端 AI：
npx wrangler dev worker/index.ts --port 8787 --remote

# Terminal 2：前端
npm run dev
```

> **注意**：Workers AI (`POST /api/analyze`) 在本機需要 `--remote` 才能使用，因為 AI binding 只在 Cloudflare 邊緣環境執行。

---

## 部署

詳見下方「[部署步驟](#部署步驟)」章節。

---

## 資料庫 Schema

```sql
CREATE TABLE foods (
  id       TEXT PRIMARY KEY,
  name_zh  TEXT NOT NULL,
  name_en  TEXT NOT NULL,
  category TEXT NOT NULL  -- meat | seafood | vegetable | fruit | drink | grain | dairy | other
);

CREATE TABLE food_tags (
  food_id   TEXT NOT NULL REFERENCES foods(id),
  condition TEXT NOT NULL,  -- 痛風 | 高血脂 | 糖尿病 | 高血壓
  tag       TEXT NOT NULL
);

CREATE INDEX idx_food_tags_food_id ON food_tags(food_id);
CREATE INDEX idx_food_tags_condition ON food_tags(condition);
```

### 風險評分 Tag 系統

| 疾病 | Tag | 分數 |
|------|-----|------|
| 痛風 | `high_purine` | 3 |
| 痛風 | `organ_meat` | 3 |
| 痛風 | `alcohol` | 3 |
| 痛風 | `seafood_high_risk` | 2 |
| 痛風 | `moderate_purine` | 1 |
| 高血脂 | `trans_fat` | 3 |
| 高血脂 | `high_saturated_fat` | 3 |
| 高血脂 | `high_cholesterol` | 2 |
| 高血脂 | `fried_food` | 2 |
| 高血脂 | `high_calorie` | 1 |
| 糖尿病 | `high_sugar` | 3 |
| 糖尿病 | `refined_carbs` | 3 |
| 糖尿病 | `sweetened_drink` | 3 |
| 糖尿病 | `high_glycemic_index` | 2 |
| 高血壓 | `high_sodium` | 3 |
| 高血壓 | `processed_food` | 2 |
| 高血壓 | `canned_food` | 2 |
| 高血壓 | `pickled_food` | 2 |

分數 ≥ 4 = 高風險 🔴 / ≥ 2 = 中風險 🟡 / < 2 = 低風險 🟢

---

## Firestore 安全規則

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{id} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.author_id;
    }
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## 部署步驟

### 第一次部署（全新環境）

#### Step 1：建立 Cloudflare D1 資料庫

```bash
# 建立 D1 資料庫（只需做一次）
npx wrangler d1 create nutrition-db
```

複製輸出的 `database_id`，填入 `wrangler.toml`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "nutrition-db"
database_id = "你的-database-id"  # ← 填這裡
```

#### Step 2：建立 Schema 並匯入食物資料

```bash
# 建立資料表
npx wrangler d1 execute nutrition-db --file=worker/schema.sql --remote

# 匯入 140 種食物資料
npx wrangler d1 execute nutrition-db --file=worker/seed.sql --remote
```

#### Step 3：部署 Cloudflare Worker

```bash
npm run worker:deploy
```

部署成功後會顯示 Worker URL，例如：
`https://nutrition-risk-engine.a920604a.workers.dev`

#### Step 4：設定 Firebase

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 建立新專案（或使用現有）
3. 啟用 **Authentication → Google** 登入
4. 建立 **Firestore Database**（Production mode）
5. 套用上方「Firestore 安全規則」
6. 取得 Web App 設定值（`apiKey`, `authDomain` 等）

#### Step 5：部署前端到 Cloudflare Pages

**方法 A：GitHub 連動（推薦）**

1. Push 程式碼到 GitHub
2. 前往 [Cloudflare Pages](https://pages.cloudflare.com/)
3. **Create a project → Connect to Git** → 選擇你的 repo
4. 設定：
   - Build command：`npm run build`
   - Build output directory：`dist`
5. 在 **Settings → Environment variables** 加入所有環境變數：

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_WORKER_URL=https://nutrition-risk-engine.你的帳號.workers.dev
```

6. 點擊 **Save and Deploy**

**方法 B：手動部署**

```bash
npm run build
npx wrangler pages deploy dist --project-name=nutrition-guard
```

---

### 日常更新部署

#### 只更新前端

```bash
# 推送到 GitHub → Cloudflare Pages 自動重新建置
git push origin main

# 或手動
npm run build
npx wrangler pages deploy dist --project-name=nutrition-guard
```

#### 只更新 Worker（含新增 API 路由）

```bash
npm run worker:deploy
```

#### 更新食物資料庫（新增/修改 seed.sql）

```bash
# 只執行新增的 INSERT（INSERT OR IGNORE 不會覆蓋現有資料）
npx wrangler d1 execute nutrition-db --file=worker/seed.sql --remote
```

#### 同時更新所有

```bash
npm run worker:deploy && npm run build && npx wrangler pages deploy dist --project-name=nutrition-guard
```

---

## 環境變數一覽

| 變數名稱 | 說明 | 範例 |
|----------|------|------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase 專案 ID | `your-project` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123:web:abc` |
| `VITE_WORKER_URL` | Cloudflare Worker URL（含 https://） | `https://xxx.workers.dev` |
