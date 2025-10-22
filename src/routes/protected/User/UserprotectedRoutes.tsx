import type { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ROLE } from '@/types/Role';

interface AdminPrivateRoutesProps {
  children?: React.ReactNode;
}

export const AuthPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const user = useSelector((state: RootState) => state.user.user);
    
    if(!user) {
        return <Navigate to="/" replace />;
    }
    if(user.role !== ROLE.USER) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const AuthPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const {user, isLoading } = useSelector((state: RootState)=> state.user);
     const location = useLocation();
    if (isLoading) {
    return <div className="text-center py-10">Loading user...</div>;
  }

    if(user && user?.role === ROLE.USER) {
        if(location.pathname === '/'){
            return <>{children}</>;
        }
        return <Navigate to="/" replace />;
    }

    if(user && user?.role !== ROLE.USER) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}
