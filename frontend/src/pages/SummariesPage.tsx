import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import { BookOpen, Clock, Award } from 'lucide-react';

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
  bgColor: string;
  progress: number;
}

const SummariesPage = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Courses', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const summaries: Summary[] = [
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      course: 'Computer Science',
      courseCode: 'CSC 201',
      description: 'Learn fundamental data structures and algorithms',
      topics: 20,
      readTime: '45 min',
      difficulty: 'Intermediate',
      isPremium: false,
      category: 'Computer Science',
      bgColor: 'from-blue-500 to-blue-600',
      progress: 65
    },
    {
      id: 2,
      title: 'Database Management Systems',
      course: 'Computer Science',
      courseCode: 'CSC 301',
      description: 'Master database design and SQL',
      topics: 15,
      readTime: '40 min',
      difficulty: 'Advanced',
      isPremium: true,
      category: 'Computer Science',
      bgColor: 'from-purple-500 to-purple-600',
      progress: 30
    },
    {
      id: 3,
      title: 'Calculus I',
      course: 'Mathematics',
      courseCode: 'MTH 101',
      description: 'Introduction to differential calculus',
      topics: 18,
      readTime: '50 min',
      difficulty: 'Intermediate',
      isPremium: false,
      category: 'Mathematics',
      bgColor: 'from-green-500 to-green-600',
      progress: 80
    },
    {
      id: 4,
      title: 'Classical Mechanics',
      course: 'Physics',
      courseCode: 'PHY 201',
      description: 'Study of motion and forces',
      topics: 22,
      readTime: '55 min',
      difficulty: 'Advanced',
      isPremium: false,
      category: 'Physics',
      bgColor: 'from-orange-500 to-orange-600',
      progress: 45
    },
    {
      id: 5,
      title: 'Organic Chemistry',
      course: 'Chemistry',
      courseCode: 'CHM 201',
      description: 'Fundamentals of organic compounds',
      topics: 25,
      readTime: '60 min',
      difficulty: 'Advanced',
      isPremium: true,
      category: 'Chemistry',
      bgColor: 'from-pink-500 to-pink-600',
      progress: 20
    },
    {
      id: 6,
      title: 'Cell Biology',
      course: 'Biology',
      courseCode: 'BIO 101',
      description: 'Introduction to cellular structures',
      topics: 16,
      readTime: '35 min',
      difficulty: 'Beginner',
      isPremium: false,
      category: 'Biology',
      bgColor: 'from-teal-500 to-teal-600',
      progress: 90
    }
  ];

  const filteredSummaries = summaries.filter(summary => {
    const matchesCategory = selectedCategory === 'All Courses' || summary.category === selectedCategory;
    const matchesSearch = 
      summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'Intermediate': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Advanced': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  return (
    <DashboardLayout currentPage="/summaries">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search summaries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900'
          } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : isDarkMode 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Summaries</p>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{summaries.length}</p>
            </div>
            <BookOpen className="text-primary-600" size={40} />
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {summaries.filter(s => s.progress >= 90).length}
              </p>
            </div>
            <Award className="text-green-600" size={40} />
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>In Progress</p>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {summaries.filter(s => s.progress > 0 && s.progress < 90).length}
              </p>
            </div>
            <Clock className="text-orange-600" size={40} />
          </div>
        </div>
      </div>

      {/* Summaries Grid */}
      {filteredSummaries.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            No summaries found
          </h3>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSummaries.map((summary) => (
            <div
              key={summary.id}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-r ${summary.bgColor} p-6 text-white relative`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{summary.courseCode}</h3>
                    <p className="text-sm opacity-90">{summary.course}</p>
                  </div>
                  {summary.isPremium && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                      PRO
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {summary.title}
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  {summary.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{summary.topics} topics</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{summary.readTime}</span>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(summary.difficulty)}`}>
                    {summary.difficulty}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Progress
                    </span>
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {summary.progress}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all"
                      style={{ width: `${summary.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={`/summaries/${summary.id}`}
                  className="block w-full py-2 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {summary.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default SummariesPage;
