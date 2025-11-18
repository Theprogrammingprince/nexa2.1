-- Populate courses table with initial course data
-- Level 100 courses for various departments

INSERT INTO courses (code, title, credits, department, level, is_active) VALUES
-- Semester 1 Courses
('CIT143', 'Introductory to Data Organisation A', 2, 'Computer Science', '100 Level', true),
('CHM101', 'Introductory Inorganic Chemistry I', 2, 'Chemistry', '100 Level', true),
('CHM103', 'Introduction to Physical Chemistry', 2, 'Chemistry', '100 Level', true),
('CHM191', 'Introductory Practical Chemistry I', 1, 'Chemistry', '100 Level', true),
('BIO101', 'General Biology I', 2, 'Biological Science', '100 Level', true),
('BIO191', 'General Biology Practical I', 1, 'Biological Science', '100 Level', true),
('GST103', 'Computer Fundamentals', 2, 'Computer Science', '100 Level', true),
('MTH105', 'Mathematics For Management Sciences', 3, 'Mathematics', '100 Level', true),
('MTH101', 'Elementary Mathematics I', 3, 'Mathematics', '100 Level', true),
('MTH103', 'Elementary Mathematics III', 3, 'Mathematics', '100 Level', true),
('PHY191', 'Introductory Practical Physics I', 1, 'Physics', '100 Level', true),
('PHY101', 'Elementary Mechanics Heat and Properties of Matter', 3, 'Physics', '100 Level', true),
('PHY103', 'Geometric and Wave Optics', 2, 'Physics', '100 Level', true),

-- Semester 2 Courses
('CIT108', 'Problem Solving Algorithm', 2, 'Computer Science', '100 Level', true),
('CIT104', 'Introduction to Computer Science', 2, 'Computer Science', '100 Level', true),
('CIT102', 'Software Application Skills', 2, 'Computer Science', '100 Level', true),
('CHM192', 'Introductory Practical Chemistry II', 1, 'Chemistry', '100 Level', true),
('CHM102', 'Introductory Organic Chemistry I', 2, 'Chemistry', '100 Level', true),
('BIO192', 'General Biology Practical II', 1, 'Biological Science', '100 Level', true),
('BIO102', 'General Biology II', 2, 'Biological Science', '100 Level', true),
('ESM112', 'Introductory Ecology', 2, 'Environmental Science', '100 Level', true),
('ESM102', 'The Nigerian Environment', 2, 'Environmental Science', '100 Level', true),
('ESM104', 'Introduction to Environmental Science', 2, 'Environmental Science', '100 Level', true),
('ESM106', 'Environmental Resource Management', 2, 'Environmental Science', '100 Level', true),
('PHY192', 'Introductory Practical Physics II', 1, 'Physics', '100 Level', true),
('MTH106', 'Mathematics For Management Sciences', 3, 'Mathematics', '100 Level', true),
('STT102', 'Introductory Statistics', 2, 'Mathematics', '100 Level', true),
('MTH102', 'Elementary Mathematics II', 3, 'Mathematics', '100 Level', true),
('PHY102', 'Electricity Magnetism and Modern Ph', 3, 'Physics', '100 Level', true),

-- 200 Level Courses - Semester 1
('BIO230', 'Microbial Ecology', 3, 'Biological Science', '200 Level', true),
('CIT210', 'Computer Hardware', 3, 'Computer Science', '200 Level', true),
('CIT211', 'Introduction to Operating Systems', 3, 'Computer Science', '200 Level', true),
('CIT237', 'Programming & Algorithms', 3, 'Computer Science', '200 Level', true),
('CIT215', 'Introduction to Programming Language', 3, 'Computer Science', '200 Level', true),
('CIT213', 'Elementary Data Processing', 2, 'Computer Science', '200 Level', true),
('DAM207', 'Indexing & Classification', 2, 'Computer Science', '200 Level', true),
('DAM205', 'Data Collection Methodology', 2, 'Computer Science', '200 Level', true),
('ESM229', 'Map Analysis', 2, 'Environmental Science', '200 Level', true),
('ESM211', 'Global Environmental Issues', 2, 'Environmental Science', '200 Level', true),
('ESM221', 'Ecotourism', 2, 'Environmental Science', '200 Level', true),
('ESM231', 'Introductory Toxicology', 2, 'Environmental Science', '200 Level', true),
('MTH211', 'Abstract Algebra I', 3, 'Mathematics', '200 Level', true),
('STT211', 'Probability Distribution I', 2, 'Mathematics', '200 Level', true),
('STT205', 'Statistics for Management Sciences', 3, 'Mathematics', '200 Level', true),
('MTH281', 'Mathematical Method I', 2, 'Mathematics', '200 Level', true),
('MTH213', 'Mechanics', 3, 'Mathematics', '200 Level', true),
('PHY205', 'Introductory to Real Analysis I', 3, 'Mathematics', '200 Level', true),
('MTH203', 'Numerical Analysis I', 3, 'Mathematics', '200 Level', true),
('BIO207', 'Lower In Vertebrates', 2, 'Biological Science', '200 Level', true),
('BIO205', 'Introductory Developmental Cell Bio', 2, 'Biological Science', '200 Level', true),
('BIO203', 'General Physiology 1', 2, 'Biological Science', '200 Level', true),
('GST201', 'Statistics 1', 2, 'Biological Science', '200 Level', true),
('BIO217', 'General Microbiology', 3, 'Biological Science', '200 Level', true),
('BIO215', 'General Biochemistry Laboratory', 1, 'Biological Science', '200 Level', true),
('BIO213', 'Structure of Lower Acids and Protei', 2, 'Biological Science', '200 Level', true),
('CHM201', 'General Chemistry III- Inorganic', 1, 'Chemistry', '200 Level', true),
('PHY201', 'Classical Mechanics 1', 3, 'Physics', '200 Level', true),
('CHM205', 'Inorganic Chemistry II', 2, 'Chemistry', '200 Level', true),
('PHY203', 'Oscillations and Waves', 2, 'Physics', '200 Level', true),
('PHY207', 'Thermodynamics', 2, 'Physics', '200 Level', true),
('PHY251', 'Physics Laboratory 1', 2, 'Physics', '200 Level', true),
('PHY291', 'Physics Laboratory 1', 1, 'Physics', '200 Level', true),
('BIO259', 'Chordata', 3, 'Biological Science', '200 Level', true),
('BIO211', 'Phylum Invertebrates', 2, 'Biological Science', '200 Level', true),

-- 200 Level Courses - Semester 2
('BIO202', 'Introductory Ecology', 2, 'Biological Science', '200 Level', true),
('CIT217', 'Introduction to Geographical Program', 2, 'Computer Science', '200 Level', true),
('CIT346', 'Introduction to Computer Organized', 2, 'Computer Science', '200 Level', true),
('CIT202', 'Computer Laboratory 1', 2, 'Computer Science', '200 Level', true),
('DAM212', 'Database Laboratory', 2, 'Computer Science', '200 Level', true),
('CIT204', 'Computer Appreciation and Practice', 2, 'Computer Science', '200 Level', true),
('CIT208', 'Information Systems', 2, 'Computer Science', '200 Level', true),
('CIT212', 'Systems Analysis and Design', 3, 'Computer Science', '200 Level', true),
('CIT236', 'Analog and Digital Electronics', 3, 'Computer Science', '200 Level', true),
('ESM004', 'Environmental Hazards and Safety', 3, 'Environmental Science', '200 Level', true),
('ESM238', 'Air Photo Interpretation', 3, 'Environmental Science', '200 Level', true),
('ESM236', 'Environmental Microbiology', 2, 'Environmental Science', '200 Level', true),
('ESM234', 'Soil Resources', 2, 'Environmental Science', '200 Level', true),
('ESM222', 'Water Resource Evaluation', 2, 'Environmental Science', '200 Level', true),
('ESM212', 'Tropical Climatology', 2, 'Environmental Science', '200 Level', true),
('ESM006', 'Community Participation in Tourism', 2, 'Environmental Science', '200 Level', true),
('MTH252', 'Mathematical Methods II', 3, 'Mathematics', '200 Level', true),
('STT206', 'Statistics for Management Sciences', 3, 'Mathematics', '200 Level', true),
('MTH253', 'Elementary Differential Equation 1', 3, 'Mathematics', '200 Level', true),
('MTH151', 'Linear Algebra II', 2, 'Mathematics', '200 Level', true),
('MTH210', 'Introduction to Complex Analysis', 3, 'Mathematics', '200 Level', true),
('BIO206', 'Statistics For Agriculture and Nust', 2, 'Biological Science', '200 Level', true),
('BIO204', 'Biological Techniques', 2, 'Biological Science', '200 Level', true),
('CHM303', 'Analytical Chemistry 1', 2, 'Chemistry', '200 Level', true),
('BIO218', 'General Biochemistry Laboratory II', 1, 'Biological Science', '200 Level', true),
('BIO219', 'Chemistry of Carbohydrates Lipids', 2, 'Biological Science', '200 Level', true),
('BIO214', 'Structure and Functions of Major C', 2, 'Biological Science', '200 Level', true),
('BIO212', 'Helminthology', 2, 'Biological Science', '200 Level', true),
('CHM04', 'Structure andBonding', 2, 'Chemistry', '200 Level', true),
('PHY202', 'Modern Physics', 2, 'Physics', '200 Level', true),
('CHM252', 'Practical Chemistry IV- Physical', 1, 'Chemistry', '200 Level', true),
('PHY204', 'Electromagnetism', 2, 'Physics', '200 Level', true),
('BIO210', 'Seed Plants', 2, 'Biological Science', '200 Level', true),
('BIO208', 'Seedless Plants', 2, 'Biological Science', '200 Level', true),
('PHY206', 'Network Analysis and Devices', 3, 'Physics', '200 Level', true)
ON CONFLICT (code) DO NOTHING;

-- Create a view to easily query courses by semester (based on course metadata)
CREATE OR REPLACE VIEW courses_by_semester AS
SELECT 
  id,
  code,
  title,
  credits,
  department,
  level,
  is_active,
  CASE 
    -- Semester 1 courses (typically odd course codes or specific patterns)
    WHEN code IN ('CIT143', 'CHM101', 'CHM103', 'CHM191', 'BIO101', 'BIO191', 
                  'GST103', 'MTH105', 'MTH101', 'MTH103', 'PHY191', 'PHY101', 'PHY103') 
    THEN 1
    -- Semester 2 courses
    WHEN code IN ('CIT108', 'CIT104', 'CIT102', 'CHM192', 'CHM102', 'BIO192', 
                  'BIO102', 'ESM112', 'ESM102', 'ESM104', 'ESM106', 'PHY192',
                  'MTH106', 'STT102', 'MTH102', 'PHY102')
    THEN 2
    ELSE NULL
  END as semester,
  created_at,
  updated_at
FROM courses;

-- Add comment to explain the data structure
COMMENT ON TABLE courses IS 'Contains all NOUN courses with their details. Courses are organized by department and level.';
