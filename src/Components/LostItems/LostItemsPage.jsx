import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../Home/Components/ItemCard";
import SearchFilterBar from "../Home/Components/SearchFilterBar";
import { useContext } from "react";
import ItemsContext from "../../context/items/ItemsContext";

const LostItemsPage = () => {
  const [sortBy, setSortBy] = useState("newest");
  const { lostItems, filters, updateFilter, filterItems } =
    useContext(ItemsContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const filteredItems = filterItems(lostItems);
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className='min-h-screen pt-24 bg-base-200 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
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

        <SearchFilterBar />

        <div className='mb-6 flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-primary'></div>
          <p className='text-base-content/70'>
            Found {sortedItems.length} item{sortedItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedItems.map((item) => (
            <ItemCard key={item._id} item={item} type='lost' />
          ))}
        </div>

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
