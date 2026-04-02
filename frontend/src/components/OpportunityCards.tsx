export default function OpportunityCards({ opportunities }: { opportunities: any[] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-base font-bold text-slate-800 mb-4">💡 AI 識別商機</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {opportunities.map((o) => (
          <div key={o.id} className="border rounded-xl p-4" style={{ borderTopWidth: 4, borderTopColor: o.color }}>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: o.color + '20', color: o.color }}>
              {o.type === 'upgrade' ? '升級商機' : o.type === 'project' ? '專案報價' : '加購推薦'}
            </span>
            <h3 className="font-bold text-slate-800 mt-2 mb-1">{o.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{o.detail}</p>
            <div className="text-xs font-bold text-blue-600">💰 {o.estimatedValue}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
