// src/pages/ShopListPage.tsx

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// --- 1. UPDATE THE SHOP INTERFACE ---
// Add the 'shopImage' field to our type definition.
interface Shop {
  _id: string;
  shopName: string;
  address?: string;
  pincode: string;
  shopImage?: string; // This field will hold the URL of the shop's image
}

// --- 2. UPDATE THE SHOP CARD COMPONENT ---
// We will add an image section to the card.
const ShopCard = ({ shop, index }: { shop: Shop, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="group"
  >
    <Link 
      to={`/shop/${shop._id}`}
      className="block bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-300"
    >
      {/* --- Image Section --- */}
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={shop.shopImage || 'https://placehold.co/600x400/f97316/white?text=No+Image'} // Use shop image or a placeholder
          alt={shop.shopName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* --- Content Section --- */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate">{shop.shopName}</h3>
        <p className="text-gray-500 mt-1">Pincode: {shop.pincode}</p>
        {shop.address && <p className="text-sm text-gray-400 mt-2 truncate">{shop.address}</p>}
      </div>
    </Link>
  </motion.div>
);

export const ShopListPage = () => {
  const [searchParams] = useSearchParams();
  const pincode = searchParams.get('pincode');

  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      if (!pincode) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // --- 3. CORRECT THE API URL ---
        // The backend server runs on port 3001
        const response = await axios.get(`http://localhost:3000/api/shops?pincode=${pincode}`);
        setShops(response.data);
      } catch (err) {
        setError('Could not fetch stores for this area. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [pincode]); 
  
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-black text-center mb-2">Stores Near You</h1>
        <p className="text-center text-gray-600 mb-10">Showing results for pincode: <span className="font-bold text-orange-500">{pincode}</span></p>

        {loading && <div className="text-center py-10">Loading...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}

        {!loading && !error && (
          shops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shops.map((shop, index) => (
                <ShopCard key={shop._id} shop={shop} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p>No stores found for this pincode yet.</p>
              <p className="mt-2 text-sm">Want to see your store here? <Link to="/signup" className="text-orange-500 font-semibold">List your store now!</Link></p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
