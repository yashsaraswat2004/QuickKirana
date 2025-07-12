import { useState, useEffect } from 'react';
import axios from 'axios';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { OrderCard, type Order } from '../components/features/Dashboard/OrderCard';
import { Button } from '../components/ui/Button';

export const DashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      // setLoading(true); // Optional: for manual refresh loading state
      const token = localStorage.getItem('shopkeeperToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('https://quickkirana-backend.onrender.com/api/orders/my-orders', config);
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when the component first loads
  useEffect(() => {
    fetchOrders();
    
    // Optional: Poll for new orders every 30 seconds for a real-time feel
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const token = localStorage.getItem('shopkeeperToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`https://quickkirana-backend.onrender.com/api/orders/${orderId}`, { status: newStatus }, config);
      
      // Update the order status in the local state for an instant UI update
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert('Failed to update order status.');
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Active Orders</h1>
        <Button onClick={fetchOrders} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Orders'}
        </Button>
      </div>

      {error && <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>}
      
      {!loading && orders.length === 0 && !error && (
        <div className="text-center text-gray-500 py-20 bg-white rounded-lg shadow-sm">
          <p className="text-xl">You have no new orders right now.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map(order => (
          <OrderCard key={order._id} order={order} onUpdateStatus={handleUpdateStatus} />
        ))}
      </div>
    </DashboardLayout>
  );
};
