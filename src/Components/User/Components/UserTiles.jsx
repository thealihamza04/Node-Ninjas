import React, { useContext, useMemo } from "react";
import { FiFileText, FiCheckCircle, FiClock, FiEye } from "react-icons/fi";
import ItemsContext from "../../../context/items/ItemsContext";

function UserTiles() {
  const { lostItems, foundItems } = useContext(ItemsContext);
  const userId = localStorage.getItem("userId");

  const stats = useMemo(() => {
    // Filter items for current user
    const userLostItems = lostItems.filter((item) => item.userId === userId);
    const userFoundItems = foundItems.filter((item) => item.userId === userId);

    // Calculate total views
    const totalViews = [...userLostItems, ...userFoundItems].reduce(
      (sum, item) => sum + (item.views || 0),
      0
    );

    // Calculate recovered items (items with status "claimed")
    const recoveredItems = [...userLostItems, ...userFoundItems].filter(
      (item) => item.status?.toLowerCase() === "claimed"
    ).length;

    // Calculate pending requests (lost items with status "pending")
    const pendingRequests = userLostItems.filter(
      (item) => item.status?.toLowerCase() === "pending"
    ).length;

    return [
      {
        title: "Total Posts",
        value: (userLostItems.length + userFoundItems.length).toString(),
        icon: <FiFileText className='text-3xl text-primary' />,
        textColor: "text-primary",
      },
      {
        title: "Items Recovered",
        value: recoveredItems.toString(),
        icon: <FiCheckCircle className='text-3xl text-success' />,
        textColor: "text-success",
      },
      {
        title: "Pending Requests",
        value: pendingRequests.toString(),
        icon: <FiClock className='text-3xl text-warning' />,
        textColor: "text-warning",
      },
      {
        title: "Total Views",
        value: totalViews.toString(),
        icon: <FiEye className='text-3xl text-info' />,
        textColor: "text-info",
      },
    ];
  }, [lostItems, foundItems, userId]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto'>
      {stats.map((stat, index) => (
        <div
          key={index}
          className='bg-base-100 p-4 rounded-lg border border-base-300 transition-all'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-base-content/70'>
                {stat.title}
              </p>
              <h3 className={`text-2xl font-bold mt-1 ${stat.textColor}`}>
                {stat.value}
              </h3>
            </div>
            <div className='p-2 rounded-full bg-base-200'>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserTiles;
