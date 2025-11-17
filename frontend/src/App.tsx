import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import SettingsPage from './pages/SettingsPage'
import PricingPage from './pages/PricingPage'
import SummariesPage from './pages/SummariesPage'
import SummaryDetailPage from './pages/SummaryDetailPage'
import SchedulePage from './pages/SchedulePage'
import CBTPracticePage from './pages/CBTPracticePage'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/summaries" element={<SummariesPage />} />
          <Route path="/summaries/:id" element={<SummaryDetailPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/cbt-practice" element={<CBTPracticePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
