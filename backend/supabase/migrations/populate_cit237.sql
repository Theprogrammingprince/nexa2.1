DO $$
DECLARE
    -- The variable to hold the Course UUID for CIT237
    v_course_id UUID;
BEGIN
    -- Retrieve the Course ID for CIT237
    SELECT id INTO v_course_id FROM courses WHERE code = 'CIT237' LIMIT 1;
    
    -- Check if the course exists, if not raise an error
    IF v_course_id IS NULL THEN
        RAISE EXCEPTION 'Course CIT237 not found in courses table. Please ensure the course exists before running this migration.';
    END IF;

    -- Q1 (MC) - Programming Language Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Programming languages are primarily designed to communicate ideas about algorithms between human beings and which other entity?', 'multiple_choice', 'The database system', 'Network servers', 'Computers', 'Peripheral devices', 'C', 'Programming languages bridge the gap between human logic and computer execution.');

    -- Q2 (MC) - Programming Language Function
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the main task we instruct the computer to carry out using programming languages?', 'multiple_choice', 'Hardware maintenance', 'Process execution or tasks', 'Firmware updates', 'Network configuration', 'B', 'Programming languages direct the computer to carry out specific processes or tasks.');

    -- Q3 (MC) - Algorithm Execution
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Programming languages can be used to execute a wide range of:', 'multiple_choice', 'Operating systems', 'Hardware drivers', 'Algorithms', 'Data structures only', 'C', 'Algorithms are the computational procedures that languages implement.');

    -- Q4 (MC) - Execution Procedure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An instruction written in a programming language may be executed through more than one:', 'multiple_choice', 'Compilation step', 'Procedure of execution', 'Hardware upgrade', 'Debugging session', 'B', 'Flexibility in execution procedure is a characteristic of programming languages.');

    -- Q5 (MC) - Algorithm Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following best defines an algorithm?', 'multiple_choice', 'A sequence of ambiguous thoughts', 'A non-deterministic function', 'A finite sequence of unambiguous instructions for solving a problem', 'A collection of random data elements', 'C', 'Key characteristics of an algorithm include being finite and unambiguous.');

    -- Q6 (MC) - Data Structure Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A means of organizing related data items is referred to as a:', 'multiple_choice', 'Algorithm', 'Program', 'Data Structure', 'Source Code', 'C', 'Data structures organize data for efficient access and modification.');

    -- Q7 (MC) - Programming Process
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The process of writing programs is called:', 'multiple_choice', 'Compiling', 'Programming', 'Assembling', 'Debugging', 'B', 'Programming is the act of creating the set of instructions (programs).');

    -- Q8 (MC) - Object-Oriented Example
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of these languages is explicitly mentioned as an example of an Object-Oriented Programming language?', 'multiple_choice', 'FORTRAN', 'Assembly Language', 'Java', 'COBOL', 'C', 'Java is a widely known object-oriented programming language.');

    -- Q9 (MC) - Language Translation Program
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the specific program that converts programs written in assembly language into machine code?', 'multiple_choice', 'Compiler', 'Interpreter', 'Assembler', 'Debugger', 'C', 'An assembler handles the translation of assembly language (low-level code).');

    -- Q10 (MC) - Programming Language Levels
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The general number of recognized levels of programming languages is:', 'multiple_choice', 'Two (Low and High)', 'Three (Low, Middle, High)', 'Four (1GL, 2GL, 3GL, 4GL)', 'Five (1GL to 5GL)', 'B', 'While often categorized into generations, standard structural levels are often grouped into three: Machine/Low, Assembly/Middle, and High-level.');

    -- Q11 (MC) - Low-Level Synonym
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Low level programming is also commonly referred to as:', 'multiple_choice', 'Source Code', 'Machine Code', 'Assembly Language', 'High-Level Code', 'C', 'Assembly language is the closest human-readable form of low-level programming.');

    -- Q12 (MC) - Optimization Technique
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which optimization technique belongs to the family of local search algorithms?', 'multiple_choice', 'Binary Search', 'Quick Sort', 'Hill Climbing', 'Dynamic Programming', 'C', 'Hill climbing is a technique for finding an optimal solution in a local search space.');

    -- Q13 (MC) - Efficiency Measurement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which type of efficiency analysis seeks to provide information on performance based on random input data?', 'multiple_choice', 'Worst-case efficiency', 'Best-case efficiency', 'Average-case efficiency', 'Amortized efficiency', 'C', 'Average-case efficiency analyzes performance over a typical, or random, set of inputs.');

    -- Q14 (MC) - Linked List Structure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Linked List is a sequence of zero or more elements called:', 'multiple_choice', 'Vertices', 'Pointers', 'Nodes', 'Arrays', 'C', 'Nodes are the fundamental elements of a linked list, holding data and a pointer/reference.');

    -- Q15 (MC) - Data Structure Restriction
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A data structure where insertion (push) and deletion (pop) are restricted to only one end (the top) is known as a:', 'multiple_choice', 'Queue', 'Array', 'Stack', 'Tree', 'C', 'This LIFO (Last-In, First-Out) behavior defines a Stack.');

    -- Q16 (MC) - Algorithm Characteristic (Finite)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What term describes the property that an algorithm must always terminate after a finite number of steps?', 'multiple_choice', 'Efficiency', 'Finiteness', 'Feasibility', 'Clarity', 'B', 'Finiteness is a required property for any algorithm.');

    -- Q17 (MC) - Programming Language Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The languages through which we can instruct the computer to carry out some processes are generally called:', 'multiple_choice', 'Natural languages', 'Markup languages', 'Programming languages', 'Query languages', 'C', 'This is the fundamental definition of programming languages.');

    -- Q18 (MC) - Program Structure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A set of codes that instructs the computer to carry out some processes is called:', 'multiple_choice', 'An algorithm', 'A compiler', 'A program', 'A database', 'C', 'A program is the collection of executable codes/instructions.');

    -- Q19 (MC) - Translation Requirement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which type of language typically requires an Assembler for execution?', 'multiple_choice', 'High-Level', 'Object-Oriented', 'Assembly Language', 'Fourth Generation Language', 'C', 'The Assembler is specifically designed for Assembly Language.');

    -- Q20 (MC) - Language Level Distance
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language level is generally considered the most machine-dependent?', 'multiple_choice', 'High-Level', 'Assembly', 'Scripting', 'Natural', 'B', 'Assembly language is tightly coupled with the machine architecture.');

    -- Q21 (MC) - Linked List Component
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In a linked list, each element (node) generally contains the data and a reference to the:', 'multiple_choice', 'Root node', 'Previous node only', 'Next node', 'All other nodes', 'C', 'A singly linked list uses a reference to the next node.');

    -- Q22 (MC) - Local Search Characteristic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Hill Climbing optimization technique is known for seeking solutions in a ___ area.', 'multiple_choice', 'Global', 'Local', 'Distributed', 'Recursive', 'B', 'It is defined as belonging to the family of local search.');

    -- Q23 (MC) - Time Complexity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The process of determining the resources required for an algorithm to run (time and space) is called:', 'multiple_choice', 'Debugging', 'Algorithmic analysis', 'Program writing', 'Code compilation', 'B', 'Algorithmic analysis evaluates efficiency and resource usage.');

    -- Q24 (MC) - Abstraction Level
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'High-level programming languages primarily focus on maximizing convenience for the:', 'multiple_choice', 'Computer hardware', 'Programmer', 'Assembler', 'Operating system kernel', 'B', 'High-level languages prioritize human readability and writing speed.');

    -- Q25 (MC) - Data Organization Principle
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The concept of organizing related data items is foundational to the study of:', 'multiple_choice', 'Networking protocols', 'Computer architecture', 'Data structures', 'Software testing', 'C', 'Data structures are specifically about organizing data.');

    -- Q26 (MC) - Programming Paradigm Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Object-Oriented paradigm is characterized by organizing code around objects rather than:', 'multiple_choice', 'Data structures', 'Algorithms', 'Functions and logic', 'Input/Output', 'C', 'OOP shifted focus from procedural functions to data and objects.');

    -- Q27 (MC) - Code Generation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the human-readable set of statements written by a programmer that constitutes the program?', 'multiple_choice', 'Machine Code', 'Bytecode', 'Source Code', 'Executable File', 'C', 'Source code is the input to the compiler/interpreter.');

    -- Q28 (MC) - Algorithm Unambiguity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The instructions in an algorithm must be:', 'multiple_choice', 'Complex', 'Ambiguous', 'Unambiguous', 'Sequential only', 'C', 'Unambiguous means each step is clearly defined and leaves no room for multiple interpretations.');

    -- Q29 (MC) - Low-Level Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Low-level programming (Assembly Language) is often used for tasks requiring direct manipulation of:', 'multiple_choice', 'Database tables', 'User interface elements', 'Hardware registers', 'Web service APIs', 'C', 'Low-level languages interact closely with hardware.');

    -- Q30 (MC) - Language Level Classification
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language level is immediately translated into machine code without an assembler?', 'multiple_choice', 'High-Level Language', 'Second Generation Language', 'Machine Language (1GL)', 'Scripting Language', 'C', 'Machine Language is the native instruction set, requiring no further translation.');

    -- Q31 (MC) - Linear Data Structure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which data structure is fundamentally characterized by a sequential arrangement of elements, where each element is connected to the next?', 'multiple_choice', 'Hash Table', 'Tree', 'Linked List', 'Graph', 'C', 'A linked list is a linear collection of elements.');

    -- Q32 (MC) - Efficiency Terminology
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The worst-case efficiency of an algorithm determines the performance for an input that is most likely to cause:', 'multiple_choice', 'A crash', 'Maximum execution time', 'Minimum execution time', 'A memory leak', 'B', 'Worst-case complexity identifies the upper bound of running time.');

    -- Q33 (MC) - Optimization Goal
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In Hill Climbing, the primary goal is to find a solution that represents a local:', 'multiple_choice', 'Valley', 'Maximum (or minimum)', 'Saddle point', 'Random input', 'B', 'It searches for a peak (maximum) or valley (minimum) in the search space.');

    -- Q34 (MC) - Language Generation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Languages like Python and Java are typically classified under the:', 'multiple_choice', 'First Generation (1GL)', 'Second Generation (2GL)', 'Third Generation (3GL)', 'Fourth Generation (4GL)', 'C', 'They are high-level languages and are part of the third generation.');

    -- Q35 (MC) - Abstract Data Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which data structure follows the First-In, First-Out (FIFO) principle, allowing insertion at the rear and deletion from the front?', 'multiple_choice', 'Stack', 'Queue', 'Array', 'Linked List (General)', 'B', 'FIFO is the defining characteristic of a Queue.');

    -- Q36 (MC) - Algorithm Output
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A properly designed algorithm must produce one or more specified:', 'multiple_choice', 'Errors', 'Inputs', 'Outputs', 'Variables', 'C', 'Algorithms must generate results (outputs) based on input.');

    -- Q37 (MC) - Programming Language Role
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The core function of programming languages is to provide a syntax for expressing:', 'multiple_choice', 'Hardware configurations', 'Database connections', 'Computational procedures', 'Operating system patches', 'C', 'They provide the structure to write code for computation.');

    -- Q38 (MC) - Low-Level Code characteristic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Low level programming code is generally known for being highly optimized for:', 'multiple_choice', 'Readability', 'Development speed', 'Execution speed', 'Portability', 'C', 'Its closeness to the machine allows for maximum performance control.');

    -- Q39 (MC) - Language Translation Speed
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which translation approach executes source code line-by-line, translating and running as it goes?', 'multiple_choice', 'Compiling', 'Interpreting', 'Assembling', 'Debugging', 'B', 'Interpreters translate and execute sequentially.');

    -- Q40 (MC) - OOP Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In Object-Oriented Programming, the concept of bundling data and methods that operate on that data into a single unit is called:', 'multiple_choice', 'Polymorphism', 'Inheritance', 'Abstraction', 'Encapsulation', 'D', 'Encapsulation hides implementation details and groups related members.');

    -- Q41 (MC) - Source Code Language
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Source code is written in a programming language, which is fundamentally a language for:', 'multiple_choice', 'Computers only', 'Humans and computers', 'Databases only', 'Operating systems only', 'B', 'Programming languages are designed for both human understanding and computer execution.');

    -- Q42 (MC) - Linked List Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Doubly Linked List differs from a Singly Linked List by having pointers to both the next node and the:', 'multiple_choice', 'Root node', 'Previous node', 'Tail node', 'First node', 'B', 'Doubly linked lists allow traversal in both directions.');

    -- Q43 (MC) - Optimization Search Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Hill climbing starts with an arbitrary solution and attempts to find a better one by incrementally changing a single element. This is characteristic of:', 'multiple_choice', 'Global search', 'Randomized search', 'Local search', 'Breadth-first search', 'C', 'Hill climbing is explicitly a local search technique.');

    -- Q44 (MC) - Average Case Input
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Average-case efficiency analysis is based on inputs that are considered:', 'multiple_choice', 'Worst-case scenarios', 'Pre-defined patterns', 'Random or typical', 'Best-case scenarios', 'C', 'It provides information on the performance with random input.');

    -- Q45 (MC) - Algorithm Requirement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'For an algorithm to be effective, its instructions must be precise enough to ensure the same input always produces the same output. This is the property of:', 'multiple_choice', 'Effectiveness', 'Definiteness', 'Tractability', 'Generality', 'B', 'Definiteness requires every step to be unambiguous and yield predictable results.');

    -- Q46 (MC) - Data Structure Benefit
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The main advantage of using appropriate data structures is the enhancement of a program''s:', 'multiple_choice', 'Compilation time', 'Network latency', 'Data access and modification efficiency', 'Code aesthetic', 'C', 'Data structures are chosen to optimize operational efficiency.');

    -- Q47 (MC) - Programming Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The ultimate result of the process of programming is the creation of a:', 'multiple_choice', 'Hardware device', 'Compiled program', 'Network protocol', 'Algorithm analysis', 'B', 'Programming creates the final program or application.');

    -- Q48 (MC) - OOP Language
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which core OOP concept allows a new class to inherit properties and behaviors from an existing class?', 'multiple_choice', 'Polymorphism', 'Inheritance', 'Abstraction', 'Instantiation', 'B', 'Inheritance is key for code reuse in OOP.');

    -- Q49 (MC) - Language Levels Order
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which sequence correctly orders programming languages from lowest level to highest level?', 'multiple_choice', 'Assembly, C++, Machine', 'Machine, Assembly, Java', 'Java, Assembly, Machine', 'C++, Java, Assembly', 'B', 'Machine (1GL) is lowest, then Assembly (2GL), then Java/C++ (3GL).');

    -- Q50 (MC) - Translator Role
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An Assembler''s function is analogous to a compiler, but it specifically targets the conversion of ___ code.', 'multiple_choice', 'High-level', 'Markup', 'Assembly', 'Scripting', 'C', 'Assemblers convert assembly language to machine code.');

    -- Q51 (MC) - Data Structure Flexibility
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Unlike arrays, the size of a linked list is generally considered:', 'multiple_choice', 'Fixed', 'Static', 'Dynamic', 'Unknown', 'C', 'Linked lists can grow or shrink at runtime easily.');

    -- Q52 (MC) - Efficiency Measure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Big O notation is primarily used to express an algorithm''s:', 'multiple_choice', 'Exact running time', 'Memory address', 'Asymptotic complexity (scalability)', 'User interface design', 'C', 'Big O describes how runtime or space requirements scale with input size.');

    -- Q53 (MC) - Optimization Limitation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A major limitation of the Hill Climbing technique is that it can easily get stuck at a:', 'multiple_choice', 'Global minimum', 'Local optimum', 'Random neighbor', 'Starting point', 'B', 'It only looks locally and may miss the best (global) solution.');

    -- Q54 (MC) - Algorithm Input
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Algorithms typically receive zero or more quantities as:', 'multiple_choice', 'Instructions', 'Outputs', 'Parameters (Inputs)', 'Results', 'C', 'Inputs are the data on which the algorithm operates.');

    -- Q55 (MC) - Programming Language Types
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Languages such as Machine Code, Assembly, and High-Level are primarily categorized based on their level of:', 'multiple_choice', 'Popularity', 'Syntax complexity', 'Abstraction from hardware', 'Compilation speed', 'C', 'The level of detail required for hardware interaction defines the language level.');

    -- Q56 (MC) - Data Structure Operation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In a Stack, the operation used to insert a new element is known as:', 'multiple_choice', 'Dequeue', 'Peek', 'Push', 'Pop', 'C', 'Push adds an element to the top of the stack.');

    -- Q57 (MC) - Programming Principle
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The primary focus of the process of writing programs is on achieving:', 'multiple_choice', 'Minimal code comments', 'Functional requirements', 'Maximum hardware utilisation', 'Random input generation', 'B', 'The goal of programming is to meet the requirements of the intended function.');

    -- Q58 (MC) - OOP Characteristic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Java is widely used because it supports the concept of running on different platforms without recompilation, due to the:', 'multiple_choice', 'Native code compilation', 'Virtual Machine (JVM)', 'Direct hardware access', 'High-level assembler', 'B', 'The JVM provides platform independence for Java bytecode.');

    -- Q59 (MC) - Translation Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A program that translates an entire source code file into an executable file before any execution begins is a:', 'multiple_choice', 'Assembler', 'Interpreter', 'Compiler', 'Debugger', 'C', 'Compilers process the whole file prior to running.');

    -- Q60 (MC) - Data Organization Use
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The use of data structures is critical in computer science for the efficient management of:', 'multiple_choice', 'Memory addresses', 'Data items', 'Network packets', 'CPU cycles', 'B', 'Data structures dictate how data is stored and retrieved.');

    -- Q61 (MC) - Linked List Head
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The beginning of a linked list is typically referenced by a special pointer called the:', 'multiple_choice', 'Tail', 'Root', 'Head', 'Index', 'C', 'The Head pointer points to the first node.');

    -- Q62 (MC) - Algorithm Constraint
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The instruction set of an algorithm must be unambiguous, which means each instruction must be:', 'multiple_choice', 'Simple', 'Clear and executable', 'Vague', 'Recursive', 'B', 'Clear and executable ensures definiteness.');

    -- Q63 (MC) - Complexity Measure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which measure of efficiency describes the algorithmic complexity for the set of inputs that lead to the most favorable run time?', 'multiple_choice', 'Worst-case', 'Average-case', 'Best-case', 'Random-case', 'C', 'Best-case identifies the lower bound of running time.');

    -- Q64 (MC) - Search Technique
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If an optimization algorithm is classified as a local search, it primarily explores the immediate ___ of the current solution.', 'multiple_choice', 'Global space', 'Neighborhood', 'Worst-case inputs', 'Data structure', 'B', 'Local search explores the adjacent solutions, or neighborhood.');

    -- Q65 (MC) - Programming Language Characteristic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which characteristic allows programming languages to communicate ideas effectively between human developers?', 'multiple_choice', 'Low-level syntax', 'Mathematical notation', 'Use of natural language constructs', 'Direct hardware access', 'C', 'They use readable constructs to express complex logic.');

    -- Q66 (MC) - Stack Operation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The operation to remove an element from a Stack is called:', 'multiple_choice', 'Push', 'Peek', 'Extract', 'Pop', 'D', 'Pop removes the topmost element.');

    -- Q67 (MC) - OOP Principle
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The ability of an object to take on many forms, often implemented through method overriding or overloading, is known as:', 'multiple_choice', 'Inheritance', 'Polymorphism', 'Abstraction', 'Encapsulation', 'B', 'Polymorphism means "many forms".');

    -- Q68 (MC) - Language Level
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language level typically uses mnemonics (short, symbolic names) for machine instructions?', 'multiple_choice', 'Machine Language', 'Assembly Language', 'High-Level Language', 'Scripting Language', 'B', 'Mnemonics are characteristic of Assembly Language.');

    -- Q69 (MC) - Translation Requirement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Programs written in Machine Language require which type of translator before execution?', 'multiple_choice', 'Assembler', 'Compiler', 'Interpreter', 'None (executed directly)', 'D', 'Machine language is the CPU''s native language.');

    -- Q70 (MC) - Source Code vs. Machine Code
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The primary difference between Source Code and Machine Code is that Source Code is written for:', 'multiple_choice', 'The computer to read easily', 'Human understanding', 'Direct hardware execution', 'Network transmission', 'B', 'Source code prioritizes human development and maintenance.');

    -- Q71 (MC) - Data Structure Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following is NOT a linear data structure?', 'multiple_choice', 'Queue', 'Stack', 'Tree', 'Linked List', 'C', 'Trees are hierarchical (non-linear) data structures.');

    -- Q72 (MC) - Algorithm Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The core purpose of defining an algorithm is to provide a systematic method for:', 'multiple_choice', 'Generating random numbers', 'Solving a problem', 'Debugging software', 'Installing an operating system', 'B', 'Algorithms are problem-solving recipes.');

    -- Q73 (MC) - Efficiency Analysis
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'When analyzing the running time of a sorting algorithm, the scenario where the input array is already sorted would typically represent the:', 'multiple_choice', 'Worst-case', 'Average-case', 'Best-case', 'Amortized-case', 'C', 'An already sorted array often yields the best-case running time for many sorting algorithms.');

    -- Q74 (MC) - Optimization Technique
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Hill climbing relies on choosing the neighboring state that yields the largest improvement, which is a characteristic of a ___ approach.', 'multiple_choice', 'Greedy', 'Recursive', 'Divide-and-conquer', 'Dynamic', 'A', 'Choosing the locally best option is a greedy choice.');

    -- Q75 (MC) - Language Generation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The development of ___ languages marked the beginning of programming that was highly portable across different hardware platforms.', 'multiple_choice', 'First Generation', 'Low-Level', 'High-Level', 'Assembly', 'C', 'High-level languages were designed to be machine-independent.');

    -- Q76 (MC) - Data Structure Manipulation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The ability to easily perform insertion and deletion without shifting large blocks of memory is a key advantage of:', 'multiple_choice', 'Arrays', 'Linked Lists', 'Hash Maps', 'Vectors', 'B', 'Linked lists only require updating pointers, not moving elements.');

    -- Q77 (MC) - Programming Process Outcome
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The result of the process of writing programs is executable code that allows the computer to carry out:', 'multiple_choice', 'Human emotions', 'Design blueprints', 'Specified processes', 'Random tasks', 'C', 'The program enables the computer to execute defined processes.');

    -- Q78 (MC) - OOP Key Concept
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Abstraction in OOP primarily involves showing essential information and ___ unnecessary details.', 'multiple_choice', 'Duplicating', 'Exposing', 'Hiding', 'Serializing', 'C', 'Abstraction simplifies complexity by hiding implementation details.');

    -- Q79 (MC) - Translator Input
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Compiler takes the entire ___ as input before producing machine code.', 'multiple_choice', 'Assembly code', 'Source code', 'Output data', 'Operating system file', 'B', 'Compilers require the full source code file.');

    -- Q80 (MC) - Language Level Distance
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which language level uses instructions that correspond directly to the operation codes recognized by the CPU?', 'multiple_choice', 'High-Level', 'Fourth Generation', 'Machine Language', 'Scripting Language', 'C', 'Machine language uses the native OpCodes.');

    -- Q81 (MC) - Data Structure Analogy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Queue data structure is analogous to which real-world scenario?', 'multiple_choice', 'A stack of plates', 'A library catalog', 'A line of people waiting (FIFO)', 'A branching family tree', 'C', 'Queues follow a First-In, First-Out (FIFO) principle.');

    -- Q82 (MC) - Algorithm Requirement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The process described by an algorithm must be executable by a machine or person using simple operations. This is the property of:', 'multiple_choice', 'Finiteness', 'Definiteness', 'Effectiveness', 'Input/Output', 'C', 'Effectiveness ensures all steps can be practically executed.');

    -- Q83 (MC) - Average Case Application
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Average-case efficiency is often the most practical measure for an algorithm intended for ___ use.', 'multiple_choice', 'Experimental', 'Worst-case', 'General, everyday', 'Debugging', 'C', 'It reflects typical real-world performance.');

    -- Q84 (MC) - Hill Climbing Element
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What guides the Hill Climbing algorithm from one state to the next?', 'multiple_choice', 'Random selection', 'A cost function', 'The global maximum', 'A heuristic evaluation function', 'D', 'The heuristic function evaluates the quality of the current state and its neighbors.');

    -- Q85 (MC) - Language Comparison
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The difference in complexity between Assembly Language and High-Level Languages is primarily due to the level of ___ provided.', 'multiple_choice', 'Security', 'Abstraction', 'Memory storage', 'Debugging tools', 'B', 'High-level languages offer greater abstraction.');

    -- Q86 (MC) - Data Structure Node
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The term "node" is commonly associated with which types of data structures?', 'multiple_choice', 'Arrays and Stacks', 'Linked Lists and Trees', 'Queues and Hash Tables', 'Vectors and Strings', 'B', 'Nodes are the elements in pointer-based structures like lists and trees.');

    -- Q87 (MC) - Programming Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The reason programmers use languages to instruct computers is to enable the computer to perform complex:', 'multiple_choice', 'Manual tasks', 'Computational processes', 'Electrical repairs', 'Stylistic designs', 'B', 'Programming focuses on computational tasks.');

    -- Q88 (MC) - Java Platform Independence
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Java compiler produces an intermediate code form known as:', 'multiple_choice', 'Native code', 'Assembly code', 'Bytecode', 'Machine code', 'C', 'Java is compiled to bytecode, which the JVM executes.');

    -- Q89 (MC) - Translation Program Category
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Translators (Compilers, Interpreters, Assemblers) are fundamentally a type of:', 'multiple_choice', 'Hardware', 'Data structure', 'System software', 'Application software', 'C', 'Translators are programs that manage and prepare code for execution, placing them in system software/tools.');

    -- Q90 (MC) - Language Level History
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Languages that use English-like keywords, making them highly readable, are generally categorized as:', 'multiple_choice', 'Low-Level', 'Assembly', 'High-Level', 'Machine', 'C', 'Readability is a key feature of high-level languages.');

    -- Q91 (MC) - Stack Principle
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The primary principle governing insertion and deletion in a Stack is:', 'multiple_choice', 'FIFO', 'LIFO', 'FILO', 'Random access', 'B', 'LIFO (Last-In, First-Out) defines a Stack.');

    -- Q92 (MC) - Algorithm Criterion
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The crucial characteristic that an algorithm must consist of a definite number of instructions is known as:', 'multiple_choice', 'Termination', 'Finiteness', 'Effectiveness', 'Definiteness', 'B', 'Finiteness relates to the limited number of instructions and steps.');

    -- Q93 (MC) - Time Complexity Analysis
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which analysis provides the most critical information about an algorithm''s performance limitations?', 'multiple_choice', 'Best-case', 'Average-case', 'Worst-case', 'Random-case', 'C', 'The worst-case scenario determines scalability and absolute limits.');

    -- Q94 (MC) - Local Search Limitation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The primary drawback of Hill Climbing is its inability to escape a local optimum and find the:', 'multiple_choice', 'Local minimum', 'Plateau', 'Global optimum', 'Starting point', 'C', 'It often fails to reach the best possible solution.');

    -- Q95 (MC) - Data Structure Organization
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The term "data structure" focuses on the logical arrangement and ___ of data items.', 'multiple_choice', 'Compiling', 'Storage', 'Debugging', 'Network transmission', 'B', 'Data structures govern how data is physically and logically stored.');

    -- Q96 (MC) - Source Code Role
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Source code must be translated into machine code before it can be directly executed by the:', 'multiple_choice', 'RAM', 'Hard drive', 'CPU', 'Monitor', 'C', 'The CPU executes only machine code.');

    -- Q97 (MC) - OOP Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In Object-Oriented Programming, an instance of a class is known as a(n):', 'multiple_choice', 'Method', 'Attribute', 'Object', 'Function', 'C', 'An object is a run-time instance of a class definition.');

    -- Q98 (MC) - Low-Level Code Usage
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Assembly language is often used today for writing optimized code for:', 'multiple_choice', 'Web browsers', 'Device drivers and kernels', 'Standard business applications', 'Data analysis', 'B', 'It is used where high performance and direct hardware control are necessary.');

    -- Q99 (MC) - Language Level Equivalence
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is another common term for Second Generation Languages (2GL)?', 'multiple_choice', 'Machine Language', 'Assembly Language', 'Scripting Language', 'Natural Language', 'B', '2GL refers to Assembly Language.');

    -- Q100 (MC) - Program Instruction
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A program is essentially a collection of codes that acts as an ___ to the computer.', 'multiple_choice', 'Obstacle', 'Instruction set', 'Output stream', 'Storage unit', 'B', 'It provides the set of instructions for the computer.');

    -- Q101 (MC) - Linked List Insertion
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'To insert a node into a Linked List, the operation primarily involves manipulating:', 'multiple_choice', 'Memory blocks', 'Pointers/References', 'Array indexes', 'CPU registers', 'B', 'Insertion/deletion in linked lists modifies the node links (pointers).');

    -- Q102 (MC) - Algorithm Steps
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The sequence of instructions in an algorithm must be:', 'multiple_choice', 'Ambiguous', 'Random', 'Well-ordered', 'Optional', 'C', 'The steps must be ordered logically (well-ordered).');

    -- Q103 (MC) - Efficiency Analysis Term
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The function that expresses the running time of an algorithm in terms of the input size (n) is known as the:', 'multiple_choice', 'Characteristic polynomial', 'Growth function', 'Output function', 'Heuristic function', 'B', 'The growth function is used in Big O notation to describe complexity.');

    -- Q104 (MC) - Optimization Challenge
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A state in the search space where Hill Climbing cannot find a better neighbor, but which is not the global optimum, is called a:', 'multiple_choice', 'Global peak', 'Local peak (Optimum)', 'Flat region', 'Starting node', 'B', 'It gets stuck at a local maximum, or peak.');

    -- Q105 (MC) - Programming Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Programming is essentially the translation of a problem-solving ___ into a formal language.', 'multiple_choice', 'Hardware requirement', 'Algorithm', 'Network packet', 'Data file', 'B', 'Programming is the implementation of an algorithm.');

    -- Q106 (MC) - Stack Analogy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which LIFO data structure is commonly used to manage function calls in a program?', 'multiple_choice', 'Heap', 'Queue', 'Array', 'Stack', 'D', 'The call stack manages function execution order.');

    -- Q107 (MC) - OOP Language Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Java is classified as Object-Oriented because it heavily utilizes:', 'multiple_choice', 'GOTO statements', 'Classes and Objects', 'Assembly code', 'Native hardware interfaces', 'B', 'OOP languages are defined by their use of classes and objects.');

    -- Q108 (MC) - High-Level Advantage
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The main advantage of High-Level Languages is that they are generally easier to debug and:', 'multiple_choice', 'Run faster', 'Translate to Assembly', 'Maintain', 'Consume less memory', 'C', 'Readability aids maintenance.');

    -- Q109 (MC) - Translation Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which translator type is commonly used for scripting languages like Python and JavaScript?', 'multiple_choice', 'Compiler', 'Assembler', 'Interpreter', 'Loader', 'C', 'Scripting languages are often interpreted.');

    -- Q110 (MC) - Data Structure Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'By organizing data items, data structures enable better utilization of computer:', 'multiple_choice', 'Physical dimensions', 'Resources (Memory and CPU)', 'Network bandwidth', 'Peripheral devices', 'B', 'Efficient data organization optimizes resource usage.');

    -- Q111 (MC) - Linked List Structure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Circular Linked List is one where the last node points back to the:', 'multiple_choice', 'Tail node', 'Root node', 'First node (Head)', 'Null pointer', 'C', 'The circular nature links the end back to the beginning.');

    -- Q112 (MC) - Algorithm Characteristic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The property that an algorithm must produce a result for every legitimate input is known as:', 'multiple_choice', 'Completeness', 'Input/Output', 'Finiteness', 'Efficiency', 'B', 'Input/Output defines the necessary relationship between data in and data out.');

    -- Q113 (MC) - Efficiency Complexity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An algorithm with a running time proportional to the logarithm of the input size, $O(\log n)$, is generally considered highly:', 'multiple_choice', 'Inefficient', 'Exponential', 'Efficient', 'Quadratic', 'C', '$O(\log n)$ is very fast and efficient.');

    -- Q114 (MC) - Optimization Method
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Hill Climbing technique is used to solve problems that involve searching for the most optimal:', 'multiple_choice', 'Data type', 'Solution state', 'Programming language', 'Assembly instruction', 'B', 'It searches a state space for an optimal solution.');

    -- Q115 (MC) - Programming Requirement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In addition to instructing the computer, programming languages are key for the efficient exchange of ___ among human collaborators.', 'multiple_choice', 'Hardware parts', 'Algorithmic ideas', 'Compiled files', 'Runtime errors', 'B', 'They serve as a communication tool for algorithms.');

    -- Q116 (MC) - Queue Analogy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A Queue follows the FIFO principle, which means the element inserted ___ is the first one removed.', 'multiple_choice', 'Last', 'First', 'Randomly', 'From the middle', 'B', 'First In, First Out (FIFO).');

    -- Q117 (MC) - OOP Principle
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The OOP concept of defining objects that behave similarly but are implemented differently (e.g., overriding) is:', 'multiple_choice', 'Encapsulation', 'Polymorphism', 'Inheritance', 'Class definition', 'B', 'Different implementations under a common interface is polymorphism.');

    -- Q118 (MC) - Language Level Distance
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Machine language, consisting purely of binary code, is classified as:', 'multiple_choice', '0GL', '1GL', '2GL', '3GL', 'B', 'Machine language is the First Generation Language (1GL).');

    -- Q119 (MC) - Translator Output
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The output of an Assembler program is typically:', 'multiple_choice', 'Source code', 'High-level code', 'Machine code', 'Scripting code', 'C', 'Assemblers produce the executable machine code.');

    -- Q120 (MC) - Programming Process
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The process of translating a problem description into a working set of executable instructions is generally defined as:', 'multiple_choice', 'Debugging', 'Programming', 'Hardware design', 'Network analysis', 'B', 'Programming is the entire process of writing software.');

    -- Q121 (MC) - Data Structure Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The structural relationship between data items is the central concern of:', 'multiple_choice', 'Operating systems', 'Data structures', 'Microprocessors', 'Compilers', 'B', 'Data structures model relationships between pieces of data.');

    -- Q122 (MC) - Algorithm Step
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Every instruction within an algorithm must be:', 'multiple_choice', 'Expensive', 'Ambiguous', 'Feasible (Effective)', 'Optimized for speed', 'C', 'The step must be simple enough to be executed effectively.');

    -- Q123 (MC) - Efficiency Input
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Average-case efficiency provides information on algorithm performance over a ___ distribution of inputs.', 'multiple_choice', 'Known worst-case', 'Uniform (Random)', 'Worst-case', 'Best-case', 'B', 'It uses random/typical input distribution.');

    -- Q124 (MC) - Optimization Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Hill climbing is most effective when the search space is:', 'multiple_choice', 'Vast and flat', 'Complex with many local peaks', 'Small and unimodal', 'Randomly structured', 'C', 'It performs well in simple, convex (unimodal) landscapes.');

    -- Q125 (MC) - Linked List Traversal
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Searching for an element in a Linked List generally requires ___ traversal.', 'multiple_choice', 'Random access', 'Logarithmic', 'Sequential (linear)', 'Binary search', 'C', 'Elements must be checked one by one from the head.');

    -- Q126 (MC) - OOP Feature
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In the context of OOP, the concept that allows one method name to be used for different implementations (e.g., in parent and child classes) is:', 'multiple_choice', 'Interface', 'Polymorphism', 'Encapsulation', 'Recursion', 'B', 'This is a manifestation of polymorphism.');

    -- Q127 (MC) - Translation Type
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which translator is characterized by reading, translating, and executing one line of source code at a time?', 'multiple_choice', 'Compiler', 'Assembler', 'Interpreter', 'Linker', 'C', 'Interpreters operate line-by-line.');

    -- Q128 (MC) - Language Function
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The main objective of a programming language is to allow humans to write ___ in a formal, structured manner.', 'multiple_choice', 'Database queries', 'Computational logic', 'Network packet headers', 'Hardware specifications', 'B', 'The languages are tools for expressing computation.');


    -- =============================================================================================
    -- FILL-IN-THE-BLANK QUESTIONS (22 Questions)
    -- =============================================================================================

    -- Q129 (FIB) - Programming Languages
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Programming languages are languages through which we can ___ the computer to carry out some processes or tasks.', 'fill_in_blank', 'instruct', 'Answer must be word-for-word: "instruct"');

    -- Q130 (FIB) - Algorithms
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Programming languages can be used to execute a wide range of computational recipes called ___', 'fill_in_blank', 'Algorithms', 'Answer must be word-for-word: "Algorithms"');

    -- Q131 (FIB) - Algorithm Definition
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A finite sequence of unambiguous instructions for solving a problem is called an ___', 'fill_in_blank', 'Algorithm', 'Answer must be word-for-word: "Algorithm"');

    -- Q132 (FIB) - Data Structure
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A ___ is a means of organizing related data items for efficient access.', 'fill_in_blank', 'Data structure', 'Answer must be word-for-word: "Data structure"');

    -- Q133 (FIB) - Programming
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The process of writing programs is technically known as ___', 'fill_in_blank', 'Programming', 'Answer must be word-for-word: "Programming"');

    -- Q134 (FIB) - Low-Level
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Low level programming is also called ___ language.', 'fill_in_blank', 'Assembly', 'Answer must be word-for-word: "Assembly"');

    -- Q135 (FIB) - Optimization
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '___ efficiency seeks to provide information on performance based on random input.', 'fill_in_blank', 'Average-case', 'Answer must be word-for-word: "Average-case"');

    -- Q136 (FIB) - Linked List
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A ___ is a sequence of zero or more elements called nodes, linked by pointers.', 'fill_in_blank', 'Linked list', 'Answer must be word-for-word: "Linked list"');

    -- Q137 (FIB) - Translation Program
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The program that converts programs written in assembly language is called an ___', 'fill_in_blank', 'Assembler', 'Answer must be word-for-word: "Assembler"');

    -- Q138 (FIB) - Language Levels
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'There are typically considered ___ levels of programming languages.', 'fill_in_blank', 'three', 'Answer must be word-for-word: "three"');

    -- Q139 (FIB) - OOP Example
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The programming language ___ is given as an example of an Object-Oriented Programming language.', 'fill_in_blank', 'Java', 'Answer must be word-for-word: "Java"');

    -- Q140 (FIB) - Program Code
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A set of codes that instructs the computer to carry out some processes is called a ___', 'fill_in_blank', 'program', 'Answer must be word-for-word: "program"');

    -- Q141 (FIB) - Algorithm Sequence
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'An algorithm must be a ___ sequence of instructions, meaning it must end.', 'fill_in_blank', 'finite', 'Answer must be word-for-word: "finite"');

    -- Q142 (FIB) - Search Family
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Hill climbing belongs to the family of ___ search optimization techniques.', 'fill_in_blank', 'local', 'Answer must be word-for-word: "local"');

    -- Q143 (FIB) - Stack Principle
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A Stack is a data structure that implements the ___ principle.', 'fill_in_blank', 'LIFO', 'Answer must be word-for-word: "LIFO"');

    -- Q144 (FIB) - Queue Principle
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A Queue is a data structure that implements the ___ principle.', 'fill_in_blank', 'FIFO', 'Answer must be word-for-word: "FIFO"');

    -- Q145 (FIB) - Linked List Component
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Each element in a linked list is referred to as a ___', 'fill_in_blank', 'node', 'Answer must be word-for-word: "node"');

    -- Q146 (FIB) - Translator Type
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A program that translates high-level code all at once before execution is called a ___', 'fill_in_blank', 'Compiler', 'Answer must be word-for-word: "Compiler"');

    -- Q147 (FIB) - Translation Type
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A program that translates and executes high-level code line-by-line is called an ___', 'fill_in_blank', 'Interpreter', 'Answer must be word-for-word: "Interpreter"');

    -- Q148 (FIB) - Code Type
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The human-readable code written by a programmer is called ___', 'fill_in_blank', 'Source Code', 'Answer must be word-for-word: "Source Code"');

    -- Q149 (FIB) - Efficiency Term
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The notation used to describe the asymptotic running time of an algorithm is ___ notation.', 'fill_in_blank', 'Big O', 'Answer must be word-for-word: "Big O"');

    -- Q150 (FIB) - Language Level
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The level of programming language closest to the machine''s hardware instructions is ___ language.', 'fill_in_blank', 'Machine', 'Answer must be word-for-word: "Machine"');

END $$;