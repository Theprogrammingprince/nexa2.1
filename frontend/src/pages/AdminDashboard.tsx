import { useState } from 'react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const stats = [
    { label: 'Total Students', value: '1,248', change: '+12% this month', trend: 'up', color: 'bg-blue-200' },
    { label: 'Active Tests', value: '45', change: '+8 new this week', trend: 'up', color: 'bg-green-200' },
    { label: 'Avg Performance', value: '78%', change: '+5% from last month', trend: 'up', color: 'bg-purple-200' },
  ];

  const recentTests = [
    { 
      id: 1, 
      title: 'Data Structure Final', 
      course: 'CSC 201',
      students: 145,
      avgScore: '82%',
      date: 'JAN 15, 2025',
      status: 'Active',
      icon: 'chart'
    },
    { 
      id: 2, 
      title: 'System Analysis Midterm', 
      course: 'CSC 301',
      students: 128,
      avgScore: '75%',
      date: 'JAN 12, 2025',
      status: 'Completed',
      icon: 'search'
    },
    { 
      id: 3, 
      title: 'Database Management Quiz', 
      course: 'CSC 205',
      students: 156,
      avgScore: '88%',
      date: 'JAN 18, 2025',
      status: 'Scheduled',
      icon: 'database'
    },
    { 
      id: 4, 
      title: 'Web Development Test', 
      course: 'CSC 305',
      students: 134,
      avgScore: '79%',
      date: 'JAN 20, 2025',
      status: 'Scheduled',
      icon: 'globe'
    },
  ];

  const topStudents = [
    { id: 1, name: 'Alice Johnson', score: '95%', tests: 12 },
    { id: 2, name: 'Bob Smith', score: '92%', tests: 11 },
    { id: 3, name: 'Carol Williams', score: '90%', tests: 10 },
    { id: 4, name: 'David Brown', score: '88%', tests: 12 },
    { id: 5, name: 'Eve Davis', score: '87%', tests: 9 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col flex-shrink-0 bg-gray-900 text-white fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className={`p-6 ${isSidebarCollapsed ? 'px-3' : ''}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${isSidebarCollapsed ? 'flex-col' : ''}`}>
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">N</span>
              </div>
              {!isSidebarCollapsed && <span className="text-xl font-bold whitespace-nowrap">NEXA Admin</span>}
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Collapse button for desktop */}
            {!isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:block p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                title="Collapse sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
          {/* Expand button when collapsed */}
          {isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="hidden lg:flex w-full justify-center mt-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Expand sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <nav className="flex-1 px-4">
          <a href="#" className={`flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg mb-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {!isSidebarCollapsed && <span>Students</span>}
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {!isSidebarCollapsed && <span>Tests</span>}
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {!isSidebarCollapsed && <span>Courses</span>}
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {!isSidebarCollapsed && <span>Analytics</span>}
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!isSidebarCollapsed && <span>Settings</span>}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Welcome back, Administrator</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="/admin/add-summary" className="hidden md:flex px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                + Add Summary
              </a>
              <a href="/admin/add-questions" className="hidden md:flex px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                + Add Questions
              </a>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Overview */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Student Performance Overview</h3>
                  <p className="text-sm text-gray-500">Average test scores across all courses</p>
                </div>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
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
                      <div key={i} className="border-t border-gray-200"></div>
                    ))}
                  </div>
                  
                  {/* Bar Chart */}
                  <div className="absolute inset-0 flex items-end justify-between gap-2 px-2">
                    {[
                      { height: 65, color: 'from-blue-400 to-blue-600', label: '65%' },
                      { height: 78, color: 'from-indigo-400 to-indigo-600', label: '78%' },
                      { height: 85, color: 'from-purple-400 to-purple-600', label: '85%' },
                      { height: 72, color: 'from-pink-400 to-pink-600', label: '72%' },
                      { height: 88, color: 'from-rose-400 to-rose-600', label: '88%' },
                      { height: 75, color: 'from-orange-400 to-orange-600', label: '75%' },
                      { height: 82, color: 'from-amber-400 to-amber-600', label: '82%' }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group">
                        <div className="relative w-full">
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {bar.label}
                          </div>
                          {/* Bar */}
                          <div 
                            className={`w-full bg-gradient-to-t ${bar.color} rounded-t-lg transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg`}
                            style={{ height: `${bar.height * 2.5}px` }}
                          >
                            {/* Shine effect */}
                            <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent rounded-t-lg"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-400 mt-2 px-2">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </div>
              
              {/* Stats below chart */}
              <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">88%</p>
                  <p className="text-xs text-gray-500">Peak</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">77.8%</p>
                  <p className="text-xs text-gray-500">Average</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">+8.5%</p>
                  <p className="text-xs text-gray-500">Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">1,248</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>
            </div>

            {/* Top Students */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Top Performers</h3>
              <div className="space-y-4">
                {topStudents.map((student, index) => (
                  <div key={student.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-400 text-orange-900' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{student.name}</h4>
                      <p className="text-xs text-gray-500">{student.tests} tests completed</p>
                    </div>
                    <div className="text-sm font-semibold text-primary-600">
                      {student.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Tests */}
          <div className="mt-6 bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Tests</h3>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                View all →
              </a>
            </div>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {test.icon === 'chart' && (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {test.icon === 'search' && (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                    {test.icon === 'database' && (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    )}
                    {test.icon === 'globe' && (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{test.title}</h4>
                    <p className="text-sm text-gray-500">{test.course}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{test.students}</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{test.avgScore}</p>
                    <p className="text-xs text-gray-500">Avg Score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{test.date}</p>
                  </div>
                  <div>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      test.status === 'Active' ? 'bg-green-100 text-green-700' :
                      test.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
