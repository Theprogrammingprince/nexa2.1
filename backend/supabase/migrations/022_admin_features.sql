-- =====================================================
-- ADMIN FEATURES MIGRATION
-- Support messages, announcements, and admin notifications
-- =====================================================

-- 1. SUPPORT MESSAGES TABLE
-- Messages sent from contact form to admin
CREATE TABLE IF NOT EXISTS support_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    replied_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    replied_at TIMESTAMPTZ,
    reply_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ANNOUNCEMENTS TABLE
-- Announcements created by admin for users and landing page
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'general' CHECK (type IN ('general', 'maintenance', 'feature', 'event', 'urgent')),
    target TEXT DEFAULT 'users' CHECK (target IN ('users', 'landing', 'both')),
    image_url TEXT,
    link_url TEXT,
    link_text TEXT,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
    active BOOLEAN DEFAULT true,
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ADMIN NOTIFICATIONS TABLE
-- Notifications specifically for admin users
CREATE TABLE IF NOT EXISTS admin_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('new_user', 'new_message', 'new_test', 'system', 'subscription')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    reference_id UUID,
    reference_type TEXT,
    read BOOLEAN DEFAULT false,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER ACTIVITY LOG TABLE
-- Track user activities for analytics
CREATE TABLE IF NOT EXISTS user_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL CHECK (activity_type IN ('login', 'logout', 'test_taken', 'summary_viewed', 'note_created', 'subscription_change')),
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_support_messages_status ON support_messages(status);
CREATE INDEX idx_support_messages_created_at ON support_messages(created_at DESC);
CREATE INDEX idx_support_messages_user_id ON support_messages(user_id);

CREATE INDEX idx_announcements_active ON announcements(active);
CREATE INDEX idx_announcements_target ON announcements(target);
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);

CREATE INDEX idx_admin_notifications_admin_id ON admin_notifications(admin_id);
CREATE INDEX idx_admin_notifications_read ON admin_notifications(read);
CREATE INDEX idx_admin_notifications_created_at ON admin_notifications(created_at DESC);

CREATE INDEX idx_user_activity_log_user_id ON user_activity_log(user_id);
CREATE INDEX idx_user_activity_log_type ON user_activity_log(activity_type);
CREATE INDEX idx_user_activity_log_created_at ON user_activity_log(created_at DESC);

-- Enable RLS
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for support_messages
CREATE POLICY "Admins can view all support messages"
    ON support_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Anyone can create support messages"
    ON support_messages FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can update support messages"
    ON support_messages FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- RLS Policies for announcements
CREATE POLICY "Everyone can view active announcements"
    ON announcements FOR SELECT
    USING (active = true);

CREATE POLICY "Admins can manage announcements"
    ON announcements FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- RLS Policies for admin_notifications
CREATE POLICY "Admins can view their own notifications"
    ON admin_notifications FOR SELECT
    USING (admin_id = auth.uid());

CREATE POLICY "System can create admin notifications"
    ON admin_notifications FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can update their own notifications"
    ON admin_notifications FOR UPDATE
    USING (admin_id = auth.uid());

-- RLS Policies for user_activity_log
CREATE POLICY "Admins can view all activity logs"
    ON user_activity_log FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "System can create activity logs"
    ON user_activity_log FOR INSERT
    WITH CHECK (true);

-- Add updated_at triggers
CREATE TRIGGER update_support_messages_updated_at
    BEFORE UPDATE ON support_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to notify admins of new user registration
CREATE OR REPLACE FUNCTION notify_admins_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert notification for all admin users
    INSERT INTO admin_notifications (admin_id, type, title, message, reference_id, reference_type, priority)
    SELECT 
        id,
        'new_user',
        'New User Registered',
        'A new user ' || NEW.full_name || ' (' || NEW.email || ') has registered on the platform.',
        NEW.id,
        'user',
        'normal'
    FROM profiles
    WHERE role = 'admin';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to notify admins when new user registers
CREATE TRIGGER trigger_notify_admins_new_user
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION notify_admins_new_user();

-- Function to notify admins of new support message
CREATE OR REPLACE FUNCTION notify_admins_new_message()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert notification for all admin users
    INSERT INTO admin_notifications (admin_id, type, title, message, reference_id, reference_type, priority)
    SELECT 
        id,
        'new_message',
        'New Support Message',
        'New message from ' || NEW.name || ' - Subject: ' || NEW.subject,
        NEW.id,
        'support_message',
        CASE 
            WHEN NEW.priority = 'urgent' THEN 'urgent'
            WHEN NEW.priority = 'high' THEN 'high'
            ELSE 'normal'
        END
    FROM profiles
    WHERE role = 'admin';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to notify admins when new support message is created
CREATE TRIGGER trigger_notify_admins_new_message
    AFTER INSERT ON support_messages
    FOR EACH ROW
    EXECUTE FUNCTION notify_admins_new_message();

-- Function to create notification when announcement is published
CREATE OR REPLACE FUNCTION notify_users_announcement()
RETURNS TRIGGER AS $$
BEGIN
    -- Only notify if announcement is for users and is active
    IF NEW.active = true AND (NEW.target = 'users' OR NEW.target = 'both') THEN
        -- Insert notification for all users
        INSERT INTO notifications (user_id, type, title, message, priority)
        SELECT 
            id,
            'announcement',
            NEW.title,
            LEFT(NEW.content, 200) || CASE WHEN LENGTH(NEW.content) > 200 THEN '...' ELSE '' END,
            CASE 
                WHEN NEW.priority = 'high' THEN 'high'
                ELSE 'normal'
            END
        FROM profiles
        WHERE role = 'student';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to notify users when new announcement is created
CREATE TRIGGER trigger_notify_users_announcement
    AFTER INSERT ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION notify_users_announcement();
