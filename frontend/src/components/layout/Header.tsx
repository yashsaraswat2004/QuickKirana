import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const logoImage = "https://res.cloudinary.com/dp0vgnmtx/image/upload/v1752346312/QK_logo_i3s5ua.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pincode, setPincode] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) {
      navigate(`/shops?pincode=${pincode}`);
      setPincode(''); // Optional: clear input after search
      if(isMenuOpen) setIsMenuOpen(false); // Close mobile menu after search
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo - Kept your beautiful logo design */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img src={logoImage} alt="Quick Kirana Logo" className="h-14 w-14 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Quick Kirana
            </span>
          </Link>

          {/* Search Bar - IMPROVED: Now the primary focus */}
           <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              {/* ... search icon ... */}
              <input
                type="text"
                placeholder="Enter your pincode to find stores..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
              />
            </form>
          </div>

          {/* Navigation Links - REPLACED: Now focused and clean */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/track-order" className="text-gray-600 hover:text-orange-500 transition-colors">
              Track Order
            </Link>
            <Link to="/login" className="bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 font-semibold transition-colors">
              Shop Login
            </Link>
          </nav>

          {/* Mobile Menu Button - IMPROVED */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - AnimatePresence for smooth open/close */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="border-t border-gray-200 pt-4 pb-2">
                <div className="relative mb-4">
                  {/* Mobile Search Bar */}
                   <input
                    type="text"
                    placeholder="Enter your pincode..."
                    className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <nav className="flex flex-col space-y-2">
                   <Link to="/track-order" onClick={closeMenu} className="text-gray-700 hover:bg-gray-100 block px-4 py-2 rounded-lg">Track Order</Link>
                   <Link to="/login" onClick={closeMenu} className="text-gray-700 hover:bg-gray-100 block px-4 py-2 rounded-lg">Shopkeeper Login</Link>
                    <Link to="/about" onClick={closeMenu} className="text-gray-700 hover:bg-gray-100 block px-4 py-2 rounded-lg">About Us</Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

