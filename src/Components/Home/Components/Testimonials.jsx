import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      handle: "@sarahj",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-1.jpg",
      text: "I lost my laptop in the library and was devastated. Thanks to UMT Lost & Found, I got it back within hours! The system is incredibly efficient.",
      hashtag: "#QuickReturn",
    },
    {
      name: "Michael Chen",
      handle: "@mchen",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-2.jpg",
      text: "Found a student ID card and was able to return it quickly through the platform. The location tracking feature made it so easy to coordinate the return.",
      hashtag: "#EasyReturn",
    },
    {
      name: "Emma Rodriguez",
      handle: "@emmar",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-3.jpg",
      text: "The instant notifications are a lifesaver! I got an alert as soon as someone found my lost phone. The community here is so helpful.",
      hashtag: "#InstantAlerts",
    },
    {
      name: "David Kim",
      handle: "@dkim",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-4.jpg",
      text: "As a student, losing important items can be stressful. This platform has helped me recover multiple items. The verification system is very reliable.",
      hashtag: "#StudentLife",
    },
    {
      name: "Alex Thompson",
      handle: "@alexdev",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-5.jpg",
      text: "The mobile-friendly interface makes it super easy to report found items on the go. I've helped return several items to their owners.",
      hashtag: "#MobileFirst",
    },
    {
      name: "Sophia Lee",
      handle: "@sophialee",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-6.jpg",
      text: "The category system is so well organized. I found exactly what I was looking for when I lost my water bottle in the sports complex.",
      hashtag: "#WellOrganized",
    },
    {
      name: "James Wilson",
      handle: "@jwilson",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-7.jpg",
      text: "The secure messaging system made it easy to coordinate the return of my lost wallet. The whole process was smooth and professional.",
      hashtag: "#SecureSystem",
    },
    {
      name: "Maria Garcia",
      handle: "@mgarcia",
      image:
        "https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-8.jpg",
      text: "I appreciate how the platform maintains privacy while facilitating returns. The user profiles and verification system build trust.",
      hashtag: "#Trustworthy",
    },
  ];

  return (
    <div>
      <section className='py-8'>
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-3xl font-bold leading-tight text-base-content sm:text-4xl lg:text-5xl'>
              Success Stories
            </h2>
            <p className='max-w-lg mx-auto mt-4 text-base leading-relaxed text-base-content/70'>
              Join our community of trusted members who have successfully
              reunited lost items with their owners. Here's what our users have
              to say about their experience.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 px-4 mt-8 sm:px-0 xl:mt-12 xl:grid-cols-4 sm:grid-cols-2'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='overflow-hidden bg-base-100 rounded-lg border-base-300 border'
              >
                <div className='px-5 py-6'>
                  <div className='flex items-center justify-between'>
                    <img
                      className='flex-shrink-0 object-cover w-10 h-10 rounded-full'
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className='min-w-0 ml-3 mr-auto'>
                      <p className='text-base font-semibold text-base-content truncate'>
                        {testimonial.name}
                      </p>
                      <p className='text-sm text-base-content/70 truncate'>
                        {testimonial.handle}
                      </p>
                    </div>
                  </div>
                  <blockquote className='mt-5'>
                    <p className='text-base text-base-content/80'>
                      {testimonial.text}
                      <span className='block text-primary mt-2'>
                        {testimonial.hashtag}
                      </span>
                    </p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
