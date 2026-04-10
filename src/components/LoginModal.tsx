import { useState } from 'react'
import { X } from 'lucide-react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAppStore } from '../store/useAppStore'

export function LoginModal() {
  const { loginModalOpen, closeLoginModal } = useAppStore()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!loginModalOpen) return null

  const handleGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      closeLoginModal()
    } catch {
      setError('Google 登入失敗，請再試一次')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeLoginModal} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <span className="text-4xl">🥗</span>
          <h2 className="mt-3 text-xl font-bold text-gray-900">登入 Nutrition Guard</h2>
          <p className="text-sm text-gray-500 mt-1">記錄飲食、管理健康</p>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <span className="text-base font-bold text-blue-500">G</span>
          使用 Google 帳號登入
        </button>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  )
}
