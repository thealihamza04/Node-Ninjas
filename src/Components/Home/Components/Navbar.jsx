import React from "react";

const Navbar = () => {
  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <a href='/' className='text-2xl font-bold text-blue-600'>
              NodeNinjas
            </a>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-8'>
              <a
                href='/'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                Home
              </a>
              <a
                href='/lost-items'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                Lost Items
              </a>
              <a
                href='/found-items'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                Found Items
              </a>
              <a
                href='/dashboard'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                Dashboard
              </a>
              <a
                href='/login'
                className='bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium'
              >
                Login/Signup
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
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
            className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            Home
          </a>
          <a
            href='/lost-items'
            className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            Lost Items
          </a>
          <a
            href='/found-items'
            className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            Found Items
          </a>
          <a
            href='/dashboard'
            className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
          >
            Dashboard
          </a>
          <a
            href='/login'
            className='bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium'
          >
            Login/Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
