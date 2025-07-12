import { motion } from 'framer-motion';

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

interface StoreCardProps {
  store: Store;
  index: number;
  onClick: (store: Store) => void;
}

export const StoreCard = ({ store, index, onClick }: StoreCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onClick(store)}
      className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Store Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={store.image} 
          alt={store.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
          store.isOpen 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {store.isOpen ? 'Open' : 'Closed'}
        </div>
        
        {/* Distance Badge */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {store.distance}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Store Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
            {store.name}
          </h3>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">{store.rating}</span>
            <span className="text-sm text-gray-500">({store.reviewCount})</span>
          </div>
        </div>
        
        {/* Address */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{store.address}</p>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {store.categories.slice(0, 3).map((category, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium"
            >
              {category}
            </span>
          ))}
          {store.categories.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{store.categories.length - 3} more
            </span>
          )}
        </div>
        
        {/* Delivery Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{store.deliveryTime}</span>
          </div>
          
          <button className="group-hover:bg-indigo-600 group-hover:text-white bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};
