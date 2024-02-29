import React from "react";
import testImage from "../assets/test.jpg";
import { Link } from "react-router-dom";

const Card = ({ id }) => {
  return (
    <div className="card">
      <Link to={"/detail/" + id}>
        <img src={testImage} alt="test" />
        <div className="card_body">
          <h3>Title</h3>
          <p>Sub Title</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
