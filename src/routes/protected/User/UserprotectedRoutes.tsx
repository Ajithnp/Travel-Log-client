import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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




export const AuthPublicRoutes = ({children}: AdminPrivateRoutesProps) => {
    const {user } = useAuthUser()
     const location = useLocation();

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
