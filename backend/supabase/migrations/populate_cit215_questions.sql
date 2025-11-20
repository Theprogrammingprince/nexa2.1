DO $$
DECLARE
    v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'CIT215' LIMIT 1;


-- Question 1 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A _______ is a series of step-by-step instructions that provides a solution to a particular problem and directs the computer on what to do exactly.', 'fill_in_blank', 'Program', 'Answer is case-sensitive: "Program"');

-- Question 2 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program is a series of step-by-step ______ that provides a solution to a particular problem and directs the computer on what to do exactly.', 'fill_in_blank', 'Instructions', 'Answer is case-sensitive: "Instructions"');

-- Question 3 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program is a series of step-by-step instructions that provides a _____ to a particular problem and directs the computer on what to do exactly.', 'fill_in_blank', 'solution', 'Answer is case-sensitive: "solution"');

-- Question 4 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program is a series of step-by-step instructions that provides a solution to a particular problem and _____ the computer on what to do exactly.', 'fill_in_blank', 'directs', 'Answer is case-sensitive: "directs"');

-- Question 5 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program is a series of step-by-step instructions that provides a solution to a particular problem and directs the _______ on what to do exactly.', 'fill_in_blank', 'computer', 'Answer is case-sensitive: "computer"');

-- Question 6 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ___________ is a set of instructions.', 'fill_in_blank', 'Program', 'Answer is case-sensitive: "Program"');

-- Question 7 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program is a ___________ of instructions.', 'fill_in_blank', 'Set', 'Answer is case-sensitive: "Set"');

-- Question 8 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program is a set of ______', 'fill_in_blank', 'Instructions', 'Answer is case-sensitive: "Instructions"');

-- Question 9 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'There are generally ______ major types of programming.', 'fill_in_blank', 'Two', 'Answer is case-sensitive: "Two"');

-- Question 10 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are generally two major types of programming: _____ and Application.', 'multiple_choice', 'System Programming', 'Networking', 'Hardware Programming', 'Application Programming', 'D', 'The two major types are System Programming and Application Programming.');

-- Question 11 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are generally two major types of programming: System Programming and ______?', 'multiple_choice', 'Hardware Programming', 'Application Programming', 'Networking Programming', 'Database Programming', 'B', 'The two major types are System Programming and Application Programming.');

-- Question 12 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'There were time delays and errors by the human operators which constituted most of the problems that led to the development of a Super Controller program called______', 'fill_in_blank', 'Operating System (OS)', 'Answer is case-sensitive: "Operating System (OS)"');

-- Question 13 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'An _____ is a collection of system programs that jointly controls the operations of a computer system and its resources.', 'fill_in_blank', 'Operating System', 'Answer is case-sensitive: "Operating System"');

-- Question 14 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are ____________ types of programs that make up the Operating System.', 'multiple_choice', 'Hardware and Software Programs', 'Control and Processing Programs', 'System and Application Programs', 'User and Kernel Programs', 'B', 'The programs that make up the OS are Control Programs and Processing Programs.');

-- Question 15 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The OS _____________ generally oversee the system operations and carry out tasks such as Input/Output (I/O), scheduling, communicating with the Computer user or programmer and handling interrupts.', 'fill_in_blank', 'Control programs', 'Answer is case-sensitive: "Control programs"');

-- Question 16 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The OS ______________ are those that facilitate efficient processing operations by simplifying program preparation and execution for you as a user.', 'fill_in_blank', 'Processing programs', 'Answer is case-sensitive: "Processing programs"');

-- Question 17 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '______________ is just a signal sent to the CPU indicating that an event has occurred.', 'fill_in_blank', 'An interrupt', 'Answer is case-sensitive: "An interrupt"');

-- Question 18 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The major processing programs existing in the OS include the following: Language Translators, Linkage Editor, Library Programs, Utility Programs. Which of these facilitates program translation?', 'multiple_choice', 'Library Programs', 'Linkage Editor', 'Language Translators', 'Utility Programs', 'C', 'Language Translators convert source code to machine code.');

-- Question 19 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The aims guiding the design of a good computer program include:', 'multiple_choice', 'Reliability, Maintainability, Portability', 'Readability, Performance, Memory Saving', 'All of the above', 'None of the above', 'C', 'All listed features are important in program design.');

-- Question 20 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A readable ___________ is easier to maintain.', 'fill_in_blank', 'Program', 'Answer is case-sensitive: "Program"');

-- Question 21 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program should be easy for other programmers to read and understand. A readable program is easier to ____________.', 'fill_in_blank', 'maintain', 'Answer is case-sensitive: "maintain"');

-- Question 22 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A program that doesn’t carry out the expected tasks quickly and efficiently has lost which aim?', 'multiple_choice', 'Reliability', 'Memory Saving', 'Performance', 'Portability', 'C', 'The program lost the Performance aim.');

-- Question 23 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A major aim in program design is that_____________', 'fill_in_blank', 'The program should execute quickly and efficiently too', 'Answer is case-sensitive: "The program should execute quickly and efficiently too"');

-- Question 24 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The _____________ is expected to analyse the problem thoroughly in order to understand what is required of its solution.', 'fill_in_blank', 'Programmer', 'Answer is case-sensitive: "Programmer"');

-- Question 25 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Generally, if you describe a problem carefully at the beginning of the programming process, your program will be better and might cost less to develop.', 'multiple_choice', 'True', 'False', '', '', 'A', 'Careful problem analysis reduces errors and development costs.');

-- Question 26 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'One way of defining a problem is in terms of which aspects?', 'multiple_choice', 'Input, Output, Processing', 'Memory, Storage, CPU', 'Design, Testing, Debugging', 'All of the above', 'A', 'Input, Output, and Processing define a problem.');

-- Question 27 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'In defining a problem, ____________ represents the information requirements of users of the program.', 'fill_in_blank', 'Output', 'Answer is case-sensitive: "Output"');

-- Question 28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The process of dividing a program into parts or modules for easy development and maintenance is called?', 'multiple_choice', 'Modular Programming', 'Object-Oriented Programming', 'Procedural Programming', 'Functional Programming', 'A', 'Dividing programs into modules is called Modular Programming.');

-- Question 29 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are __________ major aspects to develop a program logical flow.', 'multiple_choice', 'One', 'Two', 'Three', 'Four', 'B', 'Two major aspects: General Logic and Detailed Logic.');

-- Question 30 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The major aspects to develop a program logical flow are General Logic and ________.', 'multiple_choice', 'Detailed Logic', 'Algorithm', 'Data Flow', 'Structure', 'A', 'The two aspects are General Logic and Detailed Logic.');

-- Question 31 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The major aspects to develop a program logical flow are Detailed Logic and ________.', 'multiple_choice', 'General Logic', 'Algorithm', 'Structure Chart', 'Data Flow', 'A', 'Detailed Logic complements General Logic.');

-- Question 32 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The _____ flow design can be done by using a "Structure Chart" which shows the major elements of the program and their relationships.', 'multiple_choice', 'Detailed logic', 'General logic', 'Algorithm', 'Module flow', 'B', 'General Logic flow is shown via a Structure Chart.');

-- Question 33 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The "general logic" flow design can be done by using a _____ which shows the major elements of the program and their relationships.', 'fill_in_blank', 'Structure Chart', 'Answer is case-sensitive: "Structure Chart"');

-- Question 34 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'This is simply the step-by-step operation of each block in your structure chart.', 'fill_in_blank', 'Detailed Logic', 'Answer is case-sensitive: "Detailed Logic"');

-- Question 35 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Errors in programs are called___________', 'fill_in_blank', 'Bugs', 'Answer is case-sensitive: "Bugs"');

-- Question 36 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The process of removing errors in programs is called____________', 'fill_in_blank', 'Debugging', 'Answer is case-sensitive: "Debugging"');

-- Question 37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Compiling is one of the methods of translating a program.', 'multiple_choice', 'True', 'False', '', '', 'A', 'Compiling is indeed a method of translating a program.');

-- Question 38 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Unit Testing involves testing:', 'multiple_choice', 'The whole program after integration', 'Separate components or modules as they are developed', 'End user experience', 'System performance', 'B', 'Unit Testing tests individual modules as they are developed.');

-- Question 39 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Integration Testing involves:', 'multiple_choice', 'Testing separate modules as they are developed', 'Testing modules as they are put together', 'Testing by the end user', 'Testing system performance', 'B', 'Integration Testing occurs when modules are combined.');

-- Question 40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'System Testing occurs when:', 'multiple_choice', 'Individual modules are tested', 'Modules are integrated', 'The whole program is tested in its final form', 'The user checks for usability', 'C', 'System Testing tests the complete program.');

-- Question 41 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'User Testing is:', 'multiple_choice', 'Testing separate modules', 'Testing after compilation', 'When the user tests the final program', 'System-level debugging', 'C', 'User Testing is done by the end user to ensure the program meets requirements.');

-- Question 42 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'There is no good programming without_____________.', 'fill_in_blank', 'Documentation', 'Answer is case-sensitive: "Documentation"');

-- Question 43 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ is the documentation of all the work involved in the program development.', 'fill_in_blank', 'Program Documentation', 'Answer is case-sensitive: "Program Documentation"');

-- Question 44 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'To speed up processing, the computer memory became useful to store instructions as well as data. This development introduced what was known as ____________ concept.', 'fill_in_blank', 'Stored-Program', 'Answer is case-sensitive: "Stored-Program"');

-- Question 45 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The first form of program code became what is called the ____________', 'fill_in_blank', 'Machine Language (ML)', 'Answer is case-sensitive: "Machine Language (ML)"');

-- Question 46 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The two categories of Machine Language are:', 'multiple_choice', 'High-Level and Assembly Language', 'Low-Level and High-Level Language', 'Machine and Assembly Language', 'Procedural and Object-Oriented Language', 'B', 'Machine language includes Low-Level and High-Level languages.');

-- Question 47 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ is generally called the lowest-level language and it was the first language available to computer programmers.', 'fill_in_blank', 'Machine Language', 'Answer is case-sensitive: "Machine Language"');

-- Question 48 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The next in the hierarchy of languages that is closer to the Machine Language is the _____________', 'fill_in_blank', 'Assembly Language', 'Answer is case-sensitive: "Assembly Language"');

-- Question 49 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ was developed in the early 1950s to alleviate some of the difficulties associated with the Machine Language.', 'fill_in_blank', 'Assembly Language', 'Answer is case-sensitive: "Assembly Language"');

-- Question 50 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Assembly Language was developed in the early _____________', 'fill_in_blank', '1950s', 'Answer is case-sensitive: "1950s"');

-- Question 51 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Symbolic names or _____________ were used to replace the binary code of the Machine Language.', 'fill_in_blank', 'Mnemonics', 'Answer is case-sensitive: "Mnemonics"');

-- Question 52 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A mnemonic means a____________.', 'fill_in_blank', 'Memory aid', 'Answer is case-sensitive: "Memory aid"');

-- Question 53 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _____________ language is one that can be used to solve a variety of problem types.', 'multiple_choice', 'High-Level', 'General-Purpose', 'Assembly', 'Low-Level', 'B', 'A general-purpose language can solve a variety of problem types.');

-- Question 54 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______________ language is one that can be used for specific types of problems, such as WPL for word processing.', 'multiple_choice', 'High-Level', 'Special-Purpose', 'Low-Level', 'Assembly', 'B', 'Special-purpose languages are designed for specific problem types.');

-- Question 55 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A language called WPL (Word Processing Language) was developed by _____for word processing.', 'fill_in_blank', 'Apple', 'Answer is case-sensitive: "Apple"');

-- Question 56 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Translators take the forms of:', 'multiple_choice', 'Interpreter, Compiler, Assembler', 'Compiler only', 'Assembler only', 'Interpreter only', 'A', 'Translators include Interpreter, Compiler, and Assembler.');

-- Question 57 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An _____________ converts the "source program" into machine language.', 'multiple_choice', 'Interpreter', 'Compiler', 'Assembler', 'Debugger', 'A', 'An Interpreter converts the source program to machine language directly.');

-- Question 58 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _____________ translates an entire program into machine language before execution.', 'multiple_choice', 'Interpreter', 'Compiler', 'Assembler', 'Debugger', 'B', 'A Compiler translates the entire program before execution.');

-- Question 59 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A Compiler translates the SOURCE program into another program called the __________ program.', 'fill_in_blank', 'OBJECT', 'Answer is case-sensitive: "OBJECT"');

-- Question 60 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Generally, a compiled program runs faster than an interpreted program.', 'multiple_choice', 'True', 'False', '', '', 'A', 'Compiled programs are generally faster than interpreted ones.');

-- Question 61 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The basic characteristic layers of a simple 4GL include:', 'multiple_choice', 'Database, Data Communication, Data Processing, End User Facilities (EUF)', 'CPU, Memory, Storage', 'High-Level Language, Assembly, Machine Language', 'Input, Output, Processing', 'A', 'These are the layers of a simple 4GL.');

-- Question 62 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ is generally referred to as the first high-level language.', 'fill_in_blank', 'Fortran', 'Answer is case-sensitive: "Fortran"');

-- Question 63 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The name “FORTRAN” is the short for _____', 'fill_in_blank', 'FORmula TRANslator', 'Answer is case-sensitive: "FORmula TRANslator"');

-- Question 64 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Fortran is a scientific-oriented and problem-oriented language.', 'multiple_choice', 'True', 'False', '', '', 'A', 'Fortran is designed for scientific and problem-solving purposes.');

-- Question 65 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Fortran was developed by an IBM (International Business Machines) group led by John Backus in _____', 'fill_in_blank', '1957', 'Answer is case-sensitive: "1957"');

-- Question 66 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'IBM is the acronym for____________', 'fill_in_blank', 'International Business Machines', 'Answer is case-sensitive: "International Business Machines"');

-- Question 67 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'BASIC is the acronym for____________', 'fill_in_blank', 'Beginner''s All-purpose Symbolic Instruction Code', 'Answer is case-sensitive: "Beginner''s All-purpose Symbolic Instruction Code"');

-- Question 68 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'BASIC was developed in the year___________', 'fill_in_blank', '1965', 'Answer is case-sensitive: "1965"');

-- Question 69 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Pascal language was designed in __________', 'fill_in_blank', '1971', 'Answer is case-sensitive: "1971"');

-- Question 70 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'PASCAL programming language was developed by_____________', 'fill_in_blank', 'Blaise Pascal', 'Answer is case-sensitive: "Blaise Pascal"');

-- Question 71 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'C language was developed in conjunction with which operating system?', 'multiple_choice', 'Windows', 'UNIX', 'Linux', 'DOS', 'B', 'C was developed alongside UNIX.');

-- Question 72 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The latest versions of the original C language are:', 'multiple_choice', 'C# and C++', 'C++ and Visual C++', 'C and C++', 'C and Java', 'B', 'C++ and Visual C++ are modern iterations of C.');

-- Question 73 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'COBOL stands for _____________', 'fill_in_blank', 'Common Business Oriented Language', 'Answer is case-sensitive: "Common Business Oriented Language"');

-- Question 74 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Common Business Oriented Language (COBOL) was developed in __________', 'fill_in_blank', '1960', 'Answer is case-sensitive: "1960"');

-- Question 75 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'PL/1 - Programming Language 1 was developed in___________', 'fill_in_blank', '1964', 'Answer is case-sensitive: "1964"');

-- Question 76 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'LOGO was developed in__________', 'fill_in_blank', '1966', 'Answer is case-sensitive: "1966"');

-- Question 77 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'HTML means_______', 'fill_in_blank', 'Hypertext Markup Language', 'Answer is case-sensitive: "Hypertext Markup Language"');

-- Question 78 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'SQL means____________', 'fill_in_blank', 'Structured Query Language', 'Answer is case-sensitive: "Structured Query Language"');

-- Question 79 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A program belongs to a larger class of problem-solving techniques known as ____________', 'fill_in_blank', 'ALGORITHMS', 'Answer is case-sensitive: "ALGORITHMS"');

-- Question 80 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Complex problems that cannot be solved directly are simplified into sub-problems in a method called:', 'multiple_choice', 'Stepwise Refinement', 'Modular Programming', 'Top-Down Design', 'Divide and Conquer', 'A', 'Stepwise Refinement breaks problems into sub-problems until solvable.');

-- Question 81 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Initial Assertion in algorithm development is:', 'fill_in_blank', 'The declaration or statement that precedes the first step of an algorithm and describes the initial problem state', 'Answer describes initial assertion');

-- Question 82 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Final Assertion in algorithm development is:', 'fill_in_blank', 'The assertion following the last step of an algorithm which describes the goal state', 'Answer describes final assertion');

-- Question 83 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Invariant Assertion is:', 'fill_in_blank', 'An assertion true under the execution of a step in an algorithm irrespective of repetitions', 'Answer describes invariant assertion');

-- Question 84 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Precondition in an algorithm is:', 'fill_in_blank', 'The assertion preceding a step of an algorithm', 'Answer describes precondition');

-- Question 85 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Post condition in an algorithm is:', 'fill_in_blank', 'The assertion following an algorithm step', 'Answer describes post condition');

-- Question 86 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'An ____________ is a prescribed set of well-defined rules or instructions for the solution of a problem in a finite number of steps.', 'fill_in_blank', 'Algorithm', 'Answer is case-sensitive: "Algorithm"');

-- Question 87 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The difficulty of solving computational problems in terms of resources employed is called___________', 'fill_in_blank', 'Algorithm complexity', 'Answer is case-sensitive: "Algorithm complexity"');

-- Question 88 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Common forms of representing algorithms include:', 'multiple_choice', 'Pseudocode, Flowcharts, Formulae', 'Natural Language, Pseudocode, Flowcharts', 'Flowcharts only', 'Mathematical Notation only', 'A', 'Algorithms can be represented via pseudocode, flowcharts, and formulae.');

-- Question 89 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____________ is a logical representation of an algorithm using third generation language style such as DO, WHILE, IF-THEN-ELSE.', 'fill_in_blank', 'Pseudocode', 'Answer is case-sensitive: "Pseudocode"');

-- Question 90 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A Pascal Pseudocode is made up of __________blocks', 'fill_in_blank', 'DECLARE and EXECUTE', 'Answer describes the Pascal pseudocode blocks');

-- Question 91 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'When all the agents are human, you call the system a _____________', 'fill_in_blank', 'MANUAL SYSTEM', 'Answer is case-sensitive: "MANUAL SYSTEM"');

-- Question 92 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'When computers are employed to perform some procedures, the system is called a_____________.', 'fill_in_blank', 'COMPUTERISED SYSTEM', 'Answer is case-sensitive: "COMPUTERISED SYSTEM"');

-- Question 93 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '______________ diagrams are the charts employed to depict the step-by-step procedures to be used by a computer system to process data.', 'fill_in_blank', 'Logic or Block', 'Answer is case-sensitive: "Logic or Block"');

-- Question 94 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ generally make use of symbols that are assigned specific meanings.', 'fill_in_blank', 'Flowcharts', 'Answer is case-sensitive: "Flowcharts"');

-- Question 95 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Flowcharts generally make use of symbols that are assigned ____________ meanings.', 'fill_in_blank', 'Specific', 'Answer is case-sensitive: "Specific"');

-- Question 96 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'ISO is an acronym for____________', 'fill_in_blank', 'International Standards Organisation', 'Answer is case-sensitive: "International Standards Organisation"');

-- Question 97 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'There are ___________ types of Program flowcharts', 'fill_in_blank', 'Two', 'Answer is case-sensitive: "Two"');

-- Question 98 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Program flowcharts can be divided into two: Macro Flowchart and____________', 'fill_in_blank', 'Micro Flowchart', 'Answer is case-sensitive: "Micro Flowchart"');

-- Question 99 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A _____________ is the flowchart that outlines the general flow and major segments of a program.', 'fill_in_blank', 'macro flowchart', 'Answer is case-sensitive: "macro flowchart"');

-- Question 100 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A macro flowchart is also called the _____________', 'fill_in_blank', 'Modular program flowchart', 'Answer is case-sensitive: "Modular program flowchart"');

-- Question 101 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Macro flowcharts are those called_____________', 'fill_in_blank', 'Block Diagrams', 'Answer is case-sensitive: "Block Diagrams"');

-- Question 102 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ___________ flowchart shows the logic of the program in full detail', 'fill_in_blank', 'Micro', 'Answer is case-sensitive: "Micro"');

-- Question 103 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A micro flowchart is also called a ____________', 'fill_in_blank', 'Detail Flowchart', 'Answer is case-sensitive: "Detail Flowchart"');

-- Question 104 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '______________ are diagrams that depict the procedures of an operation in a hierarchical form.', 'fill_in_blank', 'Structure charts', 'Answer is case-sensitive: "Structure charts"');

-- Question 105 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The structured programming design is a programming tool developed in the___________', 'fill_in_blank', '1960s', 'Answer is case-sensitive: "1960s"');

-- Question 106 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '______________ gives room for well-thought-out program logic and provides an attempt to keep programs as simple and straight forward as possible.', 'fill_in_blank', 'Structured programming', 'Answer is case-sensitive: "Structured programming"');

-- Question 107 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Basically, structured programming employs ____________ and Top-Down Principle', 'fill_in_blank', 'Modular Approach', 'Answer is case-sensitive: "Modular Approach"');

-- Question 108 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Basically, structured programming employs Modular Approach and______________', 'fill_in_blank', 'Top-Down Principle', 'Answer is case-sensitive: "Top-Down Principle"');

-- Question 108 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'HTML pages are the standard interface to the Internet.', 'fill_in_blank', 'HTML', 'Answer is case-sensitive: "HTML"');

-- Question 109 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The inter-linked HTML pages were named the _____________', 'fill_in_blank', 'World Wide Web', 'Answer is case-sensitive: "World Wide Web"');

-- Question 110 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The special programs written to view web pages are called ___________.', 'fill_in_blank', 'Web Browsers', 'Answer is case-sensitive: "Web Browsers"');

-- Question 111 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Examples of Web Browsers include:', 'multiple_choice', 'Microsoft Internet Explorer, Mozilla Firefox, Netscape Navigator', 'Chrome, Safari, Opera', 'Edge, Firefox, Brave', 'All of the above', 'A', 'Correct list of classic web browsers');

-- Question 112 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Basically, ___________ means text stored in electronic form with cross reference links between pages.', 'fill_in_blank', 'Hypertext', 'Answer is case-sensitive: "Hypertext"');

-- Question 113 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Basically, Hypertext means text stored in ____________ form with cross reference links between pages.', 'fill_in_blank', 'Electronic', 'Answer is case-sensitive: "Electronic"');

-- Question 114 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Basically, Hypertext means text stored in electronic form with cross reference links between___________.', 'fill_in_blank', 'Pages', 'Answer is case-sensitive: "Pages"');

-- Question 115 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'HTML or web pages today may include:', 'multiple_choice', 'Text, Sound, Video, Animated Graphics, Interactive Programs', 'Text only', 'Sound and Video only', 'Text and Graphics only', 'A', 'Modern HTML supports multimedia and interactive content');

-- Question 116 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ can be animated on web pages.', 'fill_in_blank', 'Graphics', 'Answer is case-sensitive: "Graphics"');

-- Question 117 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The links to direct visitors to a web page are generally called___________', 'fill_in_blank', 'Hyperlinks', 'Answer is case-sensitive: "Hyperlinks"');

-- Question 118 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The best way is to use ____________ in order to get feedback from web pages.', 'fill_in_blank', 'Forms', 'Answer is case-sensitive: "Forms"');

-- Question 119 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____________ consists of a set of slots into which website visitors can enter some required information.', 'fill_in_blank', 'Form', 'Answer is case-sensitive: "Form"');

-- Question 120 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'ISP means___________', 'fill_in_blank', 'Internet Service Provider', 'Answer is case-sensitive: "Internet Service Provider"');

-- Question 121 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ___________ is a collection of web pages.', 'fill_in_blank', 'Website', 'Answer is case-sensitive: "Website"');

-- Question 122 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____________ are used to divide websites into a set of separate areas each of which can display a different file and be changed independently.', 'fill_in_blank', 'Frames', 'Answer is case-sensitive: "Frames"');

-- Question 123 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ are larger pictures having a number of hyperlinks embedded within them.', 'fill_in_blank', 'Image maps', 'Answer is case-sensitive: "Image maps"');

-- Question 124 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____________ are little programs you can embed into your web pages to be downloaded or run within the browsers of the page visitors.', 'fill_in_blank', 'Java applets', 'Answer is case-sensitive: "Java applets"');


END $$;
