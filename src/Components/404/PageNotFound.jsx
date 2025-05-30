import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full text-center'>
        {/* 404 Illustration */}
        <div className='mb-8'>
          <div className='relative w-64 h-64 mx-auto'>
            <div className='absolute inset-0 bg-primary/10 rounded-full animate-pulse'></div>
            <div className='absolute inset-4 bg-base-100 rounded-full flex items-center justify-center'>
              <span className='text-8xl font-bold text-primary'>404</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className='text-4xl font-bold mb-4'>Page Not Found</h1>
        <p className='text-lg text-base-content/70 mb-8'>
          Oops! The page you're looking for seems to have wandered off. Let's
          help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link to='/' className='btn btn-primary gap-2'>
            <FaHome />
            Go Home
          </Link>
          <Link to='/found-items' className='btn btn-outline gap-2'>
            <FaSearch />
            Browse Found Items
          </Link>
          <button
            onClick={() => window.history.back()}
            className='btn btn-ghost gap-2'
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className='mt-12 p-6 bg-base-100 rounded-lg shadow-sm'>
          <h2 className='text-xl font-semibold mb-4'>Need Help?</h2>
          <p className='text-base-content/70 mb-4'>
            If you believe this is an error, please contact our support team.
          </p>
          <Link to='/contact' className='text-primary hover:underline'>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
