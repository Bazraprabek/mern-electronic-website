import React from "react";
import testImage from "../assets/test.jpg";
import { Link } from "react-router-dom";
import { formatCurrency } from "../helpers/helpers";

const Card = ({ _id, product_image, product_name, price }) => {
  return (
    <div className="card">
      <Link to={"/detail/" + _id}>
        <img
          src={import.meta.env.VITE_IMG_PATH + product_image || testImage}
          alt="test"
          loading="lazy"
        />
        <div className="card_body">
          <h4>{product_name}</h4>
          <p>{formatCurrency(price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
