import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';

// Define the structure of an Order object
export interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  status: 'Received' | 'Preparing' | 'Ready for Pickup' | 'Completed';
  itemsDescription: string;
  imageOfList?: string;
  orderType: 'pickup' | 'delivery';
  createdAt: string;
}

const statusColors = {
  Received: 'bg-blue-100 text-blue-800 border-blue-300',
  Preparing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Ready for Pickup': 'bg-green-100 text-green-800 border-green-300',
  Completed: 'bg-gray-100 text-gray-800 border-gray-300',
};

export const OrderCard = ({ order, onUpdateStatus }: { order: Order, onUpdateStatus: (orderId: string, newStatus: Order['status']) => void }) => {
  const nextStatusMap = {
    Received: 'Preparing',
    Preparing: 'Ready for Pickup',
    'Ready for Pickup': 'Completed',
  };

  const actionTextMap = {
    Received: 'Accept & Start Preparing',
    Preparing: 'Mark as Ready for Pickup',
    'Ready for Pickup': 'Mark as Completed',
  };

  const canUpdate = order.status !== 'Completed';
  const nextStatusValue = nextStatusMap[order.status];
  const actionText = actionTextMap[order.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-between"
    >
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