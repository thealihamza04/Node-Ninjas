import React, { useState, useEffect } from "react";
import ItemsContext from "./ItemsContext";
import axios from "axios";
import { _backendAPI } from "../../APIs/api";
import { toast } from "react-hot-toast";

const ItemsState = (props) => {
  toast.success("fun start");

  // Categories array based on API data
  const categories = [
    "All Categories",
    "Accessories",
    "Bags",
    "Jewelry",
    "Electronics",
    "Books",
    "Clothing",
    "Documents",
    "Others",
  ];

  // Locations array based on API data
  const locations = [
    "All Locations",
    "Library",
    "Cafeteria",
    "Sports Complex",
    "Academic Block",
    "Hostel",
    "Parking Area",
    "Computer Lab",
    "Science Lab",
    "Math Department",
    "Gym",
    "Main Gate",
  ];

  // State for items
  const [allItems, setAllItems] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "All Categories",
    location: "All Locations",
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(_backendAPI + "/api/items");
        const items = response.data.items;
        setAllItems(items);

        // Separate items into lost and found
        const lost = items.filter((item) => item.type === "Lost");
        const found = items.filter((item) => item.type === "Found");

        setLostItems(lost);
        setFoundItems(found);

        console.log(response);

        toast.success("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Update filter function
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter function
  const filterItems = (items) => {
    // If no filters are active, return all items
    if (
      !filters.searchTerm &&
      filters.category === "All Categories" &&
      filters.location === "All Locations"
    ) {
      return items;
    }

    // Only filter if there's an active search or filter
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesCategory =
        filters.category === "All Categories" ||
        item.category === filters.category;
      const matchesLocation =
        filters.location === "All Locations" ||
        item.location === filters.location;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  };

  const contextValue = {
    lostItems,
    setLostItems,
    foundItems,
    setFoundItems,
    allItems,
    setAllItems,
    filters,
    updateFilter,
    filterItems,
    categories,
    locations,
  };

  return (
    <ItemsContext.Provider value={contextValue}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsState;
