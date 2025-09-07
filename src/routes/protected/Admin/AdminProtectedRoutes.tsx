import type { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface AdminPrivateRoutesProps {
  children?: React.ReactNode;
}

export const AdminPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const user = useSelector((state: RootState) => state.admin.admin);
    if(!user) {
        return <Navigate to="/admin/login" replace />;
    }
    if(user.role !== 'admin') {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const AdminPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const user = useSelector((state: RootState)=> state.admin.admin);
    if(user && user?.role !== 'admin') {
        return <Navigate to="/unauthorized" replace />;
    }

    if(user && user?.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
}







