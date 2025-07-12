import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';

// Define the structure of an Order object
export interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  status: 'Received' | 'Preparing' | 'Ready for Pickup' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  itemsDescription: string;
  imageOfList?: string;
  orderType: 'pickup' | 'delivery';
  createdAt: string;
  isUrgent?: boolean;
}

type OrderStatus = Order['status'];

const statusConfig: Record<OrderStatus, { color: string, bg: string, icon: string, label: string }> = {
  'Received': { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: '📨', label: 'New Order' },
  'Preparing': { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', icon: '👨‍🍳', label: 'Preparing' },
  'Ready for Pickup': { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: '✅', label: 'Ready' },
  'Out for Delivery': { color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', icon: '🚚', label: 'Delivering' },
  'Completed': { color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200', icon: '🎉', label: 'Completed' },
  'Cancelled': { color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: '❌', label: 'Cancelled' },
};

// Helper function to calculate progress percentage
const getProgressPercentage = (status: OrderStatus): number => {
  const progressMap: Record<OrderStatus, number> = {
    'Received': 25,
    'Preparing': 50,
    'Ready for Pickup': 75,
    'Out for Delivery': 85,
    'Completed': 100,
    'Cancelled': 0,
  };
  return progressMap[status] || 0;
};

export const OrderCard = ({ order, onUpdateStatus }: { order: Order, onUpdateStatus: (orderId: string, newStatus: Order['status']) => void }) => {
  const nextStatusMap: Record<OrderStatus, OrderStatus> = {
    'Received': 'Preparing',
    'Preparing': order.orderType === 'pickup' ? 'Ready for Pickup' : 'Out for Delivery',
    'Ready for Pickup': 'Completed',
    'Out for Delivery': 'Completed',
    'Completed': 'Completed',
    'Cancelled': 'Cancelled',
  };

  const actionTextMap: Record<OrderStatus, string> = {
    'Received': 'Start Preparing',
    'Preparing': order.orderType === 'pickup' ? 'Mark Ready for Pickup' : 'Start Delivery',
    'Ready for Pickup': 'Mark as Completed',
    'Out for Delivery': 'Mark as Delivered',
    'Completed': 'Order Completed',
    'Cancelled': 'Order Cancelled',
  };

  const canUpdate = !['Completed', 'Cancelled'].includes(order.status);
  const nextStatusValue = nextStatusMap[order.status];
  const actionText = actionTextMap[order.status];
  const statusInfo = statusConfig[order.status];

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
      className={`bg-white rounded-2xl shadow-lg border-2 ${statusInfo.bg} p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
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
          <div className="text-2xl">{statusInfo.icon}</div>
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
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} ${statusInfo.bg} mb-4`}>
        <span className="mr-1">{statusInfo.icon}</span>
        {statusInfo.label}
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600 mb-1">Order Details:</p>
          <p className="text-gray-900 font-medium">{order.itemsDescription}</p>
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

      {/* Image Preview */}
      {order.imageOfList && (
        <div className="mb-4">
          <img 
            src={order.imageOfList} 
            alt="Order items" 
            className="w-full h-32 object-cover rounded-lg border"
          />
        </div>
      )}

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
        
        {order.status === 'Received' && (
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
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{order.customerName}</h3>
            <p className="text-sm text-gray-500">{order.customerPhone}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusColors[order.status]}`}>
            {order.status}
          </span>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg mb-4 border min-h-[100px]">
          <h4 className="font-semibold text-gray-700 mb-2">Order List:</h4>
          {/* CORRECTED LOGIC: Check for a non-empty imageOfList string */}
          {order.imageOfList && order.imageOfList !== '' ? (
            <a href={order.imageOfList} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 hover:underline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              View Uploaded List
            </a>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap">{order.itemsDescription}</p>
          )}
        </div>
      </div>

      {/* CORRECTED LOGIC: Ensure the button and text appear correctly */}
      {canUpdate && actionText && (
        <div className="mt-auto pt-4">
          <Button onClick={() => onUpdateStatus(order._id, nextStatusValue)}>
            {actionText}
          </Button>
        </div>
      )}
    </motion.div>
  );
};