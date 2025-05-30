import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

const FoundItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with actual data from your backend
  const foundItems = [
    {
      id: 1,
      title: "MacBook Pro",
      category: "Electronics",
      location: "Library",
      date: "2024-03-15",
      description:
        "Found a MacBook Pro in the library's study area. It was left on a table near the entrance.",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    },
    {
      id: 2,
      title: "Student ID Card",
      category: "Documents",
      location: "Academic Block",
      date: "2024-03-14",
      description:
        "Found a student ID card in the Academic Block, near Room 302.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    // Add more sample items as needed
  ];

  const categories = [
    "All",
    "Electronics",
    "Books",
    "Clothing",
    "Accessories",
    "Documents",
    "Others",
  ];

  const locations = [
    "All",
    "Academic Block",
    "Library",
    "Cafeteria",
    "Sports Complex",
    "Hostel",
    "Parking Area",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
  ];

  const filteredItems = foundItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesLocation =
        selectedLocation === "All" || item.location === selectedLocation;
      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const ItemCard = ({ item }) => (
    <div className='card bg-base-100 border border-base-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300'>
      <figure className='h-48 overflow-hidden'>
        <img
          src={item.image}
          alt={item.title}
          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
        />
      </figure>
      <div className='card-body p-4'>
        <h3 className='card-title text-lg font-semibold'>{item.title}</h3>
        <div className='space-y-2 text-sm text-base-content/70 mt-2'>
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
        <p className='text-sm text-base-content/80 mt-2 line-clamp-2'>
          {item.description}
        </p>
        <div className='card-actions justify-end mt-4'>
          <button className='btn btn-primary btn-sm'>View Details</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-base-200 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <h1 className='text-3xl font-bold'>Found Items</h1>
          <button
            className='btn btn-outline btn-sm md:hidden'
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className='mr-2' />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className={`${showFilters ? "block" : "hidden"} md:block mb-8`}>
          <div className='card bg-base-100 shadow-sm'>
            <div className='card-body p-4'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {/* Search Input */}
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Search items...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='input input-bordered w-full pl-10'
                  />
                  <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
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

                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='select select-bordered w-full'
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className='mb-6'>
          <p className='text-base-content/70'>
            Found {filteredItems.length} item
            {filteredItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Items Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-lg text-base-content/70'>
              No items found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItems;
