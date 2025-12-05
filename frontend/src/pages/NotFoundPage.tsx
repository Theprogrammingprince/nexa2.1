import { Home, Search, HelpCircle, ArrowLeft, BookOpen, FileQuestion } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Home', path: '/', icon: Home, description: 'Return to homepage' },
    { name: 'Dashboard', path: '/dashboard', icon: BookOpen, description: 'Go to your dashboard' },
    { name: 'CBT Practice', path: '/cbt', icon: FileQuestion, description: 'Start practicing' },
    { name: 'Help Center', path: '/help', icon: HelpCircle, description: 'Get support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center">
              <div className="relative">
                <div className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent leading-none">
                  404
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                    <Search size={48} className="text-teal-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all"
            >
              <Home size={20} />
              Go Home
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Try These Instead
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className="group flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-teal-50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <p className="text-gray-600 mb-4">Looking for something specific?</p>
          <Link
            to="/sitemap"
            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
          >
            <Search size={20} />
            View Sitemap
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-6 py-3 rounded-full">
            <HelpCircle size={20} />
            <span className="font-medium">Need help?</span>
            <Link to="/help" className="font-semibold underline hover:text-teal-800 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
