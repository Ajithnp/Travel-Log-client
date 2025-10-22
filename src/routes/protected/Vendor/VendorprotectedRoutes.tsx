import type { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROLE } from '@/types/Role';

interface AdminPrivateRoutesProps {
  children?: React.ReactNode;
}

export const VendorPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const user = useSelector((state: RootState) => state.vendor.vendor);
    if(!user) {
        return <Navigate to="/vendor/login" replace />;
    }
    if(user.role !== ROLE.VENDOR) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const VendorPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const user = useSelector((state: RootState)=> state.vendor.vendor);
    if(user && user?.role !== ROLE.VENDOR) {
        return <Navigate to="/unauthorized" replace />;
    }

    if(user && user?.role === ROLE.VENDOR) {
        return <Navigate to="/vendor/profile" replace />;
    }

    return <>{children}</>;
}
