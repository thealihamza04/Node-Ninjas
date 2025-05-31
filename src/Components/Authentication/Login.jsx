import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { _backendAPI } from "../../APIs/api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const response = await axios.post(_backendAPI + "/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Welcome back!");
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      console.log(error);
      // toast.error(errorMessage);
      setErrors({
        submit: errorMessage,
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200 px-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body p-6 md:p-8'>
          <h2 className='text-2xl font-bold text-center mb-6'>Welcome Back</h2>

          {errors.submit && (
            <div className='alert alert-error mb-4'>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
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
                  placeholder='Enter your password'
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

            <div className='flex items-center justify-between'>
              <label className='label cursor-pointer'>
                <input type='checkbox' className='checkbox checkbox-sm mr-2' />
                <span className='label-text'>Remember me</span>
              </label>
              <Link
                to='/forgot-password'
                className='text-sm text-primary hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className='text-center mt-6'>
            <span className='text-base-content/70'>
              Don't have an account?{" "}
            </span>
            <Link to='/register' className='text-primary hover:underline'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
