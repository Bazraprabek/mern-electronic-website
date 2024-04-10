import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const lastRoute = pathArray[pathArray.length - 1];
  const route = lastRoute.charAt(0).toUpperCase() + lastRoute.slice(1);
  const logout = () => {
    var result = confirm("Are you sure want to delete?");
    if (result) {
      localStorage.removeItem("userdata");
      window.location.replace("/login");
    }
  };
  return (
    <nav className="admin_navbar">
      <h2>{route}</h2>
      <div className="links">
        <button>
          <i className="fa-solid fa-bell"></i>
        </button>
        <Link to="/">
          <i className="fa-solid fa-store"></i>
        </Link>
        <button onClick={logout} className="logout">
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
