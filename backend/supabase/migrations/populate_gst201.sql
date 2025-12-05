DO $$
DECLARE
    v_course_id UUID;
BEGIN
    SELECT id INTO v_course_id FROM courses WHERE code = 'GST201' LIMIT 1;

    ---------------------------------------------------------------------
    -- Q1 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    '______ is a very interesting and exciting study.',
    'multiple_choice',
    'Political Science', 'Nigerian Peoples and Culture', 'Civics', 'African History',
    'B',
    'The subject is Nigerian Peoples and Culture.');

    ---------------------------------------------------------------------
    -- Q2 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    '______ can be described as one of the major ethnic groups in Southern Nigeria.',
    'multiple_choice',
    'Igbo', 'Hausa', 'Yoruba', 'Edo',
    'C',
    'The Yoruba are a major ethnic group in Southern Nigeria.');

    ---------------------------------------------------------------------
    -- Q3 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Yoruba can be described as one of the major _____ groups in Southern Nigeria.',
    'fill_in_blank',
    'ethnic',
    'They are a major ethnic group.');

    ---------------------------------------------------------------------
    -- Q4 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Yoruba can be described as one of the major ethnic groups in ______ Nigeria.',
    'fill_in_blank',
    'Southern',
    'The Yoruba are located in Southern Nigeria.');

    ---------------------------------------------------------------------
    -- Q5 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'The majority of ______ are found in Oyo, Osun, Ogun, Ondo, Lagos, Kwara and Kogi.',
    'multiple_choice',
    'Hausas', 'Igbos', 'Yorubas', 'Tivs',
    'C',
    'These states belong to the Yoruba region.');

    ---------------------------------------------------------------------
    -- Q6 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'The _____ ethnic group is believed to have come into existence between 2000–1000 BC.',
    'multiple_choice',
    'Igbo', 'Yoruba', 'Nupe', 'Kanuri',
    'B',
    'History places the Yoruba origin around 2000–1000 BC.');

    ---------------------------------------------------------------------
    -- Q7 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Till today the history of the origins of the _____ people remains controversial.',
    'fill_in_blank',
    'Yoruba',
    'The origin of the Yoruba remains debated.');

    ---------------------------------------------------------------------
    -- Q8 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Till today the history of the ______ of the Yoruba people remains controversial.',
    'fill_in_blank',
    'origins',
    'The origins remain unclear.');

    ---------------------------------------------------------------------
    -- Q9 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'In his book "History of the Yoruba" (1950), _____ traces the origin of the Yoruba to the East.',
    'multiple_choice',
    'Prof. Akinjogbin', 'Obafemi Awolowo', 'Johnson', 'Ajayi Crowther',
    'C',
    'Johnson traced the Yoruba origin to the East.');

    ---------------------------------------------------------------------
    -- Q10 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The historic book "History of the Yoruba" (1950) was written by ______.',
    'fill_in_blank',
    'Rev. Samuel Johnson',
    'Rev. Johnson authored the work.');

    ---------------------------------------------------------------------
    -- Q11 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'According to Rev. Samuel Johnson, the Yoruba originally came from the ______ area of Africa.',
    'multiple_choice',
    'South-West', 'North-Eastern', 'North-West', 'Central',
    'B',
    'Johnson believed they came from the North-Eastern region.');

    ---------------------------------------------------------------------
    -- Q12 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'It is from _____ that the Yoruba finally settled in Ile-Ife in Nigeria.',
    'multiple_choice',
    'Sudan', 'Ethiopia', 'Egypt', 'Libya',
    'C',
    'Johnson says they migrated from Egypt.');

    ---------------------------------------------------------------------
    -- Q13 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    '______ is believed to be the first leader that led the Yoruba to Ile-Ife.',
    'multiple_choice',
    'Obatala', 'Oduduwa', 'Oranmiyan', 'Oramfe',
    'B',
    'Oduduwa was the first leader.');

    ---------------------------------------------------------------------
    -- Q14 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Oke Oramfe is located in ______.',
    'fill_in_blank',
    'Ile-Ife',
    'Oke Oramfe is in Ile-Ife.');

    ---------------------------------------------------------------------
    -- Q15 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    '______ is believed to be the centre from which the world was created.',
    'multiple_choice',
    'Oke Oramfe', 'Oke Mole', 'Oke Ado', 'Oke Ira',
    'A',
    'Yoruba tradition says creation began at Oke Oramfe.');

    ---------------------------------------------------------------------
    -- Q16 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'According to tradition, who got drunk with palm wine on the journey to the world?',
    'multiple_choice',
    'Oduduwa', 'Oranmiyan', 'Obatala', 'Sango',
    'C',
    'Obatala became drunk with palm wine.');

    ---------------------------------------------------------------------
    -- Q17 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who seized the symbol of authority and led the party to the world?',
    'multiple_choice',
    'Obatala', 'Oduduwa', 'Oramfe', 'Ogun',
    'B',
    'Oduduwa took the authority and led.');

    ---------------------------------------------------------------------
    -- Q18 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The site on which Oduduwa landed is traditionally known as ______.',
    'fill_in_blank',
    'Oke Oramfe',
    'That was the landing point.');

    ---------------------------------------------------------------------
    -- Q19 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'How many pieces of iron did Oduduwa set down?',
    'multiple_choice',
    'Three', 'Four', 'Five', 'Seven',
    'C',
    'Oduduwa used five pieces of iron.');

    ---------------------------------------------------------------------
    -- Q20 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The _____ spread its toes on the earth.',
    'fill_in_blank',
    'cockerel',
    'The cockerel spread the earth.');

    ---------------------------------------------------------------------
    -- Q21 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    '______ is best known as the major kingdom that eventually emerged as an empire in Yorubaland.',
    'multiple_choice',
    'Ife', 'Owo', 'Oyo', 'Ijebu',
    'C',
    'Oyo became an empire.');

    ---------------------------------------------------------------------
    -- Q22 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Various traditions believe that Oyo was founded by ______.',
    'fill_in_blank',
    'Oranmiyan',
    'Oranmiyan founded Oyo.');

    ---------------------------------------------------------------------
    -- Q23 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Oranmiyan, the son of Oduduwa, is credited with establishing the present ______ monarchy.',
    'multiple_choice',
    'Benin', 'Ife', 'Nupe', 'Oyo',
    'A',
    'Oranmiyan established the Benin monarchy.');

    ---------------------------------------------------------------------
    -- Q24 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Oyo Empire was founded in the middle of the _____ century.',
    'multiple_choice',
    '14th', '15th', '16th', '17th',
    'B',
    'Oyo Empire began in the mid-15th century.');


    ---------------------------------------------------------------------
    -- Q25 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'In the Yoruba creation account, which material did Oduduwa place on the five pieces of iron?',
    'multiple_choice',
    'Palm kernel', 'Lump of earth', 'Calabash', 'Clay pot',
    'B',
    'Oduduwa placed a lump of earth on the iron pieces.');

    ---------------------------------------------------------------------
    -- Q26 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The ______ spread its toes to distribute the earth.',
    'fill_in_blank',
    'cockerel',
    'The cockerel spread the earth.');

    ---------------------------------------------------------------------
    -- Q27 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who is believed to have established the present Benin monarchy?',
    'multiple_choice',
    'Oba Ewuare', 'Oduduwa', 'Oranmiyan', 'Sango',
    'C',
    'Oranmiyan founded the Benin monarchy.');

    ---------------------------------------------------------------------
    -- Q28 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which empire grew to become the most powerful in Yorubaland?',
    'multiple_choice',
    'Ife Empire', 'Oyo Empire', 'Ekiti Confederacy', 'Ijebu Kingdom',
    'B',
    'The Oyo Empire grew into a major empire.');

    ---------------------------------------------------------------------
    -- Q29 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Oyo Empire was founded in the middle of the ______ century.',
    'fill_in_blank',
    'fifteenth',
    'The founding period is the 15th century.');

    ---------------------------------------------------------------------
    -- Q30 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'According to Yoruba oral tradition, which figure is regarded as the progenitor of all Yoruba kings?',
    'multiple_choice',
    'Obatala', 'Sango', 'Oduduwa', 'Ogun',
    'C',
    'Oduduwa is regarded as the progenitor of Yoruba kings.');

    ---------------------------------------------------------------------
    -- Q31 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'According to Yoruba mythology, what caused Obatala to fail in his mission?',
    'multiple_choice',
    'He got lost', 'He became drunk', 'He refused the mission', 'He broke the iron pieces',
    'B',
    'He became drunk with palm wine.');

    ---------------------------------------------------------------------
    -- Q32 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'In Yoruba tradition, Oduduwa landed at ______ during creation.',
    'fill_in_blank',
    'Oke Oramfe',
    'Oke Oramfe is regarded as the landing point.');

    ---------------------------------------------------------------------
    -- Q33 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which two historians explained the Oke Oramfe creation account in detail?',
    'multiple_choice',
    'Akinjogbin & Ayandele', 'Fagunwa & Adeboye', 'Egharevba & Johnson', 'Falola & Adebayo',
    'A',
    'Akinjogbin & Ayandele discussed the Oke Oramfe account.');

    ---------------------------------------------------------------------
    -- Q34 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which group is believed to have migrated from Egypt to their present homeland?',
    'multiple_choice',
    'Igbo', 'Hausa', 'Yoruba', 'Kanuri',
    'C',
    'Johnson argued the Yoruba migrated from Egypt.');

    ---------------------------------------------------------------------
    -- Q35 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Yoruba finally settled in ______ after their long migration.',
    'fill_in_blank',
    'Ile-Ife',
    'Ile-Ife is considered the cradle of Yoruba civilization.');

    ---------------------------------------------------------------------
    -- Q36 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which figure in Yoruba belief system is associated with creation and molding of humans?',
    'multiple_choice',
    'Ogun', 'Obatala', 'Esu', 'Sango',
    'B',
    'Obatala is believed to mold humans.');

    ---------------------------------------------------------------------
    -- Q37 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which tool is associated with the Yoruba creation myth?',
    'multiple_choice',
    'A hoe', 'A calabash', 'Five pieces of iron', 'A bow and arrow',
    'C',
    'The creation account includes five pieces of iron.');

    ---------------------------------------------------------------------
    -- Q38 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Oranmiyan was the son of ______.',
    'fill_in_blank',
    'Oduduwa',
    'Oranmiyan is recorded as the son of Oduduwa.');

    ---------------------------------------------------------------------
    -- Q39 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which Yoruba city is regarded as the spiritual centre of the Yoruba people?',
    'multiple_choice',
    'Oyo', 'Ijebu-Ode', 'Ile-Ife', 'Osogbo',
    'C',
    'Ile-Ife is considered the spiritual centre.');

    ---------------------------------------------------------------------
    -- Q40 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which event led Oduduwa to take over leadership during creation?',
    'multiple_choice',
    'He defeated Obatala', 'Obatala slept off', 'Obatala got drunk', 'The gods chose him',
    'C',
    'Obatala’s drunkenness allowed Oduduwa to lead.');

    ---------------------------------------------------------------------
    -- Q41 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Oyo was founded by ______.',
    'fill_in_blank',
    'Oranmiyan',
    'Tradition credits Oranmiyan for founding Oyo.');

    ---------------------------------------------------------------------
    -- Q42 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'What object did the cockerel use to spread the earth during creation?',
    'multiple_choice',
    'Its wings', 'Its beak', 'Its toes', 'Its claws',
    'C',
    'The cockerel spread the earth with its toes.');

    ---------------------------------------------------------------------
    -- Q43 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which city is regarded as the origin of Yoruba civilization?',
    'multiple_choice',
    'Oyo', 'Ife', 'Ijebu', 'Ondo',
    'B',
    'Ife is regarded as the origin of Yoruba civilization.');

    ---------------------------------------------------------------------
    -- Q44 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'According to tradition, creation began at ______.',
    'fill_in_blank',
    'Oke Oramfe',
    'Oke Oramfe is the Yoruba creation point.');

    ---------------------------------------------------------------------
    -- Q45 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who among these is NOT associated with Yoruba origins?',
    'multiple_choice',
    'Oduduwa', 'Oranmiyan', 'Obatala', 'Queen Amina',
    'D',
    'Queen Amina belongs to Hausa history.');

    ---------------------------------------------------------------------
    -- Q46 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'What did Oduduwa use to create dry land?',
    'multiple_choice',
    'Sand and wood', 'Iron and water', 'Five iron pieces and earth', 'Clay and feathers',
    'C',
    'The five iron pieces + lump of earth formed land.');

    ---------------------------------------------------------------------
    -- Q47 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Yoruba believe their first settlement was ______.',
    'fill_in_blank',
    'Ile-Ife',
    'Ile-Ife is seen as the first settlement.');

    ---------------------------------------------------------------------
    -- Q48 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which of these states is NOT traditionally part of the Yoruba region?',
    'multiple_choice',
    'Osun', 'Ekiti', 'Kwara', 'Borno',
    'D',
    'Borno is Kanuri territory.');

    ---------------------------------------------------------------------
    -- Q49 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which Yoruba subgroup is directly linked to Oduduwa’s lineage?',
    'multiple_choice',
    'Ijebu', 'Oyo', 'Itsekiri', 'Ebira',
    'B',
    'The Oyo royal line claims direct descent.');

    ---------------------------------------------------------------------
    -- Q50 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Yoruba creation story involves the journey of the gods from ______.',
    'fill_in_blank',
    'Egypt',
    'Tradition says they migrated from Egypt.');
    ---------------------------------------------------------------------
    -- Q51 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'The Yoruba ethnic group is believed to have emerged between which years?',
    'multiple_choice',
    '1000–500 BC', '3000–2000 BC', '2000–1000 BC', '1500–500 BC',
    'C',
    'Historical records suggest the Yoruba emerged between 2000–1000 BC.');

    ---------------------------------------------------------------------
    -- Q52 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Till today, the ______ of the Yoruba people remains controversial.',
    'fill_in_blank',
    'history',
    'The history of Yoruba origins remains debated.');

    ---------------------------------------------------------------------
    -- Q53 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'According to Johnson, the Yoruba originally came from which direction?',
    'multiple_choice',
    'North-West', 'East', 'South', 'North-East',
    'D',
    'Johnson traced their origins to the North-Eastern area of Africa.');

    ---------------------------------------------------------------------
    -- Q54 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The journey of the Yoruba finally ended at ______.',
    'fill_in_blank',
    'Ile-Ife',
    'Ile-Ife is the final settlement in the migration.');

    ---------------------------------------------------------------------
    -- Q55 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which Yoruba leader is associated with the founding of Oyo?',
    'multiple_choice',
    'Oduduwa', 'Obatala', 'Oranmiyan', 'Oramfe',
    'C',
    'Oranmiyan founded Oyo.');

    ---------------------------------------------------------------------
    -- Q56 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which Yoruba kingdom eventually became the largest empire in the region?',
    'multiple_choice',
    'Ife', 'Oyo', 'Ijebu', 'Ondo',
    'B',
    'Oyo Empire emerged as the largest.');

    ---------------------------------------------------------------------
    -- Q57 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Oranmiyan, the son of Oduduwa, helped establish the ______ monarchy.',
    'fill_in_blank',
    'Benin',
    'He played a major role in Benin.');

    ---------------------------------------------------------------------
    -- Q58 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which deity is said to have gotten drunk with palm wine on the journey?',
    'multiple_choice',
    'Oduduwa', 'Oranmiyan', 'Obatala', 'Sango',
    'C',
    'Obatala became drunk, allowing Oduduwa to lead.');

    ---------------------------------------------------------------------
    -- Q59 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Oke Oramfe is considered in Yoruba tradition as:',
    'multiple_choice',
    'A trading post', 'The origin of the world', 'A military camp', 'A palace',
    'B',
    'It is regarded as the centre from which the world was created.');

    ---------------------------------------------------------------------
    -- Q60 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Yoruba creation story includes placing a lump of earth on ______ pieces of iron.',
    'fill_in_blank',
    'five',
    'Five iron pieces were used to create land.');

    ---------------------------------------------------------------------
    -- Q61 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which of these states is NOT part of traditional Yoruba land?',
    'multiple_choice',
    'Osun', 'Oyo', 'Kwara', 'Borno',
    'D',
    'Borno is not part of Yoruba land.');

    ---------------------------------------------------------------------
    -- Q62 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who documented the Yoruba migration in the 1950 book "History of the Yoruba"?',
    'multiple_choice',
    'Fagunwa', 'Ajayi Crowther', 'Rev. Samuel Johnson', 'Akinjogbin',
    'C',
    'Rev. Samuel Johnson authored this historical account.');

    ---------------------------------------------------------------------
    -- Q63 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Yoruba people are primarily found in ______ Nigeria.',
    'fill_in_blank',
    'Southern',
    'The Yoruba reside in Southern Nigeria.');

    ---------------------------------------------------------------------
    -- Q64 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'According to tradition, who led the Yoruba people after Obatala became incapacitated?',
    'multiple_choice',
    'Oranmiyan', 'Oduduwa', 'Ogun', 'Sango',
    'B',
    'Oduduwa took over leadership.');

    ---------------------------------------------------------------------
    -- Q65 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which of these Yoruba leaders is linked to Ile-Ife?',
    'multiple_choice',
    'Oranmiyan', 'Obatala', 'Oduduwa', 'Ajibola',
    'C',
    'Oduduwa is central to Ile-Ife.');

    ---------------------------------------------------------------------
    -- Q66 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The cockerel in Yoruba myth is used to spread ______ on the earth.',
    'fill_in_blank',
    'soil',
    'The cockerel spreads soil to create land.');

    ---------------------------------------------------------------------
    -- Q67 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who is credited with founding the Oyo Empire?',
    'multiple_choice',
    'Oranmiyan', 'Oduduwa', 'Obatala', 'Ajibola',
    'A',
    'Oranmiyan founded Oyo Empire.');

    ---------------------------------------------------------------------
    -- Q68 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Oyo Empire was founded in which century?',
    'multiple_choice',
    '14th', '15th', '16th', '17th',
    'B',
    'Oyo Empire emerged in the middle of the 15th century.');

    ---------------------------------------------------------------------
    -- Q69 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Yoruba migration to Ile-Ife started from ______.',
    'fill_in_blank',
    'Egypt',
    'The tradition records Egypt as the starting point.');

    ---------------------------------------------------------------------
    -- Q70 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who is associated with the introduction of kingship in Benin?',
    'multiple_choice',
    'Oduduwa', 'Oranmiyan', 'Obatala', 'Ogun',
    'B',
    'Oranmiyan established the Benin monarchy.');

    ---------------------------------------------------------------------
    -- Q71 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'A century after its founding, Oyo Empire extended its authority as far as?',
    'multiple_choice',
    'Dahomey', 'Benin', 'Ijebu', 'Kano',
    'A',
    'Oyo Empire became powerful and extended its authority as far as Dahomey.');

    ---------------------------------------------------------------------
    -- Q72 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who was the head of the Oyo Empire?',
    'multiple_choice',
    'Bashorun', 'Alaafin', 'Ogboni', 'Bere',
    'B',
    'The Alaafin was the head of the Oyo Empire.');

    ---------------------------------------------------------------------
    -- Q73 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Alaafin was assisted in his administration by a retinue of officials made up of priests, officials, and _____.',
    'fill_in_blank',
    'eunuchs',
    'Eunuchs assisted the Alaafin along with priests and officials.');

    ---------------------------------------------------------------------
    -- Q74 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who acted as the prime minister in Oyo Empire?',
    'multiple_choice',
    'Alaafin', 'Bashorun', 'Ogboni', 'Bere',
    'B',
    'Bashorun acted as the prime minister.');

    ---------------------------------------------------------------------
    -- Q75 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which institution had the power to remove an Alaafin?',
    'multiple_choice',
    'Ogboni', 'Bere', 'Oyomesi', 'Eghaevbo',
    'C',
    'The Oyomesi could remove an Alaafin.');

    ---------------------------------------------------------------------
    -- Q76 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The head of the army was conferred with the title _____.',
    'fill_in_blank',
    'Are-Ona-Kankanfo',
    'Are-Ona-Kankanfo was the title for the army head.');

    ---------------------------------------------------------------------
    -- Q77 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Are-Ona-Kankanfo was expected to live outside the _____.',
    'fill_in_blank',
    'capital',
    'The army commander lived outside the capital.');

    ---------------------------------------------------------------------
    -- Q78 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'The provincial governments in Oyo Empire enjoyed considerable _____.',
    'multiple_choice',
    'autonomy', 'control', 'restriction', 'powerlessness',
    'A',
    'Provincial governments enjoyed considerable autonomy.');

    ---------------------------------------------------------------------
    -- Q79 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which annual event did the Alaafin use to renew allegiance of governors?',
    'multiple_choice',
    'New Yam Festival', 'Oro Festival', 'Annual festival periods', 'Egungun Festival',
    'C',
    'The annual festival periods were used for renewal of allegiance.');

    ---------------------------------------------------------------------
    -- Q80 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which group was the first to be visited by Europeans as early as 1472?',
    'multiple_choice',
    'Oyo', 'Bini', 'Igbo', 'Yoruba',
    'B',
    'The Bini were the first to be visited by Europeans.');

    ---------------------------------------------------------------------
    -- Q81 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'A Portuguese, _____, arrived during Ewuare’s reign in 1472.',
    'fill_in_blank',
    'Ruy de Sequeira',
    'Ruy de Sequeira arrived during Ewuare’s reign.');

    ---------------------------------------------------------------------
    -- Q82 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Alfonso de Aviero arrived during _____ reign in 1484.',
    'fill_in_blank',
    'Ozolua',
    'Alfonso de Aviero arrived during Ozolua’s reign.');

    ---------------------------------------------------------------------
    -- Q83 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'The Benin Kingdom was the first in West Africa to exchange ambassadors with a major European power.',
    'multiple_choice',
    'True', 'False', 'Partially True', 'Not recorded',
    'A',
    'Benin Kingdom was first to exchange ambassadors.');

    ---------------------------------------------------------------------
    -- Q84 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Egharevba (1968) claims that the Bini people emigrated from _____.',
    'fill_in_blank',
    'Egypt',
    'Egharevba recorded that Bini migrated from Egypt.');

    ---------------------------------------------------------------------
    -- Q85 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'According to Bini mythology, who was the youngest child of Osanobua?',
    'multiple_choice',
    'Eweka', 'Bini', 'Owodo', 'Oranmiyan',
    'B',
    'Bini was the youngest child.');

    ---------------------------------------------------------------------
    -- Q86 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The first ruler of Bini became the _____ of the land.',
    'fill_in_blank',
    'owner',
    'The first ruler became the owner of the land.');

    ---------------------------------------------------------------------
    -- Q87 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The first period of pre-colonial Bini history is known as the _____.',
    'fill_in_blank',
    'Ogiso era',
    'The Ogiso era marks the first period.');

    ---------------------------------------------------------------------
    -- Q88 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'The Ogisos means:',
    'multiple_choice',
    'Kings of the sky', 'Lords of the land', 'Gods of war', 'Chief priests',
    'A',
    'Ogisos means "kings of the sky".');

    ---------------------------------------------------------------------
    -- Q89 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    '______ is credited with forming the guild system and laying a solid foundation for the Bini kingdom.',
    'fill_in_blank',
    'Ere',
    'Ere formed the guild system.');

    ---------------------------------------------------------------------
    -- Q90 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Ere was succeeded by _____ as Ogiso.',
    'fill_in_blank',
    'Orire',
    'Orire succeeded Ere.');

    ---------------------------------------------------------------------
    -- Q91 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The last Ogiso was _____.',
    'fill_in_blank',
    'Owodo',
    'Owodo was the last Ogiso.');

    ---------------------------------------------------------------------
    -- Q92 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Who founded Ughoton, a port-town in Benin?',
    'multiple_choice',
    'Owodo', 'Ekaladeran', 'Oranmiyan', 'Ere',
    'B',
    'Ekaladeran founded Ughoton.');

    ---------------------------------------------------------------------
    -- Q93 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The youngest son sent by Ekaladeran to establish the Eweka dynasty was _____.',
    'fill_in_blank',
    'Oranmiyan',
    'Oranmiyan established the Eweka dynasty.');

    ---------------------------------------------------------------------
    -- Q94 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'Oranmiyan means _____',
    'fill_in_blank',
    'pampered child',
    'The name Oranmiyan means pampered child.');

    ---------------------------------------------------------------------
    -- Q95 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Which dynasty did Eweka establish?',
    'multiple_choice',
    'Ogiso dynasty', 'Eweka dynasty', 'Oranmiyan dynasty', 'Owodo dynasty',
    'B',
    'Eweka established the present Bini dynasty.');

    ---------------------------------------------------------------------
    -- Q96 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Bini kingdom had a unique political system centered on the _____.',
    'multiple_choice',
    'Alaafin', 'Oba', 'Bashorun', 'Ogboni',
    'B',
    'The Oba was the center of political system.');

    ---------------------------------------------------------------------
    -- Q97 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Bini society was classified into how many distinct classes?',
    'multiple_choice',
    'Two', 'Three', 'Four', 'Five',
    'A',
    'Bini society had two classes: nobility and commoners.');

    ---------------------------------------------------------------------
    -- Q98 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The nobility was organized into three groups of title holders: the Uzama, the Eghaevbo n’Ogbe, and the Eghaevbo n’ore. The first group is called _____.',
    'fill_in_blank',
    'Uzama',
    'Uzama is the first group of title holders.');

    ---------------------------------------------------------------------
    -- Q99 - Fill in the blank
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    correct_answer, explanation)
    VALUES (v_course_id,
    'The Igbo people are best known for their _____ way of life.',
    'fill_in_blank',
    'segmentary or acephalous',
    'Igbo society is segmentary or acephalous.');

    ---------------------------------------------------------------------
    -- Q100 - Multiple Choice
    ---------------------------------------------------------------------
    INSERT INTO questions (course_id, question_text, question_type,
    option_a, option_b, option_c, option_d, correct_answer, explanation)
    VALUES (v_course_id,
    'Generally, the Igbo are predominantly _____.',
    'multiple_choice',
    'farmers and traders', 'hunters', 'soldiers', 'fishermen',
    'A',
    'Igbo are mainly farmers and traders.');
END $$;