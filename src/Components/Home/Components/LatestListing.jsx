import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

// Separate ItemCard component
const ItemCard = ({ item, type }) => (
  <div className='card bg-base-100 border border-base-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 max-w-sm group'>
    <figure className='h-40 overflow-hidden'>
      <img
        src={item.image}
        alt={item.title}
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
      />
    </figure>
    <div className='card-body p-4'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-base font-semibold text-base-content line-clamp-1'>
          {item.title}
        </h3>
        <span
          className={`badge ${
            type === "lost" ? "badge-error" : "badge-success"
          }`}
        >
          {type === "lost" ? "Lost" : "Found"}
        </span>
      </div>
      <ItemDetails item={item} />
      <div className='card-actions justify-end mt-4'>
        <Link
          to={`/${type}-items/${item.id}`}
          className='btn btn-primary btn-sm w-full'
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

// Separate ItemDetails component
const ItemDetails = ({ item }) => (
  <div className='space-y-2 text-sm text-base-content/70'>
    <div className='flex items-center gap-2'>
      <FaTag className='text-primary' />
      <span>{item.category}</span>
    </div>
    <div className='flex items-center gap-2'>
      <FaMapMarkerAlt className='text-primary' />
      <span>{item.location}</span>
    </div>
    <div className='flex items-center gap-2'>
      <FaCalendarAlt className='text-primary' />
      <span>{new Date(item.date).toLocaleDateString()}</span>
    </div>
  </div>
);

// Separate SectionHeader component
const SectionHeader = ({ title, viewAllLink }) => (
  <div className='flex items-center gap-4 mb-6'>
    <h2 className='text-xl font-semibold text-base-content'>{title}</h2>
    <div className='h-px flex-1 bg-base-300'></div>
    <Link
      to={viewAllLink}
      className='text-sm text-primary hover:text-primary-focus transition-colors'
    >
      View All →
    </Link>
  </div>
);

// Separate LoadingSkeleton component
const LoadingSkeleton = () => (
  <div className='max-w-6xl mx-auto px-4 py-12'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {[1, 2].map((i) => (
        <div key={i} className='animate-pulse'>
          <div className='h-8 bg-base-300 rounded w-1/3 mb-6'></div>
          <div className='space-y-4'>
            {[1, 2].map((j) => (
              <div key={j} className='card bg-base-200 h-48'></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Separate ItemsSection component
const ItemsSection = ({ title, items, type, viewAllLink }) => (
  <div className='first:pl-24 last:pr-24 '>
    <SectionHeader title={title} viewAllLink={viewAllLink} />
    <div className='grid gap-4'>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} type={type} />
      ))}
    </div>
  </div>
);

// Main component
const LatestListing = () => {
  const [isLoading] = useState(false);

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
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <ItemsSection
          title='Lost Items'
          items={lostItems}
          type='lost'
          viewAllLink='/lost-items'
        />
        <ItemsSection
          title='Found Items'
          items={foundItems}
          type='found'
          viewAllLink='/found-items'
        />
      </div>
    </div>
  );
};

export default LatestListing;
