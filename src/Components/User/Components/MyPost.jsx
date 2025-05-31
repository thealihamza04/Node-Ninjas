import React, { useContext } from "react";
import { FiEdit2, FiTrash2, FiMessageCircle, FiEye } from "react-icons/fi";
import ItemsContext from "../../../context/items/ItemsContext";

function MyPost() {
  const { foundItems } = useContext(ItemsContext);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-info/20 text-info";
      case "claimed":
        return "bg-success/20 text-success";
      case "pending":
        return "bg-warning/20 text-warning";
      default:
        return "bg-base-300/20 text-base-content";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className='space-y-4'>
      {foundItems.length === 0 ? (
        <div className='text-center py-8 text-base-content/70'>
          No found items posted yet. Start by reporting a found item.
        </div>
      ) : (
        foundItems.map((item) => (
          <div
            key={item._id}
            className='bg-base-100 rounded-lg p-4 border border-base-300'
          >
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <h3 className='text-lg font-semibold text-base-content'>
                    {item.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      item.status
                    )}`}
                  >
                    {item.status || "active"}
                  </span>
                  <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success'>
                    Found
                  </span>
                </div>
                <div className='flex items-center gap-4 text-sm text-base-content/70'>
                  <span>Posted: {formatDate(item.createdAt)}</span>
                  <span className='flex items-center gap-1'>
                    <FiEye className='w-4 h-4' />
                    <span>{item.views || 0} views</span>
                  </span>
                  <span className='flex items-center gap-1'>
                    <FiMessageCircle className='w-4 h-4' />
                    <span>{item.responses || 0} responses</span>
                  </span>
                </div>
                {item.description && (
                  <p className='text-sm text-base-content/70 mt-2'>
                    {item.description}
                  </p>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <button className='btn btn-ghost btn-sm'>
                  <FiEdit2 className='w-4 h-4' />
                </button>
                <button className='btn btn-ghost btn-sm text-error hover:text-error'>
                  <FiTrash2 className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyPost;
