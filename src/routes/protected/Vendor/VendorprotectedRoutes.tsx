import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROLE } from '@/types/Role';
import { useAuthUser } from '@/hooks/useAuthUser';

interface AdminPrivateRoutesProps {
  children?: React.ReactNode;
}

export const VendorPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const { user } = useAuthUser();
    if(!user) {
        return <Navigate to="/vendor/login" replace />;
    }
    if(user.role !== ROLE.VENDOR) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const VendorPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const { user } = useAuthUser();
    if(user && user?.role !== ROLE.VENDOR) {
        return <Navigate to="/unauthorized" replace />;
    }

    if(user && user?.role === ROLE.VENDOR) {
        return <Navigate to="/vendor/profile" replace />;
    }

    return <>{children}</>;
}
