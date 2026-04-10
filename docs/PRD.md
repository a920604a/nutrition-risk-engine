# PRD — Nutrition Guard

## 產品概述

Nutrition Guard 是多族群飲食風險管理系統，協助慢性病患者（痛風、高血脂、糖尿病、高血壓）查詢食物對自身病情的風險，做出更聰明的飲食選擇。

**部署狀態：已部署 (Cloudflare Pages + Worker)**
**成本：$0/月**

---

## 目標用戶

- 罹患一種或多種慢性病的成人患者
- 照顧慢性病家人的照護者
- 關注飲食健康的一般民眾

---

## 核心價值主張

1. **多疾病同時評估** — 一次查詢食物，同時看到所有選定疾病的風險等級
2. **即時本地運算** — 規則引擎在瀏覽器端執行，不依賴 AI API，0 延遲
3. **免費訪客模式** — 核心功能無需帳號，降低使用門檻
4. **跨裝置同步** — 登入後健康條件與收藏自動同步

---

## 七個頁面

| 頁面 | 路由 | 需登入 | 狀態 |
|------|------|--------|------|
| 首頁 | `/` | 否 | ✅ 已完成 |
| 食物查詢 | `/search` | 否 | ✅ 已完成 |
| 飲食建議 | `/recommendations` | 否 | ✅ 已完成 |
| 飲食日記 | `/diary` | 是 | ✅ 已完成 |
| 知識專區 | `/knowledge` | 讀：否／寫：是 | ✅ 已完成 |
| 常見問題 | `/faq` | 否 | ✅ 已完成 |
| 我的收藏 | `/favorites` | 是 | ✅ 已完成 |

---

## 功能需求摘要

### 訪客功能（免登入）
- 選擇健康條件（痛風/高血脂/糖尿病/高血壓，可多選）
- 搜尋食物並查看各疾病風險等級（高/中/低）
- 瀏覽飲食建議（避免 vs 安全食物列表）
- 瀏覽知識文章
- 查看常見問題（FAQ）

### 登入功能（Google OAuth）
- 記錄飲食日記（含 7 天趨勢圖）
- 收藏食物（跨裝置同步）
- 發表 / 編輯自己的知識文章
- 健康條件設定跨裝置同步

---

## 系統架構

```
Browser
├── Rule Engine (TypeScript)     瀏覽器內執行，無 API 呼叫
├── Cloudflare Worker            食物 API（查詢 D1）
│     └── D1 (SQLite)           foods / food_tags（42食物·65標籤）
└── Firebase SDK
      ├── Auth                   Google OAuth
      └── Firestore              food_logs / favorites / articles / profile

Cloudflare Pages                 靜態 SPA hosting
```

---

## 非功能需求

- 首次載入 JS bundle < 500KB（code splitting: firebase chunk 獨立）
- 食物查詢延遲 < 500ms（Worker + D1）
- 規則引擎評估 < 1ms（純 TS，瀏覽器端）
- 無障礙：按鈕需有 title 或 aria-label
- 行動裝置優先（RWD）

---

## Phase 2 計畫

- Workers KV：食物 API 快取（TTL 24h），減少 D1 讀取
- Workers AI：新食物自動 tagging（`@cf/meta/llama-3.1-8b-instruct`）
- AI Gateway：統一 AI 呼叫入口，日誌與快取
