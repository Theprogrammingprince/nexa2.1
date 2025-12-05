DO $$
DECLARE
v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'STT211' LIMIT 1;

-- Q1 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is any well-defined list or collection of objectives.', 'fill_in_blank', 'Set', 'A set is any well-defined list or collection of objectives.');

-- Q2 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The objectives comprising the set are called its ______.', 'multiple_choice',
'elements or members', 'subsets', 'complements', 'unions', 'A',
'The objectives comprising the set are called its elements or members.');

-- Q3 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A set will be denoted by ______.', 'multiple_choice',
'lower case letters', 'capital letters or symbols', 'numbers', 'Greek symbols only', 'B',
'A set will be denoted by capital letters or symbols.');

-- Q4 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The elements of a set is denoted by ______ letters.', 'multiple_choice',
'capital', 'Greek', 'lower case', 'bold', 'C',
'The elements of a set is denoted by lower case letters.');

-- Q5 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A set A is a ______ of a set if each element in A also belongs to Ω.', 'fill_in_blank', 'Subset', 'A set A is a subset of a set if each element in A also belongs to Ω.');

-- Q6 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Two sets A and B are called ______ if and only if they contain exactly the same elements.', 'multiple_choice',
'Subsets', 'Equal', 'Disjoint', 'Complementary', 'B',
'Two sets A and B are called equal if and only if they contain exactly the same elements.');

-- Q7 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The set which contains no elements is called the ______.', 'multiple_choice',
'Universal set', 'Power set', 'Null set', 'Singleton set', 'C',
'The set which contains no elements is called the null set.');

-- Q8 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The elements which are not included in A also constitute a subset. This is known as the ______ of A.', 'multiple_choice',
'Union', 'Intersection', 'Complement', 'Difference', 'C',
'The elements which are not included in A constitute the complement of A.');

-- Q9 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The set of all elements which belongs to both sets A and B is called the ______.', 'multiple_choice',
'Union', 'Intersection', 'Complement', 'Difference', 'B',
'The set of all elements which belongs to both sets A and B is called the intersection.');

-- Q10 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The set of all the elements which occur in either A or B or both is called the ______.', 'multiple_choice',
'Intersection', 'Difference', 'Union', 'Complement', 'C',
'The set of all the elements which occur in either A or B or both is called the union.');

-- Q11 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ______ of A and B is the set of elements which belong to A but not to B.', 'multiple_choice',
'union', 'intersection', 'complement', 'difference', 'D',
'The difference of A and B is the set of elements which belong to A but not to B.');

-- Q12 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The union of two sets A ∪ B can be divided into ______ disjoint sets.', 'fill_in_blank', 'Three', 'The union of two sets A ∪ B can be divided into three disjoint sets.');

-- Q13 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is a set of numbers occurring in order and there is a simple rule by which the terms are obtained.', 'multiple_choice',
'Set', 'Sequence', 'Series', 'Function', 'B',
'A sequence is a set of numbers occurring in order and there is a simple rule by which the terms are obtained.');

-- Q14 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'If the terms of a sequence are considered as a sum, the expression is called a ______.', 'multiple_choice',
'Sequence', 'Function', 'Series', 'Set', 'C',
'If the terms of a sequence are considered as a sum, the expression is called a series.');

-- Q15 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A series with a finite number of terms is called a ______.', 'multiple_choice',
'infinite series', 'geometric series', 'finite series', 'arithmetic series', 'C',
'A series with a finite number of terms is called a finite series.');

-- Q16 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The function y = e^x is called an ______.', 'multiple_choice',
'logarithmic function', 'exponential function', 'polynomial function', 'trigonometric function', 'B',
'The function y = e^x is called an exponential function.');

-- Q17 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The notation r! is called ______.', 'multiple_choice',
'permutation', 'combination', 'factorial', 'exponential', 'C',
'The notation r! is called factorial.');

-- Q18 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The factorial of any negative integer is ______.', 'fill_in_blank', 'infinite', 'The factorial of any negative integer is infinite.');

-- Q19 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Generalization of the Binomial theorem is the ______ theorem.', 'multiple_choice',
'Polynomial', 'Multinomial', 'Exponential', 'Factorial', 'B',
'Generalization of the Binomial theorem is the multinomial theorem.');

-- Q20 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______ had its origin in games of chance such as dice and card games.', 'multiple_choice',
'Statistics', 'Algebra', 'Probability', 'Calculus', 'C',
'Probability had its origin in games of chance such as dice and card games.');

-- Q21 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______ can be defined as a measure put on occurrence of a random phenomenon.', 'multiple_choice',
'Statistics', 'Probability', 'Mean', 'Variance', 'B',
'Probability can be defined as a measure put on occurrence of a random phenomenon.');

-- Q22 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______ theory is developed as study of the outcomes of trial of an experiment.', 'multiple_choice',
'Set', 'Number', 'Probability', 'Game', 'C',
'Probability theory is developed as study of the outcomes of trial of an experiment.');

-- Q23 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An ______ is a phenomenon to be observed according to a clearly defined procedure.', 'multiple_choice',
'event', 'outcome', 'experiment', 'sample', 'C',
'An experiment is a phenomenon to be observed according to a clearly defined procedure.');

-- Q24 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Probabilities are numbers between ______.', 'multiple_choice',
'-1 and 1', '0 and 100', '0 and 1', '1 and 10', 'C',
'Probabilities are numbers between 0 and 1.');

-- Q25 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The set consisting of all possible outcome of an experiment is called a ______.', 'fill_in_blank', 'sample space', 'The set consisting of all possible outcome of an experiment is called a sample space.');

-- Q26 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Any subset A of a sample space Ω is called an ______.', 'multiple_choice',
'Experiment', 'Trial', 'Event', 'Outcome', 'C',
'Any subset A of a sample space Ω is called an event.');

-- Q27 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is a single performance of an experiment.', 'multiple_choice',
'sample', 'trial', 'event', 'outcome', 'B',
'A trial is a single performance of an experiment.');

-- Q28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'There are basically ______ methods for assigning probabilities to events.', 'multiple_choice',
'one', 'two', 'three', 'four', 'B',
'There are basically two methods for assigning probabilities to events.');

-- Q29 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The two methods for assigning probabilities to events are ______ and ______.', 'multiple_choice',
'Mean and Median', 'Relative frequency approach and classical approach', 'Addition and Multiplication', 'Binomial and Poisson', 'B',
'The two methods are relative frequency approach and classical approach.');

-- Q30 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is an arrangement of objects in a definite order (called ordered sample).', 'multiple_choice',
'combination', 'permutation', 'set', 'sequence', 'B',
'A permutation is an arrangement of objects in a definite order.');

-- Q31 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is a selection of objects without regard to order (unordered sample).', 'multiple_choice',
'permutation', 'set', 'combination', 'sequence', 'C',
'A combination is a selection of objects without regard to order.');

-- Q32 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A ______ is any ordered sequence of elements of two kinds.', 'fill_in_blank', 'Run', 'A run is any ordered sequence of elements of two kinds.');

-- Q33 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The event "A does not occur" is called the ______ of A.', 'multiple_choice',
'Union', 'Intersection', 'Complement', 'Difference', 'C',
'The event "A does not occur" is called the complement of A.');

-- Q34 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Two or more events are said to be ______ if their union equals the whole sample space.', 'multiple_choice',
'independent', 'mutually exclusive', 'exhaustive', 'complementary', 'C',
'Two or more events are said to be exhaustive if their union equals the whole sample space.');

-- Q35 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ______ of an event A given that an event B has occurred is denoted as P(A|B).', 'multiple_choice',
'marginal probability', 'joint probability', 'conditional probability', 'total probability', 'C',
'The conditional probability of an event A given that an event B has occurred is denoted as P(A|B).');

-- Q36 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The notion of ______ is a basic tool of probability theory.', 'multiple_choice',
'dependence', 'independence', 'correlation', 'causation', 'B',
'The notion of independence is a basic tool of probability theory.');

-- Q37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______ variable is a variable whose actual numerical value is determined by chance.', 'multiple_choice',
'dependent', 'independent', 'random', 'control', 'C',
'A random variable is a variable whose actual numerical value is determined by chance.');

-- Q38 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'There are ______ easily identifiable types of random variables.', 'fill_in_blank', 'two', 'There are two easily identifiable types of random variables.');

-- Q39 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The types of random variables are ______ and ______.', 'multiple_choice',
'dependent and independent', 'discrete and continuous', 'qualitative and quantitative', 'nominal and ordinal', 'B',
'The types of random variables are discrete and continuous.');

-- Q40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A ______ variable is one that takes only a limited number of possible values.', 'multiple_choice',
'continuous', 'discrete', 'independent', 'dependent', 'B',
'A discrete variable is one that takes only a limited number of possible values.');

-- Q41 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A random variable is denoted by a ______ letter.', 'multiple_choice',
'lower case', 'Greek', 'capital', 'bold', 'C',
'A random variable is denoted by a capital letter.');

-- Q42 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A random variable x is ______ if it can assume at most a finite or a countable infinite number of possible values.', 'multiple_choice',
'continuous', 'normal', 'discrete', 'uniform', 'C',
'A random variable x is discrete if it can assume at most a finite or a countable infinite number of possible values.');

-- Q43 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The real valued function f defined on R by f(x) = p(X = x) is called the ______.', 'multiple_choice',
'cumulative distribution function', 'moment generating function', 'discrete probability density function of X', 'characteristic function', 'C',
'The real valued function f defined on R by f(x) = p(X = x) is called the discrete probability density function of X.');

-- Q44 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A random trail in which the outcome can be classified into one of two mutually exclusive ways is called a ______.', 'multiple_choice',
'Poisson trial', 'Bernoulli trial', 'Normal trial', 'Uniform trial', 'B',
'A random trail in which the outcome can be classified into one of two mutually exclusive ways is called a Bernoulli trial.');

-- Q45 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Any variable assuming only two values is called a ______.', 'fill_in_blank', 'Bernoulli random variable', 'Any variable assuming only two values is called a Bernoulli random variable.');

-- Q46 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An event is said to be ______ if the probability p of observing the event is very small.', 'multiple_choice',
'Common', 'Certain', 'Rare', 'Independent', 'C',
'An event is said to be rare if the probability p of observing the event is very small.');

-- Q47 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'E(X) is also called the mean of X or the ______.', 'multiple_choice',
'sample mean', 'population mean', 'median', 'mode', 'B',
'E(X) is also called the mean of X or the population mean.');

-- Q48 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A probability density function f(x) is called a ______ if f(-x) = f(x) for all x.', 'multiple_choice',
'uniform probability function', 'exponential probability function', 'symmetric probability function', 'asymmetric probability function', 'C',
'A probability density function f(x) is called a symmetric probability function if f(-x) = f(x) for all x.');

-- Q49 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A special case of the gamma distribution is called the ______.', 'multiple_choice',
'normal distribution', 'binomial distribution', 'chi-square distribution', 'uniform distribution', 'C',
'A special case of the gamma distribution is called the chi-square distribution.');

-- Q50 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, '______ is a generalization of the binomial distribution in which each of n independent identical experiments can result in any of k possible outcomes.', 'multiple_choice',
'Poisson distribution', 'Normal distribution', 'Multinomial distribution', 'Exponential distribution', 'C',
'Multinomial distribution is a generalization of the binomial distribution.');

-- Q51 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The determinant J is called the ______ of the transformation.', 'multiple_choice',
'Derivative', 'Integral', 'Jacobian', 'Determinant', 'C',
'The determinant J is called the Jacobian of the transformation.');

-- Q52 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A set consisting of only one element is called a ______ set.', 'multiple_choice',
'null', 'universal', 'singleton', 'finite', 'C',
'A set consisting of only one element is called a singleton set.');

-- Q53 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In a class 40% of the students enrolled for Math and 70% enrolled for Economics. If 15% enrolled for both, what % did not enroll for either?', 'multiple_choice',
'10%', '5%', '15%', '20%', 'B',
'Using the principle of inclusion-exclusion: 100% - (40% + 70% - 15%) = 5%.');

-- Q54 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'How many permutations of three letters can be formed from the letters a, b, c, d, e?', 'multiple_choice',
'15', '30', '60', '120', 'C',
'Permutation of 3 from 5 = P(5,3) = 5!/(5-3)! = 60.');

-- Q55 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A group of students consist of 5 men and 3 women. How many different rankings are possible if no two students obtain the same score?', 'multiple_choice',
'5040', '40320', '720', '120', 'B',
'Total students = 8. Number of rankings = 8! = 40320.');

-- Q56 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'If events A and B are mutually exclusive, P(A) = 0.2 and P(B) = 0.4, then P(A ∩ B) is ______.', 'multiple_choice',
'0.6', '0.08', '0', '0.2', 'C',
'For mutually exclusive events, P(A ∩ B) = 0.');

-- Q57 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A card is drawn at random from a well shuffled pack. The probability that it is a heart or a queen is ______ %.', 'fill_in_blank', '31', 'P(Heart or Queen) = P(Heart) + P(Queen) - P(Heart and Queen) = 13/52 + 4/52 - 1/52 = 16/52 ≈ 31%.');

-- Q58 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the probability that the position in which the consonants appear remain unchanged when the letters of "Math" are re-arranged?', 'multiple_choice',
'50%', '25%', '75%', '33%', 'B',
'The probability is 25%.');

-- Q59 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The set of all possible outcomes of a random experiment is known as ______.', 'multiple_choice',
'Event space', 'Sample space', 'Outcome set', 'Trial space', 'B',
'The set of all possible outcomes of a random experiment is known as sample space.');

-- Q60 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A box of nine golf gloves contains two left-handed and seven right-handed gloves. If three gloves are selected without replacement, what is the probability that all are left-handed?', 'multiple_choice',
'0', '0.01', '0.05', '0.1', 'A',
'Since there are only 2 left-handed gloves, it is impossible to select 3 left-handed gloves. Probability = 0.');

-- Q61 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Discrete probability distribution in which outcome is very small with a very small period of time is classified as ______ distribution.', 'multiple_choice',
'Binomial', 'Normal', 'Poisson', 'Uniform', 'C',
'Discrete probability distribution with rare events over time is classified as Poisson distribution.');

-- Q62 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'If a bag contains fruits where 16% are apples, 30% are oranges and 20% other fruit, the probability of selecting an orange is ______%.', 'multiple_choice',
'16', '20', '30', '54', 'C',
'The probability of selecting an orange is 30%.');

-- Q63 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Probability without any conditions of occurrence of an event is considered as ______ probability.', 'fill_in_blank', 'Marginal', 'Probability without conditions is marginal probability.');

-- Q64 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Tail or head, one or zero, and girl or boy are examples of ______ events.', 'multiple_choice',
'Independent', 'Dependent', 'Complementary', 'Exhaustive', 'C',
'These are examples of complementary events.');

-- Q65 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Probability distribution having shape of bell and in which values of mean lies in centre is classified as ______ distribution.', 'multiple_choice',
'Uniform', 'Exponential', 'Normal', 'Poisson', 'C',
'Bell-shaped distribution with mean at center is normal distribution.');

END;