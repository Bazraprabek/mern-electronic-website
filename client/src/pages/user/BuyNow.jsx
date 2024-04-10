import React, { useState } from "react";
import khalti from "../../assets/khalti.jpg";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency, nepalDistricts } from "../../helpers/helpers";

const BuyNow = () => {
  const navigate = useNavigate();
  const { cart, setCart, setMessage, product, user } = useDataContext();
  const { id, quantity } = useParams();
  const filterProduct = product.filter((value) => value._id === id);
  let totalprice = 0;

  const [customerDetails, setCustomerDetails] = useState({
    customer_name: "",
    contact_number: "",
    address: "",
    district: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const khaltiPay = async () => {
    try {
      if (
        customerDetails.customer_name &&
        customerDetails.contact_number &&
        customerDetails.district &&
        customerDetails.address
      ) {
        const res = await axiosInstance.get("/order/pay");
        if (res) {
          window.location.href = res.data;
        }
      } else {
        setMessage({
          type: "error",
          message: "Please fill all Customer Details",
        });
      }
    } catch (err) {
      // console.error("Error while fetching payment link:", error);
      setMessage({ type: "error", message: err.response.data });
    }
  };

  const orderProduct = async () => {
    try {
      if (
        customerDetails.customer_name &&
        customerDetails.contact_number &&
        customerDetails.district &&
        customerDetails.address
      ) {
        var result = confirm("Are you sure want to buy?");
        if (result) {
          const data = {
            customer_id: user._id,
            customer_name: customerDetails.customer_name,
            contact_number: customerDetails.contact_number,
            district: customerDetails.district,
            address: customerDetails.address,
            products: [{ product: filterProduct[0]._id, quantity }],
          };
          const res = await axiosInstance.post("/order/pay/cash", data);
          if (res.status === 200) {
            setMessage({ type: "success", message: "Order Successful" });
            navigate("/success");
          }
        } else {
          console.log("User clicked Cancel");
        }
      } else {
        setMessage({
          type: "error",
          message: "Please fill all Customer Details",
        });
      }
    } catch (err) {
      console.error("Error while fetching payment link:", err);
      setMessage({ type: "error", message: "Order Fail" });
    }
  };

  const orderProductFromCart = async () => {
    try {
      if (
        customerDetails.customer_name &&
        customerDetails.contact_number &&
        customerDetails.district &&
        customerDetails.address
      ) {
        var result = confirm("Are you sure want to buy?");
        if (result) {
          const products = cart.map((value) => ({
            product: value.id,
            quantity: value.quantity,
          }));
          const data = {
            customer_id: user._id,
            customer_name: customerDetails.customer_name,
            contact_number: customerDetails.contact_number,
            district: customerDetails.district,
            address: customerDetails.address,
            products,
          };
          const res = await axiosInstance.post("/order/pay/cash", data);
          if (res.status === 200) {
            setMessage({ type: "success", message: "Order Successful" });
            setCart([]);
            localStorage.setItem("cart", JSON.stringify([]));
            navigate("/success");
          }
        } else {
          console.log("User clicked Cancel");
        }
      } else {
        setMessage({
          type: "error",
          message: "Please fill all Customer Details",
        });
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
          <div className="order_details">
            <div className="customer_details">
              <h2>Customer Details</h2>
              <input
                type="text"
                placeholder="Customer Name"
                className="customer_name"
                name="customer_name"
                onChange={handleInput}
                value={customerDetails.customer_name}
              />
              <br />
              <input
                type="number"
                placeholder="Contact Number"
                name="contact_number"
                onChange={handleInput}
                value={customerDetails.contact_number}
              />
              <br />
              <select name="district" id="district" onChange={handleInput}>
                <option value="">Select District</option>

                {nepalDistricts.map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
              <br />
              <textarea
                name="address"
                id="address"
                cols="30"
                rows="10"
                placeholder="Address in Details"
                onChange={handleInput}
                defaultValue={customerDetails.address}
              ></textarea>
            </div>
            <div className="product_details">
              <h2>Product Details</h2>
              {cart.length === 0 || id ? (
                filterProduct.length === 0 ? (
                  "Something went Wrong!"
                ) : (
                  <>
                    {filterProduct.map((value, index) => (
                      <div className="products" key={index}>
                        <p>{value.product_name}</p>
                        <p>{formatCurrency(value.price)}</p>
                        <p>{quantity}</p>
                        <hr />
                        <br />
                        <p>
                          Total Price: {formatCurrency(value.price * quantity)}
                        </p>
                      </div>
                    ))}
                    <div className="buttons">
                      <button onClick={orderProduct}>Cash on Delivery</button>
                      <p className="text-center">or</p>
                      <button className="khalti_btn" onClick={khaltiPay}>
                        <img src={khalti} alt="khalti" width="100px" />
                      </button>
                    </div>
                  </>
                )
              ) : cart.length === 0 ? (
                "Something went Wrong!"
              ) : (
                <>
                  {cart.map((value, index) => {
                    totalprice += value.price * value.quantity;
                    return (
                      <div className="products" key={index}>
                        <p>{value.product_name}</p>
                        <p>{formatCurrency(value.price)}</p>
                        <p>{value.quantity}</p>
                        <hr />
                      </div>
                    );
                  })}
                  <p>Total Price: {formatCurrency(totalprice)}</p>
                  <br />
                  <div className="buttons">
                    <button onClick={orderProductFromCart}>
                      Cash on Delivery
                    </button>
                    <p className="text-center">or</p>
                    <button className="khalti_btn" onClick={khaltiPay}>
                      <img src={khalti} alt="khalti" width="100px" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
