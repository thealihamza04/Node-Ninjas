import React, { useState, useContext } from "react";
import { FiSearch, FiEye, FiCheck, FiX, FiChevronDown } from "react-icons/fi";
import ItemsContext from "../../../context/items/ItemsContext";

function ManageItems() {
  const { allItems, updateFilter, filterItems } = useContext(ItemsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilter("searchTerm", value);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return "bg-warning/10 text-warning";

    switch (status.toLowerCase()) {
      case "active":
        return "bg-success/10 text-success";
      case "claimed":
        return "bg-primary/10 text-primary";
      case "pending":
        return "bg-warning/10 text-warning";
      default:
        return "bg-warning/10 text-warning";
    }
  };

  const getTypeBadgeClass = (type) => {
    if (!type) return "bg-base-200 text-base-content";
    return type === "LOST"
      ? "bg-error/10 text-error"
      : "bg-success/10 text-success";
  };

  // Filter items based on search term and status
  const filteredItems =
    allItems?.filter((item) => {
      if (!item) return false;
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesStatus =
        !statusFilter ||
        item.status?.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    }) ?? [];

  if (!allItems) {
    return (
      <div className='bg-base-100 rounded-lg shadow-sm p-6'>
        <div className='flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
          <span className='ml-3 text-base-content'>Loading items...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-base-100 rounded-lg shadow-sm'>
      {/* Search and Filter Section */}
      <div className='p-6 border-b border-base-300'>
        <div className='flex gap-4'>
          {/* Search Bar */}
          <div className='flex-1 relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiSearch className='h-5 w-5 text-base-content/50' />
            </div>
            <input
              type='text'
              placeholder='Search items...'
              value={searchTerm}
              onChange={handleSearch}
              className='block w-full pl-10 pr-3 py-2 border border-base-300 rounded-lg bg-base-100 focus:ring-primary focus:border-primary'
            />
          </div>

          {/* Status Filter */}
          <div className='relative'>
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className='appearance-none block w-40 px-3 py-2 border border-base-300 rounded-lg bg-base-100 focus:ring-primary focus:border-primary pr-8'
            >
              <option value=''>All Status</option>
              <option value='active'>Active</option>
              <option value='claimed'>Claimed</option>
              <option value='pending'>Pending</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
              <FiChevronDown className='h-4 w-4 text-base-content/50' />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='w-full overflow-x-auto'>
        <table className='w-full divide-y divide-base-300'>
          <thead className='bg-base-200'>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase'>
                Type
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase'>
                Item
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase'>
                Reporter
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase'>
                Location
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase'>
                Date
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase'>
                Status
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-base-100 divide-y divide-base-300'>
            {filteredItems.length === 0 ? (
              <tr>
                <td
                  colSpan='7'
                  className='px-4 py-8 text-center text-base-content/70'
                >
                  No items found
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr key={index} className='hover:bg-base-200'>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(
                        item.type
                      )}`}
                    >
                      {item.type || "Unknown"}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span className='font-medium text-base-content'>
                      {item.name || "Unnamed Item"}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-base-content/70'>
                    {item.reporter || "Unknown"}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-base-content/70'>
                    {item.location || "Unknown"}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-base-content/70'>
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "Unknown"}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        item.status
                      )}`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-2'>
                      <button className='p-1 text-base-content/50 hover:text-primary'>
                        <FiEye className='w-4 h-4' />
                      </button>
                      <button className='p-1 text-success/50 hover:text-success'>
                        <FiCheck className='w-4 h-4' />
                      </button>
                      <button className='p-1 text-error/50 hover:text-error'>
                        <FiX className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageItems;
