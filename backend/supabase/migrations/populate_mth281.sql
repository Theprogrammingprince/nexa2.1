DO $$
DECLARE
v_course_id UUID;
BEGIN
SELECT id INTO v_course_id FROM courses WHERE code = 'MTH281' LIMIT 1;

-- Q1 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What does the limit of f(x) as x approaches a represent?', 'multiple_choice',
'The value of f(a)', 'The value f(x) approaches as x gets close to a', 'The derivative at x = a', 'The integral from 0 to a', 'B',
'The limit represents the value that f(x) approaches as x gets sufficiently near to point a.');

-- Q2 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A function f(x) is continuous at x = a if which conditions are met?', 'multiple_choice',
'Only f(a) exists', 'The limit exists and equals f(a)', 'f(x) is differentiable at a', 'f(x) is integrable at a', 'B',
'A function is continuous at x = a if the limit exists, the function is defined at a, and the limit equals f(a).');

-- Q3 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The differential coefficient of y with respect to x is denoted by the symbol ____.', 'fill_in_blank', 'dy/dx',
'The differential coefficient is commonly written as dy/dx or f''(x).');

-- Q4 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'If f(x) is differentiable at x = a, what does this imply about continuity?', 'multiple_choice',
'f(x) must be discontinuous at a', 'f(x) must be continuous at a', 'f(x) may or may not be continuous', 'f(x) has no derivative', 'B',
'Differentiability at a point implies continuity at that point.');

-- Q5 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What does Rolle''s Theorem state about a continuous function f(x) in [a,b] where f(a) = f(b) = 0?', 'multiple_choice',
'f(x) is always zero', 'There exists at least one c where f''(c) = 0', 'f(x) has no maxima or minima', 'f(x) is not differentiable', 'B',
'Rolle''s Theorem guarantees at least one point c in (a,b) where the derivative f''(c) equals zero.');

-- Q6 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The differential coefficient of sin x is:', 'multiple_choice',
'sin x', '-cos x', 'cos x', 'tan x', 'C',
'The derivative of sin x with respect to x is cos x.');

-- Q7 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A function that has just one real value for every input is called a ____ function.', 'fill_in_blank', 'single-valued',
'A single-valued function returns exactly one output for each input value.');

-- Q8 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'What is the nth differential coefficient of y = sin x?', 'multiple_choice',
'sin(x + nπ)', 'sin(x + nπ/2)', 'cos(x + nπ/2)', 'n sin x', 'B',
'The nth derivative of sin x is sin(x + nπ/2).');

-- Q9 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Leibnitz''s formula is used for finding:', 'multiple_choice',
'Limits of functions', 'The nth derivative of a product', 'Partial derivatives', 'Definite integrals', 'B',
'Leibnitz''s formula provides a method for finding the nth differential coefficient of a product of two functions.');

-- Q10 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'At a maximum point of f(x), the necessary condition is:', 'multiple_choice',
'f''(x) > 0', 'f''(x) = 0', 'f''(x) < 0', 'f(x) = 0', 'B',
'A necessary condition for a maximum or minimum is that the first derivative equals zero.');

-- Q11 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The partial derivative of f(x,y) with respect to x while keeping y constant is denoted as ____.', 'fill_in_blank', '∂f/∂x',
'Partial derivatives use the symbol ∂ to indicate differentiation with respect to one variable while others are held constant.');

-- Q12 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For a function f(x,y), if fxy = fyx, what property is demonstrated?', 'multiple_choice',
'Non-commutativity', 'Commutativity of partial differentiation', 'Discontinuity', 'Non-differentiability', 'B',
'When the mixed partial derivatives are equal, it demonstrates the commutative property of partial differentiation.');

-- Q13 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The total differential df for f(x,y) is given by:', 'multiple_choice',
'(∂f/∂x)dx + (∂f/∂y)dy', 'dx + dy', '(∂f/∂x)(∂f/∂y)', 'f(x) + f(y)', 'A',
'The total differential is the sum of partial derivatives multiplied by their respective differentials.');

-- Q14 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A function f(x,y) is homogeneous of degree m if:', 'multiple_choice',
'f(x+y) = f(x) + f(y)', 'f(kx, ky) = k^m f(x,y)', 'f(x,y) = m', 'f(x) = f(y)', 'B',
'A homogeneous function of degree m satisfies f(kx, ky) = k^m f(x,y) for any constant k.');

-- Q15 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Euler''s theorem applies to ____ functions.', 'fill_in_blank', 'homogeneous',
'Euler''s theorem is specifically applicable to homogeneous functions.');

-- Q16 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'According to Euler''s theorem, if u = f(x,y) is homogeneous of degree m, then:', 'multiple_choice',
'x(∂f/∂x) + y(∂f/∂y) = 0', 'x(∂f/∂x) + y(∂f/∂y) = mf', 'x(∂f/∂x) - y(∂f/∂y) = f', '(∂f/∂x)(∂f/∂y) = m', 'B',
'Euler''s theorem states that for a homogeneous function of degree m: x(∂f/∂x) + y(∂f/∂y) = mf.');

-- Q17 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Taylor''s series expansion of f(x) about x = a includes:', 'multiple_choice',
'Only the first derivative', 'All derivatives evaluated at x = a', 'Only even derivatives', 'No derivatives', 'B',
'Taylor''s series uses all orders of derivatives of the function evaluated at the point of expansion.');

-- Q18 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Maclaurin''s series is a special case of Taylor''s series where:', 'multiple_choice',
'a = 1', 'a = 0', 'a = ∞', 'a = -1', 'B',
'Maclaurin''s series is Taylor''s series expanded about the point a = 0.');

-- Q19 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The method of Lagrange multipliers is used to find maxima and minima subject to ____.', 'fill_in_blank', 'constraints',
'Lagrange multipliers are employed when optimizing functions with constraints or conditions.');

-- Q20 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For a stationary point to be a minimum, which condition must hold?', 'multiple_choice',
'fxx < 0 and Δ < 0', 'fxx > 0 and Δ < 0', 'fxx = 0', 'Δ > 0', 'B',
'At a minimum point, the second derivative test requires fxx > 0 and Δ = fxx·fyy - fxy² < 0.');

-- Q21 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A saddle point occurs when:', 'multiple_choice',
'Δ < 0', 'Δ > 0', 'Δ = 0', 'fxx = fyy', 'B',
'A saddle point occurs when Δ = fxx·fyy - fxy² > 0, indicating neither a maximum nor minimum.');

-- Q22 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A series Σar converges if:', 'multiple_choice',
'lim(n→∞) an ≠ 0', 'lim(n→∞) an = 0 and partial sums converge', 'an increases without bound', 'an alternates', 'B',
'A necessary (but not sufficient) condition for convergence is that lim(n→∞) an = 0 and partial sums must converge to a finite limit.');

-- Q23 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The harmonic series 1 + 1/2 + 1/3 + ... is ____.', 'fill_in_blank', 'divergent',
'Despite terms approaching zero, the harmonic series diverges to infinity.');

-- Q24 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The p-series Σ(1/r^p) converges if:', 'multiple_choice',
'p < 1', 'p = 1', 'p > 1', 'p ≤ 0', 'C',
'The p-series converges when p > 1 and diverges when p ≤ 1.');

-- Q25 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'D''Alembert''s ratio test states that a series Σar converges if:', 'multiple_choice',
'lim(ar+1/ar) = k > 1', 'lim(ar+1/ar) = k < 1', 'lim(ar+1/ar) = 1', 'lim(ar+1/ar) = 0', 'B',
'By d''Alembert''s ratio test, a series converges when the limit of consecutive term ratios is less than 1.');

-- Q26 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'An alternating series converges if:', 'multiple_choice',
'Terms increase in magnitude', 'Terms decrease and lim(an) = 0', 'Terms are all positive', 'Terms are constant', 'B',
'An alternating series converges if terms continually decrease in magnitude and approach zero.');

-- Q27 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A series that converges when considering absolute values is called ____ convergent.', 'fill_in_blank', 'absolutely',
'A series is absolutely convergent if the series of absolute values converges.');

-- Q28 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A conditionally convergent series is one where:', 'multiple_choice',
'Both the series and its absolute values converge', 'The series converges but absolute values diverge', 'Neither converges', 'Only absolute values converge', 'B',
'Conditional convergence occurs when the series converges but the series of absolute values diverges.');

-- Q29 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The radius of convergence R for a power series is found using:', 'multiple_choice',
'R = lim(ar/ar+1)', 'R = lim(ar+1/ar)', 'R = Σar', 'R = lim(ar)', 'A',
'The radius of convergence is determined by R = lim(ar/ar+1) when the limit exists.');

-- Q30 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The interval of convergence for a power series with radius R is:', 'multiple_choice',
'x < R', '|x| < R', 'x > R', 'x = R', 'B',
'A power series converges absolutely in the interval |x| < R, where R is the radius of convergence.');

-- Q31 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The exponential series e^x converges for ____ values of x.', 'fill_in_blank', 'all',
'The exponential series has an infinite radius of convergence and converges for all real values of x.');

-- Q32 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which operation preserves convergence for power series?', 'multiple_choice',
'Multiplication by a constant outside the interval', 'Term-by-term differentiation within the interval', 'Squaring all terms', 'Removing terms', 'B',
'Term-by-term differentiation or integration within the interval of convergence preserves convergence.');

-- Q33 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Maclaurin series for sin x is:', 'multiple_choice',
'x - x³/3! + x⁵/5! - ...', '1 - x²/2! + x⁴/4! - ...', 'x + x²/2! + x³/3! + ...', '1 + x + x²/2! + ...', 'A',
'The Maclaurin series for sin x is x - x³/3! + x⁵/5! - x⁷/7! + ...');

-- Q34 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The Maclaurin series for cos x is:', 'multiple_choice',
'x - x³/3! + x⁵/5! - ...', '1 - x²/2! + x⁴/4! - ...', 'x + x²/2! + x³/3! + ...', '1 + x + x² + ...', 'B',
'The Maclaurin series for cos x is 1 - x²/2! + x⁴/4! - x⁶/6! + ...');

-- Q35 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'L''Hospital''s rule is used to evaluate limits of the indeterminate form ____.', 'fill_in_blank', '0/0',
'L''Hospital''s rule applies to indeterminate forms such as 0/0 or ∞/∞.');

-- Q36 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'According to L''Hospital''s rule, lim(f(x)/g(x)) as x→a equals:', 'multiple_choice',
'f(a)/g(a)', 'lim(f''(x)/g''(x))', 'f''(a) + g''(a)', '0', 'B',
'L''Hospital''s rule states that for indeterminate forms, lim(f(x)/g(x)) = lim(f''(x)/g''(x)).');

-- Q37 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The trapezium rule for numerical integration divides the area into:', 'multiple_choice',
'Rectangles', 'Trapezoids', 'Triangles', 'Circles', 'B',
'The trapezium rule approximates the area under a curve by dividing it into trapezoid-shaped sections.');

-- Q38 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Simpson''s rule requires the number of strips to be:', 'multiple_choice',
'Odd', 'Even', 'Prime', 'Any number', 'B',
'Simpson''s rule requires an even number of strips (odd number of ordinates) for proper application.');

-- Q39 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Simpson''s rule with five ordinates uses ____ strips.', 'fill_in_blank', 'four',
'With five ordinates (points), there are four intervals or strips between them.');

-- Q40 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Simpson''s formula for approximating ∫f(x)dx over [a,b] with h = (b-a)/2 is:', 'multiple_choice',
'(h/2)[f(a) + f(b)]', '(h/3)[f(a) + 4f((a+b)/2) + f(b)]', 'h[f(a) + f(b)]', '(h/6)[f(a) + f(b)]', 'B',
'Simpson''s rule uses the formula (h/3)[f(a) + 4f(c) + f(b)] where c is the midpoint.');

-- Q41 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Compared to the trapezium rule, Simpson''s rule generally provides:', 'multiple_choice',
'Less accurate results', 'More accurate results', 'The same accuracy', 'No numerical results', 'B',
'Simpson''s rule typically provides more accurate approximations than the trapezium rule for the same number of intervals.');

-- Q42 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The error term in Taylor''s theorem is represented by:', 'multiple_choice',
'The first derivative', 'The constant term', 'En(x) involving the (n+1)th derivative', 'Zero', 'C',
'The error or remainder term En(x) involves the (n+1)th derivative evaluated at some point between a and x.');

-- Q43 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'A function satisfying ∂²f/∂x² + ∂²f/∂y² = 0 is called a ____ function.', 'fill_in_blank', 'harmonic',
'Functions satisfying Laplace''s equation are called harmonic functions.');

-- Q44 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Laplace''s equation in two dimensions is:', 'multiple_choice',
'∂f/∂x + ∂f/∂y = 0', '∂²f/∂x² + ∂²f/∂y² = 0', '∂²f/∂x² - ∂²f/∂y² = 0', 'f(x,y) = 0', 'B',
'Laplace''s equation in two dimensions is ∂²f/∂x² + ∂²f/∂y² = 0.');

-- Q45 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The change of variables from Cartesian (x,y) to polar coordinates (r,θ) uses:', 'multiple_choice',
'x = r sin θ, y = r cos θ', 'x = r cos θ, y = r sin θ', 'x = r + θ, y = r - θ', 'x = θ, y = r', 'B',
'In polar coordinates, x = r cos θ and y = r sin θ.');

-- Q46 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For implicit differentiation where F(x,y) = 0, dy/dx equals:', 'multiple_choice',
'∂F/∂x', '-∂F/∂x / ∂F/∂y', '∂F/∂y / ∂F/∂x', '0', 'B',
'For implicit functions, dy/dx = -(∂F/∂x)/(∂F/∂y).');

-- Q47 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The nth derivative of e^x is ____.', 'fill_in_blank', 'e^x',
'All derivatives of e^x equal e^x itself.');

-- Q48 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The comparison test for series states that if 0 ≤ ar ≤ br for all r and Σbr converges, then:', 'multiple_choice',
'Σar diverges', 'Σar converges', 'Σar oscillates', 'No conclusion can be made', 'B',
'By the comparison test, if ar ≤ br and Σbr converges, then Σar also converges.');

-- Q49 - Multiple choice
INSERT INTO questions (course_id, questioINSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The series 1 - 1/2 + 1/3 - 1/4 + ... converges to ____.', 'fill_in_blank', 'ln 2',
'The alternating harmonic series converges to the natural logarithm of 2.');
-- Q60 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A critical point occurs where:', 'multiple_choice',
'f(x) = 0', 'f''(x) = 0', 'f''''(x) = 0', 'f(x) = ∞', 'B',
'Critical or stationary points occur where the first derivative equals zero.');
-- Q61 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The second derivative test for maxima states that at x = c:', 'multiple_choice',
'f''(c) > 0', 'f''(c) < 0', 'f''(c) = 0', 'f''''(c) < 0', 'B',
'For a maximum, f''(c) = 0 and f''''(c) < 0.');
-- Q62 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A point of inflection occurs where:', 'multiple_choice',
'f''(x) = 0 only', 'f''''(x) = 0 and concavity changes', 'f(x) = 0', 'f''''(x) > 0', 'B',
'Points of inflection occur where the second derivative is zero and the concavity changes.');
-- Q63 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The derivative of tan^(-1) x is ____.', 'fill_in_blank', '1/(1+x²)',
'The derivative of inverse tangent is 1/(1+x²).');
-- Q64 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For a geometric series Σak^r, the sum when |k| < 1 is:', 'multiple_choice',
'a/(1+k)', 'a/(1-k)', 'ak', 'a(1-k)', 'B',
'A convergent geometric series with first term a and ratio k has sum a/(1-k).');
-- Q65 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The operator D in differentiation represents:', 'multiple_choice',
'Integration', 'd/dx', 'Multiplication', 'Division', 'B',
'The operator D denotes differentiation with respect to x: D = d/dx.');
-- Q66 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For small x, sin x can be approximated by:', 'multiple_choice',
'1', 'x', 'x²', '0', 'B',
'For small values of x, sin x ≈ x is a first-order approximation.');
-- Q67 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'As x approaches 0, (sin x)/x approaches ____.', 'fill_in_blank', '1',
'The limit of (sin x)/x as x approaches 0 equals 1.');
-- Q68 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The total derivative du/dt for u = f(x,y) where x and y are functions of t is:', 'multiple_choice',
'∂u/∂t', '(∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt)', 'dx/dt + dy/dt', '0', 'B',
'The total derivative uses the chain rule: du/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt).');
-- Q69 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The elliptic integral K(1/√2) represents:', 'multiple_choice',
'A polynomial', 'An elementary function', 'A special function requiring numerical methods', 'Zero', 'C',
'Elliptic integrals are special functions that typically require numerical integration methods.');
-- Q70 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In the trapezium rule, increasing the number of strips generally:', 'multiple_choice',
'Decreases accuracy', 'Increases accuracy', 'Has no effect', 'Causes divergence', 'B',
'Using more strips in the trapezium rule typically improves the accuracy of the approximation.');
-- Q71 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Simpson''s rule is more accurate than the trapezium rule because it uses ____ interpolation.', 'fill_in_blank', 'parabolic',
'Simpson''s rule fits parabolic curves through points, providing better approximation than linear trapezoids.');
-- Q72 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The ratio test is inconclusive when:', 'multiple_choice',
'k < 1', 'k > 1', 'k = 1', 'k = 0', 'C',
'When the limit ratio k equals 1, the ratio test provides no information about convergence.');
-- Q73 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The derivative of e^(sin x) is:', 'multiple_choice',
'e^(sin x)', 'cos x · e^(sin x)', 'sin x · e^(sin x)', 'e^(cos x)', 'B',
'Using the chain rule, d/dx[e^(sin x)] = e^(sin x) · cos x.');
-- Q74 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A function f(x,y) has a saddle point when Δ is:', 'multiple_choice',
'Less than zero', 'Greater than zero', 'Equal to zero', 'Undefined', 'B',
'At a saddle point, Δ = fxx·fyy - f²xy > 0.');
-- Q75 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The course MTH281 is titled Mathematical Methods ____.', 'fill_in_blank', 'I',
'MTH281 is Mathematical Methods I, covering foundational topics in advanced calculus.');
-- Q76 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Which of the following is NOT a study unit in MTH281?', 'multiple_choice',
'Limits and Continuity', 'Partial Differentiation', 'Quantum Mechanics', 'Taylor Series', 'C',
'Quantum Mechanics is not covered in MTH281; the course focuses on mathematical methods in calculus.');
-- Q77 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The method of differences is used for:', 'multiple_choice',
'Finding derivatives', 'Summing certain series', 'Integration', 'Finding limits', 'B',
'The method of differences is a technique for summing finite series by telescoping terms.');
-- Q78 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The series Σ[1/(r(r+1))] converges to:', 'multiple_choice',
'0', '1', '2', '∞', 'B',
'Using the method of differences, this series telescopes to sum to 1.');
-- Q79 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A discontinuity where f(x) becomes infinite is called:', 'multiple_choice',
'Finite discontinuity', 'Infinite discontinuity', 'Removable discontinuity', 'Continuous', 'B',
'An infinite discontinuity occurs when the function approaches infinity at a point.');
-- Q80 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'Every polynomial is continuous for ____ values of x.', 'fill_in_blank', 'all',
'Polynomials are continuous functions for all real numbers.');
-- Q81 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The function y = 1/x is discontinuous at:', 'multiple_choice',
'x = 1', 'x = -1', 'x = 0', 'x = ∞', 'C',
'The function 1/x has an infinite discontinuity at x = 0.');
-- Q82 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For the function y = tan^(-1)(1/x), as x→0+, y approaches:', 'multiple_choice',
'-π/2', '0', 'π/2', 'π', 'C',
'As x approaches 0 from the positive side, tan^(-1)(1/x) approaches π/2.');
-- Q83 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The differential of a product uv is:', 'multiple_choice',
'u dv + v du', 'u dv - v du', 'uv du', 'du dv', 'A',
'The differential of a product follows d(uv) = u dv + v du.');
-- Q84 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The derivative of cos x is ____.', 'fill_in_blank', '-sin x',
'The derivative of cos x with respect to x is -sin x.');
-- Q85 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For a rational function p(x)/q(x), discontinuities occur where:', 'multiple_choice',
'p(x) = 0', 'q(x) = 0', 'p(x) = q(x)', 'Both are zero', 'B',
'Rational functions are discontinuous at points where the denominator equals zero.');
-- Q86 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The nth derivative of log_e(x) is:', 'multiple_choice',
'1/x^n', '(-1)^(n-1) (n-1)!/x^n', 'n!/x^n', '(-1)^n n!/x^n', 'B',
'The nth derivative of log_e(x) is (-1)^(n-1)(n-1)!/x^n.');
-- Q87 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'In Leibnitz''s formula for D^n(uv), the coefficient of D^r u · D^(n-r) v is:', 'multiple_choice',
'nCr', 'n!', 'r!', '(n-r)!', 'A',
'Leibnitz''s formula uses binomial coefficients nCr = n!/(r!(n-r)!).');
-- Q88 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'When applying Leibnitz''s formula, if u = x and v = log_e(x), then D^n(uv) involves derivatives up to order ____.', 'fill_in_blank', 'n',
'Leibnitz''s formula for the nth derivative involves derivatives from order 0 to n.');
-- Q89 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'If f''(c) = 0 and f''''(c) > 0, then x = c is a:', 'multiple_choice',
'Maximum', 'Minimum', 'Inflection point', 'Saddle point', 'B',
'When f''(c) = 0 and f''''(c) > 0, the point is a local minimum.');
-- Q90 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The partial derivative ∂f/∂x is found by treating which variable(s) as constant?', 'multiple_choice',
'x', 'y (and others)', 'All variables', 'None', 'B',
'When computing ∂f/∂x, all variables except x are treated as constants.');
-- Q91 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'If u = f(x,y) and x = r cos θ, y = r sin θ, then ∂u/∂r equals:', 'multiple_choice',
'(∂f/∂x)(∂x/∂r) + (∂f/∂y)(∂y/∂r)', '∂f/∂x + ∂f/∂y', 'r(∂f/∂x)', '0', 'A',
'Using the chain rule for partial derivatives: ∂u/∂r = (∂f/∂x)(∂x/∂r) + (∂f/∂y)(∂y/∂r).');
-- Q92 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'In polar coordinates, x² + y² = ____.', 'fill_in_blank', 'r²',
'In polar coordinates, the relation x² + y² = r² holds.');
-- Q93 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Taylor''s theorem with remainder term En states that the error in approximation is of order:', 'multiple_choice',
'h^n', 'h^(n+1)', 'h', 'h^2', 'B',
'The remainder term En in Taylor''s theorem is proportional to h^(n+1).');
-- Q94 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'To expand f(x,y) about (a,b), we use:', 'multiple_choice',
'Maclaurin series', 'Taylor series in two variables', 'Fourier series', 'Binomial series', 'B',
'Taylor''s theorem for functions of two variables expands f(x,y) about point (a,b).');
-- Q95 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The condition for a stationary point of f(x,y) is:', 'multiple_choice',
'f = 0', '∂f/∂x = 0 and ∂f/∂y = 0', 'f > 0', '∂²f/∂x² = 0', 'B',
'Stationary points occur where both first partial derivatives equal zero.');
-- Q96 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Lagrange multipliers introduce an auxiliary parameter λ to handle:', 'multiple_choice',
'Unconstrained optimization', 'Constrained optimization', 'Integration', 'Differentiation', 'B',
'Lagrange multipliers are used for optimization problems with constraints.');
-- Q97 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The series expansion method for integration works best when f(x) can be expressed as a ____ series.', 'fill_in_blank', 'power',
'Series expansion integration is most effective when the integrand can be written as a convergent power series.');
-- Q98 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The series for sinh x is:', 'multiple_choice',
'x - x³/3! + x⁵/5! - ...', 'x + x³/3! + x⁵/5! + ...', '1 + x²/2! + x⁴/4! + ...', '1 - x²/2! + x⁴/4! - ...', 'B',
'The hyperbolic sine series is sinh x = x + x³/3! + x⁵/5! + ...');
-- Q99 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The series for cosh x is:', 'multiple_choice',
'x + x³/3! + x⁵/5! + ...', '1 + x²/2! + x⁴/4! + ...', 'x - x³/3! + x⁵/5! - ...', '1 - x²/2! + x⁴/4! - ...', 'B',
'The hyperbolic cosine series is cosh x = 1 + x²/2! + x⁴/4! + ...');
-- Q100 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'A necessary condition for Σar to converge is:', 'multiple_choice',
'ar increases', 'lim(ar) = 0', 'ar > 0', 'ar = constant', 'B',
'For convergence, it is necessary (but not sufficient) that lim(n→∞) an = 0.');
-- Q101 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'If Σar converges to S, then Σkar converges to ____.', 'fill_in_blank', 'kS',
'Multiplying a convergent series by a constant k multiplies its sum by k.');
-- Q102 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'Adding or removing a finite number of terms from a series:', 'multiple_choice',
'Changes convergence', 'Does not affect convergence', 'Always causes divergence', 'Makes it oscillate', 'B',
'Convergence is not affected by adding or removing a finite number of terms.');
-- Q103 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The sum of two convergent series Σar = S and Σbr = T is:', 'multiple_choice',
'S - T', 'S + T', 'ST', 'S/T', 'B',
'The sum of convergent series is Σ(ar + br) = S + T.');
-- Q104 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For the comparison test, if 0 ≤ ar ≤ br and Σbr diverges, then:', 'multiple_choice',
'Σar converges', 'Σar diverges', 'No conclusion', 'Σar oscillates', 'C',
'When Σbr diverges, we need ar ≥ br to conclude Σar diverges; if ar ≤ br, no conclusion can be drawn.');
-- Q105 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'The ratio comparison test compares ratios of ____ terms.', 'fill_in_blank', 'consecutive',
'The ratio comparison test examines the ratio of consecutive terms ar+1/ar.');
-- Q106 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'If lim|ar+1/ar| = k = 1 in the ratio test, the series:', 'multiple_choice',
'Converges', 'Diverges', 'Test is inconclusive', 'Alternates', 'C',
'When k = 1, the ratio test provides no information about convergence.');
-- Q107 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The integral test for Σar relates convergence to the integral:', 'multiple_choice',
'∫ar dr', '∫f(x)dx where f(r) = ar', '∫(1/ar)dx', 'ar²', 'B',
'The integral test compares Σar to ∫f(x)dx where f is a function with f(r) = ar.');
-- Q108 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For which value of p does the p-series Σ(1/r^p) diverge?', 'multiple_choice',
'p > 1', 'p = 1', 'p < 0', 'p = 2', 'B',
'The p-series diverges when p ≤ 1, including the harmonic series where p = 1.');
-- Q109 - Fill in the blank
INSERT INTO questions (course_id, question_text, question_type, correct_answer, explanation)
VALUES (v_course_id, 'An alternating series has terms that change ____ in sign.', 'fill_in_blank', 'alternately',
'Alternating series have terms that alternate between positive and negative.');
-- Q110 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'The series 1 - 1/2 + 1/3 - 1/4 + ... is:', 'multiple_choice',
'Absolutely convergent', 'Conditionally convergent', 'Divergent', 'Oscillating', 'B',
'This alternating harmonic series is conditionally convergent.');
-- Q111 - Multiple choice
INSERT INTO questions (course_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (v_course_id, 'For conditionally convergent series, rearranging terms can:', 'multiple_choice',
'Not change the sum', 'Change the sum', 'Always cause divergence', 'Make it absolutely convergent', 'B',
'Rearranging terms in conditionally convergent series can alter the sum or cause divergence.');

END $$