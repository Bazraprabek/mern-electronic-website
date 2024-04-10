import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../pages/dashboard/components/Sidebar";
import { useDataContext } from "../contexts/Data.context";
import axiosInstance from "../utils/axios";
import AdminNavbar from "../pages/dashboard/components/AdminNavbar";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const { setUser, setMessage } = useDataContext();
  const token = localStorage.getItem("userdata");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance("/admin");
        setUser(res.data);
      } catch (err) {
        // console.log(err);
        setMessage({ type: "error", message: "Unauthorized User" });
        localStorage.removeItem("userdata");
        window.location.replace("/login");
      }
    };

    if (token) {
      getData();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="dashboard">
      <Sidebar />
      <AdminNavbar />
      <div className="dash_body">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoutes;
