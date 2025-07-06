import type { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface AdminPrivateRoutesProps {
  children?: React.ReactNode;
}

export const AuthPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const user = useSelector((state: RootState) => state.user.user);
    if(!user) {
        return <Navigate to="/" replace />;
    }
    if(user.role !== 'user') {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const AuthPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const user = useSelector((state: RootState)=> state.user.user);
    if(user && user?.role !== 'user') {
        return <Navigate to="/unauthorized" replace />;
    }

    if(user && user?.role === 'user') {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
