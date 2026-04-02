const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ============================================
// 示範資料（Cust_ID 29221，真實 CRM 資料）
// ============================================
const customerData = {
  custId: '29221',
  analysisDate: '2026-04-02',
  period: '2025-10 ~ 2026-04（6個月）',
  totalVehicles: 102,
  healthScore: 45,
  healthLevel: '注意',
  healthColor: '#f59e0b',

  workOrders: {
    total: 185,
    byReason: [
      { name: '維護', value: 130 },
      { name: '拆機', value: 15 },
      { name: '裝機', value: 11 },
      { name: '新單', value: 8 },
      { name: '移機', value: 1 }
    ],
    monthly: [
      { month: '10月', label: '2025-10', count: 29 },
      { month: '11月', label: '2025-11', count: 30 },
      { month: '12月', label: '2025-12', count: 26 },
      { month: '1月',  label: '2026-01', count: 16 },
      { month: '2月',  label: '2026-02', count: 12 },
      { month: '3月',  label: '2026-03', count: 47, alert: true }
    ]
  },

  serviceContacts: {
    total: 686,
    monthly: [
      { month: '10月', label: '2025-10', count: 98 },
      { month: '11月', label: '2025-11', count: 127 },
      { month: '12月', label: '2025-12', count: 92 },
      { month: '1月',  label: '2026-01', count: 67 },
      { month: '2月',  label: '2026-02', count: 43 },
      { month: '3月',  label: '2026-03', count: 128, alert: true }
    ],
    byType: [
      { name: '問題處理', value: 327 },
      { name: '故障處理', value: 107 },
      { name: '已收帳款', value: 49 },
      { name: '其他',     value: 32 },
      { name: '系統訊息', value: 12 },
      { name: '帳務處理', value: 8 },
      { name: '訂購產品', value: 5 },
      { name: '客服中心', value: 5 }
    ]
  },

  maintainReasons: [
    { name: '鏡頭黑藍畫面', value: 46, pct: 35.4 },
    { name: '品管換機',     value: 32, pct: 24.6 },
    { name: '鏡頭浸水',     value: 12, pct: 9.2 },
    { name: '螢幕故障',     value: 11, pct: 8.5 },
    { name: 'GPS定位不良',  value: 9,  pct: 6.9 },
    { name: 'GSM失聯',      value: 8,  pct: 6.2 },
    { name: '外包客服',     value: 6,  pct: 4.6 },
    { name: '其他',         value: 6,  pct: 4.6 }
  ],

  healthBreakdown: [
    { name: '維修頻率',   score: 35, weight: 30, raw: '0.21 次/車/月', color: '#ef4444' },
    { name: '故障服務比', score: 50, weight: 25, raw: '問題+故障 63.3%', color: '#f59e0b' },
    { name: '情緒信號',   score: 50, weight: 25, raw: '負向 18.8%', color: '#f59e0b' },
    { name: '月份波動',   score: 30, weight: 10, raw: '3月飆升 +108%', color: '#ef4444' },
    { name: '設備健康',   score: 60, weight: 10, raw: '鏡頭問題 45%', color: '#10b981' }
  ],

  sentimentSignals: [
    { label: '鏡頭黑屏問題',       count: 27, type: 'negative', icon: '📷' },
    { label: '異常/故障詞彙提及',   count: 26, type: 'negative', icon: '⚠️' },
    { label: '鏡頭浸水/模糊',       count: 21, type: 'negative', icon: '💧' },
    { label: '訊號失聯問題',        count: 11, type: 'negative', icon: '📡' },
    { label: '緊急字眼（急、急急急）', count: 3, type: 'urgent', icon: '🚨' },
    { label: '客戶失約事件',        count: 1,  type: 'negative', icon: '😤' },
    { label: '正面詞彙（謝謝）',    count: 2,  type: 'positive', icon: '👍' }
  ],

  memoExamples: [
    {
      date: '2026-03-31',
      plate: '23-XXXX',
      content: '螢幕遇到震動會黑屏，今天務必要維修完成急驗車',
      type: 'urgent'
    },
    {
      date: '2026-03-24',
      plate: 'KL-XXXX',
      content: '定位 VVVV **急急急**',
      type: 'urgent'
    },
    {
      date: '2026-03-12',
      plate: '子車-XXXX',
      content: '技師現場等客移車，但客放鳥等了一個半小時，派工費+$500',
      type: 'negative'
    }
  ],

  highFreqVehicles: [
    { plate: 'KL-XXXX (1)', totalCount: 6, repairCount: 4, risk: 'high' },
    { plate: '44-XXXX',     totalCount: 5, repairCount: 4, risk: 'high' },
    { plate: 'KL-XXXX (2)', totalCount: 5, repairCount: 3, risk: 'high' },
    { plate: '06-XXXX',     totalCount: 4, repairCount: 4, risk: 'medium' },
    { plate: '34-XXXX',     totalCount: 4, repairCount: 4, risk: 'medium' },
    { plate: 'KL-XXXX (3)', totalCount: 4, repairCount: 4, risk: 'medium' },
    { plate: 'KL-XXXX (4)', totalCount: 4, repairCount: 3, risk: 'medium' },
    { plate: 'KL-XXXX (5)', totalCount: 4, repairCount: 4, risk: 'medium' },
    { plate: 'KL-XXXX (6)', totalCount: 4, repairCount: 2, risk: 'medium' }
  ]
};

const actions = [
  { id: 1, priority: 'urgent', label: '🔴 緊急', title: '召開設備健康度緊急會議', reason: '3月工單量飆升 108%（47件），需立即確認是否為系統性問題', deadline: '本週內', color: '#ef4444' },
  { id: 2, priority: 'urgent', label: '🔴 緊急', title: '高頻維修車輛 9 台專項巡視', reason: '9台車輛半年維修 4次以上，異常頻率是正常車輛的 8 倍', deadline: '10 個工作天內', color: '#ef4444' },
  { id: 3, priority: 'important', label: '🟡 重要', title: '提出鏡頭批量更換報價', reason: '鏡頭問題佔維修 44.6%（58件），可轉化為升級商機', deadline: '本月內', color: '#f59e0b' },
  { id: 4, priority: 'important', label: '🟡 重要', title: '安排客戶滿意度電訪', reason: '技師等候 1.5 小時被放鳥，需主動確認服務體驗', deadline: '本週內', color: '#f59e0b' },
  { id: 5, priority: 'normal', label: '🟢 一般', title: '推薦胎壓監測升級方案', reason: '多筆胎壓異常工單，車隊規模大升級潛力佳', deadline: '下次拜訪', color: '#10b981' },
  { id: 6, priority: 'normal', label: '🟢 一般', title: '規劃季度主動維護排程', reason: '故障處理佔 15.6%，提升預防性維護可降低緊急工單', deadline: '季度計畫', color: '#10b981' }
];

const opportunities = [
  {
    id: 1,
    type: 'upgrade',
    priority: 'high',
    title: '高頻維修車輛設備升級',
    detail: '9 台車輛在 6 個月內維修 4 次以上，設備已進入高故障期，建議提出換代評估',
    estimatedValue: '預估可減少維修費用 30~50%',
    color: '#ef4444'
  },
  {
    id: 2,
    type: 'project',
    priority: 'high',
    title: '鏡頭設備批量更換專案',
    detail: '鏡頭黑藍畫面 + 浸水共 58 件（44.6%），整合為批量報價可節省出車成本',
    estimatedValue: '批量報價優惠 + 減少 58 次個別出車',
    color: '#f97316'
  },
  {
    id: 3,
    type: 'upsell',
    priority: 'medium',
    title: '胎壓監測系統加裝',
    detail: '多筆胎壓異常工單，推估 30 台有升級需求，可搭配合約加值推薦',
    estimatedValue: '約 30 台 × $400 = $12,000',
    color: '#f59e0b'
  }
];

// ============================================
// API 路由
// ============================================
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/api/customer/:id', (req, res) => {
  if (req.params.id !== '29221') return res.status(404).json({ error: 'Customer not found' });
  res.json(customerData);
});

app.get('/api/customer/:id/workorders', (req, res) => {
  res.json(customerData.workOrders);
});

app.get('/api/customer/:id/services', (req, res) => {
  res.json(customerData.serviceContacts);
});

app.get('/api/customer/:id/actions', (req, res) => {
  res.json(actions);
});

app.get('/api/customer/:id/opportunities', (req, res) => {
  res.json(opportunities);
});

app.get('/api/customers', (req, res) => {
  res.json([{ id: '29221', name: '示範客戶 29221', vehicles: 102, healthScore: 45, healthLevel: '注意' }]);
});

app.listen(PORT, () => {
  console.log(`🚀 EUP AI Dashboard API running on port ${PORT}`);
});
