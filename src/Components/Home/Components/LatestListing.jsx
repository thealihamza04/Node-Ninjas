import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";

// Separate SectionHeader component
const SectionHeader = ({ title, viewAllLink }) => {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6'>
      <h2 className='text-xl sm:text-2xl font-bold text-base-content'>
        {title}
      </h2>
      <div className='h-px w-full sm:w-auto sm:flex-1 bg-gradient-to-r from-primary/50 to-transparent origin-left' />
      <div>
        <Link
          to={viewAllLink}
          className='text-xs sm:text-sm text-primary hover:text-primary-focus transition-colors group'
        >
          <span className='flex items-center gap-1 sm:gap-2'>
            View All
            <span>→</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

// Separate LoadingSkeleton component
const LoadingSkeleton = () => (
  <div className='max-w-6xl mx-auto px-4 py-8 sm:py-12'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8'>
      {[1, 2].map((i) => (
        <div key={i} className='animate-pulse'>
          <div className='h-6 sm:h-8 bg-base-300 rounded w-1/3 mb-4 sm:mb-6'></div>
          <div className='space-y-3 sm:space-y-4'>
            {[1, 2].map((j) => (
              <div key={j} className='card bg-base-200 h-32 sm:h-48'></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Separate ItemsSection component
const ItemsSection = ({ title, items, type, viewAllLink }) => {
  return (
    <div className='px-2 sm:first:pl-24 sm:last:pr-24'>
      <SectionHeader title={title} viewAllLink={viewAllLink} />
      <div className='grid gap-3 sm:gap-6'>
        {items.map((item, index) => (
          <div key={item.id}>
            <ItemCard item={item} type={type} index={index} linkPrefix='' />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component
const LatestListing = () => {
  const [isLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sample data - replace with actual data from your backend
  const lostItems = [
    {
      id: 1,
      title: "MacBook Pro",
      category: "Electronics",
      location: "Library",
      date: "2024-03-15",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    },
    {
      id: 2,
      title: "Student ID Card",
      category: "Documents",
      location: "Academic Block",
      date: "2024-03-14",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const foundItems = [
    {
      id: 3,
      title: "Wireless Earbuds",
      category: "Electronics",
      location: "Cafeteria",
      date: "2024-03-15",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    },
    {
      id: 4,
      title: "Water Bottle",
      category: "Accessories",
      location: "Sports Complex",
      date: "2024-03-14",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className='max-w-6xl mx-auto px-2 sm:px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8'>
        <ItemsSection
          title='Lost Items'
          items={lostItems}
          type='lost'
          viewAllLink='/lost'
        />
        <ItemsSection
          title='Found Items'
          items={foundItems}
          type='found'
          viewAllLink='/found'
        />
      </div>
    </div>
  );
};

export default LatestListing;
