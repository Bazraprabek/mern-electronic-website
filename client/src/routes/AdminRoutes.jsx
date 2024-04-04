import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/dashboard/components/Sidebar";

const AdminRoutes = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dash_body">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoutes;
