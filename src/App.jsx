import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout Components
import Navbar from "./Components/Home/Components/Navbar";
import Footer from "./Components/Home/Components/Footer";

// Page Components
import HomePage from "./Components/Home/HomePage";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import FoundItems from "./Components/FoundItems/FoundItems";
import LostItemsPage from "./Components/LostItems/LostItemsPage";
import ItemDetail from "./Components/ItemDetails/ItemDetail";

import UserDashboard from "./Components/User/UserDashboard";

import PageNotFound from "./Components/404/PageNotFound";


// Context Provider
import ItemsState from "./context/items/ItemsState";

// Error Boundary
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import LossItemform from "./Components/Forms/LossItemform";
import FoundItemform from "./Components/Forms/FoundItemform";

// Route Configuration
const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/user", element: <UserDashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/found", element: <FoundItems /> },
  { path: "/lost", element: <LostItemsPage /> },
  { path: "/itemdetail/:id", element: <ItemDetail /> },
  { path: "*", element: <PageNotFound /> },
];

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      {children}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ItemsState>
        <Toaster />
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </Layout>
        </BrowserRouter>
      </ItemsState>
    </ErrorBoundary>

  );
};

export default App;
