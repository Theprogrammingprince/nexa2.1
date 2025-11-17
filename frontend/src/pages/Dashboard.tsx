import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 0, 1)); // January 2023
  const [selectedDate, setSelectedDate] = useState(7);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Listen for theme changes from settings
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      setIsDarkMode(savedTheme === 'dark');
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  // Update localStorage when dark mode changes via toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Mock data
  const stats = [
    { label: 'Course Progress', value: '48%', change: '15% this week', trend: 'up', color: 'bg-orange-200' },
    { label: 'Attendance', value: '97%', change: '30.10 this week', trend: 'up', color: 'bg-green-200' },
    { label: 'Avg Score', value: '86%', change: '30-70% this week', trend: 'down', color: 'bg-blue-200' },
  ];

  const assignments = [
    { 
      id: 1, 
      title: 'Data Structure', 
      subject: 'CSC 201',
      date: 'JAN 10, 2025',
      time: 'At 08:00 PM',
      marks: '20 Marks',
      status: 'Pending',
      icon: '📊',
      color: 'bg-orange-100'
    },
    { 
      id: 2, 
      title: 'System Analysis', 
      subject: 'CSC 301',
      date: 'JAN 09, 2025',
      time: 'At 08:00 PM',
      marks: '10 Marks',
      status: 'Submitted',
      icon: '🔍',
      color: 'bg-green-100'
    },
    { 
      id: 3, 
      title: 'Information Design', 
      subject: 'CSC 205',
      date: 'JAN 15, 2025',
      time: 'At 08:00 PM',
      marks: '20 Marks',
      status: 'Pending',
      icon: '💡',
      color: 'bg-purple-100'
    },
    { 
      id: 4, 
      title: 'Business Development', 
      subject: 'CSC 305',
      date: 'JAN 25, 2025',
      time: 'At 08:00 PM',
      marks: '55 Marks',
      status: 'Pending',
      icon: '💼',
      color: 'bg-blue-100'
    },
  ];

  const tasks = [
    { id: 1, title: 'Math Class', subject: 'Class', date: 'JAN 02, 2025', time: 'At 01:00 PM' },
    { id: 2, title: 'Batch Re-Union', subject: 'Cultural Activity', date: 'JAN 02, 2025', time: 'At 05:00 AM' },
    { id: 3, title: 'Gardening Campaign', subject: 'Class', date: 'JAN 02, 2025', time: 'At 01:00 PM' },
    { id: 4, title: 'System Analysis Class', subject: 'Class', date: 'JAN 02, 2025', time: 'At 01:00 PM' },
    { id: 5, title: 'Data Structure Class', subject: 'Class', date: 'JAN 02, 2025', time: 'At 02:00 PM' },
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
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
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>CBT Practice</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Schedule</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>Resources</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Get Help</span>
          </a>
          <a href="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
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
            <input
              type="text"
              placeholder="Search or type a command"
              className={`w-full max-w-md px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100'
              }`}
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button className={`relative p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
              U
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
            {/* Performance Chart */}
            <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 sm:p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Performance Overview</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your test scores over time</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score Trend</span>
                  </div>
                  <select className={`px-3 py-1 border rounded-lg text-sm ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
              </div>
              
              {/* Chart Container */}
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 pr-2">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-8 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                    ))}
                  </div>
                  
                  {/* SVG Chart */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                        <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.1 }} />
                      </linearGradient>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                        <stop offset="50%" style={{ stopColor: '#8b5cf6' }} />
                        <stop offset="100%" style={{ stopColor: '#ec4899' }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Area fill */}
                    <path
                      d="M 0,160 L 0,120 Q 14,100 28,110 T 56,95 T 84,105 T 112,80 T 140,90 T 168,70 T 196,85 L 196,160 Z"
                      fill="url(#chartGradient)"
                      className="transition-all duration-500"
                    />
                    
                    {/* Line */}
                    <path
                      d="M 0,120 Q 14,100 28,110 T 56,95 T 84,105 T 112,80 T 140,90 T 168,70 T 196,85"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    
                    {/* Data points */}
                    <circle cx="0" cy="120" r="4" fill="#3b82f6" className="animate-pulse" />
                    <circle cx="28" cy="110" r="4" fill="#3b82f6" />
                    <circle cx="56" cy="95" r="4" fill="#6366f1" />
                    <circle cx="84" cy="105" r="4" fill="#8b5cf6" />
                    <circle cx="112" cy="80" r="5" fill="#a855f7" stroke="#fff" strokeWidth="2">
                      <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="140" cy="90" r="4" fill="#c026d3" />
                    <circle cx="168" cy="70" r="4" fill="#ec4899" />
                    <circle cx="196" cy="85" r="4" fill="#ec4899" className="animate-pulse" />
                  </svg>
                  
                  {/* Highlight tooltip */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">
                    <div className="text-center">
                      <div className="text-xs opacity-80">Best Score</div>
                      <div className="text-lg">92%</div>
                    </div>
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-400 mt-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              
              {/* Stats below chart */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>92%</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Highest</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>78%</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold text-green-500`}>+14%</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Improvement</p>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 sm:p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{monthName}</h3>
                <div className="flex gap-2">
                  <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <svg className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
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
                  const isSelected = day === selectedDate;
                  return (
                    <button
                      key={day}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                        isSelected
                          ? 'bg-orange-500 text-white font-semibold'
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

          {/* Assignments and Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {/* Assignments */}
            <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 sm:p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Assignments</h3>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                  View all →
                </a>
              </div>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <div className={`w-12 h-12 ${assignment.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {assignment.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{assignment.title}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{assignment.date}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{assignment.time}</p>
                    </div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {assignment.marks}
                    </div>
                    <div>
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        assignment.status === 'Pending' 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 sm:p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tasks</h3>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                  View all
                </a>
              </div>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-primary-600 rounded" />
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{task.title}</h4>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{task.subject}</p>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {task.date}<br />{task.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
