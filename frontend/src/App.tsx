import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import SettingsPage from './pages/SettingsPage'
import PricingPage from './pages/PricingPage'
import SummariesPage from './pages/SummariesPage'
import SummaryDetailPage from './pages/SummaryDetailPage'
import SchedulePage from './pages/SchedulePage'
import CBTPracticePage from './pages/CBTPracticePage'
import CBTInstructionPage from './pages/CBTInstructionPage'
import CBTTestPage from './pages/CBTTestPage'
import CBTResultsPage from './pages/CBTResultsPage'
import AdminAddSummary from './pages/AdminAddSummary'
import AdminAddQuestions from './pages/AdminAddQuestions'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Protected Student Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/summaries" element={<ProtectedRoute><SummariesPage /></ProtectedRoute>} />
            <Route path="/summaries/:id" element={<ProtectedRoute><SummaryDetailPage /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
            <Route path="/cbt" element={<ProtectedRoute><CBTPracticePage /></ProtectedRoute>} />
            <Route path="/cbt-practice" element={<Navigate to="/cbt" replace />} />
            <Route path="/cbt/instruction/:courseId" element={<ProtectedRoute><CBTInstructionPage /></ProtectedRoute>} />
            <Route path="/cbt/test/:courseId" element={<ProtectedRoute><CBTTestPage /></ProtectedRoute>} />
            <Route path="/cbt/results" element={<ProtectedRoute><CBTResultsPage /></ProtectedRoute>} />
            
            {/* Admin Only Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/add-summary" element={<ProtectedRoute requireAdmin><AdminAddSummary /></ProtectedRoute>} />
            <Route path="/admin/add-questions" element={<ProtectedRoute requireAdmin><AdminAddQuestions /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
