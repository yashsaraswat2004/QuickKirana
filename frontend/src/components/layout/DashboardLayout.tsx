import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Icons for the sidebar
const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const OrdersIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const AnalyticsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const NavLink = ({ to, icon, children, badge }: { to: string, icon: React.ReactNode, children: React.ReactNode, badge?: number }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link to={to} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}>
            <div className="flex items-center space-x-3">
                {icon}
                <span className="font-semibold">{children}</span>
            </div>
            {badge && badge > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                    isActive ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'
                }`}>
                    {badge}
                </span>
            )}
        </Link>
    );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [shopkeeperName, setShopkeeperName] = useState('');

    useEffect(() => {
        // Get shopkeeper info from token or API
        const token = localStorage.getItem('shopkeeperToken');
        if (token) {
            // You can decode the token or make an API call to get shopkeeper details
            setShopkeeperName('Store Owner'); // Placeholder
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('shopkeeperToken');
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            QuickKirana
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                                {shopkeeperName.charAt(0)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed z-40 w-80 bg-white shadow-2xl flex-shrink-0 flex-col border-r border-gray-200 md:hidden"
                    >
                        {/* Logo & Profile Section */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">QK</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                        QuickKirana
                                    </h2>
                                    <p className="text-sm text-gray-500">Dashboard</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">
                                        {shopkeeperName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{shopkeeperName}</p>
                                    <p className="text-sm text-gray-500">Store Manager</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-grow p-4 space-y-2">
                            <NavLink to="/dashboard" icon={<HomeIcon />}>
                                Dashboard
                            </NavLink>
                            <NavLink to="/dashboard/orders" icon={<OrdersIcon />} badge={5}>
                                Orders
                            </NavLink>
                            <NavLink to="/dashboard/analytics" icon={<AnalyticsIcon />}>
                                Analytics
                            </NavLink>
                            <NavLink to="/dashboard/settings" icon={<SettingsIcon />}>
                                Settings
                            </NavLink>
                        </nav>

                        {/* Logout Section */}
                        <div className="p-4 border-t border-gray-200">
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200 group"
                            >
                                <LogoutIcon />
                                <span className="font-semibold">Logout</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-80 bg-white shadow-2xl flex-shrink-0 flex-col border-r border-gray-200">
                {/* Logo & Profile Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-bold">QK</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                QuickKirana
                            </h2>
                            <p className="text-sm text-gray-500">Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                                {shopkeeperName.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{shopkeeperName}</p>
                            <p className="text-sm text-gray-500">Store Manager</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-grow p-4 space-y-2">
                    <NavLink to="/dashboard" icon={<HomeIcon />}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/orders" icon={<OrdersIcon />} badge={5}>
                        Orders
                    </NavLink>
                    <NavLink to="/dashboard/analytics" icon={<AnalyticsIcon />}>
                        Analytics
                    </NavLink>
                    <NavLink to="/dashboard/settings" icon={<SettingsIcon />}>
                        Settings
                    </NavLink>
                </nav>

                {/* Logout Section */}
                <div className="p-4 border-t border-gray-200">
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200 group"
                    >
                        <LogoutIcon />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className={`flex-1 ${isSidebarOpen ? 'md:ml-0' : ''} pt-16 md:pt-0`}>
                <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
};
