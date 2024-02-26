import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Signup",
      path: "/signup",
    },
  ];

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
      </ul>
    </header>
  );
};

export default Header;
