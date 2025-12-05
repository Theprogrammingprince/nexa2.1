import { Map, Home, BookOpen, Award, Users, HelpCircle, DollarSign, MessageSquare, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SitemapPage = () => {
  const sitemapSections = [
    {
      icon: Home,
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/', description: 'Landing page and platform overview' },
        { name: 'Features', path: '/features', description: 'Explore all platform features' },
        { name: 'Pricing', path: '/pricing', description: 'View subscription plans' },
        { name: 'About Us', path: '/#about', description: 'Learn about NEXA' },
        { name: 'Contact', path: '/#contact', description: 'Get in touch with us' }
      ]
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      links: [
        { name: 'CBT Practice', path: '/cbt', description: 'Computer-based test practice' },
        { name: 'Course Summaries', path: '/summaries', description: 'Access course summaries' },
        { name: 'Study Schedule', path: '/schedule', description: 'Manage your study schedule' },
        { name: 'Documentation', path: '/docs', description: 'Platform documentation and guides' },
        { name: 'Blog', path: '/blog', description: 'Educational articles and tips' }
      ]
    },
    {
      icon: Users,
      title: 'Account & Dashboard',
      links: [
        { name: 'Sign In', path: '/auth', description: 'Access your account' },
        { name: 'Dashboard', path: '/dashboard', description: 'Your personal dashboard' },
        { name: 'Settings', path: '/settings', description: 'Account settings and preferences' },
        { name: 'Billing', path: '/billing', description: 'Manage subscriptions and payments' },
        { name: 'Profile', path: '/settings', description: 'Update your profile information' }
      ]
    },
    {
      icon: Award,
      title: 'Performance & Analytics',
      links: [
        { name: 'Test Results', path: '/cbt/results', description: 'View your test results' },
        { name: 'Progress Tracking', path: '/dashboard', description: 'Track your learning progress' },
        { name: 'Performance Analytics', path: '/dashboard', description: 'Detailed performance insights' }
      ]
    },
    {
      icon: HelpCircle,
      title: 'Support & Help',
      links: [
        { name: 'Help Center', path: '/help', description: 'Get help and support' },
        { name: 'FAQ', path: '/#faq', description: 'Frequently asked questions' },
        { name: 'Contact Support', path: '/#contact', description: 'Reach our support team' }
      ]
    },
    {
      icon: Shield,
      title: 'Legal & Policies',
      links: [
        { name: 'Privacy Policy', path: '/privacy', description: 'How we protect your data' },
        { name: 'Terms of Service', path: '/terms', description: 'Terms and conditions' },
        { name: 'Cookie Policy', path: '/cookie-policy', description: 'Our cookie usage policy' },
        { name: 'Sitemap', path: '/sitemap', description: 'This page - site navigation' }
      ]
    }
  ];

  const quickLinks = [
    { name: 'Get Started', path: '/auth', icon: Award },
    { name: 'View Pricing', path: '/pricing', icon: DollarSign },
    { name: 'Contact Us', path: '/#contact', icon: MessageSquare },
    { name: 'Help Center', path: '/help', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full mb-6">
              <Map size={20} />
              <span className="font-semibold">Site Navigation</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Sitemap
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore all pages and features available on the NEXA platform. Find exactly what you're looking for.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className="group bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {link.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Icon className="text-white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  </div>

                  <div className="space-y-3">
                    {section.links.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.path}
                        className="group block p-3 rounded-lg hover:bg-teal-50 transition-all duration-200"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                              {link.name}
                            </h3>
                            <p className="text-sm text-gray-600">{link.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl text-center">
            <Map size={48} className="mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-teal-50 mb-8 text-lg max-w-2xl mx-auto">
              Our support team is here to help. Contact us and we'll guide you to the right place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                <MessageSquare size={20} className="mr-2" />
                Contact Support
              </Link>
              <Link
                to="/help"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <HelpCircle size={20} className="mr-2" />
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SitemapPage;
