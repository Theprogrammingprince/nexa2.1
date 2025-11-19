import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'What is NEXA and how does it work?',
      answer: 'NEXA is a computer-based training platform designed specifically for NOUN students. It provides practice tests, progress tracking, timed sessions, and performance feedback to help you prepare for NOUN exams in a real exam environment.',
      category: 'general',
    },
    {
      id: 2,
      question: 'How can I get started with NEXA?',
      answer: 'Simply sign up on our platform, create your account, and start exploring our practice tests. You can choose from various courses and topics, and begin your exam preparation journey immediately.',
      category: 'getting-started',
    },
    {
      id: 3,
      question: 'Is NEXA specifically for NOUN students?',
      answer: 'Yes, NEXA is specifically designed for NOUN (National Open University of Nigeria) students. We tailor our practice tests and training materials to match NOUN exam standards and formats.',
      category: 'general',
    },
    {
      id: 4,
      question: 'What courses are available on NEXA?',
      answer: 'NEXA covers courses across multiple faculties including Information Technology & Computing, Business & Management, Arts & Humanities, Science & Technology, Vocational & Professional Studies, and Education & Training.',
      category: 'courses',
    },
    {
      id: 5,
      question: 'Can I track my progress on NEXA?',
      answer: 'Absolutely! NEXA provides comprehensive progress tracking with detailed analytics. You can view your performance metrics, identify weak areas, and monitor your improvement over time.',
      category: 'features',
    },
    {
      id: 6,
      question: 'Are there timed practice sessions?',
      answer: 'Yes, we offer timed practice sessions that simulate real exam conditions. This helps you build speed and confidence while managing your time effectively during actual exams.',
      category: 'features',
    },
    {
      id: 7,
      question: 'What support options are available?',
      answer: 'We provide 24/7 customer support through multiple channels including email, chat, and phone. Our team is always ready to help you with any questions or technical issues.',
      category: 'support',
    },
    {
      id: 8,
      question: 'How much does NEXA cost?',
      answer: 'NEXA offers flexible pricing plans to suit different budgets. Visit our pricing page to explore various subscription options and find the plan that works best for you.',
      category: 'pricing',
    },
    {
      id: 9,
      question: 'Can I access NEXA on mobile devices?',
      answer: 'Yes, NEXA is fully responsive and accessible on all devices including smartphones and tablets. You can study anywhere, anytime at your convenience.',
      category: 'technical',
    },
    {
      id: 10,
      question: 'What is your success rate?',
      answer: 'Our users have achieved a 95% success rate in NOUN exams. This remarkable achievement is a testament to the quality of our practice materials and comprehensive exam preparation approach.',
      category: 'general',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'courses', label: 'Courses' },
    { id: 'features', label: 'Features' },
    { id: 'support', label: 'Support' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'technical', label: 'Technical' },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-teal-600 font-semibold text-sm md:text-base uppercase tracking-wider bg-teal-50 px-4 py-2 rounded-full">
              ❓ FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about NEXA and how it can help you ace your NOUN exams
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300 hover:text-teal-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-4 hover:bg-teal-50/50 transition-colors duration-300"
                >
                  <span className="text-left text-base sm:text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`flex-shrink-0 text-teal-600 transition-transform duration-300 ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Answer */}
                {expandedId === faq.id && (
                  <div className="px-6 sm:px-8 py-4 sm:py-6 border-t-2 border-gray-100 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 animate-fade-in">
                    <p className="text-gray-700 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No FAQs found in this category.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="bg-gradient-to-br from-teal-600/10 to-cyan-600/10 rounded-2xl border-2 border-teal-200 p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Our support team is available 24/7 to help you with any inquiries
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
