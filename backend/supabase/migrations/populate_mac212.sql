DO $$
DECLARE
    v_course_id UUID;
BEGIN
    SELECT id INTO v_course_id FROM courses WHERE code = 'MAC212' LIMIT 1;

    -- Q1 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Who observed that communication "serves as an instrument of social interaction"?', 'multiple_choice',
    'Sybil etal (1989:2)', 'Soola, O (1998:14)', 'Daramola', 'McQuail (2000)', 'A',
    'Sybil etal (1989:2) observed that communication serves as an instrument of social interaction.');

    -- Q2 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, '________ is a form of communication which is carried out without speech.', 'fill_in_blank', 'Non-verbal communication', 'Communication carried out without speech is non-verbal communication.');

    -- Q3 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'When three or more people come together with a view to achieving a specific goal, what is formed?', 'multiple_choice',
    'Intrapersonal communication', 'Mass communication', 'Group communication', 'Visual communication', 'C',
    'When three or more people come together with a view to achieving a specific goal, group communication is formed.');

    -- Q4 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'What is the process of transmitting information to a relatively large, heterogeneous and anonymous audience simultaneously?', 'multiple_choice',
    'Group communication', 'Interpersonal communication', 'Mass communication', 'Intrapersonal communication', 'C',
    'Mass communication is the process of transmitting information to a relatively large, heterogeneous and anonymous audience simultaneously.');

    -- Q5 - Fill in the blank
    INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
    VALUES (v_course_id, 'The ________ is the decoder of the Message.', 'fill_in_blank', 'receiver', 'The receiver is the decoder of the message.');

    -- Q6 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Before the introduction of modern means of communication in Africa, what communication system was in place?', 'multiple_choice',
    'Digital communication', 'Traditional or trado-communication', 'Electronic media', 'Satellite communication', 'B',
    'Before modern communication, Africans had traditional or trado-communication in place.');

    -- Q7 - Multiple choice
    INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id, 'Traditional communication is also known as _______.', 'multiple_choice',
    'digital media', 'folk media or tradocommunication', 'broadcast media', 'satellite media', 'B',
    'Traditional communication is also known as folk media or tradocommunication.');
-- Q7 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Traditional communication is also known as _______.', 'multiple_choice',
'digital media', 'folk media or tradocommunication', 'broadcast media', 'satellite media', 'B',
'Traditional communication is also known as folk media or tradocommunication.');

-- Q8 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Who is a messenger that goes about with his iron gong to announce messages to society?', 'multiple_choice',
'The minstrel', 'The story teller', 'Town crier or gong man', 'The hornman', 'C',
'The town crier or gong man uses an iron gong to announce messages to society.');

-- Q9 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The ________ uses the elephant tusk (horn) to call people''s attention.', 'fill_in_blank', 'Hornman', 'The Hornman uses the elephant tusk to call people''s attention.');

-- Q10 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A singer who communicates with people indirectly through songs is called _______.', 'multiple_choice',
'the story teller', 'the minstrel', 'the town crier', 'the hornman', 'B',
'The minstrel is a singer who communicates indirectly through songs.');

-- Q11 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What consists of modes which use idiophones, aerophones, membranophones and symbolography?', 'multiple_choice',
'Visual Mode of Communication', 'Instrumental Mode of Communication', 'Demonstrative Mode of Communication', 'Iconographic Mode of Communication', 'B',
'Instrumental Mode of Communication consists of idiophones, aerophones, membranophones and symbolography.');

-- Q12 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ are self-sounding instruments which produce sound when beaten, pricked, struck or plucked.', 'fill_in_blank', 'Idiophones', 'Idiophones are self-sounding instruments.');

-- Q13 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What are instruments which produce sound as a result of the vibration of a column of air in them?', 'multiple_choice',
'Idiophones', 'Aerophones', 'Membranophones', 'Symbolography', 'B',
'Aerophones produce sound through vibration of air columns.');

-- Q14 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What are communication instruments made from the skins of animals?', 'multiple_choice',
'Aerophones', 'Idiophones', 'Membranophones', 'Symbolography', 'C',
'Membranophones are communication instruments made from animal skins.');

-- Q15 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is the use of cryptic representation in the form of pseudo-writing made on surfaces.', 'fill_in_blank', 'Symbolography', 'Symbolography involves cryptic representation on surfaces.');

-- Q16 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What mode of communication consists of the use of music and signal?', 'multiple_choice',
'Instrumental Mode', 'Demonstrative Mode of Communication', 'Visual Mode', 'Extra-Mundane Mode', 'B',
'Demonstrative Mode of Communication uses music and signals.');

-- Q17 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What mode consists of the use of objects and floral media?', 'multiple_choice',
'Demonstrative Mode', 'Iconographic Mode of Communication', 'Visual Mode', 'Institutional Mode', 'B',
'Iconographic Mode of Communication consists of objects and floral media.');

-- Q18 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What mode is believed to take place between the living and the dead or supernatural beings?', 'multiple_choice',
'Visual Mode', 'Extra-Mundane Mode of Communication', 'Demonstrative Mode', 'Institutional Mode', 'B',
'Extra-Mundane Mode of Communication takes place between the living and supernatural beings.');

-- Q19 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ consists of the use of colours and dressing to communicate certain feelings.', 'fill_in_blank', 'Visual Mode of Communication', 'Visual Mode uses colours and dressing for communication.');

-- Q20 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The mass media can be broadly classified into how many categories?', 'multiple_choice',
'three', 'four', 'two', 'five', 'C',
'The mass media can be broadly classified into two: print media and electronic media.');

-- Q21 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Newspapers in terms of format can be categorized into _______.', 'multiple_choice',
'three types', 'tabloid and standard size', 'large and small', 'daily and weekly', 'B',
'Newspapers are categorized into tabloid and standard size in terms of format.');

-- Q22 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'General Interest Magazine is also known as ________.', 'fill_in_blank', 'mass magazine', 'General Interest Magazine is also known as mass magazine.');

-- Q23 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What type of magazine is designed for specialized people with specialized language?', 'multiple_choice',
'Mass magazine', 'Specialized Magazine', 'Literary magazine', 'Junk magazine', 'B',
'Specialized Magazine is designed for specialized people with specialized language.');

-- Q24 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What type of magazine is written in a very literary style for highly educated members of society?', 'multiple_choice',
'Mass magazine', 'Specialized magazine', 'Literary or Class Magazine', 'Junk magazine', 'C',
'Literary or Class Magazine is written in literary style for highly educated members.');

-- Q25 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What describes a situation in which the mass media are subordinated to state power?', 'multiple_choice',
'Libertarian Media Theory', 'Authoritarian Media Theory', 'Democratic Participant Theory', 'Social Responsibility Theory', 'B',
'Authoritarian Media Theory describes media subordinated to state power.');

-- Q26 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The Authoritarian Media Theory dates from the ________ century.', 'fill_in_blank', '16th', 'The Authoritarian Media Theory dates from the 16th century.');

-- Q27 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What theory believes that an individual should be free to publish what they like?', 'multiple_choice',
'Authoritarian Theory', 'Libertarian Theory (Free Press)', 'Development Media Theory', 'Social Responsibility Theory', 'B',
'Libertarian Theory believes individuals should be free to publish freely.');

-- Q28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What theory calls for grassroot participation in the control of mass media?', 'multiple_choice',
'Libertarian Theory', 'Authoritarian Theory', 'Democratic Participant Theory', 'Development Media Theory', 'C',
'Democratic Participant Theory calls for grassroot participation in media control.');

-- Q29 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ theory can be aptly described as a child of the industrial revolution.', 'fill_in_blank', 'Social responsibility', 'Social responsibility theory is a child of the industrial revolution.');

-- Q30 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Who defined society as "a number of individuals connected by interactions"?', 'multiple_choice',
'Daramola', 'George Simmel', 'Wilbur Schramm', 'McQuail', 'B',
'George Simmel defined society as individuals connected by interactions.');

-- Q31 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nigeria has up to how many tribes?', 'multiple_choice',
'150', '200', '250', '300', 'C',
'Nigeria has up to 250 tribes.');

-- Q32 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Ajasa and Ernest Ikoli''s African Messenger newspaper was established in ________.', 'fill_in_blank', '1921', 'The African Messenger was established in 1921.');

-- Q33 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What refers to public ownership of the mass media by charter?', 'multiple_choice',
'Government Ownership', 'Private Ownership', 'Public Ownership', 'User Ownership', 'C',
'Public Ownership refers to media operated by charter on behalf of the public.');

-- Q34 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What refers to private ownership of the media?', 'multiple_choice',
'Government Ownership', 'Private Ownership', 'Public Ownership', 'User Ownership', 'B',
'Private Ownership refers to private ownership of media.');

-- Q35 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is the initiative of the audience like fan clubs with their own stations.', 'fill_in_blank', 'User Ownership', 'User Ownership is audience initiative like fan clubs.');

-- Q36 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is a process by which broadcast stations are supplied programmes by production companies?', 'multiple_choice',
'Management', 'Syndication', 'Production', 'Distribution', 'B',
'Syndication is the process of supplying programmes to broadcast stations.');

-- Q37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is practically the same thing with freedom of expression?', 'multiple_choice',
'Press censorship', 'Press freedom', 'Press control', 'Press regulation', 'B',
'Press freedom is practically the same as freedom of expression.');

-- Q38 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ are self regulatory bodies which enforce moral sanctions in journalism.', 'fill_in_blank', 'Press councils', 'Press councils are self regulatory bodies for journalism.');

-- Q39 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian Press Council was established as an autonomous body in what year?', 'multiple_choice',
'1990', '1991', '1992', '1993', 'C',
'The Nigerian Press Council was established in 1992.');

-- Q40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian Press Council was inaugurated with how many members?', 'multiple_choice',
'15 members', '16 members', '17 members', '18 members', 'C',
'The Nigerian Press Council was inaugurated with 17 members.');

-- Q41 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The ________ investigates and deals with complaints brought before the Council.', 'fill_in_blank', 'Complaint Committee', 'The Complaint Committee investigates complaints.');

-- Q42 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What communication is also known as face-to-face communication?', 'multiple_choice',
'Group communication', 'Inter-personal communication', 'Mass communication', 'Intrapersonal communication', 'B',
'Inter-personal communication is also known as face-to-face communication.');

-- Q43 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the last but important part of the communication process?', 'multiple_choice',
'Message', 'Channel', 'Feedback', 'Noise', 'C',
'Feedback is the last but important part of the communication process.');

-- Q44 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is the receiver''s response to the source''s message.', 'fill_in_blank', 'Feedback', 'Feedback is the receiver''s response to the message.');

-- Q45 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Who is the initiator of the communication encounter?', 'multiple_choice',
'The receiver', 'The transmitter', 'The decoder', 'The channel', 'B',
'The transmitter is the initiator of the communication encounter.');

-- Q46 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The transmitter is also known as _______.', 'multiple_choice',
'the decoder', 'the source, the encoder, or the sender', 'the channel', 'the receiver', 'B',
'The transmitter is also known as the source, encoder, communicator or sender.');

-- Q47 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is the process of transferring information within an individual.', 'fill_in_blank', 'Intrapersonal communication', 'Intrapersonal communication transfers information within an individual.');

-- Q48 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Skin colour is an example of what type of communication?', 'multiple_choice',
'Verbal communication', 'Tactile communication', 'Genetic factor communication', 'Visual communication', 'C',
'Skin colour is an example of genetic factor communication.');

-- Q49 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Touching is a form of what communication?', 'multiple_choice',
'Verbal communication', 'Visual communication', 'Tactile communication', 'Oral communication', 'C',
'Touching is a form of tactile communication.');

-- Q50 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanaQ50 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Human communication falls into two broad categories namely ________ and ________.', 'fill_in_blank', 'Verbal and non-verbal', 'Human communication falls into verbal and non-verbal categories.');

-- Q51 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The term communication is derived from the French word "communis", which means _______.', 'multiple_choice',
'to share', 'common', 'to speak', 'to transfer', 'B',
'Communication is derived from "communis" meaning common.');

-- Q52 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Communication serves as an instrument of what type of interaction?', 'multiple_choice',
'Economic interaction', 'Social interaction', 'Political interaction', 'Cultural interaction', 'B',
'Communication serves as an instrument of social interaction.');

-- Q53 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The term communication is derived from the ________ word "communicare".', 'fill_in_blank', 'Latin', 'Communication is derived from the Latin word communicare.');

-- Q54 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'News Line program is aired by which broadcast station?', 'multiple_choice',
'AIT', 'NTA', 'Channels TV', 'TVC', 'B',
'News Line program is aired by NTA broadcast station.');

-- Q55 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The libertarian media theory suggests that the press is _______.', 'multiple_choice',
'controlled', 'free', 'subordinated', 'restricted', 'B',
'The libertarian media theory suggests the press is free.');

-- Q56 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Mass media being subordinated to state means they are operating ________ theory.', 'fill_in_blank', 'Authoritarian', 'Media subordinated to state operates under Authoritarian theory.');

-- Q57 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the basic assumption of a normative theory?', 'multiple_choice',
'Media is always objective', 'Media takes the form and coloration of the society in which it operates', 'Media is independent of society', 'Media controls society', 'B',
'Normative theory assumes media takes the form of society in which it operates.');

-- Q58 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Dynamism as one of the characteristics of a theory means _______.', 'multiple_choice',
'theories are permanent', 'theories are subject to change', 'theories are static', 'theories are absolute', 'B',
'Dynamism means theories are subject to change.');

-- Q59 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'According to Wilbur Schramm, a theory is a way of explaining the ________ of different events in the society.', 'fill_in_blank', 'ordering', 'A theory explains the ordering of different events in society.');

-- Q60 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The production and diffusion of media by powerful countries to the detriment of developing countries has led to the concept of _______.', 'multiple_choice',
'media freedom', 'media imperialism', 'media democracy', 'media development', 'B',
'This has led to the concept of media imperialism.');

-- Q61 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the general science of right and wrong?', 'multiple_choice',
'Philosophy', 'Ethics', 'Morality', 'Law', 'B',
'Ethics is the general science of right and wrong.');

-- Q62 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The study or use of processes for storing, retrieving and sending out information into a global village is called ________.', 'fill_in_blank', 'Information technology (IT)', 'This is called Information technology or IT.');

-- Q63 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The media as "great mentioners" means _______.', 'multiple_choice',
'they report everything', 'they have the power to build or destroy an individual or institution', 'they are always accurate', 'they are objective', 'B',
'As great mentioners, media have power to build or destroy individuals or institutions.');

-- Q64 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the most powerful media in the world today?', 'multiple_choice',
'Print media', 'Broadcast media', 'Social media', 'Digital media', 'B',
'Broadcast media is the most powerful media today.');

-- Q65 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A mass magazine is also known as ________ magazine.', 'fill_in_blank', 'General interest', 'A mass magazine is also known as general interest magazine.');

-- Q66 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The print media have a mechanism that makes it unique by depending on _______.', 'multiple_choice',
'broadcasting items', 'printing items of information', 'digital transmission', 'verbal communication', 'B',
'Print media depend on printing items of information.');

-- Q67 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Social cohesion is maintained by _______.', 'multiple_choice',
'government', 'communication', 'economy', 'education', 'B',
'Social cohesion is maintained by communication.');

-- Q68 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The primary function of the mass media system is to ________.', 'fill_in_blank', 'provide information to several people', 'The primary function is to provide information to several people.');

-- Q69 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The two primary mass media channels of communication are _______.', 'multiple_choice',
'verbal and non-verbal', 'print and electronic', 'traditional and modern', 'public and private', 'B',
'The two primary channels are print and electronic.');

-- Q70 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Whose book on ethics was titled Nichomachean Ethics?', 'multiple_choice',
'Plato', 'Aristotle', 'Socrates', 'Kant', 'B',
'Aristotle''s book on ethics was titled Nichomachean Ethics.');

-- Q71 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The communication with the use of the mouth is ________ communication.', 'fill_in_blank', 'Oral', 'Communication with the mouth is oral communication.');

-- Q72 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The subtle influence of the mass media on the habits of the audience is referred to as _______.', 'multiple_choice',
'media control', 'social effect of the media', 'media manipulation', 'media bias', 'B',
'This is referred to as social effect of the media.');


-- Q74 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian Press Council works through ________ committees.', 'fill_in_blank', '4', 'The Nigerian Press Council works through 4 committees.');

-- Q75 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A journalist who copies other people''s work without attribution is guilty of _______.', 'multiple_choice',
'fraud', 'plagiarism', 'libel', 'slander', 'B',
'Copying others'' work without attribution is plagiarism.');

-- Q76 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What serves as a compass or guiding instrument of various professions across the world?', 'multiple_choice',
'Laws', 'Ethics', 'Regulations', 'Policies', 'B',
'Ethics serve as a compass or guiding instrument for professions.');

-- Q77 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In what year did Xerox Corporation introduce the ''daisy'' print wheel?', 'multiple_choice',
'1972', '1973', '1974', '1975', 'C',
'Xerox introduced the daisy print wheel in 1974.');

-- Q78 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'ITT Corporation developed the first fibre-optics technology in ________.', 'fill_in_blank', '1966', 'ITT Corporation developed fibre-optics in 1966.');

-- Q79 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In what year did IBM Corporation market its Electric Typewriter with memory?', 'multiple_choice',
'1962', '1963', '1964', '1965', 'C',
'IBM marketed its Electric Typewriter with memory in 1964.');

-- Q80 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The first satellite radio message was transmitted in what year?', 'multiple_choice',
'1956', '1957', '1958', '1959', 'C',
'The first satellite radio message was transmitted in 1958.');

-- Q81 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The transistor was invented by Brattain and Barden in ________.', 'fill_in_blank', '1947', 'The transistor was invented in 1947 by Brattain and Barden.');

-- Q82 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the full meaning of the acronym ENIAC?', 'multiple_choice',
'Electronic Number Indicator and Calculator', 'Electronic Numerical Indicator and Calculator', 'Electronic Network Indicator and Calculator', 'Electronic Numerical Integration and Calculator', 'B',
'ENIAC stands for Electronic Numerical Indicator and Calculator.');

-- Q83 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The BBC started its first public television service in the world in what year?', 'multiple_choice',
'1934', '1935', '1936', '1937', 'C',
'BBC started its first public television service in 1936.');

-- Q84 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The vacuum tube amplifier (the valve) was produced in 1913 by whom?', 'multiple_choice',
'Alexander Bell', 'H.D Arnold', 'James Maxwell', 'John Baird', 'B',
'The vacuum tube amplifier was produced by H.D Arnold in 1913.');

-- Q85 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Baird demonstrated the first colour television pictures in ________.', 'fill_in_blank', '1928', 'Baird demonstrated first colour television pictures in 1928.');

-- Q86 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The first electric typewriter was used for commercial use in what year?', 'multiple_choice',
'1918', '1919', '1920', '1921', 'C',
'The first electric typewriter was used commercially in 1920.');

-- Q87 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The first words were transmitted on a telephone by Alexander Bell in what year?', 'multiple_choice',
'1874', '1875', '1876', '1877', 'C',
'Alexander Bell transmitted first words on telephone in 1876.');

-- Q88 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'James Maxwell proved the existence of radio waves in ________.', 'fill_in_blank', '1867', 'James Maxwell proved existence of radio waves in 1867.');

-- Q89 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The lead pencil was invented in what year?', 'multiple_choice',
'1580', '1590', '1600', '1610', 'B',
'The lead pencil was invented in 1590.');

-- Q90 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In what year was W. Caxton''s book printed in English?', 'multiple_choice',
'1456', '1466', '1476', '1486', 'C',
'W. Caxton''s book was printed in English in 1476.');

-- Q91 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is the total way of life of a people.', 'fill_in_blank', 'Culture', 'Culture is the total way of life of a people.');

-- Q92 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The contemporary class structure of Nigeria has which group at the lowest ebb?', 'multiple_choice',
'the bourgeoisie', 'the middle class', 'peasantry and the lumpens', 'the elite', 'C',
'The peasantry and lumpens are at the lowest ebb in Nigeria''s class structure.');

-- Q93 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The contemporary class structure of Nigeria has which group on top of the ladder?', 'multiple_choice',
'the proletariat', 'the bourgeoisie', 'the peasantry', 'the middle class', 'B',
'The bourgeoisie is on top of Nigeria''s class structure ladder.');

-- Q94 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The concept of social structure has to do with _______.', 'multiple_choice',
'economic development', 'the rankings of people', 'political systems', 'cultural values', 'B',
'Social structure has to do with the rankings of people.');

-- Q95 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian Press Council is required to maintain a register of ________.', 'fill_in_blank', 'Accredited journalists', 'The NPC maintains a register of accredited journalists.');

-- Q96 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian Press Council was inaugurated on what date?', 'multiple_choice',
'December 29, 1990', 'December 29, 1991', 'December 29, 1992', 'December 29, 1993', 'C',
'The Nigerian Press Council was inaugurated on December 29, 1992.');

-- Q97 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The 1960 constitution provided for freedom of expression under which Section?', 'multiple_choice',
'Section 22', 'Section 23', 'Section 24', 'Section 25', 'C',
'The 1960 constitution provided for freedom of expression under Section 24.');

-- Q98 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Wilson (1990:281-282) captures how many modes of traditional communicating system?', 'multiple_choice',
'four', 'five', 'six', 'seven', 'C',
'Wilson captures six modes of traditional communicating system.');

-- Q99 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Self-concept means approaching the communication endeavor with ________ and not inferiority complex.', 'fill_in_blank', 'confidence', 'Self-concept means approaching communication with confidence.');

-- Q100 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'All of the following are examples of the print media except _______.', 'multiple_choice',
'Newspapers', 'Magazines', 'Jotters', 'Books', 'C',
'Jotters are not examples of print media.');

-- Q101 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'ThisDay Newspaper and AIT are respectively examples of _______ and _______ media.', 'multiple_choice',
'electronic and print', 'print and electronic', 'broadcast and digital', 'traditional and modern', 'B',
'ThisDay is print media and AIT is electronic media.');

-- Q102 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Non-verbal communication comprises all of these except _______.', 'multiple_choice',
'gestures', 'screaming', 'body language', 'facial expressions', 'B',
'Screaming is not part of non-verbal communication.');

-- Q103 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'What is the first popular mass medium? ________.', 'fill_in_blank', 'Newspapers', 'Newspapers are the first popular mass medium.');

-- Q104 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Joint government and private ownership of the media is very common in _______.', 'multiple_choice',
'Nigeria', 'United States', 'Canada', 'United Kingdom', 'C',
'Joint government and private ownership is very common in Canada.');

-- Q105 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Herbert Altschull insisted that an independent press cannot exist because _______.', 'multiple_choice',
'media is always biased', 'the news organs are agents of the people who exercise political and economic control', 'journalists are corrupt', 'technology controls media', 'B',
'Altschull said press can''t be independent as news organs are agents of those with political and economic control.');

-- Q106 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Some people believe that the Nigerian press was borne and nurtured _______.', 'multiple_choice',
'in the waters of independence', 'in the waters of colonialism', 'in the waters of democracy', 'in the waters of military rule', 'B',
'The Nigerian press was borne and nurtured in the waters of colonialism.');

-- Q107 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'According to Chappel & Read (1984:1), communication is any means by which a thought is transferred from ________ to ________.', 'fill_in_blank', 'one person to another', 'Communication is transferring thought from one person to another.');

-- Q108 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'One of the first and primary functions of the mass media is _______.', 'multiple_choice',
'entertainment', 'information dissemination', 'education', 'persuasion', 'B',
'Information dissemination is one of the first and primary functions of mass media.');

-- Q109 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Readers Digest is an example of _______.', 'multiple_choice',
'tabloid newspaper', 'mass magazine', 'literary magazine', 'specialized magazine', 'C',
'Readers Digest is an example of a literary magazine.');

-- Q110 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The major source of information and ideas in modern society is _______.', 'multiple_choice',
'schools', 'churches', 'the mass media', 'families', 'C',
'The mass media is the major source of information and ideas in modern society.');

-- Q111 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Iconographic Mode of Communication consists of the use of floral media which is the use of selected floral of the local vegetation for the purpose of communicating ________.', 'fill_in_blank', 'specific meanings or ideas to members of the community', 'Iconographic mode uses floral media to communicate specific meanings to the community.');

-- Q112 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'According to Daramola (2003:99), broadcast media differ from print media in all the following ways except _______.', 'multiple_choice',
'broadcast uses electronic devices', 'print media reaches a large number of people, while broadcast does not', 'broadcast is audio or visual', 'print depends on literacy', 'B',
'This is incorrect - broadcast actually reaches large numbers, not the opposite.');

-- Q113 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which of the following is not one of the purposes of media governance as outlined by McQuail (2005:234)?', 'multiple_choice',
'protecting public interest', 'promotion of press censorship and cultural inclusiveness', 'ensuring media freedom', 'maintaining standards', 'B',
'Promotion of press censorship is not a purpose of media governance.');

-- Q114 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which Committee of the NPC undertakes training of journalists on behalf of the Council?', 'multiple_choice',
'Complaints Committee', 'Research and Documentation Committee', 'Ethics Committee', 'Registration Committee', 'B',
'The Research and Documentation Committee undertakes training of journalists.');

-- Q115 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The office of the Executive Secretary of the Nigerian Press Council should make a preliminary report to the Complaints Committee within ________ hours.', 'fill_in_blank', '48', 'The Executive Secretary should make preliminary report within 48 hours.');

-- Q116 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What people ate, what they talked, what they did - which is NOT contained in Rodney''s argument on culture?', 'multiple_choice',
'what they ate', 'what they talked', 'none of the above', 'what they wore', 'C',
'All the listed options are contained in Rodney''s argument on culture.');

-- Q117 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The basic assumption of the Authoritarian Media Theory is that _______.', 'multiple_choice',
'media is free', 'the media tend to be subordinated to state power', 'media controls the state', 'media is independent', 'B',
'Authoritarian theory assumes media is subordinated to state power.');

-- Q118 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In the characteristics of a theory, dynamism involves ensuring that theories are _______.', 'multiple_choice',
'permanent', 'static', 'subject to change in the light of new facts', 'unchangeable', 'C',
'Dynamism means theories are subject to change in light of new facts.');

-- Q119 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Wilbur Schramm defines theory as a "crop-detector" which enables us to separate ________ statements from ________ ones.', 'fill_in_blank', 'scientific from unscientific', 'Theory as crop-detector separates scientific from unscientific statements.');

-- Q120 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'According to Harrold Lasswell, the surveillance function of the mass media means its ability to _______.', 'multiple_choice',
'entertain the society', 'inform the society by keeping watch on the activities of government', 'educate the masses', 'persuade audiences', 'B',
'Surveillance means informing society by watching government activities.');

-- Q121 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'One of these is not a medium of mass communication _______.', 'multiple_choice',
'television', 'radio', 'remote control', 'newspapers', 'C',
'Remote control is not a medium of mass communication.');

-- Q122 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The print media involves all the following except _______.', 'multiple_choice',
'newspapers', 'magazines', 'sound', 'books', 'C',
'Print media does not involve sound.');

-- Q123 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A function of the mass media as the bestowal of prestige on people is referred to as ________.', 'fill_in_blank', 'Status conferral', 'Bestowal of prestige is called status conferral.');

-- Q124 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Iwe Irohin fun awon ara Egba ati Yoruba began publication in what year?', 'multiple_choice',
'1857', '1858', '1859', '1860', 'C',
'Iwe Irohin began publication in 1859.');

-- Q125 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Communication can hardly take place in a _______.', 'multiple_choice',
'group', 'society', 'vacuum', 'community', 'C',
'Communication can hardly take place in a vacuum.');

-- Q126 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Newspapers were precisely established in Africa by missionaries for the purpose of _______.', 'multiple_choice',
'making profit', 'political control', 'spreading the gospel', 'education only', 'C',
'Newspapers were established in Africa for spreading the gospel.');

-- Q127 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ established the Nigerian Pioneer.', 'fill_in_blank', 'Kitoyi Ajasa', 'Kitoyi Ajasa established the Nigerian Pioneer.');

-- Q128 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Communication which is done through the use of words is called _______.', 'multiple_choice',
'non-verbal communication', 'verbal communication', 'tactile communication', 'visual communication', 'B',
'Communication through words is called verbal communication.');

-- Q129 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The theory of social responsibility places premium on the _______ and social responsibilities of people.', 'multiple_choice',
'economic', 'political', 'moral', 'cultural', 'C',
'Social responsibility theory places premium on moral and social responsibilities.');

-- Q130 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Libertarian theory is otherwise known as _______.', 'multiple_choice',
'authoritarian theory', 'free press theory', 'development theory', 'communist theory', 'B',
'Libertarian theory is otherwise known as free press theory.');

-- Q131 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The British Broadcasting Corporation (BBC) is a typical example of ________ media.', 'fill_in_blank', 'public', 'BBC is a typical example of public media.');

-- Q132 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Ethics can also be called _______.', 'multiple_choice',
'laws', 'codified rules', 'regulations', 'policies', 'B',
'Ethics can also be called codified rules.');

-- Q133 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What are the oldest medium of mass communication?', 'multiple_choice',
'newspapers', 'books', 'radio', 'television', 'B',
'Books are the oldest medium of mass communication.');

-- Q134 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The social change approach which is a process by which organism develops naturally from simple to complex is called _______.', 'multiple_choice',
'revolutionary approach', 'evolutionary approach', 'developmental approach', 'progressive approach', 'B',
'This is called evolutionary approach.');

-- Q135 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Modern communication has to do with communication with ________.', 'fill_in_blank', 'mass media', 'Modern communication has to do with mass media.');

-- Q136 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'When colours, dressings are used to communicate, it is _______ mode of communication.', 'multiple_choice',
'verbal', 'tactile', 'visual', 'oral', 'C',
'Using colours and dressings is visual mode of communication.');

-- Q137 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Soliloquy is _______ type of communication.', 'multiple_choice',
'interpersonal', 'intrapersonal', 'group', 'mass', 'B',
'Soliloquy is intrapersonal type of communication.');

-- Q138 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Modes that use idiophones, aerophones, membranophones and symbolography are _______ mode of communication.', 'multiple_choice',
'demonstrative', 'instrumental', 'visual', 'iconographic', 'B',
'These are instrumental mode of communication.');

-- Q139 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The four elements of Communication are the Source, Message, Channel and ________.', 'fill_in_blank', 'Receiver', 'The four elements are Source, Message, Channel and Receiver.');

-- Q140 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Touching, kissing are _______ types of communication.', 'multiple_choice',
'verbal', 'visual', 'tactile', 'oral', 'C',
'Touching and kissing are tactile types of communication.');

-- Q141 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'One of the following is not a limitation to press freedom in Nigeria _______.', 'multiple_choice',
'Official Secrets Act', 'Libel laws', 'The Journalist unions', 'Sedition laws', 'C',
'Journalist unions are not a limitation to press freedom in Nigeria.');

-- Q142 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The modifications of the body of knowledge of people and their tools is known as _______.', 'multiple_choice',
'social change', 'cultural change', 'economic change', 'political change', 'B',
'This is known as cultural change.');

-- Q143 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The two basic components of culture are ________ and ________.', 'fill_in_blank', 'material and non-material culture', 'The two components are material and non-material culture.');

-- Q144 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Social structure can also be referred to as _______.', 'multiple_choice',
'social mobility', 'social stratification', 'social interaction', 'social organization', 'B',
'Social structure can also be referred to as social stratification.');

-- Q145 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Instrumental Mode of Communication consists of modes which use the following except _______.', 'multiple_choice',
'idiophones', 'aerophones', 'pseudophones', 'membranophones', 'C',
'Instrumental mode does not include pseudophones.');

-- Q146 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Nigerian press according to Daramola (2006:78) had "its debut" in whose newspaper?', 'multiple_choice',
'Kitoyi Ajasa''s', 'Rev. Henry Townsend''s', 'Ernest Ikoli''s', 'Nnamdi Azikiwe''s', 'B',
'The Nigerian press had its debut in Rev. Henry Townsend''s newspaper.');

-- Q147 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The basic assumption of the Media Dependency Theory is that _______.', 'multiple_choice',
'media is independent', 'less powerful nations often depend on powerful nations in terms of consumption of mass media messages', 'all nations are equal', 'media has no influence', 'B',
'Media Dependency Theory assumes less powerful nations depend on powerful ones for media messages.');

-- Q148 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The growing worldwide interdependence of people and countries can be termed ________.', 'fill_in_blank', 'globalisation', 'The growing worldwide interdependence is termed globalisation.');

-- Q149 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The first real television was produced by whom?', 'multiple_choice',
    'Alexander Bell', 'Thomas Edison', 'John Logie Baird', 'Guglielmo Marconi', 'C',
    'The first real television was produced by John Logie Baird.');

-- Q150 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The public is entitled to lodge complaints against any of the mass media, provided the complaint is one of _______.', 'multiple_choice',
    'personal disagreement', 'unethical conduct', 'political difference', 'economic interest', 'B',
    'The public can complain against media for unethical conduct.');

END $$;