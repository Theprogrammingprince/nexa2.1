import { Zap, CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  const features = [
    { text: 'Practice tests in real exam format', icon: CheckCircle2 },
    { text: 'Comprehensive progress tracking', icon: Zap },
    { text: 'Timed practice sessions', icon: Zap },
    { text: 'Instant performance feedback', icon: CheckCircle2 },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-teal-50/30 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-32 -right-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
      <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center lg:gap-20">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-teal-700 font-semibold text-xs uppercase tracking-wider bg-teal-100 px-4 py-1.5 rounded-lg text-center">
                  ✓ About NEXA
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                NOUN Exam <br />
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Experience Assistant</span>
              </h2>
            </div>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
              NEXA is a computer-based training platform specifically designed for NOUN students. As freshers often find it difficult to understand the school exam standard, NEXA is here to help you abreast yourself to the NOUN exam standard. 
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
              Take tests in practice mode, track your progress, and get ready for the main exam. Build the confidence and skills needed to excel.
            </p>

            {/* Features List */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="text-white" size={16} />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <button 
              className="relative group mt-8 overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 p-0.5 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative px-8 py-3.5 rounded-lg bg-white text-teal-600 font-semibold text-base group-hover:bg-transparent group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <span>Start Practicing Now</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </button>
          </div>

          {/* Right Content - Enhanced Image */}
          <div className="relative mt-10 md:mt-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Main image with professional styling */}
              <div className="relative rounded-2xl md:rounded-3xl aspect-[16/10] overflow-hidden shadow-2xl group border border-white/40">
                <img 
                  src="/img (2).jpg" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
              </div>
              
              {/* Professional floating cards */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-lg shadow-xl border border-white/30 group-hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-800 font-semibold">Practice Mode</span>
                </div>
              </div>
              
              <div className="absolute top-1/3 -right-3 sm:right-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-lg shadow-xl border border-white/30 group-hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-800 font-semibold">Track Progress</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-1/4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-lg shadow-xl border border-white/30 group-hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-gray-800 font-semibold">Ace Exams</span>
                </div>
              </div>

              {/* Subtle accent corners */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border border-teal-200 rounded-full opacity-40"></div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border border-cyan-200 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
