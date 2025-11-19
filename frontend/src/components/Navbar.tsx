import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'The Institute', href: '#about' },
    { name: 'Academics', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Happenings', href: '#' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">NEXA</h1>
                <p className="text-xs text-gray-500 -mt-1">Exam Success Platform</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-gray-700 hover:text-teal-600 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/auth"
              className="text-gray-700 hover:text-gray-900 px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              Sign In
            </Link>
            <button className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 p-0.5 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative px-6 py-2 rounded-lg bg-white text-teal-600 font-medium text-sm group-hover:bg-transparent group-hover:text-white transition-all duration-300">
                Get Started
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-teal-600 focus:outline-none transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link block px-4 py-2.5 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
              <Link
                to="/auth"
                className="block px-4 py-2.5 text-center text-gray-700 border border-gray-200 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <button 
                className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
