export default function SentimentPanel({ signals, memos }: { signals: any[], memos: any[] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-base font-bold text-slate-800 mb-4">😊 NLP 情緒信號分析</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-gray-400 mb-3">從工單備注文字偵測到的關鍵詞：</p>
          <div className="space-y-2">
            {signals.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${
                s.type === 'positive' ? 'bg-green-50' : s.type === 'urgent' ? 'bg-red-50' : 'bg-orange-50'
              }`}>
                <span className="text-lg">{s.icon}</span>
                <span className="flex-1 text-sm">{s.label}</span>
                <span className="text-xl font-black text-slate-700">{s.count}</span>
                <span className="text-xs text-gray-400">件</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-3">特別注意的工單摘錄：</p>
          <div className="space-y-3">
            {memos.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg border ${
                m.type === 'urgent' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
              }`}>
                <div className={`text-xs font-bold mb-1 ${m.type === 'urgent' ? 'text-red-600' : 'text-amber-600'}`}>
                  {m.type === 'urgent' ? '⚠️ 緊急工單' : '😤 服務體驗問題'}
                </div>
                <div className="text-sm text-gray-700">{m.content}</div>
                <div className="text-xs text-gray-400 mt-1">{m.date} ｜ 車牌：{m.plate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
