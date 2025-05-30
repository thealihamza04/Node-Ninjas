import React from 'react'
import UserTiles from './Components/UserTiles'
import Dashboard from './Components/Dashboard'
import { FiArrowLeft } from 'react-icons/fi'

function UserDashboard() {
  return (
    <div className="min-h-screen bg-[#e9f0ff] py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Back Button */}
        <div>
          <a href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800">
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </div>

        {/* Dashboard Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-purple-900">My Dashboard</h1>
          <p className="text-lg text-purple-600">
            Manage your posts and track your requests
          </p>
        </div>

        {/* Stats Tiles */}
        <div>
          <UserTiles />
        </div>

        {/* Main Dashboard Content */}
        <div className="bg-white rounded-xl p-6">
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
