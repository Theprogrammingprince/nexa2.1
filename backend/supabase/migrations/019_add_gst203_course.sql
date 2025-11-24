-- Add GST203 course to the courses table
-- This migration should be run BEFORE populate_gst203.sql

INSERT INTO courses (code, title, description, level,credit,active, created_at)
VALUES (
  'MAC212',
  ' Media and Society',
  'Media and Society is a course that delves into the study of how media shape society by examining the various forms of media and how they are used to convey messages and influence public opinion. The course focuses on critical thinking, analytical skills, and the development of a more sophisticated understanding of the complex interactions between media and society.',
  200,
  2,
  TRUE,
  NOW()
)
ON CONFLICT (code) DO NOTHING;

-- Add a comment
COMMENT ON TABLE courses IS 'Stores course information for the learning platform';
