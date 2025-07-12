import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute'; // <-- Step 1: Import ProtectedRoute
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ShopListPage } from './pages/ShopListPage';
import { ShopDetailPage } from './pages/ShopDetailPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
/**
 * The Layout component is a smart wrapper that decides whether to show the
 * Header and Footer. For a cleaner, more focused experience, we hide them
 * on the login, signup, and dashboard pages.
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/signup', '/dashboard'];

  if (noLayoutRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/shops" element={<ShopListPage />} />
          <Route path="/shop/:shopId" element={<ShopDetailPage />} />
           <Route path="/order-success" element={<OrderConfirmationPage />} />

          {/* --- Protected Shopkeeper Route --- */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute> {/* <-- Step 2: Use the imported component */}
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;