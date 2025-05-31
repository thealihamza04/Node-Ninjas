import React, { useState } from "react";
import {
  FiUpload,
  FiCalendar,
  FiMapPin,
  FiTag,
  FiFileText,
  FiImage,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { _backendAPI } from "../../APIs/api";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUserEmailFromToken } from "../../../Auth/authutils";

function FoundItemform() {
  const user_email = getUserEmailFromToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dateLostFound: "",
    description: "",
    location: "",
    imageUrl: "",
    user_email: "",
    type: "Found",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to report a found item");
        navigate("/login");
        return;
      }

      // If there's an image, upload it to Cloudinary first
      let imageUrl = formData.imageUrl;
      if (selectedImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", selectedImage);
        imageFormData.append("upload_preset", "courseImages");

        try {
          const cloudinaryRes = await axios.post(
            "https://api.cloudinary.com/v1_1/ds2q0itb6/image/upload",
            imageFormData
          );
          imageUrl = cloudinaryRes.data.secure_url;
          console.log("Image uploaded successfully:", imageUrl);
          toast.success("Image uploaded successfully");
        } catch (error) {
          console.error("Cloudinary upload failed:", error);
          toast.error("Failed to upload image. Please try again.");
          return;
        }
      }

      // Submit the item with the image URL
      const response = await axios.post(`${_backendAPI}/api/item`, {
        ...formData,
        imageUrl,
      });

      console.log("Item submitted successfully:", response.data);
      toast.success("Found item reported successfully!");

      setFormData({
        name: "",
        category: "",
        dateLostFound: "",
        description: "",
        location: "",
        user_email: user_email,
        imageUrl: "",
        type: "Found",
      });
      setSelectedImage(null);
      setImagePreview(null);

      navigate("/found");
    } catch (err) {
      console.error("Error submitting item:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to submit item. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen pb-4 pt-24 flex items-center justify-center bg-base-200 px-4'>
      <div className='w-full max-w-2xl bg-base-100 rounded-lg border border-base-300 p-6'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-base-content text-center'>
            Report Found Item
          </h2>
          <p className='text-base-content/70 text-center mt-2'>
            Help return this item to its rightful owner
          </p>
        </div>

        {error && (
          <div className='mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name Field */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-base-content mb-1'
            >
              Item Name
            </label>
            <div className='relative'>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter item name'
                className='w-full pl-10 px-3 py-2 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                required
              />
              <FiTag className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
            </div>
          </div>

          {/* Category and Date Found Fields Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Category Field */}
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-base-content mb-1'
              >
                Category
              </label>
              <div className='relative'>
                <select
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className='w-full pl-10 px-3 py-2 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                  required
                >
                  <option value=''>Select a category</option>
                  <option value='electronics'>Electronics</option>
                  <option value='documents'>Documents</option>
                  <option value='accessories'>Accessories</option>
                  <option value='clothing'>Clothing</option>
                  <option value='other'>Other</option>
                </select>
                <FiFileText className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
              </div>
            </div>

            {/* Date Found Field */}
            <div>
              <label
                htmlFor='dateLostFound'
                className='block text-sm font-medium text-base-content mb-1'
              >
                Date Found
              </label>
              <div className='relative'>
                <input
                  type='date'
                  id='dateLostFound'
                  name='dateLostFound'
                  value={formData.dateLostFound}
                  onChange={handleChange}
                  className='w-full pl-10 px-3 py-2 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                  required
                />
                <FiCalendar className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
              </div>
            </div>
          </div>

          {/* Location Field */}
          <div>
            <label
              htmlFor='location'
              className='block text-sm font-medium text-base-content mb-1'
            >
              Location Found
            </label>
            <div className='relative'>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                placeholder='Enter location where item was found'
                className='w-full pl-10 px-3 py-2 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                required
              />
              <FiMapPin className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-base-content mb-1'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Provide detailed description of the item (color, brand, distinguishing features, etc.)'
              className='w-full px-3 py-2 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-32'
              required
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label
              htmlFor='image-upload'
              className='block text-sm font-medium text-base-content mb-1'
            >
              Item Image
            </label>
            <div className='space-y-4'>
              {/* Image Preview */}
              {imagePreview && (
                <div className='relative w-full max-w-xs mx-auto'>
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='w-full h-48 object-cover rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={removeImage}
                    className='absolute top-2 right-2 p-1 bg-error text-white rounded-full hover:bg-error/90 transition-colors'
                  >
                    <FiX className='w-4 h-4' />
                  </button>
                </div>
              )}

              {/* File Input */}
              <div className='relative'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                  id='image-upload'
                />
                <label
                  htmlFor='image-upload'
                  className='flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-base-300 rounded-lg cursor-pointer hover:bg-base-200 transition-colors'
                >
                  <FiImage className='w-5 h-5 text-base-content/50' />
                  <span className='text-base-content/70'>
                    {selectedImage ? "Change Image" : "Upload Image"}
                  </span>
                </label>
              </div>
              <p className='text-sm text-base-content/50 text-center'>
                Max file size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full btn btn-primary mt-6'
          >
            {isSubmitting ? (
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
              <span className='flex items-center justify-center gap-2'>
                <FiUpload className='w-5 h-5' />
                Submit Found Item
              </span>
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className='mt-6 text-center text-base-content/70 flex items-center justify-center gap-2'>
          <FiAlertCircle className='w-4 h-4' />
          <span>All fields marked with * are required</span>
        </div>
      </div>
    </div>
  );
}

export default FoundItemform;
