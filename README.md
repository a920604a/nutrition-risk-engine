# Nutrition Guard

多族群飲食風險管理系統 — 幫助痛風、高血脂、糖尿病、高血壓患者做出更聰明的飲食決策。

**Live Demo:** Cloudflare Pages (deployed)

---

## Overview

Nutrition Guard 是一個純前端 SPA，搭配 Cloudflare Worker + D1 作為食物 API，Firebase 作為使用者資料儲存，完全免費 ($0/月) 運行。

核心功能：
- 純 TypeScript 規則引擎（不呼叫 AI），瀏覽器內即時計算食物風險
- 支援多疾病條件同時選取，個人化風險評估
- 訪客模式：食物查詢、飲食建議、FAQ 免登入
- 登入功能：飲食日記、我的收藏需 Google OAuth
- 知識專區：任何人可閱讀，登入後可發文/編輯自己的文章

---

## Tech Stack

| 層 | 技術 |
|----|------|
| Frontend | Vite 5 + React 18 + TypeScript |
| 樣式 | TailwindCSS v3 |
| 狀態管理 | Zustand (with localStorage persist) |
| 路由 | React Router v6 |
| Rule Engine | 純 TypeScript (score-based) |
| 食物 API | Cloudflare Worker (Hono) |
| 食物 DB | Cloudflare D1 (SQLite) |
| Auth | Firebase Auth (Google OAuth) |
| 用戶 DB | Firebase Firestore |
| Hosting | Cloudflare Pages |
| **成本** | **$0/月** |

---

## Project Structure

```
nutrition-risk-engine/
├── public/
│   └── _redirects              # Cloudflare Pages SPA routing fix
├── src/
│   ├── engine/
│   │   └── riskEngine.ts       # Rule engine: evaluate(tags, condition) → FoodRisk
│   ├── lib/
│   │   ├── firebase.ts         # Firebase app + auth + firestore
│   │   └── api.ts              # Worker API client (searchFoods, getFoodById)
│   ├── store/
│   │   └── useAppStore.ts      # Zustand store (user, conditions, modal)
│   ├── hooks/
│   │   └── useConditionsSync.ts # Bidirectional conditions ↔ Firestore sync
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── FoodCard.tsx        # Left border risk strip + useToast
│   │   ├── RiskBadge.tsx
│   │   ├── LoginModal.tsx      # Google OAuth only
│   │   ├── Toast.tsx           # Context-based toast system
│   │   └── PageTransition.tsx  # Fade-in on route change
│   └── pages/
│       ├── Home.tsx            # Dark hero, condition selector, sticky CTA
│       ├── Search.tsx          # Skeleton loading, pill filters
│       ├── Recommendations.tsx # Per-condition tabs + food lists
│       ├── Diary.tsx           # 7-day bar chart + risk-coded log entries
│       ├── Knowledge.tsx       # Article CRUD (author can edit own)
│       ├── FAQ.tsx             # Animated accordion
│       ├── Favorites.tsx       # Firestore + Worker parallel fetch + RiskBadge
│       └── NotFound.tsx        # 404 page
├── worker/
│   ├── index.ts                # Hono router: GET /api/foods, GET /api/foods/:id
│   ├── schema.sql              # D1 schema: foods + food_tags
│   └── seed.sql                # 42 foods, 65 tags
├── docs/
│   ├── PRD.md
│   └── FRD.md
└── wrangler.toml               # Cloudflare Worker + D1 config
```

---

## Setup

### Prerequisites
- Node 18+
- Cloudflare account (free)
- Firebase project (free)

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_WORKER_URL=http://localhost:8787
```

### 3. Setup Cloudflare D1

```bash
# Create D1 database
npx wrangler d1 create nutrition-db

# Apply schema
npx wrangler d1 execute nutrition-db --file=worker/schema.sql

# Seed data
npx wrangler d1 execute nutrition-db --file=worker/seed.sql
```

Update `wrangler.toml` with your `database_id`.

### 4. Run locally

```bash
# Start Worker (in one terminal)
npx wrangler dev worker/index.ts --port 8787

# Start frontend (in another terminal)
npm run dev
```

---

## Deployment

### Deploy Worker

```bash
npx wrangler deploy
```

Update `.env` (or Cloudflare Pages env vars) with the Worker URL:
```env
VITE_WORKER_URL=https://nutrition-risk-engine.your-account.workers.dev
```

### Deploy Frontend to Cloudflare Pages

```bash
npm run build
```

Then push to GitHub and connect the repo to Cloudflare Pages:
- Build command: `npm run build`
- Build output directory: `dist`
- Add all `VITE_*` env vars in Pages settings

The `public/_redirects` file handles SPA routing automatically.

---

## Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Articles: anyone reads, authenticated users write own
    match /articles/{id} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.author_id;
    }
    // User data: own data only
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## D1 Schema

```sql
CREATE TABLE foods (
  id       TEXT PRIMARY KEY,
  name_zh  TEXT NOT NULL,
  name_en  TEXT NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE food_tags (
  food_id   TEXT NOT NULL REFERENCES foods(id),
  condition TEXT NOT NULL,  -- gout | hyperlipidemia | diabetes | hypertension
  tag       TEXT NOT NULL
);
```

---

## Phase 2 Roadmap

- **Workers KV**: Cache food API responses (TTL 24h), reducing D1 reads
- **Workers AI**: Auto-tagging new foods using `@cf/meta/llama-3.1-8b-instruct`
- **AI Gateway**: Unified AI call logging and semantic caching
