DO $$
DECLARE
    -- The variable to hold the Course UUID for GST203
    v_course_id UUID;
BEGIN
    -- Retrieve the Course ID for GST203. Note: This assumes 'GST203' exists in the courses table.
    SELECT id INTO v_course_id FROM courses WHERE code = 'GST203' LIMIT 1;
    
    -- Check if the course exists, if not raise an error
    IF v_course_id IS NULL THEN
        RAISE EXCEPTION 'Course GST203 not found in courses table. Please ensure the course exists before running this migration.';
    END IF;

    -- =====================================================================
    -- BEGIN MULTIPLE CHOICE QUESTIONS (1-127)
    -- =====================================================================

    -- Q1 (MC) - Definition of Philosophy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is generally considered the first problem a student of philosophy encounters?', 'multiple_choice', 'The lack of professional philosophers', 'The definition of philosophy', 'The historical origin of philosophy', 'The difference between logic and ethics', 'B', 'The definition of philosophy is known to be non-universal and highly debated, presenting the first challenge.');

    -- Q2 (MC) - Agreement on Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which statement is true regarding the definition of philosophy among philosophers?', 'multiple_choice', 'They all agree on a single, universal definition.', 'They disagree among themselves on what philosophy is.', 'The definition is only debated in modern times.', 'The definition is strictly mathematical.', 'B', 'Philosophers traditionally disagree among themselves on a single, fixed definition of their discipline.');

    -- Q3 (MC) - Best Way to Define Philosophy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'According to introductory textbooks, what is the best way to define philosophy?', 'multiple_choice', 'Memorizing historical definitions', 'Studying its etymology', 'Performing philosophical activity (doing philosophy)', 'Consulting a dictionary definition', 'C', 'The practical approach of "doing philosophy" is often cited as the best way to grasp its nature.');

    -- Q4 (MC) - Meaning of "To Philosophize"
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'To philosophize means "to wonder about life and about the fundamental problems of human ________."', 'multiple_choice', 'Economics', 'Existence', 'Technology', 'Politics', 'B', 'Philosophizing involves deep contemplation about the foundational issues of human existence.');

    -- Q5 (MC) - Major Ways to Define Philosophy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'How many major ways are there generally considered to define Philosophy?', 'multiple_choice', 'One', 'Two', 'Three', 'Four', 'B', 'Philosophy is often defined in two major ways: the Layman definition and the Academic/Professional conception.');

    -- Q6 (MC) - Layman Definition Core
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'According to the Layman definition, philosophy is "the sum total of his fundamental ________."', 'multiple_choice', 'Skills and talents', 'Religious doctrines', 'Beliefs and convictions', 'Accumulated wealth', 'C', 'The layman definition views philosophy as a person''s total set of deeply held beliefs and convictions.');

    -- Q7 (MC) - Origin of Philosophy (City-State)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'According to academic philosophers, philosophy originated in which Ancient Greek City State?', 'multiple_choice', 'Athens', 'Sparta', 'Thebes', 'Miletus', 'D', 'Miletus is historically recognized as the birthplace of Western philosophical tradition.');

    -- Q8 (MC) - Origin of Philosophy (Century)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Philosophy originated in the late 7th or early ________ century B.C.', 'multiple_choice', '9th', '8th', '6th', '5th', 'C', 'The academic conception dates the origin of philosophy to the late 7th or early 6th century B.C.');

    -- Q9 (MC) - Branch: Study of Reality
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which branch of philosophy is concerned with the nature of reality and existence?', 'multiple_choice', 'Epistemology', 'Logic', 'Axiology', 'Metaphysics', 'D', 'Metaphysics is the study of being, existence, and reality, often dealing with fundamental concepts like time and space.');

    -- Q10 (MC) - Branch: Study of Knowledge
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which branch of philosophy deals with the nature, scope, limits, and justification of knowledge?', 'multiple_choice', 'Metaphysics', 'Epistemology', 'Aesthetics', 'Ethics', 'B', 'Epistemology is the philosophical theory of knowledge, addressing how we know what we know.');

    -- Q11 (MC) - Branch: Study of Value
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The branch of philosophy that studies the nature of value, including moral and artistic value, is called:', 'multiple_choice', 'Logic', 'Axiology', 'Psychology', 'Cosmology', 'B', 'Axiology is the philosophical study of value, encompassing ethics and aesthetics.');

    -- Q12 (MC) - Branch: Study of Reasoning
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which branch of philosophy is defined as the art of correct reasoning?', 'multiple_choice', 'Ethics', 'Aesthetics', 'Logic', 'Ontology', 'C', 'Logic is the systematic study of valid inference and correct reasoning.');

    -- Q13 (MC) - Division of Metaphysics
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The two main divisions of Metaphysics are General Metaphysics (Ontology) and ________ Metaphysics.', 'multiple_choice', 'Applied', 'Special', 'Theoretical', 'Dialectical', 'B', 'Metaphysics is traditionally divided into General (Ontology) and Special (Cosmology, Psychology, Theology).');

    -- Q14 (MC) - Ontology Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'General Metaphysics is also known as Ontology, which is the study of being ________ being.', 'multiple_choice', 'through', 'for', 'qua', 'within', 'C', 'Ontology is precisely defined as the study of being qua being, or being as such.');

    -- Q15 (MC) - Cosmology Focus
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which part of Special Metaphysics is concerned with the nature of the world or the universe?', 'multiple_choice', 'Rational Theology', 'Ontology', 'Cosmology', 'Rational Psychology', 'C', 'Cosmology deals with the origin, nature, and structure of the universe.');

    -- Q16 (MC) - Philosophical Anthropology
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Rational Psychology is also referred to as ________ Anthropology, the philosophical study of man.', 'multiple_choice', 'Sociological', 'Biological', 'Philosophical', 'Cultural', 'C', 'Rational Psychology is concerned with the philosophical understanding of human nature (Philosophical Anthropology).');

    -- Q17 (MC) - Rational Theology Focus
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The division of Special Metaphysics that deals with the study of God or a supreme being is called:', 'multiple_choice', 'Theodicy', 'Agnosticism', 'Rational Theology', 'Theology proper', 'C', 'Rational Theology is the philosophical examination of the existence and nature of God.');

    -- Q18 (MC) - Sub-branch of Axiology
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following is considered a sub-branch of Axiology, the study of value?', 'multiple_choice', 'Cosmology', 'Epistemology', 'Ethics', 'Phenomenology', 'C', 'Ethics (Moral Philosophy) is a primary division under Axiology, along with Aesthetics and Socio-political philosophy.');

    -- Q19 (MC) - Aesthetics Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Aesthetics, a sub-branch of Axiology, is the philosophical study of:', 'multiple_choice', 'Truth and Falsity', 'Beauty, art, and taste', 'Political power and justice', 'Existence and Being', 'B', 'Aesthetics focuses on the nature of beauty, art, and the principles of artistic judgment.');

    -- Q20 (MC) - Ethics Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Ethics is concerned with the study of moral standards and what type of conduct?', 'multiple_choice', 'Economical', 'Right and wrong', 'Technical', 'Historical', 'B', 'Ethics, or Moral Philosophy, investigates principles guiding right and wrong conduct.');

    -- Q21 (MC) - Skepticism in Epistemology
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In Epistemology, the philosophical position that doubts the possibility of certain knowledge is known as:', 'multiple_choice', 'Rationalism', 'Empiricism', 'Skepticism', 'Dogmatism', 'C', 'Skepticism is the attitude of doubting knowledge claims, especially those that are traditionally accepted.');

    -- Q22 (MC) - Source of Knowledge
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following is NOT listed as a traditional source of knowledge in Epistemology?', 'multiple_choice', 'Experience', 'Reason', 'Emotion', 'Intuition', 'C', 'Traditional sources of knowledge include Experience, Reason, Intuition, and Revelation, not emotion.');

    -- Q23 (MC) - Socio-political Philosophy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Socio-political Philosophy primarily focuses on the study of political structures, justice, and ________.', 'multiple_choice', 'Natural sciences', 'Social values', 'Literary criticism', 'Individual psychology', 'B', 'This branch examines fundamental questions about the state, society, justice, and the values that govern them.');

    -- Q24 (MC) - Logic: Statement Property
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'For a sentence to be considered a logical statement (proposition), it must be capable of being either true or ________.', 'multiple_choice', 'Debatable', 'Complex', 'False', 'Hypothetical', 'C', 'A statement is a declarative sentence that is definitively either true or false.');

    -- Q25 (MC) - Logical Statement Symbolization
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In logic, any letter of the English alphabet can be used to symbolize a logical statement. This is considered:', 'multiple_choice', 'False', 'True only for capital letters', 'True', 'True only for vowels', 'C', 'It is true that any letter can be chosen, although convention often dictates starting from p.');

    -- Q26 (MC) - Statement Variables Convention
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Letter beginning from p (p, q, r, s, t etc) are customarily called:', 'multiple_choice', 'Truth values', 'Statement variables', 'Connectives', 'Predicates', 'B', 'The lower-case letters p, q, r, etc., are standardly used as variables to represent simple statements.');

    -- Q27 (MC) - Conjunction Symbol
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the standard symbol used to represent a conjunction?', 'multiple_choice', '$\vee$', '$\rightarrow$', '$\cdot$ (or $\land$)', '$\sim$', 'C', 'The dot ($\cdot$) or the wedge ($\land$) are the common symbols for conjunction (AND).');

    -- Q28 (MC) - Conjunction Truth Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A conjunction is true if and only if:', 'multiple_choice', 'Only one conjunct is true.', 'Both conjuncts are true.', 'At least one conjunct is false.', 'The antecedent is true and the consequent is false.', 'B', 'The truth of a conjunction relies entirely on the truth of all its constituent parts (conjuncts).');

    -- Q29 (MC) - Disjunction Symbol
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The logical connective known as disjunction is represented by which symbol?', 'multiple_choice', '$\vee$', '$\cdot$', '$\leftrightarrow$', '$\sim$', 'A', 'The wedge ($\vee$) is the symbol for disjunction (OR).');

    -- Q30 (MC) - Disjunction Falsity Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A disjunction is false if and only if:', 'multiple_choice', 'Both disjuncts are true.', 'The first disjunct is false.', 'Both disjuncts are false.', 'One disjunct is true and the other is false.', 'C', 'A disjunction is false only in the case where both of its disjuncts are false.');

    -- Q31 (MC) - Negation Symbol
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The symbol ($\sim$) is used to represent which logical connective?', 'multiple_choice', 'Conjunction', 'Disjunction', 'Negation', 'Biconditional', 'C', 'The tilde ($\sim$) is the symbol used to deny or negate a statement.');

    -- Q32 (MC) - Material Conditional Symbol
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Material conditional is represented by which symbol?', 'multiple_choice', '$\leftrightarrow$', '$\rightarrow$', '$\vee$', '$\cdot$', 'B', 'The arrow ($\rightarrow$) represents the material conditional (IF...THEN).');

    -- Q33 (MC) - Conditional Falsity Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Material conditional is said to be false if its antecedent is ________ and its consequent is ________.', 'multiple_choice', 'False, True', 'True, True', 'False, False', 'True, False', 'D', 'The conditional statement p $\rightarrow$ q is only false when p is true and q is false.');

    -- Q34 (MC) - Material Biconditional Symbol
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Material biconditional is represented by which symbol?', 'multiple_choice', '$\rightarrow$', '$\vee$', '$\leftrightarrow$', '$\cdot$', 'C', 'The double arrow ($\leftrightarrow$) represents the biconditional (IF AND ONLY IF).');

    -- Q35 (MC) - Biconditional Truth Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A material biconditional is true when its two constituent statements have the ________.', 'multiple_choice', 'Opposite truth values', 'Contradictory meanings', 'Same truth value', 'Dependent meanings', 'C', 'The biconditional p $\leftrightarrow$ q is true when p and q are both true, or both false.');

    -- Q36 (MC) - Law of Identity Statement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The law of identity is always stated as follows:', 'multiple_choice', 'A is not A', 'A is A', 'A is sometimes A', 'A is either B or not B', 'B', 'The Law of Identity states that everything is identical to itself, symbolized as "A is A".');

    -- Q37 (MC) - Law of Non-Contradiction Statement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The law of non-contradiction states that:', 'multiple_choice', 'Everything is either A or not A', 'A is A', 'Nothing can be both A and not A', 'Some things are both A and not A', 'C', 'This law states that contradictory properties cannot apply to the same thing at the same time and in the same respect.');

    -- Q38 (MC) - Third Law of Thought
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The third law of thought, which states that everything is either A or not A, is known as the Law of:', 'multiple_choice', 'Identity', 'Non-Contradiction', 'Excluded Middle', 'Sufficient Reason', 'C', 'The Law of Excluded Middle asserts that for any proposition, either that proposition is true, or its negation is true.');

    -- Q39 (MC) - Laws of Thought Originator
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The three standard laws of thought were traditionally laid down by which Greek philosopher?', 'multiple_choice', 'Plato', 'Socrates', 'Aristotle', 'Thales', 'C', 'Aristotle is credited with formalizing the three classical laws of thought: Identity, Non-Contradiction, and Excluded Middle.');

    -- Q40 (MC) - Definition of an Argument
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In logic, what is an argument?', 'multiple_choice', 'A heated verbal dispute between people.', 'A set of beliefs held by one person.', 'A group of statements where one is claimed to follow from the others.', 'A single, complex statement with many clauses.', 'C', 'An argument is a structure of statements, with premises leading to a conclusion.');

    -- Q41 (MC) - Deductive Argument Claim
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In a deductive argument, the premises are claimed to provide what kind of grounds for the conclusion?', 'multiple_choice', 'Emotional', 'Probable', 'Conclusive', 'Subjective', 'C', 'Deductive arguments aim for certainty; the premises are claimed to establish the conclusion with absolute certainty (conclusive grounds).');

    -- Q42 (MC) - Inductive Argument Claim
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In an inductive argument, the premises are claimed to make the conclusion:', 'multiple_choice', 'Impossible', 'Necessary', 'Contradictory', 'Probable', 'D', 'Inductive arguments only aim to make the conclusion likely or probable, not certain.');

    -- Q43 (MC) - Applicability of Validity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The properties of validity and invalidity apply exclusively to which type of argument?', 'multiple_choice', 'Inductive', 'Analogical', 'Deductive', 'Hypothetical', 'C', 'Validity is a formal property of deductive arguments relating to the structure and relationship between premises and conclusion.');

    -- Q44 (MC) - Soundness Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A deductive argument is considered "sound" if it is valid and:', 'multiple_choice', 'The conclusion is probable.', 'The premises are all true.', 'It is highly persuasive.', 'It is short and concise.', 'B', 'Soundness requires both validity (good form) and truth (true premises).');

    -- Q45 (MC) - Applicability of Strength
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The properties of strength and weakness apply exclusively to which type of argument?', 'multiple_choice', 'Deductive', 'Sound', 'Valid', 'Inductive', 'D', 'Strength refers to the degree of probability the premises confer upon the conclusion in an inductive argument.');

    -- Q46 (MC) - Cogency Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An inductive argument is considered "cogent" if it is strong and:', 'multiple_choice', 'The conclusion is certain.', 'The premises are all true.', 'It avoids fallacies.', 'It is easily understandable.', 'B', 'Cogency is the inductive equivalent of soundness, requiring strength and true premises.');

    -- Q47 (MC) - Formal Fallacy Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A fallacy that involves an error in the structure or form of a deductive argument is called a:', 'multiple_choice', 'Material fallacy', 'Informal fallacy', 'Formal fallacy', 'Rhetorical fallacy', 'C', 'Formal fallacies violate a rule of logic, making the argument invalid regardless of the content.');

    -- Q48 (MC) - Informal Fallacy Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A fallacy that involves an error in the content or meaning of the argument, rather than its structure, is known as a(n):', 'multiple_choice', 'Formal fallacy', 'Informal fallacy', 'Tautology', 'Contradiction', 'B', 'Informal fallacies are errors in reasoning that occur due to misuse of language or irrelevance of premises.');

    -- Q49 (MC) - Fallacy: Argumentum ad Hominem
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Argumentum ad Hominem is characterized by an attack against:', 'multiple_choice', 'The premise of the argument', 'The person making the argument', 'The conclusion of the argument', 'The structure of the argument', 'B', 'Argumentum ad Hominem literally means "argument against the person" and improperly shifts focus from the argument itself to the person presenting it.');

    -- Q50 (MC) - Fallacy: Appeal to Ignorance
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Argumentum ad Ignorantiam is an appeal to:', 'multiple_choice', 'Pity', 'Popularity', 'Force', 'Ignorance (lack of evidence)', 'D', 'This fallacy asserts a statement is true simply because it has not been proven false, or vice-versa.');

    -- Q51 (MC) - Fallacy: Appeal to Pity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Argumentum ad Misericordiam is an appeal to:', 'multiple_choice', 'Emotion (pity)', 'Authority', 'Tradition', 'Fear', 'A', 'This fallacy attempts to win support for an argument by exploiting the audience''s feelings of pity or guilt.');

    -- Q52 (MC) - Fallacy: Appeal to the People
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Argumentum ad Populum is an appeal to:', 'multiple_choice', 'Force', 'Wealth', 'The people (popularity)', 'History', 'C', 'This fallacy suggests a claim must be true because it is widely believed by a large number of people.');

    -- Q53 (MC) - Fallacy: Appeal to Force
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Argumentum ad Baculum attempts to establish a conclusion by an appeal to:', 'multiple_choice', 'Logos', 'Ethos', 'Force or threat', 'Pathos', 'C', 'Argumentum ad Baculum ("argument to the stick") uses coercion or threats to compel acceptance of a conclusion.');

    -- Q54 (MC) - Fallacy: Begging the Question
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which informal fallacy occurs when the premise of an argument assumes the truth of the conclusion it is intended to prove?', 'multiple_choice', 'Ignoratio Elenchi', 'Petitio Principii', 'Argumentum ad Baculum', 'Complex Question', 'B', 'Petitio Principii (Begging the Question) is a form of circular reasoning.');

    -- Q55 (MC) - Fallacy: Complex Question
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Fallacy of Complex Question is also known as the loaded question because:', 'multiple_choice', 'It involves complex mathematical data.', 'It is highly difficult to answer.', 'It contains a hidden assumption that is presumed true.', 'It requires multiple premises.', 'C', 'The Complex Question fallacy tricks the respondent into implicitly admitting a premise that may be false.');

    -- Q56 (MC) - Fallacy: Accident
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which fallacy occurs when a general rule is applied to a specific case that is clearly an exception to that rule?', 'multiple_choice', 'Converse Fallacy of Accident', 'Fallacy of Equivocation', 'Fallacy of Accident', 'Fallacy of Composition', 'C', 'The Fallacy of Accident (or sweeping generalization) incorrectly applies a general principle without regard for mitigating circumstances.');

    -- Q57 (MC) - Fallacy: Hasty Generalization
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Converse Fallacy of Accident is commonly referred to as:', 'multiple_choice', 'False Cause', 'Hasty Generalization', 'Red Herring', 'Appeal to Authority', 'B', 'Hasty Generalization infers a general rule from an insufficient number of exceptional or atypical cases.');

    -- Q58 (MC) - Fallacy: Irrelevant Conclusion
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Ignoratio Elenchi is the Latin name for which fallacy?', 'multiple_choice', 'Appeal to Pity', 'Irrelevant Conclusion', 'Appeal to Force', 'Begging the Question', 'B', 'Ignoratio Elenchi occurs when an argument is directed to proving a conclusion different from the one that is actually at issue (a "Red Herring").');

    -- Q59 (MC) - Fallacy: Ambiguity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Fallacy of Equivocation is based on the misuse of:', 'multiple_choice', 'A sound argument', 'An ambiguous word or phrase', 'The Law of Identity', 'Statistical data', 'B', 'Equivocation occurs when a key word in an argument is used in two or more different senses.');

    -- Q60 (MC) - Fallacy: Composition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which fallacy involves mistakenly transferring a characteristic of the parts of a whole to the whole itself?', 'multiple_choice', 'Division', 'Accident', 'Composition', 'Equivocation', 'C', 'The Fallacy of Composition argues that because the parts have a certain property, the whole must also have that property.');

    -- Q61 (MC) - Fallacy: Division
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Fallacy of Division is the opposite of Composition and involves the mistaken transfer of a characteristic from the whole to:', 'multiple_choice', 'The cause', 'The context', 'Its individual parts', 'A different whole', 'C', 'Division mistakenly assumes that what is true of the whole must also be true of its components.');

    -- Q62 (MC) - Academic Conception
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Professional or Academic understanding of philosophy is often described as being the ________ of the layman''s definition.', 'multiple_choice', 'Amplification', 'Contradiction', 'Basis', 'Opposite', 'D', 'The academic definition focuses on systemic inquiry and methodology, contrasting the layman''s focus on personal beliefs.');

    -- Q63 (MC) - Metaphysics Divisions (Excluding Ontology)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following is NOT a division of Special Metaphysics?', 'multiple_choice', 'Cosmology', 'Rational Psychology', 'Epistemology', 'Rational Theology', 'C', 'Epistemology is a major branch of philosophy, not a sub-division of Special Metaphysics.');

    -- Q64 (MC) - Logic as Art
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Logic is fundamentally described as the art of ________.', 'multiple_choice', 'Persuasion', 'Oratory', 'Correct reasoning', 'Observation', 'C', 'Logic aims to provide rules and methods for evaluating the correctness of reasoning.');

    -- Q65 (MC) - Syllogism Association
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The concept of the syllogism, a form of deductive argument, is primarily associated with the work of:', 'multiple_choice', 'Descartes', 'Kant', 'Aristotle', 'Hume', 'C', 'Aristotle is widely considered the father of logic and the developer of the syllogism.');

    -- Q66 (MC) - Axiology Components
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Axiology includes which three major fields of study?', 'multiple_choice', 'Ontology, Cosmology, Ethics', 'Logic, Epistemology, Metaphysics', 'Ethics, Aesthetics, Socio-political Philosophy', 'Rationalism, Empiricism, Skepticism', 'C', 'Axiology covers the areas of value theory: moral value (Ethics), artistic value (Aesthetics), and social value (Socio-political Philosophy).');

    -- Q67 (MC) - Truth Value Necessity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'For a sentence to be a valid statement in logic, it must possess a specific property, namely:', 'multiple_choice', 'Rhetorical flourish', 'Truth value (True or False)', 'Interrogative structure', 'Ambiguity', 'B', 'The ability to be true or false (its truth value) is the defining characteristic of a logical statement.');

    -- Q68 (MC) - Negation Function
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If a statement (p) is true, what is the truth value of its negation ($\sim$p)?', 'multiple_choice', 'True', 'False', 'Indeterminate', 'Same as p', 'B', 'Negation reverses the truth value; if p is True, $\sim$p is False.');

    -- Q69 (MC) - Material Conditional Components
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In the conditional statement p $\rightarrow$ q, p is known as the antecedent and q is known as the:', 'multiple_choice', 'Conjunction', 'Disjunction', 'Consequent', 'Biconditional', 'C', 'The consequent is the part of the conditional statement that follows the "then" clause.');

    -- Q70 (MC) - Biconditional Falsity Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The material biconditional ($\leftrightarrow$) is said to be false if the two constituent statements:', 'multiple_choice', 'Are both true', 'Differ in truth value', 'Are both false', 'Are logically equivalent', 'B', 'The biconditional is false when one statement is true and the other is false (they differ in truth value).');

    -- Q71 (MC) - Example of Layman Philosophy
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A person''s fundamental convictions about life are characteristic of the ________ definition of philosophy.', 'multiple_choice', 'Epistemological', 'Academic', 'Layman', 'Metaphysical', 'C', 'The layman definition equates philosophy with a set of personal, fundamental beliefs and convictions.');

    -- Q72 (MC) - Study of "Being qua Being"
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The study of "being qua being" is the core subject of which division of Metaphysics?', 'multiple_choice', 'Cosmology', 'Rational Psychology', 'Ontology', 'Rational Theology', 'C', 'Ontology is the branch dedicated to the investigation of being in general.');

    -- Q73 (MC) - Justification of Knowledge
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The attempt to determine the limits and justification of knowledge falls under the domain of:', 'multiple_choice', 'Axiology', 'Logic', 'Epistemology', 'Ethics', 'C', 'Epistemology studies how knowledge is acquired, structured, and justified.');

    -- Q74 (MC) - Deductive Argument Guarantee
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If a deductive argument is valid, the truth of its premises guarantees the truth of its:', 'multiple_choice', 'Counter-argument', 'Antecedent', 'Conclusion', 'Disjunct', 'C', 'Validity means that if the premises are true, the conclusion *must* be true; the form is structure-preserving.');

    -- Q75 (MC) - Inductive Argument Weakness
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If an inductive argument is weak, its premises provide what level of support for the conclusion?', 'multiple_choice', 'Conclusive', 'High probability', 'Low probability', 'Absolute certainty', 'C', 'A weak inductive argument fails to make its conclusion probable, even if the premises are true.');

    -- Q76 (MC) - Law of Excluded Middle Form
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Law of Excluded Middle states that everything is either A or:', 'multiple_choice', 'B', 'Not A', 'Both A and B', 'Sometimes A', 'B', 'It forces a binary choice: a property (A) must either belong to something or not belong to it ($\sim$A).');

    -- Q77 (MC) - Fallacy: Attacking the Source
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Argumentum ad Hominem improperly rejects a conclusion by attacking the speaker''s motives or character. This is an example of what type of fallacy?', 'multiple_choice', 'Formal', 'Composition', 'Division', 'Informal', 'D', 'Ad Hominem is a classic example of an informal fallacy, specifically one of relevance.');

    -- Q78 (MC) - Logic Connective for 'OR'
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which logical connective corresponds to the English word "or"?', 'multiple_choice', 'Conjunction', 'Negation', 'Conditional', 'Disjunction', 'D', 'The disjunction ($\vee$) connects statements with the meaning of "or".');

    -- Q79 (MC) - Logic Connective for 'IF...THEN'
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which logical connective corresponds to the English phrase "if...then"?', 'multiple_choice', 'Conjunction', 'Material Biconditional', 'Material Conditional', 'Disjunction', 'C', 'The material conditional ($\rightarrow$) represents the structure of an "if...then" statement.');

    -- Q80 (MC) - Cogent Argument Condition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'To be considered cogent, an inductive argument must be strong and its premises must be:', 'multiple_choice', 'Logical', 'Historical', 'True', 'Factual', 'C', 'Cogency requires both strength (form) and truth (content) for inductive arguments.');

    -- Q81 (MC) - Philosophical Anthropology Focus
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Philosophical Anthropology, a part of Special Metaphysics, is the philosophical study of:', 'multiple_choice', 'The human soul or mind (man)', 'Ancient cities', 'The environment', 'Political ideologies', 'A', 'This field is also known as Rational Psychology and focuses on the nature of man.');

    -- Q82 (MC) - Law of Non-Contradiction Example
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'According to the Law of Non-Contradiction, it is impossible for a door to be simultaneously:', 'multiple_choice', 'Red and heavy', 'Made of wood and metal', 'Open and closed', 'Old and broken', 'C', 'The law prevents a thing from having a property and its negation (e.g., being open and not-open) at the same time and place.');

    -- Q83 (MC) - Primary Focus of Ethics
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Ethics (Moral Philosophy) is the philosophical study of:', 'multiple_choice', 'Beauty and art', 'The state and governance', 'Moral standards and conduct', 'The nature of time', 'C', 'Ethics investigates the principles of right and wrong behavior.');

    -- Q84 (MC) - Skepticism's Core Doubt
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A skeptic in Epistemology fundamentally doubts the possibility of attaining what?', 'multiple_choice', 'Pleasure', 'Wealth', 'Certain knowledge', 'Political power', 'C', 'Skepticism questions whether any human knowledge is truly certain or possible.');

    -- Q85 (MC) - Conjunction Falsity
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If one conjunct in a conjunction is false, the entire conjunction becomes:', 'multiple_choice', 'True', 'Contradictory', 'False', 'Indeterminate', 'C', 'If any part of an AND statement is false, the entire statement is false.');

    -- Q86 (MC) - Fallacy: Composition Example
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Assuming that because every musician in an orchestra is excellent, the orchestra itself must be excellent, commits the Fallacy of:', 'multiple_choice', 'Division', 'Equivocation', 'Composition', 'Accident', 'C', 'This is Composition: wrongly inferring the property of the whole from the properties of its parts.');

    -- Q87 (MC) - Fallacy: Division Example
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Assuming that because a certain university is highly prestigious, every student graduating from it must be brilliant, commits the Fallacy of:', 'multiple_choice', 'Composition', 'Division', 'Hasty Generalization', 'Petitio Principii', 'B', 'This is Division: wrongly inferring the property of the part from the property of the whole.');

    -- Q88 (MC) - Material Conditional Structure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The conditional statement p $\rightarrow$ q is false only in the case of:', 'multiple_choice', 'True $\rightarrow$ True', 'False $\rightarrow$ True', 'True $\rightarrow$ False', 'False $\rightarrow$ False', 'C', 'The only way for an IF-THEN statement to be false is if the condition (antecedent) is met, but the result (consequent) does not follow.');

    -- Q89 (MC) - Disjunction Truth
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The disjunction ($\vee$) is true if at least how many of its disjuncts are true?', 'multiple_choice', 'Zero', 'One', 'Two', 'All', 'B', 'A disjunction is true if one or both of its component statements are true (inclusive OR).');

    -- Q90 (MC) - Formal Fallacy Characteristic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A formal fallacy invalidates an argument due to a flaw in its:', 'multiple_choice', 'Rhetoric', 'Content', 'Language', 'Structure/Form', 'D', 'Formal fallacies are structural defects; they are deductive arguments that are invalid.');

    -- Q91 (MC) - Law of Identity Application
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In the Law of Identity ("A is A"), what does "A" stand for?', 'multiple_choice', 'A specific letter of the alphabet', 'A true statement', 'Anything whatever', 'A concrete object only', 'C', 'The "A" in the Law of Identity is a variable representing any entity or concept.');

    -- Q92 (MC) - Deductive Argument Classification
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Deductive arguments are classified as either valid or invalid, while inductive arguments are classified as either:', 'multiple_choice', 'Sound or Unsound', 'True or False', 'Strong or Weak', 'Necessary or Contingent', 'C', 'Strong and weak are the evaluative terms for inductive reasoning.');

    -- Q93 (MC) - Source of Knowledge: Reason
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Philosophers who emphasize the human ability to think and use logical inference as the primary source of knowledge subscribe to:', 'multiple_choice', 'Empiricism', 'Rationalism', 'Skepticism', 'Existentialism', 'B', 'Rationalism highlights the role of reason as the chief source of knowledge.');

    -- Q94 (MC) - Source of Knowledge: Experience
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The view that knowledge primarily comes from sensory experience is known as:', 'multiple_choice', 'Rationalism', 'Empiricism', 'Intuitionism', 'Relativism', 'B', 'Empiricism emphasizes experience, especially sensory perception, as the basis of knowledge.');

    -- Q95 (MC) - Fallacy of Relevance
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Argumentum ad Populum is a type of informal fallacy that commits an error of:', 'multiple_choice', 'Ambiguity', 'Presumption', 'Relevance', 'Composition', 'C', 'Ad Populum is a fallacy of relevance because the premise (everyone believes it) is irrelevant to the truth of the conclusion.');

    -- Q96 (MC) - Fallacy of Presumption
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following is an example of a Fallacy of Presumption?', 'multiple_choice', 'Argumentum ad Baculum', 'Argumentum ad Hominem', 'Petitio Principii', 'Argumentum ad Misericordiam', 'C', 'Petitio Principii (Begging the Question) is a fallacy of presumption because it relies on an unproven premise (the conclusion itself).');

    -- Q97 (MC) - Fallacy of Ambiguity Example
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Fallacy of Equivocation falls under the general category of fallacies of:', 'multiple_choice', 'Relevance', 'Presumption', 'Ambiguity', 'Induction', 'C', 'Equivocation arises from the use of ambiguous language.');

    -- Q98 (MC) - Meaning of Ontology
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Ontology is the philosophical study of:', 'multiple_choice', 'Morality', 'The human mind', 'Being and existence', 'Beauty and art', 'C', 'Ontology is General Metaphysics, studying the nature of being.');

    -- Q99 (MC) - Nature of a Statement
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A logical statement is also referred to as a:', 'multiple_choice', 'Question', 'Command', 'Syllogism', 'Proposition', 'D', 'The terms "statement" and "proposition" are often used interchangeably in logic.');

    -- Q100 (MC) - Biconditional 'IF AND ONLY IF'
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The English phrase that best captures the meaning of the material biconditional ($\leftrightarrow$) is:', 'multiple_choice', 'If...then', 'Either...or', 'Both...and', 'If and only if', 'D', 'The biconditional is an equivalence statement, often expressed as "if and only if" (iff).');

    -- Q101 (MC) - Philosophical Focus: Political Structures
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The study of justice, political structures, and social values belongs to:', 'multiple_choice', 'Ethics', 'Aesthetics', 'Socio-political Philosophy', 'Rational Theology', 'C', 'Socio-political philosophy analyzes the organization and values of human society.');

    -- Q102 (MC) - Law of Non-Contradiction's Purpose
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Law of Non-Contradiction prevents a statement from being both:', 'multiple_choice', 'True and True', 'False and False', 'True and False', 'Meaningful and Meaningless', 'C', 'The law asserts that a proposition and its negation cannot both be true simultaneously.');

    -- Q103 (MC) - Unsound Argument Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A deductive argument is considered unsound if it is valid but has at least one ________ premise, OR if it is invalid.', 'multiple_choice', 'Irrelevant', 'False', 'Hypothetical', 'Vague', 'B', 'An unsound argument is either invalid, or it is valid but lacks true premises.');

    -- Q104 (MC) - Uncogent Argument Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An inductive argument is considered uncogent if it is weak, OR if it is strong but has at least one ________ premise.', 'multiple_choice', 'False', 'True', 'Necessary', 'Probable', 'A', 'An uncogent argument is either weak, or it is strong but lacks true premises.');

    -- Q105 (MC) - Source of Knowledge: Revelation
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Knowledge claimed to be derived from a divine source or supernatural insight is classified as:', 'multiple_choice', 'Reason', 'Experience', 'Revelation', 'Intuition', 'C', 'Revelation is one of the four traditional sources of knowledge recognized in Epistemology.');

    -- Q106 (MC) - Fallacy: Ignoratio Elenchi
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If an arguer attempts to prove one conclusion but succeeds in proving a different, irrelevant one, they commit the fallacy of:', 'multiple_choice', 'Begging the Question', 'Irrelevant Conclusion (Ignoratio Elenchi)', 'Complex Question', 'Division', 'B', 'Ignoratio Elenchi is the error of arguing for something beside the point.');

    -- Q107 (MC) - Philosophical Wonder
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The process of philosophizing involves an essential element of:', 'multiple_choice', 'Recitation', 'Memorization', 'Wonder', 'Calculation', 'C', 'Wonder is the starting point of philosophy, prompting inquiry into fundamental problems.');

    -- Q108 (MC) - Conditional Antecedent
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In the structure of a material conditional (p $\rightarrow$ q), the statement p is called the:', 'multiple_choice', 'Conclusion', 'Consequent', 'Antecedent', 'Premise', 'C', 'The antecedent is the statement immediately following the "if".');

    -- Q109 (MC) - Negation and Truth Value
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If a statement is false, its negation ($\sim$) must be:', 'multiple_choice', 'True', 'False', 'Invalid', 'Sound', 'A', 'Negating a false statement results in a true statement.');

    -- Q110 (MC) - Fallacy of Hasty Generalization
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Drawing a sweeping conclusion about all members of a group based on a small, unrepresentative sample is known as:', 'multiple_choice', 'Fallacy of Accident', 'Hasty Generalization', 'Fallacy of Equivocation', 'Appeal to Pity', 'B', 'Hasty Generalization jumps to a conclusion before acquiring sufficient evidence.');

    -- Q111 (MC) - Division of Axiology
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Which of the following falls under the category of Axiology?', 'multiple_choice', 'Ontology', 'Cosmology', 'Aesthetics', 'Epistemology', 'C', 'Aesthetics is the study of value in art and beauty, which is a key part of Axiology.');

    -- Q112 (MC) - Philosophical Term for 'Study of Man'
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Rational Psychology is the philosophical study of:', 'multiple_choice', 'Chemical reactions', 'The physical world', 'The human person (man)', 'Mathematical principles', 'C', 'It is also known as Philosophical Anthropology, focusing on the nature and essence of human beings.');

    -- Q113 (MC) - Fallacy of Ad Hominem Example
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Rejecting a proposal simply because the person presenting it is known to have cheated on their taxes is an example of:', 'multiple_choice', 'Appeal to Ignorance', 'Argumentum ad Populum', 'Argumentum ad Hominem', 'Appeal to Pity', 'C', 'The argument attacks the person''s character rather than the merits of the proposal.');

    -- Q114 (MC) - Argument Claim vs. Structure
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The claim that an argument''s premises provide conclusive grounds for the conclusion distinguishes it as:', 'multiple_choice', 'Inductive', 'Strong', 'Deductive', 'Cogent', 'C', 'The claim of conclusive support is the defining characteristic of a deductive argument.');

    -- Q115 (MC) - Law of Excluded Middle Logic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Law of Excluded Middle means there is no logical ground between being A and being:', 'multiple_choice', 'B', 'Identical to A', 'Not A', 'Both A and B', 'C', 'This law excludes any middle option; a statement must be either true or false.');

    -- Q116 (MC) - General Metaphysics Name
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The branch of Metaphysics also referred to as Ontology is:', 'multiple_choice', 'Special Metaphysics', 'Rational Theology', 'General Metaphysics', 'Cosmology', 'C', 'Ontology is the term for General Metaphysics, the study of being in general.');

    -- Q117 (MC) - Truth Table Row for Biconditional (T $\leftrightarrow$ F)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If p is True and q is False, the biconditional p $\leftrightarrow$ q is:', 'multiple_choice', 'True', 'False', 'Contingent', 'Both True and False', 'B', 'The biconditional is false when the components have different truth values (T $\leftrightarrow$ F = F).');

    -- Q118 (MC) - Truth Table Row for Conjunction (F $\cdot$ F)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If p is False and q is False, the conjunction p $\cdot$ q is:', 'multiple_choice', 'True', 'False', 'Neutral', 'Impossible', 'B', 'The conjunction requires both components to be true, so F $\cdot$ F = F.');

    -- Q119 (MC) - Truth Table Row for Disjunction (T $\vee$ F)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'If p is True and q is False, the disjunction p $\vee$ q is:', 'multiple_choice', 'True', 'False', 'Uncertain', 'Both True and False', 'A', 'The disjunction is true if at least one component is true, so T $\vee$ F = T.');

    -- Q120 (MC) - Fallacy of Complex Question Definition
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The Complex Question fallacy is faulty because it combines what two elements into a single question?', 'multiple_choice', 'Two separate statements', 'A question and a command', 'A question and an assertion', 'A hidden assumption and a question', 'D', 'The fallacy involves asking a question that presupposes the truth of some conclusion buried within the question itself.');

    -- Q121 (MC) - The study of the world or the universe is known as:', 'multiple_choice', 'Rational Theology', 'Ontology', 'Cosmology', 'Rational Psychology', 'C', 'Cosmology is a sub-branch of Special Metaphysics concerned with the cosmos.');

    -- Q122 (MC) - Argument from Pity (Example)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A student arguing for a passing grade by describing their severe financial hardships is committing the fallacy of:', 'multiple_choice', 'Argumentum ad Baculum', 'Argumentum ad Ignorantiam', 'Argumentum ad Misericordiam', 'Petitio Principii', 'C', 'The argument appeals to pity (Misericordiam) rather than the criteria for a passing grade.');

    -- Q123 (MC) - Appeal to Popularity (Example)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A business claiming their product is the best because millions of people use it is committing the fallacy of:', 'multiple_choice', 'Equivocation', 'Argumentum ad Populum', 'Accident', 'Division', 'B', 'The argument appeals to the popularity (Populum) of the product rather than its objective quality.');

    -- Q124 (MC) - Appeal to Force (Example)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'A politician suggesting that those who oppose his bill will face serious consequences is committing the fallacy of:', 'multiple_choice', 'Argumentum ad Ignorantiam', 'Argumentum ad Hominem', 'Argumentum ad Baculum', 'Hasty Generalization', 'C', 'The argument uses a threat of force (Baculum) instead of logical justification.');

    -- Q125 (MC) - Scope of Epistemology
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Epistemology studies all of the following regarding knowledge EXCEPT:', 'multiple_choice', 'Its nature', 'Its justification', 'Its monetary value', 'Its limits', 'C', 'Epistemology focuses on the theoretical aspects of knowledge, not its economic worth.');

    -- Q126 (MC) - Fallacy of Equivocation (Example)
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'An argument that shifts the meaning of a key term like "bank" (river bank vs. financial bank) during the course of the argument commits the fallacy of:', 'multiple_choice', 'Composition', 'Division', 'Equivocation', 'Accident', 'C', 'Equivocation exploits the ambiguity of a word that has multiple meanings.');

    -- Q127 (MC) - Philosophical Originator of Logic
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'The philosopher who first systematized the principles of logic, including the syllogism, was:', 'multiple_choice', 'Socrates', 'Plato', 'Aristotle', 'Thales', 'C', 'Aristotle is the foundational figure in the history of logic.');

    -- =====================================================================
    -- BEGIN FILL-IN-THE-BLANK QUESTIONS (128-150)
    -- =====================================================================

    -- Q128 (FIB) - Law of Non-Contradiction
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The Law of Non-Contradiction states that nothing can be both A and ________.', 'fill_in_blank', 'not A', 'Answer must be word-for-word: "not A"');

    -- Q129 (FIB) - Branch of Philosophy (Value)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The philosophical study of value is known as ________.', 'fill_in_blank', 'Axiology', 'Answer must be word-for-word: "Axiology"');

    -- Q130 (FIB) - Conditional Antecedent
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'In the material conditional p $\rightarrow$ q, the statement p is called the ________.', 'fill_in_blank', 'antecedent', 'Answer must be word-for-word: "antecedent"');

    -- Q131 (FIB) - Philosophical Study of Beauty
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Aesthetics is the philosophical study of beauty, art, and ________.', 'fill_in_blank', 'taste', 'Answer must be word-for-word: "taste"');

    -- Q132 (FIB) - Deductive Argument Evaluation
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The formal properties of validity and invalidity apply to a ________ argument.', 'fill_in_blank', 'deductive', 'Answer must be word-for-word: "deductive"');

    -- Q133 (FIB) - Layman Definition Source
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The definition of philosophy as "the sum total of his fundamental beliefs and convictions" belongs to the ________ definition.', 'fill_in_blank', 'Layman', 'Answer must be word-for-word: "Layman"');

    -- Q134 (FIB) - Fallacy: Begging the Question
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Petitio Principii is the Latin name for the fallacy commonly known as ________ the Question.', 'fill_in_blank', 'Begging', 'Answer must be word-for-word: "Begging"');

    -- Q135 (FIB) - Law of Identity Formula
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The Law of Identity is always stated as follows: "A is ________".', 'fill_in_blank', 'A', 'Answer must be word-for-word: "A"');

    -- Q136 (FIB) - Inductive Argument Evaluation
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Inductive arguments are evaluated in terms of strength and ________.', 'fill_in_blank', 'weakness', 'Answer must be word-for-word: "weakness"');

    -- Q137 (FIB) - Branch of Philosophy (Knowledge)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The branch of philosophy that studies the nature and scope of knowledge is ________.', 'fill_in_blank', 'Epistemology', 'Answer must be word-for-word: "Epistemology"');

    -- Q138 (FIB) - Metaphysics Division (Existence)
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'General Metaphysics is also known as ________.', 'fill_in_blank', 'Ontology', 'Answer must be word-for-word: "Ontology"');

    -- Q139 (FIB) - Fallacy: Appeal to Pity
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Argumentum ad Misericordiam is an appeal to ________.', 'fill_in_blank', 'pity', 'Answer must be word-for-word: "pity"');

    -- Q140 (FIB) - Statement Symbolization
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A statement is said to be ________ when any logical symbol is chosen to represent it.', 'fill_in_blank', 'symbolized', 'Answer must be word-for-word: "symbolized"');

    -- Q141 (FIB) - Logical Connective: AND
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The logical operation of connecting statements with the word "and" is called ________.', 'fill_in_blank', 'conjunction', 'Answer must be word-for-word: "conjunction"');

    -- Q142 (FIB) - Fallacy: Irrelevant Conclusion
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy of Irrelevant Conclusion is known in Latin as Ignoratio ________.', 'fill_in_blank', 'Elenchi', 'Answer must be word-for-word: "Elenchi"');

    -- Q143 (FIB) - Inductive Soundness
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'A strong inductive argument with all true premises is called ________.', 'fill_in_blank', 'cogent', 'Answer must be word-for-word: "cogent"');

    -- Q144 (FIB) - Conditional Consequent
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'In the conditional statement p $\rightarrow$ q, the statement q is called the ________.', 'fill_in_blank', 'consequent', 'Answer must be word-for-word: "consequent"');

    -- Q145 (FIB) - Philosophical Study of God
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The division of Special Metaphysics that deals with the study of God is called Rational ________.', 'fill_in_blank', 'Theology', 'Answer must be word-for-word: "Theology"');

    -- Q146 (FIB) - Fallacy: Against the Person
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The fallacy that attacks the person making the argument is Argumentum ad ________.', 'fill_in_blank', 'Hominem', 'Answer must be word-for-word: "Hominem"');

    -- Q147 (FIB) - Law of Excluded Middle
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The Law of Excluded Middle states that everything is either A or ________.', 'fill_in_blank', 'not A', 'Answer must be word-for-word: "not A"');

    -- Q148 (FIB) - Inductive Argument Claim
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The premises of an inductive argument only claim to make the conclusion ________.', 'fill_in_blank', 'probable', 'Answer must be word-for-word: "probable"');

    -- Q149 (FIB) - Fallacy of Composition
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'Mistakenly inferring a property of the whole from the property of its parts is the Fallacy of ________.', 'fill_in_blank', 'Composition', 'Answer must be word-for-word: "Composition"');

    -- Q150 (FIB) - Philosophical Origin City
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'According to academic philosophers, philosophy originated in the ancient Greek city-state of ________.', 'fill_in_blank', 'Miletus', 'Answer must be word-for-word: "Miletus"');

END $$;