import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { useDataContext } from "../contexts/Data.context";

const Search = () => {
  const { name } = useParams();
  const { product } = useDataContext();

  return (
    <>
      <br />
      <p>
        <b>Search:</b> {name}
      </p>
      <br />
      {product
        .filter((value) => value.product_name.toLowerCase().includes(name))
        .map((product) => (
          <Card key={product._id} {...product} />
        ))}
      {product.length > 0 &&
        product.filter((value) =>
          value.product_name.toLowerCase().includes(name)
        ).length === 0 && <h4>No product found</h4>}
      <br />
    </>
  );
};

export default Search;
