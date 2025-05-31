import React from "react";
import { FiEye, FiMoreVertical } from "react-icons/fi";

function Activities() {
  const activities = [
    {
      type: "LOST",
      item: "iPhone 13 Pro",
      reporter: "ahmad.hassan@umt.edu.pk",
      date: "2024-01-15",
      status: "Active",
    },
    {
      type: "FOUND",
      item: "Blue Water Bottle",
      reporter: "sara.ali@umt.edu.pk",
      date: "2024-01-15",
      status: "Claimed",
    },
    {
      type: "LOST",
      item: "Red Backpack",
      reporter: "hassan.malik@umt.edu.pk",
      date: "2024-01-14",
      status: "Pending",
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success/10 text-success";
      case "claimed":
        return "bg-primary/10 text-primary";
      case "pending":
        return "bg-warning/10 text-warning";
      default:
        return "bg-base-200 text-base-content";
    }
  };

  const getTypeBadgeClass = (type) => {
    return type === "LOST"
      ? "bg-error/10 text-error"
      : "bg-success/10 text-success";
  };

  return (
    <div className='bg-base-100 rounded-lg shadow-sm p-6'>
      <h2 className='text-2xl font-bold text-base-content mb-6'>
        Recent Activity
      </h2>

      <div className='overflow-x-auto'>
        <table className='table w-full'>
          {/* Table Header */}
          <thead>
            <tr className='border-b border-base-300'>
              <th className='text-sm font-medium text-base-content/70'>Type</th>
              <th className='text-sm font-medium text-base-content/70'>Item</th>
              <th className='text-sm font-medium text-base-content/70'>
                Reporter
              </th>
              <th className='text-sm font-medium text-base-content/70'>Date</th>
              <th className='text-sm font-medium text-base-content/70'>
                Status
              </th>
              <th className='text-sm font-medium text-base-content/70'>
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className='hover:bg-base-200'>
                <td className='py-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(
                      activity.type
                    )}`}
                  >
                    {activity.type}
                  </span>
                </td>
                <td className='py-4'>
                  <span className='font-medium text-base-content'>
                    {activity.item}
                  </span>
                </td>
                <td className='py-4'>
                  <span className='text-base-content/70'>
                    {activity.reporter}
                  </span>
                </td>
                <td className='py-4'>
                  <span className='text-base-content/70'>{activity.date}</span>
                </td>
                <td className='py-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                </td>
                <td className='py-4'>
                  <div className='flex items-center space-x-2'>
                    <button className='p-2 text-base-content/70 hover:text-primary rounded-full hover:bg-base-200'>
                      <FiEye className='w-5 h-5' />
                    </button>
                    <div className='dropdown dropdown-end'>
                      <button className='p-2 text-base-content/70 hover:text-primary rounded-full hover:bg-base-200'>
                        <FiMoreVertical className='w-5 h-5' />
                      </button>
                      <ul className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
                        <li>
                          <a>Edit</a>
                        </li>
                        <li>
                          <a>Delete</a>
                        </li>
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
