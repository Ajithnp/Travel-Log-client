import AdminLogin from "@/features/auth/pages/admin/LoginPage";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AdminPrivateRoutes,
  AdminPublicRoutes,
} from "@/routes/protected/Admin/AdminProtectedRoutes";
import AdminLayout from "@/layouts/AdminLayout";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { Loading } from "@/components/ui/loading";

const CategoryRequestReviewedPage = lazy(()=> import('@/features/admin/category-management/pages/category-request-reviewed'))
const CategoryRequestedPage = lazy(() => import('@/features/admin/category-management/pages/vendor-request-category'));
const CategoryListPage = lazy(()=> import("@/features/admin/category-management/pages/category-list-page"))
const UserListPage = lazy(() => import("@/features/admin/user-management/pages/UsersList"));
const VendorsListPage = lazy(() => import('@/features/admin/vendor-management/pages/VendorListPage'));
const VendorProfilePage = lazy(() => import('@/features/admin/vendor-management/pages/vendor-profile'));
const VendorsVerificationListPage = lazy(() => import('@/features/admin/vendor-verification/pages/VendorsVerificationRequestList'))
const CancellationPoliciesPage = lazy(() => import('@/features/admin/cancellation-policy/pages/cancellation-policies'));
const NotificationPage = lazy(() => import('@/features/notification/pages/notification-list'));
const CancelBookingListingPage = lazy(() => import('@/features/admin/cancel-booking/pages/cancel-bookings-listing'))
const VendorsPackagesPage = lazy(() => import('@/features/admin/package-oversight/pages/vendors-packages'))
const VendorPackageDetailsPage = lazy(() => import('@/features/admin/package-oversight/pages/vendors-package-details'))
const VendorPackageSchedulesPage = lazy(() => import('@/features/admin/package-oversight/pages/vendors-package-schedules'))
const CouponsPage = lazy(() => import('@/features/admin/coupons/pages/coupon-list'))


const AdminRoutes = () => {
  return (
    <Suspense fallback={<Loading variant="spinner" text="Loading.." fullscreen />}>
      <Routes>
        <Route
          path="/login"
          element={
            <AdminPublicRoutes>
              {" "}
              <AdminLogin />{" "}
            </AdminPublicRoutes>
          }
        />

        <Route
          path="/"
          element={
            <ErrorBoundary
              FallbackComponent={ErrorFallback}>
              <AdminPrivateRoutes>
                {" "}
                <AdminLayout />{" "}
              </AdminPrivateRoutes>
            </ErrorBoundary>
          }
        >
          <Route path="dashboard" element={<div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          </div>
          } />
          <Route path='notifications' element={<NotificationPage />} />
          <Route path="categories" element={<CategoryListPage />} />
          <Route path="categories/vendor-request" element={<CategoryRequestedPage />} />
          <Route path="categories/vendor-request/reviewed" element={<CategoryRequestReviewedPage />} />
           <Route path="coupons" element={<CouponsPage/>} />
           <Route path="cancellation-policies" element={<CancellationPoliciesPage/>} />
           <Route path="user/cancel-bookings" element={<CancelBookingListingPage/>} />
          {/* vendors */}
          <Route
            path="vendor/verification-request"
            element={<VendorsVerificationListPage />}
          />
          <Route
            path="packages-oversight"
            element={<VendorsPackagesPage />}
          />
          <Route
            path="packages-oversight/:packageId"
            element={<VendorPackageDetailsPage />}
          />
          <Route
            path="packages-oversight/schedules"
            element={<VendorPackageSchedulesPage />}
          />
          <Route
            path="vendors"
            element={<VendorsListPage />}
          />
          <Route
            path="vendor/:vendorId"
            element={<VendorProfilePage />}
          />

          {/* users */}
          <Route
            path="users"
            element={<UserListPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
