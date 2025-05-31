import React from "react";
import UserTiles from "./Components/UserTiles";
import Dashboard from "./Components/Dashboard";
import { FiArrowLeft } from "react-icons/fi";
import { useContext } from "react";
import ItemsContext from "../../context/items/ItemsContext";

function UserDashboard() {
  const contextValue = useContext(ItemsContext);

  return (
    <div className='min-h-screen bg-base-200 py-8'>
      <div className='container mx-auto px-4 space-y-8'>
        {/* Back Button */}
        <div>
          <a
            href='/'
            className='inline-flex items-center text-primary hover:text-primary/80'
          >
            <FiArrowLeft className='w-4 h-4 mr-2' />
            Back to Home
          </a>
        </div>

        {/* Dashboard Header */}
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold text-base-content'>My Dashboard</h1>
          <p className='text-lg text-base-content/70'>
            Manage your posts and track your requests
          </p>
        </div>

        {/* Stats Tiles */}
        <div>
          <UserTiles />
        </div>

        {/* Main Dashboard Content */}
        <div className='bg-base-100 rounded-lg p-6 border border-base-300'>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
