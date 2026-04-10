import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center animate-fadeIn">
      <div className="text-8xl mb-6">🥗</div>
      <h1 className="text-5xl font-bold text-gray-900 mb-3">404</h1>
      <p className="text-xl text-gray-500 mb-2">找不到這個頁面</p>
      <p className="text-gray-400 text-sm mb-8">您造訪的頁面不存在，或已被移除</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
      >
        返回首頁
      </Link>
    </div>
  )
}
