import React, { useState } from "react";
import MyRequest from "./MyRequest";
import MyPost from "./MyPost";
import { FiPlus } from "react-icons/fi";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className='space-y-6'>
      {/* Action Buttons */}
      <div className='flex flex-wrap gap-4'>
        <button className='btn btn-primary gap-2'>
          <FiPlus className='w-4 h-4' />
          Report Lost Item
        </button>
        <button className='btn btn-primary gap-2'>
          <FiPlus className='w-4 h-4' />
          Report Found Item
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
            Founded Items
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "requests"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/70 hover:text-base-content hover:border-base-300"
            }`}
          >
            Lost Items
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mt-6'>
        {activeTab === "posts" ? <MyPost /> : <MyRequest />}
      </div>
    </div>
  );
}

export default Dashboard;
