import React, { useState, useEffect } from "react";
import { _backendAPI } from "../../APIs/api";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaIdCard,
} from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^[A-Za-z0-9]{8,}$/;

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
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Student ID is required";
    } else if (!phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid student ID";
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
      const response = await axios.post(_backendAPI + "/auth/register", {
        username: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        // Dispatch auth state change event
        window.dispatchEvent(new Event("authStateChange"));
        toast.success("Registration successful! You are now logged in.");
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

      setErrors({
        submit: errorMessage,
      });
      toast.error(errorMessage);
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
    <div className='min-h-screen pt-24 pb-4 flex items-center justify-center bg-base-200 px-4'>
      <div className='w-full max-w-xl bg-base-100 rounded border border-base-300'>
        <div className='p-8'>
          <h2 className='text-2xl font-semibold text-base-content text-center mb-8'>
            Create Account
          </h2>

          {errors.submit && (
            <div className='bg-error/10 border border-error/20 text-error px-4 py-3 rounded mb-6'>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Full Name Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-base-content'>
                Full Name
              </label>
              <div className='flex items-center gap-2 border border-base-300 rounded px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'>
                <FaUser className='text-base-content/50 flex-shrink-0' />
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  className={`w-full bg-transparent outline-none text-base-content placeholder-base-content/50 ${
                    errors.fullName ? "text-error" : ""
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className='text-sm text-error mt-1'>{errors.fullName}</p>
              )}
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-base-content'>
                Email
              </label>
              <div className='flex items-center gap-2 border border-base-300 rounded px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'>
                <FaEnvelope className='text-base-content/50 flex-shrink-0' />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  className={`w-full bg-transparent outline-none text-base-content placeholder-base-content/50 ${
                    errors.email ? "text-error" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className='text-sm text-error mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-base-content'>
                Phone Number
              </label>
              <div className='flex items-center gap-2 border border-base-300 rounded px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'>
                <FaIdCard className='text-base-content/50 flex-shrink-0' />
                <input
                  type='text'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder='Enter your Phone Number'
                  required
                  className={`w-full bg-transparent outline-none text-base-content placeholder-base-content/50 ${
                    errors.phoneNumber ? "text-error" : ""
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className='text-sm text-error mt-1'>{errors.phoneNumber}</p>
              )}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-base-content'>
                Password
              </label>
              <div className='flex items-center gap-2 border border-base-300 rounded px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'>
                <FaLock className='text-base-content/50 flex-shrink-0' />
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Create a password'
                  className={`w-full bg-transparent outline-none text-base-content placeholder-base-content/50 ${
                    errors.password ? "text-error" : ""
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='text-base-content/50 hover:text-base-content flex-shrink-0'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className='text-sm text-error mt-1'>{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-base-content'>
                Confirm Password
              </label>
              <div className='flex items-center gap-2 border border-base-300 rounded px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'>
                <FaLock className='text-base-content/50 flex-shrink-0' />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm your password'
                  className={`w-full bg-transparent outline-none text-base-content placeholder-base-content/50 ${
                    errors.confirmPassword ? "text-error" : ""
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='text-base-content/50 hover:text-base-content flex-shrink-0'
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-sm text-error mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className='space-y-2'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  className='rounded border-base-300 text-primary focus:ring-primary'
                  required
                />
                <span className='text-sm text-base-content/70'>
                  I agree to the{" "}
                  <Link
                    to='/terms'
                    className='text-primary hover:text-primary/80 hover:underline'
                  >
                    Terms and Conditions
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className={`w-full bg-primary text-primary-content py-2 px-4 rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className='text-center mt-8'>
            <span className='text-base-content/70'>
              Already have an account?{" "}
            </span>
            <Link
              to='/login'
              className='text-primary hover:text-primary/80 hover:underline'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
