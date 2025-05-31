import React from "react";

const Footer = () => {
  return (
    <div>
      <section className='py-10 bg-base-300 sm:pt-16 lg:pt-24'>
        <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12'>
            <div>
              <div className='text-2xl font-serif font-bold text-primary'>
                UMT Lost/Found
              </div>

              <ul className='mt-8 space-y-4'>
                <li>
                  <a
                    href='/about'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    href='/how-it-works'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    How It Works
                  </a>
                </li>

                <li>
                  <a
                    href='/success-stories'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Success Stories
                  </a>
                </li>

                <li>
                  <a
                    href='/contact'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className='text-lg font-semibold text-base-content'>
                Quick Links
              </p>

              <ul className='mt-8 space-y-4'>
                <li>
                  <a
                    href='/lost-items'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Lost Items
                  </a>
                </li>

                <li>
                  <a
                    href='/found-items'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Found Items
                  </a>
                </li>

                <li>
                  <a
                    href='/report-lost'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Report Lost Item
                  </a>
                </li>

                <li>
                  <a
                    href='/report-found'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Report Found Item
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className='text-lg font-semibold text-base-content'>
                Resources
              </p>

              <ul className='mt-8 space-y-4'>
                <li>
                  <a
                    href='/faq'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    FAQ
                  </a>
                </li>

                <li>
                  <a
                    href='/safety-tips'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Safety Tips
                  </a>
                </li>

                <li>
                  <a
                    href='/guidelines'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Guidelines
                  </a>
                </li>

                <li>
                  <a
                    href='/blog'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className='text-lg font-semibold text-base-content'>Support</p>

              <ul className='mt-8 space-y-4'>
                <li>
                  <a
                    href='/help-center'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Help Center
                  </a>
                </li>

                <li>
                  <a
                    href='/contact-support'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Contact Support
                  </a>
                </li>

                <li>
                  <a
                    href='/privacy-policy'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    href='/terms'
                    title=''
                    className='text-base-content/70 transition-all duration-200 hover:text-primary focus:text-primary'
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-12 pt-8 border-t border-base-300'>
            <p className='text-base text-base-content/70 text-center'>
              © {new Date().getFullYear()} UMT Lost & Found. All rights
              reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
