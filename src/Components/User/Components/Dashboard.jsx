import React, { useState, useEffect } from "react";
import MyRequest from "./MyRequest";
import MyPost from "./MyPost";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useContext } from "react";
import ItemsContext from "../../../context/items/ItemsContext";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const { allItems } = useContext(ItemsContext);
  
  const [loading, setLoading] = useState(true);
  const [userItems, setUserItems] = useState({
    found: [],
    lost: []
  });

  // Function to filter items based on user email
  const filterUserItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view your dashboard');
        navigate('/login');
        return;
      }

      // Get user email from token
      const userEmail = JSON.parse(atob(token.split('.')[1])).email;
      console.log("Current user email:", userEmail);

      // Filter items based on user email in contactInfo
      const userFilteredItems = allItems.filter(item => item.contactInfo === userEmail);
      console.log("Filtered items:", userFilteredItems);
      
      // Separate into lost and found items
      setUserItems({
        found: userFilteredItems.filter(item => item.type === 'Found'),
        lost: userFilteredItems.filter(item => item.type === 'Lost')
      });

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    filterUserItems();
  }, [allItems]); // Re-run when allItems changes

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await filterUserItems();
      toast.success('Items refreshed successfully');
    } catch (error) {
      console.error('Error refreshing:', error);
      toast.error('Failed to refresh items');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Action Buttons */}
      <div className='flex flex-wrap gap-4 justify-between items-center'>
        <div className='flex gap-4'>
          <Link to="/lossitemform" className='btn btn-primary gap-2'>
            <FiPlus className='w-4 h-4' />
            Report Lost Item
          </Link>
          <Link to="/founditemform" className='btn btn-primary gap-2'>
            <FiPlus className='w-4 h-4' />
            Report Found Item
          </Link>
        </div>
        <button 
          onClick={handleRefresh} 
          className='btn btn-ghost gap-2'
          disabled={loading}
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Tab Navigation */}
      <div className='border-b border-base-300'>
        <nav className='flex space-x-8'>
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "posts"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/70 hover:text-base-content hover:border-base-300"
            }`}
          >
            Found Items ({userItems.found.length})
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "requests"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/70 hover:text-base-content hover:border-base-300"
            }`}
          >
            Lost Items ({userItems.lost.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mt-6'>
        {activeTab === "posts" ? 
          <MyPost items={userItems.found} /> : 
          <MyRequest items={userItems.lost} />
        }
      </div>
    </div>
  );
}

export default Dashboard;
