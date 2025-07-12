import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// A simple illustration for the left panel
const AuthIllustration = () => (
    <div className="w-full h-full bg-slate-900 p-12 flex flex-col justify-center items-center text-white">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <Link to="/" className="text-4xl font-bold mb-6 block">QuickKirana</Link>
            <p className="text-slate-300 text-lg max-w-sm text-center">
                The all-in-one platform to manage your store and connect with customers effortlessly.
            </p>
        </motion.div>
    </div>
);

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
        {/* Left Panel - Illustration (hidden on mobile) */}
        <div className="hidden lg:flex w-1/2">
            <AuthIllustration />
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 sm:p-12">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    </div>
  );
};