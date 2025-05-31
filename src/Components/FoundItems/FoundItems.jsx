import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";
import ItemCard from "../Home/Components/ItemCard";
import SearchFilterBar from "../Home/Components/SearchFilterBar";
import ItemsContext from "../../context/items/ItemsContext";
import ItemCardSkeleton from "../skeltons/ItemCardSkelton";

const FoundItems = () => {
  const { foundItems, filters, filterItems } = useContext(ItemsContext);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (foundItems.length > 0) {
      setIsLoading(false);
    }
  }, [foundItems]);

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
  ];

  const filteredItems = useMemo(() => {
    return filterItems(foundItems).sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.dateLost) - new Date(a.dateLost);
        case "oldest":
          return new Date(a.dateLost) - new Date(b.dateLost);
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [foundItems, filters, sortBy]);

  return (
    <div className='min-h-screen pt-24 bg-base-200 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Intro Section */}
        <section className='bg-base-100 rounded-lg p-6 mb-8 shadow-sm'>
          <div className='flex items-start gap-4'>
            <div className='bg-primary/10 p-3 rounded-full'>
              <FaSearch className='h-6 w-6 text-primary' />
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-2'>Found Something?</h2>
              <p className='text-base-content/70 mb-4'>
                Browse or search for items. If it's not listed, report a new
                one!
              </p>
              <ul className='flex flex-wrap gap-4 text-sm'>
                {[
                  "Use search to find specific items",
                  "Filter by category and location",
                  "Click on items for more details",
                ].map((text, i) => (
                  <li key={i} className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-primary'></span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
          <h1 className='text-3xl font-bold'>Found Items</h1>
        </div>

        {/* Search & Filters */}
        <SearchFilterBar />

        {/* Results Count */}
        <div className='mb-6 flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-primary'></div>
          <p className='text-base-content/70'>
            {isLoading
              ? "Loading items..."
              : `Found ${filteredItems.length} item${
                  filteredItems.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>

        {/* Items Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isLoading
            ? Array(6)
                .fill()
                .map((_, index) => <ItemCardSkeleton key={index} />)
            : filteredItems.map((item) => (
                <ItemCard key={item._id} item={item} type='found' />
              ))}
        </div>

        {/* No Results Message */}
        {!isLoading && filteredItems.length === 0 && (
          <div className='text-center py-12 bg-base-100 rounded-lg shadow-sm'>
            <FaTag className='h-12 w-12 mx-auto text-base-content/30 mb-4' />
            <p className='text-lg text-base-content/70 mb-4'>
              No items found matching your criteria.
            </p>
            <Link to='/report-found-item' className='btn btn-primary btn-sm'>
              Report Found Item
            </Link>
          </div>
        )}

        {/* Floating Button */}
        <div className='fixed bottom-8 right-8 group'>
          <Link
            to='/report-found-item'
            className='btn btn-primary btn-circle btn-lg shadow-lg'
            aria-label='Report Found Item'
          >
            <span className='text-2xl'>+</span>
          </Link>
          <div className='absolute bottom-full right-0 mb-2 px-3 py-2 bg-base-300 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
            Report Found Item
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItems;
