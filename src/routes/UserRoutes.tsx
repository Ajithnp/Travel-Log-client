import { AuthPrivateRoutes, AuthPublicRoutes } from '@/routes/protected/User/UserProtectedRoutes';
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthUserLayout from '@/layouts/auth/auth.user.layout';
import { Loading } from '@/components/ui/loading';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '@/components/ErrorFallback';

const UserDashboard = lazy(() => import('@/features/user/pages/Dashboard'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const ProfilePage = lazy(() => import('@/features/user/pages/ProfilePage'));
const LoginPage = lazy(() => import('@/features/auth/pages/user/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/user/RegisterPage'));
const UserForgotPasswordPage = lazy(() => import('@/features/auth/pages/user/ForgotPasswordPage'));
const UserNewPasswordPage = lazy(() => import('@/features/auth/pages/user/NewPasswordPage'));
const VerifyOtp = lazy(() => import('@/features/auth/pages/user/VerifyOtpPage'));
const UserEmailverifyPage = lazy(() => import('@/features/auth/pages/user/VerifyEmailPage'));
const ProfileEditPage = lazy(() => import('@/features/user/pages/ProfileEditPage'));



const UserRoutes = () => {
  return (
    <Suspense fallback={<Loading variant='airplane' text='Loading..' fullscreen />}>

      <Routes>

        <Route path='/user' element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}>
            <AuthPublicRoutes>
              < AuthUserLayout />
            </AuthPublicRoutes>
          </ErrorBoundary>} >

          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='verify-email' element={<UserEmailverifyPage />} />
          <Route path='forgot-password' element={<UserForgotPasswordPage />} />
          <Route path='verify-otp' element={<VerifyOtp />} />
          <Route path='reset-password' element={<UserNewPasswordPage />} />
        </Route>



        <Route path="/" element={
          <AuthPublicRoutes>
            <MainLayout />
          </AuthPublicRoutes>
        }>
          <Route index element={<HomePage />} />
          <Route path='travels' element={<h1>travel page</h1>} />
          <Route path='travels/:id' element={<h1>travel details page</h1>} />
          <Route path='about' element={<h1>About page</h1>} />
          <Route path='contact' element={<h1>Contact page</h1>} />
        </Route>


        <Route path='/user' element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}>
            <AuthPrivateRoutes>
              <MainLayout />
            </AuthPrivateRoutes>
          </ErrorBoundary>
        } >
          <Route path='dashboard' element={<UserDashboard />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='editProfile' element={<ProfileEditPage />} />

        </Route>

      </Routes>
    </Suspense>
  )
}

export default UserRoutes
