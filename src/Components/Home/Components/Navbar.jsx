import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/lost", label: "Lost Items" },
    { path: "/found", label: "Found Items" },
    { path: "/user", label: "Dashboard" },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: {
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const underlineVariants = {
    initial: { scaleX: 0, opacity: 0 },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.nav
      initial='hidden'
      animate='visible'
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-base-100/80 backdrop-blur-lg shadow-lg" : "bg-base-100"
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-20 items-center'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link to='/'>
              <div className='text-2xl font-serif font-bold text-primary'>
                UMT Lost/Found
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-8'>
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={linkVariants}
                  initial='initial'
                  whileHover='hover'
                  className='relative'
                >
                  <Link
                    to={link.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-base-content hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path ? (
                      <motion.div
                        layoutId='activeTab'
                        className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    ) : (
                      <motion.div
                        variants={underlineVariants}
                        className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left'
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link
                  to='/login'
                  className='btn btn-primary btn-sm gap-2 hover:shadow-lg transition-all duration-200'
                >
                  <FaUser className='w-4 h-4' />
                  Login/Signup
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div
            className='md:hidden'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              type='button'
              className='btn btn-ghost btn-sm'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls='mobile-menu'
              aria-expanded={isMobileMenuOpen}
            >
              <span className='sr-only'>Open main menu</span>
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial='closed'
            animate='open'
            exit='closed'
            variants={mobileMenuVariants}
            className='md:hidden overflow-hidden'
          >
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-base-100/95 backdrop-blur-lg'>
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link
                    to={link.path}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-base-content hover:text-primary"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
                className='px-3 py-2'
              >
                <Link
                  to='/login'
                  className='btn btn-primary btn-block gap-2'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser className='w-4 h-4' />
                  Login/Signup
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
