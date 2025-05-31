import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import SearchFilterBar from "./Components/SearchFilterBar";
import LatestListing from "./Components/LatestListing";
import Working from "./Components/Working";
import Testimonials from "./Components/Testimonials";
import StatsSection from "./Components/StatsSection";
import InfiniteServicesMarquee from "./Components/InfiniteServicesMarquee";

const HomePage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className='flex flex-col'>
      <HeroSection />
      {/* <SearchFilterBar /> */}
      <div className='bg-base-100'>
        <LatestListing />
      </div>
      <div className='bg-base-200'>
        <Working />
      </div>
      <div className='bg-primary/5'>
        <Testimonials />
      </div>
      <div className='bg-base-100'>
        <StatsSection />
      </div>
      <div className='bg-base-200'>
        <InfiniteServicesMarquee />
      </div>
    </div>
  );
};

export default HomePage;
