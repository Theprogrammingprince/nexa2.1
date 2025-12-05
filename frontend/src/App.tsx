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
import BillingPage from './pages/BillingPage'
import AdminStudents from './pages/AdminStudents'
import AdminAnalytics from './pages/AdminAnalytics'
import AdminMessages from './pages/AdminMessages'
import AdminAnnouncements from './pages/AdminAnnouncements'
import AdminBlog from './pages/AdminBlog'
import GetHelpPage from './pages/GetHelpPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import CookiePolicyPage from './pages/CookiePolicyPage'
import SitemapPage from './pages/SitemapPage'
import BlogPage from './pages/BlogPage'
import DocumentationPage from './pages/DocumentationPage'
import FeaturesPage from './pages/FeaturesPage'
import NotFoundPage from './pages/NotFoundPage'
import ContactPage from './pages/ContactPage'
import CookieConsent from './components/CookieConsent'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <CookieConsent />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Protected Student Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
            <Route path="/summaries" element={<ProtectedRoute><SummariesPage /></ProtectedRoute>} />
            <Route path="/summaries/:id" element={<ProtectedRoute><SummaryDetailPage /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
            <Route path="/cbt" element={<ProtectedRoute><CBTPracticePage /></ProtectedRoute>} />
            <Route path="/cbt-practice" element={<Navigate to="/cbt" replace />} />
            <Route path="/cbt/instruction/:courseId" element={<ProtectedRoute><CBTInstructionPage /></ProtectedRoute>} />
            <Route path="/cbt/test/:courseId" element={<ProtectedRoute><CBTTestPage /></ProtectedRoute>} />
            <Route path="/cbt/results" element={<ProtectedRoute><CBTResultsPage /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><GetHelpPage /></ProtectedRoute>} />
            
            {/* Admin Only Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute requireAdmin><AdminStudents /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><AdminAnalytics /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute requireAdmin><AdminMessages /></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute requireAdmin><AdminAnnouncements /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute requireAdmin><AdminBlog /></ProtectedRoute>} />
            <Route path="/admin/add-summary" element={<ProtectedRoute requireAdmin><AdminAddSummary /></ProtectedRoute>} />
            <Route path="/admin/add-questions" element={<ProtectedRoute requireAdmin><AdminAddQuestions /></ProtectedRoute>} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
