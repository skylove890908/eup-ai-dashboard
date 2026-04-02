export default function VehicleTable({ vehicles }: { vehicles: any[] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-base font-bold text-slate-800 mb-4">🚗 高頻維修車輛警示（6個月 ≥4次）</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-4 py-2 text-left rounded-tl-lg">車牌號碼</th>
              <th className="px-4 py-2 text-center">6個月工單數</th>
              <th className="px-4 py-2 text-center">其中維護件數</th>
              <th className="px-4 py-2 text-center">風險等級</th>
              <th className="px-4 py-2 text-left rounded-tr-lg">建議行動</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-2">{v.plate}</td>
                <td className="px-4 py-2 text-center font-bold">{v.totalCount} 件</td>
                <td className="px-4 py-2 text-center">{v.repairCount} 件</td>
                <td className="px-4 py-2 text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    v.risk === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${v.risk === 'high' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                    {v.risk === 'high' ? '高風險' : '中風險'}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-600 text-xs">
                  {v.risk === 'high' ? '優先列入設備升級評估' : '本月安排預防性檢修'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
        📊 9台異常車輛佔車隊 8.8%，但貢獻了約 35% 的維修工單量
      </div>
    </div>
  )
}
