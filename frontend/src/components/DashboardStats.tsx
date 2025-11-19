import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, TrendingDown, BookOpen, Award, Clock, Target, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

interface DashboardStatsData {
  overview: {
    totalTests: number;
    averageScore: number;
    passedTests: number;
    failedTests: number;
    totalStudyTime: number;
    recentTests: number;
  };
  dailyProgress: Array<{
    date: string;
    score: number;
    tests: number;
  }>;
  coursePerformance: Array<{
    courseId: string;
    courseCode: string;
    courseTitle: string;
    averageScore: number;
    testsCompleted: number;
    lastAttempt: string;
  }>;
  upcomingEvents: any[];
  recentSubmissions: any[];
}

const DashboardStats = () => {
  const { isDarkMode } = useTheme();
  const [stats] = useState<DashboardStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      // TODO: This component is not currently used - needs userId parameter
      // const data = await dashboardAPI.getStats(userId);
      // setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard stats');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          No data available yet. Start taking tests to see your progress!
        </p>
      </div>
    );
  }

  const { overview, dailyProgress, coursePerformance } = stats;

  // Calculate trends
  const getScoreTrend = () => {
    if (dailyProgress.length < 2) return 0;
    const recent = dailyProgress.slice(-3).filter(d => d.tests > 0);
    if (recent.length < 2) return 0;
    const recentAvg = recent.reduce((sum, d) => sum + d.score, 0) / recent.length;
    const previousAvg = dailyProgress.slice(0, -3).filter(d => d.tests > 0).reduce((sum, d) => sum + d.score, 0) / Math.max(1, dailyProgress.slice(0, -3).filter(d => d.tests > 0).length);
    return recentAvg - previousAvg;
  };

  const scoreTrend = getScoreTrend();
  const passRate = overview.totalTests > 0 ? Math.round((overview.passedTests / overview.totalTests) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tests */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Tests
            </span>
          </div>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {overview.totalTests}
          </h3>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {overview.recentTests} this week
          </p>
        </div>

        {/* Average Score */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
              <Target className="text-purple-600" size={24} />
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Avg Score
            </span>
          </div>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {overview.averageScore}%
          </h3>
          <div className="flex items-center gap-1 mt-2">
            {scoreTrend >= 0 ? (
              <TrendingUp className="text-green-500" size={16} />
            ) : (
              <TrendingDown className="text-red-500" size={16} />
            )}
            <span className={`text-sm ${scoreTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(Math.round(scoreTrend))}% {scoreTrend >= 0 ? 'increase' : 'decrease'}
            </span>
          </div>
        </div>

        {/* Pass Rate */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <Award className="text-green-600" size={24} />
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Pass Rate
            </span>
          </div>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {passRate}%
          </h3>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {overview.passedTests} passed / {overview.failedTests} failed
          </p>
        </div>

        {/* Study Time */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
              <Clock className="text-orange-600" size={24} />
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Study Time
            </span>
          </div>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {Math.floor(overview.totalStudyTime / 60)}h
          </h3>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {overview.totalStudyTime % 60}m this week
          </p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className={isDarkMode ? 'text-white' : 'text-gray-900'} size={24} />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              7-Day Performance
            </h2>
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Last 7 days
          </span>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {dailyProgress.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const hasData = day.tests > 0;
            
            return (
              <div key={index} className="flex items-center gap-4">
                <span className={`text-sm font-medium w-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {dayName}
                </span>
                <div className="flex-1 relative">
                  <div className={`h-10 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {hasData && (
                      <div
                        className={`h-full rounded-lg flex items-center px-3 ${
                          day.score >= 80
                            ? 'bg-green-500'
                            : day.score >= 50
                            ? 'bg-blue-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${day.score}%` }}
                      >
                        <span className="text-white text-sm font-bold">{day.score}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`text-sm w-16 text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {day.tests} test{day.tests !== 1 ? 's' : ''}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Excellent (≥80%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Good (50-79%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Needs Work (&lt;50%)
            </span>
          </div>
        </div>
      </div>

      {/* Course Performance */}
      {coursePerformance.length > 0 && (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Course Performance
          </h2>
          <div className="space-y-4">
            {coursePerformance.map((course) => (
              <div
                key={course.courseId}
                className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {course.courseCode}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {course.courseTitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      course.averageScore >= 80
                        ? 'text-green-500'
                        : course.averageScore >= 50
                        ? 'text-blue-500'
                        : 'text-red-500'
                    }`}>
                      {course.averageScore}%
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {course.testsCompleted} test{course.testsCompleted !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      course.averageScore >= 80
                        ? 'bg-green-500'
                        : course.averageScore >= 50
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${course.averageScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
