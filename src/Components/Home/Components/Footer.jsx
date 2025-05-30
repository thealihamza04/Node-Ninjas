import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://facebook.com",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
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
    <footer className='bg-base-200'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold text-primary'>NodeNinjas</h3>
            <p className='text-base-content/70'>
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
                  className='btn btn-ghost btn-circle btn-sm hover:bg-primary hover:text-primary-content'
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-primary mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className='text-base-content/70 hover:text-primary transition-colors duration-300'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold text-primary mb-4'>
              Contact Us
            </h4>
            <ul className='space-y-3'>
              <li className='flex items-center space-x-3'>
                <FaEnvelope className='text-primary' />
                <a
                  href='mailto:support@nodeninjas.com'
                  className='text-base-content/70 hover:text-primary transition-colors duration-300'
                >
                  support@nodeninjas.com
                </a>
              </li>
              <li className='flex items-center space-x-3'>
                <FaPhone className='text-primary' />
                <a
                  href='tel:+1234567890'
                  className='text-base-content/70 hover:text-primary transition-colors duration-300'
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className='flex items-center space-x-3'>
                <FaMapMarkerAlt className='text-primary' />
                <span className='text-base-content/70'>
                  123 University Ave, Campus City
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className='text-lg font-semibold text-primary mb-4'>
              Stay Updated
            </h4>
            <p className='text-base-content/70 mb-4'>
              Subscribe to our newsletter for updates and news.
            </p>
            <form className='space-y-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='input input-bordered w-full bg-base-100 focus:border-primary'
              />
              <button type='submit' className='btn btn-primary w-full'>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-base-300 mt-12 pt-8 text-center'>
          <p className='text-base-content/70'>
            © {currentYear} NodeNinjas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
