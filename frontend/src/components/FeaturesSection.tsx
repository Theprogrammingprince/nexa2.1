import { BookOpen, Award, Users, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Practice Mode',
      description: 'Take unlimited practice tests in a real exam environment',
      image: '/img (3).jpg',
    },
    {
      icon: Award,
      title: 'Exam Standards',
      description: 'Experience actual NOUN exam format and difficulty level',
      image: '/img (4).jpg',
    },
    {
      icon: Users,
      title: 'Progress Tracking',
      description: 'Monitor your performance and see how exam-ready you are',
      image: '/img (3).jpg',
    },
    {
      icon: TrendingUp,
      title: 'Smart Timer',
      description: 'Practice with timed tests to build exam speed and confidence',
      image: '/img (4).jpg',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with animation */}
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-teal-600 font-semibold text-sm md:text-base uppercase tracking-wider bg-teal-50 px-4 py-2 rounded-full">
              ✨ Why Choose NEXA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Everything You Need to Ace NOUN Exams
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
NEXA provides all the tools freshers, sophomores, and finalists need to understand exam standards and perform excellently.          </p>
        </div>

        {/* Features Grid with stagger animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 hover:bg-white/95 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon with animation */}
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                  <Icon className="text-white" size={28} />
                </div>

                {/* Number badge */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{feature.title}</h3>
                <p className="text-gray-600 text-sm relative z-10">{feature.description}</p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-b-2xl w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Image Showcase with parallax effect */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] group">
            <img
              src="/img (3).jpg"
              alt="Students studying"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4 md:p-6">
              <div className="text-white relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Computer-Based Training</h3>
                <p className="text-xs md:text-sm text-gray-200">Practice in a real CBT environment just like NOUN exams</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] group">
            <img
              src="/img (4).jpg"
              alt="Student achievement"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4 md:p-6">
              <div className="text-white relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Get Exam Ready</h3>
                <p className="text-xs md:text-sm text-gray-200">Build confidence and achieve success in your NOUN exams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
