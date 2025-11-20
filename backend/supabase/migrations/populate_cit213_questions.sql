DO $$
DECLARE
v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'CIT213' LIMIT 1;

-- Q1 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The word ____ refers to raw facts about an object.', 'fill_in_blank', 'Data', 'Raw facts about an object are referred to as data.');

-- Q2 - Multiple choice (auto options; correct: speed, reliability, other functionalities)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Computers are used to process data because of their _______.', 'multiple_choice',
'small size', 'speed, reliability and other functionalities', 'low cost only', 'simplicity', 'B',
'Computers are used because of speed, reliability and other functionalities.');

-- Q3 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ Data processing (DP) is any computer automated process that converts raw facts into useful information.', 'fill_in_blank', 'Electronic', 'Electronic data processing converts raw facts into useful information.');

-- Q4 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A _____ is a device which given a set of instructions or data can be used to perform given task or tasks.', 'fill_in_blank', 'computer', 'A computer executes instructions or data to perform tasks.');

-- Q5 - Multiple choice (auto; correct: programmable, multi-user)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A computer can be referred to as a ____, ____ device that accepts data and processes it into useful information.', 'multiple_choice',
'simple, single-user', 'programmable, multi-user', 'analog, single-task', 'manual, manual-entry', 'B',
'Computers are programmable, multi-user devices.');

-- Q6 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The first computers used ____ for circuitry and magnetic drums for memory.', 'fill_in_blank', 'vacuum tubes', 'Early computers used vacuum tubes for circuitry.');

-- Q7 - Multiple choice (generation classification)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In which generation of computers were transistors used in place of vacuum tubes?', 'multiple_choice',
'First', 'Second', 'Third', 'Fourth', 'B', 'Transistors replaced vacuum tubes in the second generation.');

-- Q8 - Multiple choice (generation)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which generation relied on punched cards for input and printouts for output?', 'multiple_choice',
'First', 'Second', 'Third', 'Fourth', 'A', 'The first generation relied on punched cards and printouts.');

-- Q9 - Multiple choice (assembly languages)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which generation of computers supported the use of assembly languages?', 'multiple_choice',
'First', 'Second', 'Third', 'Fourth', 'B', 'Second generation supported assembly languages.');

-- Q10 - Multiple choice (integrated circuits)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which generation of computers used integrated circuits?', 'multiple_choice',
'Second', 'Third', 'Fourth', 'Fifth', 'B', 'Third generation used integrated circuits.');

-- Q11 - Multiple choice (semiconductors)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which generation uses semiconductors, drastically increasing speed and efficiency?', 'multiple_choice',
'First', 'Second', 'Third', 'Third (semiconductors)', 'C', 'Third generation used semiconductors.');

-- Q12 - Multiple choice (microprocessor)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______ generation computers use microprocessor chips, which are large-scale integrated circuits containing thousands of transistors.', 'multiple_choice',
'Third', 'Fourth', 'Fifth', 'Second', 'B', 'Fourth generation uses microprocessor chips.');

-- Q13 - Multiple choice (AI generation)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____ generation computing devices, based on artificial intelligence, are still in development.', 'multiple_choice',
'Third', 'Fourth', 'Fifth', 'Second', 'C', 'Fifth generation is AI-based and still in development.');

-- Q14 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ computers refers to non-digital continuous variable forms of data transmission, including voice and video.', 'fill_in_blank', 'Analog', 'Analog refers to continuous variable data like voice and video.');

-- Q15 - Multiple choice (analog examples)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Examples of analog devices include which of the following?', 'multiple_choice',
'Thermometer, speedometer, clock, pressure sensor', 'UNIVAC, ENIAC', 'Magnetic tape and drum', 'Calculator, PC', 'A',
'Thermometer, speedometer, clock, and pressure sensor are analog devices.');

-- Q16 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The term ___ describes any system based on discrete data or events.', 'fill_in_blank', 'Digital', 'Digital systems operate on discrete data or events.');

-- Q17 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is a device which can measure continuous fluctuation.', 'fill_in_blank', 'pressure sensor', 'Pressure sensor measures continuous fluctuation.');

-- Q18 - Multiple choice (binary)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _____ means having two components, alternatives, or outcomes.', 'multiple_choice',
'Ternary', 'Binary', 'Analogue', 'Decimal', 'B', 'Binary has two components or outcomes.');

-- Q19 - Multiple choice (largest powerful computer)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _____ is the largest and relatively most powerful computer with large storage and very rapid processing power.', 'multiple_choice',
'Microcomputer', 'Mainframe', 'Smartphone', 'Tablet', 'B', 'Mainframe is a powerful computer for large storage and processing.');

-- Q20 - Multiple choice (microcomputers)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Microcomputers are sometimes referred to as ____ (PCs).', 'multiple_choice',
'Servers', 'Personal computers', 'Mainframes', 'Supercomputers', 'B', 'Microcomputers are personal computers.');

-- Q21 - Multiple choice (workstation)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is like a PC but more powerful and better at mathematical and graphics-processing than a PC.', 'multiple_choice',
'Workstation', 'Smartphone', 'Mainframe', 'Calculator', 'A', 'Workstations are powerful for math/graphics tasks.');

-- Q22 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Workstations are used mainly in handling computing applications such as in science, engineering, and design work that requires powerful graphics or computational capabilities: _______.', 'fill_in_blank', 'Supercomputer', 'Used for very demanding computational tasks.');

-- Q23 - Multiple choice (five main operations)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The computer processes data by performing the following five main operations: which of these is part of them?', 'multiple_choice',
'Input', 'Analysis only', 'Printing only', 'None of these', 'A', 'Input is one of the five main operations (Input, Processing, Output, Storage, Communication).');

-- Q24 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'An ____ device is hardware such as a keyboard that allows data from the external environment to be entered into the computer for processing.', 'fill_in_blank', 'Input', 'An input device allows data entry into the computer.');

-- Q25 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The ______ is the brain of the computer and it is the place where data is manipulated within the computer system.', 'fill_in_blank', 'CPU', 'CPU is the central processing unit where data is manipulated.');

-- Q26 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The ____ of the processor coordinates all activities of the computer system.', 'fill_in_blank', 'control unit', 'Control unit coordinates CPU activities.');

-- Q27 - Multiple choice (operation types)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The computer can perform only two types of operations: arithmetic operations and ____.', 'multiple_choice',
'Graphical', 'Logical', 'Sorting', 'Multitasking', 'B', 'Logical operations are the other main type.');

-- Q28 - Multiple choice (arithmetic operations)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____ operations include addition, subtraction, multiplication, division and exponentiation.', 'multiple_choice',
'Logical', 'Arithmetic', 'Storage', 'Control', 'B', 'Arithmetic operations include those listed.');

-- Q29 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'RAM is an acronym for ____.', 'fill_in_blank', 'Random Access Memory', 'RAM stands for Random Access Memory.');

-- Q30 - Multiple choice (RAM usage)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____ is used for short-term storage of data or program instructions.', 'multiple_choice',
'ROM', 'RAM', 'Hard disk', 'Tape', 'B', 'RAM is for short-term (volatile) storage.');

-- Q31 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'ROM is an acronym for ____.', 'fill_in_blank', 'Read Only Memory', 'ROM stands for Read Only Memory.');

-- Q32 - Multiple choice (nonvolatile)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____ is a nonvolatile type of memory.', 'multiple_choice',
'RAM', 'ROM', 'Cache', 'Register', 'B', 'ROM is nonvolatile.');

-- Q33 - Multiple choice (variations of ROM)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are _____ variations of ROM chips.', 'multiple_choice',
'one', 'two', 'three', 'four', 'C', 'Commonly cited: three variations of ROM chips.');

-- Q34 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'PROM stands for ____.', 'fill_in_blank', 'programmable read-only memory', 'PROM = programmable read-only memory.');

-- Q35 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'EPROM stands for electronically ________ read-only memory.', 'fill_in_blank', 'Erasable', 'EPROM is Erasable Programmable Read-Only Memory.');

-- Q36 - Multiple choice (EEPROM)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'EEPROM is an acronym for ____.', 'multiple_choice',
'Electrically Erasable Programmable Read-Only Memory', 'Electronically Erasable Permanent ROM', 'Erasable Programmed ROM', 'Electrostatic Erasable ROM', 'A',
'EEPROM = Electrically (or Electronically) Erasable Programmable Read-Only Memory.');

-- Q37 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The term ____ is a short form of binary digit.', 'fill_in_blank', 'Bit', 'Bit is short for binary digit.');

-- Q38 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is the smallest possible unit of data.', 'fill_in_blank', 'Bit', 'The bit is the smallest unit of data.');

-- Q39 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A group of eight bits is called a ___.', 'fill_in_blank', 'Byte', 'Eight bits equal one byte.');

-- Q40 - Multiple choice (kilobyte)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A kilobyte represents approximately ____ bytes.', 'multiple_choice',
'1000', '1024', '10,240', '512', 'B', 'A kilobyte is approximately 1024 bytes.');

-- Q41 - Multiple choice (megabyte)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is used to refer to about 1 million bytes of data.', 'multiple_choice',
'Kilobyte', 'Megabyte', 'Gigabyte', 'Terabyte', 'B', 'A megabyte refers to about 1 million bytes.');

-- Q42 - Multiple choice (gigabyte)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is used to refer to about 1 billion bytes of data.', 'multiple_choice',
'Kilobyte', 'Megabyte', 'Gigabyte', 'Terabyte', 'C', 'A gigabyte refers to about 1 billion bytes.');

-- Q43 - Multiple choice (terabyte)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is used to refer to about 1 trillion bytes, or 1000 gigabytes of data.', 'multiple_choice',
'Megabyte', 'Gigabyte', 'Terabyte', 'Petabyte', 'C', 'Terabyte equals about 1000 gigabytes.');

-- Q44 - Multiple choice (petabyte)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '___ is used to refer to about 1 million gigabyte data.', 'multiple_choice',
'Terabyte', 'Gigabyte', 'Petabyte', 'Exabyte', 'C', 'Petabyte is about 1 million gigabytes.');

-- Q45 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Software consists of a group of related programs written in a specific code called ____.', 'fill_in_blank', 'programming language', 'Software is written in programming languages.');

-- Q46 - Multiple choice (system software)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____ is software designed to allow the computer to manage its own resources and run hardware and basic operations.', 'multiple_choice',
'Application software', 'System software', 'Utility software', 'Firmware', 'B', 'System software manages resources and hardware.');

-- Q47 - Multiple choice (operating system)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An _____ is the most important software for a computer (commonly).', 'multiple_choice',
'Spreadsheet', 'Compiler', 'Operating system', 'Word processor', 'C', 'Operating system is the most important software.');

-- Q48 - Multiple choice (language translator)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_____ is software which translates a computer program written in a high-level language or assembly into machine form.', 'multiple_choice',
'Editor', 'Language translator', 'Database', 'Operating system', 'B', 'Language translator converts programs to machine code.');

-- Q49 - Multiple choice (utilities)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '___ are programs which are often required by many application programs.', 'multiple_choice',
'Utilities', 'Games', 'Browsers', 'Drivers', 'A', 'Utilities are commonly required by applications.');

-- Q50 - Multiple choice (application examples)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Software for Data Processing includes which of the following?', 'multiple_choice',
'Word processing, Spreadsheet, Database, Presentation graphics', 'Only Word processing', 'Only Database', 'Only Presentation', 'A', 'Data processing software includes those listed.');

-- Q51 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____ management system (DBMS) is a collection of programs that allows you to store, modify and extract information from a database.', 'fill_in_blank', 'database', 'DBMS manages storage, modification and extraction.');

-- Q52 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is a collection of interrelated files in a computer system.', 'fill_in_blank', 'Database', 'A database is interrelated files stored.');

-- Q53 - Multiple choice (spreadsheets)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Electronic ____ application allows users to enter data in rows and columns, calculate, perform statistical analyses, create tables and produce financial schedules.', 'multiple_choice',
'Word processors', 'Spreadsheets', 'Presentation software', 'Database software', 'B', 'Spreadsheets allow these functions.');

-- Q54 - Multiple choice (word processing)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____ processing software allows you to create, edit, store, and print documents.', 'multiple_choice',
'Word processing', 'Spreadsheet processing', 'Database processing', 'Image processing', 'A', 'Word processing software is used for documents.');

-- Q55 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____ is used for entering text and numeric values into the computer.', 'fill_in_blank', 'Keyboard', 'Keyboard is used for entering text and numbers.');

-- Q56 - Multiple choice (pointing device)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '___ devices control the position of the cursor or pointer on the screen.', 'multiple_choice',
'Pointing device', 'Keyboard', 'Printer', 'Monitor', 'A', 'Pointing devices control cursor position.');

-- Q57 - Multiple choice (mouse)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is an input device that is popularly used with microcomputers.', 'multiple_choice',
'Joysticks', 'Mouse', 'Trackball', 'Stylus', 'B', 'Mouse is commonly used with microcomputers.');

-- Q58 - Multiple choice (trackball)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is a variant of the mouse that can be moved on top of a stationary device rotated with the fingers or palm.', 'multiple_choice',
'Mouse', 'Trackball', 'Lightpen', 'Stylus', 'B', 'Trackball is a mouse variant.');

-- Q59 - Multiple choice (pointing devices on handhelds)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Trackballs are commonly used with which type of devices?', 'multiple_choice',
'Mainframes', 'Hand held devices', 'Servers', 'Printers', 'B', 'Trackballs are common on handheld devices.');

-- Q60 - Multiple choice (touch pads)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Touch pads allow a user to control the cursor/point on the computer display with what?', 'multiple_choice',
'Keyboard keys', 'Touch of fingers', 'Voice commands', 'Joystick', 'B', 'Touch pads use finger touch to control cursor.');

-- Q61 - Multiple choice (joystick)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ________ is a pointing device that consists of a vertical handle like a gearshift lever mounted on a base with one or two buttons.', 'multiple_choice',
'Joystick', 'Mouse', 'Puck', 'Stylus', 'A', 'Joystick has a vertical handle and buttons.');

-- Q62 - Multiple choice (lightpen)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A lightpen is used to capture handwriting and marks into a computer; this device is called ____.', 'multiple_choice',
'Stylus', 'Lightpen', 'Puck', 'Joystick', 'B', 'Lightpen captures handwriting into a computer.');

-- Q63 - Multiple choice (stylus)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is a pen-like device with which a user sketches an image.', 'multiple_choice',
'Stylus', 'Puck', 'Lightpen', 'Mouse', 'A', 'Stylus is used for sketching on pen-based devices.');

-- Q64 - Multiple choice (optical pen)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An optical device that is a light-sensitive stylus and can be connected by wire to the computer system is called ____.', 'multiple_choice',
'Puck', 'Optical pen', 'Joystick', 'Stylus', 'B', 'An optical pen is a light-sensitive stylus.');

-- Q65 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A digitizing tablet consists of a tablet linked by a wire to a ______ or puck.', 'fill_in_blank', 'puck', 'Digitizing tablets use a puck as the pointing input.');

-- Q66 - Multiple choice (OMR/OCR)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_____ mark recognition (OMR) uses a device that reads pencil marks and converts them into computer understandable form.', 'multiple_choice',
'Optical', 'Magnetic', 'Digital', 'Analog', 'A', 'OMR stands for Optical Mark Recognition.');

-- Q67 - Multiple choice (OCR)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Optical ____ recognition (OCR) devices are used to translate designed marks, characters, and codes into digital form.', 'multiple_choice',
'Mark', 'Character', 'Image', 'Signal', 'B', 'OCR stands for Optical Character Recognition.');

-- Q68 - Fill in the blank (MICR)
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'MICR stands for ________ Character Recognition.', 'fill_in_blank', 'Magnetic ink', 'MICR = Magnetic Ink Character Recognition.');

-- Q69 - Multiple choice (fax)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A fax machine is also referred to as ____.', 'multiple_choice',
'scanner', 'facsimile', 'printer', 'modem', 'B', 'Fax stands for facsimile transmission machine.');

-- Q70 - Multiple choice (sensors)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_____ are devices that collect data directly from the environment for input into a computer system.', 'multiple_choice',
'Printers', 'Sensors', 'Monitors', 'Keyboards', 'B', 'Sensors collect environmental data.');

-- Q71 - Multiple choice (voice input)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____ devices convert spoken words into computer-understandable digital form for processing.', 'multiple_choice',
'Keyboard', 'Voice input', 'Mouse', 'Scanner', 'B', 'Voice input converts spoken words to digital form.');

-- Q72 - Multiple choice (storage media vs devices)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The physical component or materials in which data is stored are called ____.', 'multiple_choice',
'Storage media', 'Storage devices', 'Output devices', 'Input devices', 'A', 'Storage media are the physical materials storing data.');

-- Q73 - Multiple choice (storage devices)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Storage media are called ____.', 'multiple_choice',
'Storage devices', 'Output devices', 'Input devices', 'Programs', 'A', 'Storage media are often referred to as storage devices.');

-- Q74 - Multiple choice (output device)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An _____ is any piece of computer hardware used to communicate results of data processing to the outside world.', 'multiple_choice',
'Input device', 'Storage device', 'Output device', 'Processing unit', 'C', 'Output device communicates processed results.');

-- Q75 - Multiple choice (printer types)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A Dot-Matrix Printer operates by striking pins against an ink ribbon to create characters.', 'multiple_choice',
'True', 'False', 'Depends', 'Not applicable', 'A', 'Dot-matrix printers work by striking pins against an ink ribbon.');

-- Q76 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A_____ type of printer is able to print an entire line at one time with as much speed as 3,000 lines per minute.', 'fill_in_blank', 'Line printer', 'Line printers print an entire line at once.');

-- Q77 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ type of printer produce images by pushing electrically heated pins against special heat-sensitive paper.', 'fill_in_blank', 'Thermal printers', 'Thermal printers use heated pins to print.');

-- Q78 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A_____ printer works by spraying ionized ink at a sheet of paper.', 'fill_in_blank', 'Inkjet', 'Inkjet printers spray ionized ink.');

-- Q79 - Multiple choice (Answer: A)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Laser printers operate by using a ______ to produce an image on a drum.', 'multiple_choice',
'Laser beam', 'Ink spray', 'Heated rod', 'Electro-static pin', 'A', 'Laser printers use laser beams.');

-- Q80 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A _____ is mainly used for engineering applications and uses a pen to draw pictures or lines based on computer commands.', 'fill_in_blank', 'Plotter', 'Plotters draw lines using pens.');

-- Q81 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A voice output device such as a ______ converts digital output data back into intelligible speech.', 'fill_in_blank', 'Speaker', 'Speakers convert digital signals to sound.');

-- Q82 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Microfilm and ______ were used to store large quantities of output as microscopic filmed documents before optical disk technology.', 'fill_in_blank', 'Microfiche', 'Microfilm and microfiche store miniature images.');

-- Q83 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A hard disk drive (HDD) is commonly referred to as a ____.', 'fill_in_blank', 'Hard drive', 'HDD is called a hard drive.');

-- Q84 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ serve as permanent storage devices for large amounts of data.', 'fill_in_blank', 'Hard disk', 'Hard disks are permanent storage.');

-- Q85 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ hard disk is a variation in which hard disks in cartridges are easily removable like floppy disks.', 'fill_in_blank', 'Removable', 'Removable disks can be detached.');

-- Q86 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ is the amount of time between when the CPU requests a file and when the first byte is sent to the CPU.', 'fill_in_blank', 'Seek time', 'Seek time measures delay before reading.');

-- Q87 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ is the rate at which information can be read from or written to storage.', 'fill_in_blank', 'Throughput', 'Throughput measures data transfer rate.');

-- Q88 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ is the time it takes to position the proper sector under the read/write head.', 'fill_in_blank', 'Rotational delay or latency', 'Latency is the rotational wait.');

-- Q89 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is the set of tracks at a given radius on a disk pack.', 'fill_in_blank', 'Cylinder', 'A cylinder groups tracks.');

-- Q90 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A file is a collection of data or information that has a name called the ________.', 'fill_in_blank', 'Filename', 'A filename identifies a file.');

-- Q91 - Multiple choice (Answer: D)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The file extensions for images include _______', 'multiple_choice',
'.txt only', '.mp3 only', '.exe only', '.png, .jpg, .gif', 'D', 'Images use .png, .jpg, and .gif.');

-- Q92 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ are files that store sets of instructions written in programming language.', 'fill_in_blank', 'Program files', 'Program files contain code.');

-- Q93 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'ASCII stands for American Standard Code for Information__', 'fill_in_blank', 'Interchange', 'ASCII means Information Interchange.');

-- Q94 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____ technique of file organization uses both sequential and direct access methods.', 'fill_in_blank', 'Indexed Sequential Organization', 'ISO mixes sequential and direct access.');

-- Q95 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Storage devices can be classified generally as sequential access or _____', 'fill_in_blank', 'Random access', 'Devices are either sequential or random access.');

-- Q96 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ refers to a collection of transaction records.', 'fill_in_blank', 'Transaction file', 'A transaction file stores transaction records.');

-- Q97 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Data ________ refers to the process of transmitting data/information via a telecommunications system in coded form.', 'fill_in_blank', 'Communication', 'Data communication is the transmission of data.');

-- Q98 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A _______ system refers to a collection of compatible hardware and software required to exchange information from one location to another.', 'fill_in_blank', 'Telecommunication', 'Telecommunication systems exchange information.');

-- Q99 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ is a method of data processing whereby data about a single transaction is processed immediately it is captured.', 'fill_in_blank', 'Online processing', 'Online processing handles data immediately.');

-- Q100 - Multiple choice (Answer: A)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Transaction Processing System (TPS) performs and records the daily or routine transactions needed to conduct a business.', 'multiple_choice',
'True', 'False', 'Sometimes', 'Only monthly', 'A', 'TPS automates routine business transactions.');

-- Q101 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ are systems designed to deal with dynamic situations such as airline reservation systems updated continually as events occur.', 'fill_in_blank', 'Real-time systems', 'Real-time systems update instantly.');

-- Q102 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A database management system has three components: a data definition language, a data manipulation language, and a _______.', 'fill_in_blank', 'Data dictionary', 'A DBMS includes a data dictionary.');

-- Q103 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is a language associated with DBMS used by end users to manipulate data.', 'fill_in_blank', 'Data manipulation language', 'DML manipulates data.');

-- Q104 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ______ definition language defines each data element as it appears in the database.', 'fill_in_blank', 'Data definition language', 'DDL defines data structures.');

-- Q105 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ is the third element of a DBMS.', 'fill_in_blank', 'Data dictionary', 'A data dictionary stores metadata.');

-- Q106 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'In a relational database, files are organized in tables called a ___ consisting of rows and columns.', 'fill_in_blank', 'Relation', 'A relation is a relational table.');

-- Q107 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'In hierarchical databases, records are organized in a ___ structure.', 'fill_in_blank', 'Treelike', 'Hierarchical DB uses a tree structure.');

-- Q108 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The relationship between record types in a hierarchical model is a ____ relationship.', 'fill_in_blank', 'Parent-child', 'Each child has one parent.');

-- Q109 - Multiple choice (network model)
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which database model allows records to have multiple parent records?', 'multiple_choice',
'Hierarchical model', 'Relational model', 'Network model', 'Indexed model', 'C', 'Network model supports many-to-many relationships.');

-- Q110 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The _____ is a database model conceived as a flexible way of representing objects and relationships.', 'fill_in_blank', 'Network model', 'Network model allows flexible linking.');

-- Q111 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A data______ language is used to manipulate data in the database.', 'fill_in_blank', 'Manipulation', 'DML manipulates data.');

-- Q112 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A data_____ language defines how each data appears in the database.', 'fill_in_blank', 'Definition', 'DDL defines data elements.');

-- Q113 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____ is a collection of data stored in standardized format, shared by multiple users.', 'fill_in_blank', 'Database', 'A database stores organized data.');

-- Q114 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Program-data dependence is a problem of ______ file systems.', 'fill_in_blank', 'Traditional', 'Traditional systems tightly couple programs and data.');

-- Q115 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Data____ means duplicate data stored in multiple files in different formats.', 'fill_in_blank', 'Redundancy', 'Data redundancy causes inconsistency.');

-- Q116 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ systems are designed to deal with dynamic situations requiring constant updates.', 'fill_in_blank', 'Realtime', 'Real-time systems update continuously.');

-- Q117 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ systems control critical operations requiring continuous updates.', 'fill_in_blank', 'Transaction', 'Transaction systems process routine events.');

-- Q118 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'TPS stands for ___ processing system.', 'fill_in_blank', 'Transaction', 'TPS means Transaction Processing System.');

-- Q119 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '___ processing allows transactions to be entered directly and updates master files immediately.', 'fill_in_blank', 'Online', 'Online processing updates immediately.');

-- Q120 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ___ system keeps track of the money paid to employees.', 'fill_in_blank', 'Payroll', 'Payroll systems manage employee payments.');

-- Q121 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____ processing collects transaction data and processes them in batches.', 'fill_in_blank', 'Batch', 'Batch processing groups transactions.');

-- Q113 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A _____ system refers to compatible hardware and software needed to exchange information.', 'fill_in_blank', 'Telecommunication', 'Telecommunication systems transmit data.');

-- Q114 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ____ refers to the transmission of data via telecommunications systems.', 'fill_in_blank', 'Data communication', 'Data communication sends info between locations.');


-- Question 149 - Multiple choice (Scanners)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '__use laser beams and reflected light to capture and translate hardcopy images of text, drawings, and photos into computer understandable form.',
  'multiple_choice',
  'Printers', 'Scanners', 'Microfiche readers', 'Monitors',
  'B',
  'Scanners use laser beams and reflected light for digitizing images.'
);

-- Question 150 - Fill in blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (
  v_course_id,
  'A fax machine also referred to as ______ transmission machine scans an image and transmits it electronically.',
  'fill_in_blank',
  'Facsimile',
  'Fax machines are also called facsimile transmission machines.'
);

-- Question 151 - Multiple choice (CRT)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The typical monitor that looks like a television screen uses a large vacuum tube called a _____ ray tube.',
  'multiple_choice',
  'Anode', 'Cathode', 'Photon', 'Electron',
  'B',
  'CRT stands for Cathode Ray Tube.'
);

-- Question 152 - Multiple choice (Master file)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'A ______ file is a collection of relatively permanent records updated periodically.',
  'multiple_choice',
  'Master file', 'Temporary file', 'Binary file', 'Transaction file',
  'A',
  'Master files hold long-term records updated occasionally.'
);

-- Question 153 - Multiple choice (File organization - exception)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The common ways of file organization and access are the following, EXCEPT:',
  'multiple_choice',
  'Sequential organization', 'Direct access organization', 'Indexed-sequential organization', 'Transaction file organization',
  'D',
  'Transaction file organization is not a file access method.'
);

-- Question 154 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'ASCII stands for:',
  'multiple_choice',
  'American Standard Code for Information Interchange', 'Advanced System Code for Internal Interface', 'Automatic Serial Communication Internet Interface', 'Advanced Standard Character Input Integration',
  'A',
  'ASCII means American Standard Code for Information Interchange.'
);

-- Question 155 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is NOT a type of file stored in a computer system?',
  'multiple_choice',
  'Text file', 'Program file', 'Image file', 'MICR file',
  'D',
  'MICR is a device type, not a computer file type.'
);

-- Question 156 - Multiple choice (Input device)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is NOT an input device?',
  'multiple_choice',
  'Keyboard', 'Mouse', 'Scanner', 'MICR',
  'D',
  'MICR is a character recognition technology, not a standard input device.'
);

-- Question 157 - Multiple choice (Operating system)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The following are operating systems, EXCEPT:',
  'multiple_choice',
  'Windows', 'Linux', 'macOS', 'Linus',
  'D',
  '"Linus" is not an operating system; Linux is.'
);

-- Question 158 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is NOT a task performed by the operating system?',
  'multiple_choice',
  'Managing memory', 'Coordinating hardware', 'Validating users', 'Editing documents',
  'D',
  'Editing documents is done by application software.'
);

-- Question 159 - Multiple choice (ROM variations)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The three variations of ROM chips include all the following EXCEPT:',
  'multiple_choice',
  'PROM', 'EPROM', 'EEPROM', 'EEEPROM',
  'D',
  'EEEPROM is not a valid ROM variation.'
);

-- Question 160 - Multiple choice (Distributed systems)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The following are demerits of Distributed Data Processing, EXCEPT:',
  'multiple_choice',
  'Security risks', 'Cost of coordination', 'Data duplication', 'Direct user interaction',
  'D',
  'Direct user interaction is not a demerit.'
);

-- Question 161 - Multiple choice (Basic data processing operations)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is a basic data processing operation?',
  'multiple_choice',
  'Input', 'Processing', 'Storage', 'All of the options',
  'D',
  'All listed items are data processing operations.'
);

-- Question 162 - Multiple choice (SQL)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is NOT a basic SQL statement?',
  'multiple_choice',
  'SELECT', 'INSERT', 'LOGIC', 'UPDATE',
  'C',
  'LOGIC is not an SQL statement.'
);

-- Question 163 - Multiple choice (Control constructs)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The following are control constructs, EXCEPT:',
  'multiple_choice',
  'IF', 'WHILE', 'FOR', 'UPDATE',
  'D',
  'UPDATE is a SQL statement, not a control structure.'
);

-- Question 164 - Multiple choice (DBMS merit)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is a merit of DBMS?',
  'multiple_choice',
  'Data sharing', 'Limited access', 'High redundancy', 'Data isolation',
  'A',
  'DBMS improves data sharing.'
);

-- Question 165 - Multiple choice (Type of file)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is a type of data file?',
  'multiple_choice',
  'Transaction file', 'Monitor file', 'Printer file', 'ROM file',
  'A',
  'Transaction file is a valid data file type.'
);

-- Question 166 - Multiple choice (Master file operations)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following operations cannot be performed in a master file?',
  'multiple_choice',
  'Updating records', 'Selection of record', 'Deleting a record', 'Retrieving a record',
  'B',
  'Master files are not used for selection queries.'
);

-- Question 167 - Multiple choice (Telecommunication components)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following are components of a telecommunication?',
  'multiple_choice',
  'Hardware', 'Software', 'Communication channel', 'All of the options',
  'D',
  'All listed components belong to a telecom system.'
);

-- Question 168 - Multiple choice (Information processing)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Arranging customers’ names in ascending order is an example of:',
  'multiple_choice',
  'Computation', 'Sorting', 'Filtering', 'Searching',
  'B',
  'Sorting arranges data in a specified order.'
);

-- Question 169 - Multiple choice (Information processing definition)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Organization, distribution, and manipulation of information is classified as:',
  'multiple_choice',
  'Data analysis', 'Information processing', 'Communication', 'Storage',
  'B',
  'Information processing involves manipulation and organization of information.'
);

-- Question 170 - Multiple choice (UNIVAC)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'UNIVAC stands for:',
  'multiple_choice',
  'Universal Automatic Computer', 'United National Virtual Computer', 'Universal Algorithm Calculator', 'Unified Automated Compiler',
  'A',
  'UNIVAC = Universal Automatic Computer.'
);

-- Question 171 - Multiple choice (Computer category)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Computers are examples of ________.',
  'multiple_choice',
  'Mechanical computers', 'Digital computers', 'Optical computers', 'Chemical computers',
  'A',
  'The earliest computers were mechanical.'
);

-- Question 172 - Multiple choice (EDVAC)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The first computer to use Neumann''s stored program concept was:',
  'multiple_choice',
  'ENIAC', 'UNIVAC', 'EDVAC', 'EDSAC',
  'C',
  'EDVAC employed the stored-program concept.'
);

-- Question 173 - Multiple choice (Direct access storage)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Direct access storage refers to:',
  'multiple_choice',
  'Devices that read data sequentially', 'Devices that allow immediate access to any record',
  'Punch card storage', 'Optical character storage',
  'B',
  'Direct access storage allows you to jump directly to any record.'
);

-- Question 174 - Multiple choice (Storage types)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Hard disks, fixed head disks, floppy disks and optical disks are all types of ________.',
  'multiple_choice',
  'Secondary storage', 'Primary memory', 'Input devices', 'Output devices',
  'A',
  'These are all secondary storage devices.'
);

-- Question 175 - Multiple choice (Operations on data)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Various operations carried out on data while processing include ______.',
  'multiple_choice',
  'Sorting', 'Classifying', 'Calculating', 'All of the options',
  'D',
  'Data processing involves all these operations.'
);

-- Question 176 - Multiple choice (Sequential file access)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following explains the sequential file access method?',
  'multiple_choice',
  'Jump to the middle and read backwards', 'Read bytes one at a time in order',
  'Randomly pick a byte to read', 'Access blocks simultaneously',
  'B',
  'Sequential access reads bytes in order.'
);

-- Question 177 - Multiple choice (File type)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'File type can be represented by:',
  'multiple_choice',
  'File header', 'File content', 'File extension', 'File signature',
  'C',
  'Extensions help identify file type.'
);

-- Question 178 - Multiple choice (Data processing cycle)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Set of operations carried out to process gathered data is called:',
  'multiple_choice',
  'Data mapping', 'Data processing cycle', 'Information sorting', 'Information staging',
  'B',
  'The data processing cycle includes all steps from input to output.'
);

-- Question 179 - Multiple choice (Create file)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'To create a file, the system must:',
  'multiple_choice',
  'Format the entire disk', 'Allocate space and create directory entry',
  'Update the BIOS', 'Reset the CPU',
  'B',
  'File creation involves space allocation and adding a directory entry.'
);

-- Question 180 - Multiple choice (File definition)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'An organized logical sequence of records is called:',
  'multiple_choice',
  'Table', 'File', 'Block', 'Dataset',
  'B',
  'A file is a logical collection of records.'
);

-- Question 181 - Multiple choice (Blocks)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Files are logically partitioned into storage units of fixed length known as _______.',
  'multiple_choice',
  'Sectors', 'Blocks', 'Tracks', 'Nodes',
  'B',
  'Blocks are logical subdivisions of files.'
);

-- Question 182 - Multiple choice (Array disadvantages)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of the following is a disadvantage of arrays?',
  'multiple_choice',
  'Fixed size', 'Insertion cost', 'Contiguous memory requirement', 'All of the options',
  'D',
  'Arrays have fixed size, high insertion cost & require contiguous memory.'
);

-- Question 183 - Multiple choice (Array definition)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which of these best describes an array?',
  'multiple_choice',
  'Collection of items stored at contiguous memory locations',
  'A constant expression', 'Random data storage structure', 'Unordered memory allocation',
  'A',
  'Arrays store items in contiguous memory.'
);

-- Question 184 - Multiple choice (Data integrity)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which term refers to the correctness and completeness of data in a database?',
  'multiple_choice',
  'Data security', 'Data integrity', 'Data consistency', 'Data mobility',
  'B',
  'Integrity ensures data is correct and complete.'
);

-- Question 185 - Multiple choice (Database)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'A collection of data designed to be used by different people is called a/an:',
  'multiple_choice',
  'Table', 'Database', 'Module', 'File',
  'B',
  'A database stores organized data accessible by many users.'
);

-- Question 186 - Multiple choice (Candidate key)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which attribute can uniquely identify a row in a table?',
  'multiple_choice',
  'Foreign key', 'Candidate key', 'Non-key field', 'Composite field',
  'B',
  'A candidate key uniquely identifies a record.'
);

-- Question 187 - Multiple choice (Array advantages)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'What are the advantages of arrays?',
  'multiple_choice',
  'Fast access', 'Easy sorting', 'Easy traversal', 'All of the options',
  'D',
  'Arrays are efficient for access, traversal and manipulation.'
);

-- Question 188 - Multiple choice (Wrong update statement)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Which statement about the SQL UPDATE keyword is wrong?',
  'multiple_choice',
  'It modifies existing records', 'It can update multiple records', 'Only one record can be updated using WHERE clause', 'It requires a table name',
  'C',
  'WHERE clause can update multiple rows.'
);

-- Question 189 - Multiple choice (Machine language)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Machine language consists of strings of numbers defined by:',
  'multiple_choice',
  'Software manuals', 'Programming style', 'Hardware design', 'Compiler settings',
  'C',
  'Machine language corresponds directly to hardware instructions.'
);

-- Question 190 - Multiple choice (Report generator)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Report Generators are also called ______:',
  'multiple_choice',
  'Report writers', 'Query solvers', 'Print managers', 'File handlers',
  'A',
  'Report writers generate structured reports.'
);

-- Question 191 - Multiple choice (Query language)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'A _______ is a user-friendly language for retrieving information from a DBMS.',
  'multiple_choice',
  'Query language', 'Program file', 'Compiler instruction', 'Data driver',
  'A',
  'Query languages retrieve data from a database.'
);

-- Question 192 - Multiple choice (CASE)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'CASE is an acronym for Computer-Aided Software Engineering or ______ systems engineering.',
  'multiple_choice',
  'Central', 'Computer-aided', 'Composite', 'Complex',
  'B',
  'CASE = Computer-Aided Software/Systems Engineering.'
);

-- Question 193 - Multiple choice (Structured programming)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Structured programming is a technique designed to make programming:',
  'multiple_choice',
  'Harder', 'More complex', 'Easier and more productive', 'Linear-only',
  'C',
  'Structured programming improves clarity and productivity.'
);

-- Question 194 - Multiple choice (GO TO removal)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'A structured program avoids depending on the GO TO statement and instead uses:',
  'multiple_choice',
  'Modules/subprograms', 'Raw jumps', 'Infinite loops', 'Direct CPU interrupts',
  'A',
  'Structured programming uses smaller modules instead of GO TO.'
);

-- Question 195 - Multiple choice (OOP concept)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Object-Oriented Programming combines data and instructions into a self-contained unit called a(n):',
  'multiple_choice',
  'Record', 'Object', 'Procedure', 'Module',
  'B',
  'OOP encapsulates data and behavior in objects.'
);
-- Question 196 - Multiple choice (Digital representation)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'A ______ computer represents a datum as a sequence of symbols drawn from a fixed alphabet.',
  'multiple_choice',
  'Analog', 'Digital', 'Hybrid', 'Mechanical',
  'B',
  'Digital computers represent data using symbols.'
);

-- Question 197 - Multiple choice (Binary meaning)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Binary means having:',
  'multiple_choice',
  'Three components', 'Two components', 'Unlimited outcomes', 'Four components',
  'B',
  'Binary means having two alternatives.'
);

-- Question 198 - Multiple choice (Digital systems)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The term _____ describes any system based on discontinuous data or events.',
  'multiple_choice',
  'Analog', 'Digital', 'Hybrid', 'Optical',
  'B',
  'Digital systems use discrete on/off states.'
);

-- Question 199 - Multiple choice (Analog computers)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'An _____ computer represents data as voltage, distance or physical quantities.',
  'multiple_choice',
  'Digital', 'Analog', 'Hybrid', 'Quantum',
  'B',
  'Analog computers use continuous values.'
);

-- Question 200 - Multiple choice (Analog transmission)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ refers to non-digital, continuous variable forms of data transmission such as voice and video.',
  'multiple_choice',
  'Analog', 'Digital', 'Optical', 'Magnetic',
  'A',
  'Analog transmission uses continuous signals.'
);

-- Question 201 - Multiple choice (Classification)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Computing devices are classified as ______ according to the means by which they represent data.',
  'multiple_choice',
  'Analog or Digital', 'Small or large', 'Mechanical or Electrical', 'Portable or Fixed',
  'A',
  'Computers are classified as analog or digital.'
);

-- Question 202 - Multiple choice (5th generation)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ generation computing devices, based on artificial intelligence, are still in development.',
  'multiple_choice',
  'Third', 'Fourth', 'Fifth', 'Second',
  'C',
  'Fifth generation computers focus on AI.'
);

-- Question 203 - Multiple choice (GUI & mouse)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ generation computers saw the development of GUI, mouse and PDAs.',
  'multiple_choice',
  'First', 'Second', 'Third', 'Fourth',
  'D',
  'Fourth generation computers introduced GUIs and mouse devices.'
);

-- Question 204 - Multiple choice (Personal computer creation)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ led to the creation of the first personal computer.',
  'multiple_choice',
  'Cathode tubes', 'Vacuum tubes', 'Microprocessor', 'Magnetic tape',
  'C',
  'Microprocessors enabled small personal computers.'
);

-- Question 205 - Multiple choice (Integrated circuits)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ generation computers used integrated circuits.',
  'multiple_choice',
  'First', 'Second', 'Third', 'Fourth',
  'C',
  'Third generation computers used integrated circuits.'
);

-- Question 206 - Multiple choice (Semiconductors)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'In third generation computers, transistors were miniaturized and placed on silicon chips, called _____.',
  'multiple_choice',
  'Microchips', 'Modules', 'Selectors', 'Assemblers',
  'A',
  'Integrated circuits (microchips) placed transistors on silicon.'
);

-- Question 207 - Multiple choice (Assembly language)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ generation of computers supported the use of assembly languages.',
  'multiple_choice',
  'Second', 'Fourth', 'First', 'Third',
  'A',
  'Assembly language emerged in second generation.'
);

-- Question 208 - Multiple choice (Punched cards)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ generation of computers relied on punched cards for input and printouts for output.',
  'multiple_choice',
  'First', 'Second', 'Third', 'Fourth',
  'A',
  'First generation computers used punched cards.'
);

-- Question 209 - Multiple choice (Vacuum tubes replacement)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '_____ generation computers used transistors in place of vacuum tubes.',
  'multiple_choice',
  'First', 'Second', 'Third', 'Fourth',
  'B',
  'Second generation computers introduced transistors.'
);

-- Question 210 - Multiple choice (Machine language)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ generation computers allowed programming in machine language and solved only one problem at a time.',
  'multiple_choice',
  'First', 'Second', 'Third', 'Fourth',
  'A',
  'First generation computers were programmed in machine language.'
);

-- Question 211 - Multiple choice (Expensive generation)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ generation computers were very expensive to operate and maintain.',
  'multiple_choice',
  'First', 'Second', 'Third', 'Fourth',
  'A',
  'First generation computers were huge and expensive.'
);

-- Question 212 - Multiple choice (Vacuum tubes)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The first computers used _______ for circuitry and magnetic drums for memory.',
  'multiple_choice',
  'Transistors', 'Integrated circuits', 'Vacuum tubes', 'Registers',
  'C',
  'Vacuum tubes powered the first computers.'
);

-- Question 213 - Multiple choice (Machine readable)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Data must first be converted into a ______ format before processing.',
  'multiple_choice',
  'User readable', 'Print-ready', 'Machine readable', 'Analog only',
  'C',
  'Computers require machine-readable formats.'
);

-- Question 214 - Multiple choice (Instructions)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The computer reads in data and _______, does some processing, and stores the results.',
  'multiple_choice',
  'Deletes', 'Rewrites', 'Ignores', 'Instructions',
  'D',
  'Computers use instructions to process data.'
);

-- Question 215 - Multiple choice (Definition of computer)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'A _____ can be referred to as a programmable device that processes raw facts into useful information.',
  'multiple_choice',
  'Calculator', 'Computer', 'Printer', 'Transistor',
  'B',
  'A computer processes data into information.'
);

-- Question 216 - Multiple choice (Information goal)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'The statement: "The ultimate goal of data processing is to obtain information which will NOT control financial and administrative aspects" is:',
  'multiple_choice',
  'Correct', 'Wrong', 'Sometimes true', 'Conditional',
  'B',
  'The goal of processing is to provide information for decision making.'
);

-- Question 217 - Multiple choice (Basic operations)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'Basic data processing operations include the following EXCEPT:',
  'multiple_choice',
  'Data collection', 'Data recording', 'Information management', 'None of the above',
  'D',
  'All listed items are valid operations; therefore "none of the above" is correct.'
);

-- Question 218 - Multiple choice (Modern terminology)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  'In recent times, data processing systems are often referred to as ______ systems.',
  'multiple_choice',
  'Information', 'Analysis', 'Recording', 'Sorting',
  'A',
  'Modern terminology refers to information systems.'
);

-- Question 219 - Multiple choice (Indispensable systems)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '_____ processing systems have become indispensable in managing information in modern organisations.',
  'multiple_choice',
  'Manual', 'Electronic', 'Mechanical', 'Analog',
  'B',
  'Electronic systems dominate modern data management.'
);

-- Question 220 - Multiple choice (Electronic DP)
INSERT INTO questions (course_id, question_text, question_type,
  option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  v_course_id,
  '______ Data Processing is any automated process that converts raw data into useful information.',
  'multiple_choice',
  'Manual', 'Electronic', 'Analog', 'Physical',
  'B',
  'Electronic processing converts raw facts into information.'
);



-- (This is a large dataset. I stopped at Q75 in this batch. I can continue and produce the remaining INSERTs in subsequent batches.)
-- Commit if using transaction-managed environment
END;
