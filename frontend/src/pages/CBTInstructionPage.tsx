import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { Clock, FileText, AlertCircle, Play, ArrowLeft } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  level: string;
}

const CBTInstructionPage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState(20);
  const [timeLimit, setTimeLimit] = useState(30);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState(0);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      fetchAvailableQuestions();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) throw error;
      setCourse(data);
    } catch (error: any) {
      toast.error('Failed to load course details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableQuestions = async () => {
    try {
      const { count, error } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId);

      if (error) throw error;
      setAvailableQuestions(count || 0);
    } catch (error: any) {
      console.error('Error fetching question count:', error);
    }
  };

  const handleStartTest = () => {
    if (!agreedToTerms) {
      toast.error('Please agree to the test instructions');
      return;
    }

    if (availableQuestions === 0) {
      toast.error('No questions available for this course yet');
      return;
    }

    if (questionCount > availableQuestions) {
      toast.error(`Only ${availableQuestions} questions available`);
      return;
    }

    // Navigate to test page with settings
    navigate(`/cbt/test/${courseId}`, {
      state: {
        questionCount,
        timeLimit,
        course
      }
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Course not found</p>
          <button
            onClick={() => navigate('/cbt')}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/cbt')}
                className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeft size={20} />
                <span>Back to Courses</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>NEXA</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Info Card */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 mb-6`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {course.title}
                </h1>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? 'bg-primary-900 text-primary-300' : 'bg-primary-100 text-primary-700'}`}>
                    {course.code}
                  </span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {course.level}
                  </span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {course.department}
                  </span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                <p className="text-sm font-medium">{availableQuestions} Questions Available</p>
              </div>
            </div>
          </div>

          {/* Test Configuration */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 mb-6`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Test Configuration
            </h2>

            <div className="space-y-6">
              {/* Number of Questions */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  <FileText size={18} className="inline mr-2" />
                  Number of Questions
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max={Math.min(50, availableQuestions)}
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    disabled={availableQuestions === 0}
                  />
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} min-w-[60px] text-center`}>
                    {questionCount}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Select between 5 and {Math.min(50, availableQuestions)} questions
                </p>
              </div>

              {/* Time Limit */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  <Clock size={18} className="inline mr-2" />
                  Time Limit (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="5"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} min-w-[60px] text-center`}>
                    {timeLimit}m
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Recommended: {Math.ceil(questionCount * 1.5)} minutes for {questionCount} questions
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 mb-6`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
              <AlertCircle size={24} className="text-orange-500" />
              Test Instructions
            </h2>
            <ul className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">1.</span>
                <span>This is a timed test. The timer will start as soon as you begin.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">2.</span>
                <span>You can navigate between questions using the navigation buttons.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">3.</span>
                <span>You can review and change your answers before submitting.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">4.</span>
                <span>The test will auto-submit when time expires.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">5.</span>
                <span>Make sure you have a stable internet connection.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">6.</span>
                <span>Do not refresh the page during the test to avoid losing your progress.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">7.</span>
                <span>Your results will be displayed immediately after submission.</span>
              </li>
            </ul>

            {/* Agreement Checkbox */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  I have read and understood the test instructions. I agree to follow all guidelines and complete the test honestly.
                </span>
              </label>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartTest}
              disabled={!agreedToTerms || availableQuestions === 0}
              className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all ${
                agreedToTerms && availableQuestions > 0
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Play size={24} />
              Start Test
            </button>
          </div>

          {availableQuestions === 0 && (
            <p className="text-center mt-4 text-orange-500 font-medium">
              Questions for this course will be available soon
            </p>
          )}
        </main>
      </div>
    </>
  );
};

export default CBTInstructionPage;
