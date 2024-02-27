import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoutes = () => {
  const token = localStorage.getItem("userdata");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return <Outlet />;
};

export default AuthRoutes;
