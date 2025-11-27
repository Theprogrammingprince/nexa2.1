import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle, XCircle, Clock, Award, TrendingUp, Home, RotateCcw, Sparkles, Brain } from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'fill_in_blank' | 'true_false';
  option_a?: string | null;
  option_b?: string | null;
  option_c?: string | null;
  option_d?: string | null;
  correct_answer: string;
  explanation?: string;
}

interface ResultsState {
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeTaken: number;
  questions: Question[];
  userAnswers: { [key: number]: string };
  course: {
    id: string;
    code: string;
    title: string;
  };
}

const CBTResultsPage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const resultsData = location.state as ResultsState;

  const [showExplanation, setShowExplanation] = useState<number | null>(null);
  const [aiExplanation, setAiExplanation] = useState<{ [key: number]: string }>({});
  const [loadingExplanation, setLoadingExplanation] = useState<number | null>(null);

  useEffect(() => {
    if (!resultsData) {
      toast.error('No results data found');
      navigate('/cbt');
    }
  }, [resultsData, navigate]);

  // Handle browser back button - redirect to CBT page instead of test page
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      navigate('/cbt', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    // Replace current history entry to prevent going back to test
    window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  if (!resultsData) return null;

  const { score, correctCount, totalQuestions, timeTaken, questions, userAnswers, course } = resultsData;
  const percentage = score;
  const passed = percentage >= 50;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getAnswerLabel = (question: Question, answer: string) => {
    // Handle undefined or null answers
    if (!answer) {
      return '(No answer)';
    }
    
    if (question.question_type === 'fill_in_blank') {
      return answer;
    }
    
    // Safely handle multiple choice answers
    const optionKey = `option_${answer.toLowerCase()}` as keyof Question;
    const optionText = question[optionKey];
    
    if (optionText) {
      return `${answer}. ${optionText}`;
    }
    
    // Fallback if option doesn't exist
    return answer;
  };

  const handleNexaExplain = async (questionIndex: number) => {
    setLoadingExplanation(questionIndex);
    
    try {
      const question = questions[questionIndex];
      const userAnswer = userAnswers[questionIndex];
      
      // Import the API service
      const { courseQuestionsAPI } = await import('../services/api');
      
      // Call the AI explanation API
      const response = await courseQuestionsAPI.getAIExplanation({
        questionId: question.id,
        questionText: question.question_text,
        questionType: question.question_type,
        userAnswer: userAnswer || '',
        correctAnswer: question.correct_answer,
        options: {
          option_a: question.option_a || undefined,
          option_b: question.option_b || undefined,
          option_c: question.option_c || undefined,
          option_d: question.option_d || undefined,
        },
        courseId: course.id,
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      const explanation = response.explanation || 'Unable to generate explanation at this time.';
      
      setAiExplanation(prev => ({ ...prev, [questionIndex]: explanation }));
      setShowExplanation(questionIndex);
      
      // Show a subtle indicator if using fallback vs AI
      if (response.source === 'fallback') {
        toast('Using basic explanation. Contact admin to enable AI features.', {
          icon: 'ℹ️',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error generating explanation:', error);
      toast.error('Failed to generate explanation. Please try again.');
    } finally {
      setLoadingExplanation(null);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Test Results
              </h1>
              <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {course.code} - {course.title}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/cbt')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Home size={20} />
                Back to CBT
              </button>
              <button
                onClick={() => navigate(`/cbt/instruction/${course.id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <RotateCcw size={20} />
                Retake Test
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Score Card */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 text-center`}>
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Award className={passed ? 'text-green-600' : 'text-red-600'} size={32} />
            </div>
            <h3 className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {passed ? 'Passed!' : 'Failed'}
            </p>
            </div>

          {/* Correct Answers */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 text-center`}>
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-blue-600" size={32} />
            </div>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {correctCount}/{totalQuestions}
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Correct Answers
            </p>
          </div>

          {/* Time Taken */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 text-center`}>
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-purple-600" size={32} />
            </div>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatTime(timeTaken)}
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Time Taken
            </p>
          </div>

          {/* Accuracy */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 text-center`}>
            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-orange-600" size={32} />
            </div>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {Math.round((correctCount / totalQuestions) * 100)}%
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Accuracy
            </p>
          </div>
        </div>

        {/* Question Review */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Question Review
          </h2>

          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correct_answer;
              const showingExplanation = showExplanation === index;

              return (
                <div
                  key={question.id}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="text-white" size={24} />
                      ) : (
                        <XCircle className="text-white" size={24} />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Question {index + 1}: {question.question_text}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Your Answer:</span>
                          <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {getAnswerLabel(question, userAnswer)}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">Correct Answer:</span>
                            <span className="text-green-700">
                              {getAnswerLabel(question, question.correct_answer)}
                            </span>
                          </div>
                        )}
                      </div>

                      {!isCorrect && (
                        <div className="space-y-3">
                          <button
                            onClick={() => handleNexaExplain(index)}
                            disabled={loadingExplanation === index}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
                          >
                            <Sparkles size={18} />
                            {loadingExplanation === index ? 'Generating...' : 'Nexa Explain'}
                          </button>

                          {showingExplanation && aiExplanation[index] && (
                            <div className="relative overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow-lg">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
                              <div className="relative p-6">
                                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-purple-200">
                                  <Brain className="w-5 h-5 text-purple-600" />
                                  <h4 className="font-semibold text-purple-900">Nexa AI Explanation</h4>
                                </div>
                                
                                 {/* *** COMBINED FIX: break-all for horizontal wrap, max-h-64 overflow-y-auto for vertical scroll *** */}
                                <div className="prose prose-sm max-w-none w-full break-all max-h-64 overflow-y-auto">
                                  {aiExplanation[index].split('\n').map((line, i) => {
                                    if (!line.trim()) return <div key={i} className="h-2"></div>;
                                    
                                    // Handle headers (##)
                                    if (line.startsWith('## ')) {
                                      return (
                                        <h3 key={i} className="text-lg font-bold text-purple-900 mt-4 mb-2">
                                          {line.replace('## ', '')}
                                        </h3>
                                      );
                                    }
                                    
                                    // Handle subheaders (###)
                                    if (line.startsWith('### ')) {
                                      return (
                                        <h4 key={i} className="text-base font-semibold text-purple-800 mt-3 mb-2">
                                          {line.replace('### ', '')}
                                        </h4>
                                      );
                                    }
                                    
                                    // Handle bold text (**text**)
                                    const renderTextWithBold = (text: string) => {
                                      const parts = text.split(/\*\*(.*?)\*\*/g);
                                      return parts.map((part, idx) => 
                                        idx % 2 === 1 ? (
                                          <strong key={idx} className="font-bold text-gray-900">{part}</strong>
                                        ) : (
                                          <span key={idx}>{part}</span>
                                        )
                                      );
                                    };
                                    
                                    // Handle list items
                                    if (line.trim().match(/^\d+\./)) {
                                      return (
                                        <div key={i} className="flex gap-2 mb-2 ml-2">
                                          <span className="text-purple-600 font-semibold">{line.match(/^\d+\./)}</span>
                                          <p className="text-gray-700 flex-1">{renderTextWithBold(line.replace(/^\d+\.\s*/, ''))}</p>
                                        </div>
                                      );
                                    }
                                    
                                    // Regular paragraphs
                                    return (
                                      <p key={i} className="mb-3 text-gray-700 leading-relaxed">
                                        {renderTextWithBold(line)}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
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

export default CBTResultsPage;