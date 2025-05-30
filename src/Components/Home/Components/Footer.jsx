import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: "📘",
      url: "https://facebook.com",
    },
    {
      name: "Twitter",
      icon: "📘",
      url: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: "📸",
      url: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com",
    },
  ];

  const quickLinks = [
    { name: "About Us", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
  ];

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold text-white'>NodeNinjas</h3>
            <p className='text-sm'>
              Helping you find your lost items and return found items to their
              rightful owners.
            </p>
            <div className='flex space-x-4'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-white transition-colors duration-300'
                >
                  <span className='text-xl'>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className='hover:text-white transition-colors duration-300'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-4'>
              Contact Us
            </h4>
            <ul className='space-y-2'>
              <li className='flex items-center space-x-2'>
                <span>📧</span>
                <a
                  href='mailto:support@nodeninjas.com'
                  className='hover:text-white transition-colors duration-300'
                >
                  support@nodeninjas.com
                </a>
              </li>
              <li className='flex items-center space-x-2'>
                <span>📞</span>
                <a
                  href='tel:+1234567890'
                  className='hover:text-white transition-colors duration-300'
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className='flex items-center space-x-2'>
                <span>📍</span>
                <span>123 University Ave, Campus City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-4'>
              Stay Updated
            </h4>
            <p className='text-sm mb-4'>
              Subscribe to our newsletter for updates and news.
            </p>
            <form className='space-y-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500'
              />
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-800 mt-12 pt-8 text-center'>
          <p className='text-sm'>
            © {currentYear} NodeNinjas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
