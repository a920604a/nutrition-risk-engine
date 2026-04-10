import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAppStore } from '../store/useAppStore'
import { Heart, Trash2, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

interface FavoriteItem {
  id: string
  food_id: string
  food_name_zh: string
  food_name_en: string
}

export function Favorites() {
  const { user } = useAppStore()
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    getDocs(collection(db, 'users', user.uid, 'favorites')).then((snap) => {
      setFavorites(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FavoriteItem)))
      setLoading(false)
    })
  }, [user])

  const handleRemove = async (id: string) => {
    if (!user) return
    await deleteDoc(doc(db, 'users', user.uid, 'favorites', id))
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Heart size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">我的收藏</h2>
        <p className="text-gray-500 mb-6">登入後即可收藏食物，快速查閱風險</p>
        <button
          onClick={() => useAppStore.getState().openLoginModal()}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          立即登入
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">我的收藏</h1>
        <span className="text-sm text-gray-400">{favorites.length} 筆</span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">載入中...</div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">還沒有收藏任何食物</p>
          <Link to="/search" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline">
            <Search size={16} />
            前往食物查詢
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <div key={fav.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{fav.food_name_zh}</h3>
                  <p className="text-xs text-gray-400">{fav.food_name_en}</p>
                </div>
                <button
                  onClick={() => handleRemove(fav.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="text-xs text-gray-400 italic">前往食物查詢查看詳細風險</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
