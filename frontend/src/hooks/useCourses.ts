import { useQuery } from '@tanstack/react-query';
import supabase from '../supabaseClient';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  level: string;
  semester: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface CourseWithCount extends Course {
  question_count?: number;
}

// Fetch courses from Supabase
const fetchCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .order('level', { ascending: true })
    .order('code', { ascending: true });

  if (error) throw error;
  return data || [];
};

// Fetch question count for a single course
const fetchQuestionCount = async (courseId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('course_id', courseId);

  if (error) {
    console.error(`Error fetching count for course ${courseId}:`, error);
    return 0;
  }
  return count || 0;
};

// Custom hook to fetch courses with caching
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    staleTime: 10 * 60 * 1000, // 10 minutes - courses don't change often
  });
};

// Custom hook to fetch question count for a specific course
export const useCourseQuestionCount = (courseId: string) => {
  return useQuery({
    queryKey: ['courseQuestionCount', courseId],
    queryFn: () => fetchQuestionCount(courseId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!courseId, // Only run if courseId exists
  });
};

// Batch fetch question counts for multiple courses
export const fetchQuestionCounts = async (courseIds: string[]): Promise<Record<string, number>> => {
  try {
    // Use a single query with IN clause for better performance
    const { data, error } = await supabase
      .from('questions')
      .select('course_id')
      .in('course_id', courseIds);

    if (error) throw error;

    // Count questions per course
    const counts: Record<string, number> = {};
    courseIds.forEach(id => counts[id] = 0);
    
    data?.forEach(question => {
      counts[question.course_id] = (counts[question.course_id] || 0) + 1;
    });

    return counts;
  } catch (error) {
    console.error('Error fetching question counts:', error);
    return {};
  }
};

// Custom hook to fetch all courses with their question counts
export const useCoursesWithCounts = () => {
  const { data: courses, isLoading: coursesLoading, error: coursesError } = useCourses();

  const { data: questionCounts, isLoading: countsLoading } = useQuery({
    queryKey: ['questionCounts', courses?.map(c => c.id)],
    queryFn: () => fetchQuestionCounts(courses?.map(c => c.id) || []),
    enabled: !!courses && courses.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const coursesWithCounts: CourseWithCount[] = courses?.map(course => ({
    ...course,
    question_count: questionCounts?.[course.id] || 0,
  })) || [];

  return {
    courses: coursesWithCounts,
    isLoading: coursesLoading || countsLoading,
    error: coursesError,
  };
};
