import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <Link to="/dashboard" className="logo p-2 d-flex-center">
        <img src={logo} width="35px" alt="logo" />
        <span>azra</span>
      </Link>
      <div className="nav-links">
        <Link
          title="Home"
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </Link>
        <Link
          title="Account"
          to="/dashboard/account"
          className={location.pathname === "/dashboard/account" ? "active" : ""}
        >
          <i className="fa-solid fa-user"></i>
          <span>Account</span>
        </Link>
        <Link
          title="Product"
          to="/dashboard/product"
          className={location.pathname === "/dashboard/product" ? "active" : ""}
        >
          <i className="fa-solid fa-box"></i>
          <span>Product</span>
        </Link>
        <Link
          title="Order"
          to="/dashboard/order"
          className={location.pathname === "/dashboard/order" ? "active" : ""}
        >
          <i className="fa-solid fa-bag-shopping"></i>
          <span>Order</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
