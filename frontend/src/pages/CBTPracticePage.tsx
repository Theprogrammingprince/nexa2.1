import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Course {
  id: number;
  title: string;
  code: string;
  questions: number;
  duration: number;
  difficulty: string;
  color: string;
}

const CBTPracticePage = () => {
  const { isDarkMode } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock courses data
  const courses: Course[] = [
    { id: 1, title: 'Data Structures & Algorithms', code: 'CSC 201', questions: 50, duration: 60, difficulty: 'Intermediate', color: 'from-blue-500 to-blue-600' },
    { id: 2, title: 'Database Management Systems', code: 'CSC 301', questions: 40, duration: 45, difficulty: 'Advanced', color: 'from-purple-500 to-purple-600' },
    { id: 3, title: 'Web Development', code: 'CSC 205', questions: 35, duration: 40, difficulty: 'Beginner', color: 'from-green-500 to-green-600' },
    { id: 4, title: 'Operating Systems', code: 'CSC 305', questions: 45, duration: 50, difficulty: 'Advanced', color: 'from-orange-500 to-orange-600' },
    { id: 5, title: 'Computer Networks', code: 'CSC 401', questions: 40, duration: 45, difficulty: 'Intermediate', color: 'from-pink-500 to-pink-600' },
    { id: 6, title: 'Software Engineering', code: 'CSC 501', questions: 50, duration: 60, difficulty: 'Advanced', color: 'from-indigo-500 to-indigo-600' },
  ];

  // Mock questions (will be fetched from backend)
  const questions: Question[] = [
    {
      id: 1,
      question: 'What is the time complexity of binary search algorithm?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Which data structure uses LIFO (Last In First Out) principle?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'What is the best case time complexity of Quick Sort?',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'Which of the following is NOT a linear data structure?',
      options: ['Array', 'Stack', 'Tree', 'Queue'],
      correctAnswer: 2
    },
    {
      id: 5,
      question: 'What does DFS stand for in graph traversal?',
      options: ['Depth First Search', 'Data Flow System', 'Direct File System', 'Dynamic Function Search'],
      correctAnswer: 0
    },
  ];

  // Timer effect
  useEffect(() => {
    if (examStarted && !examSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, examSubmitted, timeLeft]);

  const startExam = (course: Course) => {
    setSelectedCourse(course);
    setExamStarted(true);
    setTimeLeft(course.duration * 60);
    setCurrentQuestion(0);
    setAnswers({});
    setExamSubmitted(false);
    setShowResults(false);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setExamSubmitted(true);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return (Object.keys(answers).length / questions.length) * 100;
  };

  const resetExam = () => {
    setSelectedCourse(null);
    setExamStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(0);
    setExamSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col flex-shrink-0 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-900'} text-white fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
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
          <a href="/dashboard" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </a>
          <a href="/summaries" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {!isSidebarCollapsed && <span>Summaries</span>}
          </a>
          <a href="/cbt-practice" className={`flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg mb-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {!isSidebarCollapsed && <span>CBT Practice</span>}
          </a>
          <a href="/schedule" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {!isSidebarCollapsed && <span>Schedule</span>}
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <a href="/settings" className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!isSidebarCollapsed && <span>Settings</span>}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!examStarted ? (
          // Course Listing View
          <>
            <header className={`border-b px-4 sm:px-8 py-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CBT Practice Tests</h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Select a course to start practicing</p>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                      <div className={`h-32 bg-gradient-to-r ${course.color} p-6 flex items-center justify-center`}>
                        <h3 className="text-white text-xl font-bold text-center">{course.code}</h3>
                      </div>
                      <div className="p-6">
                        <h4 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{course.title}</h4>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{course.questions} Questions</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{course.duration} Minutes</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span className={`font-medium ${
                              course.difficulty === 'Beginner' ? 'text-green-600' :
                              course.difficulty === 'Intermediate' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>{course.difficulty}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => startExam(course)}
                          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                          Start Practice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : showResults ? (
          // Results/Congratulations Screen
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8">
              <div className={`rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
                {/* Header */}
                <div className={`p-8 text-center ${score / questions.length >= 0.7 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white`}>
                  <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {score / questions.length >= 0.7 ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <h2 className="text-3xl font-bold mb-2">
                    {score / questions.length >= 0.7 ? 'Congratulations!' : 'Good Effort!'}
                  </h2>
                  <p className="text-lg opacity-90">
                    {score / questions.length >= 0.7 ? 'You passed the test!' : 'Keep practicing to improve!'}
                  </p>
                </div>

                {/* Score Details */}
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{score}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Correct Answers</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{questions.length - score}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wrong Answers</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-2 ${score / questions.length >= 0.7 ? 'text-green-600' : 'text-orange-600'}`}>
                        {Math.round((score / questions.length) * 100)}%
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</div>
                    </div>
                  </div>

                  {/* Answer Review */}
                  <div className={`border-t pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Answer Review</h3>
                    <div className="space-y-4">
                      {questions.map((q, index) => (
                        <div key={q.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              answers[index] === q.correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {answers[index] === q.correctAnswer ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Q{index + 1}. {q.question}
                              </p>
                              <div className="space-y-1">
                                <p className={`text-sm ${answers[index] !== undefined ? 'text-red-600' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Your answer: {answers[index] !== undefined ? q.options[answers[index]] : 'Not answered'}
                                </p>
                                <p className="text-sm text-green-600">
                                  Correct answer: {q.options[q.correctAnswer]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => startExam(selectedCourse!)}
                      className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Retake Test
                    </button>
                    <button
                      onClick={resetExam}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      Back to Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Exam Portal
          <>
            {/* Exam Header */}
            <header className={`border-b px-8 py-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCourse?.title}</h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedCourse?.code}</p>
                </div>
                <div className="flex items-center gap-6">
                  {/* Timer */}
                  <div className="flex items-center gap-2">
                    <svg className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={`text-lg font-bold ${timeLeft < 300 ? 'text-red-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  {/* Progress */}
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Progress: {Object.keys(answers).length}/{questions.length}
                    </span>
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-3">
                <div className={`h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </header>

            {/* Exam Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto">
                <div className={`rounded-xl p-8 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  {/* Question */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      {answers[currentQuestion] !== undefined && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Answered
                        </span>
                      )}
                    </div>
                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {questions[currentQuestion]?.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {questions[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(currentQuestion, index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          answers[currentQuestion] === index
                            ? 'border-primary-600 bg-primary-50'
                            : isDarkMode
                            ? 'border-gray-700 bg-gray-750 hover:border-gray-600'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQuestion] === index
                              ? 'border-primary-600 bg-primary-600'
                              : isDarkMode ? 'border-gray-600' : 'border-gray-300'
                          }`}>
                            {answers[currentQuestion] === index && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className={`font-medium ${answers[currentQuestion] === index ? 'text-primary-700' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {String.fromCharCode(65 + index)}. {option}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestion === 0}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        currentQuestion === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : isDarkMode
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      Previous
                    </button>
                    {currentQuestion === questions.length - 1 ? (
                      <button
                        onClick={handleSubmitExam}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Submit Exam
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Palette */}
                <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Question Palette</h3>
                  <div className="grid grid-cols-10 gap-2">
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                          currentQuestion === index
                            ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                            : answers[index] !== undefined
                            ? 'bg-green-500 text-white'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Not Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary-600 rounded ring-2 ring-primary-300"></div>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Current</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CBTPracticePage;