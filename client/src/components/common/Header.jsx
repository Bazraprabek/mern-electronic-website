import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("userdata");
  const navigate = useNavigate();
  const links = [
    {
      name: "Home",
      path: "/",
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
      <h3>Bazra Shop</h3>
      <ul>
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
        {token ? (
          <>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <Link className="logout" onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="login" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="login" to="/signup">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
