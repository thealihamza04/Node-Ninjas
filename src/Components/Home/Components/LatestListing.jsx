import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useContext } from "react";
import ItemsContext from "../../../context/items/ItemsContext";

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
          <div key={item._id}>
            <ItemCard item={item} type={type} index={index} linkPrefix='' />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component
const LatestListing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { lostItems, foundItems } = useContext(ItemsContext);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (lostItems.length > 0 || foundItems.length > 0) {
      setIsLoading(false);
    }
  }, [lostItems, foundItems]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Get latest 2 items for each section
  const latestLostItems = lostItems.slice(0, 2);
  const latestFoundItems = foundItems.slice(0, 2);

  return (
    <div className='max-w-6xl pb-24 mx-auto px-2 sm:px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8'>
        <ItemsSection
          title='Lost Items'
          items={latestLostItems}
          type='lost'
          viewAllLink='/lost'
        />
        <ItemsSection
          title='Found Items'
          items={latestFoundItems}
          type='found'
          viewAllLink='/found'
        />
      </div>
    </div>
  );
};

export default LatestListing;
