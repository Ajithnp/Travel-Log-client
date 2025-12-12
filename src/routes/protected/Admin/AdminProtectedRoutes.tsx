import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROLE } from '@/types/Role';
import { useAuthUser } from '@/hooks/useAuthUser';
interface AdminPrivateRoutesProps {
    children?: React.ReactNode;
}

export const AdminPrivateRoutes = ({children}: AdminPrivateRoutesProps) => {
  
    const { user } = useAuthUser();
    if(!user) {
        return <Navigate to="/admin/login" replace />;
    }
    if(user && user.role !== ROLE.ADMIN) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const AdminPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const { user } = useAuthUser()
    if(user && user?.role !== ROLE.ADMIN) {
        return <Navigate to="/unauthorized" replace />;
    }

    if(user && user?.role === ROLE.ADMIN) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
}







