import React from "react";
import { FaClipboardList, FaSearch, FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";

const Working = () => {
  const steps = [
    {
      icon: <FaClipboardList className='text-2xl' />,
      title: "Report Item",
      description:
        "Report your lost item or submit a found item with details like location, category, and description.",
    },
    {
      icon: <FaSearch className='text-2xl' />,
      title: "Browse Items",
      description:
        "Search through our database of lost and found items using filters like category and location.",
    },
    {
      icon: <FaHandshake className='text-2xl' />,
      title: "Claim/Connect",
      description:
        "Found your item? Connect with the finder or claim your lost item through our secure platform.",
    },
  ];

  return (
    <div className='bg-base-200 py-16 px-24'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-primary mb-4'>How It Works</h2>
          <p className='text-base-content/70 max-w-2xl mx-auto'>
            Our platform makes it easy to report, find, and claim lost items.
            Follow these simple steps to get started.
          </p>
        </div>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='bg-base-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300'
            >
              {/* Step Icon */}
              <div className='flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 text-primary'>
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className='text-xl font-semibold text-base-content mb-3'>
                {step.title}
              </h3>

              {/* Step Description */}
              <p className='text-base-content/70'>{step.description}</p>

              {/* Step Number Badge */}
              <div className='mt-4 flex items-center'>
                <span className='text-sm font-medium text-primary'>
                  Step {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <div className='hidden md:block ml-4 flex-1 h-0.5 bg-base-300'>
                    <div className='h-full w-1/2 bg-primary'></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <Link to='/report-lost' className='btn btn-primary btn-lg'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Working;
