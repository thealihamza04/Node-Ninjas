import React from 'react';
import { FiFileText, FiCheckCircle, FiClock, FiEye } from 'react-icons/fi';

function UserTiles() {
  const stats = [
    {
      title: 'Total Posts',
      value: '2',
      icon: <FiFileText className="text-3xl text-purple-500" />,
      textColor: 'text-purple-600'
    },
    {
      title: 'Items Recovered',
      value: '1',
      icon: <FiCheckCircle className="text-3xl text-green-500" />,
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Requests',
      value: '1',
      icon: <FiClock className="text-3xl text-yellow-500" />,
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Views',
      value: '70',
      icon: <FiEye className="text-3xl text-purple-500" />,
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <h3 className={`text-2xl font-bold mt-1 ${stat.textColor}`}>
                {stat.value}
              </h3>
            </div>
            <div className="p-2 rounded-full bg-transparent">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserTiles;
