DO $$
DECLARE
v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'CHM205' LIMIT 1;

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
END $$;
