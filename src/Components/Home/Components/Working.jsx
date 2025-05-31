import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBell,
  FaUserCircle,
  FaHandshake,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";

const Example = () => {
  return (
    <div className=''>
      <div className='flex h-16 items-center justify-center'>
        <span className='text-3xl font-extrabold text-primary'>
          How It Works
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className='flex h-16 items-center justify-center'>
        <span className='text-xl font-semibold text-primary'>
          Get Started Today
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className='relative h-[300vh] bg-base-200'>
      <div className='sticky top-0 flex h-screen items-center overflow-hidden'>
        <motion.div style={{ x }} className='flex gap-6'>
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className='group relative h-[500px] w-[90vw] overflow-hidden rounded-xl bg-base-100'
    >
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center'>
        <div className='mb-6 text-5xl text-primary'>{card.icon}</div>
        <h3 className='mb-4 text-2xl font-bold text-base-content'>
          {card.title}
        </h3>
        <p className='text-base-content/70'>{card.description}</p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
  {
    icon: <FaSearch />,
    title: "Search Items",
    description:
      "Easily search through our database of lost and found items. Filter by category, location, and date to find what you're looking for.",
    id: 1,
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location Tracking",
    description:
      "Items are tagged with their exact location, making it easier to find and return lost belongings to their rightful owners.",
    id: 2,
  },
  {
    icon: <FaBell />,
    title: "Instant Notifications",
    description:
      "Get real-time alerts when items matching your description are found or when someone claims your lost item.",
    id: 3,
  },
  {
    icon: <FaUserCircle />,
    title: "User Profiles",
    description:
      "Create a profile to track your lost items and manage your found items. Build trust through verified accounts.",
    id: 4,
  },
  {
    icon: <FaHandshake />,
    title: "Safe Returns",
    description:
      "Our secure messaging system helps coordinate safe returns between finders and owners.",
    id: 5,
  },
  {
    icon: <FaShieldAlt />,
    title: "Verified System",
    description:
      "All items and users are verified to ensure a safe and trustworthy community.",
    id: 6,
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Friendly",
    description:
      "Access our platform from any device. Report lost items or upload found items on the go.",
    id: 7,
  },
];
