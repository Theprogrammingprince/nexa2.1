import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import supabase from '../supabaseClient';
import EmailVerification from '../components/EmailVerification';

const AuthPage = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }
        if (!formData.fullName.trim()) {
          toast.error('Full name is required');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        await signUp(formData.email, formData.password, formData.fullName);
        toast.success('Account created successfully!');
        // Show email verification
        setUserEmail(formData.email);
        setShowVerification(true);
      }
    } catch (err: any) {
      // Check if this is an email verification error
      if (err.message === 'EMAIL_NOT_VERIFIED' && err.needsVerification) {
        toast.error('Please verify your email to continue');
        // Redirect to verification page with the email
        setUserEmail(err.email || formData.email);
        setShowVerification(true);
      } else {
        toast.error(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign in with Google');
    }
  };

  const handleVerified = () => {
    toast.success('Email verified! Welcome to NEXA! 🎉');
    navigate('/dashboard');
  };

  const handleSkipVerification = () => {
    toast.success('You can verify your email later in settings');
    navigate('/dashboard');
  };

  // Show verification screen if needed
  if (showVerification) {
    return (
      <EmailVerification
        email={userEmail}
        onVerified={handleVerified}
        onSkip={handleSkipVerification}
      />
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen grid md:grid-cols-2">
        {/* Left Side - Auth Form */}
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white relative">
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Back to Home</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="NEXA Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              {isLogin ? 'Sign in to access your practice tests' : 'Join NEXA and start acing your NOUN exams'}
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            )}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
                minLength={isLogin ? undefined : 6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary-600 hover:bg-primary-700 text-black rounded-lg transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign {isLogin ? 'in' : 'up'} with Google</span>
          </button>

          {/* Footer Links */}
          {isLogin && (
            <div className="mt-4 sm:mt-6 text-center">
              <Link to="/forgot-password" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Forgot your password?
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden md:block relative bg-gradient-to-br from-gray-100 to-gray-200 min-h-[400px] md:min-h-screen">
        <div className="absolute inset-0">
          <img
            src="/img (3).jpg"
            alt="Online learning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10"></div>
        </div>
        
        {/* Overlay Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-center drop-shadow-lg">
            NOUN Exam Experience Assistant
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-center drop-shadow-md">
            NEXA - Practice, Track, Excel
          </p>
          
          {/* Decorative Element */}
          <div className="mt-8 md:mt-12 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
              <p className="text-xs sm:text-sm md:text-base">Computer-Based Training Platform</p>
              <p className="text-xs mt-1 md:mt-2 opacity-80">Success is your Nickname 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthPage;
