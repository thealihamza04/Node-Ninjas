import React from "react";
import { FiAlertCircle } from "react-icons/fi";

function Report() {
  return (
    <div className='w-full bg-base-100 rounded-lg shadow-sm'>
      {/* Reports Header */}
      <div className='px-6 py-5 border-b border-base-300'>
        <h2 className='text-xl font-bold text-base-content'>System Reports</h2>
      </div>

      {/* Coming Soon Message */}
      <div className='flex flex-col items-center justify-center py-16'>
        <div className='mb-4'>
          <FiAlertCircle className='w-14 h-14 text-base-content/30' />
        </div>
        <p className='text-base text-base-content/70'>
          Detailed reports and analytics coming soon...
        </p>
      </div>
    </div>
  );
}

export default Report;
