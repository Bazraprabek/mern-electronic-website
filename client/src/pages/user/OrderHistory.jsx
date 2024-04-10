import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { timeConvert } from "../../helpers/helpers";
import { useDataContext } from "../../contexts/Data.context";

const OrderHistory = () => {
  const [order, setOrder] = useState([]);
  const { setMessage } = useDataContext();

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/order/user");
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const res = await axiosInstance.post("/order/cancel", { id });
      setMessage({
        type: "success",
        message: res.data,
      });
      getData();
    } catch (err) {
      console.log(err);
      setMessage({
        type: "error",
        message: "Fail to cancel order",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="shopping">
      <div className="box">
        <h1>Shopping</h1>
        <table>
          <thead>
            <th>Product</th>
            <th>Address</th>
            <th>Payment Method</th>
            <th>Order Date</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {order.length > 0 ? (
              order.map((value, index) => (
                <tr key={index}>
                  <td>
                    {value.products.map((value, index) => (
                      <div className="order_products" key={index}>
                        <p>{value.product.product_name}</p>
                        <p>{value.quantity}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    <p>{value.district}</p>
                    <p>{value.address}</p>
                  </td>
                  <td>{value.payment_type}</td>
                  <td>{timeConvert(value.order_date)}</td>
                  <td>
                    {value.status === "processing" ? (
                      <button onClick={() => cancelOrder(value._id)}>
                        Cancel
                      </button>
                    ) : (
                      value.status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Order Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
