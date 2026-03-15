import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLE } from '@/types/Role';
import { useVendorProfileQuery } from '@/features/vendor/hooks/api.hooks';
import { useAuthUser } from '@/hooks/useAuthUser';
import { Loader } from '@/components/common/loader';

interface AdminPrivateRoutesProps {
    children?: React.ReactNode;
}

export const VendorPrivateRoutes = ({ children }: AdminPrivateRoutesProps) => {

    const { user } = useAuthUser();
    if (!user) {
        return <Navigate to="/vendor/login" replace />;
    }
    if (user.role !== ROLE.VENDOR) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};




export const VendorPublicRoutes = ({ children }: AdminPrivateRoutesProps) => {
    const { user } = useAuthUser();

    if (user) {
        return user.role === ROLE.VENDOR
            ? <Navigate to="/vendor/profile" replace />
            : <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};


// Approval status guard ───────────────────────
export const VendorApprovedGuard = () => {
    const { data: profile, isLoading } = useVendorProfileQuery();

    if (isLoading) return <Loader />;

    switch (profile?.data?.status) {
        case 'Approved':
            return <Outlet />;

        case 'Pending':
            return <Navigate to="/vendor/verify" replace />

        case 'UnderReview':
            return <Navigate to="/vendor/pending" replace />;

        case 'Rejected':
            return <Navigate to="/vendor/rejected" replace />;

        default:
            return <Navigate to="/vendor/verification" replace />;
    }
};