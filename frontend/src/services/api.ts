import supabase from '../supabaseClient';

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_URL + '/functions/v1';

// Helper function to get auth headers
const getAuthHeaders = async () => {
    // Get the current session (Supabase handles auto-refresh)
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
        console.error('❌ Session error:', error);
        throw new Error('Session error: ' + error.message);
    }
    
    if (!session?.access_token) {
        console.error('❌ No active session - user needs to log in');
        throw new Error('No active session');
    }
    
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    };
};

// Auth APIs
export const authAPI = {
    signUp: async (email: string, password: string, fullName: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, fullName }),
        });
        return response.json();
    },

    signIn: async (email: string, password: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },

    signOut: async () => {
        return await supabase.auth.signOut();
    },

    getCurrentUser: async () => {
        return await supabase.auth.getUser();
    },
};

// Summaries APIs
export const summariesAPI = {
    getAll: async (category?: string, search?: string) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        
        const response = await fetch(`${FUNCTIONS_URL}/get-summaries?${params}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    getDetail: async (id: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/get-summary-detail?id=${id}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    create: async (summaryData: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/create-summary`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(summaryData),
        });
        return response.json();
    },
};

// Tests APIs
export const testsAPI = {
    getAll: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/get-tests`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    getQuestions: async (testId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/get-test-questions?testId=${testId}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    create: async (testData: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/create-test`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(testData),
        });
        return response.json();
    },

    submit: async (testId: string, answers: any, timeTaken: number) => {
        const response = await fetch(`${FUNCTIONS_URL}/submit-test`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ testId, answers, timeTaken }),
        });
        return response.json();
    },
};

// Course Questions APIs
export const courseQuestionsAPI = {
    getQuestions: async (courseId: string, limit?: number) => {
        const params = new URLSearchParams({ courseId });
        if (limit) params.append('limit', limit.toString());
        
        const response = await fetch(`${FUNCTIONS_URL}/get-course-questions?${params}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    getQuestionCount: async (courseId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/get-course-question-count?courseId=${courseId}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },
};

// Courses APIs
export const coursesAPI = {
    getAll: async (filters?: { isActive?: boolean; level?: string; department?: string; semester?: number }) => {
        try {
            const params = new URLSearchParams();
            if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
            if (filters?.level) params.append('level', filters.level);
            if (filters?.department) params.append('department', filters.department);
            if (filters?.semester) params.append('semester', filters.semester.toString());
            
            const response = await fetch(`${FUNCTIONS_URL}/get-courses?${params}`, {
                headers: await getAuthHeaders(),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('get-courses error:', response.status, errorText);
                throw new Error(`Failed to fetch courses: ${response.status}`);
            }
            
            return response.json();
        } catch (error) {
            console.error('coursesAPI.getAll error:', error);
            throw error;
        }
    },

    getById: async (courseId: string) => {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();
        
        if (error) throw error;
        return data;
    },
};

// Calendar APIs
export const calendarAPI = {
    getEvents: async (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        const response = await fetch(`${FUNCTIONS_URL}/get-calendar-events?${params}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    createEvent: async (eventData: { title: string; description?: string; date: string; type: string; color?: string }) => {
        const response = await fetch(`${FUNCTIONS_URL}/create-calendar-event`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(eventData),
        });
        return response.json();
    },

    deleteEvent: async (eventId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/delete-calendar-event`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ eventId }),
        });
        return response.json();
    },
};

// CBT Test Submission API
export const cbtAPI = {
    submitTest: async (submissionData: { 
        courseId: string; 
        score: number; 
        percentage: number; 
        timeTaken: number; 
        answers: any;
        totalQuestions: number;
        correctAnswers: number;
    }) => {
        const response = await fetch(`${FUNCTIONS_URL}/submit-cbt-test`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(submissionData),
        });
        return response.json();
    },
};

// Notifications APIs
export const notificationsAPI = {
    getAll: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/get-notifications`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    markAsRead: async (notificationId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/mark-notification-read`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ notificationId }),
        });
        return response.json();
    },

    markAllAsRead: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/mark-all-notifications-read`, {
            method: 'POST',
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    delete: async (notificationId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/delete-notification`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ notificationId }),
        });
        return response.json();
    },
};

// Schedule APIs
export const scheduleAPI = {
    getAll: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/get-schedule`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    createItem: async (type: 'class' | 'assignment' | 'study_session', itemData: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/create-schedule-item`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ type, ...itemData }),
        });
        return response.json();
    },
};

// User APIs
export const userAPI = {
    getStats: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/get-user-stats`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    updateProfile: async (updates: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/update-user-profile`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(updates),
        });
        return response.json();
    },

    getProfile: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) throw error;
        return data;
    },
};

// Admin APIs
export const adminAPI = {
    getDashboard: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/get-admin-dashboard`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    getAllStudents: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'student')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    getAllTests: async () => {
        const { data, error } = await supabase
            .from('tests')
            .select(`
                *,
                courses(title, code)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    getAllSubmissions: async () => {
        const { data, error } = await supabase
            .from('test_submissions')
            .select(`
                *,
                profiles(full_name, email),
                tests(title, course_code)
            `)
            .order('submitted_at', { ascending: false });

        if (error) throw error;
        return data;
    },
};

// Dashboard Stats API
export const dashboardAPI = {
    getStats: async (userId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/get-user-stats?user_id=${userId}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    getPerformanceChart: async (userId: string, period: string = '7') => {
        const response = await fetch(`${FUNCTIONS_URL}/get-performance-chart?user_id=${userId}&period=${period}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },
};

// Settings API
export const settingsAPI = {
    // Get all user settings
    getSettings: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/get-user-settings`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Update notification or preference settings
    updateSettings: async (settingType: 'notifications' | 'preferences', settings: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/update-user-settings`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ settingType, settings }),
        });
        return response.json();
    },

    // Update user profile
    updateProfile: async (profileData: { fullName: string; phone: string; department: string; level: string }) => {
        const response = await fetch(`${FUNCTIONS_URL}/update-profile`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(profileData),
        });
        return response.json();
    },

    // Update password (uses Supabase auth directly)
    updatePassword: async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;
        return { success: true };
    },
};

// Billing API
export const billingAPI = {
    // Get user subscription details
    getSubscription: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/get-user-subscription`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Create checkout session
    createCheckoutSession: async (tier: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/create-checkout-session`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({
                tier,
                successUrl: `${window.location.origin}/billing?success=true`,
                cancelUrl: `${window.location.origin}/billing?cancelled=true`,
            }),
        });
        return response.json();
    },

    // Manage subscription (cancel, resume, update_payment)
    manageSubscription: async (action: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/manage-subscription`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ action }),
        });
        return response.json();
    },
};

// Notes API
export const notesAPI = {
    // Get all notes for a summary
    getNotes: async (summaryId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/manage-notes?summary_id=${summaryId}&all=true`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Get note for a summary
    getNote: async (summaryId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/manage-notes?summary_id=${summaryId}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Save or update note
    saveNote: async (summaryId: string, content: string, highlights: any[], formatting: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/manage-notes`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify({
                summary_id: summaryId,
                content,
                highlights,
                formatting,
            }),
        });
        return response.json();
    },

    // Delete note by ID
    deleteNote: async (noteId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/manage-notes?note_id=${noteId}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });
        return response.json();
    },
};

// Admin API - Extended
export const adminExtendedAPI = {
    // Students Management
    getStudents: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-get-students`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    getStudentDetails: async (studentId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-get-students?student_id=${studentId}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Analytics
    getAnalytics: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-analytics`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Top Performers
    getTopPerformers: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-top-performers`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Admin Notifications
    getAdminNotifications: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-notifications`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    markNotificationRead: async (notificationId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-notifications?notification_id=${notificationId}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    deleteAdminNotification: async (notificationId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-notifications?notification_id=${notificationId}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Support Messages
    getMessages: async () => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-messages`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    getMessage: async (messageId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-messages?message_id=${messageId}`, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    updateMessageStatus: async (messageId: string, status: string, reply?: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-messages?message_id=${messageId}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
            body: JSON.stringify({ status, reply_message: reply }),
        });
        return response.json();
    },

    deleteMessage: async (messageId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-messages?message_id=${messageId}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    // Announcements
    getAnnouncements: async (target?: string) => {
        const url = target 
            ? `${FUNCTIONS_URL}/admin-manage-announcements?target=${target}`
            : `${FUNCTIONS_URL}/admin-manage-announcements`;
        const response = await fetch(url, {
            headers: await getAuthHeaders(),
        });
        return response.json();
    },

    createAnnouncement: async (data: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-announcements`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return response.json();
    },

    updateAnnouncement: async (announcementId: string, data: any) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-announcements?announcement_id=${announcementId}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return response.json();
    },

    deleteAnnouncement: async (announcementId: string) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-announcements?announcement_id=${announcementId}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });
        return response.json();
    },
};

// Support/Contact API (for users)
export const supportAPI = {
    sendMessage: async (data: { name: string; email: string; subject: string; message: string; priority?: string }) => {
        const response = await fetch(`${FUNCTIONS_URL}/admin-manage-messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
};

export default {
    auth: authAPI,
    summaries: summariesAPI,
    tests: testsAPI,
    courseQuestions: courseQuestionsAPI,
    courses: coursesAPI,
    calendar: calendarAPI,
    cbt: cbtAPI,
    notifications: notificationsAPI,
    schedule: scheduleAPI,
    user: userAPI,
    admin: adminAPI,
    adminExtended: adminExtendedAPI,
    dashboard: dashboardAPI,
    settings: settingsAPI,
    billing: billingAPI,
    notes: notesAPI,
    support: supportAPI,
};
