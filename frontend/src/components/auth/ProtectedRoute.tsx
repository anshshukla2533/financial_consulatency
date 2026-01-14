import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check authentication logic
  const isAuthenticated = false; // Replace with actual check

  if (!isAuthenticated) {
    return <div>Please login to access this page.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;