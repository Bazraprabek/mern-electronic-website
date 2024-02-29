import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import productService from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await productService.fetchProducts();
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);
  return (
    <>
      <h1>Home</h1>
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </>
  );
};

export default Home;
