import React from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import SearchFilterBar from "./Components/SearchFilterBar";
import LatestListing from "./Components/LatestListing";
import Working from "./Components/Working";
import Footer from "./Components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SearchFilterBar />
      <LatestListing />
      <Working />
      <Footer />
    </>
  );
};

export default HomePage;
