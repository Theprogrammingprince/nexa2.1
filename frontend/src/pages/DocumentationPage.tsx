import { useState } from 'react';
import { Book, Search, PlayCircle, FileText, HelpCircle, Settings, Users, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DocumentationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: PlayCircle },
    { id: 'cbt-practice', name: 'CBT Practice', icon: FileText },
    { id: 'summaries', name: 'Course Summaries', icon: Book },
    { id: 'account', name: 'Account Management', icon: Users },
    { id: 'performance', name: 'Performance Tracking', icon: BarChart },
    { id: 'settings', name: 'Settings & Preferences', icon: Settings },
    { id: 'faq', name: 'FAQ', icon: HelpCircle }
  ];

  const documentation = {
    'getting-started': [
      {
        title: 'Welcome to NEXA',
        content: 'NEXA is your comprehensive computer-based training platform designed specifically for NOUN students. Our platform provides practice tests, course summaries, and performance analytics to help you excel in your examinations.',
        steps: [
          'Create your account with a valid email address',
          'Complete your profile with student information',
          'Choose a subscription plan that fits your needs',
          'Start practicing with CBT tests and accessing course summaries'
        ]
      },
      {
        title: 'Creating Your Account',
        content: 'Follow these simple steps to get started with NEXA:',
        steps: [
          'Click on "Get Started" or "Sign Up" button',
          'Enter your email, password, and student details',
          'Verify your email address through the confirmation link',
          'Complete your profile setup',
          'Choose your subscription plan'
        ]
      },
      {
        title: 'Navigating the Dashboard',
        content: 'Your dashboard is your central hub for all NEXA features:',
        steps: [
          'View your recent test scores and progress',
          'Access quick links to CBT practice and summaries',
          'Check upcoming study schedules',
          'Monitor your performance analytics',
          'Receive personalized recommendations'
        ]
      }
    ],
    'cbt-practice': [
      {
        title: 'Taking a Practice Test',
        content: 'Our CBT practice module simulates the actual NOUN exam environment:',
        steps: [
          'Navigate to CBT Practice from the main menu',
          'Select your course from the available options',
          'Choose the number of questions (5-50)',
          'Set your preferred time limit',
          'Read and accept the test instructions',
          'Click "Start Test" to begin',
          'Navigate between questions using the question navigator',
          'Submit your test when complete or when time expires'
        ]
      },
      {
        title: 'Understanding Test Results',
        content: 'After completing a test, you\'ll receive detailed feedback:',
        steps: [
          'View your overall score and percentage',
          'See correct and incorrect answers',
          'Read explanations for each question',
          'Identify your weak areas',
          'Track your improvement over time',
          'Download or share your results'
        ]
      },
      {
        title: 'Test Features',
        content: 'Make the most of our CBT practice features:',
        steps: [
          'Timer: Track your time remaining',
          'Question Navigator: Jump to any question',
          'Flag Questions: Mark questions for review',
          'Review Mode: Check answers before submitting',
          'Pause & Resume: Save progress and continue later'
        ]
      }
    ],
    'summaries': [
      {
        title: 'Accessing Course Summaries',
        content: 'Course summaries provide concise, exam-focused content:',
        steps: [
          'Go to Summaries from the main menu',
          'Browse or search for your course',
          'Click on a summary to view full content',
          'Use the table of contents for easy navigation',
          'Bookmark important sections',
          'Download summaries as PDF (Pro plan)'
        ]
      },
      {
        title: 'Using Summaries Effectively',
        content: 'Maximize your learning with these tips:',
        steps: [
          'Read summaries before attempting practice tests',
          'Take notes on key concepts',
          'Use summaries for quick revision',
          'Combine summaries with practice tests',
          'Review summaries regularly'
        ]
      }
    ],
    'account': [
      {
        title: 'Managing Your Profile',
        content: 'Keep your account information up to date:',
        steps: [
          'Go to Settings → Profile',
          'Update your personal information',
          'Change your profile picture',
          'Update your student ID and institution',
          'Set your notification preferences',
          'Save changes'
        ]
      },
      {
        title: 'Subscription Management',
        content: 'Manage your subscription and billing:',
        steps: [
          'Navigate to Billing section',
          'View your current plan and features',
          'Upgrade or downgrade your plan',
          'Update payment methods',
          'View billing history',
          'Cancel subscription (if needed)'
        ]
      }
    ],
    'performance': [
      {
        title: 'Understanding Analytics',
        content: 'Track your progress with detailed analytics:',
        steps: [
          'View overall performance metrics',
          'See course-wise breakdown',
          'Track improvement trends',
          'Identify weak areas',
          'Compare with previous attempts',
          'Set performance goals'
        ]
      },
      {
        title: 'Study Recommendations',
        content: 'Get personalized study suggestions:',
        steps: [
          'Based on your test results',
          'Focused on weak areas',
          'Recommended study schedules',
          'Suggested practice frequency',
          'Course priorities'
        ]
      }
    ],
    'settings': [
      {
        title: 'Customizing Your Experience',
        content: 'Personalize NEXA to suit your preferences:',
        steps: [
          'Choose between light and dark themes',
          'Set notification preferences',
          'Configure email alerts',
          'Customize dashboard layout',
          'Set default test parameters',
          'Manage privacy settings'
        ]
      }
    ],
    'faq': [
      {
        title: 'Frequently Asked Questions',
        content: 'Common questions and answers:',
        steps: [
          'Q: How many practice tests can I take? A: Unlimited with Pro plan, 3 per week with Free plan',
          'Q: Can I download summaries? A: Yes, with Pro and Institution plans',
          'Q: How accurate are the practice questions? A: Our questions are based on actual NOUN exam patterns',
          'Q: Can I use NEXA offline? A: Yes, with Pro plan you can download content for offline use',
          'Q: How do I reset my password? A: Click "Forgot Password" on the login page'
        ]
      }
    ]
  };

  const quickLinks = [
    { title: 'Getting Started Guide', icon: PlayCircle, link: '#getting-started' },
    { title: 'CBT Practice Tutorial', icon: FileText, link: '#cbt-practice' },
    { title: 'Video Tutorials', icon: PlayCircle, link: '#videos' },
    { title: 'Contact Support', icon: HelpCircle, link: '/help' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full mb-6">
              <Book size={20} />
              <span className="font-semibold">Help & Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Documentation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to know about using NEXA effectively
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-gray-900 bg-white shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  to={link.link}
                  className="group bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {link.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                <nav className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeCategory === category.id
                            ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              {documentation[activeCategory as keyof typeof documentation]?.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {doc.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {doc.content}
                  </p>
                  <div className="space-y-3">
                    {doc.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700 flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl text-center">
            <HelpCircle size={48} className="mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-teal-50 mb-8 text-lg max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/help"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/#faq"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentationPage;
