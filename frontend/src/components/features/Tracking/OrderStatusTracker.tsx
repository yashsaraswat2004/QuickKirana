import {motion} from 'framer-motion';
export interface Order {
  _id: string;
  status: 'Received' | 'Preparing' | 'Ready for Pickup' | 'Out for Delivery' | 'Completed';
  shopkeeper: {
    shopName: string;
  };

}

const statusSteps = ['Received', 'Preparing', 'Ready for Pickup', 'Completed'];
// You can dynamically add 'Out for Delivery' if orderType is 'delivery'

const StatusStep = ({ step, isCompleted, isCurrent }: { step: string, isCompleted: boolean, isCurrent: boolean }) => {
  return (
    <div className="flex items-center">
      <motion.div 
        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted || isCurrent ? 'border-orange-500' : 'border-gray-300'}`}
        animate={{ scale: isCurrent ? 1.1 : 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className={`w-4 h-4 rounded-full ${isCompleted || isCurrent ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
      </motion.div>
      <div className={`ml-4 text-sm font-semibold ${isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-500'}`}>
        {step}
      </div>
    </div>
  );
};

export const OrderStatusTracker = ({ order }: { order: Order }) => {
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
          <p className="text-sm text-gray-500">Order ID: {order._id}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Shop:</p>
          <p className="font-semibold text-gray-800">{order.shopkeeper.shopName}</p>
        </div>
      </div>
      
      <div className="relative pl-4">
        {/* The vertical line */}
        <div className="absolute top-4 left-[15px] w-0.5 h-[calc(100%-2rem)] bg-gray-200"></div>
        
        <div className="space-y-8 relative">
          {statusSteps.map((step, index) => (
            <StatusStep 
              key={step}
              step={step}
              isCompleted={index < currentStepIndex}
              isCurrent={index === currentStepIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
