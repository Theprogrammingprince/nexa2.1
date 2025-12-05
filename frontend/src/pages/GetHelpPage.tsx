import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { supportAPI } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import toast, { Toaster } from 'react-hot-toast';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  Mail,
  MessageSquare,
  BookOpen,
  Video,
} from 'lucide-react';

const GetHelpPage = () => {
  const { isDarkMode } = useTheme();
  const { user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    subject: '',
    message: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
  });
  const [sending, setSending] = useState(false);

  const faqs = [
    {
      question: 'How do I access premium summaries?',
      answer:
        'To access premium summaries, you need to upgrade to the Pro plan. Go to the Billing page and click "Upgrade to Pro". Premium summaries offer more detailed content and exclusive materials.',
    },
    {
      question: 'How many CBT tests can I take on the free plan?',
      answer:
        'Free plan users can take up to 5 CBT tests per month. Pro users have unlimited access to all CBT practice tests.',
    },
    {
      question: 'Can I download summaries for offline reading?',
      answer:
        'Offline access is available for Pro users only. Once you upgrade, you can download summaries and access them without an internet connection.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        'Click on "Forgot Password" on the login page. Enter your email address, and we\'ll send you a reset code. Use the code to create a new password.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit and debit cards through our secure Stripe payment gateway. Your payment information is encrypted and secure.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes! You can cancel your Pro subscription at any time from the Billing page. You\'ll retain access until the end of your billing period.',
    },
    {
      question: 'How do I use the note-taking feature?',
      answer:
        'Open any summary and click on the "My Notes" tab. You can create notes with rich text formatting, highlights, and colors. Pro users get advanced note features.',
    },
    {
      question: 'Are my notes saved automatically?',
      answer:
        'Yes, all your notes are automatically saved to your account and synced across all your devices.',
    },
  ];

  const helpCategories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using NEXA',
      color: 'blue',
    },
    {
      icon: MessageSquare,
      title: 'Account & Billing',
      description: 'Manage your account and subscription',
      color: 'green',
    },
    {
      icon: Video,
      title: 'Features Guide',
      description: 'Explore all NEXA features',
      color: 'purple',
    },
    {
      icon: HelpCircle,
      title: 'Troubleshooting',
      description: 'Fix common issues',
      color: 'orange',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSending(true);
    try {
      await supportAPI.sendMessage(formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        ...formData,
        subject: '',
        message: '',
        priority: 'normal',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout currentPage="/help">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Get Help
            </h1>
          </div>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {helpCategories.map((category, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
              } border-2 ${
                isDarkMode ? 'border-gray-700 hover:border-primary-500' : 'border-gray-200 hover:border-primary-300'
              } transition-all cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-lg bg-${category.color}-100 dark:bg-${category.color}-900/20 flex items-center justify-center mb-4`}>
                <category.icon className={`w-6 h-6 text-${category.color}-600`} />
              </div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {category.title}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>

          {/* Search */}
          <div className="relative mb-6">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                } overflow-hidden`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className={`w-full p-4 flex items-center justify-between ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  <span className={`font-medium text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className={`p-4 pt-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                No FAQs found matching your search
              </p>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center gap-3 mb-6">
            <Mail className={`w-6 h-6 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Support
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="What do you need help with?"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                rows={5}
                placeholder="Describe your issue or question in detail..."
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GetHelpPage;
