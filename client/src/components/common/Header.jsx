import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDataContext } from "../../contexts/Data.context";
import { exploreOptions } from "../../helpers/helpers";

const Header = () => {
  const token = localStorage.getItem("userdata");
  const searchHistory = JSON.parse(localStorage.getItem("search"));
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const navigate = useNavigate();
  const { product, cart, user } = useDataContext();

  const logout = () => {
    localStorage.removeItem("userdata");
    window.location.replace("/login");
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
        <div className="d-flex">
          <Link className="nav_logo" to="/">
            <img src={logo} width="35px" alt="logo" />
            <span>azra</span>
          </Link>
        </div>
        <form className="search_box" onSubmit={searchProduct}>
          <input
            type="text"
            placeholder="Search Here"
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
                {product
                  .filter((value) =>
                    value.product_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .slice(0, 5)
                  .map((value, index) => (
                    <Link
                      key={index}
                      to={"/search/" + value.product_name.toLowerCase()}
                      onClick={() => setShowSuggest(false)}
                    >
                      {value.product_name.toLowerCase()}
                    </Link>
                  ))}
                {product.length > 0 &&
                  product.filter((value) =>
                    value.product_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ).length === 0 && <p>No product found</p>}
              </div>
            ) : (
              searchHistory && (
                <div className="suggest">
                  {searchHistory.slice(0, 5).map((value, index) => (
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
            <Link to="/cart" className="nav_cart" title="Cart">
              <i className="fa-solid fa-cart-shopping"></i>
              {cart.length > 0 && (
                <span className="cart_count">{cart.length}</span>
              )}
            </Link>
            {token ? (
              <>
                <Link className="profile_btn" to="/profile">
                  <i className="fa-solid fa-user"></i>
                </Link>
                <div className="profile_dropdown">
                  <Link to="/profile">{user.username}</Link>
                  <Link className="logout" onClick={logout}>
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link className="btn" to="/login">
                  Login
                </Link>
                <Link className="btn signup_btn" to="/signup">
                  Signup
                </Link>
              </>
            )}

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
