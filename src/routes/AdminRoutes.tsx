
import AdminLogin from '@/features/auth/pages/admin/login.page';
// import AdminLayout from '@/layouts/AdminLayout';

import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AdminPrivateRoutes, AdminPublicRoutes } from '@/routes/protected/Admin/AdminProtectedRoutes';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<AdminPublicRoutes > <AdminLogin /> </AdminPublicRoutes>} />
      <Route path='/layout' element={<h1>hello</h1>}>
        {/* <Route index element={<Users />} /> */}
      </Route>
    </Routes>
  )
}

export default AdminRoutes
