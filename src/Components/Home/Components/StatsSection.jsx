import React, { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      id: 1,
      label: "Items Successfully Returned",
      value: 15000,
      suffix: "+",
      description: "Lost items reunited with their owners",
    },
    {
      id: 2,
      label: "Active Users",
      value: 25000,
      suffix: "+",
      description: "Trusted community members",
    },
    {
      id: 3,
      label: "Success Rate",
      value: 85,
      suffix: "%",
      description: "Of reported items found",
    },
  ];

  return (
    <div ref={ref} className='py-16 transition-all duration-300'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <dl className='grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3'>
          {stats.map((stat) => (
            <div
              key={stat.id}
              className='mx-auto flex max-w-xs flex-col gap-y-4'
            >
              <dt className='text-base leading-7 text-base-content/70'>
                {stat.label}
              </dt>
              <dd className='order-first text-3xl font-semibold tracking-tight sm:text-5xl text-primary'>
                {isInView && (
                  <CountUp
                    end={stat.value}
                    duration={3}
                    separator=','
                    suffix={stat.suffix}
                  />
                )}
              </dd>
              {/* <p className='text-sm text-base-content/60'>{stat.description}</p> */}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StatsSection;
