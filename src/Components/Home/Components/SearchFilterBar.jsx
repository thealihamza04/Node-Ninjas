import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaFilter, FaTimes, FaChevronDown } from "react-icons/fa";
import { useContext } from "react";
import ItemsContext from "../../../context/items/ItemsContext";

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full h-12 sm:h-14 px-3 sm:px-4 bg-base-200 rounded-lg text-left hover:bg-base-300 transition-colors'
      >
        <span className='text-base sm:text-lg truncate'>
          {value || placeholder}
        </span>
        <div
          className={`flex-shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <FaChevronDown className='text-primary w-3 h-3 sm:w-4 sm:h-4' />
        </div>
      </button>

      {isOpen && (
        <div className='absolute z-50 w-full mt-2 bg-base-100 rounded-lg shadow-lg'>
          <div className='max-h-[200px] overflow-y-auto custom-scrollbar'>
            {options.map((option) => (
              <button
                key={option}
                type='button'
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-base-200 transition-colors text-sm sm:text-base ${
                  value === option ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <span className='block truncate'>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchFilterBar = () => {
  const { filters, updateFilter, categories, locations } =
    useContext(ItemsContext);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Search is now handled automatically through context
  };

  return (
    <div className='card bg-base-100 shadow-sm max-w-4xl mx-auto mb-8'>
      <div className='card-body p-3 sm:p-4'>
        <form onSubmit={handleSearch} className='space-y-3'>
          {/* Search Bar */}
          <div className='flex items-center gap-2 bg-base-200 rounded-lg p-2'>
            <div className='flex items-center justify-center w-8 h-8 text-primary'>
              <FaSearch className='w-4 h-4' />
            </div>
            <input
              type='text'
              placeholder='Search for items...'
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className='flex-1 bg-transparent border-none focus:outline-none text-base'
            />
            {filters.searchTerm && (
              <button
                onClick={() => updateFilter("searchTerm", "")}
                className='btn btn-ghost btn-circle btn-sm'
              >
                <FaTimes className='w-3 h-3' />
              </button>
            )}
          </div>

          {/* Filter Toggle Button - Mobile Only */}
          {isMobile && (
            <button
              type='button'
              onClick={() => setShowFilters(!showFilters)}
              className='btn btn-ghost btn-sm w-full text-sm'
            >
              <FaFilter className='mr-2 w-3 h-3' />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          )}

          {/* Filters */}
          {(!isMobile || showFilters) && (
            <div className='space-y-3 md:space-y-0 md:flex md:gap-3'>
              <CustomDropdown
                options={categories}
                value={filters.category}
                onChange={(value) => updateFilter("category", value)}
                placeholder='Select Category'
              />

              <CustomDropdown
                options={locations}
                value={filters.location}
                onChange={(value) => updateFilter("location", value)}
                placeholder='Select Location'
              />

              <button
                type='submit'
                className='btn btn-primary w-full md:w-auto h-10 text-sm'
              >
                Search
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Add this CSS to your global styles or component
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default SearchFilterBar;
