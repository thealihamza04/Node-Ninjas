import React from 'react';
import { FiUsers } from 'react-icons/fi';

function User() {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* User Management Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-900">User Management</h2>
      </div>

      {/* Coming Soon Message */}
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4">
          <FiUsers className="w-14 h-14 text-gray-300" />
        </div>
        <p className="text-base text-gray-500">
          User management features coming soon...
        </p>
      </div>
    </div>
  );
}

export default User;
