import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../components/ScheduleModals';

const SchedulePage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'week' | 'list' | 'month'>('week');
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showStudySessionModal, setShowStudySessionModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Form states for Add Class
  const [classForm, setClassForm] = useState({
    title: '',
    instructor: '',
    location: '',
    day: '0',
    startTime: '',
    endTime: '',
    color: 'bg-blue-500',
  });

  // Form states for Add Assignment
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    course: '',
    dueDate: '',
    priority: 'medium',
    description: '',
  });

  // Form states for Study Session
  const [studyForm, setStudyForm] = useState({
    subject: '',
    duration: '60',
    date: '',
    time: '',
    goals: '',
  });

  // Form states for Reminder
  const [reminderForm, setReminderForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'assignment',
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const scheduleEvents = [
    { id: 1, title: 'Data Structures', time: '08:00 - 10:00', location: 'Room 301', day: 0, color: 'bg-blue-500' },
    { id: 2, title: 'Algorithms', time: '10:00 - 12:00', location: 'Room 205', day: 0, color: 'bg-green-500' },
    { id: 3, title: 'Database Systems', time: '14:00 - 16:00', location: 'Lab 102', day: 1, color: 'bg-purple-500' },
    { id: 4, title: 'Web Development', time: '09:00 - 11:00', location: 'Lab 201', day: 2, color: 'bg-yellow-500' },
    { id: 5, title: 'Machine Learning', time: '11:00 - 13:00', location: 'Room 401', day: 3, color: 'bg-indigo-500' },
    { id: 6, title: 'Software Engineering', time: '15:00 - 17:00', location: 'Room 302', day: 4, color: 'bg-pink-500' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Data Structures Assignment', course: 'CSC 201', due: 'Tomorrow', priority: 'high', completed: false },
    { id: 2, title: 'Database Project', course: 'CSC 301', due: 'In 3 days', priority: 'medium', completed: false },
    { id: 3, title: 'Read Chapter 5', course: 'CSC 205', due: 'In 5 days', priority: 'low', completed: false },
    { id: 4, title: 'Prepare Presentation', course: 'CSC 401', due: 'In 1 week', priority: 'high', completed: false },
  ];

  const studyStats = {
    totalHours: 24,
    thisWeek: 8,
    avgPerDay: 3.5,
    streak: 5,
  };

  const upcomingExams = [
    { id: 1, title: 'Algorithms Midterm', course: 'CSC 301', date: 'Jan 25, 2024', time: '10:00 AM', location: 'Hall A' },
    { id: 2, title: 'Database Final', course: 'CSC 401', date: 'Feb 10, 2024', time: '2:00 PM', location: 'Hall B' },
  ];

  // Handler functions with backend integration
  const handleAddClass = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('schedule_classes')
        .insert({
          user_id: user.id,
          title: classForm.title,
          instructor: classForm.instructor,
          location: classForm.location,
          day_of_week: parseInt(classForm.day),
          start_time: classForm.startTime,
          end_time: classForm.endTime,
          color: classForm.color,
        });

      if (error) throw error;
      toast.success('Class added successfully!');
      setShowAddClassModal(false);
      setClassForm({ title: '', instructor: '', location: '', day: '0', startTime: '', endTime: '', color: 'bg-blue-500' });
    } catch (error: any) {
      toast.error('Failed to add class: ' + error.message);
    }
  };

  const handleAddAssignment = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('assignments')
        .insert({
          user_id: user.id,
          title: assignmentForm.title,
          course_code: assignmentForm.course,
          due_date: assignmentForm.dueDate,
          priority: assignmentForm.priority,
          description: assignmentForm.description,
        });

      if (error) throw error;
      
      // Create notification for assignment
      await supabase.from('notifications').insert({
        user_id: user.id,
        type: 'assignment',
        title: 'New Assignment Added',
        message: `${assignmentForm.title} is due on ${new Date(assignmentForm.dueDate).toLocaleDateString()}`,
        priority: assignmentForm.priority,
      });
      
      toast.success('Assignment added successfully!');
      setShowAddAssignmentModal(false);
      setAssignmentForm({ title: '', course: '', dueDate: '', priority: 'medium', description: '' });
    } catch (error: any) {
      toast.error('Failed to add assignment: ' + error.message);
    }
  };

  const handleScheduleStudySession = async () => {
    if (!user) return;
    
    try {
      const sessionDateTime = new Date(`${studyForm.date}T${studyForm.time}`);
      
      const { error } = await supabase
        .from('study_sessions')
        .insert({
          user_id: user.id,
          subject: studyForm.subject,
          duration: parseInt(studyForm.duration),
          scheduled_date: studyForm.date,
          scheduled_time: studyForm.time,
          scheduled_at: sessionDateTime.toISOString(),
          goals: studyForm.goals,
        });

      if (error) throw error;
      
      // Create notification for study session
      await supabase.from('notifications').insert({
        user_id: user.id,
        type: 'system',
        title: 'Study Session Scheduled',
        message: `${studyForm.subject} study session on ${new Date(sessionDateTime).toLocaleString()}`,
        priority: 'medium',
      });
      
      toast.success('Study session scheduled successfully!');
      setShowStudySessionModal(false);
      setStudyForm({ subject: '', duration: '60', date: '', time: '', goals: '' });
    } catch (error: any) {
      toast.error('Failed to schedule study session: ' + error.message);
    }
  };

  const handleSetReminder = async () => {
    if (!user) return;
    
    try {
      const reminderDateTime = new Date(`${reminderForm.date}T${reminderForm.time}`);
      
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          type: reminderForm.type as any,
          title: reminderForm.title,
          message: reminderForm.description,
          scheduled_for: reminderDateTime.toISOString(),
          priority: 'medium',
        });

      if (error) throw error;
      toast.success('Reminder set successfully!');
      setShowReminderModal(false);
      setReminderForm({ title: '', description: '', date: '', time: '', type: 'assignment' });
    } catch (error: any) {
      toast.error('Failed to set reminder: ' + error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Sidebar */}
      <aside className={`w-64 flex flex-col flex-shrink-0 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-900'} text-white`}>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold">NEXA</span>
          </div>
        </div>

        <nav className="flex-1 px-4">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
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
          <a href="/schedule" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg mb-2">
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`border-b px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Schedule</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Week of January 15 - 21, 2024</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex rounded-lg overflow-hidden border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-2 text-sm font-medium ${
                    viewMode === 'week' ? 'bg-primary-600 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-2 text-sm font-medium ${
                    viewMode === 'month' ? 'bg-primary-600 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm font-medium ${
                    viewMode === 'list' ? 'bg-primary-600 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
                  }`}
                >
                  List
                </button>
              </div>
              <button 
                onClick={() => setShowAddClassModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Event
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Study Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">Total Study Hours</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">{studyStats.totalHours}h</div>
                <div className="text-xs opacity-75 mt-1">This month</div>
              </div>

              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-500 to-green-600'} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">This Week</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">{studyStats.thisWeek}h</div>
                <div className="text-xs opacity-75 mt-1">+2h from last week</div>
              </div>

              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-purple-900 to-purple-800' : 'bg-gradient-to-br from-purple-500 to-purple-600'} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">Daily Average</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">{studyStats.avgPerDay}h</div>
                <div className="text-xs opacity-75 mt-1">Per day</div>
              </div>

              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gradient-to-br from-orange-900 to-orange-800' : 'bg-gradient-to-br from-orange-500 to-orange-600'} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">Study Streak</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">{studyStats.streak}</div>
                <div className="text-xs opacity-75 mt-1">Days in a row</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Schedule View */}
              <div className="lg:col-span-2">
                <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  {viewMode === 'week' ? (
                    <div className="p-6">
                      <div className="grid grid-cols-7 gap-2">
                        {daysOfWeek.map((day, index) => (
                          <div key={day} className="text-center">
                            <div className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day}</div>
                            <div className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{15 + index}</div>
                            <div className="space-y-2">
                              {scheduleEvents
                                .filter(event => event.day === index)
                                .map(event => (
                                  <div key={event.id} className={`${event.color} text-white p-2 rounded text-xs cursor-pointer hover:opacity-90`}>
                                    <div className="font-semibold truncate">{event.title}</div>
                                    <div className="text-xs opacity-90">{event.time.split(' - ')[0]}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 space-y-4">
                      {scheduleEvents.map(event => (
                        <div key={event.id} className={`p-4 rounded-lg border-l-4 ${event.color.replace('bg-', 'border-')} ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.time}</p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{event.location}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                              {daysOfWeek[event.day]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Exams */}
                <div className={`rounded-xl shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Exams</h3>
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">{upcomingExams.length}</span>
                  </div>
                  <div className="space-y-3">
                    {upcomingExams.map(exam => (
                      <div key={exam.id} className={`p-4 rounded-lg border-l-4 border-red-500 ${isDarkMode ? 'bg-gray-750' : 'bg-red-50'}`}>
                        <h4 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exam.title}</h4>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exam.course}</p>
                        <div className={`flex items-center gap-2 mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {exam.date} at {exam.time}
                        </div>
                        <div className={`flex items-center gap-2 mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {exam.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className={`rounded-xl shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Tasks</h3>
                    <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-full">{upcomingTasks.filter(t => !t.completed).length}</span>
                  </div>
                  <div className="space-y-3">
                    {upcomingTasks.map(task => (
                      <div key={task.id} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                        <div className="flex items-start gap-3">
                          <input 
                            type="checkbox" 
                            checked={task.completed}
                            onChange={() => {}}
                            className="mt-1 w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className={`font-medium text-sm ${task.completed ? 'line-through opacity-50' : ''} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{task.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ml-2 ${
                                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{task.course}</p>
                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Due: {task.due}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`rounded-xl shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setShowAddClassModal(true)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-750 hover:bg-gray-700 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <div className="font-medium">Add Class</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Schedule a new class</div>
                        </div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setShowAddAssignmentModal(true)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-750 hover:bg-gray-700 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <div>
                          <div className="font-medium">Add Assignment</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track homework</div>
                        </div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setShowStudySessionModal(true)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-750 hover:bg-gray-700 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <div className="font-medium">Study Session</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Block study time</div>
                        </div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setShowReminderModal(true)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-750 hover:bg-gray-700 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <div>
                          <div className="font-medium">Set Reminder</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get notifications</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Study Tips */}
                <div className={`rounded-xl shadow-sm p-6 ${isDarkMode ? 'bg-gradient-to-br from-primary-900 to-purple-900' : 'bg-gradient-to-br from-primary-500 to-purple-600'} text-white`}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h3 className="font-bold">Study Tip of the Day</h3>
                  </div>
                  <p className="text-sm opacity-90">
                    Use the Pomodoro Technique: Study for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents burnout!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Class Modal */}
      <Modal
        isDarkMode={isDarkMode}
        show={showAddClassModal}
        onClose={() => setShowAddClassModal(false)}
        onSubmit={handleAddClass}
        title="Add New Class"
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Class Name *</label>
            <input
              type="text"
              value={classForm.title}
              onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., Data Structures"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Instructor</label>
            <input
              type="text"
              value={classForm.instructor}
              onChange={(e) => setClassForm({ ...classForm, instructor: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., Dr. Smith"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
            <input
              type="text"
              value={classForm.location}
              onChange={(e) => setClassForm({ ...classForm, location: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., Room 301"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Day *</label>
              <select
                value={classForm.day}
                onChange={(e) => setClassForm({ ...classForm, day: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="0">Monday</option>
                <option value="1">Tuesday</option>
                <option value="2">Wednesday</option>
                <option value="3">Thursday</option>
                <option value="4">Friday</option>
                <option value="5">Saturday</option>
                <option value="6">Sunday</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Color</label>
              <select
                value={classForm.color}
                onChange={(e) => setClassForm({ ...classForm, color: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="bg-blue-500">Blue</option>
                <option value="bg-green-500">Green</option>
                <option value="bg-purple-500">Purple</option>
                <option value="bg-yellow-500">Yellow</option>
                <option value="bg-red-500">Red</option>
                <option value="bg-pink-500">Pink</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Start Time *</label>
              <input
                type="time"
                value={classForm.startTime}
                onChange={(e) => setClassForm({ ...classForm, startTime: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>End Time *</label>
              <input
                type="time"
                value={classForm.endTime}
                onChange={(e) => setClassForm({ ...classForm, endTime: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Assignment Modal */}
      <Modal
        isDarkMode={isDarkMode}
        show={showAddAssignmentModal}
        onClose={() => setShowAddAssignmentModal(false)}
        onSubmit={handleAddAssignment}
        title="Add New Assignment"
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Assignment Title *</label>
            <input
              type="text"
              value={assignmentForm.title}
              onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., Chapter 5 Homework"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Course *</label>
            <input
              type="text"
              value={assignmentForm.course}
              onChange={(e) => setAssignmentForm({ ...assignmentForm, course: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., CSC 201"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Due Date *</label>
              <input
                type="date"
                value={assignmentForm.dueDate}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority</label>
              <select
                value={assignmentForm.priority}
                onChange={(e) => setAssignmentForm({ ...assignmentForm, priority: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
            <textarea
              value={assignmentForm.description}
              onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="Add any notes or details..."
            />
          </div>
        </div>
      </Modal>

      {/* Study Session Modal */}
      <Modal
        isDarkMode={isDarkMode}
        show={showStudySessionModal}
        onClose={() => setShowStudySessionModal(false)}
        onSubmit={handleScheduleStudySession}
        title="Schedule Study Session"
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject *</label>
            <input
              type="text"
              value={studyForm.subject}
              onChange={(e) => setStudyForm({ ...studyForm, subject: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., Mathematics"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Duration (minutes)</label>
            <select
              value={studyForm.duration}
              onChange={(e) => setStudyForm({ ...studyForm, duration: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date *</label>
              <input
                type="date"
                value={studyForm.date}
                onChange={(e) => setStudyForm({ ...studyForm, date: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time *</label>
              <input
                type="time"
                value={studyForm.time}
                onChange={(e) => setStudyForm({ ...studyForm, time: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Study Goals</label>
            <textarea
              value={studyForm.goals}
              onChange={(e) => setStudyForm({ ...studyForm, goals: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="What do you want to accomplish?"
            />
          </div>
        </div>
      </Modal>

      {/* Set Reminder Modal */}
      <Modal
        isDarkMode={isDarkMode}
        show={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        onSubmit={handleSetReminder}
        title="Set Reminder"
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reminder Title *</label>
            <input
              type="text"
              value={reminderForm.title}
              onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., Submit Assignment"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
            <select
              value={reminderForm.type}
              onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="assignment">Assignment</option>
              <option value="exam">Exam</option>
              <option value="class">Class</option>
              <option value="event">Event</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date *</label>
              <input
                type="date"
                value={reminderForm.date}
                onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time *</label>
              <input
                type="time"
                value={reminderForm.time}
                onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
            <textarea
              value={reminderForm.description}
              onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="Add additional details..."
            />
          </div>
        </div>
      </Modal>
      </div>
    </>
  );
};

export default SchedulePage;