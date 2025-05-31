import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ItemsContext from "../../context/items/ItemsContext";
import { _backendAPI } from "../../APIs/api";
import axios from "axios";

const ItemClaimForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allItems, setAllItems } = useContext(ItemsContext);
  const [formData, setFormData] = useState({
    reason: "",
    contactInfo: "",
  });
  const [loading, setLoading] = useState(false);

  // Get item details
  const item = allItems.find((item) => item._id === id);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Please login to claim an item");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${_backendAPI}/api/items/${id}/claim`,
        {
          ...formData,
          userId,
        }
      );

      if (response.data.success) {
        // Update the item in the context
        const updatedItems = allItems.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "pending",
                responses: (item.responses || 0) + 1,
              }
            : item
        );
        setAllItems(updatedItems);

        toast.success("Claim request submitted successfully");
        navigate(`/itemdetail/${id}`);
      }
    } catch (error) {
      console.error("Error claiming item:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit claim request"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className='min-h-screen pt-24 flex items-center justify-center bg-base-200 px-4'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-base-content'>
            Item not found
          </h2>
          <p className='text-base-content/70 mt-2'>
            The item you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-24 flex items-center justify-center bg-base-200 px-4'>
      <div className='w-full max-w-md bg-base-100 rounded-lg border border-base-300 p-6'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-base-content text-center'>
            Claim Item
          </h2>
          <p className='text-base-content/70 text-center mt-2'>
            Please provide details about why you believe this item belongs to
            you
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Item Details */}
          <div className='p-4 bg-base-200 rounded-lg border border-base-300'>
            <h3 className='font-medium text-base-content'>{item.name}</h3>
            <p className='text-sm text-base-content/70 mt-1'>
              {item.description}
            </p>
          </div>

          {/* Reason Field */}
          <div>
            <label
              htmlFor='reason'
              className='block text-sm font-medium text-base-content mb-1'
            >
              Reason for Claim
            </label>
            <textarea
              id='reason'
              name='reason'
              rows='4'
              required
              value={formData.reason}
              onChange={handleChange}
              placeholder='Please explain why you believe this item belongs to you...'
              className='w-full px-3 py-2 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
            />
          </div>

          {/* Contact Information */}
          <div>
            <label
              htmlFor='contactInfo'
              className='block text-sm font-medium text-base-content mb-1'
            >
              Contact Information
            </label>
            <input
              type='text'
              id='contactInfo'
              name='contactInfo'
              required
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder='Phone number or email for contact'
              className='w-full px-3 py-2 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full btn btn-primary'
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Claim"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemClaimForm;
