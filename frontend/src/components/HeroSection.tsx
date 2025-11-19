const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-teal-50 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Announcements Banner with animation */}
        <div className="mb-8 flex items-center gap-2 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-full font-semibold whitespace-nowrap animate-fade-in">
            ✨ Announcements
          </div>
          <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">New Features Available</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center lg:gap-20">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in max-w-xl">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                Shaping Futures, <br />
                <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                  Building Leaders
                </span>
              </h1>
            </div>

            <div className="space-y-4">
              <p className="text-2xl md:text-2xl font-bold text-gray-900">
                Nexa Platform
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Delivering excellence in education and vocational training with a holistic approach to student growth and global opportunities
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 py-6 border-t border-b border-gray-200">
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="text-4xl font-bold text-teal-600">10K+</div>
                <div className="text-sm text-gray-600 mt-2">Active Students</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                <div className="text-4xl font-bold text-cyan-600">95%</div>
                <div className="text-sm text-gray-600 mt-2">Success Rate</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                <div className="text-4xl font-bold text-teal-600">24/7</div>
                <div className="text-sm text-gray-600 mt-2">Support</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <button className="relative group overflow-hidden rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 p-0.5 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative px-8 py-4 rounded-full bg-white text-teal-600 font-bold text-lg transition-all duration-300 group-hover:bg-transparent group-hover:text-white flex items-center justify-center gap-2">
                  Get Started
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </button>
              <a
                href="/auth"
                className="group relative overflow-hidden rounded-full border-2 border-teal-600 px-8 py-4 font-bold text-teal-600 text-lg transition-all duration-300 hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                Sign In
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

          {/* Right Content - Hero Image with enhancements */}
          <div className="relative group animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/50">
              {/* Hero Image */}
              <img 
                src="/img (1).jpg" 
                alt="Student learning" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/15 via-transparent to-cyan-600/15 group-hover:from-teal-600/10 group-hover:to-cyan-600/10 transition-all duration-500"></div>
              
              {/* Floating badges with enhanced styling */}
              <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg z-10 border border-white/20 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 hover:bg-white">
                <span className="text-teal-600 font-bold text-sm">Global Pathways</span>
              </div>
              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg z-10 border border-white/20 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 hover:bg-white" style={{ animationDelay: '200ms' }}>
                <span className="text-cyan-600 font-bold text-sm">Student First</span>
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 space-y-4">
              <div className="w-5 h-5 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full shadow-lg animate-fade-in"></div>
              <div className="w-5 h-5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full shadow-lg animate-fade-in" style={{ animationDelay: '100ms' }}></div>
              <div className="w-5 h-5 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}></div>
            </div>

            {/* Accent corner borders */}
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-teal-300 opacity-50"></div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-cyan-300 opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
