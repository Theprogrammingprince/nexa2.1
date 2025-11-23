import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import supabase from '../supabaseClient';
import type { User } from '@supabase/supabase-js';
import { dataCache, CACHE_KEYS, CACHE_EXPIRY } from '../services/dataCache';
import { dashboardAPI, billingAPI, summariesAPI, coursesAPI } from '../services/api';

interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: 'student' | 'admin';
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
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string, fullName: string) => Promise<any>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session and validate it
        const initAuth = async () => {
            try {
                // First try to get user (validates token)
                const { data: { user }, error } = await supabase.auth.getUser();
                
                if (error || !user) {
                    // Token invalid, try to refresh
                    const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
                    
                    if (refreshError || !session?.user) {
                        // No valid session
                        setUser(null);
                        setLoading(false);
                        return;
                    }
                    
                    setUser(session.user);
                    fetchProfile(session.user.id);
                } else {
                    // Valid user
                    setUser(user);
                    fetchProfile(user.id);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                setUser(null);
                setLoading(false);
            }
        };
        
        initAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                // If profile doesn't exist, create it
                if (error.code === 'PGRST116') {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) {
                        const { data: newProfile, error: insertError } = await supabase
                            .from('profiles')
                            .insert({
                                id: user.id,
                                email: user.email || '',
                                full_name: user.user_metadata?.fullName || user.email?.split('@')[0] || 'User',
                                role: 'student',
                            })
                            .select()
                            .single();
                        
                        if (!insertError && newProfile) {
                            setProfile(newProfile);
                            
                            // Create welcome notification for existing user
                            await supabase.from('notifications').insert({
                                user_id: user.id,
                                type: 'announcement',
                                title: 'Welcome to NEXA! 🎉',
                                message: `Hi! Welcome to NOUN Exam Experience Assistant. We're excited to help you excel in your studies.`,
                                priority: 'high',
                                read: false,
                            });
                        }
                    }
                } else {
                    throw error;
                }
            } else {
                setProfile(data);
                // Start prefetching user data in background
                prefetchUserData(userId);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Prefetch commonly used data after login
    const prefetchUserData = async (userId: string) => {
        // Prefetch dashboard stats
        dataCache.prefetch(
            CACHE_KEYS.USER_STATS(userId),
            () => dashboardAPI.getStats(userId),
            CACHE_EXPIRY.MEDIUM
        );

        // Prefetch summaries
        dataCache.prefetch(
            CACHE_KEYS.SUMMARIES,
            () => summariesAPI.getAll(),
            CACHE_EXPIRY.LONG
        );

        // Prefetch subscription data
        dataCache.prefetch(
            CACHE_KEYS.SUBSCRIPTION(userId),
            () => billingAPI.getSubscription(),
            CACHE_EXPIRY.MEDIUM
        );

        // Prefetch courses
        dataCache.prefetch(
            CACHE_KEYS.COURSES,
            () => coursesAPI.getAll(),
            CACHE_EXPIRY.VERY_LONG
        );
    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        // Sign up with autoConfirm disabled (requires Supabase dashboard config)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullName,
                    role: 'student',
                },
            },
        });

        if (error) throw error;
        
        // Create profile in profiles table
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email: data.user.email,
                    full_name: fullName,
                    role: 'student',
                });
            
            if (profileError) {
                console.error('Error creating profile:', profileError);
                // Don't throw error here as auth user is already created
            }
            
            // Create welcome notification with instructions
            await supabase
                .from('notifications')
                .insert({
                    user_id: data.user.id,
                    type: 'announcement',
                    title: '🎉 Welcome to NEXA!',
                    message: `Hi ${fullName}! Welcome to NOUN Exam Experience Assistant (NEXA). Here's how to get started:\n\n📚 **Summaries**: Browse AI-generated course summaries to quickly grasp key concepts.\n\n📝 **Practice Tests**: Take CBT-style tests to prepare for exams. Questions are shuffled each time!\n\n📅 **Schedule**: Plan your study sessions and track your progress.\n\n📊 **Dashboard**: Monitor your performance and see your improvement over time.\n\nGood luck with your studies! 🚀`,
                    read: false,
                });
        }
        
        return data;
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    const isAdmin = profile?.role === 'admin';

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                signIn,
                signUp,
                signOut,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
