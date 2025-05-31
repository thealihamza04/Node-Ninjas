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
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    setImageError(true);
  };

  return (
    <div className='min-h-screen py-28 md:py-24 lg:py-28'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className='inline-flex items-center text-primary hover:text-primary-focus mb-4 sm:mb-6'
        >
          <FaArrowLeft className='mr-2' />
          Back to Items
        </button>

        <div className='bg-base-100 overflow-hidden rounded-lg shadow-sm'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6'>
            {/* Single Image */}
            <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden'>
              <img
                src={imageError ? "/public/loadingImg.jpg" : itemData.imageUrl}
                alt={itemData.name}
                className='w-full h-full object-cover object-center'
                onError={handleImageError}
              />
            </div>

            {/* Item Details */}
            <div className='space-y-4 sm:space-y-6 p-2 sm:p-4'>
              <div>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4'>
                  <h1 className='text-2xl sm:text-3xl font-bold text-base-content'>
                    {itemData.name}
                  </h1>
                  <span
                    className={`badge ${
                      itemData.type === "lost" ? "badge-error" : "badge-success"
                    } self-start sm:self-center`}
                  >
                    {itemData.type}
                  </span>
                </div>
                <p className='text-base-content/70 mt-2 text-sm sm:text-base'>
                  {itemData.description}
                </p>
              </div>

              {/* Key Details */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-base-200/50 p-3 sm:p-4 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <FaTag className='text-primary flex-shrink-0' />
                  <span className='text-sm sm:text-base'>
                    {itemData.category}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaMapMarkerAlt className='text-primary flex-shrink-0' />
                  <span className='text-sm sm:text-base'>
                    {itemData.location}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <FaCalendarAlt className='text-primary flex-shrink-0' />
                  <span className='text-sm sm:text-base'>
                    {new Date(itemData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              {itemData.contactInfo && (
                <div className='mt-4 sm:mt-6 bg-base-200/50 p-3 sm:p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold mb-3'>
                    Contact Information
                  </h3>
                  <div className='space-y-2'>
                    {itemData.contactInfo.name && (
                      <div className='flex items-center gap-2'>
                        <FaUser className='text-primary flex-shrink-0' />
                        <span className='text-sm sm:text-base'>
                          {itemData.contactInfo.name}
                        </span>
                      </div>
                    )}
                    {itemData.contactInfo.phone && (
                      <div className='flex items-center gap-2'>
                        <FaPhone className='text-primary flex-shrink-0' />
                        <span className='text-sm sm:text-base'>
                          {itemData.contactInfo.phone}
                        </span>
                      </div>
                    )}
                    {itemData.contactInfo.email && (
                      <div className='flex items-center gap-2'>
                        <FaEnvelope className='text-primary flex-shrink-0' />
                        <span className='text-sm sm:text-base'>
                          {itemData.contactInfo.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Claim Button */}
              {itemData.type === "found" && (
                <button
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className='btn btn-primary w-full mt-4 sm:mt-6'
                >
                  {isClaiming ? "Processing..." : "Claim This Item"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
