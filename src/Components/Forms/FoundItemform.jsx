import React, { useState } from 'react';
import { FiUpload, FiCalendar, FiMapPin, FiTag, FiPhone, FiFileText, FiImage, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

function FoundItemform() {
  const [formData, setFormData] = useState({
    category: '',
    contactInfo: '',
    createdAt: new Date().toISOString().split('T')[0],
    dateFound: '',
    description: '',
    imageUrl: '',
    location: '',
    name: '',
    type: 'FOUND'
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fieldVariants = {
    focused: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    unfocused: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <motion.div 
        className="max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0B3B5B] mb-2">Report Found Item</h2>
            <p className="text-[#2E7AB8]">Help return this item to its rightful owner</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div 
              className="form-control"
              variants={fieldVariants}
              animate={focusedField === 'name' ? 'focused' : 'unfocused'}
            >
              <label className="label">
                <span className="label-text font-medium text-[#0B3B5B]">Item Name</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter item name"
                  className="input input-bordered w-full pl-10 transition-all duration-300 hover:border-[#2E7AB8] focus:border-[#2E7AB8] focus:ring-2 focus:ring-[#2E7AB8]/20"
                  required
                />
                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7AB8] group-hover:text-[#0B3B5B] transition-colors duration-300" />
              </div>
            </motion.div>

            {/* Category and Date Found Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Field */}
              <motion.div 
                className="form-control"
                variants={fieldVariants}
                animate={focusedField === 'category' ? 'focused' : 'unfocused'}
              >
                <label className="label">
                  <span className="label-text font-medium text-[#0B3B5B]">Category</span>
                </label>
                <div className="relative group">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('category')}
                    onBlur={() => setFocusedField(null)}
                    className="select select-bordered w-full pl-10 transition-all duration-300 hover:border-[#2E7AB8] focus:border-[#2E7AB8] focus:ring-2 focus:ring-[#2E7AB8]/20"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="documents">Documents</option>
                    <option value="accessories">Accessories</option>
                    <option value="clothing">Clothing</option>
                    <option value="other">Other</option>
                  </select>
                  <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7AB8] group-hover:text-[#0B3B5B] transition-colors duration-300" />
                </div>
              </motion.div>

              {/* Date Found Field */}
              <motion.div 
                className="form-control"
                variants={fieldVariants}
                animate={focusedField === 'dateFound' ? 'focused' : 'unfocused'}
              >
                <label className="label">
                  <span className="label-text font-medium text-[#0B3B5B]">Date Found</span>
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    name="dateFound"
                    value={formData.dateFound}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('dateFound')}
                    onBlur={() => setFocusedField(null)}
                    className="input input-bordered w-full pl-10 transition-all duration-300 hover:border-[#2E7AB8] focus:border-[#2E7AB8] focus:ring-2 focus:ring-[#2E7AB8]/20"
                    required
                  />
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7AB8] group-hover:text-[#0B3B5B] transition-colors duration-300" />
                </div>
              </motion.div>
            </div>

            {/* Location and Contact Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Field */}
              <motion.div 
                className="form-control"
                variants={fieldVariants}
                animate={focusedField === 'location' ? 'focused' : 'unfocused'}
              >
                <label className="label">
                  <span className="label-text font-medium text-[#0B3B5B]">Location Found</span>
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('location')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter location where item was found"
                    className="input input-bordered w-full pl-10 transition-all duration-300 hover:border-[#2E7AB8] focus:border-[#2E7AB8] focus:ring-2 focus:ring-[#2E7AB8]/20"
                    required
                  />
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7AB8] group-hover:text-[#0B3B5B] transition-colors duration-300" />
                </div>
              </motion.div>

              {/* Contact Info Field */}
              <motion.div 
                className="form-control"
                variants={fieldVariants}
                animate={focusedField === 'contactInfo' ? 'focused' : 'unfocused'}
              >
                <label className="label">
                  <span className="label-text font-medium text-[#0B3B5B]">Contact Information</span>
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('contactInfo')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your contact information"
                    className="input input-bordered w-full pl-10 transition-all duration-300 hover:border-[#2E7AB8] focus:border-[#2E7AB8] focus:ring-2 focus:ring-[#2E7AB8]/20"
                    required
                  />
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7AB8] group-hover:text-[#0B3B5B] transition-colors duration-300" />
                </div>
              </motion.div>
            </div>

            {/* Description Field */}
            <motion.div 
              className="form-control"
              variants={fieldVariants}
              animate={focusedField === 'description' ? 'focused' : 'unfocused'}
            >
              <label className="label">
                <span className="label-text font-medium text-[#0B3B5B]">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                placeholder="Provide detailed description of the item (color, brand, distinguishing features, etc.)"
                className="textarea textarea-bordered h-32 transition-all duration-300 hover:border-[#2E7AB8] focus:border-[#2E7AB8] focus:ring-2 focus:ring-[#2E7AB8]/20"
                required
              />
            </motion.div>

            {/* Image Upload Field */}
            <motion.div 
              className="form-control"
              variants={fieldVariants}
              animate={focusedField === 'imageUrl' ? 'focused' : 'unfocused'}
            >
              <label className="label">
                <span className="label-text font-medium text-[#0B3B5B]">Image</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('imageUrl')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter image URL"
                  className="input input-bordered w-full pl-10 transition-all duration-300 hover:border-[#2E7AB8] focus:border-[#2E7AB8] focus:ring-2 focus:ring-[#2E7AB8]/20"
                />
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7AB8] group-hover:text-[#0B3B5B] transition-colors duration-300" />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="btn bg-[#0B3B5B] hover:bg-[#2E7AB8] text-white w-full mt-8 gap-2 hover:scale-[1.02] transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiUpload className="w-5 h-5" />
              Submit Found Item
            </motion.button>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-[#2E7AB8] flex items-center justify-center gap-2">
          <FiAlertCircle className="w-4 h-4" />
          <span>All fields marked with * are required</span>
        </div>
      </motion.div>
    </div>
  );
}

export default FoundItemform;
