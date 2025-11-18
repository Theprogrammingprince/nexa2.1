import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Summary {
  id: number;
  title: string;
  course: string;
  courseCode: string;
  description: string;
  topics: number;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  category: string;
  thumbnail: string;
  lastUpdated: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  bgColor: string;
  instructors: string[];
}

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  teacher: string;
  duration: string;
  avatar: string;
}

const SummariesPage = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [userPlan] = useState<'free' | 'pro'>('free'); // This will come from auth context later

  const categories = ['All Courses', 'Marketing', 'Computer Science', 'Psychology', 'Mathematics', 'Engineering'];

  const summaries: Summary[] = [
    {
      id: 1,
      title: 'Creative Writing for Beginners',
      course: 'Marketing',
      courseCode: 'MKT 101',
      description: 'Learn the fundamentals of creative writing and storytelling',
      topics: 20,
      readTime: '45 min',
      difficulty: 'Beginner',
      isPremium: false,
      category: 'Marketing',
      thumbnail: '✍️',
      lastUpdated: '2 days ago',
      progress: 25,
      totalLessons: 20,
      completedLessons: 5,
      bgColor: 'bg-gradient-to-br from-yellow-200 to-yellow-300',
      instructors: ['👨‍🏫', '👩‍🏫', '👨‍💼', '👩‍💼'],
    },
    {
      id: 2,
      title: 'Digital Illustration with Adobe',
      course: 'Computer Science',
      courseCode: 'CSC 201',
      description: 'Master digital illustration techniques using Adobe Creative Suite',
      topics: 50,
      readTime: '60 min',
      difficulty: 'Intermediate',
      isPremium: false,
      category: 'Computer Science',
      thumbnail: '🎨',
      lastUpdated: '1 week ago',
      progress: 24,
      totalLessons: 50,
      completedLessons: 12,
      bgColor: 'bg-gradient-to-br from-purple-200 to-purple-300',
      instructors: ['A', 'B', 'C'],
    },
    {
      id: 3,
      title: 'Public Speaking and Leadership',
      course: 'Psychology',
      courseCode: 'PSY 101',
      description: 'Develop confidence in public speaking and leadership skills',
      topics: 22,
      readTime: '50 min',
      difficulty: 'Intermediate',
      isPremium: false,
      category: 'Psychology',
      thumbnail: '🎤',
      lastUpdated: '3 days ago',
      progress: 82,
      totalLessons: 22,
      completedLessons: 18,
      bgColor: 'bg-gradient-to-br from-blue-200 to-blue-300',
      instructors: ['👨‍🏫', '👩‍🏫', '👨‍💼', '👩‍💼'],
    },
    {
      id: 4,
      title: 'Data Structures and Algorithms',
      course: 'Computer Science',
      courseCode: 'CSC 301',
      description: 'Comprehensive guide to data structures and algorithm design',
      topics: 15,
      readTime: '70 min',
      difficulty: 'Advanced',
      isPremium: true,
      category: 'Computer Science',
      thumbnail: '💻',
      lastUpdated: '5 days ago',
      progress: 0,
      totalLessons: 15,
      completedLessons: 0,
      bgColor: 'bg-gradient-to-br from-green-200 to-green-300',
      instructors: ['D', 'E'],
    },
    {
      id: 5,
      title: 'Advanced Mathematics',
      course: 'Mathematics',
      courseCode: 'MTH 201',
      description: 'Calculus, Linear Algebra, and Differential Equations',
      topics: 18,
      readTime: '80 min',
      difficulty: 'Advanced',
      isPremium: true,
      category: 'Mathematics',
      thumbnail: '📐',
      lastUpdated: '1 week ago',
      progress: 0,
      totalLessons: 18,
      completedLessons: 0,
      bgColor: 'bg-gradient-to-br from-pink-200 to-pink-300',
      instructors: ['👨‍🏫', '👩‍🏫'],
    },
    {
      id: 6,
      title: 'Engineering Fundamentals',
      course: 'Engineering',
      courseCode: 'ENG 101',
      description: 'Core principles of mechanical and electrical engineering',
      topics: 25,
      readTime: '90 min',
      difficulty: 'Intermediate',
      isPremium: true,
      category: 'Engineering',
      thumbnail: '⚙️',
      lastUpdated: '4 days ago',
      progress: 0,
      totalLessons: 25,
      completedLessons: 0,
      bgColor: 'bg-gradient-to-br from-orange-200 to-orange-300',
      instructors: ['👨‍🔧', '👩‍🔧', '👨‍🏭'],
    },
  ];

  const nextLessons: Lesson[] = [
    {
      id: 1,
      title: '01. Introduction to Creative Writing',
      subtitle: 'Creative writing for beginners',
      teacher: 'Connor Garcia',
      duration: '22 min',
      avatar: '👨‍🏫',
    },
    {
      id: 2,
      title: '03. Foundations of Public Speaking',
      subtitle: 'Public Speaking and Leadership',
      teacher: 'Sara Goodman',
      duration: '40 min',
      avatar: '👩‍🏫',
    },
    {
      id: 3,
      title: '05. Getting to know the tool Adobe Illustrator',
      subtitle: 'Digital Illustration with Adobe Illustrator',
      teacher: 'Tony Wave',
      duration: '1h 08 min',
      avatar: '👨‍🎨',
    },
    {
      id: 4,
      title: '11. Understanding audience psychology',
      subtitle: 'Public Speaking Basic course',
      teacher: 'Mya Guzman',
      duration: '26 min',
      avatar: '👩‍🏫',
    },
    {
      id: 5,
      title: '04. The importance of self reflection',
      subtitle: 'Psychology of influence',
      teacher: 'Zahaib Osborn',
      duration: '23 min',
      avatar: '👨‍💼',
    },
  ];

  const filteredSummaries = summaries.filter((summary) => {
    const matchesCategory = selectedCategory === 'All Courses' || summary.category === selectedCategory;
    const matchesSearch =
      summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const canAccess = (isPremium: boolean) => {
    return !isPremium || userPlan === 'pro';
  };

  return (
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
          <a href="/summaries" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg mb-2">
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

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`border-b px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Welcome to <span className="text-primary-600 font-semibold">NEXA</span></p>
            </div>
                    {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <div className="text-sm">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User Name</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>@username</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <section className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
          {/* My Courses Section */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My courses</h2>
            
            {/* Category Filter */}
            <div className="mb-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Course Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredSummaries.map((summary) => {
                const hasAccess = canAccess(summary.isPremium);

                return (
                  <div
                    key={summary.id}
                    className={`${summary.bgColor} rounded-3xl p-6 relative transition-all hover:scale-105 cursor-pointer`}
                  >
                    {/* Bookmark Icon */}
                    <button className="absolute top-6 right-6">
                      <svg className="w-6 h-6 text-gray-700" fill={summary.progress > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>

                    {/* Category Badge */}
                    <div className="inline-block bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {summary.course}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 pr-8">{summary.title}</h3>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">{summary.completedLessons}/{summary.totalLessons} lessons</span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gray-900 h-full rounded-full transition-all"
                          style={{ width: `${summary.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6">
                      {/* Instructors */}
                      <div className="flex -space-x-2">
                        {summary.instructors.map((instructor, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center text-sm"
                          >
                            {instructor}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white border-2 border-white flex items-center justify-center text-xs font-bold">
                          +{summary.topics}
                        </div>
                      </div>

                      {/* Continue Button */}
                      {hasAccess ? (
                        <a
                          href={`/summaries/${summary.id}`}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
                        >
                          Continue
                        </a>
                      ) : (
                        <a
                          href="/pricing"
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-all"
                        >
                          Unlock
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Next Lessons Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lessons List */}
            <div className={`lg:col-span-2 rounded-3xl p-6 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My next lessons</h3>
                <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View all lessons
                </a>
              </div>

              <div className="space-y-4">
                {nextLessons.map((lesson) => (
                  <div key={lesson.id} className={`flex items-center gap-4 p-4 rounded-xl transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lesson.title}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lesson.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lesson.teacher}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lesson.duration}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-lg">
                        {lesson.avatar}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Course Card */}
            <div className={`rounded-3xl p-6 text-white ${isDarkMode ? 'bg-gray-950' : 'bg-gray-900'}`}>
              <p className="text-sm opacity-80 mb-4">New course matching your interests</p>
              
              <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4 border border-gray-700">
                Computer Science
              </div>

              <h3 className="text-xl font-bold mb-4">Microsoft Future Ready: Fundamentals of Big Data</h3>

              <p className="text-sm opacity-80 mb-6">They are already studying</p>

              {/* Students Avatars */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex -space-x-2">
                  {['JD', 'SM', 'AK', 'LM'].map((avatar, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 border-2 border-gray-900 flex items-center justify-center text-sm font-semibold text-white"
                    >
                      {avatar}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-gray-900 border-2 border-gray-900 flex items-center justify-center text-xs font-bold">
                    +100
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="block w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-full font-semibold transition-colors"
              >
                More details
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default SummariesPage;
