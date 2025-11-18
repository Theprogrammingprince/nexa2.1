// App constants

export const APP_NAME = 'NEXA';
export const APP_FULL_NAME = 'NOUN Exam Experience Assistant';
export const APP_DESCRIPTION = 'Computer-Based Training Platform for NOUN Students';

// Routes
export const ROUTES = {
    HOME: '/',
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
    ADMIN: '/admin',
    SUMMARIES: '/summaries',
    SUMMARY_DETAIL: '/summaries/:id',
    CBT_PRACTICE: '/cbt',
    SCHEDULE: '/schedule',
    SETTINGS: '/settings',
    PRICING: '/pricing',
    ADMIN_ADD_SUMMARY: '/admin/add-summary',
    ADMIN_ADD_QUESTIONS: '/admin/add-questions',
} as const;

// User roles
export const USER_ROLES = {
    STUDENT: 'student',
    ADMIN: 'admin',
} as const;

// Difficulty levels
export const DIFFICULTY_LEVELS = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
} as const;

// Test status
export const TEST_STATUS = {
    DRAFT: 'draft',
    ACTIVE: 'active',
    ARCHIVED: 'archived',
} as const;

// Submission status
export const SUBMISSION_STATUS = {
    IN_PROGRESS: 'in_progress',
    SUBMITTED: 'submitted',
    GRADED: 'graded',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
    ASSIGNMENT: 'assignment',
    EXAM: 'exam',
    GRADE: 'grade',
    ANNOUNCEMENT: 'announcement',
    SYSTEM: 'system',
} as const;

// Priority levels
export const PRIORITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
} as const;

// Categories
export const CATEGORIES = [
    'All Courses',
    'Computer Science',
    'Marketing',
    'Psychology',
    'Mathematics',
    'Engineering',
    'Business',
    'Education',
    'Law',
    'Medicine',
] as const;

// Days of week
export const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
] as const;

// Time slots
export const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
] as const;

// Passing score
export const DEFAULT_PASSING_SCORE = 70;

// Pagination
export const ITEMS_PER_PAGE = 10;

// Local storage keys
export const STORAGE_KEYS = {
    THEME: 'theme',
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
} as const;

// API endpoints (relative to Supabase functions URL)
export const API_ENDPOINTS = {
    // Auth
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    
    // Summaries
    GET_SUMMARIES: '/get-summaries',
    GET_SUMMARY_DETAIL: '/get-summary-detail',
    CREATE_SUMMARY: '/create-summary',
    
    // Tests
    GET_TESTS: '/get-tests',
    GET_TEST_QUESTIONS: '/get-test-questions',
    CREATE_TEST: '/create-test',
    SUBMIT_TEST: '/submit-test',
    
    // Notifications
    GET_NOTIFICATIONS: '/get-notifications',
    MARK_NOTIFICATION_READ: '/mark-notification-read',
    
    // Schedule
    GET_SCHEDULE: '/get-schedule',
    CREATE_SCHEDULE_ITEM: '/create-schedule-item',
    
    // User
    GET_USER_STATS: '/get-user-stats',
    UPDATE_USER_PROFILE: '/update-user-profile',
    
    // Admin
    GET_ADMIN_DASHBOARD: '/get-admin-dashboard',
} as const;

// Error messages
export const ERROR_MESSAGES = {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION: 'Please check your input and try again.',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
    SIGNIN: 'Signed in successfully!',
    SIGNUP: 'Account created successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    TEST_SUBMITTED: 'Test submitted successfully!',
    SUMMARY_CREATED: 'Summary created successfully!',
    TEST_CREATED: 'Test created successfully!',
    SCHEDULE_ADDED: 'Schedule item added successfully!',
} as const;

// Validation rules
export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 8,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_MIN_LENGTH: 10,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
} as const;

// Theme colors
export const THEME_COLORS = {
    PRIMARY: '#2563eb',
    SECONDARY: '#64748b',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#3b82f6',
} as const;
