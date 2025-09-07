import type { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface AdminPrivateRoutesProps {
  children?: React.ReactNode;
}

export const VendorPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const user = useSelector((state: RootState) => state.vendor.vendor);
    if(!user) {
        return <Navigate to="/vendor/login" replace />;
    }
    if(user.role !== 'vendor') {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const VendorPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const user = useSelector((state: RootState)=> state.vendor.vendor);
    if(user && user?.role !== 'vendor') {
        return <Navigate to="/unauthorized" replace />;
    }

    if(user && user?.role === 'vendor') {
        return <Navigate to="/vendor/pvt" replace />;
    }

    return <>{children}</>;
}
