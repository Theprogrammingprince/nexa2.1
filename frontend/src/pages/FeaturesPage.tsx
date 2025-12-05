import { BookOpen, Award, TrendingUp, Clock, Download, Shield, Users, BarChart, Calendar, Bell, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: BookOpen,
      title: 'CBT Practice Tests',
      description: 'Take unlimited practice tests in a real exam environment with questions based on actual NOUN exam patterns.',
      benefits: [
        'Unlimited practice tests (Pro plan)',
        'Real exam simulation',
        'Timed test mode',
        'Question navigator',
        'Instant results and feedback'
      ],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Course Summaries',
      description: 'Access comprehensive, exam-focused summaries for all your courses, created by subject matter experts.',
      benefits: [
        'Concise, exam-focused content',
        'Easy navigation with table of contents',
        'Bookmark important sections',
        'Download as PDF (Pro plan)',
        'Regular updates'
      ],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: BarChart,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and insights into your strengths and weak areas.',
      benefits: [
        'Detailed performance metrics',
        'Course-wise breakdown',
        'Improvement trends',
        'Weak area identification',
        'Personalized recommendations'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Study Schedule',
      description: 'Create and manage your study schedule with smart reminders and progress tracking.',
      benefits: [
        'Custom study schedules',
        'Smart reminders',
        'Progress tracking',
        'Goal setting',
        'Calendar integration'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Download,
      title: 'Offline Access',
      description: 'Download content for offline study. Learn anytime, anywhere without internet connection.',
      benefits: [
        'Download summaries',
        'Offline practice tests',
        'Sync when online',
        'No data usage',
        'Study on the go'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Get personalized study recommendations based on your performance and learning patterns.',
      benefits: [
        'AI-powered recommendations',
        'Adaptive learning paths',
        'Focus on weak areas',
        'Optimized study plans',
        'Progress-based suggestions'
      ],
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const additionalFeatures = [
    { icon: Clock, title: 'Smart Timer', description: 'Practice with timed tests to build exam speed' },
    { icon: Bell, title: 'Notifications', description: 'Get reminders for study sessions and new content' },
    { icon: Shield, title: 'Secure Platform', description: 'Your data is encrypted and protected' },
    { icon: Users, title: 'Community', description: 'Connect with fellow students and share tips' },
    { icon: TrendingUp, title: 'Progress Reports', description: 'Detailed reports on your improvement' },
    { icon: Zap, title: 'Fast Performance', description: 'Lightning-fast platform with instant loading' }
  ];

  const comparisonTable = [
    { feature: 'Practice Tests', free: '3 per week', pro: 'Unlimited' },
    { feature: 'Course Summaries', free: '5 per month', pro: 'Unlimited' },
    { feature: 'Performance Analytics', free: 'Basic', pro: 'Advanced' },
    { feature: 'Download Summaries', free: false, pro: true },
    { feature: 'Offline Mode', free: false, pro: true },
    { feature: 'Priority Support', free: false, pro: true },
    { feature: 'Ad-free Experience', free: false, pro: true },
    { feature: 'Custom Study Schedules', free: false, pro: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full mb-6">
              <Zap size={20} />
              <span className="font-semibold">Platform Features</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to Excel
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the powerful features that make NEXA the best platform for NOUN exam preparation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            And Much More...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Compare Plans & Features
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">Free</th>
                    <th className="px-6 py-4 text-center font-semibold">Pro (₦2,000/mo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {typeof row.free === 'boolean' ? (
                          row.free ? '✓' : '✗'
                        ) : (
                          row.free
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? '✓' : '✗'
                        ) : (
                          row.pro
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View Full Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl text-center">
            <Award size={48} className="mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-teal-50 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of students who are already using NEXA to excel in their NOUN examinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
