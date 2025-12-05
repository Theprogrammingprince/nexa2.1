DO $$
DECLARE
v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'CHM205' LIMIT 1;

IF v_course_id IS NULL THEN
    RAISE EXCEPTION 'Course CHM205 not found. Please run course population migration first.';
END IF;

-- Q1 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Amongst all elements of Group 4, _______ is the only one to occur in the elemental state as diamond and graphite.', 'multiple_choice',
'Silicon', 'Carbon', 'Germanium', 'Tin', 'B',
'Carbon is the only Group 4 element that occurs naturally in elemental form as diamond and graphite.');

-- Q2 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are _______ naturally occurring allotropic forms of carbon.', 'multiple_choice',
'One', 'Two', 'Three', 'Four', 'B',
'Carbon has two naturally occurring allotropic forms: diamond and graphite.');

-- Q3 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Air contains about ______% of carbon dioxide.', 'fill_in_blank', '0.03', 'The atmosphere contains approximately 0.03% carbon dioxide.');

-- Q4 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is the second most abundant element in the earth''s crust forming about 27.7%.', 'multiple_choice',
'Carbon', 'Silicon', 'Aluminum', 'Iron', 'B',
'Silicon is the second most abundant element in the Earth''s crust at 27.7%.');

-- Q5 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Oxygen with its relative abundance of __________% is the most abundant element in the earth''s crust.', 'multiple_choice',
'27.7', '46.6', '78.1', '0.03', 'B',
'Oxygen is the most abundant element in Earth''s crust with 46.6% relative abundance.');

-- Q6 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Common sand is an impure form of ________.', 'multiple_choice',
'Carbon', 'Silica', 'Glass', 'Clay', 'B',
'Common sand is primarily composed of impure silica (silicon dioxide).');

-- Q7 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'When an element exists in more than one form, it is called _______.', 'fill_in_blank', 'Allotropy', 'The phenomenon of an element existing in multiple forms is called allotropy.');

-- Q8 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The rigid, _______dimensional linkages make diamond one of the hardest substances known.', 'multiple_choice',
'One', 'Two', 'Three', 'Four', 'C',
'Diamond has three-dimensional covalent bonding network making it extremely hard.');

-- Q9 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is the material used in a nuclear reactor to moderate or slow down neutrons.', 'multiple_choice',
'Uranium', 'Moderator', 'Coolant', 'Control rod', 'B',
'A moderator is used in nuclear reactors to slow down fast neutrons from fission.');

-- Q10 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ are used in the extraction of aluminium.', 'multiple_choice',
'Carbon black', 'Graphite electrodes', 'Diamond electrodes', 'Silicon electrodes', 'B',
'Graphite electrodes are used in the electrolytic extraction of aluminium.');

-- Q11 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Coke is mainly used in _________.', 'fill_in_blank', 'Metallurgy', 'Coke is primarily used as a reducing agent in metallurgical processes.');

-- Q12 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is used to strengthen rubber, as a pigment in inks, paints, paper and plastics.', 'multiple_choice',
'Graphite', 'Carbon black', 'Diamond', 'Coke', 'B',
'Carbon black is used as a strengthening agent in rubber and as a pigment.');

-- Q13 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is used largely in transistor technology.', 'multiple_choice',
'Silicon', 'Germanium', 'Carbon', 'Lead', 'B',
'Germanium was historically important in early transistor technology.');

-- Q14 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______________ is equal to the charge the atom would have if all electrons in a covalent bond were assigned to the more electronegative atom.', 'multiple_choice',
'Valence', 'Oxidation state', 'Ionic charge', 'Formal charge', 'B',
'Oxidation state represents the hypothetical charge assuming complete electron transfer.');

-- Q15 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '______________ is a property by virtue of which elements form long chain compounds by single or multiple bond formation between atoms of the same element.', 'fill_in_blank', 'Catenation', 'Catenation is the ability of atoms to form chains through self-bonding.');

-- Q16 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_____________is the simplest fluorocarbon.', 'multiple_choice',
'CF2', 'CF3', 'CF4', 'C2F4', 'C',
'Carbon tetrafluoride (CF4) is the simplest fluorocarbon compound.');

-- Q17 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______________is obtained on passing steam over red hot coke.', 'multiple_choice',
'Carbon dioxide', 'Carbon monoxide', 'Methane', 'Hydrogen', 'B',
'Carbon monoxide is produced when steam passes over red hot coke.');

-- Q18 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Carbon monoxide is a colourless and ______________gas.', 'multiple_choice',
'Odourless', 'Fragrant', 'Pungent', 'Sweet-smelling', 'A',
'Carbon monoxide is a colourless, odourless, and highly toxic gas.');

-- Q19 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Silicon dioxide (SiO2) is commonly known as _____________.', 'fill_in_blank', 'Silica', 'Silicon dioxide is commonly called silica.');

-- Q20 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____________ is the purest and the most stable form of silica.', 'multiple_choice',
'Flint', 'Tridymite', 'Quartz', 'Cristobalite', 'C',
'Quartz is the purest and most stable crystalline form of silica.');

-- Q21 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Quartz is also called ____________.', 'multiple_choice',
'water glass', 'rock crystal', 'flint', 'glass', 'B',
'Quartz in its pure crystalline form is known as rock crystal.');

-- Q22 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The chief constituent of glass is _____________.', 'fill_in_blank', 'Silica', 'Silica (SiO2) is the primary component of glass.');

-- Q23 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Zeolites are also called ____________.', 'multiple_choice',
'Silicates', 'Permutits', 'Clays', 'Glasses', 'B',
'Zeolites are sodium aluminosilicates also known as permutits, used in water softening.');

-- Q24 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The method of melting glass was discovered about ___________B.C.', 'multiple_choice',
'1,000', '3,000', '5,000', '10,000', 'C',
'Glass melting was discovered around 5,000 B.C. in ancient civilizations.');

-- Q25 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____________ glasses are used for making laboratory and kitchen ware.', 'multiple_choice',
'Soda', 'Borate', 'Lead', 'Potash', 'B',
'Borate glasses (borosilicate) are heat-resistant and used for lab and kitchen ware.');

-- Q26 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________are a group of organosilicon polymers.', 'fill_in_blank', 'Silicones', 'Silicones are synthetic polymers containing silicon-oxygen backbones with organic side groups.');

-- Q27 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The C60 molecule is sometimes called _____________.', 'multiple_choice',
'diamond molecule', 'football molecule', 'crystal molecule', 'chain molecule', 'B',
'C60 fullerene has a spherical structure resembling a football (soccer ball).');

-- Q28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_____________ is the most abundant uncombined element accessible to man.', 'multiple_choice',
'Oxygen', 'Nitrogen', 'Hydrogen', 'Carbon', 'B',
'Nitrogen makes up about 78% of Earth''s atmosphere as N2.');

-- Q29 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nitrogen comprises ____________% of the atmosphere by volume.', 'multiple_choice',
'21', '46.6', '78.1', '0.03', 'C',
'Nitrogen gas constitutes approximately 78.1% of the atmosphere by volume.');

-- Q30 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Nitrogen is obtained commercially from __________.', 'fill_in_blank', 'Air', 'Nitrogen is commercially extracted from air through fractional distillation.');

-- Q31 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Phosphorus is extracted from phosphate rock by heating in an electric furnace at a temperature of about ___________ K.', 'multiple_choice',
'1000', '1400', '1800', '2000', 'C',
'Phosphorus extraction requires heating phosphate rock at approximately 1800 K.');

-- Q32 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The central atom in the trihydrides is ___________ hybridised.', 'multiple_choice',
'sp', 'sp2', 'sp3', 'sp3d', 'C',
'In trihydrides like NH3, the central atom is sp3 hybridised.');

-- Q33 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_____________ is used as a rocket fuel along with liquid air or oxygen as an oxidant.', 'multiple_choice',
'Ammonia', 'Hydrazine', 'Methane', 'Hydrogen', 'B',
'Hydrazine (N2H4) is used as rocket fuel with oxygen or air as oxidant.');

-- Q34 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Hydrazoic acid is also known as _____________.', 'fill_in_blank', 'hydrogen azide', 'Hydrazoic acid (HN3) is also called hydrogen azide.');

-- Q35 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Phosphine (PH3) is the most stable ____________ of phosphorus.', 'multiple_choice',
'Oxide', 'Hydride', 'Halide', 'Sulfide', 'B',
'Phosphine is the most stable hydride of phosphorus.');

-- Q36 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____________ is a colourless and extremely poisonous gas having a faint garlic odour.', 'multiple_choice',
'Ammonia', 'Phosphine', 'Hydrogen sulfide', 'Chlorine', 'B',
'Phosphine (PH3) is colourless, extremely poisonous, with a faint garlic odour.');

-- Q37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Pure phosphine ignites in air at about ____________ K.', 'multiple_choice',
'300', '435', '575', '800', 'B',
'Pure phosphine spontaneously ignites in air at approximately 435 K.');

-- Q38 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Nitrogen does not form any pentahalides.', 'fill_in_blank', 'True', 'Nitrogen cannot form pentahalides due to lack of available d-orbitals.');

-- Q39 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'N2O is also known as ___________.', 'multiple_choice',
'Nitric oxide', 'Laughing gas', 'Nitrogen dioxide', 'Nitrous acid', 'B',
'Dinitrogen oxide (N2O) is commonly called laughing gas due to its effects.');

-- Q40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nitric Oxide (NO) has a total of ____________ electrons.', 'multiple_choice',
'10', '12', '15', '16', 'C',
'NO has 15 total electrons (7 from N and 8 from O).');

-- Q41 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The bonding in NO is best described by the _____________theory.', 'multiple_choice',
'valence bond', 'molecular orbital', 'crystal field', 'ligand field', 'B',
'Molecular orbital theory best explains the bonding in NO with its unpaired electron.');

-- Q42 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The basic character of oxides _____________ on descending the group.', 'fill_in_blank', 'Increases', 'Basic character of oxides increases down a group as metallic character increases.');

-- Q43 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An ___________ is the acid in which ionisable hydrogen atoms are attached to the central atom through oxygen atoms.', 'multiple_choice',
'Haloacid', 'Oxoacid', 'Hydracid', 'Carboxylic acid', 'B',
'Oxoacids have ionizable hydrogens attached to the central atom via oxygen.');

-- Q44 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The most highly hydroxylated acid of an element in a particular oxidation state is called the ____________.', 'multiple_choice',
'meta acid', 'pyro acid', 'ortho acid', 'per acid', 'C',
'Ortho acids are the most highly hydroxylated forms of oxoacids.');

-- Q45 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Pure nitric acid is a colourless liquid with boiling point of ___________.', 'multiple_choice',
'273 K', '359 K', '373 K', '475 K', 'B',
'Pure nitric acid boils at 359 K (86°C).');

-- Q46 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_____________ converts a mixture of cyclohexanol and cyclohexanone to adipic acid which is the starting material for nylon polymers.', 'fill_in_blank', 'Nitric acid', 'Nitric acid oxidizes cyclohexanol and cyclohexanone to adipic acid used in nylon production.');

-- Q47 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Chlorine forms _____________% of earth''s crust.', 'multiple_choice',
'0.013', '0.054', '27.7', '46.6', 'A',
'Chlorine constitutes approximately 0.013% of Earth''s crust.');

-- Q48 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Fluorine is pale ____________.', 'multiple_choice',
'Green', 'Yellow', 'Blue', 'Red', 'B',
'Fluorine gas has a pale yellow color.');

-- Q49 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Chlorine is yellowish ____________.', 'multiple_choice',
'Brown', 'Green', 'Blue', 'Red', 'B',
'Chlorine gas is yellowish green in color.');

-- Q50 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '____________ is the most reactive of all the halogens.', 'fill_in_blank', 'Fluorine', 'Fluorine is the most reactive element and strongest oxidizing agent among halogens.');

-- Q51 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____________is the most electronegative element and has no basic properties.', 'multiple_choice',
'Oxygen', 'Fluorine', 'Chlorine', 'Nitrogen', 'B',
'Fluorine has the highest electronegativity (4.0) and shows no basic properties.');

-- Q52 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '___________ means salt producer.', 'multiple_choice',
'Chalcogen', 'Halogen', 'Pnictogen', 'Tetrel', 'B',
'The term halogen comes from Greek meaning "salt producer".');

-- Q53 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____________ is obtained by reduction of oxides of tin with carbon.', 'multiple_choice',
'Lead', 'Tin', 'Silicon', 'Germanium', 'B',
'Tin is extracted by reducing tin oxide with carbon.');

-- Q54 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Lead is used in glass and __________ manufacture.', 'fill_in_blank', 'Cement', 'Lead compounds are used in glass and cement manufacturing.');

-- Q55 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Tetrafluoroethene can be polymerized to a chemically inert plastic known as ______________.', 'multiple_choice',
'PVC', 'Polytetrafluoroethene', 'Polystyrene', 'Nylon', 'B',
'Polytetrafluoroethene (PTFE or Teflon) is formed from tetrafluoroethene polymerization.');

-- Q56 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____________ are layer structured silicates.', 'multiple_choice',
'Zeolites', 'Mica', 'Asbestos', 'Clays', 'B',
'Mica minerals have a layered sheet structure.');

-- Q57 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'When one of the P-P bonds in P4 is broken a polymeric form of phosphorus known as _________ is formed.', 'multiple_choice',
'White phosphorus', 'Red phosphorus', 'Black phosphorus', 'Violet phosphorus', 'B',
'Breaking P-P bonds in P4 produces polymeric red phosphorus.');

-- Q58 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The most metallic of the allotropes of phosphorus is __________.', 'fill_in_blank', 'Black phosphorus', 'Black phosphorus has the most metallic character among phosphorus allotropes.');

-- Q59 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_____________is formed when nitrogen from air and hydrogen from synthesis gas are reacted at high pressure in the presence of a catalyst.', 'multiple_choice',
'Hydrazine', 'Ammonia', 'Nitric acid', 'Urea', 'B',
'Ammonia is produced by the Haber process from nitrogen and hydrogen.');

-- Q60 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '____________ are giant macromolecules consisting of carbon atoms linked by a network of covalent bonds.', 'multiple_choice',
'Fullerenes only', 'Diamond and graphite', 'Silicones', 'Polymers', 'B',
'Diamond and graphite are network covalent structures of carbon atoms.');

-- Q61 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Ammonium ion formed on reaction with H+ has a _________ structure.', 'multiple_choice',
'Linear', 'Trigonal planar', 'Tetrahedral', 'Octahedral', 'C',
'NH4+ ion has tetrahedral geometry with sp3 hybridization.');

-- Q62 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Liquid ammonia is a basic solvent because it can easily accept a ___________.', 'fill_in_blank', 'Proton', 'Ammonia is basic because the nitrogen lone pair can accept protons.');

-- Q63 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In graphite, delocalised electrons make graphite a good ________.', 'multiple_choice',
'Insulator', 'Conductor of electricity', 'Semiconductor', 'Dielectric', 'B',
'Delocalized electrons in graphite allow electrical conductivity.');

-- Q64 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Group 5 element that is stored under water to protect it from oxygen is ________.', 'multiple_choice',
'Nitrogen', 'Phosphorus', 'Arsenic', 'Antimony', 'B',
'White phosphorus is stored under water to prevent spontaneous combustion in air.');

-- Q65 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Among the halogens Van der Waals forces of attraction are maximum in ____________.', 'multiple_choice',
'Fluorine', 'Chlorine', 'Bromine', 'Iodine', 'D',
'Iodine has the largest molecular size leading to strongest Van der Waals forces.');

-- Q66 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Apart from Sb and Bi the compounds formed by elements of Group 5 are predominantly ___________.', 'fill_in_blank', 'Covalent', 'Group 5 elements except antimony and bismuth form mainly covalent compounds.');

-- Q67 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'On descending the group of Group 5 elements ionisation energy __________.', 'multiple_choice',
'Increases', 'Decreases', 'Remains constant', 'Fluctuates', 'B',
'Ionization energy decreases down Group 5 as atomic size increases.');

-- Q68 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Group 5 elements exhibit a highest oxidation state of _________.', 'multiple_choice',
'+3', '+4', '+5', '+6', 'C',
'Group 5 elements can show a maximum oxidation state of +5.');

-- Q69 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In the gaseous state phosphorus exists as ____________.', 'multiple_choice',
'Monoatomic molecule', 'Diatomic molecule', 'Triatomic molecule', 'Tetra-atomic molecule', 'D',
'Gaseous phosphorus exists as P4 (tetra-atomic) molecule.');

-- Q70 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The tendency of ________ to form multiple bonds easily is due to its high bond energy and small atomic radius.', 'fill_in_blank', 'Carbon', 'Carbon forms strong multiple bonds due to small size and high bond energies.');
-- Q71 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Silica gel is _____________ form of Silicon dioxide.', 'multiple_choice',
'Crystalline', 'Amorphous', 'Metallic', 'Ionic', 'B',
'Silica gel is an amorphous (non-crystalline) form of SiO2 with porous structure.');
-- Q72 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Lightning discharge in the atmosphere converts nitrogen to _________.', 'multiple_choice',
'Ammonia', 'Nitric oxide', 'Nitrogen dioxide', 'Nitrous oxide', 'B',
'Lightning provides energy to convert N2 to nitric oxide (NO).');
-- Q73 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Multiple bonds between its atoms make _________ inert at room temperature.', 'multiple_choice',
'Oxygen', 'Nitrogen', 'Hydrogen', 'Chlorine', 'B',
'The strong triple bond in N2 makes nitrogen very unreactive at room temperature.');
-- Q74 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_________ occurs in the elemental state as diamond and graphite.', 'fill_in_blank', 'Carbon', 'Carbon naturally occurs in elemental form as diamond and graphite allotropes.');
-- Q75 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The principal constituents of all rocks, clays and soils are ___________.', 'multiple_choice',
'Carbonates', 'Silicates', 'Sulfates', 'Nitrates', 'B',
'Silicates are the main components of rocks, clays, and soils.');
-- Q76 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The purest and most stable form of silica is _____________.', 'multiple_choice',
'Flint', 'Tridymite', 'Quartz', 'Cristobalite', 'C',
'Quartz is the purest and most thermodynamically stable form of silica.');
-- Q77 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The most stable hydride of phosphorus is _________.', 'multiple_choice',
'P2H4', 'Phosphine', 'P2H6', 'Diphosphine', 'B',
'Phosphine (PH3) is the most stable hydride of phosphorus.');
-- Q78 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Pure phosphine ignites in air at about _______.', 'fill_in_blank', '435 K', 'Pure phosphine spontaneously ignites at approximately 435 K.');
-- Q79 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'All the elements of Group 5 form ________.', 'multiple_choice',
'Dihalides', 'Trihalides', 'Tetrahalides', 'Hexahalides', 'B',
'All Group 5 elements form trihalides with halogens.');
-- Q80 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ________ can be oxidised to pentahalides.', 'multiple_choice',
'Monohalides', 'Dihalides', 'Trihalides', 'Tetrahalides', 'C',
'Trihalides of Group 5 elements can be oxidized to pentahalides.');
-- Q81 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which element does not form any pentahalides?', 'multiple_choice',
'Phosphorus', 'Nitrogen', 'Arsenic', 'Antimony', 'B',
'Nitrogen lacks d-orbitals and cannot form pentahalides.');
-- Q82 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is used for conversion of alcohols to alkyl halides and acids to acylchlorides.', 'fill_in_blank', 'PCl5', 'Phosphorus pentachloride is used to convert alcohols to alkyl halides.');
-- Q83 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'N2O is also known as _______.', 'multiple_choice',
'Nitric oxide', 'Laughing gas', 'Nitrogen dioxide', 'Nitrous acid', 'B',
'N2O (nitrous oxide) is commonly called laughing gas.');
-- Q84 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'NO has a total of ________electrons.', 'multiple_choice',
'10', '13', '15', '16', 'C',
'Nitric oxide has 15 total electrons (7 from N, 8 from O).');
-- Q85 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An _______ is the acid in which ionisable hydrogen atoms are attached to the central atom through oxygen atoms.', 'multiple_choice',
'Organic acid', 'Oxoacid', 'Binary acid', 'Haloacid', 'B',
'Oxoacids have hydrogen atoms bonded to oxygen which is bonded to central atom.');
-- Q86 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The prefixes _______, meta and pyro are used to distinguish acids differing in the content of water.', 'fill_in_blank', 'ortho', 'Ortho, meta, and pyro prefixes indicate different water content in oxoacids.');
-- Q87 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The acid which has one water molecule less than the ortho acid is called ________.', 'multiple_choice',
'pyro acid', 'meta acid', 'per acid', 'hypo acid', 'B',
'Meta acids have one H2O less than the corresponding ortho acid.');
-- Q88 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Pure nitric acid is a colourless liquid with boiling point of _______.', 'multiple_choice',
'273 K', '300 K', '359 K', '373 K', 'C',
'Pure HNO3 has a boiling point of 359 K.');
-- Q89 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nitric acid converts a mixture of cyclohexanol and cyclohexanone to _______.', 'multiple_choice',
'benzoic acid', 'adipic acid', 'acetic acid', 'oxalic acid', 'B',
'Nitric acid oxidizes cyclohexanol and cyclohexanone to adipic acid for nylon production.');
-- Q90 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The oxidation state of phosphorus is _______ in phosphoric acids.', 'fill_in_blank', '+5', 'Phosphorus has +5 oxidation state in phosphoric acid (H3PO4).');
-- Q91 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is the continuous exchange of nitrogen between the atmosphere and the biosphere.', 'multiple_choice',
'Carbon cycle', 'Nitrogen cycle', 'Oxygen cycle', 'Phosphorus cycle', 'B',
'The nitrogen cycle describes nitrogen movement between atmosphere and living organisms.');
-- Q92 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Calcium cyanamide is obtained by passing atmospheric N2 over calcium carbide at _______.', 'multiple_choice',
'800 K', '1000 K', '1400 K', '1800 K', 'C',
'CaCN2 is produced by reacting N2 with CaC2 at 1400 K.');
-- Q93 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nitric acid is manufactured by _______ process.', 'multiple_choice',
'Haber', 'Ostwald', 'Contact', 'Solvay', 'B',
'The Ostwald process produces nitric acid from ammonia oxidation.');
-- Q94 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The first element of group 7 is _______.', 'fill_in_blank', 'Fluorine', 'Fluorine is the first and lightest halogen in Group 7.');
-- Q95 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Fluorine constitutes nearly _______% of earth''s crust.', 'multiple_choice',
'0.013', '0.054', '0.1', '0.5', 'B',
'Fluorine makes up approximately 0.054% of Earth''s crust.');
-- Q96 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The rarest of all the halogens is _______.', 'multiple_choice',
'Fluorine', 'Chlorine', 'Bromine', 'Iodine', 'D',
'Iodine is the rarest naturally occurring halogen.');
-- Q97 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Astatine is a _______ element.', 'multiple_choice',
'Stable', 'Radioactive', 'Noble', 'Transition', 'B',
'Astatine is radioactive with very short-lived isotopes.');
-- Q98 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________is made on an industrial scale by reaction of bromides with chlorine.', 'multiple_choice',
'Fluorine', 'Chlorine', 'Bromine', 'Iodine', 'C',
'Bromine is commercially produced by oxidizing bromides with chlorine.');
-- Q99 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The existence of fluorine was first shown by ______.', 'fill_in_blank', 'Davy', 'Sir Humphry Davy first demonstrated the existence of fluorine in 1813.');
-- Q100 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is present in the thyroid hormone.', 'multiple_choice',
'Fluorine', 'Chlorine', 'Bromine', 'Iodine', 'D',
'Iodine is an essential component of thyroid hormones.');
-- Q101 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A deficiency of _______ causes goitre and leads to stunted growth.', 'multiple_choice',
'Iron', 'Calcium', 'Iodine', 'Zinc', 'C',
'Iodine deficiency causes goitre and developmental problems.');
-- Q102 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is used for the production of uranium hexafluoride.', 'multiple_choice',
'Chlorine', 'Fluorine', 'Bromine', 'Iodine', 'B',
'Fluorine is used to produce UF6 for uranium enrichment.');
-- Q103 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ was used in the chemical warfare in World War I.', 'fill_in_blank', 'Chlorine', 'Chlorine gas was used as a chemical weapon in WWI.');
-- Q104 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'All elements of Group ______ have seven electrons in their outermost shells.', 'multiple_choice',
'5', '6', '7', '8', 'C',
'Group 7 elements (halogens) have seven valence electrons.');
-- Q105 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Fluorine is _______ in colour.', 'multiple_choice',
'Pale yellow', 'Yellowish green', 'Brown', 'Violet', 'A',
'Fluorine gas is pale yellow.');
-- Q106 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Bromine is ______ in colour.', 'multiple_choice',
'Yellow', 'Green', 'Brown', 'Violet', 'C',
'Bromine is a brown liquid at room temperature.');
-- Q107 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Iodine is ______ in the gaseous state.', 'multiple_choice',
'Yellow', 'Green', 'Brown', 'Violet', 'D',
'Iodine vapor is violet in color.');
-- Q108 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Solid iodine is almost _______ with a shiny metallic lustre.', 'fill_in_blank', 'Black', 'Solid iodine appears almost black with metallic luster.');
-- Q109 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Fluorine and chlorine are _______ at ordinary temperatures.', 'multiple_choice',
'Solids', 'Liquids', 'Gases', 'Plasmas', 'C',
'F2 and Cl2 are gases at room temperature.');
-- Q110 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Bromine is a _______ at ordinary temperatures.', 'multiple_choice',
'Solid', 'Liquid', 'Gas', 'Plasma', 'B',
'Bromine is the only liquid halogen at room temperature.');
-- Q111 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The thermal stability of hydrogen halides _______ from HF to HI.', 'multiple_choice',
'Increases', 'Decreases', 'Remains constant', 'Fluctuates', 'B',
'Thermal stability decreases from HF to HI due to decreasing bond strength.');
-- Q112 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Aqueous solutions of hydrogen halides are called ________.', 'fill_in_blank', 'hydrohalic acids', 'HCl, HBr, HI solutions are called hydrohalic acids.');
-- Q113 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The only halogen oxide which is stable with respect to dissociation into elements is _______.', 'multiple_choice',
'Cl2O', 'Br2O', 'I2O5', 'F2O', 'C',
'I2O5 (iodine pentoxide) is the most stable halogen oxide.');
-- Q114 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is used in the estimation of CO.', 'multiple_choice',
'Cl2O', 'I2O5', 'Br2O', 'F2O', 'B',
'I2O5 is used to estimate carbon monoxide concentration.');
-- Q115 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Oxygen difluoride is prepared by passing ______ into a 2% NaOH solution.', 'multiple_choice',
'Chlorine', 'Bromine', 'Fluorine', 'Iodine', 'C',
'OF2 is prepared by passing fluorine through dilute NaOH solution.');
-- Q116 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Chlorine dioxide is a gas at normal temperature having b.p. of _______.', 'fill_in_blank', '284 K', 'ClO2 has a boiling point of 284 K (11°C).');
-- Q117 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is the most stable among the hypohalous acids.', 'multiple_choice',
'HOF', 'HOCl', 'HOBr', 'HOI', 'B',
'Hypochlorous acid (HOCl) is the most stable hypohalous acid.');
-- Q118 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Compounds formed by the interaction of one halogen with other halogens are called _______.', 'multiple_choice',
'Halides', 'Interhalogen compounds', 'Halogens', 'Polyhalides', 'B',
'Compounds like ClF3, BrF5 are called interhalogen compounds.');
-- Q119 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Among the halogens _________ can oxidise all the other halide ions to their respective elements.', 'multiple_choice',
'Chlorine', 'Bromine', 'Fluorine', 'Iodine', 'C',
'Fluorine is the strongest oxidizing agent and can oxidize all other halide ions.');
-- Q120 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The number of covalent bonds formed by the halogens is _________.', 'fill_in_blank', '1', 'Halogens typically form one covalent bond to complete their octet.');
-- Q121 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Hydrolysis of silicon tetrachloride gives ___________.', 'multiple_choice',
'Silicon dioxide', 'Silicic acid', 'Silane', 'Silicate', 'B',
'SiCl4 hydrolyzes to form silicic acid (H4SiO4 or Si(OH)4).');
-- Q122 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_________ are fibrous silicates.', 'multiple_choice',
'Zeolites', 'Mica', 'Asbestos', 'Clays', 'C',
'Asbestos minerals are fibrous silicates with high tensile strength.');
-- Q123 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The simplest fluorocarbon obtained by the reaction of carbon tetrachloride with silver fluoride at 575K is ___________.', 'multiple_choice',
'CF3', 'C2F6', 'Carbon tetrafluoride', 'C3F8', 'C',
'CCl4 reacts with AgF at 575K to produce CF4 (carbon tetrafluoride).');
-- Q124 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Tetravalent compounds of heavier Group 4 elements function as Lewis acids because of the availability of __________.', 'fill_in_blank', 'D orbitals', 'Heavier Group 4 elements can use vacant d-orbitals to act as Lewis acids.');
-- Q125 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '___________ is formed when silica is fused with sodium carbonate.', 'multiple_choice',
'Sodium silicate', 'Water glass', 'Glass', 'Zeolite', 'B',
'Fusing silica with Na2CO3 produces sodium silicate (water glass).');
-- Q126 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The compound with the least bond energy is ___________.', 'multiple_choice',
'NH3', 'PH3', 'AsH3', 'BiH3', 'D',
'BiH3 has the weakest bonds due to large atomic size and poor overlap.');
-- Q127 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Carbon dioxide is used in fire extinguishers because ________.', 'multiple_choice',
'It is heavy', 'It does not support combustion', 'It is cheap', 'It is liquid', 'B',
'CO2 does not support combustion and is denser than air.');
-- Q128 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Graphite is the ________.', 'fill_in_blank', 'Softest of the allotropes of carbon', 'Graphite''s layered structure makes it soft and slippery.');
-- Q129 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Nitrogen is not able to form coordination number beyond four because ____________.', 'multiple_choice',
'It is too small', 'It lacks d-orbitals', 'It is too electronegative', 'It has high ionization energy', 'B',
'Nitrogen cannot expand its octet as it has no available d-orbitals.');
-- Q130 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The difference between silica and silicate is ________.', 'multiple_choice',
'Chemical formula only', 'Silica is made of SiO2 units whereas silicate is made of SiO4 unit', 'Physical state', 'Color', 'B',
'Silica consists of SiO2 units while silicates contain SiO4 tetrahedra.');
-- Q131 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'All the elements of Group 5 can expand their octet except _____________.', 'multiple_choice',
'Phosphorus', 'Nitrogen', 'Arsenic', 'Antimony', 'B',
'Nitrogen cannot expand its octet due to absence of d-orbitals.');
-- Q132 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Most Group 4 elements form mostly covalent compounds because very large amount of energy is required to form ____________.', 'fill_in_blank', 'M4+ ion', 'The high ionization energy prevents formation of M4+ ions, favoring covalent bonding.');
-- Q133 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Diamond is not a conductor of electricity because ____________.', 'multiple_choice',
'It is too hard', 'It does not have delocalised electrons', 'It is transparent', 'It has high melting point', 'B',
'All electrons in diamond are localized in covalent bonds, preventing conductivity.');
-- Q134 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Tin exhibits polymorphism because __________.', 'multiple_choice',
'It has many isotopes', 'It exists in two crystalline forms', 'It is metallic', 'It forms alloys', 'B',
'Tin exists as gray tin (diamond structure) and white tin (tetragonal structure).');
-- Q135 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ are formed when vapourised carbon condenses in an atmosphere of inert gas.', 'multiple_choice',
'Graphite', 'Diamond', 'Fullerenes', 'Carbon black', 'C',
'Fullerenes (C60, C70) form when carbon vapor condenses in inert atmosphere.');
-- Q136 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is the only liquid halogen.', 'fill_in_blank', 'Bromine', 'Bromine is the only halogen that is liquid at room temperature.');
-- Q137 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The only halogen that can oxidize chlorine is _______.', 'multiple_choice',
'Bromine', 'Iodine', 'Fluorine', 'Astatine', 'C',
'Only fluorine is strong enough to oxidize chlorine.');

- Q138 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The element known as ''super halogen'' is _______.', 'multiple_choice',
'Chlorine', 'Fluorine', 'Bromine', 'Iodine', 'B',
'Fluorine is called the super halogen due to its extreme reactivity.');
-- Q139 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The halogen called _______ is solid at room temperature.', 'multiple_choice',
'Fluorine', 'Chlorine', 'Bromine', 'Iodine', 'D',
'Iodine is a solid at room temperature with a metallic luster.');
-- Q140 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Nitriles are oxidized to nitrates by _______ bacteria.', 'fill_in_blank', 'Nitrifying', 'Nitrifying bacteria convert nitrites to nitrates in the nitrogen cycle.');
-- Q141 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Bacteria which convert nitrogen compounds into free nitrogen are known as _______ bacteria.', 'multiple_choice',
'Nitrogen-fixing', 'Nitrifying', 'Denitrifying', 'Decomposer', 'C',
'Denitrifying bacteria convert nitrogen compounds back to N2 gas.');
-- Q142 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The molecular formula of hydrazine is _______.', 'multiple_choice',
'NH3', 'N2H2', 'N2H4', 'NH2OH', 'C',
'Hydrazine has the molecular formula N2H4.');
-- Q143 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The hybridization of nitrogen in ammonia is _______.', 'multiple_choice',
'sp', 'sp2', 'sp3', 'sp3d', 'C',
'Nitrogen in NH3 is sp3 hybridized with tetrahedral geometry.');
-- Q144 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'All group V elements except ______ react with sulphur to form sulphides.', 'fill_in_blank', 'Nitrogen', 'Nitrogen does not react directly with sulfur to form sulfides.');
-- Q145 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The allotrope of phosphorus used in matches and fireworks is ________.', 'multiple_choice',
'White phosphorus', 'Red phosphorus', 'Black phosphorus', 'Violet phosphorus', 'B',
'Red phosphorus is used in safety matches and fireworks.');
-- Q146 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Of the group IV elements, the one that exhibits anomalous behaviour is ________.', 'multiple_choice',
'Silicon', 'Germanium', 'Carbon', 'Tin', 'C',
'Carbon shows anomalous behavior due to small size and ability to form multiple bonds.');
-- Q147 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The form of carbon that conducts electricity is _______.', 'multiple_choice',
'Diamond', 'Graphite', 'Fullerene', 'Carbon black', 'B',
'Graphite conducts electricity due to delocalized electrons.');
-- Q148 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The most metallic element in group IV is ________.', 'fill_in_blank', 'Lead', 'Lead is the most metallic of the Group 4 elements.');
-- Q149 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The strongest acid among the hydrogen halides is ________.', 'multiple_choice',
'HF', 'HCl', 'HBr', 'Hydroiodic acid', 'D',
'HI (hydroiodic acid) is the strongest acid among hydrogen halides.');
-- Q150 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Solid carbon dioxide is known as _______.', 'multiple_choice',
'Dry water', 'Dry ice', 'Frozen CO2', 'Carbon snow', 'B',
'Solid CO2 is commonly called dry ice as it sublimates without melting.');
END $$;
