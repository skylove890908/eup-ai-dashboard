# EUP AI 業務小幫手儀表板

EUP 車隊管理智能分析系統 — 客戶健康度評分 & 商機識別

## 功能特色
- 📊 客戶健康度評分（5維度加權計算）
- 📈 月工單量趨勢分析（異常偵測）
- 🔧 維修原因分佈圖表
- 😊 NLP 情緒信號分析
- 🚗 高頻維修車輛警示
- 💡 AI 識別商機（3個）
- 📋 今日行動清單

## 技術棧
- 前端：React + Vite + Tailwind CSS + Recharts
- 後端：Node.js + Express
- 部署：Vercel（前端）+ Render（後端）

## 啟動方式

### 後端
```bash
cd backend && npm install && npm start
```

### 前端
```bash
cd frontend && npm install && npm run dev
```

## 資料來源
客戶 29221，真實 CRM 資料（EUPIM + CTMS_Center），2025-10 ~ 2026-04
