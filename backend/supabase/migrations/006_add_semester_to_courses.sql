-- Add semester column to courses table for better organization
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS semester INTEGER;

-- Add a check constraint to ensure semester is 1 or 2 (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'courses_semester_check'
    ) THEN
        ALTER TABLE courses 
        ADD CONSTRAINT courses_semester_check 
        CHECK (semester IN (1, 2) OR semester IS NULL);
    END IF;
END $$;

-- Update existing courses with semester information
UPDATE courses SET semester = 1 WHERE code IN (
  'CIT143', 'CHM101', 'CHM103', 'CHM191', 'BIO101', 'BIO191', 
  'GST103', 'MTH105', 'MTH101', 'MTH103', 'PHY191', 'PHY101', 'PHY103'
);

UPDATE courses SET semester = 2 WHERE code IN (
  'CIT108', 'CIT104', 'CIT102', 'CHM192', 'CHM102', 'BIO192', 
  'BIO102', 'ESM112', 'ESM102', 'ESM104', 'ESM106', 'PHY192',
  'MTH106', 'STT102', 'MTH102', 'PHY102'
);

-- Update 200 Level courses with semester 1
UPDATE courses SET semester = 1 WHERE code IN (
  'BIO230', 'CIT210', 'CIT211', 'CIT237', 'CIT215', 'CIT213',
  'DAM207', 'DAM205', 'ESM229', 'ESM211', 'ESM221', 'ESM231',
  'MTH211', 'STT211', 'STT205', 'MTH281', 'MTH213', 'PHY205',
  'MTH203', 'BIO207', 'BIO205', 'BIO203', 'GST201', 'BIO217',
  'BIO215', 'BIO213', 'CHM201', 'PHY201', 'CHM205', 'PHY203',
  'PHY207', 'PHY251', 'PHY291', 'BIO259', 'BIO211'
);

-- Update 200 Level courses with semester 2
UPDATE courses SET semester = 2 WHERE code IN (
  'BIO202', 'CIT217', 'CIT346', 'CIT202', 'DAM212', 'CIT204',
  'CIT208', 'CIT212', 'CIT236', 'ESM004', 'ESM238', 'ESM236',
  'ESM234', 'ESM222', 'ESM212', 'ESM006', 'MTH252', 'STT206',
  'MTH253', 'MTH151', 'MTH210', 'BIO206', 'BIO204', 'CHM303',
  'BIO218', 'BIO219', 'BIO214', 'BIO212', 'CHM04', 'PHY202',
  'CHM252', 'PHY204', 'BIO210', 'BIO208', 'PHY206'
);

-- Create an index on semester for faster queries
CREATE INDEX IF NOT EXISTS idx_courses_semester ON courses(semester);

-- Create an index on department for faster filtering
CREATE INDEX IF NOT EXISTS idx_courses_department ON courses(department);

-- Create an index on level for faster filtering
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);

-- Add comment
COMMENT ON COLUMN courses.semester IS 'Academic semester: 1 for first semester, 2 for second semester';
