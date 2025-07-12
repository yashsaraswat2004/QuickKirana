import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: string;
  storeCount: number;
  gradient: string;
}

interface CategoriesProps {
  onCategoryClick: (categoryId: string) => void;
}

const CategoryCard = ({ category, index, onClick }: { category: Category; index: number; onClick: (id: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.05 }}
    onClick={() => onClick(category.id)}
    className="group cursor-pointer"
  >
    <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
      <span className="text-3xl">{category.icon}</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-800 text-center mb-1 group-hover:text-indigo-600 transition-colors duration-300">
      {category.name}
    </h3>
    <p className="text-sm text-gray-500 text-center">
      {category.storeCount} stores
    </p>
  </motion.div>
);

export const Categories = ({ onCategoryClick }: CategoriesProps) => {
  const categories: Category[] = [
    {
      id: 'grocery',
      name: 'Grocery',
      icon: '🛒',
      storeCount: 45,
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'medical',
      name: 'Medical',
      icon: '⚕️',
      storeCount: 23,
      gradient: 'from-red-400 to-pink-500'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      storeCount: 18,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'stationery',
      name: 'Stationery',
      icon: '📝',
      storeCount: 32,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'cosmetics',
      name: 'Cosmetics',
      icon: '💄',
      storeCount: 27,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      id: 'clothing',
      name: 'Clothing',
      icon: '👕',
      storeCount: 15,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'hardware',
      name: 'Hardware',
      icon: '🔧',
      storeCount: 12,
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      id: 'bakery',
      name: 'Bakery',
      icon: '🥖',
      storeCount: 8,
      gradient: 'from-amber-400 to-yellow-500'
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shop by Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find exactly what you need from our diverse range of local store categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onClick={onCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
