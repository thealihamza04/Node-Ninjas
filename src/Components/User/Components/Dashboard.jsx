import React, { useState } from 'react';
import MyRequest from './MyRequest';
import MyPost from './MyPost';
import { FiPlus } from 'react-icons/fi';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-900">Dashboard</h2>
        <div className="flex gap-3">
          <button className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            <FiPlus className="w-5 h-5 mr-1" />
            Report Lost
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <FiPlus className="w-5 h-5 mr-1" />
            Report Found
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-1 py-4 ${
              activeTab === 'posts'
                ? 'text-purple-600 border-b-2 border-purple-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Posts
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-1 py-4 ${
              activeTab === 'requests'
                ? 'text-purple-600 border-b-2 border-purple-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Requests
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'posts' ? <MyPost /> : <MyRequest />}
      </div>
    </div>
  );
}

export default Dashboard;
