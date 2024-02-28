import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const Search = () => {
  const { name } = useParams();
  return (
    <>
      <h1>Search</h1>
      <p>{name}</p>
      <Card />
    </>
  );
};

export default Search;
