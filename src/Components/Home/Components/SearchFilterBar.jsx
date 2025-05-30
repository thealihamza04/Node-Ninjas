import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const SearchFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All Categories",
    "Electronics",
    "Books",
    "Clothing",
    "Accessories",
    "Documents",
    "Others",
  ];

  const locations = [
    "All Locations",
    "Academic Block",
    "Library",
    "Cafeteria",
    "Sports Complex",
    "Hostel",
    "Parking Area",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ searchTerm, category, location });
  };

  return (
    <div className='card bg-base-100 shadow-sm max-w-4xl mx-auto -mt-12 relative z-10'>
      <div className='card-body p-4 md:p-6'>
        <form onSubmit={handleSearch} className='space-y-4'>
          {/* Search Bar */}
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for items...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='input input-bordered w-full pl-10'
            />
            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
          </div>

          {/* Filter Toggle Button - Mobile Only */}
          <button
            type='button'
            onClick={() => setShowFilters(!showFilters)}
            className='btn btn-ghost btn-sm md:hidden w-full'
          >
            <FaFilter className='mr-2' />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block space-y-4 md:space-y-0 md:flex md:gap-4`}
          >
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='select select-bordered w-full'
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='select select-bordered w-full'
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <button type='submit' className='btn btn-primary w-full md:w-auto'>
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilterBar;
