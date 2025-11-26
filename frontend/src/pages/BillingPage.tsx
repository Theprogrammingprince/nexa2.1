import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { billingAPI } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { CreditCard, Check, X, Crown, Zap } from 'lucide-react';
import { dataCache, CACHE_KEYS, CACHE_EXPIRY } from '../services/dataCache';
import LoadingStatus from '../components/LoadingStatus';
import PaystackPayment from '../components/PaystackPayment';
import supabase from '../supabaseClient';

interface Subscription {
  tier: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface BillingHistoryItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  invoice_url?: string;
}

const BillingPage = () => {
  const { isDarkMode } = useTheme();
  const { user, profile } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetchSubscriptionData();
  }, [user]);

  const fetchSubscriptionData = async () => {
    if (!user) return;

    try {
      // Use cache for faster loading
      const data = await dataCache.get(
        CACHE_KEYS.SUBSCRIPTION(user.id),
        () => billingAPI.getSubscription(),
        CACHE_EXPIRY.MEDIUM
      );
      setSubscription(data.subscription);
      setBillingHistory(data.billingHistory || []);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planType: 'monthly' | 'yearly' = 'monthly') => {
    if (!user?.email) {
      toast.error('Please log in to subscribe');
      return;
    }
    
    setSelectedPlan(planType);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (reference: string) => {
    setProcessing(true);
    try {
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Authentication required');
        return;
      }

      // Verify payment on backend
      const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
      const response = await fetch(`${FUNCTIONS_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ 
          reference,
          plan_type: selectedPlan
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Subscription activated successfully!');
        setShowPaymentModal(false);
        // Refresh subscription data
        await fetchSubscriptionData();
        // Reload page to update profile
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(data.error || 'Failed to verify payment');
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      toast.error(error.message || 'Failed to verify payment');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
      return;
    }

    setProcessing(true);
    try {
      await billingAPI.manageSubscription('cancel');
      toast.success('Subscription cancelled. You will retain access until the end of your billing period.');
      fetchSubscriptionData();
    } catch (error) {
      toast.error('Failed to cancel subscription');
    } finally {
      setProcessing(false);
    }
  };

  const handleResumeSubscription = async () => {
    setProcessing(true);
    try {
      await billingAPI.manageSubscription('resume');
      toast.success('Subscription resumed successfully!');
      fetchSubscriptionData();
    } catch (error) {
      toast.error('Failed to resume subscription');
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdatePayment = async () => {
    setProcessing(true);
    try {
      const { url } = await billingAPI.manageSubscription('update_payment');
      window.location.href = url;
    } catch (error) {
      toast.error('Failed to open payment portal');
      setProcessing(false);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '₦0',
      period: 'forever',
      features: [
        { text: 'Access to basic summaries', included: true },
        { text: 'Limited CBT practice (5 tests/month)', included: true },
        { text: 'Basic note-taking', included: true },
        { text: 'Community support', included: true },
        { text: 'Premium summaries', included: false },
        { text: 'Unlimited CBT practice', included: false },
        { text: 'Advanced note features', included: false },
        { text: 'Priority support', included: false },
      ],
      current: profile?.subscription_tier === 'free',
    },
    {
      name: 'Pro',
      price: '₦2,000',
      period: 'per month',
      features: [
        { text: 'All basic summaries', included: true },
        { text: 'Premium course summaries', included: true },
        { text: 'Unlimited CBT practice', included: true },
        { text: 'Advanced note-taking with highlights', included: true },
        { text: 'Offline access', included: true },
        { text: 'Progress analytics', included: true },
        { text: 'Priority support', included: true },
        { text: 'Early access to new features', included: true },
      ],
      current: profile?.subscription_tier === 'pro',
      popular: true,
    },
  ];

  if (loading) {
    return (
      <DashboardLayout currentPage="/billing">
        <LoadingStatus isLoading={true} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="/billing">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Billing & Subscription
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Manage your subscription and billing information
          </p>
        </div>

        {/* Current Subscription Status */}
        {subscription && (
          <div className={`rounded-xl p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {subscription.tier === 'pro' ? 'Pro Plan' : 'Free Plan'}
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {subscription.status === 'active' ? 'Active' : subscription.status}
                  </p>
                </div>
              </div>
              {subscription.tier === 'pro' && (
                <div className="text-right">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {subscription.cancel_at_period_end ? 'Expires on' : 'Renews on'}
                  </p>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {subscription.tier === 'pro' && (
              <div className="flex gap-3 mt-4">
                {subscription.cancel_at_period_end ? (
                  <button
                    onClick={handleResumeSubscription}
                    disabled={processing}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {processing ? 'Processing...' : 'Resume Subscription'}
                  </button>
                ) : (
                  <button
                    onClick={handleCancelSubscription}
                    disabled={processing}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {processing ? 'Processing...' : 'Cancel Subscription'}
                  </button>
                )}
                <button
                  onClick={handleUpdatePayment}
                  disabled={processing}
                  className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Update Payment Method
                </button>
              </div>
            )}
          </div>
        )}

        {/* Plans */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-6 border-2 transition-all ${
                  plan.current
                    ? isDarkMode
                      ? 'border-primary-500 bg-primary-900/20'
                      : 'border-primary-500 bg-primary-50'
                    : isDarkMode
                    ? 'border-gray-700 bg-gray-800 hover:border-primary-500'
                    : 'border-gray-200 bg-white hover:border-primary-300'
                } ${
                  plan.popular ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-primary-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? isDarkMode
                              ? 'text-gray-300'
                              : 'text-gray-700'
                            : isDarkMode
                            ? 'text-gray-500 line-through'
                            : 'text-gray-400 line-through'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : plan.name === 'Pro' ? (
                  <button
                    onClick={() => handleUpgrade('monthly')}
                    disabled={processing}
                    className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {processing ? 'Processing...' : 'Upgrade to Pro'}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        {billingHistory.length > 0 && (
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Billing History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Date
                    </th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Amount
                    </th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Status
                    </th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.currency.toUpperCase()} {item.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : item.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {item.invoice_url ? (
                          <a
                            href={item.invoice_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                          >
                            <CreditCard className="w-4 h-4" />
                            View
                          </a>
                        ) : (
                          <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && user?.email && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl w-full max-w-md p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Complete Payment
                </h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                >
                  <X size={24} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>

              <div className="mb-6">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Plan:
                    </span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Pro {selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Amount:
                    </span>
                    <span className={"text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-primary-600"}>
                      ₦{selectedPlan === 'monthly' ? '2,000' : '20,000'}
                    </span>
                  </div>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  You will be redirected to Paystack to complete your payment securely.
                </p>
              </div>

              <PaystackPayment
                email={user.email}
                amount={selectedPlan === 'monthly' ? 200000 : 2000000}
                plan={selectedPlan}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
              />

              <p className={`text-xs text-center mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Secured by Paystack
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
