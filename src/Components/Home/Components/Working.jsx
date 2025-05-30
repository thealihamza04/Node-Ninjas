import React from "react";

const Working = () => {
  const steps = [
    {
      icon: "📝",
      title: "Report Item",
      description:
        "Report your lost item or submit a found item with details like location, category, and description.",
    },
    {
      icon: "🔍",
      title: "Browse Items",
      description:
        "Search through our database of lost and found items using filters like category and location.",
    },
    {
      icon: "🤝",
      title: "Claim/Connect",
      description:
        "Found your item? Connect with the finder or claim your lost item through our secure platform.",
    },
  ];

  return (
    <div className='bg-gray-50 py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>
            How It Works
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Our platform makes it easy to report, find, and claim lost items.
            Follow these simple steps to get started.
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300'
            >
              {/* Step Number */}
              <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4'>
                <span className='text-2xl'>{step.icon}</span>
              </div>

              {/* Step Title */}
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                {step.title}
              </h3>

              {/* Step Description */}
              <p className='text-gray-600'>{step.description}</p>

              {/* Step Number Badge */}
              <div className='mt-4 flex items-center'>
                <span className='text-sm font-medium text-blue-600'>
                  Step {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <div className='hidden md:block ml-4 flex-1 h-0.5 bg-gray-200'>
                    <div className='h-full w-1/2 bg-blue-600'></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <a
            href='/report-lost'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300'
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Working;
