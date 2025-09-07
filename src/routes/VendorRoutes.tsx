import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '@/components/error.fallback.ui'
import VendorEnterLogin from '@/features/auth/components/vendor.enter.login'
import VendorEmailverifyPage from '@/features/auth/pages/vendor/email.verify.page'
import VendorForgotPasswordPage from '@/features/auth/pages/vendor/forgot.password.page'
import VendorLoginPage from '@/features/auth/pages/vendor/login.page'
import VendorNewPasswordPage from '@/features/auth/pages/vendor/new.password.page'
import VendorRegisterPage from '@/features/auth/pages/vendor/register.page'
import VerifyOtp from '@/features/auth/pages/vendor/verify.otp.page'
import VendorProfile from '@/features/vendor/componenets/vendor.profile'
import VendorProfilePage from '@/features/vendor/pages/vendor.profile.page'
import VendorAuthLayout from '@/layouts/auth/vendor.auth.layout'
import { VendorPublicRoutes } from '@/routes/protected/Vendor/VendorprotectedRoutes'
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import VendorSidebarLayout from "@/layouts/vendor.layout";


const VendorRoutes = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>

      <Routes>

        <Route path='/auth/enter' element={<VendorPublicRoutes> <VendorEnterLogin /> </VendorPublicRoutes>} errorElement={<ErrorFallback />} />
        <Route path='/' element={<VendorPublicRoutes> <VendorAuthLayout /> </VendorPublicRoutes>} errorElement={<ErrorFallback />}>
          <Route path='login' element={<VendorLoginPage />} />
          <Route path='register' element={<VendorRegisterPage />} />
          <Route path='verify-email' element={<VendorEmailverifyPage />} />
          <Route path='forgot-password' element={<VendorForgotPasswordPage />} />
          <Route path='verify-otp' element={<VerifyOtp />} />
          <Route path='new-password' element={<VendorNewPasswordPage />} />
        </Route>

        <Route path='/pvt' element={<ErrorBoundary FallbackComponent={ErrorFallback}> <VendorSidebarLayout /> </ErrorBoundary>} >
          {/* <Route path='profile' element={<VendorProfilePage />} /> */}
        </Route>

      </Routes>



    </Suspense>
  )
}

export default VendorRoutes
