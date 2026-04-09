import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROLE } from '@/types/Role';
import { useAuthUser } from '@/hooks/useAuthUser';

interface AdminPrivateRoutesProps {
  children?: React.ReactNode;
}

export const AuthPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const { user } = useAuthUser();    
    if(!user) {
        return <Navigate to="/user/login" replace />;
    }
    if(user.role !== ROLE.USER) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};



// Login, register, forgot-password etc.
export const AuthPublicRoutes = ({ children }: AdminPrivateRoutesProps) => {
  const { user } = useAuthUser();

  if (user && user.role === ROLE.USER) {
    return <Navigate to="/" replace />;
  }

  if (user && user.role !== ROLE.USER) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// ── 2. Fully public routes (everyone)
// Home, packages listing, package detail, about, contact.

export const PublicRoutes = ({ children }: AdminPrivateRoutesProps) => {
  return <>{children}</>;
};
