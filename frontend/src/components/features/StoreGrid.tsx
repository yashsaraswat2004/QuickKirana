import { motion } from 'framer-motion';
import { StoreCard } from './StoreCard';

interface Store {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  categories: string[];
  isOpen: boolean;
  address: string;
}

interface StoreGridProps {
  stores: Store[];
  onStoreClick: (store: Store) => void;
}

export const StoreGrid = ({ stores, onStoreClick }: StoreGridProps) => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Discover Local Stores
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our network of trusted local kirana stores and find everything you need.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {['All Stores', 'Open Now', 'Fast Delivery', 'Highly Rated', 'Nearby'].map((filter, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                index === 0
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-white/80 text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Store Grid */}
        {stores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {stores.map((store, index) => (
              <StoreCard
                key={store.id}
                store={store}
                index={index}
                onClick={onStoreClick}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No stores found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
