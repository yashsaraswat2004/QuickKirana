import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';

// Define the structure of an Order object - Updated to handle both old and new status values
export interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  status: 'Recieved' | 'Received' | 'Preparing' | 'Ready For Pickup' | 'Ready for Pickup' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  itemsDescription: string;
  imageOfList?: string;
  orderType: 'pickup' | 'delivery';
  createdAt: string;
  isUrgent?: boolean;
}

type OrderStatus = Order['status'];

// Comprehensive status config that handles both old and new values
const statusConfig: Record<OrderStatus, { color: string, bg: string, icon: string, label: string }> = {
  'Recieved': { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: '📨', label: 'New Order' },
  'Received': { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: '📨', label: 'New Order' },
  'Preparing': { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', icon: '👨‍🍳', label: 'Preparing' },
  'Ready For Pickup': { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: '✅', label: 'Ready' },
  'Ready for Pickup': { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: '✅', label: 'Ready' },
  'Out for Delivery': { color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', icon: '🚚', label: 'Delivering' },
  'Completed': { color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200', icon: '🎉', label: 'Completed' },
  'Cancelled': { color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: '❌', label: 'Cancelled' },
};

// Helper function to calculate progress percentage
const getProgressPercentage = (status: OrderStatus): number => {
  const progressMap: Record<OrderStatus, number> = {
    'Recieved': 25,
    'Received': 25,
    'Preparing': 50,
    'Ready For Pickup': 75,
    'Ready for Pickup': 75,
    'Out for Delivery': 85,
    'Completed': 100,
    'Cancelled': 0,
  };
  return progressMap[status] || 0;
};

export const OrderCard = ({ order, onUpdateStatus }: { order: Order, onUpdateStatus: (orderId: string, newStatus: Order['status']) => void }) => {
  // Debug log to see what status values we're getting
  console.log('Order status received:', order.status, typeof order.status);
  
  const nextStatusMap: Record<OrderStatus, OrderStatus> = {
    'Recieved': 'Preparing',
    'Received': 'Preparing',
    'Preparing': order.orderType === 'pickup' ? 'Ready For Pickup' : 'Out for Delivery',
    'Ready For Pickup': 'Completed',
    'Ready for Pickup': 'Completed',
    'Out for Delivery': 'Completed',
    'Completed': 'Completed',
    'Cancelled': 'Cancelled',
  };

  const actionTextMap: Record<OrderStatus, string> = {
    'Recieved': 'Start Preparing',
    'Received': 'Start Preparing',
    'Preparing': order.orderType === 'pickup' ? 'Mark Ready for Pickup' : 'Start Delivery',
    'Ready For Pickup': 'Mark as Completed',
    'Ready for Pickup': 'Mark as Completed',
    'Out for Delivery': 'Mark as Delivered',
    'Completed': 'Order Completed',
    'Cancelled': 'Order Cancelled',
  };

  const canUpdate = !['Completed', 'Cancelled'].includes(order.status);
  const nextStatusValue = nextStatusMap[order.status];
  const actionText = actionTextMap[order.status];
  const statusInfo = statusConfig[order.status];

  // Enhanced fallback for undefined statusInfo
  const safeStatusInfo = statusInfo || {
    color: 'text-gray-700',
    bg: 'bg-gray-50 border-gray-200',
    icon: '❓',
    label: `Unknown Status: ${order.status}`
  };

  // Log if we're using fallback
  if (!statusInfo) {
    console.warn('Unknown status detected:', order.status, 'Using fallback statusInfo');
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const orderDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className={`bg-white rounded-2xl shadow-lg border-2 ${safeStatusInfo.bg} p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
    >
      {/* Urgent Badge */}
      {order.isUrgent && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
          URGENT
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{safeStatusInfo.icon}</div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{order.customerName}</h3>
            <p className="text-sm text-gray-600">{order.customerPhone}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{getTimeAgo(order.createdAt)}</p>
          <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${safeStatusInfo.color} ${safeStatusInfo.bg} mb-4`}>
        <span className="mr-1">{safeStatusInfo.icon}</span>
        {safeStatusInfo.label}
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600 mb-2">Order Details:</p>
          {order.imageOfList && order.imageOfList !== '' ? (
            <div className="space-y-2">
              <div className="relative">
                <img 
                  src={order.imageOfList} 
                  alt="Customer's grocery list" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                  📷 Image List
                </div>
              </div>
              <a 
                href={order.imageOfList} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Full Size
              </a>
            </div>
          ) : (
            <p className="text-gray-900 font-medium whitespace-pre-wrap">{order.itemsDescription}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Type:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              order.orderType === 'pickup' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {order.orderType === 'pickup' ? '🏪 Pickup' : '🚚 Delivery'}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            ID: {order._id.slice(-6)}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex space-x-2">
        {canUpdate && (
          <Button
            onClick={() => onUpdateStatus(order._id, nextStatusValue)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {actionText}
          </Button>
        )}
        
        {(order.status === 'Recieved' || order.status === 'Received') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onUpdateStatus(order._id, 'Cancelled')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            Cancel
          </motion.button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{Math.round(getProgressPercentage(order.status))}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage(order.status)}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};