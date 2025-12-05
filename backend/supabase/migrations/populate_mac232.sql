DO $$
DECLARE
v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'MAC232' LIMIT 1;

-- Q1 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_________ relates to state of the mind.', 'multiple_choice',
'Public relations', 'Marketing', 'Advertising', 'Sales promotion', 'A',
'Public relations relates to state of the mind.');

-- Q2 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Public relations relates to state of the _________.', 'fill_in_blank', 'Mind', 'Public relations is concerned with the state of mind.');

-- Q3 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '___________ has to do with man''s alertness and consciousness to shield himself from any kind of negativity.', 'multiple_choice',
'Marketing', 'Public relations', 'Journalism', 'Propaganda', 'B',
'Public relations involves alertness and consciousness to protect one''s reputation.');

-- Q4 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations dates back to _________ times.', 'multiple_choice',
'Modern', 'Biblical', 'Medieval', 'Renaissance', 'B',
'Public relations has roots dating back to biblical times.');

-- Q5 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In___________, word-pictures and festivals were used for publicity and promotions.', 'multiple_choice',
'Greece', 'Rome', 'Egypt', 'Babylon', 'C',
'Egypt used word-pictures and festivals for publicity purposes.');

-- Q6 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'An organisation which played a major role in the evolution of public relations is the ___________ Catholic Church.', 'fill_in_blank', 'Catholic Church', 'The Catholic Church played a significant role in PR evolution.');

-- Q7 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Industrial Revolution took place in the ________.', 'multiple_choice',
'17th century', '18th century', '19th century', '20th century', 'B',
'The Industrial Revolution occurred in the 18th century.');

-- Q8 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The efforts of____________ led to the formation of Public Relations Association of Nigeria (PRAN) in 1963.', 'multiple_choice',
'Dr. Sam Epelle', 'Dr. Nnamdi Azikiwe', 'Chief Obafemi Awolowo', 'Dr. Ahmadu Bello', 'A',
'Dr. Sam Epelle was instrumental in forming PRAN.');

-- Q9 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public Relations Association of Nigeria (PRAN) was established in the year __________.', 'multiple_choice',
'1960', '1961', '1963', '1965', 'C',
'PRAN was established in 1963.');

-- Q10 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'PRAN stands for __________.', 'fill_in_blank', 'Public Relations Association of Nigeria', 'PRAN is the acronym for Public Relations Association of Nigeria.');

-- Q11 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The colonial government established an information office in Lagos in___________.', 'multiple_choice',
'1935', '1940', '1945', '1950', 'B',
'The information office was established in Lagos in 1940.');

-- Q12 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The pioneering role was played by ________ which in 1949 established an information office.', 'multiple_choice',
'Shell', 'UAC', 'Mobil', 'Chevron', 'B',
'UAC played a pioneering role by establishing an information office in 1949.');

-- Q13 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'To professionalise the practice, the government in 1990 promulgated __________.', 'multiple_choice',
'Decree No.12', 'Decree No.16', 'Decree No.20', 'Decree No.24', 'B',
'Decree No.16 was promulgated in 1990 to professionalise PR practice.');

-- Q14 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'IPRA stands for_________.', 'fill_in_blank', 'International Public Relations Association', 'IPRA is the International Public Relations Association.');

-- Q15 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'NIPR stands for________.', 'multiple_choice',
'Nigerian Institute of Public Relations', 'National Institute of Public Relations', 'Nigerian Institute for Professional Relations', 'National Institute for Professional Relations', 'A',
'NIPR stands for Nigerian Institute of Public Relations.');

-- Q16 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'CSR stands for_________.', 'fill_in_blank', 'Corporate Social Responsibility', 'CSR is Corporate Social Responsibility.');

-- Q17 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations is a carefully ________and executed discipline.', 'multiple_choice',
'Planned', 'Random', 'Spontaneous', 'Improvised', 'A',
'Public relations is a carefully planned and executed discipline.');

-- Q18 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations is wider in scope than advertising.', 'multiple_choice',
'True', 'False', 'Partially true', 'Cannot be determined', 'A',
'Public relations has a broader scope than advertising.');

-- Q19 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '__________ is mainly interpersonal in approach and also centers on selling unlike public relations.', 'multiple_choice',
'Advertising', 'Sales promotion', 'Marketing', 'Publicity', 'B',
'Sales promotion is interpersonal and focuses on selling.');

-- Q20 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'RACE stands for_________.', 'fill_in_blank', 'Research, Action, Communication and Evaluation', 'RACE is an acronym for Research, Action, Communication and Evaluation.');

-- Q21 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'RACE Model was proposed by ________ in 1983.', 'multiple_choice',
'Frank Jefkins', 'John Marston', 'Allen Center', 'C. Coulson Thomas', 'B',
'John Marston proposed the RACE Model in 1983.');

-- Q22 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Transfer Process Model was enunciated by __________ in 1988.', 'multiple_choice',
'John Marston', 'Frank Jefkins', 'Allen Center', 'Scot Cultip', 'B',
'Frank Jefkins enunciated the Transfer Process Model in 1988.');

-- Q23 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The proponent of Ten-Points (Steps) Systematic Model is _______.', 'multiple_choice',
'John Marston', 'Frank Jefkins', 'C. Coulson Thomas', 'Allen Center', 'C',
'C. Coulson Thomas proposed the Ten-Points Systematic Model.');

-- Q24 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'FOUR-Steps Model was proposed by________.', 'multiple_choice',
'Frank Jefkins', 'John Marston', 'Scot Cultip and Allen Center', 'C. Coulson Thomas', 'C',
'Scot Cultip and Allen Center proposed the FOUR-Steps Model.');

-- Q25 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'IPCM or OP-Matrix Model was John Marston recommendation in ________.', 'fill_in_blank', '1986', 'The IPCM or OP-Matrix Model was recommended in 1986.');

-- Q26 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'IPCM or OP-Matrix Model has ________ components.', 'multiple_choice',
'Two', 'Three', 'Four', 'Five', 'C',
'The IPCM or OP-Matrix Model has four components.');

-- Q27 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is a step at which the practitioner ponders, meditates or frames a mental picture of what he is going to do.', 'multiple_choice',
'Evaluation', 'Conceptualisation', 'Production', 'Media selection', 'B',
'Conceptualisation involves planning and mental framing of the PR strategy.');

-- Q28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ involves the careful choice from the available media or other communication tools.', 'multiple_choice',
'Copywriting', 'Media selection', 'Production', 'Evaluation', 'B',
'Media selection involves choosing appropriate communication tools.');

-- Q29 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ involves scribing the communication messages which form a major aspect of the public relations exercise.', 'multiple_choice',
'Copywriting', 'Production', 'Media selection', 'Conceptualisation', 'A',
'Copywriting is the process of writing communication messages.');

-- Q30 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ stage involves the actual designing, devising, building, inventing or constructing the tools of public relations.', 'multiple_choice',
'Conceptualisation', 'Production', 'Copywriting', 'Media selection', 'B',
'Production involves creating the actual PR tools and materials.');

-- Q31 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ are natural companions of every profession and organisation.', 'fill_in_blank', 'Challenges', 'Challenges are inherent in every profession and organisation.');

-- Q32 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Agencies can be classified into________.', 'multiple_choice',
'Two', 'Three', 'Four', 'Five', 'A',
'PR agencies can be classified into two types.');

-- Q33 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ kind of public relations agency accepts and handles divers and all sorts of jobs.', 'multiple_choice',
'Specialty agency', 'General agency', 'Boutique agency', 'Limited agency', 'B',
'General agency handles diverse types of PR jobs.');

-- Q34 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'General Agency can also be called________.', 'fill_in_blank', 'Full service agency', 'General agency is also known as full service agency.');

-- Q35 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ type of agency renders only some aspects of the range of services available to agencies.', 'multiple_choice',
'General agency', 'Full service agency', 'Specialty agency', 'Complete agency', 'C',
'Specialty agency provides limited or specialized PR services.');

-- Q36 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'UAC means________.', 'multiple_choice',
'United Africa Company', 'United Arab Company', 'Universal Africa Company', 'Union Africa Company', 'A',
'UAC stands for United Africa Company.');

-- Q37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'United Africa Company was transformed into a full public relations department in ________.', 'multiple_choice',
'1955', '1958', '1960', '1963', 'C',
'UAC established a full PR department in 1960.');

-- Q38 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'With decree No. 66 of________, the federal government empowered NIPR to control and regulate PR practice.', 'multiple_choice',
'1985', '1988', '1990', '1992', 'C',
'Decree No. 66 of 1990 empowered NIPR to regulate PR practice.');

-- Q39 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'That symbiotic relationship is called ________.', 'fill_in_blank', 'Ecology', 'The symbiotic relationship in the environment is called ecology.');

-- Q40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ can cause calamities stretching to thousands of kilometers away.', 'multiple_choice',
'Earthquakes', 'Volcanic eruptions', 'Floods', 'Hurricanes', 'B',
'Volcanic eruptions can affect vast areas spanning thousands of kilometers.');

-- Q41 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ are characterised by dry land and absence of life plants.', 'multiple_choice',
'Floods', 'Earthquakes', 'Droughts and desertification', 'Tsunamis', 'C',
'Droughts and desertification result in dry land with no vegetation.');

-- Q42 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'UNEP means________.', 'fill_in_blank', 'United Nations Environment Programme', 'UNEP is the United Nations Environment Programme.');

-- Q43 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'FEPA means________.', 'fill_in_blank', 'Federal Environment Protection Agency', 'FEPA stands for Federal Environment Protection Agency.');

-- Q44 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ________ is also described as the part of the earth''s surface and atmosphere in which plants and animals can live.', 'multiple_choice',
'Lithosphere', 'Hydrosphere', 'Biosphere', 'Atmosphere', 'C',
'The biosphere is the zone where life exists on Earth.');

-- Q45 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is the connectivity of all plants and living creatures in a particular area considered in relation to their physical environment.', 'multiple_choice',
'Ecology', 'Ecosystem', 'Biosphere', 'Environment', 'B',
'An ecosystem comprises interconnected living organisms and their environment.');

-- Q46 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'NEMA means________.', 'fill_in_blank', 'National Emergency Management Agency', 'NEMA is the National Emergency Management Agency.');

-- Q47 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_________ is involved in harnessing and assembling requisite equipment, maintaining and servicing them in readiness.', 'multiple_choice',
'Liaison services', 'Technical services', 'Administrative services', 'Communication services', 'B',
'Technical services involve equipment maintenance and readiness.');

-- Q48 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'NCF means________.', 'fill_in_blank', 'Nigeria Conservation Foundation', 'NCF stands for Nigeria Conservation Foundation.');

-- Q49 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is applied stopping the consumption of harmful goods and services.', 'multiple_choice',
'Relationship marketing', 'De-marketing', 'Direct marketing', 'Social marketing', 'B',
'De-marketing discourages consumption of harmful products.');

-- Q50 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ entails the cultivation and maintenance of good relationship with customer, distributors, supplies, retailers and stakeholder.', 'multiple_choice',
'De-marketing', 'Relationship marketing', 'Direct marketing', 'Social marketing', 'B',
'Relationship marketing focuses on building and maintaining stakeholder relationships.');

-- Q51 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is a style of managing an organisation in which employee welfare is prioritized.', 'multiple_choice',
'Traditional management', 'Human Resource Management Strategy', 'Autocratic management', 'Laissez-faire management', 'B',
'Human Resource Management Strategy prioritizes employee welfare.');


--Q52 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ requires the redesigning, restricting and transforming or remolding corporate culture.', 'multiple_choice',
'Traditional planning', 'Management Re-Engineering Strategy', 'Human resource management', 'Crisis management', 'B',
'Management Re-Engineering involves transforming corporate culture and resources.');

-- Q53 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'WCED means________.', 'fill_in_blank', 'World Commission on Environment and Development', 'WCED is the World Commission on Environment and Development.');

-- Q54 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'NIMET means_______.', 'fill_in_blank', 'Nigerian Meteorological Agency', 'NIMET stands for Nigerian Meteorological Agency.');

-- Q55 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'MAN means________.', 'fill_in_blank', 'Manufacturers Association of Nigeria', 'MAN is the Manufacturers Association of Nigeria.');

-- Q56 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'NACCIMA means________.', 'fill_in_blank', 'National Association of Chambers of Commerce, Industries, Mines and Agriculture', 'NACCIMA represents chambers of commerce, industries, mines and agriculture.');

-- Q57 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'EIA means________.', 'fill_in_blank', 'Environmental Impact Assessments', 'EIA stands for Environmental Impact Assessments.');

-- Q58 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ are principles or standards set by oneself or professional organisation as benchmark governing attitudes and behaviours.', 'multiple_choice',
'Rules', 'Ethics', 'Laws', 'Regulations', 'B',
'Ethics are professional standards that govern conduct and behavior.');

-- Q59 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'On March 24, _______, Exxon had its oil spilled in Port of Valdez.', 'multiple_choice',
'1985', '1987', '1989', '1991', 'C',
'The Exxon oil spill occurred in Port of Valdez on March 24, 1989.');

-- Q60 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'On December 2, _______, a poisonous gas leaked that became the worst industrial disaster ever.', 'multiple_choice',
'1982', '1984', '1986', '1988', 'B',
'The Bhopal gas tragedy occurred on December 2, 1984.');

-- Q61 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Between July and November_______, Nigeria witnessed a record destructive flood.', 'multiple_choice',
'2010', '2011', '2012', '2013', 'C',
'Nigeria experienced severe flooding between July and November 2012.');

-- Q62 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The United Nations established the United Nations Environmental Programmes in _______.', 'multiple_choice',
'1970', '1972', '1974', '1976', 'B',
'UNEP was established in 1972.');

-- Q63 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A good example of case studies on environmental public relations in the USA is_________.', 'multiple_choice',
'Hurricane Katrina', 'Exxon oil spillage in Alaska', 'California wildfires', 'Deepwater Horizon spill', 'B',
'The Exxon oil spillage in Alaska is a notable environmental PR case study.');

-- Q64 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The first element in the TEN-POINT model of public relations is________.', 'multiple_choice',
'Media selection', 'Conceptualisation', 'Situational analysis/problem identification', 'Production', 'C',
'Situational analysis or problem identification is the first step in the TEN-POINT model.');

-- Q65 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The provision of adequate welfare packages and incentives to employees is an example of ________ arm of PR.', 'multiple_choice',
'Community relations', 'Employee relations', 'Media relations', 'Government relations', 'B',
'Employee relations involves providing welfare packages and incentives to workers.');

-- Q66 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'An organisation''s humanitarian services is called_________.', 'fill_in_blank', 'Corporate social responsibility', 'Humanitarian services by organizations are known as corporate social responsibility.');

-- Q67 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nwosu and Nkamnebe (2006) itemised ________ measures of determining a successful agency.', 'multiple_choice',
'Six', 'Seven', 'Eight', 'Nine', 'C',
'Eight measures were identified for determining agency success.');

-- Q68 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The last component of the IPCM or OP Matrix model is ________.', 'multiple_choice',
'Information gathering', 'Communication management', 'Marketing', 'Public affairs', 'C',
'Marketing is the last component of the IPCM or OP Matrix model.');

-- Q69 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The first element of the FOUR-STEP model is________.', 'multiple_choice',
'Planning and decision making', 'Research and listening', 'Communication and action', 'Evaluation and assessment', 'B',
'Research and listening is the first element of the FOUR-STEP model.');

-- Q70 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The overall aim of ________ is to maintain support, goodwill, solidarity and mutual understanding.', 'multiple_choice',
'Marketing', 'Advertising', 'Public relations', 'Sales promotion', 'C',
'Public relations aims to maintain support, goodwill and mutual understanding.');

-- Q71 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is necessary to gain all the information needed to execute public relations programme.', 'multiple_choice',
'Production', 'Research', 'Evaluation', 'Implementation', 'B',
'Research is essential for gathering information for PR programs.');

-- Q72 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A situation where a PR campaign combines advertising, publicity, news, promotion to achieve a single objective is called________.', 'multiple_choice',
'Media planning', 'Integrated marketing communication', 'Public relations campaign', 'Strategic communication', 'B',
'Integrated marketing communication combines various promotional tools for unified objectives.');

-- Q73 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Checking from time to time to ensure that the PR campaign programme is running as scheduled is________.', 'multiple_choice',
'Research', 'Evaluation', 'Monitoring/supervision','Planning', 'C',
'Monitoring/supervision involves checking that PR campaigns run as scheduled.');
-- Q74 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '"C" in the RACE model stands for________.', 'fill_in_blank', 'Communication', 'In the RACE model, C stands for Communication.');
-- Q75 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The TEN-POINT symmetric model was propounded by________.', 'multiple_choice',
'John Marston', 'Frank Jefkins', 'Coulson Thomas', 'Allen Center', 'C',
'Coulson Thomas propounded the TEN-POINT symmetric model.');
-- Q76 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The petroleum Drilling and Production Regulations Act came into existence in________.', 'multiple_choice',
'1965', '1967', '1969', '1971', 'C',
'The Petroleum Drilling and Production Regulations Act was enacted in 1969.');
-- Q77 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A corporate organisation made up of PR professional practitioners who team up to work as a group is_______.', 'multiple_choice',
'PR department', 'PR consultancy', 'Public relations agency', 'PR firm', 'C',
'A public relations agency is made up of PR professionals working together.');
-- Q78 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'United Africa Company (UAC) is associated with ________in Nigeria.', 'multiple_choice',
'The growth of public relations', 'The decline of trade', 'Political movements', 'Educational development', 'A',
'UAC played a significant role in the growth of public relations in Nigeria.');
-- Q79 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The stage at which all the talents necessary to execute the programme are engaged is________.', 'multiple_choice',
'Conceptualisation stage', 'Production stage', 'Recruitment stage', 'Evaluation stage', 'C',
'Recruitment stage involves engaging necessary talents for program execution.');
-- Q80 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The stage in the PR process where packaged messages are sent to the media is________.', 'multiple_choice',
'Conceptualisation', 'Production', 'Placement/scheduling', 'Evaluation', 'C',
'Placement/scheduling involves sending messages to media at appropriate times.');
-- Q81 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The stage of critical thinking, meditation and ideation to determine what to do in a PR campaign is________.', 'multiple_choice',
'Research', 'Conceptualisation', 'Planning', 'Evaluation', 'B',
'Conceptualisation involves critical thinking and ideation for PR campaigns.');
-- Q82 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Effective application of public relations can revert APATHY to________.', 'multiple_choice',
'Confusion', 'Hostility', 'Interest', 'Indifference', 'C',
'PR can transform apathy into interest among the public.');
-- Q83 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Effective application of public relations can revert IGNORANCE to ________.', 'multiple_choice',
'Awareness', 'Knowledge', 'Understanding', 'Education', 'B',
'PR can transform ignorance into knowledge.');
-- Q84 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The transfer process model was enunciated by________.', 'fill_in_blank', 'Frank Jefkins', 'Frank Jefkins developed the transfer process model.');
-- Q85 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations when properly applied can convert hostility to________.', 'multiple_choice',
'Anger', 'Sympathy', 'Neutrality', 'Aggression', 'B',
'Proper application of PR can transform hostility into sympathy.');
-- Q86 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ________ is the highest ranking officer in PR (consultancy) agency.', 'multiple_choice',
'Director', 'Manager', 'President', 'Chief Executive', 'C',
'The President is the highest ranking officer in a PR agency.');
-- Q87 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ and_________ basically boosted the practice of public relations.', 'multiple_choice',
'Technology and media', 'Colonialism and Christianity', 'War and peace', 'Trade and commerce', 'B',
'Colonialism and Christianity significantly boosted PR practice.');
-- Q88 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A PR campaign designed to help the public avoid activities that could bring killer diseases is classified under_________.', 'multiple_choice',
'Community relations', 'Environmental relations', 'Health relations', 'Social relations', 'B',
'Health and disease prevention campaigns fall under environmental relations.');
-- Q89 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Environmental public relations is a relatively new_________ and________.', 'multiple_choice',
'Concept and idea', 'Theory and model', 'Field and practice', 'Method and approach', 'C',
'Environmental public relations is a relatively new field and practice.');
-- Q90 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The first stage of public relations processes is_________.', 'fill_in_blank', 'Conceptualisation', 'Conceptualisation is the initial stage of PR processes.');
-- Q91 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The act of scribing the communication messages to sell an idea of PR of an organisation is called________.', 'multiple_choice',
'Production', 'Copywriting', 'Media selection', 'Evaluation', 'B',
'Copywriting involves writing communication messages for PR purposes.');
-- Q92 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An organisation''s "publics" refers to________.', 'multiple_choice',
'Only customers', 'Only employees', 'Every person affected by the activities of the organisation', 'Only shareholders', 'C',
'An organisation''s publics include everyone affected by its activities.');
-- Q93 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An action undertaken by a PR practitioner to determine whether a campaign was a success or failure is________.', 'multiple_choice',
'Research', 'Planning', 'Evaluation', 'Implementation', 'C',
'Evaluation determines the success or failure of a PR campaign.');
-- Q94 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'IPCM or OP-Matrix Model came into existence in________.', 'multiple_choice',
'1983', '1985', '1986', '1988', 'C',
'The IPCM or OP-Matrix Model was introduced in 1986.');
-- Q95 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A symbolic representation designed to enable us visualise elements in a given system or structure is called_________.', 'multiple_choice',
'Framework', 'Theory', 'Model', 'Concept', 'C',
'A model is a symbolic representation of a system or structure.');
-- Q96 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The colonial government established Information Office in Lagos, later called Public Relations Department in________.', 'multiple_choice',
'1935', '1940', '1945', '1950', 'B',
'The Information Office was established in Lagos in 1940.');
-- Q97 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ currently controls the practice of public relations in Nigeria.', 'multiple_choice',
'PRAN', 'Nigerian Institute of Public Relations', 'Federal Ministry of Information', 'NACCIMA', 'B',
'The Nigerian Institute of Public Relations controls PR practice in Nigeria.');
-- Q98 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Decree establishing NIPR is________.', 'multiple_choice',
'Decree No.16 of 1990', 'Decree No.66 of 1990', 'Decree No.16 of 1986', 'Decree No.66 of 1986', 'B',
'Decree No.66 of 1990 established NIPR.');
-- Q99 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The officer that accounts directly to the chief executive officer in PR agency is________.', 'multiple_choice',
'Manager', 'Director of PR', 'Supervisor', 'Coordinator', 'B',
'The Director of PR reports directly to the CEO.');
-- Q100 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are ________ processes of public relations.', 'multiple_choice',
'Six', 'Seven', 'Eight', 'Nine', 'C',
'There are eight processes in public relations.');
-- Q101 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The knowledge of the laws of the land is imperative for the environmental PR practitioner to succeed.', 'multiple_choice',
'True', 'False', 'Partially true', 'Not applicable', 'A',
'Understanding environmental laws is crucial for environmental PR practitioners.');
-- Q102 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ is the final stage of public relations processes.', 'fill_in_blank', 'Evaluation', 'Evaluation is the concluding stage of PR processes.');
-- Q103 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Communication is needed for effective crisis management.', 'multiple_choice',
'True', 'False', 'Sometimes', 'Not always', 'A',
'Communication is essential for managing crises effectively.');
-- Q104 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nwosu in the year _______ advocated for an environment in which man is at harmony with his environment.', 'multiple_choice',
'1992', '1994', '1996', '1998', 'C',
'Nwosu advocated for environmental harmony in 1996.');
-- Q105 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Propaganda is bound to_______.', 'multiple_choice',
'Unity', 'Understanding', 'Disaffection', 'Cooperation', 'C',
'Propaganda tends to lead to disaffection.');
-- Q106 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ refers to a strategy designed to boost or increase the volume of sales directly and immediately.', 'multiple_choice',
'Advertising', 'Public relations', 'Sales promotion', 'Marketing', 'C',
'Sales promotion aims to increase sales directly and immediately.');
-- Q107 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______ is the branch of public relations that an organisation employs to take care of the welfare of its workers.', 'multiple_choice',
'Community relations', 'Employee relations', 'Media relations', 'Investor relations', 'B',
'Employee relations focuses on worker welfare within an organisation.');
-- Q108 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations activities and services are conveyed through the _______.', 'multiple_choice',
'Government', 'Media', 'Courts', 'Schools', 'B',
'PR activities and services are conveyed through various media channels.');
-- Q109 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations was professionalised in Nigeria through_______.', 'multiple_choice',
'Decree No 16 of 1990', 'Decree No 66 of 1990', 'Act of 1990', 'Constitution amendment', 'A',
'Decree No 16 of 1990 professionalised PR practice in Nigeria.');
-- Q110 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ boosted the growth of public relations in Nigeria.', 'fill_in_blank', 'Influence of private individuals', 'Private individuals significantly contributed to PR growth in Nigeria.');
-- Q111 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Exxon oil spill in Alaska, USA which caused havocs occurred in_______.', 'multiple_choice',
'1985', '1987', '1989', '1991', 'C',
'The Exxon oil spill in Alaska happened in 1989.');
-- Q112 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ inspires good conduct, behaviour and attitude in a profession.', 'multiple_choice',
'Rules', 'Laws', 'Professional ethics', 'Regulations', 'C',
'Professional ethics inspire proper conduct in professions.');
-- Q113 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______is the principles and standards set by a professional body as a benchmark governing practitioners.', 'multiple_choice',
'Laws', 'Ethics', 'Rules', 'Policies', 'B',
'Ethics are professional standards that govern practitioner behavior.');
-- Q114 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ refers to the strategy that meets the needs of the present without compromising future generations.', 'multiple_choice',
'Economic development', 'Industrial growth', 'Sustainable development', 'Rapid development', 'C',
'Sustainable development balances present needs with future generations'' needs.');
-- Q115 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ causes Ozone layer depletion as an environmental problem to humanity.', 'multiple_choice',
'Water pollution', 'Soil erosion', 'Photochemical smog in troposphere', 'Deforestation', 'C',
'Photochemical smog in the troposphere contributes to ozone layer depletion.');
-- Q116 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The World Bank president who described climate change as "a fundamental threat to global economic development" is_______.', 'fill_in_blank', 'Jin Yong King', 'Jin Yong King made this statement about climate change.');
-- Q117 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The worst case of flooding in Nigeria was last recorded when?', 'multiple_choice',
'2010', '2011', '2012', '2013', 'C',
'Nigeria experienced its worst flooding in 2012.');
-- Q118 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The environmental misfortune that hit United States with devastating effects is called _______.', 'fill_in_blank', 'Hurricane Sandy', 'Hurricane Sandy caused devastating effects in the United States.');
-- Q119 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The role of Planning in public relations is to enable practitioners achieve_______.', 'multiple_choice',
'Personal goals', 'Random outcomes', 'Aim at the specific goal of the campaign', 'General awareness', 'C',
'Planning helps practitioners achieve specific campaign goals.');
-- Q120 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In public relations, a strategy of conflict resolution where actors take advantage of opportunities is referred to as _______.', 'multiple_choice',
'Pessimistic', 'Optimistic', 'Neutral', 'Aggressive', 'B',
'The optimistic strategy involves seizing opportunities for conflict resolution.');
-- Q121 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'According to Nwosu, the acronym TQM stands for__________.', 'fill_in_blank', 'Total Quality Management', 'TQM represents Total Quality Management.');
-- Q122 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The cultivation and maintenance of good relationship with customers and stakeholders entails__________.', 'multiple_choice',
'Direct marketing', 'Social marketing', 'Relationship marketing', 'Digital marketing', 'C',
'Relationship marketing focuses on building and maintaining stakeholder relationships.');
-- Q123 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ means Preparing for crisis well ahead of time.', 'multiple_choice',
'Crisis response', 'Planning for it', 'Crisis reaction', 'Emergency action', 'B',
'Crisis preparation involves planning ahead of time.');
-- Q124 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The last of the five C''s of communication according to Von Essen and Mersham stands for __________.', 'fill_in_blank', 'Context', 'Context is the last of the five C''s of communication.');
-- Q125 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The __________ acts as a link between the masses and environmental agencies at all levels.', 'multiple_choice',
'Media services', 'Technical services', 'Environmental agencies liaison', 'Communication department', 'C',
'Environmental agencies liaison connects masses with environmental agencies.');
-- Q126 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______maintains that environmental campaign must include the stakeholders if success is desired.', 'multiple_choice',
'Nwosu', 'Aliede', 'Marston', 'Jefkins', 'B',
'Aliede emphasized the importance of including stakeholders in environmental campaigns.');
-- Q127 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is the ultimate goal of every public relations effort.', 'multiple_choice',
'Profit maximization', 'Market dominance', 'To create mutual understanding and acceptance', 'Brand awareness', 'C',
'Creating mutual understanding and acceptance is PR''s ultimate goal.');
-- Q128 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ form of PR can be adopted to dissuade stakeholders from encouraging youth to take to arms.', 'multiple_choice',
'Media public relations', 'Community public relations', 'Corporate public relations', 'Government public relations', 'C',
'Corporate public relations can address community conflict issues.');
-- Q129 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An activity undertaken by a PR practitioner to assess the success of a PR programme is regarded as__________.', 'multiple_choice',
'Research', 'Planning', 'Evaluation', 'Implementation', 'C',
'Evaluation assesses the success or failure of PR programs.');
-- Q130 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The stage of the PR process where the client provides information necessary to resolve the PR problem is___________.', 'multiple_choice',
'Conceptualisation', 'Briefing', 'Research', 'Planning', 'B',
'Briefing is when clients provide necessary information for problem resolution.');
-- Q131 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The employment of qualified talents for the execution of a PR programme entails___________.', 'multiple_choice',
'Planning', 'Conceptualisation', 'Recruitment', 'Evaluation', 'C',
'Recruitment involves hiring qualified talents for PR program execution.');
-- Q132 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The preliminary stage of public relations process is the___________.', 'fill_in_blank', 'Conceptualization', 'Conceptualization is the preliminary stage of PR process.');
-- Q133 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations apply_________, truth, full information in addition to empathy.', 'multiple_choice',
'Force', 'Persuasion', 'Coercion', 'Manipulation', 'B',
'Public relations uses persuasion along with truth and empathy.');
-- Q134 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Primarily, the roles and functions of public relations and environmental public relations are the same.', 'multiple_choice',
'True', 'False', 'Partially true', 'Completely different', 'A',
'PR and environmental PR share the same fundamental roles and functions.');
-- Q135 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The capacity and capability of any agency is dependent on its resource possessions.', 'multiple_choice',
'True', 'False', 'Sometimes', 'Not applicable', 'A',
'An agency''s effectiveness depends on its available resources.');
-- Q136 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations provides distinct and unique services which none of those rival fields can offer.', 'multiple_choice',
'True', 'False', 'Partially true', 'Uncertain', 'A',
'PR offers unique services that differentiate it from other fields.');
-- Q137 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A veritable instrument for outwitting rival competitors is no doubt sustainable_________.', 'multiple_choice',
'Marketing', 'Advertising', 'Public relations', 'Sales', 'C',
'Sustainable public relations is an effective competitive tool.');
-- Q138 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations is a true companion of every organisation.', 'multiple_choice',
'True', 'False', 'Sometimes', 'Rarely', 'A',
'Public relations is essential for every organization.');
-- Q139 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Massive production of goods and services was enhanced by the________.', 'multiple_choice',
'Agricultural revolution', 'Digital revolution', 'Industrial revolution', 'Green revolution', 'C',
'The Industrial Revolution enhanced massive production capabilities.');
-- Q140 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'According to Hornby (2005), ________ is the natural world in which people, animals and plants live.', 'multiple_choice',
'Ecosystem', 'Biosphere', 'Environment', 'Habitat', 'C',
'Environment refers to the natural world where life exists.');
-- Q141 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The relation of plants and living creatures to each other and to their environment is known as________.', 'multiple_choice',
'Biology', 'Ecology', 'Zoology', 'Botany', 'B',
'Ecology studies the relationships between organisms and their environment.');
-- Q142 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ acts as a link, connection and bridge with environmental agencies at all levels.', 'multiple_choice',
'Technical services', 'Liaison environmental agencies', 'Communication services', 'Administrative services', 'B',
'Liaison environmental agencies connect organizations with environmental bodies.');
-- Q143 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Challenges are natural companions of every profession and organisation.', 'multiple_choice',
'True', 'False', 'Sometimes', 'Rarely', 'A',
'Every profession and organization faces challenges.');
-- Q144 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Accordingly, public relations are not an aimless undertaking.', 'multiple_choice',
'True', 'False', 'Partially true', 'Sometimes', 'A',
'Public relations is a purposeful and goal-oriented discipline.');
-- Q145 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Sales promotion is mainly interpersonal in approach and also centers on selling unlike public relations.', 'multiple_choice',
'True', 'False', 'Partially true', 'Not applicable', 'A',
'Sales promotion focuses on interpersonal selling, unlike the broader scope of PR.');
-- Q146 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The embodiments of the three models are basically the same.', 'multiple_choice',
'True', 'False', 'Partially similar', 'Completely different', 'A',
'The core embodiments of the three PR models share fundamental similarities.');
-- Q147 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ means having the right knowledge and possessing the required qualities with which to serve the customer.', 'multiple_choice',
'Failing', 'Trying', 'Succeeding', 'Competing', 'C',
'Succeeding requires having appropriate knowledge and qualities for customer service.');
-- Q148 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Public relations relates to state of the mind.', 'multiple_choice',
'True', 'False', 'Partially true', 'Not applicable', 'A',
'Public relations is fundamentally concerned with the state of mind.');
-- Q149 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'According to Nwosu (1996:10) the IPCM or OP-Matrix Model lays emphasis on _______ and marketing.', 'multiple_choice',
'Research', 'Production', 'Communication', 'Evaluation', 'C',
'The IPCM model emphasizes communication and marketing.');
-- Q150 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'As a scientific enterprise, public relations follows some_______ systematic and laid down procedure.', 'fill_in_blank', 'systematic and laid down procedure', 'Public relations operates according to systematic and established procedures.');
END $$;
