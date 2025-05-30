import React from "react";

const LatestListing = () => {
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

  const ItemCard = ({ item, type }) => (
    <div className='card bg-base-100 border border-base-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 max-w-sm'>
      <figure className='h-32 overflow-hidden'>
        <img
          src={item.image}
          alt={item.title}
          className='w-full h-full object-cover'
        />
      </figure>
      <div className='card-body p-3'>
        <div className='flex items-center justify-between mb-1'>
          <h3 className='text-sm font-medium text-base-content'>
            {item.title}
          </h3>
          <span
            className={`text-xs ${
              type === "lost" ? "text-error" : "text-success"
            }`}
          >
            {type === "lost" ? "Lost" : "Found"}
          </span>
        </div>
        <div className='text-xs text-base-content/70 space-y-0.5 mb-2'>
          <p>
            {item.category} • {item.location}
          </p>
          <p>{new Date(item.date).toLocaleDateString()}</p>
        </div>
        <a
          href={`/${type}-items/${item.id}`}
          className='btn btn-outline btn-primary btn-xs w-full'
        >
          View Details
        </a>
      </div>
    </div>
  );

  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Lost Items Section */}
        <div>
          <div className='flex items-center gap-4 mb-6'>
            <h2 className='text-xl font-medium text-base-content'>
              Lost Items
            </h2>
            <div className='h-px flex-1 bg-base-300'></div>
            <a
              href='/lost-items'
              className='text-xs text-primary hover:underline'
            >
              View All →
            </a>
          </div>
          <div className='grid gap-4'>
            {lostItems.map((item) => (
              <ItemCard key={item.id} item={item} type='lost' />
            ))}
          </div>
        </div>

        {/* Found Items Section */}
        <div>
          <div className='flex items-center gap-4 mb-6'>
            <h2 className='text-xl font-medium text-base-content'>
              Found Items
            </h2>
            <div className='h-px flex-1 bg-base-300'></div>
            <a
              href='/found-items'
              className='text-xs text-primary hover:underline'
            >
              View All →
            </a>
          </div>
          <div className='grid gap-4'>
            {foundItems.map((item) => (
              <ItemCard key={item.id} item={item} type='found' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestListing;
