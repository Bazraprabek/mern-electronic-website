import React from "react";
import testImage from "../assets/test.jpg";
import { Link } from "react-router-dom";

const Card = ({ _id, product_image, product_name, price }) => {
  return (
    <div className="card">
      <Link to={"/detail/" + _id}>
        <img
          src={import.meta.env.VITE_IMG_PATH + "/" + product_image || testImage}
          alt="test"
        />
        <div className="card_body">
          <h3>{product_name}</h3>
          <p>Rs. {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
