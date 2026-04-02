import { useState, useEffect } from 'react'
import axios from 'axios'
import KPICards from './components/KPICards'
import HealthScore from './components/HealthScore'
import MonthlyCharts from './components/MonthlyCharts'
import ReasonCharts from './components/ReasonCharts'
import ActionList from './components/ActionList'
import OpportunityCards from './components/OpportunityCards'
import VehicleTable from './components/VehicleTable'
import SentimentPanel from './components/SentimentPanel'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function App() {
  const [data, setData] = useState<any>(null)
  const [actions, setActions] = useState<any[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/api/customer/29221`),
      axios.get(`${API_URL}/api/customer/29221/actions`),
      axios.get(`${API_URL}/api/customer/29221/opportunities`)
    ]).then(([d, a, o]) => {
      setData(d.data)
      setActions(a.data)
      setOpportunities(o.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white text-xl animate-pulse">🤖 AI 分析中...</div>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500">無法載入資料，請確認後端服務是否運行中</div>
    </div>
  )

  const healthColor = data.healthScore >= 80 ? '#10b981' : data.healthScore >= 60 ? '#3b82f6' : data.healthScore >= 40 ? '#f59e0b' : '#ef4444'
  const healthLabel = data.healthScore >= 80 ? '健康' : data.healthScore >= 60 ? '良好' : data.healthScore >= 40 ? '注意' : '風險'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 頂部導航 */}
      <nav className="bg-gradient-to-r from-slate-900 to-blue-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <div className="font-bold text-lg">EUP AI 業務小幫手</div>
            <div className="text-xs text-blue-300">Customer Intelligence Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-blue-200">
          <span>📅 分析日期：{data.analysisDate}</span>
          <span>⏰ {data.period}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 客戶標題 */}
        <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 mb-1">客戶編號</div>
            <div className="text-2xl font-bold text-slate-800">客戶 {data.custId}</div>
            <div className="text-sm text-gray-500 mt-1">🚗 車隊規模：{data.totalVehicles} 台</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center"
              style={{ borderColor: healthColor }}>
              <div className="text-2xl font-black" style={{ color: healthColor }}>{data.healthScore}</div>
              <div className="text-xs text-gray-400">/ 100</div>
            </div>
            <div className="text-sm font-bold mt-1" style={{ color: healthColor }}>🔔 {healthLabel}</div>
          </div>
        </div>

        {/* KPI 卡片 */}
        <KPICards data={data} />

        {/* 健康度評分 */}
        <HealthScore breakdown={data.healthBreakdown} score={data.healthScore} healthColor={healthColor} />

        {/* 趨勢圖表 */}
        <MonthlyCharts workOrders={data.workOrders.monthly} services={data.serviceContacts.monthly} />

        {/* 原因分析圖表 */}
        <ReasonCharts maintainReasons={data.maintainReasons} serviceTypes={data.serviceContacts.byType} />

        {/* 情緒分析 */}
        <SentimentPanel signals={data.sentimentSignals} memos={data.memoExamples} />

        {/* 高頻維修車輛 */}
        <VehicleTable vehicles={data.highFreqVehicles} />

        {/* 商機 */}
        <OpportunityCards opportunities={opportunities} />

        {/* 今日行動清單 */}
        <ActionList actions={actions} />

        {/* 頁尾 */}
        <div className="text-center text-xs text-gray-400 py-4">
          AI 業務小幫手 ｜ 資料來源：EUPIM CRM + CTMS_Center FMS ｜ {data.analysisDate} 產出
        </div>
      </div>
    </div>
  )
}
