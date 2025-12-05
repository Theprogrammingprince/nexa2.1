// Type definitions for the application

export type UserRole = 'student' | 'admin';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TestStatus = 'draft' | 'active' | 'archived';
export type SubmissionStatus = 'in_progress' | 'submitted' | 'graded';
export type NotificationType = 'assignment' | 'exam' | 'grade' | 'announcement' | 'system';
export type PriorityLevel = 'low' | 'medium' | 'high';

// User types
export interface User {
    id: string;
    email: string;
    created_at: string;
}

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    student_id?: string;
    department?: string;
    level?: string;
    phone?: string;
    avatar_url?: string;
    subscription_tier?: 'free' | 'pro';
    subscription_status?: 'active' | 'cancelled' | 'expired' | 'trialing';
    subscription_start_date?: string;
    subscription_end_date?: string;
    stripe_customer_id?: string;
    created_at: string;
    updated_at: string;
}

// Course types
export interface Course {
    id: string;
    title: string;
    code: string;
    description?: string;
    department?: string;
    level?: string;
    credits: number;
    is_active: boolean;
    created_at: string;
}

// Summary types
export interface Summary {
    id: string;
    title: string;
    course_id: string;
    course_code: string;
    category: string;
    description?: string;
    difficulty: DifficultyLevel;
    read_time?: string;
    is_premium: boolean;
    thumbnail?: string;
    created_at: string;
    updated_at: string;
}

export interface SummarySection {
    id: string;
    summary_id: string;
    title: string;
    order_index: number;
    created_at: string;
}

export interface SummaryTopic {
    id: string;
    section_id: string;
    subtitle: string;
    content: string;
    order_index: number;
    created_at: string;
}

export interface SummaryDetail extends Summary {
    sections: (SummarySection & {
        topics: SummaryTopic[];
    })[];
}

// Test types
export interface Test {
    id: string;
    title: string;
    course_id: string;
    course_code: string;
    description?: string;
    duration: number;
    total_questions: number;
    passing_score: number;
    difficulty: DifficultyLevel;
    status: TestStatus;
    is_premium: boolean;
    created_at: string;
    updated_at: string;
}

export interface Question {
    id: string;
    test_id?: string | null;  // For old test-based questions
    course_id?: string | null;  // For new course-based questions
    question?: string;  // Old format (for test-based questions)
    question_text?: string;  // New format (for course-based questions)
    question_type?: 'multiple_choice' | 'fill_in_blank' | 'true_false';
    options?: string[];  // Old format (JSONB array)
    option_a?: string | null;  // New format
    option_b?: string | null;  // New format
    option_c?: string | null;  // New format
    option_d?: string | null;  // New format
    correct_answer: number | string;  // number for old format, string (A/B/C/D or text) for new format
    explanation?: string;
    order_index?: number;
    created_at: string;
}

export interface TestSubmission {
    id: string;
    test_id: string;
    user_id: string;
    answers: Record<string, number>;
    score: number;
    percentage: number;
    time_taken: number;
    status: SubmissionStatus;
    started_at: string;
    submitted_at?: string;
    created_at: string;
}

// Progress types
export interface UserProgress {
    id: string;
    user_id: string;
    summary_id: string;
    progress_percentage: number;
    completed_sections: string[];
    last_accessed: string;
    created_at: string;
}

// Schedule types
export interface ScheduleClass {
    id: string;
    user_id: string;
    title: string;
    course_code?: string;
    instructor?: string;
    location?: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    color: string;
    created_at: string;
    updated_at: string;
}

export interface Assignment {
    id: string;
    user_id: string;
    title: string;
    course_code?: string;
    description?: string;
    due_date: string;
    priority: PriorityLevel;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface StudySession {
    id: string;
    user_id: string;
    subject: string;
    duration: number;
    scheduled_date: string;
    scheduled_time: string;
    goals?: string;
    completed: boolean;
    created_at: string;
}

// Notification types
export interface Notification {
    id: string;
    user_id: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    link?: string;
    created_at: string;
}

// Settings types
export interface UserSettings {
    user_id: string;
    email_notifications: boolean;
    test_reminders: boolean;
    score_updates: boolean;
    system_updates: boolean;
    language: string;
    timezone: string;
    theme: string;
    updated_at: string;
}

// Stats types
export interface UserStats {
    id: string;
    user_id: string;
    total_tests_taken: number;
    average_score: number;
    total_study_hours: number;
    streak_days: number;
    last_activity: string;
    updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Form types
export interface SignInForm {
    email: string;
    password: string;
}

export interface SignUpForm {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
}

export interface ProfileUpdateForm {
    full_name?: string;
    student_id?: string;
    department?: string;
    level?: string;
    phone?: string;
}

export interface PasswordChangeForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface CreateSummaryForm {
    title: string;
    course: string;
    courseCode: string;
    category: string;
    difficulty: DifficultyLevel;
    description: string;
    readTime: string;
    isPremium: boolean;
    sections: {
        title: string;
        topics: {
            subtitle: string;
            content: string;
        }[];
    }[];
}

export interface CreateTestForm {
    title: string;
    course: string;
    courseCode: string;
    duration: number;
    difficulty: DifficultyLevel;
    passingScore: number;
    questions: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation?: string;
    }[];
}

export interface CreateScheduleItemForm {
    type: 'class' | 'assignment' | 'study_session';
    title: string;
    course_code?: string;
    instructor?: string;
    location?: string;
    day_of_week?: number;
    start_time?: string;
    end_time?: string;
    due_date?: string;
    priority?: PriorityLevel;
    description?: string;
    subject?: string;
    duration?: number;
    scheduled_date?: string;
    scheduled_time?: string;
    goals?: string;
}

// Dashboard types
export interface DashboardStats {
    courseProgress: number;
    attendance: number;
    avgScore: number;
}

export interface AdminDashboardStats {
    totalStudents: number;
    activeTests: number;
    avgPerformance: number;
}
