import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("userdata");
  const searchHistory = JSON.parse(localStorage.getItem("search"));
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const navigate = useNavigate();
  const links = [
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  const product = ["Iphone", "Jorden", "Samsung"];

  const logout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };

  const searchProduct = () => {
    // Retrieve existing array from localStorage
    const existingSearchString = localStorage.getItem("search");
    let existingSearchArray = existingSearchString
      ? JSON.parse(existingSearchString)
      : [];

    // Push the new search term to the array
    existingSearchArray.push(search);

    // Store the updated array back in localStorage
    localStorage.setItem("search", JSON.stringify(existingSearchArray));
    setShowSuggest(false);
    navigate(`/search/${search}`);
  };

  return (
    <header>
      <nav>
        <Link className="nav_logo" to="/">
          <img src="favicon.ico" width="35px" alt="logo" />
          <span>azra</span>
        </Link>
        <div className="search_box">
          <input
            type="text"
            placeholder="Search in Bazra"
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => setShowSuggest(false)}
          />
          <button className="search_btn" onClick={searchProduct}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {showSuggest && (
            <div className="suggest">
              <div className="history"></div>
              {search
                ? product.map((value, index) => (
                    <Link
                      key={index}
                      to={"/search/" + value}
                      onClick={() => setShowSuggest(false)}
                    >
                      {value}
                    </Link>
                  ))
                : searchHistory && (
                    <>
                      {searchHistory.map((value, index) => (
                        <Link key={index} to={"/search/" + value}>
                          {value}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          localStorage.removeItem("search");
                          setShowSuggest(false);
                        }}
                      >
                        CLEAR
                      </button>
                    </>
                  )}
            </div>
          )}
        </div>
        <div className="navbar">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
