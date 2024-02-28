import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("userdata");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  const logout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <Link className="nav_logo" to="/">
          <img src="favicon.ico" width="35px" alt="logo" />
          <span>azra Shop</span>
        </Link>
        <div className={show ? "showMenu " + "nav_menu" : "" + "nav_menu"}>
          <ul className="nav_list">
            {links.map((value, index) => (
              <li key={index}>
                <NavLink
                  to={value.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {value.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <button className="nav_close" onClick={() => setShow(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="nav_actions">
          <Link>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
          <Link className="profile_btn" to={token ? "/profile" : "/login"}>
            <i className="fa-solid fa-user"></i>
          </Link>
          {token ? (
            <div className="profile">
              <Link to="/profile">Profile</Link>
              <Link className="logout" onClick={logout}>
                Logout
              </Link>
            </div>
          ) : (
            ""
          )}
          <button className="nav_toggle" onClick={() => setShow(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
