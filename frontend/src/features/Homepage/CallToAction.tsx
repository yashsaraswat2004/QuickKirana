import { motion } from 'framer-motion';

export const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-white to-indigo-200 rounded-full opacity-10 blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-white to-purple-200 rounded-full opacity-10 blur-xl animate-pulse delay-1000"></div>
      
      {/* Shopping Elements */}
      <div className="absolute top-20 right-20 text-4xl opacity-20 animate-bounce">🛍️</div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-pulse">⏰</div>
      <div className="absolute top-1/2 left-16 text-3xl opacity-20 animate-bounce delay-500">📞</div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Stop Wasting Time! ⏰
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Start Smart Shopping
            </span>
          </h2>
          
          <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands who've already saved countless hours by ditching the back-and-forth trips to kirana stores. 
            <span className="font-semibold text-white">Submit from home, pickup when ready! 🛍️</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-indigo-900 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                🛒 Start Saving Time Now!
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 100-5H9m0 0v3m0-3H7" />
              </svg>
              Learn More
            </motion.button>
          </div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-indigo-200"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>⏰ Save Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>🏠 Submit from Home</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>📞 Get Called</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
