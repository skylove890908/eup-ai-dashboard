export default function KPICards({ data }: { data: any }) {
  const cards = [
    { num: data.workOrders.total, unit: '件', label: '6個月工單總量', sub: '3月飆升 +108%', color: '#ef4444', border: 'border-red-400' },
    { num: data.serviceContacts.total, unit: '筆', label: '6個月服務接觸', sub: '故障類佔 63.3%', color: '#f97316', border: 'border-orange-400' },
    { num: data.healthScore, unit: '/100', label: '客戶健康度評分', sub: '🟡 注意區間', color: '#f59e0b', border: 'border-yellow-400' },
    { num: 3, unit: '個', label: 'AI識別商機', sub: '含 2 個高優先', color: '#10b981', border: 'border-green-400' }
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className={`bg-white rounded-2xl shadow p-5 border-t-4 ${c.border}`}>
          <div className="text-3xl font-black text-slate-800">{c.num}</div>
          <div className="text-sm text-gray-400">{c.unit}</div>
          <div className="text-xs text-gray-600 mt-1">{c.label}</div>
          <div className="text-xs mt-2 font-semibold" style={{ color: c.color }}>{c.sub}</div>
        </div>
      ))}
    </div>
  )
}
