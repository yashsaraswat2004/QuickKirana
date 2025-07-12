import { Navigate } from 'react-router-dom';

// This component will wrap any page we want to protect.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, you'd have a more robust check, maybe from a context or state manager.
  // For now, we'll check for the token in localStorage.
  const token = localStorage.getItem('shopkeeperToken');

  if (!token) {
    // If no token is found, redirect the user to the login page.
    return <Navigate to="/login" replace />;
  }

  // If a token exists, render the child component (the protected page).
  return <>{children}</>;
};

export default ProtectedRoute;