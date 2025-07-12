import { motion } from 'framer-motion';

export const OrderOptions = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_rgba(16,185,129,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,_rgba(6,182,212,0.1)_0%,_transparent_50%)]"></div>
      </div>
      
      {/* Shopping Elements */}
      <div className="absolute top-20 right-20 text-5xl opacity-10 animate-bounce">🚚</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-pulse">🏪</div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Your Choice, Your Convenience 🛍️
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you prefer to pick up or have it delivered, we've got you covered. Plus, get urgent orders on the same day!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Pickup Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white text-3xl">🏪</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Store Pickup</h3>
              <div className="text-3xl font-black text-emerald-600 mb-4">FREE</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visit the store when your order is ready. Get called when it's prepared - no more guessing!
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>No delivery charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Direct interaction with shopkeeper</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Quality check before taking</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Delivery Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white text-3xl">🚚</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Home Delivery</h3>
              <div className="text-3xl font-black text-blue-600 mb-4">₹20-50</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get your groceries delivered to your doorstep. Delivery charges apply based on distance.
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Stay home comfort</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Contactless delivery option</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Flexible delivery timing</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Urgent Priority */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl border-2 border-orange-200 transition-all duration-500 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white text-3xl">⚡</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Urgent Priority</h3>
              <div className="text-3xl font-black text-orange-600 mb-4">Same Day</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Need groceries today? Pay online first to mark as urgent and get same-day service!
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>Same day preparation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>Online payment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>Priority processing</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-white/20 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Pro Tip</h3>
            <p className="text-gray-600 leading-relaxed">
              For regular orders, choose pickup to save money. For urgent needs, use the priority option with online payment. 
              Either way, you'll save time by not having to visit the store just to submit your list!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
