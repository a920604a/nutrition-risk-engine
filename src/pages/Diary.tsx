import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAppStore } from '../store/useAppStore'
import { Trash2, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

interface LogEntry {
  id: string
  food_name: string
  timestamp: Timestamp
  risks: { gout: number; lipids: number; diabetes: number; hypertension: number }
}

const RISK_COLOR = (score: number) =>
  score >= 4 ? 'text-red-600 bg-red-50' : score >= 2 ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'

export function Diary() {
  const { user } = useAppStore()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = async () => {
    if (!user) return
    setLoading(true)
    const q = query(
      collection(db, 'users', user.uid, 'food_logs'),
      orderBy('timestamp', 'desc'),
      limit(30)
    )
    const snap = await getDocs(q)
    setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as LogEntry)))
    setLoading(false)
  }

  useEffect(() => { fetchLogs() }, [user])

  const handleDelete = async (id: string) => {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'food_logs', id))
    setLogs((prev) => prev.filter((l) => l.id !== id))
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">飲食日記</h2>
        <p className="text-gray-500 mb-6">登入後即可記錄每日飲食，追蹤飲食風險趨勢</p>
        <button
          onClick={() => useAppStore.getState().openLoginModal()}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          立即登入
        </button>
      </div>
    )
  }

  // Group by date
  const grouped: Record<string, LogEntry[]> = {}
  for (const log of logs) {
    const date = log.timestamp?.toDate().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' }) ?? '未知日期'
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(log)
  }

  // High risk count today
  const today = new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' })
  const todayLogs = grouped[today] ?? []
  const todayHighRisk = todayLogs.filter((l) =>
    Math.max(l.risks.gout, l.risks.lipids, l.risks.diabetes, l.risks.hypertension) >= 4
  ).length

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">飲食日記</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">今日記錄</p>
          <p className="text-3xl font-bold text-gray-900">{todayLogs.length}</p>
          <p className="text-xs text-gray-400">筆</p>
        </div>
        <div className={`border rounded-xl p-4 shadow-sm ${todayHighRisk > 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
          <p className="text-xs text-gray-500 mb-1">今日高風險</p>
          <p className={`text-3xl font-bold ${todayHighRisk > 0 ? 'text-red-600' : 'text-green-600'}`}>{todayHighRisk}</p>
          <p className="text-xs text-gray-400">次</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">載入中...</div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">還沒有飲食紀錄</p>
          <Link to="/search" className="text-indigo-600 font-medium hover:underline">前往食物查詢，記錄第一筆</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, entries]) => (
            <div key={date}>
              <h2 className="text-sm font-semibold text-gray-500 mb-3">{date}</h2>
              <div className="space-y-2">
                {entries.map((log) => {
                  const maxScore = Math.max(log.risks.gout, log.risks.lipids, log.risks.diabetes, log.risks.hypertension)
                  return (
                    <div key={log.id} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{log.food_name}</p>
                          <p className="text-xs text-gray-400">
                            {log.timestamp?.toDate().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${RISK_COLOR(maxScore)}`}>
                          {maxScore >= 4 ? '高風險' : maxScore >= 2 ? '中風險' : '低風險'}
                        </span>
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
