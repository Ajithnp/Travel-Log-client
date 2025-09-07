import { AuthPrivateRoutes, AuthPublicRoutes } from '@/routes/protected/User/UserprotectedRoutes';
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthUserLayout from '@/layouts/auth/auth.user.layout';
import LoginPage from '@/features/auth/pages/user/login.page';
import RegisterPage from '@/features/auth/pages/user/register.page';
import UserForgotPasswordPage from '@/features/auth/pages/user/forgot.password.page';
import UserNewPasswordPage from '@/features/auth/pages/user/new.password.page';
import VerifyOtp from '@/features/auth/pages/user/verify.otp.page';
import UserEmailverifyPage from '@/features/auth/pages/user/email.verify.page';

// import EmailverifyPage from '@/features/auth/pages/email.verify.page';



//const Landing = React.lazy(() => import('@/pages/user/Landing')); each child component use lazy



const UserRoutes = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>

      <Routes>

        <Route path='/auth' element={<AuthPublicRoutes> < AuthUserLayout /> </AuthPublicRoutes>} >
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='verify-email' element={<UserEmailverifyPage />} />
          <Route path='forgot-password' element={<UserForgotPasswordPage />} />
          <Route path='verify-otp' element={<VerifyOtp />} />
          <Route path='reset-password' element={<UserNewPasswordPage />} />
        </Route>



        <Route path="/" element={<AuthPublicRoutes> <MainLayout /> </AuthPublicRoutes>}>
          {/* <Route index element={<UserLogin />} /> */}
          <Route path='travels' element={<h1>travel page</h1>} />
          <Route path='travels/:id' element={<h1>travel details page</h1>} />
          <Route path='about' element={<h1>About page</h1>} />
          <Route path='contact' element={<h1>Contact page</h1>} />
        </Route>

      </Routes>
    </Suspense>
  )
}

export default UserRoutes
