 const Footer = () => {
  const quickLinks = [
    {
      title: 'Platform',
      items: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Dashboard', href: '/dashboard' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Blog', href: '/blog' },
        { label: 'Documentation', href: '/docs' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Help Center', href: '/help' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'About', href: '/#about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Reviews', href: '/#reviews' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
  ];

  const socialLinks = [
    { icon: 'f', label: 'Facebook', href: '#' },
    { icon: 'tw', label: 'Twitter', href: '#' },
    { icon: 'in', label: 'LinkedIn', href: '#' },
    { icon: 'ig', label: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-gray-800">
          {/* Brand Section */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="NEXA Logo" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-bold text-lg">NEXA</h3>
                <p className="text-xs text-gray-400">Exam Success Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your computer-based training platform for NOUN exam success. Practice, Track, Excel.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.label}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-xs font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {quickLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="text-center sm:text-left">
            <p>© 2025 NEXA - All rights reserved. Building Leaders, One Test at a Time.</p>
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-teal-400 transition-colors">Privacy</a>
            <span className="text-gray-700">•</span>
            <a href="/terms" className="hover:text-teal-400 transition-colors">Terms</a>
            <span className="text-gray-700">•</span>
            <a href="/cookie-policy" className="hover:text-teal-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
