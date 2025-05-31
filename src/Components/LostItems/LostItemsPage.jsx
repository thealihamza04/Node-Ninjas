import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../Home/Components/ItemCard";
import SearchFilterBar from "../Home/Components/SearchFilterBar";

const LostItemsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // Sample data - replace with actual data from your backend
  const lostItems = [
    {
      id: 1,
      title: "iPhone 13 Pro",
      description:
        "Lost my iPhone 13 Pro in the cafeteria. It has a blue case with a university logo sticker. Last seen near the coffee machine.",
      category: "Electronics",
      location: "Cafeteria",
      date: "2024-03-15",
      image:
        "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    },
    {
      id: 2,
      title: "Calculus Textbook",
      description:
        "Lost my Calculus textbook (3rd Edition) in the library. It has my name written on the first page and some notes in the margins.",
      category: "Books",
      location: "Library",
      date: "2024-03-14",
      image:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
    },
    {
      id: 3,
      title: "Wireless Earbuds",
      description:
        "Lost my white Samsung Galaxy Buds in the sports complex. They were in a small black case.",
      category: "Electronics",
      location: "Sports Complex",
      date: "2024-03-13",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    },
    {
      id: 4,
      title: "Student ID Card",
      description:
        "Lost my student ID card somewhere between the academic block and library. Name: John Smith, ID: 2024CS123",
      category: "Documents",
      location: "Academic Block",
      date: "2024-03-12",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 5,
      title: "Black Backpack",
      description:
        "Lost my black Nike backpack in the hostel common room. It has my laptop charger and some notebooks inside.",
      category: "Accessories",
      location: "Hostel",
      date: "2024-03-11",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
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
    <div className='min-h-screen pt-24 bg-base-200 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Introduction Section */}
        <div className='bg-base-100 rounded-lg p-6 mb-8 shadow-sm'>
          <div className='flex items-start gap-4'>
            <div className='bg-primary/10 p-3 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-primary'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-2'>Lost Something?</h2>
              <p className='text-base-content/70 mb-4'>
                Browse through the list of lost items or use the search and
                filters to find your item. If you don't see your item, click the
                "+" button to report a new lost item.
              </p>
              <div className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-primary'></div>
                  <span>Use search to find specific items</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-primary'></div>
                  <span>Filter by category and location</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-primary'></div>
                  <span>Click on items for more details</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <h1 className='text-3xl font-bold'>Lost Items</h1>
        </div>

        {/* Search and Filter Section */}
        <SearchFilterBar />

        {/* Results Count with Visual Feedback */}
        <div className='mb-6 flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-primary'></div>
          <p className='text-base-content/70'>
            Found {sortedItems.length} item{sortedItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Items Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} type='lost' />
          ))}
        </div>

        {/* No Results Message with Action */}
        {sortedItems.length === 0 && (
          <div className='text-center py-12 bg-base-100 rounded-lg shadow-sm'>
            <div className='mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 mx-auto text-base-content/30'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <p className='text-lg text-base-content/70 mb-4'>
              No items found matching your criteria.
            </p>
            <Link to='/report-lost-item' className='btn btn-primary btn-sm'>
              Report Lost Item
            </Link>
          </div>
        )}

        {/* Report Lost Item Button with Tooltip */}
        <div className='fixed bottom-8 right-8 group'>
          <Link
            to='/report-lost-item'
            className='btn btn-primary btn-circle btn-lg shadow-lg'
            aria-label='Report Lost Item'
          >
            <span className='text-2xl'>+</span>
          </Link>
          <div className='absolute bottom-full right-0 mb-2 px-3 py-2 bg-base-300 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
            Report Lost Item
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemsPage;
