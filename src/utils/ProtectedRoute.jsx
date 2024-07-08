import React from "react";
import Index from "../layouts/index";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const loginStatus = localStorage.getItem("AccessTokenForAdmin");
  return loginStatus ? (
    <Index>
      <Outlet />
    </Index>
  ) : (
    <Navigate to="/admin/login" />
  );
}

export default ProtectedRoute;
