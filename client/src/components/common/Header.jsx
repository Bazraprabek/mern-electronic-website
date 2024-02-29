import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const token = localStorage.getItem("userdata");
  const searchHistory = JSON.parse(localStorage.getItem("search"));
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const navigate = useNavigate();

  const product = ["Iphone", "Jorden", "Samsung"];

  const logout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };

  const searchProduct = (e) => {
    e.preventDefault();
    if (search) {
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
    }
  };

  return (
    <header>
      <nav>
        <Link className="nav_logo" to="/">
          <img src={logo} width="35px" alt="logo" />
          <span>azra</span>
        </Link>
        <form className="search_box" onSubmit={searchProduct}>
          <input
            type="text"
            placeholder="Search in Bazra"
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggest(true)}
            // onBlur={() => setShowSuggest(false)}
          />
          <button className="search_btn" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {showSuggest &&
            (search ? (
              <div className="suggest">
                {product.map((value, index) => (
                  <Link
                    key={index}
                    to={"/search/" + value}
                    onClick={() => setShowSuggest(false)}
                  >
                    {value}
                  </Link>
                ))}
              </div>
            ) : (
              searchHistory && (
                <div className="suggest">
                  {searchHistory.map((value, index) => (
                    <Link
                      key={index}
                      to={"/search/" + value}
                      onClick={() => setShowSuggest(false)}
                    >
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
                </div>
              )
            ))}
        </form>
        <div className="navbar">
          <div className={show ? "showMenu " + "nav_menu" : "" + "nav_menu"}>
            <ul className="nav_list"></ul>
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
            <Link to="/cart" className="nav_cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <button className="nav_toggle" onClick={() => setShow(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
