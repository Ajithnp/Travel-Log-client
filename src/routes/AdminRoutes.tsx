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

const UserListPage = lazy(() => import("@/features/admin/user-management/pages/UsersList"));
const VendorsListPage = lazy(() => import('@/features/admin/vendor-management/pages/VendorListPage'));
const VendorsVerificationListPage = lazy(() => import('@/features/admin/vendor-verification/pages/VendorsVerificationRequestList'))

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
          {/* vendors */}
          <Route
            path="vendor/verification-request"
            element={<VendorsVerificationListPage />}
          />
          <Route
            path="vendors"
            element={<VendorsListPage />}
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
