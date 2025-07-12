import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HowItWorks } from '../features/Homepage/HowItWorks';
import { Features } from '../features/Homepage/Features';
import { Testimonials } from '../features/Homepage/Testimonials';

export const HomePage = () => {
  const [pincode, setPincode] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) { 
      navigate(`/shops?pincode=${pincode}`);
    }
  };

  return (
    <>
      {/* Enhanced Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-36 items-center">
            
            {/* Left Column: Text Content & CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">
                <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Your Local Kirana,
                </span>
                <span className="block text-gray-800">Just a Click Away.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Find stores in your neighborhood, submit your list, and pick it up when it's ready.
              </p>
              
              {/* Refined CTA Form */}
              <form onSubmit={handleSearch} className="max-w-md mx-auto lg:mx-0 flex gap-2 bg-white p-2 rounded-full border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition-all">
                <input
                  type="text"
                  placeholder="Enter your pincode..."
                  className="w-full pl-4 pr-2 py-2.5 border-none rounded-full focus:outline-none bg-transparent text-base"
                  value={pincode} // 5. Control the input with state
                  onChange={(e) => setPincode(e.target.value)} // 6. Update state on change
                  maxLength={6}
                />
                <button 
                  onClick={handleSearch}
                  className="px-12 py-1 cursor-pointer bg-orange-500 text-white font-semibold text-base rounded-full shadow-md hover:bg-orange-600 transition-colors transform hover:scale-105"
                >
                  Find Stores
                </button>
              </form>

              {/* Trust Signals */}
              <div className="mt-8 text-center lg:text-left">
                  <p className="text-sm text-gray-500">Trusted by 50+ local stores in Gwalior</p>
              </div>

            </motion.div>

            {/* Right Column: Illustration */}
            <div className="hidden lg:block">
              <img src="/Shopping.png" alt="Shopping Illustration" width={500}/>
            </div>

          </div>
        </div>
      </div>

      {/* Other marketing sections remain */}
      <HowItWorks />
      <Features />
      <Testimonials />
    </>
  );
};
