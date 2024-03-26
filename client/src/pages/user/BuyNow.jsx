import React, { useState } from "react";
import khalti from "../../assets/khalti.jpg";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../helpers/helpers";

const BuyNow = () => {
  const navigate = useNavigate();
  const { cart, setCart, setMessage, product, user } = useDataContext();
  const { id, quantity } = useParams();
  const filterProduct = product.filter((value) => value._id === id);

  const khaltiPay = async () => {
    try {
      const res = await axiosInstance.get("/shop/pay");
      if (res) {
        window.location.href = res.data;
      }
    } catch (err) {
      // console.error("Error while fetching payment link:", error);
      setMessage({ type: "error", message: err.response.data });
    }
  };

  const orderProduct = async () => {
    try {
      const data = {
        customer_id: user._id,
        address: "Kathmandu",
        products: [{ product_id: filterProduct[0]._id, quantity }],
      };
      const res = await axiosInstance.post("/shop/pay/cash", data);
      if (res.status === 200) {
        setMessage({ type: "success", message: "Order Successful" });
        setCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
      }
    } catch (err) {
      console.error("Error while fetching payment link:", err);
      setMessage({ type: "error", message: "Order Fail" });
    }
  };

  const orderProductFromCart = async () => {
    try {
      const products = cart.map((value) => ({
        product_id: value.id,
        quantity: value.quantity,
      }));
      const data = {
        customer_id: user._id,
        address: "Kathmandu",
        products,
      };
      const res = await axiosInstance.post("/shop/pay/cash", data);
      if (res.status === 200) {
        setMessage({ type: "success", message: "Order Successful" });
        setCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
      }
    } catch (err) {
      console.error("Error while fetching payment link:", err);
      setMessage({ type: "error", message: "Order Fail" });
    }
  };
  return (
    <div className="buyNow">
      <div className="container">
        <div className="box">
          <h1>Buy Now</h1>
          <br />
          {cart.length === 0 || id ? (
            filterProduct.length === 0 ? (
              "Something went Wrong!"
            ) : (
              filterProduct.map((value, index) => (
                <div key={index}>
                  <p>{value.product_name}</p>
                  <p>{formatCurrency(value.price)}</p>
                  <button className="p-1" onClick={orderProduct}>
                    Order
                  </button>
                  <button className="khalti_btn" onClick={khaltiPay}>
                    <img src={khalti} alt="khalti" />
                  </button>
                </div>
              ))
            )
          ) : cart.length === 0 ? (
            "Something went Wrong!"
          ) : (
            <>
              {cart.map((value, index) => (
                <div key={index}>
                  <p>{value.product_name}</p>
                  <p>{formatCurrency(value.price)}</p>
                  <hr />
                  <br />
                </div>
              ))}
              <button className="p-1" onClick={orderProductFromCart}>
                Order
              </button>
              <div className="pay_onlne">
                <button className="khalti_btn" onClick={khaltiPay}>
                  <img src={khalti} alt="khalti" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
