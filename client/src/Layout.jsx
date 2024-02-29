import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { useDataContext } from "./contexts/Data.context";
import authService from "./services/authService";
import productService from "./services/productService";
import ScrollToTop from "./components/ScrollToTop";

const Layout = () => {
  const navigate = useNavigate();
  const { setUser, setMessage, setProduct } = useDataContext();
  const token = localStorage.getItem("userdata");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await authService.fetchUser();
        setUser(res.data);
      } catch (err) {
        // console.log(err);
        localStorage.removeItem("userdata");
        setMessage({ type: "error", message: "Unauthorized User" });
        navigate("/login");
      }
    };

    const getProducts = async () => {
      try {
        const res = await productService.fetchProducts();
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();

    if (token) {
      getData();
    }
  }, []);
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
