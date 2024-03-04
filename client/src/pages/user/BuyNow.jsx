import React from "react";
import khalti from "../../assets/khalti.jpg";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";

const BuyNow = () => {
  const { setMessage } = useDataContext();

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
  return (
    <div className="buyNow">
      <div className="container">
        <div className="box">
          <h1>Buy Now</h1>
          <div className="pay_onlne">
            <button className="khalti_btn" onClick={khaltiPay}>
              <img src={khalti} alt="khalti" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
