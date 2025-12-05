DO $$
DECLARE
    -- The variable to hold the Course UUID for CIT217
    v_course_id UUID;
BEGIN
    -- 1. Find the UUID for the 'CIT217' course. This assumes the course exists in a 'courses' table.
    SELECT id INTO v_course_id FROM courses WHERE code = 'CIT217' LIMIT 1;
    
    -- Check if the course exists, if not raise an error
    IF v_course_id IS NULL THEN
        RAISE EXCEPTION 'Course CIT217 not found in courses table. Please ensure the course exists before running this migration.';
    END IF;

    -- Question 1 - Multiple choice (Answer: D) - From page 1 content
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A computer is not a useful device as an entity without a programming force driving its operations. This statement is:', 'multiple_choice', 'False', 'Ambiguous', 'Depends on the Hardware', 'True', 'D', 'A computer requires a programming force (software) to perform useful operations.');

    -- Question 2 - Fill in blank - From page 2 content
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A ___ is simply a device manipulated by a person.', 'fill_in_blank', 'Computer', 'Answer must be word-for-word: "Computer"');

    -- Question 3 - Multiple choice (Answer: A) - From page 1 content
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A complete computer system is fundamentally made up of which components?', 'multiple_choice', 'Hardware, Operating System Software, Application Software', 'Input devices, Processing unit, Storage', 'Mainframe, Minicomputer, Microcomputer', 'CPU, RAM, and Motherboard', 'A', 'The three primary components of a functional computer system are Hardware, OS, and Application Software.');

    -- Question 4 - Fill in blank - From page 2 content
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A complete functional computer system consists of the ___ and software.', 'fill_in_blank', 'Hardware', 'Answer must be word-for-word: "Hardware"');

    -- Question 5 - Fill in blank - From page 3 content
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A ___ is a series of step-by-step instructions that provides a solution to a particular problem and directs the computer on what to do exactly.', 'fill_in_blank', 'Program', 'Answer must be word-for-word: "Program"');

    -- Question 6 - Multiple choice (Answer: C) - From page 65 content
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What does the acronym COBOL stand for?', 'multiple_choice', 'Central Object-Based Operating Language', 'Communication and Business Oriented Linguistics', 'Common Business Oriented Language', 'Computerized Object Based On Logic', 'C', 'COBOL is an early high-level programming language primarily for business applications.');

    -- Question 7 - Fill in blank - From page 65 content
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The Bit is a ___', 'fill_in_blank', 'binary digit', 'Answer must be word-for-word: "binary digit"');

    -- Question 8 - Fill in blank - From page 65 content
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Typically, the programming language which is used to teach structured programming is the ___', 'fill_in_blank', 'FORTRAN', 'Answer must be word-for-word: "FORTRAN"');

    -- Question 9 - Fill in blank - From page 66 content
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A group of related records is termed as a ___', 'fill_in_blank', 'File', 'Answer must be word-for-word: "File"');

    -- Question 10 - Multiple choice (Answer: B) - From page 66 content
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The hierarchy of languages that is closer to the Machine Language is the ___ Language.', 'multiple_choice', 'High-Level', 'Assembly', 'Object-Oriented', 'Natural', 'B', 'Assembly language is a low-level language that is a thin layer above machine code.');

    -- Q11 (MC) - System Components
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The physical equipment that makes up a computer system is collectively known as the:', 'multiple_choice', 'Software', 'Middleware', 'Firmware', 'Hardware', 'D', 'Hardware refers to the tangible components of a computer system.');

    -- Q12 (MC) - Programming Force
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Without a programming force, a computer is considered an entity that is not:', 'multiple_choice', 'Cost-effective', 'Portable', 'Useful', 'Upgradeable', 'C', 'The text states a computer is not a useful device without the programming force (software).');

    -- Q13 (MC) - Software Categories
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which component of a complete computer system manages the hardware and provides common services for application software?', 'multiple_choice', 'Application Software', 'Utility Software', 'Operating System Software', 'Device Drivers', 'C', 'The Operating System Software manages hardware and resources.');

    -- Q14 (MC) - Program Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A series of step-by-step instructions that provides a solution to a particular problem is defined as a:', 'multiple_choice', 'Algorithm', 'Data Structure', 'Program', 'Protocol', 'C', 'A Program is the set of instructions to solve a problem.');

    -- Q15 (MC) - Programming Language Origin
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The C++ programming language was fundamentally derived from the original C language, which was published by B.W. Kernighan and D.M. Ritchie in which year?', 'multiple_choice', '1985', '1972', '1978', '1991', 'C', 'The original C language was published in 1978.');

    -- Q16 (MC) - HTML Syntax
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'HTML tags are surrounded by which type of brackets?', 'multiple_choice', 'Square brackets [ ]', 'Curly braces { }', 'Parentheses ( )', 'Angle brackets < >', 'D', 'HTML tags use angle brackets (e.g., <html>).');

    -- Q17 (MC) - HTML Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'HTML is categorized as which type of language?', 'multiple_choice', 'Procedural Language', 'Scripting Language', 'Markup Language', 'Query Language', 'C', 'HTML stands for HyperText Markup Language.');

    -- Q18 (MC) - HTML Tag Function
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which HTML tag is ordinarily used to display a picture in a webpage?', 'multiple_choice', '<pic>', '<image>', '<img>', '<src>', 'C', 'The <img> tag is used for embedding images.');

    -- Q19 (MC) - Data Unit
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the smallest unit of data in computing?', 'multiple_choice', 'Byte', 'Character', 'Bit', 'Nibble', 'C', 'The Bit is a binary digit, the smallest unit of data.');

    -- Q20 (MC) - Programming Paradigm
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'FORTRAN is often cited as the programming language used to teach the concepts of:', 'multiple_choice', 'Object-Oriented Programming', 'Functional Programming', 'Structured Programming', 'Event-Driven Programming', 'C', 'FORTRAN is typically associated with teaching structured programming principles.');

    -- Q21 (MC) - Data Representation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Digits, letters, and special symbols are commonly known as:', 'multiple_choice', 'Elements', 'Integers', 'Variables', 'Characters', 'D', 'Characters include letters, digits, and symbols.');

    -- Q22 (MC) - Encoding Standard
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'C++ typically uses which type of code for character representation?', 'multiple_choice', 'Unicode', 'EBCDIC', 'ASCII', 'ISO-8859', 'C', 'ASCII is a common character encoding standard for C++ and earlier systems.');

    -- Q23 (MC) - Programming Language Developer
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which major technology company developed the FORTRAN language?', 'multiple_choice', 'Microsoft', 'Google', 'IBM', 'Hewlett-Packard', 'C', 'FORTRAN was developed by IBM.');

    -- Q24 (MC) - Data Organization Unit (Mid-level)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Several related fields can be used to compose a:', 'multiple_choice', 'Database', 'Record', 'Table', 'Key', 'B', 'A record is a collection of related fields (data items).');

    -- Q25 (MC) - Machine Language Portability
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A particular machine language of a specific computer can be used on:', 'multiple_choice', 'All compatible operating systems', 'Any computer within the same architecture family', 'That computer only', 'Any computer with an interpreter', 'C', 'Machine language is specific and unique to the hardware of a single computer model or architecture.');

    -- Q26 (MC) - Software Function
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What constitutes the driving force behind the operations of the Computer System?', 'multiple_choice', 'Application programs', 'Utility programs', 'System programs', 'Device drivers', 'C', 'System programs (like the OS) are the driving force behind general system operations.');

    -- Q27 (MC) - Language Generation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Machine language is considered a:', 'multiple_choice', 'First Generation Language (1GL)', 'Second Generation Language (2GL)', 'Third Generation Language (3GL)', 'Fourth Generation Language (4GL)', 'A', 'Machine language is the most fundamental and is classified as 1GL.');

    -- Q28 (MC) - Language Abstraction
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language hierarchy requires the use of an assembler to convert its code into machine code?', 'multiple_choice', 'High-Level', 'Assembly', 'Natural', 'C++', 'B', 'Assembly language requires an assembler.');

    -- Q29 (MC) - Program Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A program is a series of step-by-step instructions that provides a ___ to a particular problem.', 'multiple_choice', 'Hypothesis', 'Solution', 'Framework', 'Analysis', 'B', 'The instructions provide a solution.');

    -- Q30 (MC) - HTML Tag Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which characteristic best describes the primary use of Application Software?', 'multiple_choice', 'Managing system resources', 'Performing specific tasks for the user', 'Booting the operating system', 'Translating machine code', 'B', 'Application Software is designed to perform specific user tasks (e.g., word processing, browsing).');

    -- Q31 (MC) - Hardware Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following is an example of hardware?', 'multiple_choice', 'Microsoft Word', 'The BIOS firmware', 'C++ compiler', 'RAM (Random Access Memory)', 'D', 'RAM is a physical, tangible component.');

    -- Q32 (MC) - Software Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What directs the computer on what to do exactly?', 'multiple_choice', 'The CPU architecture', 'The Monitor display', 'The Program (Software)', 'The Power Supply Unit', 'C', 'Software/Program provides the instructions for the computer.');

    -- Q33 (MC) - Language Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of these is NOT considered a high-level programming language in the context of general computing?', 'multiple_choice', 'Python', 'Java', 'Assembly', 'C#', 'C', 'Assembly language is a low-level language.');

    -- Q34 (MC) - Data Unit Size
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'How many bits typically make up a standard byte?', 'multiple_choice', '4', '8', '16', '32', 'B', 'A byte is generally composed of 8 bits.');

    -- Q35 (MC) - Encoding Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The ASCII code is primarily used to represent:', 'multiple_choice', 'Floating-point numbers', 'Binary machine instructions', 'Characters', 'Images', 'C', 'ASCII stands for American Standard Code for Information Interchange, used for character encoding.');

    -- Q36 (MC) - Business Language
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'COBOL was primarily designed for which type of application?', 'multiple_choice', 'Scientific Computing', 'System Programming', 'Business and Data Processing', 'Artificial Intelligence', 'C', 'The "Business Oriented" part of the name indicates its focus.');

    -- Q37 (MC) - HTML Component
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The content that appears between the < > symbols in HTML is referred to as a:', 'multiple_choice', 'Field', 'Attribute', 'Tag', 'Value', 'C', 'The name inside the brackets is the tag name.');

    -- Q38 (MC) - OS Role
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Operating System is a crucial link between the hardware and the:', 'multiple_choice', 'Internet connection', 'Application Software', 'Power supply', 'User interface', 'B', 'The OS provides the platform for Application Software to run.');

    -- Q39 (MC) - Data Hierarchy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In the data hierarchy, what is typically the level above a "File"?', 'multiple_choice', 'Record', 'Database', 'Field', 'Character', 'B', 'The typical hierarchy is: Bit -> Byte -> Field -> Record -> File -> Database.');

    -- Q40 (MC) - Language Similarity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language is known to have influenced the syntax and structure of C++?', 'multiple_choice', 'BASIC', 'FORTRAN', 'C', 'COBOL', 'C', 'C++ is a superset of C.');

    -- Q41 (MC) - System Requirement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the necessary component, alongside hardware, for a complete functional computer system?', 'multiple_choice', 'User manual', 'Software', 'Network cable', 'Printer', 'B', 'Hardware and Software together form a complete system.');

    -- Q42 (MC) - Instruction Role
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Instructions in a program are designed to direct the computer on:', 'multiple_choice', 'What to display only', 'How to generate power', 'What to do exactly', 'When to shut down', 'C', 'Instructions tell the computer exactly what operations to execute.');

    -- Q43 (MC) - Low-Level Code
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Code that is unique to a specific processor and not portable to other computer architectures is classified as:', 'multiple_choice', 'High-Level Code', 'Intermediate Code', 'Machine Language', 'Scripting Code', 'C', 'Machine Language is hardware-specific.');

    -- Q44 (MC) - Data Organization Unit (Smallest)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A character is a collection of:', 'multiple_choice', 'Files', 'Bits and Bytes', 'Records', 'Programs', 'B', 'A character is represented by a set of bits, often grouped as bytes.');

    -- Q45 (MC) - FORTRAN History
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'FORTRAN was primarily developed in the context of:', 'multiple_choice', 'Scientific and Numeric Computing', 'Web Development', 'Database Management', 'Game Development', 'A', 'FORTRAN (Formula Translation) was designed for science and engineering.');

    -- Q46 (MC) - Markup Language
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In the context of web development, HTML defines the ___ of a webpage.', 'multiple_choice', 'Styling', 'Behavior', 'Structure', 'Security', 'C', 'As a Markup Language, HTML defines the structural elements.');

    -- Q47 (MC) - Computer Manipulation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A computer is best described as a device that is ___ by a person.', 'multiple_choice', 'Manufactured', 'Manipulated', 'Stored', 'Designed', 'B', 'The definition states it is a device manipulated by a person.');

    -- Q48 (MC) - Operating System Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which term refers to the type of programs that manage and control the computer system as a whole?', 'multiple_choice', 'Application Programs', 'System Programs', 'Compiler Programs', 'User Programs', 'B', 'System Programs (OS, Utilities) manage the system.');

    -- Q49 (MC) - Programming Evolution
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The development of C++ from C represents a move towards which programming paradigm?', 'multiple_choice', 'Procedural', 'Assembly', 'Object-Oriented', 'Functional', 'C', 'C++ added object-oriented capabilities to C.');

    -- Q50 (MC) - Data Organization (Field)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In the data hierarchy, the smallest unit that carries meaningful information is often called a:', 'multiple_choice', 'Record', 'Field', 'File', 'Bit', 'B', 'A Field is an attribute or single item of information (e.g., Name).');

    -- Q51 (MC) - Binary Digit Value
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A binary digit can hold which two possible values?', 'multiple_choice', 'Alpha or Numeric', 'True or False', '0 or 1', 'Positive or Negative', 'C', 'Binary digits are 0 and 1.');

    -- Q52 (MC) - Low-Level Language Characteristic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is a significant disadvantage of using a Machine Language?', 'multiple_choice', 'Lack of speed', 'High cost', 'Non-Portability', 'Too much abstraction', 'C', 'Machine Language is specific to one computer architecture (non-portable).');

    -- Q53 (MC) - HTML Attribute
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which attribute of the <img> tag specifies the path to the image file?', 'multiple_choice', 'name', 'alt', 'href', 'src', 'D', 'The src (source) attribute provides the file path.');

    -- Q54 (MC) - Software Role
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The programming force is essential for a computer to perform its:', 'multiple_choice', 'Cooling functions', 'Operations', 'Physical assembly', 'Electrical conduction', 'B', 'Software drives the computer’s operations.');

    -- Q55 (MC) - Data Organization (Group of Records)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A set of related records is formally known as a:', 'multiple_choice', 'Field Group', 'File', 'Folder', 'Registry', 'B', 'A file is a collection of related records.');

    -- Q56 (MC) - Character Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which category encompasses both alphabetic and numeric symbols?', 'multiple_choice', 'Identifiers', 'Variables', 'Operators', 'Characters', 'D', 'Characters is the general term for all symbolic representations.');

    -- Q57 (MC) - Structured Programming
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Structured programming primarily emphasizes the use of:', 'multiple_choice', 'GOTO statements', 'Unrestricted branching', 'Sequential, selection, and repetition structures', 'Inheritance and polymorphism', 'C', 'Structured programming is based on three fundamental control structures.');

    -- Q58 (MC) - Language Level
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which programming language requires a compiler to translate its source code into machine code?', 'multiple_choice', 'Machine Language', 'Assembly Language', 'FORTRAN', 'Binary Code', 'C', 'FORTRAN is a high-level language requiring a compiler.');

    -- Q59 (MC) - C++ Predecessor
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The core procedural part of C++ is inherited directly from:', 'multiple_choice', 'Pascal', 'BASIC', 'C', 'Ada', 'C', 'C is the direct predecessor of C++.');

    -- Q60 (MC) - System Component Relationship
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The relationship between hardware and software is best described as:', 'multiple_choice', 'Sequential', 'Independent', 'Interdependent', 'Optional', 'C', 'They rely on each other to form a functional computer system.');

    -- Q61 (MC) - Data Storage Unit
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'When storing textual data using ASCII, one character is generally stored as one:', 'multiple_choice', 'Bit', 'Kilobyte', 'Byte', 'Field', 'C', 'ASCII typically uses 7 or 8 bits, which fits into one byte.');

    -- Q62 (MC) - Device Function
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The term "device" in the definition of a computer refers primarily to the:', 'multiple_choice', 'Software', 'Instructions', 'Physical machine (hardware)', 'Programming language', 'C', 'A device refers to the physical apparatus.');

    -- Q63 (MC) - Instruction Set
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A collection of programs written to solve various problems is known as:', 'multiple_choice', 'The operating system', 'Application software', 'Machine language', 'The firmware', 'B', 'Application software is a collection of programs for user tasks.');

    -- Q64 (MC) - HTML Bracket Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which symbol is used to close an HTML tag, such as in `</p>`?', 'multiple_choice', '#', '$', '/', '%', 'C', 'The forward slash (/) is used to indicate a closing tag.');

    -- Q65 (MC) - COBOL Usage
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The COBOL language is known for its verbose, English-like syntax, making it ideal for:', 'multiple_choice', 'Low-level device control', 'Scientific simulation', 'Self-documenting business procedures', 'Game physics engines', 'C', 'COBOL’s design supports highly readable business documentation.');

    -- Q66 (MC) - Character Encoding
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the standard encoding used to represent the set of characters available on a typical keyboard?', 'multiple_choice', 'EBCDIC', 'ASCII', 'Binary', 'Hexadecimal', 'B', 'ASCII is the primary standard for basic keyboard characters.');

    -- Q67 (MC) - Data Organization (Record Structure)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A record is essentially a structure containing ___ about a single entity.', 'multiple_choice', 'Bits', 'Multiple files', 'Related fields', 'Machine code', 'C', 'A record groups fields that describe one item (e.g., one employee).');

    -- Q68 (MC) - Programming Language Developer
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which major organization was instrumental in the creation of the FORTRAN programming language?', 'multiple_choice', 'Bell Labs', 'Microsoft', 'IBM', 'Oracle', 'C', 'IBM developed FORTRAN in the 1950s.');

    -- Q69 (MC) - Machine Language Translation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the process of converting Assembly Language into Machine Language called?', 'multiple_choice', 'Compiling', 'Interpreting', 'Assembling', 'Debugging', 'C', 'A specific program called an assembler performs this translation.');

    -- Q70 (MC) - Software Category
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The software that allows a user to interact with the computer (e.g., GUI) is part of the:', 'multiple_choice', 'Application layer', 'System layer', 'Firmware layer', 'Database layer', 'B', 'User interfaces are a core function of the System Software (OS).');

    -- Q71 (MC) - FORTRAN Acronym
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The name FORTRAN is an abbreviation derived from:', 'multiple_choice', 'Formatting and Translating', 'Formula Translation', 'Formal Technique of Recognition', 'Function and Routine Analysis', 'B', 'FORTRAN stands for Formula Translation.');

    -- Q72 (MC) - HTML Image Function
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Besides displaying the picture, what is the primary purpose of the `alt` attribute in the `<img>` tag?', 'multiple_choice', 'Specifying image size', 'Defining a hyperlink', 'Providing alternate text for accessibility', 'Setting image borders', 'C', 'The `alt` attribute is crucial for screen readers and when the image cannot load.');

    -- Q73 (MC) - Computer System Need
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The necessity of a "programming force" underscores the fact that the computer itself is fundamentally just a:', 'multiple_choice', 'Storage medium', 'Processing unit', 'Passive device', 'Communication tool', 'C', 'It is a passive device until instructions (software) are provided.');

    -- Q74 (MC) - Data Organization (High-Level)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which element sits structurally above the "record" in the data hierarchy?', 'multiple_choice', 'Byte', 'Field', 'File', 'Character', 'C', 'A File is a collection of records.');

    -- Q75 (MC) - Language Level Distance
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language is closest to the human language, offering the highest level of abstraction from hardware?', 'multiple_choice', 'Assembly Language', 'Machine Language', 'High-Level Language', 'Second Generation Language', 'C', 'High-level languages use syntax close to English.');

    -- Q76 (MC) - Software Class
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Word processors and spreadsheet applications fall under which type of software?', 'multiple_choice', 'System Software', 'Utility Software', 'Application Software', 'Compiler Software', 'C', 'They are designed for specific user applications.');

    -- Q77 (MC) - Instruction Nature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The instructions within a program are described as:', 'multiple_choice', 'General guidelines', 'Vague suggestions', 'Step-by-step', 'Abstract concepts', 'C', 'Programs consist of a series of step-by-step instructions.');

    -- Q78 (MC) - C++ Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The object-oriented nature of C++ enables the use of which concept?', 'multiple_choice', 'Only global variables', 'Sequential logic only', 'Inheritance', 'Procedural calls only', 'C', 'Inheritance is a core OOP concept added in C++.');

    -- Q79 (MC) - System Boundary
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The boundary separating hardware from software in a computer system is often known as the:', 'multiple_choice', 'Application Interface', 'Logic Barrier', 'Operating System', 'Bus', 'C', 'The OS mediates access and control between the two.');

    -- Q80 (MC) - Data Processing Context
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The term "data processing" is most historically associated with the development and use of:', 'multiple_choice', 'HTML', 'FORTRAN', 'COBOL', 'Assembly Language', 'C', 'COBOL was designed for commercial data processing.');

    -- Q81 (MC) - Markup Language Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Markup Language is primarily used to:', 'multiple_choice', 'Execute business logic', 'Define data storage schemes', 'Annotate text for display', 'Encrypt communication', 'C', 'Markup languages use tags to annotate (mark up) text.');

    -- Q82 (MC) - Hardware Location
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which component represents the central processing unit (CPU)?', 'multiple_choice', 'Application Software', 'System Software', 'Microprocessor', 'Programming Force', 'C', 'The Microprocessor is the hardware component that performs processing.');

    -- Q83 (MC) - Low-Level Language Code
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Machine language instructions are directly executable by the CPU because they are written in:', 'multiple_choice', 'Hexadecimal format', 'Human-readable English', 'Binary code (0s and 1s)', 'ASCII characters', 'C', 'CPUs execute instructions coded in binary.');

    -- Q84 (MC) - Problem Solving
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A program is intended to provide a solution to a:', 'multiple_choice', 'General field of study', 'Particular problem', 'Software bug', 'Hardware failure', 'B', 'It provides a solution to a specific problem.');

    -- Q85 (MC) - Language Translation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What tool translates high-level source code (like FORTRAN) into machine code all at once?', 'multiple_choice', 'Interpreter', 'Assembler', 'Debugger', 'Compiler', 'D', 'A compiler performs a complete translation before execution.');

    -- Q86 (MC) - Data Item
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An individual digit (0-9) within a piece of data is classified as a:', 'multiple_choice', 'File', 'Record', 'Character', 'Instruction', 'C', 'Digits are part of the broader category of characters.');

    -- Q87 (MC) - Programming Language Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which programming language is known for its strong emphasis on mathematical formula expression?', 'multiple_choice', 'COBOL', 'HTML', 'FORTRAN', 'C++', 'C', 'FORTRAN was designed for mathematical computing.');

    -- Q88 (MC) - C++ Standard
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The original code base for C was developed at:', 'multiple_choice', 'IBM', 'Microsoft', 'Bell Labs', 'Stanford University', 'C', 'C was developed by Dennis Ritchie at Bell Labs.');

    -- Q89 (MC) - Data Organization Unit
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A collection of fields that contain related information about an entity is called a:', 'multiple_choice', 'Database', 'Record', 'Table', 'Key', 'B', 'The definition of a record.');

    -- Q90 (MC) - System Software Example
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which is the most prominent example of System Software?', 'multiple_choice', 'Web Browser', 'Spreadsheet Program', 'Operating System', 'Video Game', 'C', 'The Operating System is the core System Software.');

    -- Q91 (MC) - Hardware Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Physical components used for inputting data are known as:', 'multiple_choice', 'Output devices', 'Storage devices', 'Input devices', 'System units', 'C', 'Input devices (like keyboard, mouse) are hardware.');

    -- Q92 (MC) - Character Standard
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The ASCII code provides a specific numerical representation for each:', 'multiple_choice', 'Processor register', 'Machine instruction', 'Character', 'Memory address', 'C', 'ASCII maps numbers to characters.');

    -- Q93 (MC) - HTML Use Case
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The primary function of the HTML Markup Language is to define the:', 'multiple_choice', 'Computational speed', 'Document content and structure', 'Network security protocols', 'Database design schema', 'B', 'HTML structures the content of a web document.');

    -- Q94 (MC) - Programming Force Source
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The programming force is composed of:', 'multiple_choice', 'The user’s input', 'Software', 'The CPU and RAM', 'The physical cables', 'B', 'Software is the programming force.');

    -- Q95 (MC) - Data Unit Hierarchy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which is the smallest data unit that can represent a single letter or number?', 'multiple_choice', 'Bit', 'Byte', 'Field', 'Record', 'B', 'A Byte (8 bits) is required to represent a standard character.');

    -- Q96 (MC) - COBOL Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'COBOL features a strong focus on:', 'multiple_choice', 'Recursion and Pointers', 'File Handling and Data Division', 'Graphics Rendering', 'Embedded Systems', 'B', 'File handling is a key component for business data processing in COBOL.');

    -- Q97 (MC) - Language Proximity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language requires the least amount of translation before being executed by the CPU?', 'multiple_choice', 'C++', 'Java', 'Assembly Language', 'Python', 'C', 'Assembly is the closest to machine language among these options.');

    -- Q98 (MC) - Program Outcome
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The successful completion of a program results in a:', 'multiple_choice', 'Hardware upgrade', 'Solution', 'System error', 'New operating system', 'B', 'The goal of a program is to provide a solution.');

    -- Q99 (MC) - Computer System Requirement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The components of a computer system are generally categorized as either hardware or:', 'multiple_choice', 'Users', 'Data', 'Software', 'Input', 'C', 'Hardware and Software are the two primary categories.');

    -- Q100 (MC) - Software vs. Hardware
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which part of the computer system is intangible (cannot be touched)?', 'multiple_choice', 'Monitor', 'Motherboard', 'Software', 'Keyboard', 'C', 'Software is the set of instructions, which is intangible.');

    -- Q101 (MC) - Structured Programming Language
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The teaching of structured programming concepts is traditionally supported by languages like:', 'multiple_choice', 'Prolog', 'LISP', 'FORTRAN', 'HTML', 'C', 'FORTRAN is often used to introduce structured programming.');

    -- Q102 (MC) - HTML Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The use of angle brackets to surround element names is characteristic of a:', 'multiple_choice', 'Query language', 'Markup language', 'Programming language', 'Database language', 'B', 'This is the convention for defining tags in a markup language.');

    -- Q103 (MC) - C++ Compiler
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What converts the C++ source code into an executable file?', 'multiple_choice', 'Interpreter', 'Virtual Machine', 'Compiler', 'Operating System Shell', 'C', 'C++ is a compiled language.');

    -- Q104 (MC) - Computer Input
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The action of the computer being "manipulated by a person" primarily involves providing:', 'multiple_choice', 'Electrical power', 'Physical cleaning', 'Input and commands', 'Network connection', 'C', 'Manipulation refers to user interaction and input.');

    -- Q105 (MC) - Data Unit
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A collection of related characters forms a:', 'multiple_choice', 'Bit', 'Field', 'File', 'Database', 'B', 'Characters group to form a field.');

    -- Q106 (MC) - COBOL History
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'COBOL was one of the first programming languages standardized by:', 'multiple_choice', 'ISO', 'ACM', 'ANSI', 'IEEE', 'C', 'ANSI played a key role in standardizing COBOL.');

    -- Q107 (MC) - System Operation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The "operations" mentioned in the context of the computer system are directed by:', 'multiple_choice', 'Hardware cooling fans', 'Programming force', 'Printer drivers', 'Power supply unit', 'B', 'The programming force (software) directs the operations.');

    -- Q108 (MC) - Machine Code Specificity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Machine language is not portable because it directly interacts with the specific:', 'multiple_choice', 'User account', 'Network topology', 'CPU architecture', 'Internet service provider', 'C', 'The instruction set is specific to the CPU.');

    -- Q109 (MC) - Programming Language Classification
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Languages like C++ and FORTRAN are generally considered:', 'multiple_choice', 'First Generation Languages', 'Low-Level Languages', 'High-Level Languages', 'Machine Languages', 'C', 'They offer a high level of abstraction and are compiled.');

    -- Q110 (MC) - System Component Interplay
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In a complete computer system, the software relies on the ___ for execution.', 'multiple_choice', 'Network', 'Hardware', 'Database', 'User', 'B', 'Software cannot run without the underlying hardware.');


    -- FILL-IN-THE-BLANK QUESTIONS (10 new, total 15)

    -- Q11 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The programming force that drives a computer system is fundamentally known as ___', 'fill_in_blank', 'Software', 'Answer must be word-for-word: "Software"');

    -- Q12 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The component of a computer system that consists of operating system software and application software is collectively called ___', 'fill_in_blank', 'Software', 'Answer must be word-for-word: "Software"');

    -- Q13 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A program is a series of step-by-step ___ that provides a solution to a particular problem.', 'fill_in_blank', 'Instructions', 'Answer must be word-for-word: "Instructions"');

    -- Q14 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The original C language, from which C++ was derived, was published in the year ___', 'fill_in_blank', '1978', 'Answer must be word-for-word: "1978"');

    -- Q15 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'HTML is considered a ___ language because it uses tags to define structure.', 'fill_in_blank', 'Markup', 'Answer must be word-for-word: "Markup"');

    -- Q16 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The acronym for the programming language designed primarily for business applications is ___', 'fill_in_blank', 'COBOL', 'Answer must be word-for-word: "COBOL"');

    -- Q17 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A ___ is a collection of related fields in a database context.', 'fill_in_blank', 'Record', 'Answer must be word-for-word: "Record"');

    -- Q18 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The coding standard that C++ commonly utilizes for character representation is ___', 'fill_in_blank', 'ASCII', 'Answer must be word-for-word: "ASCII"');

    -- Q19 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The most fundamental level of language, which is specific to a single computer’s hardware, is called ___', 'fill_in_blank', 'Machine Language', 'Answer must be word-for-word: "Machine Language"');

    -- Q20 (FIB)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The programming language developed by IBM for scientific and numerical computing is ___', 'fill_in_blank', 'FORTRAN', 'Answer must be word-for-word: "FORTRAN"');

END $$;