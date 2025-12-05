import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, including your name, email address, student ID, phone number, and educational institution details when you create an account.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about your interaction with our platform, including test scores, study patterns, time spent on courses, and device information.'
        },
        {
          subtitle: 'Academic Performance',
          text: 'We track your CBT practice results, course progress, and performance analytics to provide personalized recommendations and improve your learning experience.'
        }
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your information to provide, maintain, and improve our CBT platform, including personalizing your learning experience and tracking your academic progress.'
        },
        {
          subtitle: 'Communication',
          text: 'We may send you service-related announcements, educational content, exam reminders, and updates about new features or courses.'
        },
        {
          subtitle: 'Analytics & Improvement',
          text: 'We analyze usage patterns to understand how students interact with our platform and continuously improve our services and educational content.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols to ensure your information remains secure.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls and authentication measures to ensure only authorized personnel can access your personal information.'
        },
        {
          subtitle: 'Regular Audits',
          text: 'Our security practices are regularly audited and updated to protect against unauthorized access, disclosure, or destruction of your data.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: [
        {
          subtitle: 'Educational Institutions',
          text: 'With your consent, we may share your academic performance data with your educational institution for official record-keeping and progress monitoring.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We work with trusted third-party service providers who assist us in operating our platform, conducting our business, or servicing you.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law or in response to valid requests by public authorities.'
        }
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        {
          subtitle: 'Access & Correction',
          text: 'You have the right to access, update, or correct your personal information at any time through your account settings.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You can request deletion of your account and associated data. Some information may be retained for legal or legitimate business purposes.'
        },
        {
          subtitle: 'Opt-Out',
          text: 'You can opt-out of marketing communications at any time while still receiving essential service-related messages.'
        }
      ]
    },
    {
      icon: FileText,
      title: 'Cookies & Tracking',
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'We use essential cookies to enable core functionality like authentication, session management, and security features.'
        },
        {
          subtitle: 'Analytics Cookies',
          text: 'We use analytics cookies to understand how you use our platform and improve your experience. You can manage cookie preferences in your browser.'
        },
        {
          subtitle: 'Third-Party Cookies',
          text: 'Some features may use third-party cookies for payment processing, analytics, or social media integration.'
        }
      ]
    }
  ];

  const highlights = [
    { icon: CheckCircle, text: 'Your data is encrypted and secure' },
    { icon: CheckCircle, text: 'You control your personal information' },
    { icon: CheckCircle, text: 'We never sell your data to third parties' },
    { icon: CheckCircle, text: 'Transparent data practices' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full mb-6">
              <Shield size={20} />
              <span className="font-semibold">Privacy & Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <highlight.icon className="text-teal-600 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                </div>

                <div className="space-y-6 ml-0 md:ml-16">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.subtitle}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle size={32} className="flex-shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
                <p className="text-teal-50 mb-6 text-lg">
                  If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
                </p>
                <div className="space-y-2 text-teal-50">
                  <p><strong>Email:</strong> privacy@nexa.com</p>
                  <p><strong>Phone:</strong> +234 800 123 4567</p>
                  <p><strong>Address:</strong> NEXA Education, Lagos, Nigeria</p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/terms"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    View Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
