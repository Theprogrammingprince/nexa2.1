import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { supportAPI } from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@nexa.edu',
      href: 'mailto:support@nexa.edu',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+2348122139367',
      href: 'tel:+2348122139367',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Abuja, Nigeria',
      href: '#',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('📧 Sending contact message:', formData);
      const response = await supportAPI.sendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        priority: 'normal'
      });

      console.log('📧 Contact form response:', response);

      if (response.success) {
        toast.success('Message sent successfully! We will get back to you soon. ✉️');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('❌ Message sending failed:', response);
        toast.error(response.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('❌ Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about NEXA? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <a
                key={info.title}
                href={info.href}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 hover:border-teal-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-teal-600 transition-colors duration-300">
                    {info.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200"
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200 resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 p-0.5 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </div>
              </button>
            </form>
          </div>

          {/* Quick Support */}
          <div className="space-y-8">
            {/* Support Hours */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Support Hours</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-teal-200">
                Response time: Usually within 24 hours
              </p>
            </div>

            {/* FAQ Link */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h3>
              <p className="text-gray-600 mb-4">
                Can't find the answer you're looking for? Check out our FAQ section.
              </p>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200 group"
              >
                View FAQs
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-teal-100 flex items-center justify-center transition-all duration-200 group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors duration-200">
                      {social[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
