import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const PartnerProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { partnerAuthenticated } = useApp();
  const location = useLocation();

  if (!partnerAuthenticated) {
    return <Navigate to={`/partners/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};
