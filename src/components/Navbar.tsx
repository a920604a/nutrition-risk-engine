import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useAppStore } from '../store/useAppStore'

const NAV_ITEMS = [
  { label: '首頁', path: '/' },
  { label: '食物查詢', path: '/search' },
  { label: '飲食建議', path: '/recommendations' },
  { label: '飲食日記', path: '/diary', requiresAuth: true },
  { label: '知識專區', path: '/knowledge' },
  { label: '常見問題', path: '/faq' },
  { label: '我的收藏', path: '/favorites', requiresAuth: true },
]

export function Navbar() {
  const location = useLocation()
  const { user, openLoginModal } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (requiresAuth?: boolean) => {
    setMobileOpen(false)
    if (requiresAuth && !user) {
      openLoginModal()
      return false
    }
    return true
  }

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
            <span className="text-2xl">🥗</span>
            <span className="hidden sm:block">Nutrition Guard</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.requiresAuth && !user ? '#' : item.path}
                  onClick={() => handleNavClick(item.requiresAuth)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600">
                  <User size={16} />
                  <span className="max-w-24 truncate">{user.displayName ?? user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={15} />
                  <span className="hidden sm:block">登出</span>
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                登入
              </button>
            )}

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.requiresAuth && !user ? '#' : item.path}
                  onClick={() => handleNavClick(item.requiresAuth)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.requiresAuth && !user && (
                    <span className="ml-2 text-xs text-gray-400">🔒</span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
