import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface PaystackPaymentProps {
  email: string;
  amount: number; // in kobo (₦2,000 = 200000 kobo)
  plan: 'monthly' | 'yearly';
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

// Extend Window interface to include PaystackPop
declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PaystackPayment = ({ email, amount, plan, onSuccess, onClose }: PaystackPaymentProps) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Paystack inline script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!scriptLoaded) {
      toast.error('Payment system is loading. Please try again.');
      return;
    }

    if (!window.PaystackPop) {
      toast.error('Payment system not available. Please refresh the page.');
      return;
    }

    setLoading(true);

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      toast.error('Payment configuration error. Please contact support.');
      setLoading(false);
      return;
    }

    const reference = `NEXA_${plan.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amount, // Amount in kobo
      currency: 'NGN',
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: 'Subscription Plan',
            variable_name: 'plan',
            value: plan === 'monthly' ? 'Pro Monthly' : 'Pro Yearly'
          },
          {
            display_name: 'Plan Type',
            variable_name: 'plan_type',
            value: plan
          }
        ]
      },
      callback: function(response: any) {
        setLoading(false);
        console.log('Payment successful:', response);
        toast.success('Payment successful! Activating subscription...');
        onSuccess(response.reference);
      },
      onClose: function() {
        setLoading(false);
        console.log('Payment closed');
        toast.error('Payment cancelled');
        onClose();
      }
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>Processing...</span>
        </>
      ) : !scriptLoaded ? (
        <span>Loading...</span>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Pay ₦{(amount / 100).toLocaleString()}</span>
        </>
      )}
    </button>
  );
};

export default PaystackPayment;
