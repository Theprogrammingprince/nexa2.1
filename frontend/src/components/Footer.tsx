 const Footer = () => {
  const departments = [
    {
      title: 'Faculty of Information Technology & Computing',
      items: [
        'Computer Science',
        'Software Engineering',
        'Networking & Cybersecurity',
      ],
    },
    {
      title: 'Faculty of Business & Management',
      items: [
        'Business Administration',
        'Accounting & Finance',
        'Marketing & Entrepreneurship',
      ],
    },
    {
      title: 'Faculty of Arts & Humanities',
      items: [
        'English Language & Literature',
        'Social Sciences',
        'Communication & Media Studies',
      ],
    },
    {
      title: 'Faculty of Science & Technology',
      items: [
        'Applied Sciences',
        'Engineering Fundamentals',
        'Environmental Studies',
      ],
    },
    {
      title: 'Faculty of Vocational & Professional Studies',
      items: [
        'Hospitality & Tourism Management',
        'Event Management',
        'Technical & Trade Skills',
        'Fashion & Design',
      ],
    },
    {
      title: 'Faculty of Education & Training',
      items: [
        'Teacher Training Programs',
        'Early Childhood Education',
        'Educational Leadership',
      ],
    },
  ];

  const quickLinks = [
    { title: 'Students', items: ['Academics', 'Alumni', 'Courses', 'Career'] },
    { title: 'Faculty & Staffs', items: [] },
    { title: 'Gallery', items: [] },
    { title: 'The Institute', items: ['Happenings'] },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Quick Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-6 md:pb-8 border-b border-gray-700">
          {quickLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              {section.items.length > 0 && (
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-primary-200 hover:text-white text-sm transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Departments Section */}
        <div className="py-6 md:py-8 border-b border-gray-700">
          <h3 className="font-semibold text-base md:text-lg mb-4 md:mb-6">Departments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {departments.map((dept, index) => (
              <div key={index}>
                <h4 className="font-medium mb-3 text-gray-200">{dept.title}</h4>
                <ul className="space-y-2">
                  {dept.items.map((item, idx) => (
                    <li key={idx} className="text-gray-400 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Logo and Legal Section */}
        <div className="pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {/* Logo */}
            <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl md:text-2xl">N</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-300">
              <p className="font-semibold text-white">NEXA - NOUN Exam Experience Assistant</p>
              <p className="mt-1">Your computer-based training platform for NOUN exam success</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs sm:text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
          <div className="text-center">
            <p>© 2025 Nexa - All rights reserved</p>
          </div>
          <div className="text-center">
            <p className="hidden sm:inline">Website lastly updated on {new Date().toLocaleDateString()}</p>
            <p className="sm:hidden">Updated {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
