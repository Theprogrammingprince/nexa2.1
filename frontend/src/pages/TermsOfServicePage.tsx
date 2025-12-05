import { FileText, Scale, AlertTriangle, UserCheck, CreditCard, Ban, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
  const sections = [
    {
      icon: UserCheck,
      title: 'Account Terms',
      content: [
        {
          subtitle: 'Account Creation',
          text: 'You must be at least 16 years old to use this service. You must provide accurate and complete information when creating your account. You are responsible for maintaining the security of your account and password.'
        },
        {
          subtitle: 'Account Responsibility',
          text: 'You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.'
        },
        {
          subtitle: 'One Account Per User',
          text: 'Each user is permitted one account only. Creating multiple accounts to circumvent restrictions or gain unfair advantages is prohibited and may result in account termination.'
        }
      ]
    },
    {
      icon: FileText,
      title: 'Acceptable Use',
      content: [
        {
          subtitle: 'Permitted Use',
          text: 'You may use NEXA for personal educational purposes, including taking practice tests, accessing course summaries, and tracking your academic progress.'
        },
        {
          subtitle: 'Prohibited Activities',
          text: 'You may not: share your account credentials, copy or distribute our content without permission, use automated tools to access the platform, attempt to hack or disrupt our services, or use the platform for any illegal purposes.'
        },
        {
          subtitle: 'Academic Integrity',
          text: 'You must maintain academic integrity when using our platform. Cheating, sharing answers during tests, or any form of academic dishonesty is strictly prohibited.'
        }
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment & Billing',
      content: [
        {
          subtitle: 'Subscription Plans',
          text: 'We offer various subscription plans with different features and pricing. All prices are in Nigerian Naira (NGN) unless otherwise stated. Prices are subject to change with 30 days notice.'
        },
        {
          subtitle: 'Payment Processing',
          text: 'Payments are processed securely through our payment partners. You authorize us to charge your payment method for all fees incurred. Failed payments may result in service suspension.'
        },
        {
          subtitle: 'Refund Policy',
          text: 'We offer a 7-day money-back guarantee for new subscriptions. Refund requests must be submitted within 7 days of purchase. Refunds are processed within 14 business days.'
        },
        {
          subtitle: 'Cancellation',
          text: 'You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period. No partial refunds are provided for unused time.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Intellectual Property',
      content: [
        {
          subtitle: 'Our Content',
          text: 'All content on NEXA, including course materials, questions, summaries, software, and design, is owned by NEXA or our licensors and protected by copyright, trademark, and other intellectual property laws.'
        },
        {
          subtitle: 'Limited License',
          text: 'We grant you a limited, non-exclusive, non-transferable license to access and use our platform for personal educational purposes only. This license does not include the right to copy, modify, or distribute our content.'
        },
        {
          subtitle: 'User Content',
          text: 'You retain ownership of any content you submit to our platform. By submitting content, you grant us a worldwide, royalty-free license to use, display, and distribute your content in connection with our services.'
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimers & Limitations',
      content: [
        {
          subtitle: 'Service Availability',
          text: 'We strive to provide uninterrupted service but cannot guarantee 100% uptime. We reserve the right to modify, suspend, or discontinue any part of our service at any time.'
        },
        {
          subtitle: 'Educational Content',
          text: 'Our practice tests and study materials are designed to help you prepare for exams but do not guarantee specific results. Actual exam content may differ from our practice materials.'
        },
        {
          subtitle: 'No Warranties',
          text: 'Our service is provided "as is" without warranties of any kind, either express or implied. We do not warrant that our service will be error-free or meet your specific requirements.'
        },
        {
          subtitle: 'Limitation of Liability',
          text: 'To the maximum extent permitted by law, NEXA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our service.'
        }
      ]
    },
    {
      icon: Ban,
      title: 'Termination',
      content: [
        {
          subtitle: 'Termination by You',
          text: 'You may terminate your account at any time by contacting our support team or through your account settings. Upon termination, your access to paid features will cease at the end of your billing period.'
        },
        {
          subtitle: 'Termination by Us',
          text: 'We reserve the right to suspend or terminate your account if you violate these terms, engage in fraudulent activity, or for any other reason at our discretion. We will provide notice when possible.'
        },
        {
          subtitle: 'Effect of Termination',
          text: 'Upon termination, your right to use the service will immediately cease. We may delete your account data after a reasonable period. Some provisions of these terms will survive termination.'
        }
      ]
    },
    {
      icon: Scale,
      title: 'Governing Law & Disputes',
      content: [
        {
          subtitle: 'Governing Law',
          text: 'These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be resolved in the courts of Lagos State, Nigeria.'
        },
        {
          subtitle: 'Dispute Resolution',
          text: 'Before filing any legal action, you agree to attempt to resolve disputes through good faith negotiations. If negotiations fail, disputes may be resolved through arbitration or court proceedings.'
        },
        {
          subtitle: 'Class Action Waiver',
          text: 'You agree to resolve disputes with us on an individual basis and waive any right to participate in class action lawsuits or class-wide arbitration.'
        }
      ]
    }
  ];

  const keyPoints = [
    { icon: CheckCircle, text: 'Fair and transparent terms' },
    { icon: CheckCircle, text: '7-day money-back guarantee' },
    { icon: CheckCircle, text: 'Cancel anytime, no penalties' },
    { icon: CheckCircle, text: 'Clear refund policy' }
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
              <Scale size={20} />
              <span className="font-semibold">Legal Agreement</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using NEXA. By accessing or using our service, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <point.icon className="text-teal-600 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">{point.text}</span>
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

      {/* Agreement Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle size={32} className="flex-shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Agreement to Terms</h2>
                <p className="text-teal-50 mb-6 text-lg">
                  By creating an account or using NEXA, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                </p>
                <p className="text-teal-50 mb-6">
                  If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/auth"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
                  >
                    Create Account
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

export default TermsOfServicePage;
