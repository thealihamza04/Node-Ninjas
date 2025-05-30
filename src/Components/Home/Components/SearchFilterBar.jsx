import React, { useState } from "react";

const SearchFilterBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

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
    <div className='card bg-base-100 shadow-sm max-w-3xl mx-auto -mt-12 relative z-10'>
      <div className='card-body p-6'>
        <form
          onSubmit={handleSearch}
          className='join w-full flex flex-col md:flex-row gap-2'
        >
          <input
            type='text'
            placeholder='Search for items...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='input input-bordered join-item flex-1'
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='select select-bordered join-item w-full md:w-40'
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
            className='select select-bordered join-item w-full md:w-40'
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <button type='submit' className='btn btn-primary join-item'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchFilterBar;
