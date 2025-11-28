import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface ChartData {
  date: string;
  day: string;
  score: number;
  tests: number;
  hasData: boolean;
}

interface PerformanceData {
  stats: {
    highest: number;
    average: number;
    improvement: number;
    bestScoreDate: string | null;
  };
  chartData: ChartData[];
  totalTests: number;
}

const PerformanceChart = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  
  const [data, setData] = useState<PerformanceData | null>(null);
  const [period, setPeriod] = useState('7');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchChartData();
      
      // Refresh every 30 seconds
      const interval = setInterval(fetchChartData, 30000);
      
      // Listen for test submission events to refresh immediately
      const handleTestSubmitted = () => {
        fetchChartData();
      };
      
      window.addEventListener('testSubmitted', handleTestSubmitted);
      
      return () => {
        clearInterval(interval);
        window.removeEventListener('testSubmitted', handleTestSubmitted);
      };
    }
  }, [period, user]);

  const fetchChartData = async () => {
    if (!user) return;
    
    try {
      const response = await dashboardAPI.getPerformanceChart(user.id, period);
      
      if (response.error || !response.chartData || !response.stats) {
        setLoading(false);
        return;
      }
      
      setData(response);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSVGPath = (chartData: ChartData[]): { linePath: string; areaPath: string } | null => {
    if (!chartData || chartData.length === 0) return null;
    
    const width = 600;
    const height = 200;
    const padding = 20;
    const dataPoints = chartData.filter(d => d.hasData);
    
    if (dataPoints.length === 0) return null;
    
    const xStep = (width - padding * 2) / (chartData.length - 1);
    const yScale = (height - padding * 2) / 100;
    
    let path = '';
    let areaPath = '';
    
    chartData.forEach((point, i) => {
      const x = padding + (i * xStep);
      const y = height - padding - (point.score * yScale);
      
      if (i === 0) {
        path = `M ${x},${y}`;
        areaPath = `M ${x},${height - padding} L ${x},${y}`;
      } else {
        // Smooth curve using quadratic bezier
        const prevX = padding + ((i - 1) * xStep);
        const prevY = height - padding - (chartData[i - 1].score * yScale);
        const cpX = (prevX + x) / 2;
        
        path += ` Q ${cpX},${prevY} ${x},${y}`;
        areaPath += ` Q ${cpX},${prevY} ${x},${y}`;
      }
    });
    
    // Close area path
    const lastX = padding + ((chartData.length - 1) * xStep);
    areaPath += ` L ${lastX},${height - padding} Z`;
    
    return { linePath: path, areaPath };
  };

  if (loading) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 h-96 flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!data || data.totalTests === 0) {
    
    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Performance Overview
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Your test scores over time
            </p>
          </div>
          
          <button
            onClick={() => {
              setLoading(true);
              fetchChartData();
            }}
            className={`px-3 py-1 border rounded-lg text-sm flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            } transition-colors`}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No test data yet
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Take your first test to see your performance chart!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const paths = generateSVGPath(data.chartData);

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Overview
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Your test scores over time
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Score Trend
            </span>
          </div>
          
          <button
            onClick={() => {
              setLoading(true);
              fetchChartData();
            }}
            className={`px-3 py-1 border rounded-lg text-sm flex items-center gap-2 ${
              isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            } transition-colors`}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={`px-3 py-1 border rounded-lg text-sm ${
              isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white border-gray-300'
            }`}
          >
            <option value="7">Last 7 Days</option>
            <option value="14">Last 14 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 mb-6">
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
            {paths && paths.areaPath && (
              <path
                d={paths.areaPath}
                fill="url(#chartGradient)"
                className="transition-all duration-500"
              />
            )}
            
            {/* Line */}
            {paths && paths.linePath && (
              <path
                d={paths.linePath}
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                className="transition-all duration-500"
              />
            )}
            
            {/* Data points */}
            {data.chartData.filter(d => d.hasData).map((point, i) => {
              const width = 600;
              const height = 200;
              const padding = 20;
              const xStep = (width - padding * 2) / (data.chartData.length - 1);
              const yScale = (height - padding * 2) / 100;
              const index = data.chartData.indexOf(point);
              const x = padding + (index * xStep);
              const y = height - padding - (point.score * yScale);
              
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={isDarkMode ? '#1f2937' : '#ffffff'}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          
          {/* Best Score Badge (MOVED HERE - OUTSIDE <svg> but inside the 'relative' parent) */}
          {data.stats.bestScoreDate && (
            <div className="absolute top-4 right-4 bg-primary-600 px-4 py-2 rounded-lg shadow-lg z-10"> 
        {/* 'Best Score' label: White on dark mode, Dark on light mode */}
        <div className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Best Score
        </div> 
        
        {/* Score percentage: White on dark mode, Dark on light mode */}
        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.stats.highest}%
        </div>
    </div>
          )}
        </div>
        
        {/* X-axis labels */}
        <div className="ml-8 flex justify-between text-xs text-gray-400 mt-2">
          {data.chartData.map((point, i) => (
            <span key={i}>{point.day}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.stats.highest}%
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Highest
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.stats.average}%
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Average
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold flex items-center justify-center gap-1 ${
            data.stats.improvement >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {data.stats.improvement >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            {data.stats.improvement >= 0 ? '+' : ''}{data.stats.improvement}%
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Improvement
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;