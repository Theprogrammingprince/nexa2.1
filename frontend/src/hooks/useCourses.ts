import { useQuery } from '@tanstack/react-query';
import supabase from '../supabaseClient';
import { courseQuestionsAPI } from '../services/api';

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
// Uses the SAME logic as CBTInstructionPage (Edge Function API) as primary method
// Falls back to direct Supabase queries if API fails
export const fetchQuestionCounts = async (courseIds: string[]): Promise<Record<string, number>> => {
  try {
    if (!courseIds || courseIds.length === 0) {
      return {};
    }

    console.log('🔍 Fetching question counts for', courseIds.length, 'courses');

    // Initialize counts to 0 for all courses
    const counts: Record<string, number> = {};
    courseIds.forEach(id => counts[id] = 0);
    
    // PRIMARY METHOD: Use Edge Function API (same as CBTInstructionPage)
    console.log('📡 Method 1: Using Edge Function API (same as instruction page)...');
    try {
      const apiPromises = courseIds.map(async (courseId) => {
        try {
          const response = await courseQuestionsAPI.getQuestionCount(courseId);
          
          if (response.error) {
            console.warn(`⚠️ API error for course ${courseId}:`, response.error);
            return { courseId, count: 0, success: false };
          }
          
          return { courseId, count: response.count || 0, success: true };
        } catch (err) {
          console.warn(`⚠️ API exception for course ${courseId}:`, err);
          return { courseId, count: 0, success: false };
        }
      });

      const apiResults = await Promise.all(apiPromises);
      
      // Check if API method was successful for most courses
      const successfulCount = apiResults.filter(r => r.success).length;
      const successRate = successfulCount / courseIds.length;
      
      if (successRate >= 0.5) { // If at least 50% successful, use API results
        apiResults.forEach(({ courseId, count }) => {
          counts[courseId] = count;
        });
        console.log(`✅ Edge Function API successful (${successfulCount}/${courseIds.length} courses):`, counts);
        return counts;
      } else {
        console.log(`⚠️ Edge Function API had low success rate (${successfulCount}/${courseIds.length}), trying fallback...`);
      }
    } catch (apiError) {
      console.warn('⚠️ Edge Function API failed, trying fallback:', apiError);
    }
    
    // FALLBACK METHOD 1: Direct Supabase batch query
    console.log('📡 Method 2: Using direct Supabase batch query...');
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('course_id')
        .in('course_id', courseIds);

      if (!error && data && data.length > 0) {
        data.forEach(question => {
          if (question.course_id && counts.hasOwnProperty(question.course_id)) {
            counts[question.course_id] = (counts[question.course_id] || 0) + 1;
          }
        });
        console.log('✅ Batch query successful:', counts);
        return counts;
      } else if (error) {
        console.warn('⚠️ Batch query error:', error);
      }
    } catch (batchError) {
      console.warn('⚠️ Batch query exception:', batchError);
    }
    
    // FALLBACK METHOD 2: Individual Supabase count queries
    console.log('📡 Method 3: Using individual count queries (last resort)...');
    const countPromises = courseIds.map(async (courseId) => {
      try {
        const { count, error: countError } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .eq('course_id', courseId);

        if (countError) {
          console.warn(`⚠️ Count error for ${courseId}:`, countError);
          return { courseId, count: 0 };
        }
        
        return { courseId, count: count || 0 };
      } catch (err) {
        console.warn(`⚠️ Count exception for ${courseId}:`, err);
        return { courseId, count: 0 };
      }
    });

    const results = await Promise.all(countPromises);
    results.forEach(({ courseId, count }) => {
      counts[courseId] = count;
    });
    
    console.log('✅ Individual count queries successful:', counts);
    return counts;
  } catch (error) {
    console.error('❌ All methods failed in fetchQuestionCounts:', error);
    return {};
  }
};

// Custom hook to fetch all courses with their question counts
export const useCoursesWithCounts = () => {
  const { data: courses, isLoading: coursesLoading, error: coursesError } = useCourses();

  const { data: questionCounts, isLoading: countsLoading, error: countsError } = useQuery({
    queryKey: ['questionCounts', courses?.map(c => c.id).sort()], // Sort IDs for consistent cache key
    queryFn: () => fetchQuestionCounts(courses?.map(c => c.id) || []),
    enabled: !!courses && courses.length > 0,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second between retries
  });

  // Log any errors with question counts
  if (countsError) {
    console.error('❌ Error loading question counts:', countsError);
  }

  const coursesWithCounts: CourseWithCount[] = courses?.map(course => ({
    ...course,
    question_count: questionCounts?.[course.id] || 0,
  })) || [];

  // Debug log
  if (courses && questionCounts) {
    console.log('📚 Courses with counts:', coursesWithCounts.filter(c => (c.question_count || 0) > 0).length, 'courses have questions');
  }

  return {
    courses: coursesWithCounts,
    isLoading: coursesLoading || countsLoading,
    error: coursesError || countsError,
  };
};
