import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

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
        // Dispatch auth state change event
        window.dispatchEvent(new Event("authStateChange"));
        toast.success("Login successful! Welcome back!");
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.log("er", error);
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
    <div className='min-h-screen pt-24 pb-4 flex items-center justify-center bg-base-200 px-4'>
      <div className='w-full max-w-md bg-base-100 rounded border border-base-300'>
        <div className='p-8'>
          <h2 className='text-2xl font-semibold text-base-content text-center mb-8'>
            Welcome Back
          </h2>

          {errors.submit && (
            <div className='bg-error/10 border border-error/20 text-error px-4 py-3 rounded mb-6'>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
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
                  placeholder='Enter your password'
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

            <div className='flex items-center justify-between'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  className='rounded border-base-300 text-primary focus:ring-primary'
                />
                <span className='text-sm text-base-content/70'>
                  Remember me
                </span>
              </label>
              <Link
                to='/forgot-password'
                className='text-sm text-primary hover:text-primary/80 hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              className={`w-full bg-primary text-primary-content py-2 px-4 rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className='text-center mt-8'>
            <span className='text-base-content/70'>
              Don't have an account?{" "}
            </span>
            <Link
              to='/register'
              className='text-primary hover:text-primary/80 hover:underline'
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
