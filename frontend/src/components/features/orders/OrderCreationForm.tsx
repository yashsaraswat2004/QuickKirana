import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

export const OrderCreationForm = ({ shopId, shopName, shopPhone }: { shopId: string, shopName?: string, shopPhone?: string }) => {
  const [orderType, setOrderType] = useState<'text' | 'upload'>('text');
  const [listContent, setListContent] = useState('');
  const [listImage, setListImage] = useState<File | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- Validation ---
    if (!customerName || !customerPhone) {
      setError('Please enter your name and phone number.');
      setLoading(false);
      return;
    }
    if (orderType === 'text' && !listContent) {
      setError('Please type your grocery list.');
      setLoading(false);
      return;
    }
    if (orderType === 'upload' && !listImage) {
      setError('Please select an image of your list.');
      setLoading(false);
      return;
    }

    let imageUrl = '';

    // --- Step 1: Upload the image if it exists ---
    if (orderType === 'upload' && listImage) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('image', listImage);

        const uploadRes = await axios.post('http://localhost:3000/api/upload', imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = uploadRes.data.url;
      } catch (uploadError) {
        setError('Image upload failed. Please try again.');
        setLoading(false);
        return;
      }
    }

    // --- Step 2: Create the final order with all data ---
    try {
      const orderPayload = {
        shopkeeperId: shopId,
        customerName,
        customerPhone,
        itemsDescription: orderType === 'text' ? listContent : 'Image uploaded',
        imageOfList: imageUrl,
        orderType: 'pickup', // Defaulting to pickup, you can add a selector for this
      };

      const orderRes = await axios.post('http://localhost:3000/api/orders', orderPayload);
      
      // On success, navigate to a confirmation page with order details
      navigate('/order-success', {  state: { 
          orderId: orderRes.data._id,
          shopName: shopName, // Pass the shop name
          shopPhone: shopPhone // Pass the shop phone
        }  });

    } catch (orderError) {
      setError('Failed to place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Order</h2>
      
      <div className="flex justify-center mb-6 bg-slate-100 p-1 rounded-full">
        <button onClick={() => setOrderType('text')} className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${orderType === 'text' ? 'bg-white shadow' : 'text-gray-500'}`}>Type Your List</button>
        <button onClick={() => setOrderType('upload')} className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${orderType === 'upload' ? 'bg-white shadow' : 'text-gray-500'}`}>Upload a Picture</button>
      </div>

      <form onSubmit={handleSubmitOrder} className="space-y-6">
        {orderType === 'text' ? (
          <textarea
            value={listContent}
            onChange={(e) => setListContent(e.target.value)}
            className="w-full h-40 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., 5kg Aata, 1L Milk, 2 dozen eggs..."
          />
        ) : (
          <div>
            <input
              type="file"
              onChange={(e) => setListImage(e.target.files ? e.target.files[0] : null)}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            {listImage && <p className="text-xs text-gray-500 mt-1">Selected: {listImage.name}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          <Input id="customerName" label="Your Name" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          <Input id="customerPhone" label="Your Phone Number" type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <div className="pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};