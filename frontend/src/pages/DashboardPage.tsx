import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { OrderCard, type Order } from '../components/features/Dashboard/OrderCard';
import { Button } from '../components/ui/Button';

// Dashboard Stats Component
const StatCard = ({ title, value, icon, color, trend }: { 
  title: string, 
  value: string | number, 
  icon: React.ReactNode, 
  color: string,
  trend?: { value: number, isPositive: boolean }
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${color} relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-white/20 rounded-full -mr-10 -mt-10"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}% from last week
          </div>
        )}
      </div>
      <div className="text-4xl opacity-70">
        {icon}
      </div>
    </div>
  </motion.div>
);

// Quick Actions Component
const QuickActionCard = ({ title, description, icon, onClick, color }: {
  title: string,
  description: string,
  icon: React.ReactNode,
  onClick: () => void,
  color: string
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full bg-white rounded-2xl p-6 shadow-lg border-l-4 ${color} text-left transition-all duration-200 hover:shadow-xl`}
  >
    <div className="flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </motion.button>
);

// Filter Component
const FilterTabs = ({ activeFilter, onFilterChange }: { 
  activeFilter: string, 
  onFilterChange: (filter: string) => void 
}) => {
  const filters = [
    { key: 'all', label: 'All Orders', color: 'bg-gray-500' },
    { key: 'received', label: 'New', color: 'bg-blue-500' },
    { key: 'preparing', label: 'Preparing', color: 'bg-yellow-500' },
    { key: 'ready', label: 'Ready', color: 'bg-green-500' },
  ];

  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            activeFilter === filter.key
              ? `${filter.color} text-white shadow-lg`
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export const DashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchOrders = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const token = localStorage.getItem('shopkeeperToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`https://quickkirana-backend.onrender.com/api/orders/${orderId}`, { status: newStatus }, config);
      
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

  // Filter orders based on active filter
  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'received') return order.status === 'Received';
    if (activeFilter === 'preparing') return order.status === 'Preparing';
    if (activeFilter === 'ready') return order.status === 'Ready for Pickup';
    return true;
  });

  // Calculate stats
  const stats = {
    totalOrders: orders.length,
    newOrders: orders.filter(o => o.status === 'Received').length,
    preparing: orders.filter(o => o.status === 'Preparing').length,
    ready: orders.filter(o => o.status === 'Ready for Pickup').length,
    completed: orders.filter(o => o.status === 'Completed').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={fetchOrders} disabled={loading}>
              {loading ? 'Refreshing...' : '🔄 Refresh'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon="📊"
            color="border-blue-500"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="New Orders"
            value={stats.newOrders}
            icon="🆕"
            color="border-green-500"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Preparing"
            value={stats.preparing}
            icon="👨‍🍳"
            color="border-yellow-500"
          />
          <StatCard
            title="Ready for Pickup"
            value={stats.ready}
            icon="✅"
            color="border-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              title="View Analytics"
              description="See detailed reports and insights"
              icon="📈"
              onClick={() => alert('Analytics feature coming soon!')}
              color="border-blue-500"
            />
            <QuickActionCard
              title="Store Settings"
              description="Update your store information"
              icon="⚙️"
              onClick={() => alert('Settings feature coming soon!')}
              color="border-gray-500"
            />
            <QuickActionCard
              title="Customer Support"
              description="Help and support for customers"
              icon="🎧"
              onClick={() => alert('Support feature coming soon!')}
              color="border-green-500"
            />
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <div className="text-sm text-gray-600">
              {filteredOrders.length} of {orders.length} orders
            </div>
          </div>

          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          {error && (
            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-20 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-xl font-semibold">No orders found</p>
              <p className="text-sm mt-2">
                {activeFilter === 'all' 
                  ? "You don't have any orders yet." 
                  : `No orders in the ${activeFilter} category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OrderCard order={order} onUpdateStatus={handleUpdateStatus} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
