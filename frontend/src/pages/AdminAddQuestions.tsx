import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const AdminAddQuestions = () => {
  const { isDarkMode } = useTheme();
  const [testForm, setTestForm] = useState({
    title: '',
    course: '',
    courseCode: '',
    duration: '',
    difficulty: 'Intermediate',
    passingScore: '70',
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    }
  ]);

  const handleTestFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTestForm({ ...testForm, [e.target.name]: e.target.value });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend API call - POST /api/admin/tests
    // const testData = {
    //   ...testForm,
    //   questions: questions,
    //   totalQuestions: questions.length,
    // };
    alert('Test created successfully! (Backend integration pending)');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Create New CBT Test
          </h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Add questions for a new Computer-Based Test
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Test Information */}
          <div className={`rounded-xl p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Test Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Test Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={testForm.title}
                  onChange={handleTestFormChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., Data Structures Final Exam"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Course *
                </label>
                <input
                  type="text"
                  name="course"
                  value={testForm.course}
                  onChange={handleTestFormChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., Data Structures & Algorithms"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Course Code *
                </label>
                <input
                  type="text"
                  name="courseCode"
                  value={testForm.courseCode}
                  onChange={handleTestFormChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., CSC 201"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={testForm.duration}
                  onChange={handleTestFormChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., 60"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Difficulty Level *
                </label>
                <select
                  name="difficulty"
                  value={testForm.difficulty}
                  onChange={handleTestFormChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Passing Score (%) *
                </label>
                <input
                  type="number"
                  name="passingScore"
                  value={testForm.passingScore}
                  onChange={handleTestFormChange}
                  required
                  min="0"
                  max="100"
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., 70"
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className={`rounded-xl p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Questions ({questions.length})
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                + Add Question
              </button>
            </div>

            <div className="space-y-6">
              {questions.map((question, questionIndex) => (
                <div key={question.id} className={`p-6 rounded-lg border-2 ${isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Question {questionIndex + 1}
                    </h3>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Question Text *
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                      required
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                      }`}
                      placeholder="Enter your question here..."
                    />
                  </div>

                  {/* Options */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Options *
                    </label>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name={`correct-${questionIndex}`}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                              required
                              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                              }`}
                              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Select the radio button next to the correct answer
                    </p>
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Explanation (Optional)
                    </label>
                    <textarea
                      value={question.explanation}
                      onChange={(e) => updateQuestion(questionIndex, 'explanation', e.target.value)}
                      rows={2}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                      }`}
                      placeholder="Explain why this is the correct answer..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Create Test ({questions.length} Questions)
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddQuestions;
