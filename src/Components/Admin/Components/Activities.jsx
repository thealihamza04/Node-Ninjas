import React from 'react';
import { FiEye, FiMoreVertical } from 'react-icons/fi';

function Activities() {
  const activities = [
    {
      type: 'LOST',
      item: 'iPhone 13 Pro',
      reporter: 'ahmad.hassan@umt.edu.pk',
      date: '2024-01-15',
      status: 'Active'
    },
    {
      type: 'FOUND',
      item: 'Blue Water Bottle',
      reporter: 'sara.ali@umt.edu.pk',
      date: '2024-01-15',
      status: 'Claimed'
    },
    {
      type: 'LOST',
      item: 'Red Backpack',
      reporter: 'hassan.malik@umt.edu.pk',
      date: '2024-01-14',
      status: 'Pending'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'claimed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeClass = (type) => {
    return type === 'LOST' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Recent Activity</h2>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b">
              <th className="text-sm font-medium text-gray-500">Type</th>
              <th className="text-sm font-medium text-gray-500">Item</th>
              <th className="text-sm font-medium text-gray-500">Reporter</th>
              <th className="text-sm font-medium text-gray-500">Date</th>
              <th className="text-sm font-medium text-gray-500">Status</th>
              <th className="text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(activity.type)}`}>
                    {activity.type}
                  </span>
                </td>
                <td className="py-4">
                  <span className="font-medium text-gray-900">{activity.item}</span>
                </td>
                <td className="py-4">
                  <span className="text-gray-600">{activity.reporter}</span>
                </td>
                <td className="py-4">
                  <span className="text-gray-600">{activity.date}</span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(activity.status)}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                      <FiEye className="w-5 h-5" />
                    </button>
                    <div className="dropdown dropdown-end">
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <FiMoreVertical className="w-5 h-5" />
                      </button>
                      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
