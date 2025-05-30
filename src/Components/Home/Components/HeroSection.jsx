import React from "react";

const HeroSection = () => {
  return (
    <div className='relative min-h-[80vh] w-full bg-base-200'>
      {/* Background with subtle pattern */}
      <div className='absolute inset-0 bg-base-100 opacity-90'></div>

      {/* Content */}
      <div className='relative h-full flex flex-col items-center justify-center text-center px-4 py-20'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <h1 className='text-4xl md:text-5xl font-serif font-bold text-base-content leading-tight'>
            Lost Something? Found Something?
          </h1>
          <p className='text-xl text-base-content/80 font-light max-w-2xl mx-auto'>
            Let's help you reconnect with your belongings. Our community is here
            to assist in bringing lost items back to their rightful owners.
          </p>

          <div className='flex flex-col sm:flex-row gap-6 justify-center pt-8'>
            <a
              href='/report-lost'
              className='btn btn-primary btn-lg min-w-[200px]'
            >
              Report Lost Item
            </a>
            <a
              href='/report-found'
              className='btn btn-outline btn-lg min-w-[200px]'
            >
              Report Found Item
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
