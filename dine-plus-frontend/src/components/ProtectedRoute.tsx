import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresStaff?: boolean;
  requiresKitchen?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresStaff = false,
  requiresKitchen = false,
}) => {
  const { user, loading, isStaffOrAdmin, isKitchenStaff } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiresStaff && !isStaffOrAdmin()) {
    return <Navigate to="/" />;
  }

  if (requiresKitchen && !isKitchenStaff()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export {};
