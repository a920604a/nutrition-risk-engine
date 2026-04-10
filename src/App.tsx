import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useAppStore } from './store/useAppStore'
import { Navbar } from './components/Navbar'
import { LoginModal } from './components/LoginModal'
import { ToastProvider } from './components/Toast'
import { PageTransition } from './components/PageTransition'
import { useConditionsSync } from './hooks/useConditionsSync'
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Recommendations } from './pages/Recommendations'
import { Diary } from './pages/Diary'
import { Knowledge } from './pages/Knowledge'
import { FAQ } from './pages/FAQ'
import { Favorites } from './pages/Favorites'
import { NotFound } from './pages/NotFound'

function AppInner() {
  const setUser = useAppStore((s) => s.setUser)
  useConditionsSync()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <LoginModal />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </BrowserRouter>
  )
}
