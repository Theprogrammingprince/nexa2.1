import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Clock, FileText } from 'lucide-react';

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

interface CourseCardProps {
  course: Course;
  isDarkMode: boolean;
  onCourseClick: (course: Course) => void;
  getColorForDepartment: (department: string) => string;
}

const CourseCard = memo(({ course, isDarkMode, onCourseClick, getColorForDepartment }: CourseCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px', // Start loading 50px before the card comes into view
  });

  return (
    <div
      ref={ref}
      onClick={() => onCourseClick(course)}
      className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1`}
    >
      {inView ? (
        <>
          {/* Course Header with Gradient */}
          <div className={`bg-gradient-to-r ${getColorForDepartment(course.department)} p-6 text-white`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">{course.code}</h3>
                <p className="text-sm opacity-90">{course.level}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <p className="text-xs text-gray-600 font-semibold">Sem {course.semester}</p>
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
                  ? 'bg-green-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!course.question_count || course.question_count === 0}
            >
              {course.question_count && course.question_count > 0 ? 'Start Practice' : 'Coming Soon'}
            </button>
          </div>
        </>
      ) : (
        // Skeleton loader while not in view
        <div className="animate-pulse">
          <div className="bg-gray-300 h-32"></div>
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
