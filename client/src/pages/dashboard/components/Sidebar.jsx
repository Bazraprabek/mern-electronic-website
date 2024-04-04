import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <h1 className="p-2 d-flex-center">
        <img src={logo} width="35px" alt="logo" />
        <span>azra</span>
      </h1>
      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/account"
          className={location.pathname === "/dashboard/account" ? "active" : ""}
        >
          Account
        </NavLink>
        <NavLink
          to="/dashboard/product"
          className={location.pathname === "/dashboard/product" ? "active" : ""}
        >
          Product
        </NavLink>
        <NavLink
          to="/dashboard/order"
          className={location.pathname === "/dashboard/order" ? "active" : ""}
        >
          Order
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
