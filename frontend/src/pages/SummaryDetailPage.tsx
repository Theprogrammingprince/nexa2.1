import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, BookOpen, FileText, Menu, X } from 'lucide-react';
import RichNoteEditor from '../components/RichNoteEditor';
import supabase from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const SummaryDetailPage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'summary' | 'notes'>('summary');
  const [currentSection, setCurrentSection] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to navigate to CBT
  const handleTakeCBT = async () => {
    try {
      // Find course by course code
      const { data: course, error } = await supabase
        .from('courses')
        .select('id, code')
        .eq('code', summary.courseCode)
        .single();

      if (error || !course) {
        toast.error(`No CBT found for ${summary.courseCode}. This course is not available in CBT.`, {
          duration: 4000,
          icon: '❌',
        });
        return;
      }

      // Check if there are questions for this course
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('id')
        .eq('course_id', course.id)
        .limit(1);

      if (questionsError || !questions || questions.length === 0) {
        toast.error(`No questions available for ${summary.courseCode} yet.`, {
          duration: 4000,
          icon: '📝',
        });
        return;
      }

      // Navigate to CBT instruction page
      navigate(`/cbt/${course.id}`);
    } catch (error) {
      console.error('Error navigating to CBT:', error);
      toast.error('Failed to load CBT. Please try again.');
    }
  };

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

  // Calculate reading progress based on completed sections
  useEffect(() => {
    const progress = (completedSections.length / summary.content.length) * 100;
    setReadingProgress(progress);
  }, [completedSections]);

  const handleNextSection = () => {
    if (currentSection < summary.content.length - 1) {
      if (!completedSections.includes(currentSection)) {
        setCompletedSections([...completedSections, currentSection]);
      }
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const markSectionComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
  };

  const currentSectionData = summary.content[currentSection];

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-right" />
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
              {!isSidebarCollapsed && <span className="text-xl font-bold whitespace-nowrap">NEXA</span>}
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Collapse button for desktop */}
            {!isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:block p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
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
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-4 overflow-y-auto">
          <a href="/dashboard" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </a>
          <a href="/summaries" className={`flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg mb-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {!isSidebarCollapsed && <span>Summaries</span>}
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {!isSidebarCollapsed && <span>CBT Practice</span>}
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {!isSidebarCollapsed && <span>Schedule</span>}
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            {!isSidebarCollapsed && <span>Resources</span>}
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {!isSidebarCollapsed && <span>Get Help</span>}
          </a>
          <a href="/settings" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!isSidebarCollapsed && <span>Settings</span>}
          </a>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`border-b px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>
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
              <button
                onClick={handleTakeCBT}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Take CBT Practice
              </button>
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
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Reading Progress: <span className={`font-semibold ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>{Math.round(readingProgress)}%</span>
                  </span>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{summary.readTime} read</span>
                </div>
              </div>
            </div>

            {/* Title Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm font-semibold px-3 py-1 rounded ${isDarkMode ? 'text-primary-400 bg-primary-900/30' : 'text-primary-600 bg-primary-50'}`}>
                  {summary.courseCode}
                </span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>• {summary.course}</span>
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{summary.title}</h1>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Last updated {summary.lastUpdated}</p>
            </div>

            {/* Tabs */}
            <div className={`flex gap-4 mb-8 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setActiveTab('summary')}
                className={`pb-3 px-1 font-medium transition-colors ${
                  activeTab === 'summary'
                    ? isDarkMode
                      ? 'text-primary-400 border-b-2 border-primary-400'
                      : 'text-primary-600 border-b-2 border-primary-600'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Summary Content
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 px-1 font-medium transition-colors ${
                  activeTab === 'notes'
                    ? isDarkMode
                      ? 'text-primary-400 border-b-2 border-primary-400'
                      : 'text-primary-600 border-b-2 border-primary-600'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Notes
              </button>
            </div>

            {/* Content */}
            {activeTab === 'summary' ? (
              <div className="space-y-6">
                {/* Progress Indicator */}
                <div className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <div className="flex items-center gap-3">
                    <BookOpen className={`w-5 h-5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                    <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      Section {currentSection + 1} of {summary.content.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {summary.content.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSection(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentSection
                            ? 'w-8 bg-primary-600'
                            : completedSections.includes(idx)
                            ? 'bg-green-500'
                            : isDarkMode
                            ? 'bg-gray-600'
                            : 'bg-gray-300'
                        }`}
                        title={`Section ${idx + 1}${completedSections.includes(idx) ? ' (Completed)' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Progressive Card */}
                <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold opacity-90">
                        SECTION {currentSection + 1}
                      </span>
                      {completedSections.includes(currentSection) && (
                        <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Completed
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold">{currentSectionData.section}</h2>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 space-y-6">
                    {currentSectionData.topics.map((topic, topicIdx) => (
                      <div
                        key={topicIdx}
                        className={`p-6 rounded-lg border-l-4 border-primary-500 ${isDarkMode ? 'bg-gray-700/50' : 'bg-primary-50'}`}
                        style={{
                          animation: `fadeInUp 0.5s ease-out ${topicIdx * 0.1}s both`,
                        }}
                      >
                        <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {topic.title}
                        </h3>
                        <p className={`leading-relaxed text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {topic.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer - Navigation */}
                  <div className={`flex items-center justify-between p-6 border-t ${isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
                    <button
                      onClick={handlePrevSection}
                      disabled={currentSection === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentSection === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : isDarkMode
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>

                    {!completedSections.includes(currentSection) && (
                      <button
                        onClick={markSectionComplete}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Mark as Complete
                      </button>
                    )}

                    {currentSection < summary.content.length - 1 ? (
                      <button
                        onClick={handleNextSection}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Next
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleTakeCBT}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold"
                      >
                        <FileText className="w-5 h-5" />
                        Take CBT Test
                      </button>
                    )}
                  </div>
                </div>

                {/* Completion Message */}
                {readingProgress >= 100 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 rounded-xl p-6 text-center">
                    <svg className="w-16 h-16 mx-auto mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>🎉 Congratulations!</h3>
                    <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      You've completed all sections. Ready to test your knowledge?
                    </p>
                    <button
                      onClick={handleTakeCBT}
                      className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
                    >
                      Take CBT Practice Test →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <RichNoteEditor summaryId={summary.id.toString()} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetailPage;
