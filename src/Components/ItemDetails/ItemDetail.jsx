import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  const [isClaiming, setIsClaiming] = useState(false);

  // Sample data - replace with actual data from your backend
  const item = {
    id: 1,
    title: "MacBook Pro",
    description:
      "Lost my MacBook Pro in the library. It has a black case with a Node.js sticker. The laptop is a 2023 model with a silver finish. It was last seen on the second floor of the library near the computer section.",
    category: "Electronics",
    location: "Library",
    date: "2024-03-15",
    status: "Lost",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    contactInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (234) 567-890",
    },
    additionalDetails: {
      brand: "Apple",
      model: "MacBook Pro 2023",
      color: "Silver",
      identifyingMarks: "Node.js sticker on the back",
    },
  };

  const handleClaim = () => {
    setIsClaiming(true);
    // Add your claim logic here
  };

  return (
    <div className='min-h-screen bg-base-200 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <Link
          to='/lostItems'
          className='inline-flex items-center text-primary hover:text-primary-focus mb-6'
        >
          <FaArrowLeft className='mr-2' />
          Back to Items
        </Link>

        <div className='bg-base-100 rounded-lg shadow-sm overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-6'>
            {/* Single Image */}
            <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Item Details */}
            <div className='space-y-6'>
              <div>
                <div className='flex items-center justify-between'>
                  <h1 className='text-3xl font-bold text-base-content'>
                    {item.title}
                  </h1>
                  <span
                    className={`badge ${
                      item.status === "Lost" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className='text-base-content/70 mt-2'>{item.description}</p>
              </div>

              {/* Key Details */}
              <div className='grid grid-cols-2 gap-4'>
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

              {/* Additional Details */}
              <div className='bg-base-200 rounded-lg p-4'>
                <h3 className='font-semibold mb-3'>Additional Details</h3>
                <div className='grid grid-cols-2 gap-4'>
                  {Object.entries(item.additionalDetails).map(
                    ([key, value]) => (
                      <div key={key}>
                        <span className='text-base-content/70 capitalize'>
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className='ml-2'>{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className='bg-base-200 rounded-lg p-4'>
                <h3 className='font-semibold mb-3'>Contact Information</h3>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <FaUser className='text-primary' />
                    <span>{item.contactInfo.name}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaEnvelope className='text-primary' />
                    <a
                      href={`mailto:${item.contactInfo.email}`}
                      className='hover:text-primary'
                    >
                      {item.contactInfo.email}
                    </a>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaPhone className='text-primary' />
                    <a
                      href={`tel:${item.contactInfo.phone}`}
                      className='hover:text-primary'
                    >
                      {item.contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

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
