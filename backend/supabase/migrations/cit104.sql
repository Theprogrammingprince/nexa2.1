DO $$
DECLARE
    v_course_id UUID;
BEGIN
    SELECT id INTO v_course_id FROM courses WHERE code = 'CIT104' LIMIT 1;
    
    IF v_course_id IS NULL THEN
        RAISE EXCEPTION 'Course CIT104 not found. Please run course population migration first.';
    END IF;

    -- Q1 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The term _____ is referred to facts about a person, object or place.', 'multiple_choice', 'Information', 'Data', 'Process', 'System', 'B', 'Data refers to facts about a person, object or place.');

    -- Q2 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Processed data or a meaningful statement is referred to as _____.', 'fill_in_blank', 'Information', 'Information is processed data or a meaningful statement.');

    -- Q3 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ method of data processing involves the use of chalk, wall, pen, pencil and the like.', 'multiple_choice', 'mechanical method', 'electronic method', 'manual method', 'automatic method', 'C', 'The manual method involves the use of chalk, wall, pen, pencil and similar tools.');

    -- Q4 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The mechanical method of data processing involves the use of machines such as _____.', 'multiple_choice', 'computers and laptops', 'typewriter, roneo machines, adding machines', 'smartphones and tablets', 'calculators only', 'B', 'The mechanical method uses typewriter, roneo machines, adding machines and similar devices.');

    -- Q5 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The processing unit is made up of the Arithmetic and Logic Unit (ALU), the control unit and the _____.', 'fill_in_blank', 'main memory', 'The processing unit consists of ALU, control unit and main memory.');

    -- Q6 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'First Generation Electronic Computers were from _____ to _____.', 'multiple_choice', '1900 - 1920', '1937 - 1953', '1960 - 1975', '1980 - 1990', 'B', 'First generation computers existed from 1937 to 1953.');

    -- Q7 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'First generation computers used electronic switches in the form of _____.', 'multiple_choice', 'transistors', 'integrated circuits', 'vacuum tubes', 'microprocessors', 'C', 'First generation computers used vacuum tubes as electronic switches.');

    -- Q8 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The first general purpose programmable electronic computer was the _____.', 'fill_in_blank', 'ENIAC', 'ENIAC stands for Electronic Numerical Integrator and Computer.');

    -- Q9 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ generation saw the first two supercomputers designed specifically for numeric processing in scientific applications.', 'multiple_choice', 'first generation', 'second generation', 'third generation', 'fourth generation', 'B', 'The second generation saw the first supercomputers for scientific applications.');

    -- Q10 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ generation brought huge gains in computational power.', 'multiple_choice', 'First', 'Second', 'Third', 'Fourth', 'C', 'The third generation brought huge gains in computational power.');

    -- Q11 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Third generation computers used _____ circuits.', 'fill_in_blank', 'integrated', 'Third generation computers used integrated circuits.');

    -- Q12 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'There are basically _____ types of electronic computers.', 'multiple_choice', 'Two', 'Three', 'Four', 'Five', 'B', 'There are basically three types of electronic computers.');

    -- Q13 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ is the main unit of a PC.', 'fill_in_blank', 'system unit', 'The system unit is the main unit of a PC.');

    -- Q14 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ is used for purposes such as holding the program and its data.', 'multiple_choice', 'Hard disk', 'Random access memory (RAM)', 'ROM', 'Cache memory', 'B', 'RAM is used for holding the program and its data.');

    -- Q15 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ assists the CPU in its number-crunching activities.', 'fill_in_blank', 'math coprocessor', 'The math coprocessor assists the CPU in number-crunching activities.');

    -- Q16 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The earliest PCs were equipped with a CPU from Intel Corporation called the _____.', 'multiple_choice', '8086', '8088', '80286', '80386', 'B', 'The earliest PCs used the Intel 8088 CPU.');

    -- Q17 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The speed of a CPU is measured in _____.', 'multiple_choice', 'Bytes', 'Megahertz', 'Pixels', 'Volts', 'B', 'CPU speed is measured in Megahertz.');

    -- Q18 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The numeric keypad is used in combination with the _____ key to produce extended characters.', 'fill_in_blank', 'Alternate', 'The numeric keypad works with the Alternate (Alt) key to produce extended characters.');

    -- Q19 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'When the Shift key is pressed, the _____ on the alphanumeric keys are activated.', 'multiple_choice', 'lowercase letters', 'capital letters', 'numbers', 'symbols', 'B', 'The Shift key activates capital letters on alphanumeric keys.');

    -- Q20 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ key shifts all alphabetic characters into upper case (capital letters).', 'fill_in_blank', 'CapsLock', 'CapsLock shifts all alphabetic characters into upper case.');

    -- Q21 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ key can be used in combination with numeric keys to generate characters not shown on the keyboard.', 'multiple_choice', 'Shift', 'Control', 'Alternate', 'Tab', 'C', 'The Alternate key is used with numeric keys to generate special characters.');

    -- Q22 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Numlock key activates the _____.', 'multiple_choice', 'function keys', 'numeric keypad', 'arrow keys', 'escape key', 'B', 'The Numlock key activates the numeric keypad.');

    -- Q23 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ key is often used in text mode to perform block operations like mass deletion and insertion.', 'fill_in_blank', 'Control', 'The Control key is used for block operations in text mode.');

    -- Q24 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ key cancels an operation in progress.', 'multiple_choice', 'Delete', 'Escape', 'Enter', 'Backspace', 'B', 'The Escape key cancels an operation in progress.');

    -- Q25 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ computer measures rather than counts.', 'fill_in_blank', 'Analog', 'Analog computer measures rather than counts.');

    -- Q26 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Microcomputers are also known as _____.', 'multiple_choice', 'mainframe computers', 'single board computers', 'supercomputers', 'minicomputers', 'B', 'Microcomputers are also known as single board computers.');

    -- Q27 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Mini Computers have memory capacity in the range of _____.', 'multiple_choice', '64K bytes to 128K bytes', '128K bytes to 256K bytes', '256K bytes to 512K bytes', '512K bytes to 1MB', 'B', 'Mini computers have memory capacity in the range of 128K bytes to 256K bytes.');

    -- Q28 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ key is used to inform the computer the end of an input or command.', 'fill_in_blank', 'Return or Enter', 'The Return or Enter key is used to inform the computer the end of an input or command.');

    -- Q29 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ is the computer component that lets you create copies of the information stored in your computer on paper.', 'multiple_choice', 'scanner', 'monitor', 'printer', 'keyboard', 'C', 'A printer creates copies of information on paper.');

    -- Q30 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ combine a magnetic roller with powdered ink called toner to transfer high-quality characters or images onto a page.', 'multiple_choice', 'Dot matrix printers', 'Inkjet printers', 'Laser jet printers', 'Thermal printers', 'C', 'Laser jet printers use magnetic rollers with toner to transfer images onto pages.');

    -- Q31 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'VGA is _____.', 'fill_in_blank', '640x480', 'VGA resolution is 640x480.');

    -- Q32 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'SVGA is _____.', 'multiple_choice', '640x480', '800x600', '1024x768', '1280x1024', 'B', 'SVGA resolution is 800x600.');

    -- Q33 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ are peripheral devices used to digitize artwork, photographs, text, or other items from hard copy.', 'fill_in_blank', 'Scanners', 'Scanners are used to digitize items from hard copy.');

    -- Q34 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ refers to the suits of programs that facilitate the optimal use of the hardware systems.', 'multiple_choice', 'Application software', 'System software', 'Utility software', 'Database software', 'B', 'System software facilitates the optimal use of hardware systems.');

    -- Q35 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ operating system allows more than one active user program to be stored in main memory simultaneously.', 'multiple_choice', 'single-user', 'multiprogramming', 'batch', 'real-time', 'B', 'A multiprogramming operating system allows multiple user programs in main memory simultaneously.');

    -- Q36 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ system is a computer hardware configuration that includes more than one independent processing unit.', 'fill_in_blank', 'multiprocessing', 'A multiprocessing system includes more than one independent processing unit.');

    -- Q37 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ is the unit of work in a system.', 'multiple_choice', 'File', 'Process', 'Program', 'Task', 'B', 'A process is the unit of work in a system.');

    -- Q38 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ is a large array of words or bytes, each with its own address.', 'fill_in_blank', 'Memory', 'Memory is a large array of words or bytes, each with its own address.');

    -- Q39 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ is a collection of related information defined by its creator.', 'multiple_choice', 'program', 'file', 'process', 'directory', 'B', 'A file is a collection of related information defined by its creator.');

    -- Q40 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ refers to a mechanism for controlling the access of programs, processes, or users to the resources defined by a computer.', 'fill_in_blank', 'Protection', 'Protection refers to controlling access to computer resources.');

    -- Q41 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An _____ is a computer program that accepts a source program in assembly language and translates it into machine language.', 'multiple_choice', 'Interpreter', 'Compiler', 'Assembler', 'Linker', 'C', 'An assembler translates assembly language into machine language.');

    -- Q42 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An _____ is a program that accepts program in a source language, reads, translates and executes it line by line.', 'multiple_choice', 'Assembler', 'Compiler', 'Interpreter', 'Debugger', 'C', 'An interpreter translates and executes code line by line.');

    -- Q43 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ is a computer program that accepts a source program in one high-level language and translates it into machine language.', 'fill_in_blank', 'Compiler', 'A compiler translates high-level language into machine language.');

    -- Q44 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The stages in compilation include _____.', 'multiple_choice', 'Design, Testing, Debugging', 'Lexical analysis, Syntax analysis, Semantic analysis, Code generation', 'Input, Process, Output', 'Planning, Coding, Documentation', 'B', 'Compilation includes Lexical analysis, Syntax analysis, Semantic analysis, and Code generation.');

    -- Q45 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ is a set of commonly used programs in data processing departments also called service or general-purpose programs.', 'fill_in_blank', 'utility software', 'Utility software includes commonly used programs in data processing.');

    -- Q46 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ covers data transfer from any medium to another, making an exact copy or simultaneously editing and validating.', 'multiple_choice', 'file creation', 'file conversion', 'file deletion', 'file backup', 'B', 'File conversion covers data transfer from one medium to another.');

    -- Q47 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ makes an exact copy of a file from one medium to another.', 'multiple_choice', 'file transfer', 'file conversion', 'file copy', 'file backup', 'C', 'File copy makes an exact copy of a file from one medium to another.');

    -- Q48 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ include programs to clear areas of storage, writing file labels and updating common data.', 'fill_in_blank', 'housekeeping operation', 'Housekeeping operations include programs for clearing storage and updating data.');

    -- Q49 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ is used to create, edit, save and print reports.', 'multiple_choice', 'Spreadsheet', 'Database', 'Word Processor', 'Browser', 'C', 'Word Processor is used to create, edit, save and print reports.');

    -- Q50 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ are programs or packages that perform a variety of different processing operations using compatible data.', 'fill_in_blank', 'Integrated Packages', 'Integrated Packages perform various processing operations with compatible data.');

    -- Q51 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ are packages that enable you to bring out images, diagrams and pictures.', 'multiple_choice', 'Word processors', 'Graphic packages', 'Spreadsheets', 'Databases', 'B', 'Graphic packages enable creation of images, diagrams and pictures.');

    -- Q52 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ is software for designing, setting up and subsequently managing a database.', 'multiple_choice', 'word processor', 'spreadsheet', 'database package', 'graphics package', 'C', 'Database package is software for designing and managing databases.');

    -- Q53 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ are packages that can be used to solve statistical problems, e.g. SPSS.', 'fill_in_blank', 'Statistical package', 'Statistical packages are used to solve statistical problems.');

    -- Q54 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ are packages that can be used to produce books and documents in standard form.', 'multiple_choice', 'word processors', 'desktop publishing', 'spreadsheets', 'databases', 'B', 'Desktop publishing packages produce books and documents in standard form.');

    -- Q55 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ are packages that contain a lot of games for children and adults.', 'fill_in_blank', 'game packages', 'Game packages contain games for children and adults.');

    -- Q56 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'There are _____ basic types of instruction.', 'multiple_choice', 'two', 'three', 'four', 'five', 'C', 'There are four basic types of instruction: input/output, logic, arithmetic and branching.');

    -- Q57 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ instruction directs the computer to accept data from a specific input device.', 'multiple_choice', 'output', 'input', 'branch', 'arithmetic', 'B', 'Input instruction directs the computer to accept data from a specific input device.');

    -- Q58 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ instructions cause the computer to alter the sequence of execution of instruction within the program.', 'fill_in_blank', 'Branch', 'Branch instructions alter the sequence of execution within a program.');

    -- Q59 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'There are _____ basic types of branch instructions.', 'multiple_choice', 'One', 'Two', 'Three', 'Four', 'B', 'There are two basic types of branch instructions: conditional and unconditional.');

    -- Q60 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ program allows the programmer to take advantage of all the features of the computer system.', 'fill_in_blank', 'machine language', 'A machine language program allows full use of computer system features.');

    -- Q61 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In assembly language, the operation code is expressed as a combination of letters called _____.', 'multiple_choice', 'opcodes', 'mnemonics', 'symbols', 'variables', 'B', 'In assembly language, operation codes are expressed as mnemonics.');

    -- Q62 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'There are _____ stages of computer programming.', 'multiple_choice', '5', '6', '7', '8', 'D', 'There are 8 stages of computer programming.');

    -- Q63 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ is a graphical representation of the major steps of work in process.', 'fill_in_blank', 'Flowchart', 'A flowchart is a graphical representation of the major steps of work in a process.');

    -- Q64 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An _____ is a set of rules for carrying out calculation either by hand or a machine.', 'multiple_choice', 'Algorithm', 'Program', 'Flowchart', 'Protocol', 'A', 'An algorithm is a set of rules for carrying out calculations.');

    -- Q65 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ is a program design aid that serves the function of a flowchart in expressing the detailed logic of a program.', 'fill_in_blank', 'Pseudocode', 'Pseudocode serves as a program design aid like a flowchart.');

    -- Q66 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ are used to analyze a problem.', 'multiple_choice', 'Flowcharts', 'Algorithms', 'Decision tables', 'Pseudocodes', 'C', 'Decision tables are used to analyze problems.');

    -- Q67 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ is an opening title screen that appears when your application first begins.', 'multiple_choice', 'Login dialog', 'Splash screen', 'Options dialog', 'About box', 'B', 'A splash screen is an opening title screen when an application begins.');

    -- Q68 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A _____ is a dialog box that asks for the user''s ID and password as part of application security.', 'fill_in_blank', 'Login dialog', 'A login dialog asks for user ID and password for security.');

    -- Q69 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An _____ is a tabbed blank dialog box from which users can specify attributes for the application.', 'multiple_choice', 'About box', 'Options dialog', 'Login dialog', 'Splash screen', 'B', 'An options dialog allows users to specify application attributes.');

    -- Q70 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'An _____ is a dialog box that appears when users select Help, About from the application menu.', 'fill_in_blank', 'About box', 'An about box appears when users select Help, About from the menu.');

    -- Q71 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The basic feature of the _____ enables users to select operations through menus with the aid of a mouse.', 'multiple_choice', 'CLI', 'GUI', 'API', 'BIOS', 'B', 'GUI (Graphical User Interface) enables menu selection with a mouse.');

    -- Q72 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'One challenge of Web-based applications relates to privacy and _____ of personal data.', 'fill_in_blank', 'security', 'Web-based applications face challenges with privacy and security of personal data.');
    -- Q74 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Computing is fast becoming _____.', 'multiple_choice', 'obsolete', 'expensive', 'ubiquitous', 'rare', 'C', 'Computing is fast becoming ubiquitous (everywhere).');

    -- Q75 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The most commonly used method of protecting against viruses is to purchase software designed to _____ for all types of viruses.', 'fill_in_blank', 'scan', 'Antivirus software scans for all types of viruses.');

    -- Q76 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ can infect any files but usually attack .com, .exe, .sys files.', 'multiple_choice', 'Malware', 'Viruses', 'Trojans', 'Worms', 'B', 'Viruses can infect any files but usually attack executable files.');

    -- Q77 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Man''s advancement in _____ technology has led to the development of computer controlled electronic mail service.', 'fill_in_blank', 'information', 'Advancement in information technology led to development of email services.');

    -- Q78 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The computer is used to find solution to complex computations at incredible _____ and accuracy.', 'multiple_choice', 'cost', 'speed', 'size', 'weight', 'B', 'Computers solve complex computations at incredible speed and accuracy.');

    -- Q79 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ forecasting has become a daily activity where computers provide weather information.', 'multiple_choice', 'Economic', 'Weather', 'Stock', 'Political', 'B', 'Weather forecasting is a daily activity aided by computers.');

    -- Q80 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Desktop publishers use computers to format and create _____ material.', 'fill_in_blank', 'publication-ready', 'Desktop publishers create publication-ready material using computers.');

    -- Q81 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'CAD stands for _____.', 'multiple_choice', 'Computer Aided Drafting', 'Computer Aided Design', 'Computer Application Development', 'Central Application Database', 'B', 'CAD stands for Computer Aided Design.');

    -- Q82 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ has proved very effective and efficient in preparing utility bills based on meter readings.', 'fill_in_blank', 'Computer', 'The computer is effective and efficient in preparing utility bills.');

    -- Q83 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Tactical support systems deal with _____ and middle level management decisions.', 'multiple_choice', 'long-term', 'short-run', 'strategic', 'operational', 'B', 'Tactical support systems deal with short-run and middle level management decisions.');

    -- Q84 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The computer is used by auditors to report accurately on the transaction register which constitutes the audit _____.', 'multiple_choice', 'report', 'trail', 'log', 'record', 'B', 'The transaction register constitutes the audit trail.');

    -- Q85 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '_____ have been applied in virtually all fields of human endeavour.', 'fill_in_blank', 'Computers', 'Computers have been applied in virtually all fields of human endeavour.');

    -- Q86 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Microsoft _____ application software can be used for preparing slide shows, speeches, and seminars.', 'multiple_choice', 'Word', 'Excel', 'PowerPoint', 'Access', 'C', 'Microsoft PowerPoint is used for preparing presentations and slide shows.');

    -- Q87 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A robot is a _____ device that can physically manipulate its surroundings.', 'fill_in_blank', 'computer-controlled', 'A robot is a computer-controlled device that can physically manipulate its surroundings.');

    -- Q88 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Apart from use as an _____ aid, computers are used for keeping academic and administrative records.', 'multiple_choice', 'entertainment', 'instructional', 'financial', 'medical', 'B', 'Apart from instructional aid, computers keep academic and administrative records.');

    -- Q89 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ has become a universal tool of any modern person.', 'multiple_choice', 'Calculator', 'Computer', 'Telephone', 'Television', 'B', 'Computer has become a universal tool of any modern person.');

    -- Q90 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The Toolbox window does not contain any _____ tools.', 'fill_in_blank', 'menu-creation', 'The Toolbox window does not contain menu-creation tools.');

    -- Q91 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'You can generate menus for your applications using the application _____.', 'multiple_choice', 'compiler', 'wizard', 'debugger', 'linker', 'B', 'You can generate menus using the application wizard.');

    -- Q92 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ section of the Decision table contains the different combination of the conditions.', 'fill_in_blank', 'Condition entry', 'The condition entry section contains different combinations of conditions.');

    -- Q93 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In Visual Basic, a form can hold many _____.', 'multiple_choice', 'windows', 'controls', 'menus', 'toolbars', 'B', 'In Visual Basic, a form can hold many controls.');

    -- Q94 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'There are _____ packages specially written to prevent, detect and clean viruses.', 'multiple_choice', 'graphics', 'antivirus', 'database', 'spreadsheet', 'B', 'Antivirus packages prevent, detect and clean viruses.');

    -- Q95 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'In Visual Basic, a _____ is a collection of files that make up an application.', 'fill_in_blank', 'project', 'In Visual Basic, a project is a collection of files that make up an application.');

    -- Q96 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Computer _____ are destructive programs attached to Spam.', 'multiple_choice', 'games', 'viruses', 'utilities', 'applications', 'B', 'Computer viruses are destructive programs attached to spam.');

    -- Q97 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ section of the Decision table contains a list of all possible conditions.', 'fill_in_blank', 'Condition stub', 'The condition stub section contains a list of all possible conditions.');

    -- Q98 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Decision tables have standardized format and comprise of _____ sections.', 'multiple_choice', 'Two', 'Three', 'Four', 'Five', 'C', 'Decision tables comprise of four sections.');

    -- Q99 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A method of testing a program for correctness includes: Manual _____.', 'multiple_choice', 'compilation', 'walk-through', 'execution', 'documentation', 'B', 'Manual walk-through is a method of testing program correctness.');

    -- Q100 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The purpose of testing is to determine whether a program consistently produces _____ results.', 'fill_in_blank', 'expected', 'Testing determines whether a program consistently produces expected results.');

    -- Q101 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'After a program is coded, it is converted into machine _____ form.', 'multiple_choice', 'readable', 'sensible', 'logical', 'executable', 'B', 'After coding, a program is converted into machine sensible form.');

    -- Q102 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The Code of a program must be well laid out and explained with _____.', 'fill_in_blank', 'comments', 'Program code must be explained with comments.');

    -- Q103 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ serves the function of a flowchart in expressing the detailed logic of a program.', 'multiple_choice', 'Algorithm', 'Pseudocode', 'Decision table', 'Data dictionary', 'B', 'Pseudocode serves the function of a flowchart in expressing program logic.');

    -- Q104 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Visual Basic has a total of _____ toolbars.', 'multiple_choice', 'Two', 'Three', 'Four', 'Five', 'C', 'Visual Basic has a total of four toolbars.');

    -- Q105 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A Word Processor is used to create, _____, save and print reports.', 'fill_in_blank', 'edit', 'A Word Processor is used to create, edit, save and print reports.');

    -- Q106 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'For each high-level language except Basic, there is a different _____.', 'multiple_choice', 'interpreter', 'compiler', 'assembler', 'linker', 'B', 'For each high-level language except Basic, there is a different compiler.');

    -- Q107 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Languages that translate other languages to _____ language are called Language Translator.', 'fill_in_blank', 'machine', 'Languages that translate to machine language are called Language Translators.');

    -- Q108 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The operating system provides a uniform _____ view of information storage.', 'multiple_choice', 'physical', 'logical', 'virtual', 'abstract', 'B', 'The operating system provides a uniform logical view of information storage.');

    -- Q109 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'One purpose of an operating system is to _____ the peculiarities of specific hardware devices from the user.', 'multiple_choice', 'expose', 'hide', 'display', 'modify', 'B', 'An operating system hides hardware peculiarities from users.');

    -- Q110 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Real time operating systems are designed to service applications where _____ time is of the essence.', 'fill_in_blank', 'response', 'Real-time OS are designed where response time is of the essence.');

    -- Q111 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The usefulness of the computer depends on the _____ that are written to manipulate it.', 'multiple_choice', 'hardware', 'programs', 'peripherals', 'systems', 'B', 'Computer usefulness depends on the programs written to manipulate it.');

    -- Q112 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ equipment are not computers but are necessary in a computing environment.', 'fill_in_blank', 'auxiliary', 'Auxiliary equipment are not computers but necessary in computing environments.');

    -- Q113 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Scanners are used to _____ artwork, photographs, text from hard copy.', 'multiple_choice', 'print', 'digitize', 'display', 'store', 'B', 'Scanners digitize artwork, photographs and text from hard copy.');

    -- Q114 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A small picture that represents either a program or a shortcut is _____.', 'multiple_choice', 'a window', 'an icon', 'a menu', 'a toolbar', 'B', 'An icon is a small picture representing a program or shortcut.');

    -- Q115 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A directory is also known as a _____.', 'fill_in_blank', 'folder', 'A directory is also known as a folder.');

    -- Q116 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A mouse is used to give _____ to a computer.', 'multiple_choice', 'power', 'instructions', 'data', 'programs', 'B', 'A mouse is used to give instructions to a computer.');

    -- Q117 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Switching on the system is called _____.', 'fill_in_blank', 'booting', 'Switching on the system is called booting.');

    -- Q118 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Computer machinery is the _____.', 'multiple_choice', 'software', 'hardware', 'firmware', 'middleware', 'B', 'Computer machinery is the hardware.');

    -- Q119 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'FORTRAN is a _____ level language.', 'multiple_choice', 'low', 'high', 'machine', 'assembly', 'B', 'FORTRAN is a high level language.');

    -- Q120 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The _____ key is used to inform the computer the end of an input or command.', 'fill_in_blank', 'Return', 'The Return key informs the computer of the end of an input or command.');

    -- Q121 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Computer keyboard is _____ to the conventional typewriter keyboard.', 'multiple_choice', 'different from', 'identical', 'superior', 'inferior', 'B', 'A computer keyboard is identical to the conventional typewriter keyboard.');

    -- Q122 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The electronic components in your PC generate a lot of _____.', 'fill_in_blank', 'heat', 'Electronic components in a PC generate a lot of heat.');

    -- Q123 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Microcomputers are the _____ class of computers.', 'multiple_choice', 'most expensive', 'cheapest', 'fastest', 'largest', 'B', 'Microcomputers are the cheapest class of computers.');

    -- Q124 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ computers are designed to handle wide range of problems.', 'multiple_choice', 'Special purpose', 'General purpose', 'Analog', 'Hybrid', 'B', 'General purpose computers handle a wide range of problems.');

    -- Q125 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A special purpose computer is designed to solve a _____ class of problems.', 'fill_in_blank', 'restricted', 'Special purpose computers solve a restricted class of problems.');

    -- Q126 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Digital computer represents its variable in the form of _____.', 'multiple_choice', 'waves', 'digits', 'signals', 'voltages', 'B', 'Digital computers represent variables in the form of digits.');

    -- Q127 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Computer _____.', 'multiple_choice', 'can think', 'cannot think', 'can feel', 'can reason', 'B', 'Computer cannot think.');

    -- Q128 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'GUI stands for _____.', 'fill_in_blank', 'Graphical User Interface', 'GUI stands for Graphical User Interface.');

    -- Q129 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A window is a _____ box that contains icons or data.', 'multiple_choice', 'circular', 'rectangular', 'triangular', 'oval', 'B', 'A window is a rectangular box that contains icons or data.');

    -- Q130 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A menu is a _____ of items.', 'fill_in_blank', 'list', 'A menu is a list of items.');

    -- Q131 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An operating system is the software responsible for controlling the allocation and usage of _____ resources.', 'multiple_choice', 'software', 'hardware', 'network', 'user', 'B', 'An operating system controls allocation and usage of hardware resources.');

    -- Q132 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A program is a set of _____ that tells the computer what to do.', 'multiple_choice', 'data', 'instructions', 'files', 'folders', 'B', 'A program is a set of instructions that tells the computer what to do.');

    -- Q133 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Computer programs used on a computer are called _____.', 'fill_in_blank', 'software', 'Computer programs are called software.');

    -- Q134 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'CPU stands for _____.', 'multiple_choice', 'Central Program Unit', 'Central Processing Unit', 'Computer Processing Unit', 'Central Peripheral Unit', 'B', 'CPU stands for Central Processing Unit.');

    -- Q135 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Terminal is an _____ device.', 'fill_in_blank', 'input/output', 'Terminal is an input/output device.');

    -- Q136 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'ROM stands for _____.', 'multiple_choice', 'Read Only Memory', 'Random Only Memory', 'Read Or Memory', 'Random Output Memory', 'A', 'ROM stands for Read Only Memory.');

    -- Q137 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A PC is a _____ computer.', 'multiple_choice', 'high-cost mainframe', 'low-cost desktop', 'supercomputer', 'minicomputer', 'B', 'A PC is a low-cost desktop computer.');

    -- Q138 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A computer is an _____ machine that can process and store data.', 'fill_in_blank', 'electronic', 'A computer is an electronic machine that can process and store data.');

    -- Q139 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Keyboard is an _____ device.', 'multiple_choice', 'output', 'input', 'storage', 'processing', 'B', 'Keyboard is an input device.');

    -- Q140 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Computer stores _____.', 'multiple_choice', 'only data', 'only instructions', 'both data and instructions', 'neither data nor instructions', 'C', 'Computer stores both data and instructions.');

    -- Q141 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'CPU is _____ unit + ALU.', 'fill_in_blank', 'Control', 'CPU is Control unit + ALU.');

    -- Q142 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'ROM is an _____ memory.', 'multiple_choice', 'external', 'internal', 'virtual', 'cache', 'B', 'ROM is an internal memory.');

    -- Q143 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Mouse is an _____ device.', 'multiple_choice', 'output', 'storage', 'input', 'processing', 'C', 'Mouse is an input device.');

    -- Q144 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Collection of computer programs is called _____.', 'fill_in_blank', 'software', 'Collection of computer programs is called software.');

    -- Q145 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ computers operate essentially by counting.', 'multiple_choice', 'Analog', 'Digital', 'Hybrid', 'Mechanical', 'B', 'Digital computers operate essentially by counting.');

    -- Q146 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Computing is fast becoming _____.', 'fill_in_blank', 'ubiquitous', 'Computing is fast becoming ubiquitous.');

    -- Q147 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In Visual Basic, a form can hold many _____.', 'multiple_choice', 'projects', 'controls', 'windows', 'databases', 'B', 'In Visual Basic, a form can hold many controls.');

    -- Q148 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ packages are specially written to prevent, detect and clean viruses.', 'multiple_choice', 'Database', 'Antivirus', 'Graphics', 'Utility', 'B', 'Antivirus packages prevent, detect and clean viruses.');

    -- Q149 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Before a computer can be put to meaningful use, the user must define a _____ sequence of operations.', 'fill_in_blank', 'unit', 'The user must define a unit sequence of operations known as an algorithm.');

    -- Q150 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, '_____ are drawn with the help of symbols.', 'multiple_choice', 'Algorithms', 'Flowcharts', 'Pseudocodes', 'Programs', 'B', 'Flowcharts are drawn with the help of symbols.');

END $$;