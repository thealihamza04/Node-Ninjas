import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";

const ItemDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isClaiming, setIsClaiming] = useState(false);

  // Get item data from location state
  const itemData = location.state?.itemData;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // Redirect if no data is available
  useEffect(() => {
    if (!itemData) {
      navigate("/");
    }
  }, [itemData, navigate]);

  if (!itemData) {
    return null;
  }

  const handleClaim = () => {
    setIsClaiming(true);
    // Add your claim logic here
  };

  return (
    <div className='min-h-screen py-28'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className='inline-flex items-center text-primary hover:text-primary-focus mb-6'
        >
          <FaArrowLeft className='mr-2' />
          Back to Items
        </button>

        <div className='bg-base-100 overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-6'>
            {/* Single Image */}
            <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
              <img
                src={itemData.imageUrl}
                alt={itemData.name}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Item Details */}
            <div className='space-y-6'>
              <div>
                <div className='flex items-center justify-between'>
                  <h1 className='text-3xl font-bold text-base-content'>
                    {itemData.name}
                  </h1>
                  <span
                    className={`badge ${
                      itemData.type === "lost" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {itemData.type}
                  </span>
                </div>
                <p className='text-base-content/70 mt-2'>
                  {itemData.description}
                </p>
              </div>

              {/* Key Details */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <FaTag className='text-primary' />
                  <span>{itemData.category}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaMapMarkerAlt className='text-primary' />
                  <span>{itemData.location}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaCalendarAlt className='text-primary' />
                  <span>
                    {new Date(itemData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              {itemData.contactInfo && (
                <div className='bg-base-200 rounded-lg p-4'>
                  <h3 className='font-semibold mb-3'>Contact Information</h3>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <FaEnvelope className='text-primary' />
                      <a
                        href={`mailto:${itemData.contactInfo}`}
                        className='hover:text-primary'
                      >
                        {itemData.contactInfo}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex gap-4'>
                <button
                  onClick={handleClaim}
                  className='btn btn-primary flex-1'
                  disabled={isClaiming}
                >
                  {isClaiming ? "Processing..." : "Claim This Item"}
                </button>
                <button className='btn btn-outline flex-1'>Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
