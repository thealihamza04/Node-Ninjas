import React from 'react';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import Tiles from './Components/Tiles';
import Activities from './Components/Activities';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Admin Badge */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-700">UMT Lost & Found</h1>
              <span className="px-3 py-1 text-sm text-red-700 bg-red-50 rounded-full">
                Admin
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              <a href="/lost-items" className="text-blue-600 hover:text-blue-800">
                Lost Items
              </a>
              <a href="/found-items" className="text-blue-600 hover:text-blue-800">
                Found Items
              </a>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiUser className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <a href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </a>
        </div>

        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="mt-2 text-gray-600">Manage and monitor the Lost & Found system</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b">
          <nav className="flex gap-8">
            <a href="#" className="px-1 py-4 text-blue-600 border-b-2 border-blue-600 -mb-px">
              Overview
            </a>
            <a href="#" className="px-1 py-4 text-gray-500 hover:text-gray-700">
              Manage Items
            </a>
            <a href="#" className="px-1 py-4 text-gray-500 hover:text-gray-700">
              Reports
            </a>
            <a href="#" className="px-1 py-4 text-gray-500 hover:text-gray-700">
              Users
            </a>
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          <Tiles />
          <Activities />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
