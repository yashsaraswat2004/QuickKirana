import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <button
        {...props}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white 
                   bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                   disabled:from-orange-300 disabled:to-red-300 disabled:cursor-not-allowed ${className || ''}`}
      >
        {children}
      </button>
    </motion.div>
  );
};