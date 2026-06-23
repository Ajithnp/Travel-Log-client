import { AuthPrivateRoutes, AuthPublicRoutes } from './protected/User/UserprotectedRoutes';
import  { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layouts/app/app-layout';
import AuthUserLayout from '@/layouts/auth/auth.user.layout';
import { Loading } from '@/components/ui/loading';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '@/components/ErrorFallback';
import NotFound404 from '@/components/404';

const UserDashboard = lazy(() => import('@/features/user/pages/Dashboard'));
const HomePage = lazy(() => import('@/pages/new-home-page'));
const PackageListPage = lazy(() => import('@/pages/package-list'));
const PackageDetailsPage = lazy(() => import('@/pages/package-details'));
const ProfilePage = lazy(() => import('@/features/user/pages/ProfilePage'));
const LoginPage = lazy(() => import('@/features/auth/pages/user/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/user/RegisterPage'));
const UserForgotPasswordPage = lazy(() => import('@/features/auth/pages/user/ForgotPasswordPage'));
const UserNewPasswordPage = lazy(() => import('@/features/auth/pages/user/NewPasswordPage'));
const VerifyOtp = lazy(() => import('@/features/auth/pages/user/VerifyOtpPage'));
const UserEmailverifyPage = lazy(() => import('@/features/auth/pages/user/VerifyEmailPage'));
const ProfileEditPage = lazy(() => import('@/features/user/pages/ProfileEditPage'));
const WishlistPage = lazy(() => import('@/features/user/wishlist/pages/wishlist'));
const VendorProfilePage = lazy(() => import('@/pages/vendor-profile'));
const BookingSuccessPage = lazy(() => import('@/pages/booking/booking-success'));
const BookingFailurePage = lazy(() => import('@/pages/booking/booking-failed'));
const BookingConfirmPage = lazy(() => import('@/pages/booking/booking-confirm'));
const BookingListPage = lazy(() => import('@/features/user/booking/pages/booking-list'));
const BookingDetailsPage = lazy(() => import('@/features/user/booking/pages/booking-details'));
const NotificationPage = lazy(() => import('@/features/notification/pages/notification-list'));
const UserChatPage = lazy(() => import('@/features/chat/pages/user-chat-page'));
const WalletPage = lazy(() => import('@/features/user/wallet/pages/wallet'));
const ContactPage = lazy(() => import('@/pages/contact-page'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<Loading variant='airplane' text='Loading..' fullscreen />}>

      <Routes>
         {/* Auth pages — guests only */}
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


       {/* Public pages — everyone*/}
        <Route path="/" element={
            <MainLayout />
        }>
          <Route index element={<HomePage />} />
          <Route path='packages' element={<PackageListPage/>} />
          <Route path='packages/:id' element={<PackageDetailsPage />} />
          <Route path='packages/vendor/:vendorId/profile' element={<VendorProfilePage />} />
          <Route path='about' element={<h1>About page</h1>} />
          <Route path='contact' element={<ContactPage />} />
           
          <Route path='*' element={<NotFound404 pathname={window.location.pathname} />}/>           
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
          <Route path='wishlist' element={<WishlistPage />} />
          <Route path='notifications' element={<NotificationPage />} />
          <Route path="chat" element={<UserChatPage />} />

          <Route path='booking/confirm' element={<BookingConfirmPage />} />
          <Route path='payment/success' element={<BookingSuccessPage />} />
          <Route path='payment/failure' element={<BookingFailurePage />} />
          <Route path='bookings' element={<BookingListPage />} />
          <Route path='bookings/:bookingId' element={<BookingDetailsPage />} />
          
          <Route path='wallet' element={<WalletPage />} />
        </Route>
         
         <Route path='*' element={<NotFound404 pathname={window.location.pathname} />}/>
      </Routes>
    </Suspense>
  )
}

export default UserRoutes
