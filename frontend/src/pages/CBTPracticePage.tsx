import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import CourseCard from '../components/CourseCard';
import { useCoursesWithCounts } from '../hooks/useCourses';
import { useDebounce } from '../hooks/useDebounce';
import { BookOpen, Search, Filter } from 'lucide-react';

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
  
  // Fetch courses with React Query (cached and optimized)
  const { courses, isLoading, error } = useCoursesWithCounts();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  
  // Debounce search query to reduce filtering operations
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Show error toast if courses fail to load
  if (error) {
    toast.error('Failed to load courses');
  }

  // Memoized filtering logic - only recalculates when dependencies change
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Search filter - now includes level and department with smart matching
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(course => {
        // Normalize level for better matching (e.g., "200L" matches "200 Level")
        const normalizedLevel = course.level?.toLowerCase().replace(/\s+/g, '') || '';
        const normalizedQuery = query.replace(/\s+/g, '');
        
        return (
          course.title?.toLowerCase().includes(query) ||
          course.code?.toLowerCase().includes(query) ||
          course.level?.toLowerCase().includes(query) ||
          normalizedLevel.includes(normalizedQuery) ||
          course.department?.toLowerCase().includes(query)
        );
      });
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

    return filtered;
  }, [courses, debouncedSearchQuery, selectedLevel, selectedDepartment, selectedSemester]);

  // Memoized callback to prevent unnecessary re-renders
  const handleCourseClick = useCallback((course: Course) => {
    navigate(`/cbt/instruction/${course.id}`);
  }, [navigate]);

  // Memoized departments list
  const departments = useMemo(() => {
    const depts = new Set(courses.map(c => c.department));
    return Array.from(depts).sort();
  }, [courses]);

  // Memoized levels list
  const levels = useMemo(() => {
    const lvls = new Set(courses.map(c => c.level));
    const levelArray = Array.from(lvls);
    
    // Remove duplicates like "200" if "200 Level" exists
    const filtered = levelArray.filter(level => {
      // If this is just a number (like "200"), check if there's a "XXX Level" version
      if (/^\d+$/.test(level)) {
        const levelVersion = `${level} Level`;
        return !levelArray.includes(levelVersion);
      }
      return true;
    });
    
    return filtered.sort();
  }, [courses]);

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

  if (isLoading) {
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
      <DashboardLayout currentPage="/cbt">
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
                  {levels.map(level => (
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
                  {departments.map(dept => (
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

        {/* Courses Grid */}
        <div className="max-w-7xl mx-auto pb-12">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                No courses found
              </h3>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isDarkMode={isDarkMode}
                  onCourseClick={handleCourseClick}
                  getColorForDepartment={getColorForDepartment}
                />
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default CBTPracticePage;
