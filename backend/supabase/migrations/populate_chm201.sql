DO $$
DECLARE
v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'CHM201' LIMIT 1;

IF v_course_id IS NULL THEN
    RAISE EXCEPTION 'Course CHM201 not found. Please run course population migration first.';
END IF;

-- Q1 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are _______ states of matter.', 'multiple_choice',
'Two', 'Three', 'Four', 'Five', 'B',
'The three classical states of matter are solid, liquid, and gas.');

-- Q2 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The three states of matter are ________, liquid and gas.', 'multiple_choice',
'Plasma', 'Solid', 'Vapor', 'Crystal', 'B',
'The three states of matter are solid, liquid, and gas.');

-- Q3 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The _______ theory offers explanation on the different rate of movement of microscopic properties within a given state of matter.', 'fill_in_blank', 'Kinetic', 'Kinetic theory explains molecular motion in different states of matter.');

-- Q4 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ have definite shape and occupied volume.', 'multiple_choice',
'Liquids', 'Gases', 'Solids', 'Plasmas', 'C',
'Solids maintain definite shape and volume due to strong intermolecular forces.');

-- Q5 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ and gases take the shape and volume of the containing vessel.', 'multiple_choice',
'Solids', 'Liquids', 'Crystals', 'Metals', 'B',
'Liquids and gases are fluid states that conform to their containers.');

-- Q6 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The theory which assumes that gas pressure is due to collision impacts of gas molecules on the wall of the container is known as _________.', 'multiple_choice',
'Quantum theory', 'Kinetic theory', 'Atomic theory', 'Molecular theory', 'B',
'Kinetic theory explains gas pressure as resulting from molecular collisions with container walls.');

-- Q7 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The average kinetic energy exerted by the moving gas molecules is a measure of the _______ of a gas.', 'multiple_choice',
'Pressure', 'Volume', 'Temperature', 'Density', 'C',
'Average kinetic energy of gas molecules is directly proportional to absolute temperature.');

-- Q8 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The _______ is used to indicate average molecular speed over N particles.', 'fill_in_blank', 'Bar', 'A bar over a symbol indicates the average value over many particles.');

-- Q9 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In a _______ dimensional system, the total square speed is given by Pythagoras theorem.', 'multiple_choice',
'One', 'Two', 'Three', 'Four', 'C',
'In three-dimensional space, total speed is calculated using the Pythagorean theorem.');

-- Q10 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _______ gas has three degrees of freedom.', 'multiple_choice',
'Diatomic', 'Mono atomic', 'Triatomic', 'Polyatomic', 'B',
'A monoatomic gas has three translational degrees of freedom (x, y, z directions).');

-- Q11 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The _______ explains the macroscopic properties of gases by considering their relationship with molecular composition and motion.', 'multiple_choice',
'Atomic theory', 'Kinetic theory', 'Quantum theory', 'Wave theory', 'B',
'Kinetic theory connects microscopic molecular behavior to macroscopic gas properties.');

-- Q12 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The relationship between _______ and volume is given by Boyle''s law.', 'multiple_choice',
'Temperature', 'Pressure', 'Mass', 'Density', 'B',
'Boyle''s law relates pressure and volume at constant temperature.');

-- Q13 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The relationship between volume and temperature is given by _______.', 'fill_in_blank', 'Charles'' law', 'Charles'' law describes the relationship between volume and temperature at constant pressure.');

-- Q14 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is a thermodynamic model that relates two or more state functions.', 'multiple_choice',
'Phase diagram', 'Equation of state', 'Energy diagram', 'Reaction mechanism', 'B',
'An equation of state mathematically relates thermodynamic state functions like P, V, and T.');

-- Q15 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ was the first to develop documented equation of state.', 'multiple_choice',
'Charles', 'Robert Boyle', 'Dalton', 'Avogadro', 'B',
'Robert Boyle developed the first documented equation of state through experiments on gas behavior.');

-- Q16 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ confirmed the relationship between pressure and volume of a fixed mass of a gas at constant temperature.', 'multiple_choice',
'Charles', 'Edme Mariotte (1676)', 'Dalton', 'Gay-Lussac', 'B',
'Edme Mariotte independently confirmed Boyle''s findings in 1676.');

-- Q17 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ states that at constant temperature, the volume of a fixed mass of a gas is inversely proportional to its pressure.', 'multiple_choice',
'Charles'' law', 'Boyle''s law', 'Dalton''s law', 'Avogadro''s law', 'B',
'Boyle''s law: P ∝ 1/V at constant temperature, or PV = constant.');

-- Q18 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The next level of development of equation of state for gases was pioneered by _______.', 'fill_in_blank', 'Jacques Charles (1787) and Joseph Louis Gay-Lussac (1802)', 'Charles and Gay-Lussac developed the relationship between volume and temperature.');

-- Q19 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ found that the expansive behaviour of air and some gases over a range of temperature followed a similar pattern.', 'multiple_choice',
'Boyle', 'Charles', 'Dalton', 'Avogadro', 'B',
'Jacques Charles discovered the temperature-volume relationship for gases.');

-- Q20 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ found that there is a linear relationship between volume and temperature.', 'multiple_choice',
'Boyle', 'Charles', 'Gay-Lussac', 'Mariotte', 'C',
'Gay-Lussac established the linear relationship between volume and temperature.');

-- Q21 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ states that at constant pressure, the volume of a given mass of a gas is directly proportional to its absolute temperature.', 'multiple_choice',
'Boyle''s law', 'Charles'' law', 'Dalton''s law', 'Graham''s law', 'B',
'Charles'' law: V ∝ T at constant pressure, or V/T = constant.');

-- Q22 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is concerned about the partial pressure exerted by gases in a mixture.', 'fill_in_blank', 'Dalton law', 'Dalton''s law of partial pressures applies to gas mixtures.');

-- Q23 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ law states that for a mixture of gases which do not react chemically, the total pressure is the sum of the partial pressures.', 'multiple_choice',
'Charles''', 'Boyle''s', 'Dalton''s', 'Graham''s', 'C',
'Dalton''s law: Total pressure = sum of individual partial pressures in a gas mixture.');

-- Q24 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ideal gas equation was developed by _______.', 'multiple_choice',
'Robert Boyle', 'Jacques Charles', 'Emile Clapeyron', 'John Dalton', 'C',
'Emile Clapeyron combined Boyle''s and Charles'' laws to develop the ideal gas equation.');

-- Q25 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Emile Clapeyron combined _______ laws in 1834.', 'multiple_choice',
'Boyle and Dalton', 'Boyle and Charles', 'Charles and Dalton', 'Dalton and Graham', 'B',
'Clapeyron combined Boyle''s and Charles'' laws to create PV = nRT in 1834.');

-- Q26 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The volume occupied by one mole of an ideal gas under standard temperature and pressure is called _______ of a gas.', 'fill_in_blank', 'Molar volume', 'Molar volume is 22.4 L at STP for one mole of any ideal gas.');

-- Q27 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The formula of ethane is _______.', 'multiple_choice',
'CH4', 'C2H6', 'C3H8', 'C2H4', 'B',
'Ethane has the molecular formula C2H6.');

-- Q28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ideal gas equation can be written as ________.', 'multiple_choice',
'PV = RT', 'PV = nRT', 'P = nRT/V', 'V = nRT', 'B',
'The ideal gas equation is PV = nRT, where n is number of moles and R is gas constant.');

-- Q29 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In ______, J. D. Van der Waals derived an equation of state that can be used to interpret the behaviour of real gases.', 'multiple_choice',
'1834', '1865', '1974', '1888', 'C',
'Van der Waals developed his equation for real gases in 1974.');

-- Q30 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ describes a process where particles of one gas spread throughout another gas by molecular motion.', 'fill_in_blank', 'Diffusion', 'Diffusion is the spreading of gas particles through another gas by random molecular motion.');

-- Q31 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ discovered that lighter gases diffuse at a faster rate than heavy gases.', 'multiple_choice',
'Boyle', 'Charles', 'Thomas Graham', 'Dalton', 'C',
'Thomas Graham discovered the relationship between diffusion rate and molecular mass.');

-- Q32 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ law states that the rate of diffusion of all gases at constant temperature and pressure is inversely proportional to the square root of its molar mass.', 'multiple_choice',
'Boyle''s law', 'Charles'' law', 'Law of diffusion/effusion of gas', 'Dalton''s law', 'C',
'Graham''s law: Rate ∝ 1/√(molar mass).');

-- Q33 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'From kinetic theory of gas, the average kinetic energy of a gas is a measure of the _______ of that gas.', 'multiple_choice',
'Pressure', 'Volume', 'Absolute temperature', 'Density', 'C',
'Average kinetic energy is directly proportional to absolute temperature.');

-- Q34 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Equilibrium may exist between a liquid and vapour due to _______ and condensation.', 'fill_in_blank', 'Evaporation', 'Dynamic equilibrium exists when evaporation and condensation rates are equal.');

-- Q35 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Equilibrium may exist between solid and vapour due to _______.', 'multiple_choice',
'Melting', 'Freezing', 'Sublimation', 'Deposition', 'C',
'Sublimation equilibrium exists between solid and vapor phases.');

-- Q36 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is the pressure exerted when an equilibrium is established between the number of particles evaporating and condensing within a given system.', 'multiple_choice',
'Atmospheric pressure', 'Vapor pressure', 'Partial pressure', 'Osmotic pressure', 'B',
'Vapor pressure is the equilibrium pressure of a vapor above its liquid.');

-- Q37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is a surface process that involves escape of energetic molecules of liquid from the surface.', 'multiple_choice',
'Boiling', 'Condensation', 'Evaporation', 'Sublimation', 'C',
'Evaporation is a surface phenomenon where molecules escape from liquid surface.');

-- Q38 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Evaporation differs from boiling in that _______.', 'fill_in_blank', 'It is a surface process while boiling involves the bulk liquid', 'Evaporation occurs at the surface; boiling occurs throughout the liquid.');

-- Q39 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Water has normal boiling point of _______.', 'multiple_choice',
'0°C', '25°C', '100°C', '373°C', 'C',
'Water boils at 100°C (373 K) at standard atmospheric pressure.');

-- Q40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ law states that the pressure of a single-phase mixture is equal to the mole-weighted sum of the component pressures.', 'multiple_choice',
'Dalton''s law', 'Raoult''s law', 'Henry''s law', 'Graham''s law', 'B',
'Raoult''s law relates vapor pressure to mole fraction in ideal solutions.');

-- Q41 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Systems that obey Raoult''s law are called _______.', 'multiple_choice',
'Real solutions', 'Ideal solutions', 'Colligative solutions', 'Dilute solutions', 'B',
'Ideal solutions follow Raoult''s law perfectly with no deviation.');

-- Q42 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The _______ was developed by a French engineer, Louis Charles Antoine in 1888.', 'fill_in_blank', 'Antoine equation', 'The Antoine equation relates temperature and vapor pressure for pure substances.');

-- Q43 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ equation is a semi-empirical equation that describes the relationship between temperature and vapour pressure for pure components.', 'multiple_choice',
'Van der Waals', 'Antoine', 'Clausius-Clapeyron', 'Ideal gas', 'B',
'The Antoine equation is an empirical relation between vapor pressure and temperature.');

-- Q44 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _______ is defined as a form of matter that is homogeneous in chemical composition and physical state.', 'multiple_choice',
'Mixture', 'Phase', 'Solution', 'Compound', 'B',
'A phase is a homogeneous region with uniform chemical and physical properties.');

-- Q45 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are _______ types of materials equilibrium.', 'multiple_choice',
'One', 'Two', 'Three', 'Four', 'B',
'Two types of material equilibrium: phase equilibrium and reaction equilibrium.');

-- Q46 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ refers to the transport of matter between phases of the system without conversion of one species to another.', 'fill_in_blank', 'Phase equilibrium', 'Phase equilibrium involves matter transfer between phases without chemical reaction.');

-- Q47 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The crossing of any two-phase curve in a phase diagram is called a _______.', 'multiple_choice',
'Critical point', 'Transition', 'Triple point', 'Equilibrium', 'B',
'A transition occurs where two phase boundaries cross on a phase diagram.');

-- Q48 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _______ is a graphical presentation of what phases exist at various pressures and temperatures.', 'multiple_choice',
'Energy diagram', 'Phase diagram', 'P-V diagram', 'Enthalpy diagram', 'B',
'Phase diagrams show which phase(s) are stable at different P and T conditions.');

-- Q49 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The region where the three phases co-exist in equilibrium is called _______.', 'multiple_choice',
'Critical point', 'Boiling point', 'Triple point', 'Freezing point', 'C',
'The triple point is where solid, liquid, and gas phases coexist in equilibrium.');

-- Q50 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The _______ states that the number of degrees of freedom of a system in equilibrium is equal to the number of components minus the number of phases plus two.', 'fill_in_blank', 'Phase rule', 'The Gibbs phase rule: F = C - P + 2, where F is degrees of freedom.');

-- Q51 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The _______ represent the environmental conditions which can be independently varied without changing the number of phases in the system.', 'multiple_choice',
'Components', 'Phases', 'Degrees of freedom', 'Equilibria', 'C',
'Degrees of freedom are the independent variables (T, P, composition) that can be changed.');

-- Q52 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is the pressure exerted when the number of energetically active molecules escaping from the surface equals those returning through condensation.', 'multiple_choice',
'Atmospheric pressure', 'Vapor pressure', 'Osmotic pressure', 'Partial pressure', 'B',
'Vapor pressure is established at dynamic equilibrium between evaporation and condensation.');

-- Q53 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '_______ is the study of heat change accompanying chemical and physical changes.', 'multiple_choice',
'Kinetics', 'Thermodynamics', 'Electrochemistry', 'Quantum mechanics', 'B',
'Thermodynamics studies energy changes in chemical and physical processes.');

-- Q54 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '_______ is a branch of thermodynamics that studies heat change accompanying chemical reactions.', 'fill_in_blank', 'Chemical thermodynamics', 'Chemical thermodynamics focuses on energy changes in chemical reactions.');

-- Q55 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The beginning of thermodynamics dates back to the year _______.', 'multiple_choice',
'1787', '1834', '1865', '1888', 'C',
'Rudolf Clausius laid foundations of thermodynamics in 1865.');

-- Q56 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '________ is the part of the universe chosen for thermodynamic study.', 'multiple_choice',
'Surroundings', 'Boundary', 'Thermodynamic system', 'Environment', 'C',
'A thermodynamic system is the specific portion of matter under study.');

-- Q57 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The amount of work of expansion done by a reaction is called ________.', 'multiple_choice',
'Heat work', 'Pressure volume work', 'Electrical work', 'Mechanical work', 'B',
'Pressure-volume work (P-V work) is work done by gas expansion or compression.');

-- Q58 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'If the boundary allows heat transfer between the system and surroundings, the boundary is ______.', 'fill_in_blank', 'Diathermal', 'A diathermal boundary permits heat flow between system and surroundings.');

-- Q59 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An _______ boundary is a boundary that does not allow heat transfer.', 'multiple_choice',
'Open', 'Closed', 'Adiabatic', 'Isothermal', 'C',
'An adiabatic boundary prevents heat transfer (thermally insulated).');

-- Q60 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An _______ is one that exchanges no matter, heat, or work with the surroundings.', 'multiple_choice',
'Open system', 'Closed system', 'Isolated system', 'Adiabatic system', 'C',
'An isolated system has no exchange of matter or energy with surroundings.');

-- Q61 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A _______ describes the property of a system that depends only on the initial and final states.', 'multiple_choice',
'Path function', 'State function', 'Process variable', 'Intensive property', 'B',
'State functions are independent of the path taken, depending only on initial and final states.');

-- Q62 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, '________ is defined when there is an energetic change within the system.', 'fill_in_blank', 'Thermodynamic process', 'A thermodynamic process involves energy changes in a system.');

-- Q63 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An ________ process occurs at constant pressure.', 'multiple_choice',
'Isothermal', 'Isochoric', 'Isobaric', 'Adiabatic', 'C',
'An isobaric process maintains constant pressure throughout.');

-- Q64 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An ________ is a process that is carried out at constant volume.', 'multiple_choice',
'Isobaric', 'Isochoric process', 'Isothermal', 'Adiabatic', 'B',
'An isochoric (or isometric) process occurs at constant volume.');

-- Q65 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An ________ is a process which occurs at a constant temperature.', 'multiple_choice',
'Isobaric', 'Isochoric', 'Isothermal process', 'Isentropic', 'C',
'An isothermal process maintains constant temperature throughout.');

-- Q66 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'An _______ is a system which is thermally insulated from its environment.', 'fill_in_blank', 'Adiabatic process', 'An adiabatic process has no heat transfer (q = 0).');

-- Q67 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An _______ is a process that is carried out at constant entropy.', 'multiple_choice',
'Isobaric', 'Isochoric', 'Isothermal', 'Isentropic', 'D',
'An isentropic process occurs at constant entropy (no heat transfer).');

END $$;