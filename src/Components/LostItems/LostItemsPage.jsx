import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const LostItemsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Sample data - replace with actual data from your backend
  const lostItems = [
    {
      id: 1,
      title: "MacBook Pro",
      description:
        "Lost my MacBook Pro in the library. It has a black case with a Node.js sticker.",
      category: "Electronics",
      location: "Library",
      date: "2024-03-15",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    },
    {
      id: 2,
      title: "Student ID Card",
      description:
        "Lost my student ID card near the academic block. Please help!",
      category: "Documents",
      location: "Academic Block",
      date: "2024-03-14",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const categories = [
    "All",
    "Electronics",
    "Documents",
    "Accessories",
    "Others",
  ];
  const locations = [
    "All",
    "Library",
    "Academic Block",
    "Cafeteria",
    "Sports Complex",
  ];

  const filteredItems = lostItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "All" || item.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className='min-h-screen bg-base-200 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-primary mb-4'>Lost Items</h1>
          <p className='text-base-content/70'>
            Browse through lost items or report your own lost item
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className='bg-base-100 rounded-lg shadow-sm p-4 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {/* Search Input */}
            <div className='relative'>
              <input
                type='text'
                placeholder='Search items...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='input input-bordered w-full pl-10'
              />
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='select select-bordered w-full'
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className='select select-bordered w-full'
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='select select-bordered w-full'
            >
              <option value='newest'>Newest First</option>
              <option value='oldest'>Oldest First</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className='mb-6'>
          <p className='text-base-content/70'>
            Found {sortedItems.length} item{sortedItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Items Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className='card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              <figure className='h-48'>
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-full h-full object-cover'
                />
              </figure>
              <div className='card-body'>
                <h2 className='card-title text-lg'>{item.title}</h2>
                <p className='text-base-content/70 text-sm line-clamp-2'>
                  {item.description}
                </p>
                <div className='space-y-2 mt-4'>
                  <div className='flex items-center gap-2 text-sm text-base-content/70'>
                    <FaTag className='text-primary' />
                    <span>{item.category}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-base-content/70'>
                    <FaMapMarkerAlt className='text-primary' />
                    <span>{item.location}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-base-content/70'>
                    <FaCalendarAlt className='text-primary' />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className='card-actions justify-end mt-4'>
                  <Link
                    to={`/lostItems/${item.id}`}
                    className='btn btn-primary btn-sm'
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedItems.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-lg text-base-content/70'>
              No items found matching your criteria
            </p>
          </div>
        )}

        {/* Report Lost Item Button */}
        <div className='fixed bottom-8 right-8'>
          <Link
            to='/report-lost-item'
            className='btn btn-primary btn-circle btn-lg shadow-lg'
          >
            <span className='text-2xl'>+</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LostItemsPage;
