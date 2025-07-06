import { AuthPrivateRoutes, AuthPublicRoutes } from '@/protected/User/UserprotectedRoutes';
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';



//const Landing = React.lazy(() => import('@/pages/user/Landing')); each child component use lazy



const UserRoutes = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>

    <Routes>
      <Route path="/" element={<AuthPublicRoutes> <MainLayout/> </AuthPublicRoutes>}>
         <Route index element={<h1>Landing page </h1>} />
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
