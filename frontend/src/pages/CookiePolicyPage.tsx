import { Cookie, Settings, BarChart, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicyPage = () => {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly',
      examples: [
        'Authentication and security',
        'Session management',
        'Load balancing',
        'Security features'
      ],
      required: true,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: BarChart,
      title: 'Analytics Cookies',
      description: 'Help us understand how you use our platform',
      examples: [
        'Page views and navigation',
        'Time spent on pages',
        'User behavior patterns',
        'Performance metrics'
      ],
      required: false,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Remember your preferences and settings',
      examples: [
        'Language preferences',
        'Theme settings (dark/light mode)',
        'Dashboard customization',
        'Notification preferences'
      ],
      required: false,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const sections = [
    {
      title: 'What Are Cookies?',
      content: 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and understanding how you use our platform.'
    },
    {
      title: 'Why We Use Cookies',
      content: 'We use cookies to enhance your learning experience, maintain security, analyze platform usage, remember your preferences, and provide personalized content and recommendations based on your study patterns.'
    },
    {
      title: 'Managing Cookies',
      content: 'You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our platform. Essential cookies cannot be disabled as they are necessary for the platform to work.'
    },
    {
      title: 'Third-Party Cookies',
      content: 'We may use third-party services like Google Analytics, payment processors, and social media plugins that set their own cookies. These third parties have their own privacy policies governing their use of cookies.'
    }
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
              <Cookie size={20} />
              <span className="font-semibold">Cookie Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Cookie Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about how we use cookies to improve your experience on NEXA and how you can manage your cookie preferences.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cookieTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 animate-fade-in hover:shadow-2xl transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Examples:</p>
                    <ul className="space-y-1">
                      {type.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle size={16} className="text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    type.required 
                      ? 'bg-teal-100 text-teal-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {type.required ? 'Always Active' : 'Optional'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Information Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browser Settings Guide */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How to Manage Cookies in Your Browser
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Google Chrome', steps: 'Settings → Privacy and security → Cookies and other site data' },
                { name: 'Mozilla Firefox', steps: 'Options → Privacy & Security → Cookies and Site Data' },
                { name: 'Safari', steps: 'Preferences → Privacy → Manage Website Data' },
                { name: 'Microsoft Edge', steps: 'Settings → Cookies and site permissions → Cookies and site data' }
              ].map((browser, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{browser.name}</h3>
                  <p className="text-sm text-gray-600">{browser.steps}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-start gap-4">
              <Cookie size={32} className="flex-shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Questions About Cookies?</h2>
                <p className="text-teal-50 mb-6 text-lg">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/privacy"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    View Privacy Policy
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

export default CookiePolicyPage;
