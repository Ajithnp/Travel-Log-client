import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '@/components/error.fallback.ui'
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
const VerifyOtp = lazy(() => import('@/features/auth/pages/vendor/VerifyOTP'));

const VendorSidebarLayout = lazy(() => import('@/layouts/VendorLayout'));

const VendorProfilePage = lazy(() => import('@/features/vendor/pages/VendorProfilePage'));







const VendorRoutes = () => {
  return (
    <Suspense fallback={<Loading variant="spinner" text="Loading.." className="w-full h-full" />}>

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

        <Route path='/' element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}>
            <VendorPrivateRoutes>
              <VendorSidebarLayout />
            </VendorPrivateRoutes>
          </ErrorBoundary>
        } >
          <Route path='profile' element={<VendorProfilePage />} />
        </Route>

      </Routes>
    </Suspense>
  )
}

export default VendorRoutes
