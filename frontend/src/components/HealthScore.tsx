export default function HealthScore({ breakdown, score, healthColor }: { breakdown: any[], score: number, healthColor: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-base font-bold text-slate-800 mb-4">💗 客戶健康度評分詳解</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="w-36 h-36 rounded-full border-8 flex flex-col items-center justify-center"
            style={{ borderColor: healthColor }}>
            <div className="text-4xl font-black" style={{ color: healthColor }}>{score}</div>
            <div className="text-xs text-gray-400">健康度</div>
          </div>
          <div className="mt-3 text-sm font-bold" style={{ color: healthColor }}>
            {score >= 80 ? '🟢 健康' : score >= 60 ? '🔵 良好' : score >= 40 ? '🟡 注意' : '🔴 風險'}
          </div>
          <div className="text-xs text-gray-400 mt-1">建議本週主動聯繫</div>
        </div>
        <div className="space-y-3">
          {breakdown.map((d, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{d.name}</span>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>{d.raw}</span>
                  <span>佔 {d.weight}%</span>
                  <span className="font-bold" style={{ color: d.color }}>{d.score} 分</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-2 rounded-full" style={{ width: `${d.score}%`, backgroundColor: d.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        ⚠️ <strong>AI 評估：</strong>維修頻率偏高（0.21次/車/月），3月出現異常工單高峰，建議本週主動聯繫確認原因並提出升級方案。
      </div>
    </div>
  )
}
