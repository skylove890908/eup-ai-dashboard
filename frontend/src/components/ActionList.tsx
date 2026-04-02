export default function ActionList({ actions }: { actions: any[] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-base font-bold text-slate-800 mb-4">📋 今日行動清單</h2>
      <div className="space-y-3">
        {actions.map((a) => (
          <div key={a.id} className="flex gap-3 items-start p-3 rounded-xl border"
            style={{ borderLeftWidth: 4, borderLeftColor: a.color,
              background: a.priority === 'urgent' ? '#fef2f2' : a.priority === 'important' ? '#fffbeb' : '#f0fdf4' }}>
            <span className="text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap"
              style={{ background: a.color + '20', color: a.color }}>
              {a.label}
            </span>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-sm">{a.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{a.reason}</div>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded whitespace-nowrap">
              ⏰ {a.deadline}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
