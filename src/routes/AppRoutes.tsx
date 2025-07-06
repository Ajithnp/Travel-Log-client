import { Routes, Route, useLocation } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import VendorRoutes from "./VendorRoutes";
import UserRoutes from "./UserRoutes";
import Custome404 from "../components/Custome404";
import Unauthorized from "../components/Unauthorized";

import React from "react";

const AppRoutes = () => {
  const location = useLocation();
  return (
    <>

      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin*" element={<AdminRoutes />} />
        <Route path="/vendor*" element={<VendorRoutes />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="*"
          element={<Custome404 pathname={window.location.pathname} />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
