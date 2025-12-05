import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { adminExtendedAPI } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import {
  BarChart3,
  Users,
  TrendingUp,
  BookOpen,
  MessageSquare,
  DollarSign,
  Activity,
  Award,
  RefreshCw,
} from 'lucide-react';

interface Analytics {
  overview: {
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
    premiumUsers: number;
    totalTests: number;
    recentTests: number;
    averageScore: number;
    totalSummaries: number;
    totalMessages: number;
    unreadMessages: number;
    monthlyRevenue: number;
  };
  charts: {
    userGrowth: Array<{ month: string; count: number }>;
    testActivity: Array<{ date: string; count: number }>;
    popularCourses: Array<{ code: string; title: string; count: number }>;
  };
}

const AdminAnalytics = () => {
  const { isDarkMode } = useTheme();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await adminExtendedAPI.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className={`h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className={`h-32 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const statCards = [
    {
      title: 'Total Users',
      value: analytics.overview.totalUsers,
      change: `+${analytics.overview.newUsers} this month`,
      icon: Users,
      color: 'blue',
      bgColor: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Active Users',
      value: analytics.overview.activeUsers,
      change: 'Last 7 days',
      icon: Activity,
      color: 'green',
      bgColor: isDarkMode ? 'bg-green-900/20' : 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Premium Users',
      value: analytics.overview.premiumUsers,
      change: `${Math.round((analytics.overview.premiumUsers / analytics.overview.totalUsers) * 100)}% of total`,
      icon: Award,
      color: 'yellow',
      bgColor: isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'Total Tests',
      value: analytics.overview.totalTests,
      change: `+${analytics.overview.recentTests} this month`,
      icon: BookOpen,
      color: 'purple',
      bgColor: isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Average Score',
      value: `${analytics.overview.averageScore}%`,
      change: 'Platform average',
      icon: TrendingUp,
      color: 'indigo',
      bgColor: isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Total Summaries',
      value: analytics.overview.totalSummaries,
      change: 'Available content',
      icon: BookOpen,
      color: 'pink',
      bgColor: isDarkMode ? 'bg-pink-900/20' : 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
    {
      title: 'Support Messages',
      value: analytics.overview.totalMessages,
      change: `${analytics.overview.unreadMessages} unread`,
      icon: MessageSquare,
      color: 'orange',
      bgColor: isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Monthly Revenue',
      value: `₦${analytics.overview.monthlyRevenue.toLocaleString()}`,
      change: 'From subscriptions',
      icon: DollarSign,
      color: 'emerald',
      bgColor: isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Analytics Dashboard
              </h1>
            </div>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Comprehensive platform statistics and insights
            </p>
          </div>
          <button
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-6 ${
                isDarkMode ? 'border border-gray-700' : 'border border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              User Growth (Last 12 Months)
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.charts.userGrowth.map((data, index) => {
                const maxCount = Math.max(...analytics.charts.userGrowth.map((d) => d.count));
                const height = maxCount > 0 ? (data.count / maxCount) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full group">
                      <div
                        className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all hover:from-primary-700 hover:to-primary-500"
                        style={{ height: `${height}%`, minHeight: data.count > 0 ? '4px' : '0' }}
                      ></div>
                      <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`}>
                        {data.count} users
                      </div>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {data.month.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Activity Chart */}
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Test Activity (Last 30 Days)
            </h3>
            <div className="h-64 flex items-end justify-between gap-1">
              {analytics.charts.testActivity.slice(-14).map((data, index) => {
                const maxCount = Math.max(...analytics.charts.testActivity.map((d) => d.count));
                const height = maxCount > 0 ? (data.count / maxCount) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full group">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all hover:from-green-700 hover:to-green-500"
                        style={{ height: `${height}%`, minHeight: data.count > 0 ? '4px' : '0' }}
                      ></div>
                      <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`}>
                        {data.count} tests
                      </div>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(data.date).getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Popular Courses */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Most Popular Courses
          </h3>
          <div className="space-y-3">
            {analytics.charts.popularCourses.slice(0, 10).map((course, index) => {
              const maxCount = Math.max(...analytics.charts.popularCourses.map((c) => c.count));
              const percentage = maxCount > 0 ? (course.count / maxCount) * 100 : 0;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        #{index + 1}
                      </span>
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {course.code}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.title}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {course.count} tests
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-gradient-to-r from-primary-600 to-purple-600 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
