import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { adminExtendedAPI } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { Users, Search, Eye, TrendingUp, Award, BookOpen, X, Calendar, Mail, Phone, MapPin } from 'lucide-react';

interface Student {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  department?: string;
  level?: string;
  student_id?: string;
  phone?: string;
  created_at: string;
  totalTests: number;
  averageScore: number;
  subscription_tier?: string;
}

interface StudentDetails {
  student: Student;
  stats: {
    totalTests: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    totalNotes: number;
    summariesViewed: number;
    mostTakenCourse: { course: string; count: number } | null;
    highestScoringCourse: { course: string; average: number } | null;
  };
  recentTests: any[];
  recentActivity: any[];
  notes: any[];
}

const AdminStudents = () => {
  const { isDarkMode } = useTheme();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchQuery, students]);

  const fetchStudents = async () => {
    try {
      const { students: data } = await adminExtendedAPI.getStudents();
      setStudents(data || []);
      setFilteredStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = () => {
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = students.filter(
      (student) =>
        student.full_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.student_id?.toLowerCase().includes(query) ||
        student.department?.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const viewStudentDetails = async (studentId: string) => {
    setLoadingDetails(true);
    try {
      const data = await adminExtendedAPI.getStudentDetails(studentId);
      setSelectedStudent(data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      toast.error('Failed to load student details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className={`h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`h-48 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Students Management
            </h1>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            View and manage all registered students
          </p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search by name, email, ID, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
          </div>

          <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Students</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {students.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-primary-600" />
            </div>
          </div>

          <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {students.length > 0
                    ? Math.round(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length)
                    : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`rounded-xl p-6 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
              } transition-all cursor-pointer border-2 ${
                isDarkMode ? 'border-gray-700 hover:border-primary-500' : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => viewStudentDetails(student.id)}
            >
              {/* Student Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {student.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {student.full_name}
                  </h3>
                  <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {student.email}
                  </p>
                </div>
                {student.subscription_tier === 'pro' && (
                  <Award className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              {/* Student Info */}
              <div className="space-y-2 mb-4">
                {student.student_id && (
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-medium">ID:</span> {student.student_id}
                  </div>
                )}
                {student.department && (
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-medium">Dept:</span> {student.department}
                  </div>
                )}
                {student.level && (
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-medium">Level:</span> {student.level}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tests Taken</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {student.totalTests}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</p>
                  <p className={`text-lg font-bold ${getScoreColor(student.averageScore)}`}>
                    {student.averageScore}%
                  </p>
                </div>
              </div>

              {/* View Details Button */}
              <button className="w-full mt-4 py-2 px-4 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No students found</p>
            <p className="text-sm">Try adjusting your search query</p>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className={`w-full max-w-4xl rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-h-[90vh] overflow-y-auto`}>
            {loadingDetails ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading details...</p>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                        {selectedStudent.student.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedStudent.student.full_name}
                        </h2>
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {selectedStudent.student.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStudent(null)}
                      className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                          <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                            {selectedStudent.student.email}
                          </p>
                        </div>
                      </div>
                      {selectedStudent.student.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary-600" />
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                            <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              {selectedStudent.student.phone}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedStudent.student.department && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary-600" />
                          <div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Department</p>
                            <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                              {selectedStudent.student.department}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Joined</p>
                          <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                            {new Date(selectedStudent.student.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Performance Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Tests</p>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedStudent.stats.totalTests}
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(selectedStudent.stats.averageScore)}`}>
                          {selectedStudent.stats.averageScore}%
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Highest</p>
                        <p className={`text-2xl font-bold ${getScoreColor(selectedStudent.stats.highestScore)}`}>
                          {selectedStudent.stats.highestScore}%
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lowest</p>
                        <p className={`text-2xl font-bold ${getScoreColor(selectedStudent.stats.lowestScore)}`}>
                          {selectedStudent.stats.lowestScore}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Course Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedStudent.stats.mostTakenCourse && (
                      <div className={`p-4 rounded-lg border-2 ${isDarkMode ? 'bg-gray-700 border-blue-500' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Most Taken Course
                          </h4>
                        </div>
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {selectedStudent.stats.mostTakenCourse.course}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {selectedStudent.stats.mostTakenCourse.count} tests taken
                        </p>
                      </div>
                    )}

                    {selectedStudent.stats.highestScoringCourse && (
                      <div className={`p-4 rounded-lg border-2 ${isDarkMode ? 'bg-gray-700 border-green-500' : 'bg-green-50 border-green-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-5 h-5 text-green-600" />
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Best Performing Course
                          </h4>
                        </div>
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          {selectedStudent.stats.highestScoringCourse.course}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Average: {selectedStudent.stats.highestScoringCourse.average}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Recent Tests */}
                  {selectedStudent.recentTests.length > 0 && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Recent Tests
                      </h3>
                      <div className="space-y-2">
                        {selectedStudent.recentTests.slice(0, 5).map((test: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg flex items-center justify-between ${
                              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                            }`}
                          >
                            <div>
                              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {test.tests?.title || 'Unknown Test'}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {test.tests?.course_code} • {new Date(test.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getScoreBadgeColor(test.score)}`}>
                              {test.score}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
