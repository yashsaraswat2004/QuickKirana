import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const shopName = location.state?.shopName;
  const shopPhone = location.state?.shopPhone;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-lg"
      >
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Order Placed Successfully!</h1>
        <p className="text-gray-600 mt-4">
          Your shopkeeper has received your order and will begin preparing it shortly. 
          You will be notified when it's ready.
        </p>
        {orderId && (
          <p className="mt-6 text-sm text-gray-500">
            Your Order ID is: <span className="font-bold text-gray-700">{orderId}</span>
          </p>
        )}
         {(shopName || shopPhone) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700">Questions about your order?</h3>
                <p className="text-sm text-gray-500 mt-2">You can contact {shopName || 'the shopkeeper'} directly:</p>
                {shopPhone && (
                    <a href={`tel:${shopPhone}`} className="mt-2 inline-block font-bold text-orange-600">
                        Call: {shopPhone}
                    </a>
                )}
            </div>
        )}
        <div className="mt-8">
          <Link to="/" className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};