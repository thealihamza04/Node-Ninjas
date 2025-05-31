import React from "react";

const ItemCardSkelton = () => {
  return (
    <div className='card bg-base-100 shadow-sm animate-pulse'>
      {/* Image Skeleton */}
      <div className='relative h-48 bg-base-300 rounded-t-lg'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-12 h-12 rounded-full bg-base-200'></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='card-body p-4'>
        {/* Title Skeleton */}
        <div className='h-6 bg-base-300 rounded w-3/4 mb-2'></div>

        {/* Category and Location Skeleton */}
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-base-300 rounded'></div>
            <div className='h-4 bg-base-300 rounded w-1/3'></div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-base-300 rounded'></div>
            <div className='h-4 bg-base-300 rounded w-1/2'></div>
          </div>
        </div>

        {/* Date Skeleton */}
        <div className='mt-2'>
          <div className='h-4 bg-base-300 rounded w-1/4'></div>
        </div>

        {/* Button Skeleton */}
        <div className='card-actions justify-end mt-4'>
          <div className='h-10 bg-base-300 rounded w-24'></div>
        </div>
      </div>
    </div>
  );
};

export default ItemCardSkelton;
