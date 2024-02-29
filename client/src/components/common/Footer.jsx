import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="foot">
        <div className="links">
          <h4>NavLinks</h4>

          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="company">
          <h4>Bazra Shop</h4>
          <p>Bazra Shop is online e-commerce website.</p>
        </div>
      </div>
      <p>&copy; Englishcha, 2024</p>
    </footer>
  );
};

export default Footer;
