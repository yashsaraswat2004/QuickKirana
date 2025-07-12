// src/pages/ShopDetailPage.tsx
// This is the complete, updated file with live API data.

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { OrderCreationForm } from '../components/features/orders/OrderCreationForm';

// Define the structure of a single Shop object
interface Shop {
  _id: string;
  shopName: string;
  address?: string;
  pincode: string;
  shopImage?: string;
  phone?: string;
}

export const ShopDetailPage = () => {
  const { shopId } = useParams<{ shopId: string }>();

  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!shopId) return;
      try {
        setLoading(true);
        
        // --- THIS IS THE LIVE API CALL ---
        const response = await axios.get(`https://quickkirana-backend.onrender.com/api/shops/${shopId}`);
        setShop(response.data);

      } catch (err) {
        setError('Could not fetch shop details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [shopId]); // Re-run effect if shopId changes

  if (loading) return <div className="text-center py-20 font-semibold">Loading Shop Details...</div>;
  if (error) return <div className="text-center py-20 text-red-500 font-semibold">{error}</div>;
  if (!shop) return <div className="text-center py-20 font-semibold">Shop not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Shop Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10"
        >
          <img 
            src={shop.shopImage || 'https://placehold.co/1200x400/f97316/white?text=Welcome'}
            alt={`${shop.shopName}`}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl md:text-4xl font-black text-gray-800">{shop.shopName}</h1>
            <p className="text-gray-500 mt-2">{shop.address}</p>
          </div>
        </motion.div>

        {/* Order Creation Section */}
        <OrderCreationForm shopId={shop._id} />
      </div>
    </div>
  );
};
