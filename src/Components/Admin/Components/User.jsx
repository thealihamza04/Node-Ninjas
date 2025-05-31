import React from "react";
import { FiUsers } from "react-icons/fi";

function User() {
  return (
    <div className='w-full bg-base-100 rounded-lg shadow-sm'>
      {/* User Management Header */}
      <div className='px-6 py-5 border-b border-base-300'>
        <h2 className='text-xl font-bold text-base-content'>User Management</h2>
      </div>

      {/* Coming Soon Message */}
      <div className='flex flex-col items-center justify-center py-16'>
        <div className='mb-4'>
          <FiUsers className='w-14 h-14 text-base-content/30' />
        </div>
        <p className='text-base text-base-content/70'>
          User management features coming soon...
        </p>
      </div>
    </div>
  );
}

export default User;
