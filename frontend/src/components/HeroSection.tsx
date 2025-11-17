const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Announcements Banner */}
        <div className="mb-8 flex items-center gap-4 overflow-x-auto pb-2">
          <div className="bg-primary-700 text-white px-6 py-2 rounded-r-full font-semibold whitespace-nowrap">
            Announcements
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Shaping Futures, Building Leaders
            </h1>
            <p className="text-xl md:text-2xl text-primary-700 font-semibold">
              Nexa Platform
            </p>
            <p className="text-gray-600 text-lg">
              Delivering excellence in education and vocational training with a holistic approach to
              student growth and global opportunities
            </p>
            <div className="flex gap-4">
              <button className="bg-primary-600 hover:bg-primary-700 text-black px-8 py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <a
                href="/auth"
                className="bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
              >
                Sign In
              </a>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-primary-600 rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              {/* Hero Image */}
              <img 
                src="/img (1).jpg" 
                alt="Student learning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
              
              {/* Floating badges */}
              <div className="absolute top-8 right-8 bg-white px-6 py-3 rounded-full shadow-lg z-10">
                <span className="text-primary-700 font-semibold">Global Pathways</span>
              </div>
              <div className="absolute bottom-8 right-8 bg-white px-6 py-3 rounded-full shadow-lg z-10">
                <span className="text-primary-700 font-semibold">Student First</span>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-3">
              <div className="w-4 h-4 bg-primary-300 rounded-full"></div>
              <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
              <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
