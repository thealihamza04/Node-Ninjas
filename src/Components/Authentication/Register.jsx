import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaIdCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const studentIdRegex = /^[A-Za-z0-9]{8,}$/;

    // Full Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Student ID Validation
    if (!formData.studentId) {
      newErrors.studentId = "Student ID is required";
    } else if (!studentIdRegex.test(formData.studentId)) {
      newErrors.studentId = "Please enter a valid student ID";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual registration logic here
      console.log("Registration attempt with:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setErrors({
        submit: "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200 px-4 py-8'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body p-6 md:p-8'>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Create Account
          </h2>

          {errors.submit && (
            <div className='alert alert-error mb-4'>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Full Name Field */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <div className='relative'>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  className={`input input-bordered w-full pl-10 ${
                    errors.fullName ? "input-error" : ""
                  }`}
                />
                <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
              </div>
              {errors.fullName && (
                <label className='label'>
                  <span className='label-text-alt text-error'>
                    {errors.fullName}
                  </span>
                </label>
              )}
            </div>

            {/* Email Field */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <div className='relative'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                />
                <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
              </div>
              {errors.email && (
                <label className='label'>
                  <span className='label-text-alt text-error'>
                    {errors.email}
                  </span>
                </label>
              )}
            </div>

            {/* Student ID Field */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Student ID</span>
              </label>
              <div className='relative'>
                <input
                  type='text'
                  name='studentId'
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder='Enter your student ID'
                  className={`input input-bordered w-full pl-10 ${
                    errors.studentId ? "input-error" : ""
                  }`}
                />
                <FaIdCard className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
              </div>
              {errors.studentId && (
                <label className='label'>
                  <span className='label-text-alt text-error'>
                    {errors.studentId}
                  </span>
                </label>
              )}
            </div>

            {/* Password Field */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Create a password'
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <label className='label'>
                  <span className='label-text-alt text-error'>
                    {errors.password}
                  </span>
                </label>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Confirm Password</span>
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm your password'
                  className={`input input-bordered w-full pl-10 ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                />
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50' />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content'
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <label className='label'>
                  <span className='label-text-alt text-error'>
                    {errors.confirmPassword}
                  </span>
                </label>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  className='checkbox checkbox-sm mr-2'
                  required
                />
                <span className='label-text'>
                  I agree to the{" "}
                  <Link to='/terms' className='text-primary hover:underline'>
                    Terms and Conditions
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className='text-center mt-6'>
            <span className='text-base-content/70'>
              Already have an account?{" "}
            </span>
            <Link to='/login' className='text-primary hover:underline'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
