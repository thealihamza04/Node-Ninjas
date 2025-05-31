import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className='relative min-h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden'>
      {/* Content */}
      <div className='relative h-full flex flex-col items-center justify-center text-center px-4 pt-24 sm:pt-28 py-12 sm:py-20'>
        <div className='max-w-4xl mx-auto space-y-6 sm:space-y-8'>
          {/* Text Content */}
          <div className='relative z-10 px-4 sm:px-6'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-base-content leading-tight'>
              <span className='text-primary'>Lost</span> <span>Something?</span>{" "}
              <span className='text-secondary'>Found</span>{" "}
              <span>Something?</span>
            </h1>

            <p className='text-lg sm:text-xl md:text-2xl text-base-content/80 font-light max-w-2xl mx-auto mt-6 sm:mt-8 px-4 sm:px-0'>
              Let's help you reconnect with your belongings. Our community is
              here to assist in bringing lost items back to their rightful
              owners.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8 sm:pt-12 px-4 sm:px-0'>
              <Link
                to="/lossitemform"
                className='btn btn-primary btn-lg w-full sm:w-auto min-w-[200px]'
                aria-label='Report a lost item'
              >
                Report Lost Item
              </Link>
              <Link
                to="/founditemform"
                className='btn btn-outline btn-lg w-full sm:w-auto min-w-[200px]'
                aria-label='Report a found item'
              >
                Report Found Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
