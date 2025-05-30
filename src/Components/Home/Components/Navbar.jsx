import React from "react";

const Navbar = () => {
  return (
    <nav className='bg-base-100 border-b border-base-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-20 items-center'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <a href='/' className='text-3xl font-serif font-bold text-primary'>
              NodeNinjas
            </a>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-8'>
              <a
                href='/'
                className='text-base-content hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200'
              >
                Home
              </a>
              <a
                href='/lost-items'
                className='text-base-content hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200'
              >
                Lost Items
              </a>
              <a
                href='/found-items'
                className='text-base-content hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200'
              >
                Found Items
              </a>
              <a
                href='/dashboard'
                className='text-base-content hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200'
              >
                Dashboard
              </a>
              <a href='/login' className='btn btn-primary btn-sm'>
                Login/Signup
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              type='button'
              className='btn btn-ghost btn-sm'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className='md:hidden hidden' id='mobile-menu'>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <a
            href='/'
            className='text-base-content hover:text-primary block px-3 py-2 text-base font-medium transition-colors duration-200'
          >
            Home
          </a>
          <a
            href='/lost-items'
            className='text-base-content hover:text-primary block px-3 py-2 text-base font-medium transition-colors duration-200'
          >
            Lost Items
          </a>
          <a
            href='/found-items'
            className='text-base-content hover:text-primary block px-3 py-2 text-base font-medium transition-colors duration-200'
          >
            Found Items
          </a>
          <a
            href='/dashboard'
            className='text-base-content hover:text-primary block px-3 py-2 text-base font-medium transition-colors duration-200'
          >
            Dashboard
          </a>
          <a href='/login' className='btn btn-primary btn-block'>
            Login/Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
