import React, { useState } from 'react';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import Tiles from './Components/Tiles';
import Activities from './Components/Activities';
import ManageItems from './Components/ManageItems';
import Report from './Components/Report';
import User from './Components/User';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Tiles />
            <Activities />
          </div>
        );
      case 'manage':
        return <ManageItems />;
      case 'reports':
        return <Report />;
      case 'users':
        return <User />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#e9f0ff]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
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
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <a href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </a>
        </div>

        {/* Dashboard Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#1E3A8A]">Admin Dashboard</h2>
          <p className="mt-2 text-gray-600">Manage and monitor the Lost & Found system</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-1 py-4 ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-1 py-4 ${
                activeTab === 'manage'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Items
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-1 py-4 ${
                activeTab === 'reports'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-1 py-4 ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Users
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="w-full overflow-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
