import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function MonthlyCharts({ workOrders, services }: { workOrders: any[], services: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4">📈 月工單量趨勢（6個月）</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={workOrders}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" radius={[4,4,0,0]}>
              {workOrders.map((entry, i) => (
                <Cell key={i} fill={entry.alert ? '#ef4444' : entry.count >= 25 ? '#f59e0b' : '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-xs text-red-500 mt-2 text-center">▲ 3月異常飆升 +108%</div>
      </div>
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4">📞 月服務接觸趨勢（6個月）</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={services}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2}
              dot={({ cx, cy, payload }) => (
                <circle cx={cx} cy={cy} r={payload.alert ? 6 : 4}
                  fill={payload.alert ? '#ef4444' : '#8b5cf6'} />
              )} />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-xs text-red-500 mt-2 text-center">▲ 3月服務接觸同步高峰（128筆）</div>
      </div>
    </div>
  )
}
