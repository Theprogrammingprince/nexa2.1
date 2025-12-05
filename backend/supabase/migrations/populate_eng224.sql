DO $$
DECLARE
    v_course_id UUID;
BEGIN
    SELECT id INTO v_course_id FROM courses WHERE code = 'ENG224' LIMIT 1;
    
    IF v_course_id IS NULL THEN
        RAISE EXCEPTION 'Course ENG224 not found. Please run course population migration first.';
    END IF;

    -- Q1 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'In a report on mass examination failure, the procedure for finding out how and why there was mass examination failure should be found in the _______.', 'multiple_choice',
    'Introduction', 'Discussion', 'Findings', 'Conclusion', 'B',
    'The procedure for investigation is typically found in the Discussion section of a report.');
'The procedure for investigation is typically found in the Discussion section of a report.');

-- Q2 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Report writing has _______ in common with all other types of writing.', 'fill_in_blank', 'Title', 'All types of writing share the common element of having a title.');

-- Q3 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is a key feature of a good introduction in any report?', 'multiple_choice',
'Brief summary of the topic', 'Brief description of what your presentation will cover', 'Brief story to establish a background to the topic', 'Brief joke to attract the audience', 'B',
'A good introduction should briefly describe what the presentation will cover.');

-- Q4 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'All reports have this component in common _______.', 'multiple_choice',
'Abstract', 'Findings', 'Bibliography', 'Appendix', 'C',
'All reports have a bibliography in common.');

-- Q5 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Identify the type of report: "This document explores the characteristics and condition of audio, video, and motion picture film on the xyz campus."', 'multiple_choice',
'progress report', 'investigative report', 'periodic report', 'survey report', 'D',
'This is a survey report as it explores and presents data on holdings.');

-- Q6 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Identify the type of report: "This Report consists of the findings and recommendations resulting from the TPS review of the UI Revenue."', 'multiple_choice',
'progress report', 'investigative report', 'periodic report', 'survey report', 'B',
'This is an investigative report as it presents findings and recommendations from a review.');

-- Q7 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Identify the type of report: "This report covers the activities of the Agency during the period, 2010 to date."', 'multiple_choice',
'progress report', 'investigative report', 'periodic report', 'survey report', 'C',
'This is a periodic report as it covers activities during a specific period.');

-- Q8 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Identify the type of report: "Although housing is not one of the millennium development goals, MDGs, it is accepted all over the world as one of man''s basic needs."', 'multiple_choice',
'progress report', 'investigative report', 'periodic report', 'survey report', 'D',
'This is a survey report exploring housing as a basic need.');

-- Q9 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Speeches are the same as _______.', 'fill_in_blank', 'Addresses', 'Speeches are the same as addresses.');

-- Q10 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The difference between manuscript and memorised speeches is that manuscript speeches are _______.', 'multiple_choice',
'well read', 'well written', 'well planned', 'well structured', 'A',
'Manuscript speeches are well read from a written text.');

-- Q11 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The difference between extemporaneous and impromptu speeches is that extemporaneous speeches are _______.', 'multiple_choice',
'spontaneous', 'conversational', 'unprepared', 'impulsive', 'B',
'Extemporaneous speeches are conversational and prepared, unlike impromptu which are spontaneous.');

-- Q12 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A paragraph is _______ in terms of its appearance on the page.', 'multiple_choice',
'stylistic', 'aesthetic', 'altruistic', 'functional', 'D',
'A paragraph is functional in terms of its appearance on the page.');

-- Q13 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '"Either ... Or" is an example of _______ conjunction.', 'fill_in_blank', 'correlative', '"Either ... Or" is an example of correlative conjunction.');

-- Q14 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'While writing, you can either develop a concurrent paragraph or a _______.', 'multiple_choice',
'stylistic one', 'functional one', 'retrospective one', 'didactic one', 'C',
'You can develop either a concurrent or retrospective paragraph.');

-- Q15 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is needed when monitoring the growth of a paragraph?', 'multiple_choice',
'Linguistic performance', 'grammatical competence', 'compositional competence', 'Lexical competence', 'C',
'Compositional competence is needed when monitoring paragraph growth.');

-- Q16 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What can be used to avoid repetitions in your compositions?', 'multiple_choice',
'Hyponymy', 'Antonymy', 'Substitution', 'Reversal', 'C',
'Substitution can be used to avoid repetitions in compositions.');

-- Q17 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'As a writer, ensuring the connection of your sentences into meaningful units can be achieved by the use of _______.', 'multiple_choice',
'substitution', 'collocation', 'proforms', 'conjunctions', 'D',
'Conjunctions help connect sentences into meaningful units.');

-- Q18 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Coordinating conjunctions that are used in compositions are also known as _______.', 'fill_in_blank', 'coordinators', 'Coordinating conjunctions are also known as coordinators.');

-- Q19 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'It is believed that subordinating conjunctions are a type of _______ device.', 'multiple_choice',
'connective', 'grammatical competence', 'literary', 'communication', 'A',
'Subordinating conjunctions are a type of connective device.');

-- Q20 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The words "and", "but" and "or" _______.', 'multiple_choice',
'are often regarded as content words in grammar', 'are often regarded as subordinating conjunctions', 'are often seen as collocations', 'link items of strictly parallel grammatical status', 'D',
'These words link items of strictly parallel grammatical status.');

-- Q21 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The word "_______" signals a relationship of choice between two items in a sentence.', 'multiple_choice',
'and', 'or', 'but', 'although', 'B',
'The word "or" signals a relationship of choice between two items.');

-- Q22 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Additive units of information can be linked meaningfully by the use of "_______" in the sentence.', 'multiple_choice',
'and', 'with', 'but', 'while', 'A',
'The word "and" links additive units of information meaningfully.');

-- Q23 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Some markers of coordination which function in pairs are known as _______.', 'fill_in_blank', 'correlatives', 'Markers of coordination functioning in pairs are known as correlatives.');

-- Q24 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"I hope you are okay" should be part of the _______.', 'multiple_choice',
'opening paragraph', 'transitory paragraph', 'intermediate paragraph', 'final paragraph', 'A',
'This phrase should be part of the opening paragraph in informal letters.');

-- Q25 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"Give my love to your sisters" should be part of the _______.', 'multiple_choice',
'opening paragraph', 'transitory paragraph', 'intermediate paragraph', 'final paragraph', 'D',
'This phrase should be part of the final paragraph in informal letters.');

-- Q26 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '"Take care" should be found in the _______ paragraph.', 'fill_in_blank', 'final', '"Take care" is typically found in the final paragraph of informal letters.');

-- Q27 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"Bye for now" is characteristic of _______ letters.', 'multiple_choice',
'formal', 'informal', 'business', 'official', 'B',
'"Bye for now" is characteristic of informal letters.');

-- Q28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"PUBLIC NOTICE Pro-Natura International" is an example of _______ announcement.', 'multiple_choice',
'private', 'public', 'corporate', 'personal', 'B',
'This is an example of a public announcement.');

-- Q29 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Who is the announcer in "PUBLIC NOTICE Pro-Natural International"? _______.', 'fill_in_blank', 'Pro-Natural International', 'Pro-Natural International is the announcer in this public notice.');

-- Q30 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Who is the main audience in a public announcement?', 'multiple_choice',
'employees only', 'management only', 'the general public', 'stakeholders only', 'C',
'The main audience in a public announcement is the general public.');

-- Q31 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the purpose of an announcement?', 'multiple_choice',
'to entertain', 'to inform or notify', 'to persuade', 'to criticize', 'B',
'The purpose of an announcement is to inform or notify the audience.');

-- Q32 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The key message in any announcement for the amendment of an organisation''s constitution should be to _______.', 'multiple_choice',
'entertain members', 'inform about the changes', 'criticize old constitution', 'promote products', 'B',
'The key message should be to inform about constitutional changes.');

-- Q33 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'In terms of its volume, memoranda are characterised by _______.', 'fill_in_blank', 'brevity', 'Memoranda are characterised by brevity in terms of volume.');

-- Q34 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'E-memos are _______ documents.', 'multiple_choice',
'handwritten', 'printed', 'electronic', 'verbal', 'C',
'E-memos are electronic documents.');

-- Q35 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"_______ of Meeting" is an example of a subject of a memorandum.', 'multiple_choice',
'Minutes', 'Records', 'Notes', 'Summary', 'A',
'"Minutes of Meeting" is an example of a memorandum subject.');

-- Q36 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A memorandum is actually an _______.', 'multiple_choice',
'external document', 'internal document', 'legal document', 'financial document', 'B',
'A memorandum is actually an internal document.');

-- Q37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'One important feature of a memorandum is that it is _______.', 'multiple_choice',
'lengthy', 'brief', 'complex', 'decorative', 'B',
'An important feature of a memorandum is that it is brief.');

-- Q38 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ is NOT a feature of a memorandum.', 'fill_in_blank', 'Lengthy paragraphs', 'Lengthy paragraphs are not a feature of memoranda which should be brief.');

-- Q39 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A memorandum is usually not meant to _______.', 'multiple_choice',
'inform', 'entertain', 'communicate internally', 'document decisions', 'B',
'A memorandum is usually not meant to entertain.');

-- Q40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"Best regards" is an example of _______ in informal letter writing.', 'multiple_choice',
'salutation', 'complimentary closing', 'body', 'heading', 'B',
'"Best regards" is an example of complimentary closing in informal letter writing.');

-- Q41 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"Dear Mama", "Hello", "Hi", "Darling" are all examples of _______ in informal letter writing.', 'multiple_choice',
'complimentary closing', 'salutations', 'body text', 'signatures', 'B',
'These are all examples of salutations in informal letter writing.');

-- Q42 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Formal and Informal letters share one feature in common: _______.', 'fill_in_blank', 'they both have addresses', 'Both formal and informal letters have addresses.');

-- Q43 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'RSVP is a/an _______ word.', 'multiple_choice',
'English', 'French', 'Latin', 'Scandinavian', 'B',
'RSVP is a French word meaning "répondez s''il vous plaît".');

-- Q44 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The _______ format is used in literature.', 'multiple_choice',
'APA', 'MLA', 'CRS', 'APP', 'B',
'The MLA format is used in literature.');

-- Q45 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The format of referencing used in ENG 224 is _______.', 'multiple_choice',
'APA', 'MLA', 'CRS', 'APP', 'B',
'The format of referencing used in ENG 224 is MLA.');

-- Q46 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The language of a long essay is _______.', 'multiple_choice',
'informal', 'ambiguous', 'formal', 'flowery', 'C',
'The language of a long essay is formal.');

-- Q47 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'In speech making, your introduction should be _______.', 'fill_in_blank', 'catchy', 'In speech making, your introduction should be catchy to attract attention.');

-- Q48 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Unplanned speeches are also known as _______.', 'multiple_choice',
'Extemporaneous', 'impromptu', 'memorised', 'manuscript', 'B',
'Unplanned speeches are also known as impromptu speeches.');

-- Q49 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ speeches are well planned.', 'multiple_choice',
'Extemporaneous', 'impromptu', 'memorised', 'manuscript', 'A',
'Extemporaneous speeches are well planned.');

-- Q50 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A brief summary of the essential element of the report is called _______.', 'multiple_choice',
'memo', 'abstract', 'foreword', 'acknowledgment', 'B',
'A brief summary of the essential elements is called an abstract.');

-- Q51 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In writing memo, the subject matter is stated in _______.', 'multiple_choice',
'main body', 'title', 'introduction', 'conclusion', 'B',
'In writing memos, the subject matter is stated in the title.');

INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"The Vice-Chancellor could not attend the meeting, but sent a representative." This sentence is an example of _______.', 'multiple_choice',
'Ellipsis of Subject and Auxiliary', 'coordinating ellipsis', 'grammatical coordinates', 'linguistic coordinates', 'A',
'This sentence demonstrates Ellipsis of Subject and Auxiliary.');

-- Q73 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"Let''s complete our TMAs today and tomorrow." This sentence contains _______.', 'multiple_choice',
'Ellipsis of Subject', 'Ellipsis of Subject and Auxiliary', 'Ellipsis of Auxiliary', 'Ellipsis of Predicate', 'D',
'This sentence contains Ellipsis of Predicate.');

-- Q74 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Simple, warm, and detailed are features of _______ letters.', 'fill_in_blank', 'informal', 'Simple, warm, and detailed are features of informal letters.');

-- Q75 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'As far as addresses are concerned, _______ is NOT a feature of a memorandum.', 'multiple_choice',
'sender address', 'recipient name', 'multiple addresses', 'date', 'C',
'Multiple addresses are not a typical feature of memoranda.');

-- Q76 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Generally speaking, a _______ is different from a memorandum.', 'multiple_choice',
'letter', 'note', 'message', 'document', 'A',
'Generally speaking, a letter is different from a memorandum.');

-- Q77 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What part of the text does an introduction belong to in a speech?', 'multiple_choice',
'Summary', 'Introduction', 'Body', 'Conclusion', 'B',
'The introduction belongs to the introductory part of a speech.');

-- Q78 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What type of text discusses debates and changing convictions?', 'multiple_choice',
'Manuscript speech', 'Report', 'Seminar presentation', 'Impromptu speech', 'C',
'Text discussing debates and changing convictions is typically a seminar presentation.');

-- Q79 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Cataphoric referent refers _______.', 'fill_in_blank', 'forward', 'Cataphoric referent refers forward to elements mentioned later.');

-- Q80 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which of the following should NOT be in the appendix of a report?', 'multiple_choice',
'photographs', 'letters', 'statistical details', 'bibliography', 'D',
'Bibliography should not be in the appendix but as a separate section.');

-- Q81 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The arrangement 5 1 3 2 4 represents what in text organization?', 'multiple_choice',
'chronological order', 'logical sequence', 'random order', 'thematic grouping', 'B',
'This arrangement represents a logical sequence for organizing sentences.');

-- Q82 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is "Youth Empowerment: Panacea for Peace and Development" an example of?', 'multiple_choice',
'a subtitle', 'a speech title', 'an abstract', 'a conclusion', 'B',
'This is an example of a speech title.');

-- Q83 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Discussions about changing convictions belong to which part of a text?', 'multiple_choice',
'Summary', 'Introduction', 'Body', 'Conclusion', 'B',
'Such discussions typically belong to the introduction of a text.');

-- Q84 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'According to Harrold Lasswell, the surveillance function means the media''s ability to _______.', 'fill_in_blank', 'select, evaluate and interpret news', 'Surveillance function means selecting, evaluating and interpreting news.');

-- Q85 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'When Wilbur Schramm defines theory as a "crap-detector," it means it enables us to _______.', 'multiple_choice',
'detect lies', 'separate scientific statements from unscientific ones', 'find errors', 'analyze data', 'B',
'A "crap-detector" separates scientific from unscientific statements.');

-- Q86 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Communication is all of the following, EXCEPT _______.', 'multiple_choice',
'sharing information', 'transmitting messages', 'the non-transmitting of messages', 'exchanging ideas', 'C',
'Communication involves transmitting, not non-transmitting messages.');

-- Q87 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Designing of the message is the stimulus for _______.', 'multiple_choice',
'Reception', 'Transmission', 'Feedback', 'Encoding', 'B',
'Designing the message is the stimulus for transmission.');

-- Q88 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'One of these is not a mode of traditional communicating system: _______.', 'fill_in_blank', 'Demonic Mode of Communication', 'Demonic Mode is not a recognized mode of traditional communication.');

-- Q89 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'African communication system does NOT _______.', 'multiple_choice',
'promote unity', 'avoid agreement on Africa''s development', 'facilitate interaction', 'preserve culture', 'B',
'African communication system does not avoid agreement on development.');

-- Q90 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The electronic media technique can be divided into all of these but one _______.', 'multiple_choice',
'Production', 'Distribution', 'Reproduction', 'Exhibition', 'C',
'Reproduction is not a division of electronic media technique.');

-- Q91 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'One of these is not an instrument of authoritarian control of the media _______.', 'multiple_choice',
'Censorship', 'Licensing', 'Presence of liberal legislation', 'State ownership', 'C',
'Liberal legislation is not an instrument of authoritarian control.');

-- Q92 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'One of these is not a pattern of media ownership _______.', 'multiple_choice',
'Government ownership', 'Private ownership', 'Home ownership', 'Public ownership', 'C',
'Home ownership is not a pattern of media ownership.');

-- Q93 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'All but one of these is a media structure that can be used to control the broadcast media: _______.', 'fill_in_blank', 'Preproduction', 'Preproduction is not a media control structure.');

-- Q94 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is not an obstacle to social change.', 'multiple_choice',
'Resistance to change', 'National interest', 'Cultural barriers', 'Economic constraints', 'B',
'National interest is not an obstacle to social change.');

-- Q95 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Cultural imperialism can also be referred to as _______.', 'multiple_choice',
'cultural exchange', 'cultural dependency and domination', 'cultural diversity', 'cultural integration', 'B',
'Cultural imperialism can be referred to as cultural dependency and domination.');

-- Q96 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Impoverished people in developing countries cannot learn how rich people in developed countries live through _______.', 'multiple_choice',
'Television', 'Radio', 'Cooking food', 'Internet', 'C',
'Cooking food does not show how rich people in developed countries live.');

-- Q97 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The New World Information Order is an international system of all of these, but one _______.', 'multiple_choice',
'information flow', 'communication equity', 'categorisation of information', 'media balance', 'C',
'Categorisation of information is not part of the New World Information Order.');

-- Q98 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ is not amongst the big four international news agencies.', 'fill_in_blank', 'American International Press', 'American International Press is not one of the big four news agencies.');

-- Q99 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is not a type of social institution.', 'multiple_choice',
'Educational institution', 'Religious institution', 'Fire service institution', 'Political institution', 'C',
'Fire service institution is not a type of social institution.');

-- Q100 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The major economic and business stories which journalists should consider do NOT include _______.', 'multiple_choice',
'Market trends', 'Corporate earnings', 'Child health', 'Financial policies', 'C',
'Child health is not typically a major economic/business story.');

-- Q101 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A typical Nigerian economic journalist contends with problems which include all the following, EXCEPT _______.', 'multiple_choice',
'Access to data', 'Economic complexity', 'The science of economics is riddled with international players', 'Language barriers', 'C',
'International players in economics is not typically listed as a problem.');

-- Q102 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ is not a type of media technology.', 'fill_in_blank', 'hand-dryer', 'A hand-dryer is not a type of media technology.');

-- Q103 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The subtle influence on the lives of the audience by the mass media can be described as _______.', 'multiple_choice',
'media manipulation', 'social effects of the media', 'media bias', 'propaganda', 'B',
'This is described as social effects of the media.');

-- Q104 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which is NOT a theory that captures the social effects of the media?', 'multiple_choice',
'Agenda-setting theory', 'Spiral of speech media theory', 'Cultivation theory', 'Uses and gratifications', 'B',
'Spiral of speech media theory is not a recognized theory of media effects.');

-- Q105 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'When you use words to communicate it is called _______ communication.', 'multiple_choice',
'Non-verbal', 'Verbal', 'Visual', 'Tactile', 'B',
'Using words to communicate is called verbal communication.');

-- Q106 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'As _______ we are always communicating.', 'multiple_choice',
'individuals', 'humans', 'speakers', 'writers', 'B',
'As humans we are always communicating.');

-- Q107 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Communicare is the _______ term for the word communication.', 'fill_in_blank', 'Latin', 'Communicare is the Latin term for communication.');

-- Q108 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is the generic term for any kind of communication which is done without the use of words.', 'multiple_choice',
'Verbal communication', 'Non-verbal communication', 'Oral communication', 'Written communication', 'B',
'Non-verbal communication is done without the use of words.');

-- Q109 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Membranophones are communication instruments which are made from _______.', 'multiple_choice',
'metal', 'wood', 'skins of animals', 'plastic', 'C',
'Membranophones are made from the skins of animals.');

-- Q110 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian Press Council of Nigeria was established by decree _______ of 1999.', 'multiple_choice',
'75', '80', '85', '90', 'C',
'The Nigerian Press Council was established by decree 85 of 1999.');

-- Q111 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The general interest magazine is also known as _______ magazine.', 'fill_in_blank', 'mass', 'The general interest magazine is also known as mass magazine.');

-- Q112 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Attires, colours, dressings are used as _______ type of communication.', 'multiple_choice',
'Verbal', 'Visual', 'Tactile', 'Oral', 'B',
'Attires and colours are used as visual type of communication.');

-- Q113 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Traditional Communication system is also known as _______.', 'multiple_choice',
'Modern media', 'Folk media', 'Mass media', 'Digital media', 'B',
'Traditional communication system is also known as folk media.');

-- Q114 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The process of transferring thoughts, ideas, facts, feelings from one person to another is called _______.', 'multiple_choice',
'Interaction', 'Communication', 'Conversation', 'Discussion', 'B',
'Transferring thoughts and ideas from one person to another is called communication.');

-- Q115 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ is anything that interferes with the process of communication.', 'fill_in_blank', 'Noise', 'Noise is anything that interferes with communication process.');

-- Q116 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Verbal mode of communication involves mainly the use of _______.', 'multiple_choice',
'gestures', 'words', 'symbols', 'images', 'B',
'Verbal mode of communication involves mainly the use of words.');

-- Q117 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Mass communication keeps the world running smoothly by helping individuals to _______ the environment.', 'multiple_choice',
'Control', 'Survey', 'Manage', 'Dominate', 'B',
'Mass communication helps individuals survey the environment.');

-- Q118 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A journalist should observe the universally accepted principle of _______ by not disclosing sources.', 'multiple_choice',
'Transparency', 'Confidentiality', 'Accountability', 'Integrity', 'B',
'Journalists should observe the principle of confidentiality.');

-- Q119 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Magazines published for a particular trade are known as _______.', 'multiple_choice',
'General magazine', 'Special interest magazine', 'Mass magazine', 'Popular magazine', 'B',
'Magazines for particular trades are known as special interest magazines.');

-- Q120 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Indigenous professionals, bureaucrats, generals are examples of the _______ in Nigerian society.', 'fill_in_blank', 'bourgeoisie', 'These groups are examples of the bourgeoisie in Nigerian society.');

-- Q121 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Why did Herbert Altschull insist that an independent press cannot exist?', 'multiple_choice',
'Media is biased', 'News organs are agents of those who exercise political and economic control', 'Journalists lack training', 'Technology limits freedom', 'B',
'Altschull said news organs are agents of those with political and economic control.')

Q121 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Why did Herbert Altschull insist that an independent press cannot exist?', 'multiple_choice',
'Media is biased', 'News organs are agents of those who exercise political and economic control', 'Journalists lack training', 'Technology limits freedom', 'B',
'Altschull said news organs are agents of those with political and economic control.');

-- Q122 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '"Communication" as a term is derived from _______ meaning "communicare".', 'multiple_choice',
'Greek', 'Latin word', 'French', 'Spanish', 'B',
'Communication is derived from Latin meaning communicare.');

-- Q123 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The main purpose of establishing the press council is to _______.', 'multiple_choice',
'Control the press', 'maintain the character of the press in accordance with professional standards', 'Censor media', 'Regulate ownership', 'B',
'The main purpose is to maintain press character according to professional standards.');

-- Q124 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'It has often been believed that the Nigerian press was borne and nurtured _______.', 'fill_in_blank', 'in the waters of colonialism', 'The Nigerian press was borne and nurtured in waters of colonialism.');

-- Q125 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Instrumental Mode of Communication consists of modes which use all EXCEPT _______.', 'multiple_choice',
'idiophones', 'aerophones', 'pseudophones', 'membranophones', 'C',
'Instrumental mode does not include pseudophones.');

-- Q126 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Another name for the Free press theory is _______.', 'multiple_choice',
'Authoritarian theory', 'The Libertarian theory', 'Social responsibility theory', 'Development theory', 'B',
'Free press theory is also known as Libertarian theory.');

-- Q127 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which structure cannot be used to indirectly control the mass media?', 'multiple_choice',
'Ownership structure', 'Production structure', 'News flow', 'Management structure', 'C',
'News flow cannot be used to indirectly control mass media.');

-- Q128 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The major tenets of Development Media Theory as enunciated by McQuail include all but one _______.', 'multiple_choice',
'Media should support development', 'Media must be included in all national discussions', 'Media should prioritize national goals', 'Media should be responsible', 'B',
'Media being included in all national discussions is not a major tenet.');

-- Q129 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian press had its debut in _______ newspaper.', 'fill_in_blank', 'Rev. Henry Townsend''s', 'The Nigerian press had its debut in Rev. Henry Townsend''s newspaper.');

-- Q130 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The public is entitled to lodge complaints against media, provided the complaint is one of _______.', 'multiple_choice',
'personal opinion', 'unethical conduct', 'disagreement', 'preference', 'B',
'The public can complain about unethical conduct.');

-- Q131 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ culture consists of ideas behind the making and transformation of material objects.', 'multiple_choice',
'Material', 'Non-material', 'Physical', 'Tangible', 'B',
'Non-material culture consists of ideas behind making material objects.');

-- Q132 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The modifications of the body of knowledge of people and their tools is known as _______.', 'multiple_choice',
'Social change', 'Cultural change', 'Economic development', 'Technological progress', 'B',
'This is known as cultural change.');

-- Q133 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The two major approaches to social change are _______.', 'multiple_choice',
'Traditional and modern', 'Evolutionary approach and revolutionary approach', 'Gradual and rapid', 'Internal and external', 'B',
'The two major approaches are evolutionary and revolutionary.');

-- Q134 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Which cannot be used by western nations as instruments of media imperialism? _______.', 'fill_in_blank', 'football', 'Football cannot be used as an instrument of media imperialism.');

-- Q135 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is the name under which sociologists study inequality in society.', 'multiple_choice',
'Social mobility', 'Social structure or social stratification', 'Social interaction', 'Social organization', 'B',
'Inequality is studied under social structure or social stratification.');

-- Q136 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Who argues that culture embraces what people ate, wore, and how they talked?', 'multiple_choice',
'Daramola', 'Rodney', 'McQuail', 'Sambe', 'B',
'Rodney argues this about culture.');

-- Q137 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Culture has two components namely _______.', 'multiple_choice',
'old and new', 'material and nonmaterial culture', 'traditional and modern', 'physical and spiritual', 'B',
'Culture has material and nonmaterial components.');

-- Q138 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ includes the language, philosophy, religion, values and ideologies found among people.', 'multiple_choice',
'Material culture', 'Culture', 'Social structure', 'Tradition', 'B',
'Culture includes language, philosophy, religion, and values.');

-- Q139 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Who contends that media have dominant roles in shaping Nigerian cultures and norms? _______.', 'fill_in_blank', 'Sambe', 'Sambe contends that media shape Nigerian cultures and norms.');

-- Q140 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A process by which organism develops naturally from simple to complex is called _______.', 'multiple_choice',
'Revolutionary Approach', 'Evolutionary Approach', 'Progressive Approach', 'Developmental Approach', 'B',
'Natural development from simple to complex is the Evolutionary Approach.');

-- Q141 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ are intensive and drastic changes of patterns of social organisations.', 'multiple_choice',
'Evolutionary changes', 'Revolutionary Approach', 'Gradual changes', 'Minor adjustments', 'B',
'Intensive and drastic changes are Revolutionary Approach.');

-- Q142 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Who describes imperialism as the drive to conquer and subjugate other peoples?', 'multiple_choice',
'Lenin', 'Hobson', 'Marx', 'Weber', 'B',
'Hobson describes imperialism as the drive to conquer and subjugate.');

-- Q143 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is a term that describes the growing worldwide interdependence of people and countries.', 'multiple_choice',
'Internationalization', 'Globalization', 'Modernization', 'Westernization', 'B',
'Globalization describes the growing worldwide interdependence.');

-- Q144 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ institution regulates behaviour patterns in procreation and biological relations.', 'fill_in_blank', 'The Family and Kinship Institutions', 'The Family and Kinship Institutions regulate procreation and biological relations.');

-- Q145 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Who argues that the family pattern varies from society to society?', 'multiple_choice',
'Rodney', 'Daramola', 'McQuail', 'Sambe', 'B',
'Daramola argues that family patterns vary from society to society.');

-- Q146 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ deal with the socialization of the young into adults.', 'multiple_choice',
'Political institutions', 'Educational institutions', 'Economic institutions', 'Religious institutions', 'B',
'Educational institutions deal with socialization of the young into adults.');

-- Q147 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is central to the survival of society dealing with production, distribution and consumption.', 'multiple_choice',
'Political institution', 'economic institution', 'Educational institution', 'Religious institution', 'B',
'Economic institution is central to society dealing with production and distribution.');

-- Q148 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ deals with the control and use of force within society.', 'multiple_choice',
'Economic Institution', 'Political Institution', 'Legal Institution', 'Military Institution', 'B',
'Political Institution deals with control and use of force within society.');

-- Q149 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ describes the economic condition with declining output when inflation is rising.', 'fill_in_blank', 'Stagflation', 'Stagflation describes recession and inflation occurring simultaneously.');

-- Q150 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The study or use of processes for storing, retrieving and sending information is called _______.', 'multiple_choice',
'Computer Science', 'Information Technology (IT)', 'Data Processing', 'Telecommunications', 'B',
'This is called Information Technology (IT).');

END $$;