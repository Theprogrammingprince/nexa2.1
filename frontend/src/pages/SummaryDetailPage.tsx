import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const SummaryDetailPage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'summary' | 'notes'>('summary');
  const [readingProgress, setReadingProgress] = useState(0);

  // Mock data - will come from API later
  const summary = {
    id: 1,
    title: 'Data Structures and Algorithms',
    courseCode: 'CSC 201',
    course: 'Data Structures',
    readTime: '45 min',
    lastUpdated: '2 days ago',
    difficulty: 'Intermediate',
    content: [
      {
        section: 'Introduction to Data Structures',
        topics: [
          {
            title: 'What are Data Structures?',
            content: 'Data structures are specialized formats for organizing, processing, retrieving and storing data. They provide a means to manage large amounts of data efficiently for uses such as large databases and internet indexing services.',
          },
          {
            title: 'Types of Data Structures',
            content: 'Data structures can be classified into: Linear (Arrays, Linked Lists, Stacks, Queues) and Non-Linear (Trees, Graphs, Hash Tables).',
          },
        ],
      },
      {
        section: 'Arrays and Linked Lists',
        topics: [
          {
            title: 'Arrays',
            content: 'An array is a collection of elements stored at contiguous memory locations. Arrays allow random access and have O(1) access time. However, insertion and deletion operations can be expensive.',
          },
          {
            title: 'Linked Lists',
            content: 'A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference to the next node. Linked lists allow efficient insertion/deletion but have O(n) access time.',
          },
        ],
      },
      {
        section: 'Stacks and Queues',
        topics: [
          {
            title: 'Stack Data Structure',
            content: 'A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Common operations include push, pop, and peek. Stacks are used in function calls, expression evaluation, and backtracking algorithms.',
          },
          {
            title: 'Queue Data Structure',
            content: 'A queue follows the First In First Out (FIFO) principle. Operations include enqueue, dequeue, and front. Queues are used in scheduling, breadth-first search, and buffering.',
          },
        ],
      },
      {
        section: 'Trees and Graphs',
        topics: [
          {
            title: 'Binary Trees',
            content: 'A binary tree is a hierarchical data structure where each node has at most two children. Binary Search Trees (BST) maintain sorted data and support efficient search, insertion, and deletion operations.',
          },
          {
            title: 'Graph Data Structure',
            content: 'Graphs consist of vertices (nodes) and edges (connections). They can be directed or undirected, weighted or unweighted. Graphs are used to represent networks, social connections, and maps.',
          },
        ],
      },
    ],
  };

  // Track reading progress based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollableElement = document.getElementById('content-area');
      if (scrollableElement) {
        const scrollTop = scrollableElement.scrollTop;
        const scrollHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setReadingProgress(Math.min(progress, 100));
      }
    };

    const scrollableElement = document.getElementById('content-area');
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll);
      return () => scrollableElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`border-b px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <a href="/summaries" className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Summaries
            </a>
            <div className="flex items-center gap-3">
              <button className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Download PDF
              </button>
              <a
                href="/cbt-practice"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Take CBT Practice
              </a>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div id="content-area" className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Reading Progress Bar */}
            <div className={`sticky top-0 z-10 border-b mb-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="h-1 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <div className="py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Reading Progress: <span className="font-semibold text-primary-600">{Math.round(readingProgress)}%</span>
                  </span>
                  <span className="text-gray-500">{summary.readTime} read</span>
                </div>
              </div>
            </div>

            {/* Title Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded">
                  {summary.courseCode}
                </span>
                <span className="text-sm text-gray-500">• {summary.course}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{summary.title}</h1>
              <p className="text-gray-600">Last updated {summary.lastUpdated}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => setActiveTab('summary')}
                className={`pb-3 px-1 font-medium transition-colors ${
                  activeTab === 'summary'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Summary Content
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 px-1 font-medium transition-colors ${
                  activeTab === 'notes'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Notes
              </button>
            </div>

            {/* Content */}
            {activeTab === 'summary' ? (
              <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
                {summary.content.map((section, idx) => (
                  <div key={idx}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.section}</h2>
                    <div className="space-y-6">
                      {section.topics.map((topic, topicIdx) => (
                        <div key={topicIdx} className="pl-4 border-l-4 border-primary-200">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.title}</h3>
                          <p className="text-gray-700 leading-relaxed">{topic.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Completion Message */}
                {readingProgress >= 95 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Great Job!</h3>
                    <p className="text-gray-600 mb-4">You've completed this summary. Ready to test your knowledge?</p>
                    <a
                      href="/cbt-practice"
                      className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                    >
                      Take CBT Practice Test
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <textarea
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Take notes while studying..."
                />
                <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Save Notes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetailPage;
