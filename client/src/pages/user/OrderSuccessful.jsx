import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessful = () => {
  const navigate = useNavigate();
  return (
    <>
      <br />
      <h1>Your Product is successfully ordered.</h1>
      <button onClick={() => navigate("/")}>Go to Home Page</button>
    </>
  );
};

export default OrderSuccessful;
