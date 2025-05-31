import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ItemDetails = ({ item }) => (
  <div className='space-y-2 text-sm text-base-content/80'>
    <div className='flex items-center gap-2 p-2 bg-base-200 rounded-lg'>
      <FaTag className='text-primary' />
      <span>{item.category}</span>
    </div>
    <div className='flex items-center gap-2 p-2 bg-base-200 rounded-lg'>
      <FaMapMarkerAlt className='text-primary' />
      <span>{item.location}</span>
    </div>
    <div className='flex items-center gap-2 p-2 bg-base-200 rounded-lg'>
      <FaCalendarAlt className='text-primary' />
      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
    </div>
  </div>
);

const ItemCard = ({ item, type, className = "" }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/itemdetail/${item._id}`, {
      state: {
        itemData: {
          ...item,
          type: type,
        },
      },
    });
  };

  return (
    <div
      className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className='card-body p-4'>
        <div className='relative mb-3 rounded-xl overflow-hidden'>
          <img
            src={item.imageUrl}
            alt={item.name}
            className='w-full h-52 object-cover rounded-xl'
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/public/baloon.png";
            }}
          />
        </div>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-lg font-semibold text-base-content truncate'>
            {item.name}
          </h3>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              type === "lost"
                ? "bg-error/10 text-error"
                : "bg-success/10 text-success"
            }`}
          >
            {type === "lost" ? "Lost" : "Found"}
          </span>
        </div>
        <ItemDetails item={item} />
        <div className='mt-4'>
          <button
            onClick={handleViewDetails}
            className='btn btn-primary w-full'
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
