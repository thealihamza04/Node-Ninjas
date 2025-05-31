import { motion, useTransform, useScroll, useSpring } from "framer-motion";
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

// Card Component
const Card = ({ card }) => {
  return (
    <div className='group relative h-[500px] w-[90vw] overflow-hidden rounded-lg bg-base-100 border border-base-300 transition-all hover:shadow-md'>
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center'>
        <div className='mb-6 text-5xl text-primary transition-transform group-hover:scale-110'>
          {card.icon}
        </div>
        <h3 className='mb-4 text-2xl font-bold text-base-content'>
          {card.title}
        </h3>
        <p className='text-base-content/70 max-w-xl'>{card.description}</p>
      </div>
    </div>
  );
};

// Carousel Component
const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Add spring animation to the scroll progress
  const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  };

  const springProgress = useSpring(scrollYProgress, springConfig);
  const x = useTransform(springProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className='relative h-[300vh] bg-base-200'>
      <div className='sticky top-0 flex h-screen items-center overflow-hidden'>
        <motion.div
          style={{ x }}
          className='flex gap-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
            >
              <Card card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Header Component
const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    className='flex flex-col items-center justify-center py-8 space-y-2'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    }}
  >
    <h2 className='text-3xl font-extrabold text-primary'>{title}</h2>
    {subtitle && (
      <p className='text-xl font-semibold text-base-content/70'>{subtitle}</p>
    )}
  </motion.div>
);

// Main Component
const Working = () => {
  return (
    <div className='bg-base-200'>
      <SectionHeader title='How It Works' />
      <HorizontalScrollCarousel />
      <SectionHeader
        title='Get Started Today'
        subtitle='Join our community and help reunite lost items with their owners'
      />
    </div>
  );
};

// Data
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

export default Working;
