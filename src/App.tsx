import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useAppStore } from './store/useAppStore'
import { Navbar } from './components/Navbar'
import { LoginModal } from './components/LoginModal'
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Recommendations } from './pages/Recommendations'
import { Diary } from './pages/Diary'
import { Knowledge } from './pages/Knowledge'
import { FAQ } from './pages/FAQ'
import { Favorites } from './pages/Favorites'

export default function App() {
  const setUser = useAppStore((s) => s.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <LoginModal />
      </div>
    </BrowserRouter>
  )
}
