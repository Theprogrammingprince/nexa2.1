import { useState, useEffect } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import supabase from '../supabaseClient';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onSkip?: () => void;
}

const EmailVerification = ({ email, onVerified, onSkip }: EmailVerificationProps) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-send verification code on mount
  useEffect(() => {
    handleSendCode();
  }, []);

  const handleSendCode = async () => {
    setSending(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            action: 'send',
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      toast.success('Verification code sent to your email!');
      setCountdown(60); // 60 seconds cooldown
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send code';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  const handleVerifyCode = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            action: 'verify',
            email: email,
            code: verificationCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      toast.success('Email verified successfully! 🎉');
      onVerified();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      toast.error(errorMessage);
      // Clear code on error
      setCode(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all digits are entered
    if (newCode.every(digit => digit !== '') && index === 5) {
      setTimeout(() => {
        handleVerifyCode();
      }, 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);

    // Focus last input
    const lastInput = document.getElementById(`code-5`);
    lastInput?.focus();

    // Auto-verify if complete
    if (pastedData.length === 6) {
      setTimeout(() => {
        handleVerifyCode();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-center mb-8">
            We've sent a 6-digit code to<br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>

          {/* Code Input */}
          <div className="mb-6">
            <div className="flex gap-2 justify-center mb-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    error
                      ? 'border-red-300 bg-red-50'
                      : digit
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-300 bg-white'
                  }`}
                  disabled={loading}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyCode}
            disabled={loading || code.some(digit => !digit)}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Verify Email
              </>
            )}
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleSendCode}
              disabled={sending || countdown > 0}
              className="text-teal-600 hover:text-teal-700 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? (
                'Sending...'
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                'Resend Code'
              )}
            </button>
          </div>

          {/* Skip Option */}
          {onSkip && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onSkip}
                className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Skip for now
              </button>
            </div>
          )}
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Check your spam folder if you don't see the email
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
