import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="foot">
        <div className="company">
          <h2>Bazra Shop</h2>
          <p>Bazra Shop is online e-commerce website.</p>
          <div className="social_links">
            <a href="https://www.facebook.com/" target="_blank">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com/" target="_blank">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
        <div className="links">
          <h4>NavLinks</h4>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>
      <p className="copyright">&copy; Englishcha, 2024</p>
    </footer>
  );
};

export default Footer;
