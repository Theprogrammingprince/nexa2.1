import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import supabase from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { BookOpen, Clock, FileText, Search, Filter } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  level: string;
  semester: number;
  question_count?: number;
}

const CBTPracticePage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchQuery, selectedLevel, selectedDepartment, selectedSemester, courses]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('level', { ascending: true })
        .order('code', { ascending: true });

      if (error) throw error;

      // Fetch question counts for each course
      const coursesWithCounts = await Promise.all(
        (data || []).map(async (course) => {
          const { count } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id);
          
          return {
            ...course,
            question_count: count || 0
          };
        })
      );

      setCourses(coursesWithCounts);
      setFilteredCourses(coursesWithCounts);
    } catch (error: any) {
      toast.error('Failed to load courses');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(course => course.department === selectedDepartment);
    }

    // Semester filter
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(course => course.semester === parseInt(selectedSemester));
    }

    setFilteredCourses(filtered);
  };

  const handleCourseClick = (course: Course) => {
    navigate(`/cbt/instruction/${course.id}`);
  };

  const getDepartments = () => {
    const departments = new Set(courses.map(c => c.department));
    return Array.from(departments).sort();
  };

  const getLevels = () => {
    const levels = new Set(courses.map(c => c.level));
    return Array.from(levels).sort();
  };

  const getColorForDepartment = (department: string) => {
    const colors: { [key: string]: string } = {
      'Computer Science': 'from-blue-500 to-blue-600',
      'Mathematics': 'from-purple-500 to-purple-600',
      'Physics': 'from-orange-500 to-orange-600',
      'Chemistry': 'from-green-500 to-green-600',
      'Biological Science': 'from-pink-500 to-pink-600',
      'Environmental Science': 'from-teal-500 to-teal-600',
    };
    return colors[department] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading courses...</p>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  CBT Practice
                </h1>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Select a course to start practicing
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>NEXA</span>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                >
                  <option value="all">All Levels</option>
                  {getLevels().map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                >
                  <option value="all">All Departments</option>
                  {getDepartments().map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Semester Filter */}
              <div>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                >
                  <option value="all">All Semesters</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </select>
              </div>
            </div>

            <div className={`mt-4 flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Filter size={16} />
              <span>Showing {filteredCourses.length} of {courses.length} courses</span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                No courses found
              </h3>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseClick(course)}
                  className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {/* Course Header with Gradient */}
                  <div className={`bg-gradient-to-r ${getColorForDepartment(course.department)} p-6 text-white`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{course.code}</h3>
                        <p className="text-sm opacity-90">{course.level}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                        <p className="text-xs font-semibold">Sem {course.semester}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Body */}
                  <div className="p-6">
                    <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 line-clamp-2`}>
                      {course.title}
                    </h4>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {course.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {course.question_count || 0} Questions Available
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {course.credits} Credit Units
                        </span>
                      </div>
                    </div>

                    <button
                      className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                        course.question_count && course.question_count > 0
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!course.question_count || course.question_count === 0}
                    >
                      {course.question_count && course.question_count > 0 ? 'Start Practice' : 'Coming Soon'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default CBTPracticePage;
