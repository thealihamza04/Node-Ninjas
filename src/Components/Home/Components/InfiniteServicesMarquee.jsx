import React from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBell,
  FaUserShield,
  FaMobileAlt,
  FaHandshake,
  FaShieldAlt,
  FaHeadset,
  FaBook,
  FaGraduationCap,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationCircle,
  FaUserPlus,
} from "react-icons/fa";
import {
  MdLocationOn,
  MdSecurity,
  MdCategory,
  MdSupportAgent,
} from "react-icons/md";
import { BsFillShieldLockFill, BsFillCheckCircleFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiUserSearchLine, RiFindReplaceLine } from "react-icons/ri";

const AnimatedRow = React.memo(({ items, isReversed }) => (
  <div className='pointer-events-none relative flex gap-10 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
    {[...Array(2)].map((_, i) => (
      <div
        key={i}
        aria-hidden={i === 1}
        className={`flex min-w-full shrink-0 animate-marquee items-center justify-around gap-10 text-2xl ${
          isReversed ? "reverse-marquee" : ""
        }`}
      >
        {items.map((item) => (
          <div
            key={`${i}-${item.id}`}
            className='whitespace-nowrap flex items-center gap-3 group hover:scale-110 transition-transform duration-300'
          >
            <span className='text-primary text-2xl'>{item.icon}</span>
            <span className='font-medium'>{item.text}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
));

const InfiniteServicesMarquee = () => {
  const topItems = [
    { id: 1, text: "Search Items", icon: <RiUserSearchLine /> },
    { id: 2, text: "Location Tracking", icon: <HiOutlineLocationMarker /> },
    { id: 3, text: "Instant Alerts", icon: <FaBell /> },
    { id: 4, text: "Secure Login", icon: <BsFillShieldLockFill /> },
    { id: 5, text: "Mobile Access", icon: <FaMobileAlt /> },
  ];

  const middleItems = [
    { id: 1, text: "Safe Returns", icon: <BsFillCheckCircleFill /> },
    { id: 2, text: "Verified System", icon: <MdSecurity /> },
    { id: 3, text: "24/7 Support", icon: <MdSupportAgent /> },
    { id: 4, text: "User Profiles", icon: <FaUserPlus /> },
    { id: 5, text: "Category System", icon: <MdCategory /> },
  ];

  const bottomItems = [
    { id: 1, text: "Lost Items", icon: <FaExclamationCircle /> },
    { id: 2, text: "Found Items", icon: <FaCheckCircle /> },
    { id: 3, text: "Report Lost", icon: <FaClipboardList /> },
    { id: 4, text: "Report Found", icon: <RiFindReplaceLine /> },
    { id: 5, text: "Success Stories", icon: <FaGraduationCap /> },
  ];

  return (
    <div className='relative flex h-svh flex-col justify-center overflow-hidden bg-base-200 text-base-content space-y-16'>
      <div className='text-center space-y-6'>
        <h1 className='text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-base-content'>
          Our Features
        </h1>
        <p className='max-w-3xl mx-auto text-xl md:text-2xl text-base-content/70'>
          Discover our comprehensive suite of features designed to help you find
          lost items and return found belongings
        </p>
      </div>
      <div className='space-y-12 font-thin'>
        <AnimatedRow items={topItems} />
        <AnimatedRow items={middleItems} isReversed={true} />
        <AnimatedRow items={bottomItems} />
      </div>
    </div>
  );
};

export default InfiniteServicesMarquee;
