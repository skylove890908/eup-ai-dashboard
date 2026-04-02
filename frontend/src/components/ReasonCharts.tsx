import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#ef4444','#f97316','#f59e0b','#eab308','#84cc16','#22c55e','#06b6d4','#94a3b8']

export default function ReasonCharts({ maintainReasons, serviceTypes }: { maintainReasons: any[], serviceTypes: any[] }) {
  const renderLabel = ({ name, pct }: any) => pct ? `${pct}%` : ''
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4">🔧 維修原因分佈</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={maintainReasons} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
              dataKey="value" nameKey="name">
              {maintainReasons.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v: any, n: any) => [`${v} 件`, n]} />
            <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4">📋 服務類型佔比</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={serviceTypes} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
              dataKey="value" nameKey="name">
              {serviceTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v: any, n: any) => [`${v} 筆`, n]} />
            <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
