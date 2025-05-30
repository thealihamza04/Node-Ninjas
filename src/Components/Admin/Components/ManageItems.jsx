import React from 'react';
import { FiSearch, FiEye, FiCheck, FiX, FiChevronDown } from 'react-icons/fi';

function ManageItems() {
  const items = [
    {
      type: 'LOST',
      item: 'iPhone 13 Pro',
      reporter: 'ahmad.hassan@umt.edu.pk',
      location: 'Library',
      date: '2024-01-15',
      status: 'Active'
    },
    {
      type: 'FOUND',
      item: 'Blue Water Bottle',
      reporter: 'sara.ali@umt.edu.pk',
      location: 'Cafeteria',
      date: '2024-01-15',
      status: 'Claimed'
    },
    {
      type: 'LOST',
      item: 'Red Backpack',
      reporter: 'hassan.malik@umt.edu.pk',
      location: 'Engineering Building',
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
    <div className="bg-white rounded-lg shadow-sm">
      {/* Search and Filter Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select className="appearance-none block w-40 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 pr-8">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="claimed">Claimed</option>
              <option value="pending">Pending</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(item.type)}`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{item.item}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.reporter}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.location}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-600">
                      <FiCheck className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-600">
                      <FiX className="w-4 h-4" />
                    </button>
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

export default ManageItems;
