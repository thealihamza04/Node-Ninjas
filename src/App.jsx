import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import FoundItems from "./Components/FoundItems/FoundItems";
import PageNotFound from "./Components/404/PageNotFound";
import Navbar from "./Components/Home/Components/Navbar";
import LostItemsPage from "./Components/LostItems/LostItemsPage";
import Footer from "./Components/Home/Components/Footer";
import ItemDetail from "./Components/ItemDetails/ItemDetail";
import UserDashboard from "./Components/User/UserDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/foundItems' element={<FoundItems />} />
        <Route path='/foundItems/:id' element={<ItemDetail />} />
        <Route path='/lostItems' element={<LostItemsPage />} />
        <Route path='/lostItems/:id' element={<ItemDetail />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>

  );
};

export default App;
