import React, { useContext, useState, useEffect } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiMessageCircle,
  FiEye,
  FiSearch,
  FiX,
} from "react-icons/fi";
import ItemsContext from "../../../context/items/ItemsContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserEmailFromToken } from "../../../../Auth/authutils";

function MyPost() {
  const navigate = useNavigate();
  const { foundItems, deleteItem } = useContext(ItemsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const currentUserEmail = getUserEmailFromToken();
    console.log("Current User Email:", currentUserEmail);
    console.log("All Items:", foundItems);

    if (!currentUserEmail || !foundItems) {
      setFilteredItems([]);
      return;
    }

    const filtered = foundItems.filter((item) => {
      console.log("Checking item:", item);
      console.log("Item contactInfo:", item.contactInfo);

      // Email filter
      const matchesEmail = item.contactInfo === currentUserEmail;
      console.log("Matches email:", matchesEmail);

      // Search filter
      const matchesSearch = searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Status filter
      const matchesStatus =
        selectedStatus === "all"
          ? true
          : item.status?.toLowerCase() === selectedStatus;

      const shouldInclude = matchesEmail && matchesSearch && matchesStatus;
      console.log("Should include item:", shouldInclude);

      return shouldInclude;
    });

    console.log("Filtered Items:", filtered);
    setFilteredItems(filtered);
  }, [foundItems, searchTerm, selectedStatus]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
  };

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await deleteItem(id);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete post");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const handleView = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
        <h2 className='text-2xl font-semibold text-base-content'>My Posts</h2>
        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
          <div className='relative flex-1 sm:max-w-xs'>
            <input
              type='text'
              placeholder='Search posts...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='input input-bordered w-full pl-10'
            />
            <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='select select-bordered w-full sm:w-48'
          >
            <option value='all'>All Status</option>
            <option value='active'>Active</option>
            <option value='claimed'>Claimed</option>
            <option value='pending'>Pending</option>
          </select>
          {(searchTerm || selectedStatus !== "all") && (
            <button
              onClick={clearFilters}
              className='btn btn-ghost btn-sm gap-2'
              title='Clear Filters'
            >
              <FiX className='w-4 h-4' />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className='text-center py-8 text-base-content/70'>
          {searchTerm || selectedStatus !== "all"
            ? "No posts match your search criteria"
            : "No found items posted yet. Start by reporting a found item."}
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className='bg-base-100 rounded-lg p-4 border border-base-300 hover:shadow-lg transition-shadow'
            >
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div className='space-y-2 flex-1'>
                  <div className='flex flex-wrap items-center gap-2'>
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
                  <div className='flex flex-wrap items-center gap-4 text-sm text-base-content/70'>
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
                    <p className='text-sm text-base-content/70 mt-2 line-clamp-2'>
                      {item.description}
                    </p>
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleView(item._id)}
                    className='btn btn-ghost btn-sm'
                    title='View Details'
                  >
                    <FiEye className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className='btn btn-ghost btn-sm'
                    title='Edit Post'
                  >
                    <FiEdit2 className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='btn btn-ghost btn-sm text-error hover:text-error'
                    title='Delete Post'
                  >
                    <FiTrash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPost;
