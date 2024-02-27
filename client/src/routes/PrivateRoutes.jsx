import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("userdata");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default PrivateRoutes;
