import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '@/components/ErrorFallback'
import { VendorPublicRoutes, VendorPrivateRoutes } from '@/routes/protected/Vendor/VendorprotectedRoutes'
import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loading } from "@/components/ui/loading";

const VendorAuthLayout = lazy(() => import('@/layouts/auth/vendor.auth.layout'));
const VendorEnterLogin = lazy(() => import('@/features/auth/components/VendorEnterLogin'))
const VendorEmailverifyPage = lazy(() => import('@/features/auth/pages/vendor/VerifyEmailPage'))
const VendorForgotPasswordPage = lazy(() => import('@/features/auth/pages/vendor/ForgotPassword'));
const VendorLoginPage = lazy(() => import('@/features/auth/pages/vendor/LoginPage'));
const VendorNewPasswordPage = lazy(() => import('@/features/auth/pages/vendor/NewPasswordPage'));
const VendorRegisterPage = lazy(() => import('@/features/auth/pages/vendor/RegisterPage'));
const VerifyOtp = lazy(() => import('@/features/auth/pages/vendor/VerifyOtpPage'));
const VendorSidebarLayout = lazy(() => import('@/layouts/VendorLayout'));
const VendorProfilePage = lazy(() => import('@/features/vendor/pages/VendorProfilePage'));
const VendorVerificationPage = lazy(() => import('@/features/vendor/pages/VendorVerificationPage'));
const VendorProfileEditPage = lazy(() => import('@/features/vendor/pages/ProfileEditPage'));
/*----Package---- */
// const BasePackagePage = lazy(() => import('@/features/vendor/package/base-package/components/base-package'));
const BasePackagePage = lazy(() => import('@/features/vendor/package/base-package/page/base-package-list'));
const BasePackageCreateFormPage = lazy(() => import('@/features/vendor/package/base-package/page/base-package-form.page'));
const BasePackageDraftFormPage = lazy(() => import('@/features/vendor/package/base-package/page/base-package-draft-form'));
const BasePackageDetailsPage = lazy(() => import('@/features/vendor/package/base-package/page/base-package-details'));

//---- categories-------
const RequestedCategoriesListPage = lazy(()=> import('@/features/vendor/category/pages/requested-category'))


const VendorRoutes = () => {
  return (
    <Suspense fallback={<Loading variant="spinner" text="Loading.." fullscreen />}>

      <Routes>
        <Route path='/auth/enter' element={<VendorPublicRoutes> <VendorEnterLogin /> </VendorPublicRoutes>} errorElement={<ErrorFallback />} />
        <Route path='/' element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}>
            <VendorPublicRoutes>
              <VendorAuthLayout />
            </VendorPublicRoutes>
          </ErrorBoundary>
        } errorElement={<ErrorFallback />}>

          <Route path='login' element={<VendorLoginPage />} />
          <Route path='register' element={<VendorRegisterPage />} />
          <Route path='verify-email' element={<VendorEmailverifyPage />} />
          <Route path='forgot-password' element={<VendorForgotPasswordPage />} />
          <Route path='verify-otp' element={<VerifyOtp />} />
          <Route path='new-password' element={<VendorNewPasswordPage />} />
        </Route>

         {/* PRIVATE VENDOR ROUTES */}
        <Route path='/' element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}>
            <VendorPrivateRoutes>
              <VendorSidebarLayout />
            </VendorPrivateRoutes>
          </ErrorBoundary>
        } >
          <Route path='profile' element={<VendorProfilePage />} />
          <Route path='profile-edit' element={<VendorProfileEditPage />} />
          <Route path='verification' element={<VendorVerificationPage />} />
          {/* package */}
          <Route path="packages" element={<BasePackagePage />} />
          <Route path="packages/add" element={<BasePackageCreateFormPage />} />
          <Route path="packages/draft/:packageId" element={<BasePackageDraftFormPage />} />
          <Route path="packages/details/:packageId" element={<BasePackageDetailsPage />} />

          {/* category */}
           <Route path="requested-categories" element={<RequestedCategoriesListPage />} />
        </Route>

      </Routes>
    </Suspense>
  )
}

export default VendorRoutes
