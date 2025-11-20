import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import supabase from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

type Step = 'email' | 'verify' | 'reset';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [codeRequested, setCodeRequested] = useState(false);

  // Timer for code expiry
  useEffect(() => {
    if (step !== 'verify' || !codeRequested) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCodeRequested(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, codeRequested]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if email exists in database
      const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (userError || !user) {
        toast.error('Email not found. Please check and try again.');
        setLoading(false);
        return;
      }

      // In a real implementation, you'd send an email with a code
      // For now, we'll generate a code and store it (you'd use a backend service)
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Store code in localStorage temporarily (in production, use a backend with expiry)
      localStorage.setItem('resetCode', JSON.stringify({
        code,
        email,
        timestamp: Date.now(),
        expiry: Date.now() + 5 * 60 * 1000 // 5 minutes
      }));

      // Simulate sending email
      console.log('Reset code:', code); // In development, check console
      
      toast.success(`Reset code sent to ${email}`);
      toast.loading('Check your email for the verification code');
      
      setStep('verify');
      setCodeRequested(true);
      setTimeLeft(300);
    } catch (err: any) {
      toast.error('Failed to send reset code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedData = localStorage.getItem('resetCode');
      if (!storedData) {
        toast.error('Reset code expired. Please request a new one.');
        setStep('email');
        setLoading(false);
        return;
      }

      const { code, email: storedEmail, expiry } = JSON.parse(storedData);

      if (Date.now() > expiry) {
        toast.error('Reset code expired. Please request a new one.');
        localStorage.removeItem('resetCode');
        setStep('email');
        setLoading(false);
        return;
      }

      if (verificationCode.toUpperCase() !== code || email !== storedEmail) {
        toast.error('Invalid verification code. Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Code verified! Now set your new password.');
      setStep('reset');
    } catch (err: any) {
      toast.error('Verification failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        setLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        // If not authenticated, use resetPasswordForEmail
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
        if (resetError) throw resetError;
      }

      // Clear stored code
      localStorage.removeItem('resetCode');

      toast.success('Password reset successfully!');
      navigate('/auth');
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem('resetCode', JSON.stringify({
        code,
        email,
        timestamp: Date.now(),
        expiry: Date.now() + 5 * 60 * 1000,
      }));

      console.log('New reset code:', code);
      toast.success('New code sent to your email');
      setCodeRequested(true);
      setTimeLeft(300);
      setVerificationCode('');
    } catch (err: any) {
      toast.error('Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {/* Back Button */}
        <Link
          to="/auth"
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#101829] transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </Link>

        {/* Main Card */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#101829]/10 rounded-full mb-4">
                {step === 'email' && <Mail className="w-8 h-8 text-[#101829]" />}
                {step === 'verify' && <CheckCircle2 className="w-8 h-8 text-[#101829]" />}
                {step === 'reset' && <Lock className="w-8 h-8 text-[#101829]" />}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {step === 'email' && 'Reset Password'}
                {step === 'verify' && 'Verify Code'}
                {step === 'reset' && 'Create New Password'}
              </h1>
              <p className="text-gray-600 text-sm">
                {step === 'email' && "Enter your email address and we'll send you a reset code"}
                {step === 'verify' && 'Enter the 6-digit code sent to your email'}
                {step === 'reset' && 'Create a strong password for your account'}
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex gap-2 mb-8">
              {['email', 'verify', 'reset'].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    (['email', 'verify', 'reset'].indexOf(s) < ['email', 'verify', 'reset'].indexOf(step)) ||
                    s === step
                      ? 'bg-[#101829]'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Email */}
            {step === 'email' && (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101829]/20 focus:border-[#101829] transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#101829] text-white py-3 rounded-lg font-medium hover:bg-[#0a0f1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </form>
            )}

            {/* Step 2: Verify Code */}
            {step === 'verify' && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-bold letter-spacing tracking-widest focus:outline-none focus:ring-2 focus:ring-[#101829]/20 focus:border-[#101829] transition-all"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Code expires in: <span className="font-semibold text-[#101829]">{formatTime(timeLeft)}</span>
                  </p>
                </div>

                {codeRequested && timeLeft > 0 ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#101829] text-white py-3 rounded-lg font-medium hover:bg-[#0a0f1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Resend Code'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setVerificationCode('');
                    setEmail('');
                    setCodeRequested(false);
                  }}
                  className="w-full text-[#101829] font-medium hover:text-[#0a0f1a] transition-colors py-2"
                >
                  Back to Email
                </button>
              </form>
            )}

            {/* Step 3: Reset Password */}
            {step === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101829]/20 focus:border-[#101829] transition-all"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#101829]/20 focus:border-[#101829] transition-all"
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
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#101829] text-white py-3 rounded-lg font-medium hover:bg-[#0a0f1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/auth" className="text-[#101829] font-medium hover:text-[#0a0f1a] transition-colors">
                Sign in here
              </Link>
            </div>
          </div>

          {/* Development Note */}
          {step === 'verify' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Development Mode:</strong> Check your browser console for the verification code.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
