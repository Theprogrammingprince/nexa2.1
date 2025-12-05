-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(255) NOT NULL,
    read_time VARCHAR(50),
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    featured BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for faster queries
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published posts
CREATE POLICY "Anyone can view published blog posts"
    ON blog_posts
    FOR SELECT
    TO anon, authenticated
    USING (status = 'published');

-- Policy: Authenticated users can view all posts (admins will be checked in app logic)
CREATE POLICY "Authenticated users can view all blog posts"
    ON blog_posts
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Authenticated users can insert posts (admins will be checked in app logic)
CREATE POLICY "Authenticated users can create blog posts"
    ON blog_posts
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Authenticated users can update posts (admins will be checked in app logic)
CREATE POLICY "Authenticated users can update blog posts"
    ON blog_posts
    FOR UPDATE
    TO authenticated
    USING (true);

-- Policy: Authenticated users can delete posts (admins will be checked in app logic)
CREATE POLICY "Authenticated users can delete blog posts"
    ON blog_posts
    FOR DELETE
    TO authenticated
    USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, category, author, read_time, status, featured, published_at) VALUES
(
    '10 Proven Strategies to Ace Your NOUN Exams',
    '10-proven-strategies-to-ace-your-noun-exams',
    'Discover the most effective study techniques used by top-performing students to excel in their NOUN examinations.',
    '<h2>Introduction</h2><p>Preparing for NOUN exams requires dedication, strategy, and the right approach. Here are 10 proven strategies that will help you excel.</p><h2>1. Start Early</h2><p>Begin your preparation well in advance to avoid last-minute cramming.</p><h2>2. Create a Study Schedule</h2><p>Organize your time effectively with a structured study plan.</p><h2>3. Use Active Recall</h2><p>Test yourself regularly instead of passive reading.</p><h2>4. Practice with Past Questions</h2><p>Familiarize yourself with exam patterns and question types.</p><h2>5. Join Study Groups</h2><p>Collaborate with peers for better understanding.</p><h2>6. Take Regular Breaks</h2><p>Avoid burnout by incorporating rest periods.</p><h2>7. Stay Healthy</h2><p>Maintain good sleep, nutrition, and exercise habits.</p><h2>8. Use NEXA Platform</h2><p>Leverage our CBT practice tests and course summaries.</p><h2>9. Review Regularly</h2><p>Consistent revision is key to retention.</p><h2>10. Stay Positive</h2><p>Maintain a confident mindset throughout your preparation.</p>',
    '/img (3).jpg',
    'Study Tips',
    'Dr. Sarah Johnson',
    '8 min read',
    'published',
    true,
    NOW()
),
(
    'How to Create an Effective Study Schedule',
    'how-to-create-an-effective-study-schedule',
    'Learn how to balance your coursework, practice tests, and personal life with a well-structured study plan.',
    '<h2>Why You Need a Study Schedule</h2><p>A well-planned study schedule helps you manage time effectively and reduces stress.</p><h2>Steps to Create Your Schedule</h2><p>1. Assess your available time<br>2. Prioritize subjects based on difficulty<br>3. Allocate specific time blocks<br>4. Include breaks and leisure time<br>5. Be flexible and adjust as needed</p><h2>Tips for Success</h2><p>Use digital tools, set realistic goals, and stick to your plan consistently.</p>',
    '/img (4).jpg',
    'Productivity',
    'Michael Chen',
    '6 min read',
    'published',
    false,
    NOW() - INTERVAL '3 days'
),
(
    'Understanding CBT: Tips for Computer-Based Testing',
    'understanding-cbt-tips-for-computer-based-testing',
    'Master the art of computer-based testing with these essential tips and strategies.',
    '<h2>What is CBT?</h2><p>Computer-Based Testing (CBT) is a modern examination method that uses computers to deliver and score tests.</p><h2>Advantages of CBT</h2><p>Instant results, reduced errors, and flexible scheduling.</p><h2>Tips for CBT Success</h2><p>1. Practice with online tests<br>2. Familiarize yourself with the interface<br>3. Manage your time wisely<br>4. Read questions carefully<br>5. Use the review feature</p><h2>Common Mistakes to Avoid</h2><p>Don''t rush, avoid technical issues by arriving early, and stay calm.</p>',
    '/img (3).jpg',
    'CBT Tips',
    'Prof. Ada Okafor',
    '7 min read',
    'published',
    false,
    NOW() - INTERVAL '5 days'
),
(
    'Overcoming Exam Anxiety: A Student''s Guide',
    'overcoming-exam-anxiety-a-students-guide',
    'Practical techniques to manage stress and perform your best during examinations.',
    '<h2>Understanding Exam Anxiety</h2><p>Exam anxiety is a common experience that can affect performance if not managed properly.</p><h2>Symptoms of Exam Anxiety</h2><p>Racing heart, sweating, negative thoughts, and difficulty concentrating.</p><h2>Coping Strategies</h2><p>1. Deep breathing exercises<br>2. Positive visualization<br>3. Adequate preparation<br>4. Healthy lifestyle<br>5. Seek support when needed</p><h2>During the Exam</h2><p>Stay focused, read carefully, and remember your preparation.</p>',
    '/img (4).jpg',
    'Mental Health',
    'Dr. James Williams',
    '5 min read',
    'published',
    false,
    NOW() - INTERVAL '7 days'
),
(
    'The Power of Practice Tests in Exam Preparation',
    'the-power-of-practice-tests-in-exam-preparation',
    'Why regular practice tests are crucial for exam success and how to make the most of them.',
    '<h2>Why Practice Tests Matter</h2><p>Practice tests help identify weak areas, build confidence, and improve time management.</p><h2>Benefits of Regular Practice</h2><p>1. Familiarization with exam format<br>2. Improved recall<br>3. Better time management<br>4. Reduced anxiety<br>5. Performance tracking</p><h2>How to Use Practice Tests Effectively</h2><p>Take them seriously, review mistakes, track progress, and simulate exam conditions.</p><h2>NEXA''s CBT Practice Platform</h2><p>Our platform offers unlimited practice tests with instant feedback and detailed analytics.</p>',
    '/img (3).jpg',
    'Study Tips',
    'Emily Rodriguez',
    '6 min read',
    'published',
    false,
    NOW() - INTERVAL '10 days'
),
(
    'Time Management Strategies for Distance Learning',
    'time-management-strategies-for-distance-learning',
    'Effective time management techniques specifically designed for NOUN students.',
    '<h2>Challenges of Distance Learning</h2><p>Distance learning requires self-discipline and effective time management.</p><h2>Key Strategies</h2><p>1. Set clear goals<br>2. Create a dedicated study space<br>3. Use time-blocking technique<br>4. Eliminate distractions<br>5. Stay connected with peers</p><h2>Tools and Resources</h2><p>Calendar apps, task managers, and study timers can help you stay organized.</p><h2>Maintaining Work-Life Balance</h2><p>Remember to schedule time for family, hobbies, and self-care.</p>',
    '/img (4).jpg',
    'Productivity',
    'David Okonkwo',
    '7 min read',
    'published',
    false,
    NOW() - INTERVAL '12 days'
),
(
    'How to Use Course Summaries Effectively',
    'how-to-use-course-summaries-effectively',
    'Maximize your learning with strategic use of course summaries and study materials.',
    '<h2>What Are Course Summaries?</h2><p>Course summaries are condensed versions of course materials that highlight key concepts.</p><h2>Benefits of Using Summaries</h2><p>1. Quick revision<br>2. Better understanding<br>3. Time-saving<br>4. Improved retention<br>5. Exam preparation</p><h2>How to Create Effective Summaries</h2><p>Focus on main ideas, use your own words, include examples, and organize logically.</p><h2>NEXA''s AI-Powered Summaries</h2><p>Our platform generates comprehensive course summaries using advanced AI technology.</p>',
    '/img (3).jpg',
    'Study Tips',
    'Dr. Grace Adeyemi',
    '5 min read',
    'published',
    false,
    NOW() - INTERVAL '14 days'
);
