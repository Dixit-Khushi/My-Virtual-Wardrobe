import { useEffect } from 'react'
import { useWardrobeStore } from './store/wardrobeStore'
import LandingPage from './pages/LandingPage'
import ClosetPage from './pages/ClosetPage'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

export default function App() {
  const { currentView, isLoading, setLoading } = useWardrobeStore()

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [setLoading])

  if (isLoading) return <LoadingScreen />

  return (
    <div className="app-root">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'closet' && <ClosetPage />}
    </div>
  )
}
