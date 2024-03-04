import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useDataContext } from "../../contexts/Data.context";
import productService from "../../services/productService";

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
    <div className="home">
      <div className="d-flex">
        {product.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
