import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import { dashboardAPI } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import PerformanceChart from '../components/PerformanceChart';
import TodoList from '../components/TodoList';
import ProfileAvatar from '../components/ProfileAvatar';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, profile, signOut, isAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  // Fetch notifications and stats from database
  useEffect(() => {
    // Only fetch data if user exists AND profile is verified
    if (user && profile && profile.email_verified) {
      // Small delay to ensure session is fully loaded
      const timer = setTimeout(() => {
        fetchNotifications();
        fetchDashboardStats();
      }, 100);
      
      // Refresh stats every 30 seconds
      const interval = setInterval(fetchDashboardStats, 30000);
      
      // Listen for test submission events to refresh immediately
      const handleTestSubmitted = () => {
        fetchDashboardStats();
        fetchNotifications();
      };
      
      window.addEventListener('testSubmitted', handleTestSubmitted);
      
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
        window.removeEventListener('testSubmitted', handleTestSubmitted);
      };
    }
  }, [user, profile]);

  const fetchNotifications = async () => {
    if (!user) {
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('❌ Error fetching notifications:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error code:', error.code);
        throw error;
      }
      
      setNotifications(data || []);
    } catch (error: any) {
      // Silently handle error
    }
  };

  const fetchDashboardStats = async () => {
    if (!user) return;
    
    try {
      const data = await dashboardAPI.getStats(user.id);
      
      if (data.error) {
        console.error('Dashboard stats error:', data.error);
        return;
      }
      
      setDashboardStats(data);
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      // Silently handle error - user will see default stats instead
      // Network issues shouldn't disrupt the user experience
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
      fetchNotifications();
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
      toast.success('Notification deleted');
      fetchNotifications();
    } catch (error: any) {
      toast.error('Failed to delete notification');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Real-time stats from API
  const stats = dashboardStats?.stats ? [
    { 
      label: 'Course Progress', 
      value: `${dashboardStats.stats.courseProgress}%`, 
      change: `${dashboardStats.stats.totalTests} tests taken`, 
      trend: 'up', 
      color: 'bg-orange-200' 
    },
    { 
      label: 'Attendance', 
      value: `${dashboardStats.stats.attendance}%`, 
      change: 'Based on weekly activity', 
      trend: dashboardStats.stats.attendance >= 70 ? 'up' : 'down', 
      color: 'bg-green-200' 
    },
    { 
      label: 'Avg Score', 
      value: `${dashboardStats.stats.averageScore}%`, 
      change: `${dashboardStats.stats.totalTests} tests completed`, 
      trend: dashboardStats.stats.averageScore >= 70 ? 'up' : 'down', 
      color: 'bg-blue-200' 
    },
  ] : [
    { label: 'Course Progress', value: '0%', change: 'No tests yet', trend: 'up', color: 'bg-orange-200' },
    { label: 'Attendance', value: '0%', change: 'No tests yet', trend: 'up', color: 'bg-green-200' },
    { label: 'Avg Score', value: '0%', change: 'No tests yet', trend: 'up', color: 'bg-blue-200' },
  ];

  const recentSummaries = [
    { 
      id: 1, 
      title: 'Introduction to Data Structures', 
      course: 'CIT211 - Data Structures',
      lastRead: '2 days ago',
      progress: 75,
      icon: 'book',
      color: 'bg-purple-100'
    },
    { 
      id: 2, 
      title: 'Algorithm Analysis & Complexity', 
      course: 'CIT311 - Algorithm Design',
      lastRead: '5 hours ago',
      progress: 45,
      icon: 'chart',
      color: 'bg-green-100'
    },
    { 
      id: 3, 
      title: 'Database Normalization', 
      course: 'CIT221 - Database Systems',
      lastRead: '1 week ago',
      progress: 30,
      icon: 'database',
      color: 'bg-yellow-100'
    },
    { 
      id: 4, 
      title: 'Software Development Lifecycle', 
      course: 'CIT321 - Software Engineering',
      lastRead: '3 days ago',
      progress: 60,
      icon: 'code',
      color: 'bg-blue-100'
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NEXA Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold">NEXA</span>
          </div>
        </div>

        <nav className="flex-1 px-4">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </a>
          <a href="/summaries" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Summaries</span>
          </a>
          <a href="/cbt" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>CBT Practice</span>
          </a>
          <a href="/schedule" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Schedule</span>
          </a>
          <a href="/billing" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Billing</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a href="/help" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Get Help</span>
          </a>
          <a href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
          {isAdmin && (
            <a href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Admin Panel</span>
            </a>
          )}
          <button 
            onClick={async () => {
              if (confirm('Are you sure you want to logout?')) {
                await signOut();
                window.location.href = '/';
              }
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-red-900 rounded-lg transition-colors text-red-400 hover:text-red-300 w-full text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-b'} px-4 sm:px-8 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}!
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Subscription Badge */}
            {profile?.subscription_tier === 'pro' ? (
              <a
                href="/billing"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                PRO
              </a>
            ) : (
              <a
    href="/billing"
    className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors
        ${isDarkMode 
            ? 'bg-gray-700 text-white hover:bg-gray-600' // Dark Mode: Darker background, white text
            : 'bg-black text-white hover:bg-gray-800'  // Light Mode: Black background, white text (as requested)
        }
    `}
>
    FREE
</a>
            )}
            <button 
  onClick={toggleDarkMode}
  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
>
  {isDarkMode ? (
    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )}
</button>
            {/* Notifications Dropdown */}
            <div className="relative">
             <button 
  onClick={() => setShowNotifications(!showNotifications)}
  className={`relative p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
>
  <svg className={`w-6 h-6 ${isDarkMode ? 'text-gray-200' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
  {unreadCount > 0 && (
    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
      {unreadCount}
    </span>
  )}
</button>
              
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-lg shadow-xl z-20 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    {/* Header */}
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                            className={`px-4 py-3 border-b transition-colors cursor-pointer relative group ${
                              isDarkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-gray-50'
                            } ${!notification.read ? (isDarkMode ? 'bg-blue-900/20 border-l-4 border-l-primary-500' : 'bg-blue-50 border-l-4 border-l-primary-600') : ''}`}
                          >
                            <div className="flex gap-3">
                              {/* Icon */}
                              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                notification.type === 'assignment' ? 'bg-orange-100' :
                                notification.type === 'exam' ? 'bg-red-100' :
                                notification.type === 'grade' ? 'bg-green-100' :
                                'bg-blue-100'
                              }`}>
                                {notification.icon === 'clipboard' && (
                                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                  </svg>
                                )}
                                {notification.icon === 'calendar' && (
                                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                )}
                                {notification.icon === 'star' && (
                                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                )}
                                {notification.icon === 'bell' && (
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                  </svg>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <p className={`font-semibold text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                      {notification.title}
                                      {!notification.read && (
                                        <span className="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">New</span>
                                      )}
                                    </p>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100 ${isDarkMode ? 'hover:bg-red-900/30' : ''}`}
                                    title="Delete notification"
                                  >
                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {notification.message}
                                </p>
                                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {new Date(notification.created_at).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <svg className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            No notifications
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <button className={`w-full text-center text-sm font-medium ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>
                          View all notifications
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
  onClick={() => setShowProfileMenu(!showProfileMenu)}
  className={`rounded-full ${isDarkMode ? 'hover:ring-2 hover:ring-gray-600' : 'hover:ring-2 hover:ring-gray-300'}`}
>
  <ProfileAvatar 
    avatarUrl={profile?.avatar_url}
    fullName={profile?.full_name || user?.email?.split('@')[0]}
    size="sm"
  />
</button>
              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-20 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{profile?.full_name || 'User'}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile?.email || user?.email || ''}</p>
                    </div>
                    <div className="py-1">
                      <a 
                        href="/settings" 
                        className={`flex items-center gap-3 px-4 py-2 text-sm ${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </a>
                      <button 
                        onClick={async () => {
                          if (confirm('Are you sure you want to logout?')) {
                            await signOut();
                            window.location.href = '/';
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {/* Stats Cards */}
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.color} rounded-2xl p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-700 mb-1">{stat.label}</p>
                    <h3 className="text-4xl font-bold text-gray-900">{stat.value}</h3>
                  </div>
                  {stat.trend === 'up' ? (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-600">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Performance Chart - Using Real Data Component */}
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>

            {/* Calendar */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 sm:p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{monthName}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentDate(newDate);
                    }}
                    className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <svg className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentDate(newDate);
                    }}
                    className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <svg className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className={`text-center text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === new Date().getDate() && 
                    currentDate.getMonth() === new Date().getMonth() && 
                    currentDate.getFullYear() === new Date().getFullYear();
                  const isSelected = day === selectedDate && 
                    currentDate.getMonth() === new Date().getMonth() && 
                    currentDate.getFullYear() === new Date().getFullYear();
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDate(day);
                        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                        setTaskDate(clickedDate);
                        setShowTaskModal(true);
                      }}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-orange-500 text-white font-semibold'
                          : isToday
                            ? 'bg-primary-100 text-primary-700 font-semibold'
                            : isDarkMode 
                              ? 'hover:bg-gray-700 text-gray-300' 
                              : 'hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Summaries and Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {/* Recent Summaries */}
            <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 sm:p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Continue Reading</h3>
                <a 
  href="/summaries" 
  className={`text-sm ${isDarkMode ? 'text-orange-500 hover:text-orange-400' : 'text-black hover:text-gray-800'}`}
>
    View all →
</a>
              </div>
              <div className="space-y-4">
                {recentSummaries.map((summary) => (
                  <div key={summary.id} className={`flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => window.location.href = '/summaries'}
                  >
                    <div className={`w-12 h-12 ${summary.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {summary.icon === 'book' && (
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                      {summary.icon === 'chart' && (
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )}
                      {summary.icon === 'database' && (
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                      )}
                      {summary.icon === 'code' && (
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{summary.title}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>{summary.course}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className={`h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className="h-2 rounded-full bg-primary-600"
                              style={{ width: `${summary.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {summary.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Last read: {summary.lastRead}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = '/summaries';
                        }}
                        className="px-4 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 font-medium"
                      >
                        Continue Reading
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Todo Tasks */}
            <TodoList />
          </div>
        </div>
      </main>
      </div>

      {/* Task Creation Modal */}
      {showTaskModal && taskDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Add Task for {taskDate.toLocaleDateString()}
              </h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              You can create tasks and schedule items from the Schedule page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  window.location.href = '/schedule';
                }}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Go to Schedule
              </button>
              <button
                onClick={() => setShowTaskModal(false)}
                className={`px-4 py-2 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
