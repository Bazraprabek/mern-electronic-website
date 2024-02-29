import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Details</h1>
      <p>{id}</p>
    </>
  );
};

export default Details;
