import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useDataContext } from "../contexts/Data.context";
import productService from "../services/productService";

const Home = () => {
  const { product, setProduct } = useDataContext();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await productService.fetchProducts();
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <br />
      {product.map((product) => (
        <Card key={product._id} {...product} />
      ))}
      <br />
    </>
  );
};

export default Home;
