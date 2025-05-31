import React from "react";
import { FiBox, FiTrendingUp, FiCheck, FiAlertCircle } from "react-icons/fi";

function Tiles() {
  const stats = [
    {
      title: "Total Items",
      value: "247",
      icon: <FiBox className='text-3xl text-primary' />,
      color: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      title: "Active Items",
      value: "89",
      icon: <FiTrendingUp className='text-3xl text-success' />,
      color: "bg-success/10",
      textColor: "text-success",
    },
    {
      title: "Resolved",
      value: "158",
      icon: <FiCheck className='text-3xl text-base-content' />,
      color: "bg-base-200",
      textColor: "text-base-content",
    },
    {
      title: "Pending Reports",
      value: "12",
      icon: <FiAlertCircle className='text-3xl text-warning' />,
      color: "bg-warning/10",
      textColor: "text-warning",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} p-6 rounded-lg transition-all hover:shadow-md`}
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-base-content/70'>
                {stat.title}
              </p>
              <h3 className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                {stat.value}
              </h3>
            </div>
            <div className='p-3 rounded-full bg-base-100'>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tiles;
