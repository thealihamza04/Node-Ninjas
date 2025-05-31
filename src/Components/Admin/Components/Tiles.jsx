import React from 'react';
import { FiBox, FiTrendingUp, FiCheck, FiAlertCircle } from 'react-icons/fi';

function Tiles() {
  const stats = [
    {
      title: 'Total Items',
      value: '247',
      icon: <FiBox className="text-3xl text-blue-500" />,
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Active Items',
      value: '89',
      icon: <FiTrendingUp className="text-3xl text-green-500" />,
      color: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Resolved',
      value: '158',
      icon: <FiCheck className="text-3xl text-gray-500" />,
      color: 'bg-gray-50',
      textColor: 'text-gray-700'
    },
    {
      title: 'Pending Reports',
      value: '12',
      icon: <FiAlertCircle className="text-3xl text-yellow-500" />,
      color: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} p-6 rounded-lg transition-all`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <h3 className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                {stat.value}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-transparent">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tiles;
