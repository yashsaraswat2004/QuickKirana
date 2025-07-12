import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'; // Make sure axios is imported
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { OrderStatusTracker, type Order } from '../components/features/Tracking/OrderStatusTracker';

export const TrackOrderPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'orderId' | 'phone'>('orderId');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFoundOrder(null);

    if (!searchQuery.trim()) {
      setError('Please enter an Order ID or Phone Number.');
      setLoading(false);
      return;
    }

    try {
      let url = '';
      if (searchType === 'orderId') {
        url = `http://localhost:3000/api/orders/track/${searchQuery}`;
      } else {
        url = `http://localhost:3000/api/orders/track/phone/${searchQuery}`;
      }

      const response = await axios.get(url);
      setFoundOrder(response.data);

    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError('No order found with that information. Please check and try again.');
      } else {
        setError('An error occurred while searching for your order.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">Track Your Order</h1>
          <p className="mt-4 text-lg text-gray-600">Enter your Order ID or Phone Number to see the latest status.</p>
        </motion.div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="flex justify-center mb-4 bg-slate-100 p-1 rounded-full">
              <button type="button" onClick={() => { setSearchType('orderId'); setSearchQuery(''); }} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${searchType === 'orderId' ? 'bg-white shadow' : 'text-gray-500 hover:bg-slate-200'}`}>
                By Order ID
              </button>
              <button type="button" onClick={() => { setSearchType('phone'); setSearchQuery(''); }} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${searchType === 'phone' ? 'bg-white shadow' : 'text-gray-500 hover:bg-slate-200'}`}>
                By Phone Number
              </button>
            </div>

            <Input 
              id="searchQuery"
              name="searchQuery"
              type={searchType === 'phone' ? 'tel' : 'text'}
              label={searchType === 'orderId' ? 'Order ID' : 'Phone Number'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
              placeholder={searchType === 'orderId' ? 'Enter the ID from your confirmation' : 'Enter the phone number used for the order'}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Track Order'}
            </Button>
          </form>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {foundOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <OrderStatusTracker order={foundOrder} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};