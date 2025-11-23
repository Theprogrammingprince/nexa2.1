import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const AdminAddSummary = () => {
  const { isDarkMode } = useTheme();
  const [summaryForm, setSummaryForm] = useState({
    title: '',
    course: '',
    courseCode: '',
    category: '',
    difficulty: 'Beginner',
    description: '',
    readTime: '',
    isPremium: false,
  });

  const [sections, setSections] = useState([
    { id: 1, title: '', topics: [{ id: 1, subtitle: '', content: '' }] }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSummaryForm({
      ...summaryForm,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const addSection = () => {
    setSections([...sections, { 
      id: sections.length + 1, 
      title: '', 
      topics: [{ id: 1, subtitle: '', content: '' }] 
    }]);
  };

  const addTopic = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].topics.push({
      id: newSections[sectionIndex].topics.length + 1,
      subtitle: '',
      content: ''
    });
    setSections(newSections);
  };

  const updateSection = (sectionIndex: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
    setSections(newSections);
  };

  const updateTopic = (sectionIndex: number, topicIndex: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].topics[topicIndex] = {
      ...newSections[sectionIndex].topics[topicIndex],
      [field]: value
    };
    setSections(newSections);
  };

  const removeSection = (sectionIndex: number) => {
    setSections(sections.filter((_, index) => index !== sectionIndex));
  };

  const removeTopic = (sectionIndex: number, topicIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].topics = newSections[sectionIndex].topics.filter((_, index) => index !== topicIndex);
    setSections(newSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend API call - POST /api/admin/summaries
    // const summaryData = {
    //   ...summaryForm,
    //   sections: sections
    // };
    alert('Summary created successfully! (Backend integration pending)');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Create New Summary
          </h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Add a new course summary for students
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className={`rounded-xl p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={summaryForm.title}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., Introduction to Data Structures"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Course *
                </label>
                <input
                  type="text"
                  name="course"
                  value={summaryForm.course}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Course Code *
                </label>
                <input
                  type="text"
                  name="courseCode"
                  value={summaryForm.courseCode}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., CSC 201"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  name="category"
                  value={summaryForm.category}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Business">Business</option>
                  <option value="Psychology">Psychology</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Difficulty Level *
                </label>
                <select
                  name="difficulty"
                  value={summaryForm.difficulty}
                  onChange={handleInputChange}
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
                  Read Time (minutes) *
                </label>
                <input
                  type="number"
                  name="readTime"
                  value={summaryForm.readTime}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., 45"
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={summaryForm.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Brief description of the summary..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPremium"
                  checked={summaryForm.isPremium}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Premium Content
                </label>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className={`rounded-xl p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Content Sections
              </h2>
              <button
                type="button"
                onClick={addSection}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                + Add Section
              </button>
            </div>

            <div className="space-y-6">
              {sections.map((section, sectionIndex) => (
                <div key={section.id} className={`p-4 rounded-lg border-2 ${isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Section {sectionIndex + 1}
                    </h3>
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Section Title *
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                      required
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                      }`}
                      placeholder="e.g., Introduction"
                    />
                  </div>

                  {/* Topics */}
                  <div className="space-y-3">
                    {section.topics.map((topic, topicIndex) => (
                      <div key={topic.id} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            Topic {topicIndex + 1}
                          </span>
                          {section.topics.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTopic(sectionIndex, topicIndex)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={topic.subtitle}
                          onChange={(e) => updateTopic(sectionIndex, topicIndex, 'subtitle', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border mb-2 focus:ring-2 focus:ring-primary-500 ${
                            isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-100' : 'bg-white border-gray-300'
                          }`}
                          placeholder="Topic subtitle"
                        />
                        <textarea
                          value={topic.content}
                          onChange={(e) => updateTopic(sectionIndex, topicIndex, 'content', e.target.value)}
                          rows={4}
                          className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                            isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-100' : 'bg-white border-gray-300'
                          }`}
                          placeholder="Topic content..."
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addTopic(sectionIndex)}
                      className={`w-full py-2 border-2 border-dashed rounded-lg transition-colors ${
                        isDarkMode ? 'border-gray-600 hover:border-gray-500 text-gray-300' : 'border-gray-300 hover:border-gray-400 text-gray-600'
                      }`}
                    >
                      + Add Topic
                    </button>
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
              Create Summary
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

export default AdminAddSummary;
