import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";

const DashboardOrder = () => {
  const [order, setOrder] = useState([]);
  const { setMessage } = useDataContext();

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/shop");
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const res = await axiosInstance.delete(`/shop/delete/${id}`);
      setMessage({ type: "success", message: "Deleted Successful" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dashboard_order">
      <h1>Order</h1>
      <table width="100%" border="1">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Products</th>
            <th>Payment Method</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.map((value, index) => (
            <tr key={index}>
              <td>{value.customer_name}</td>
              <td>
                {value.products.map((value, index) => (
                  <div className="order_products" key={index}>
                    <p>{value.product.product_name}</p>
                    <p>{value.quantity}</p>
                  </div>
                ))}
              </td>
              <td>{value.payment_type}</td>
              <td>
                <p>{value.district}</p>
                <p>{value.address}</p>
              </td>
              <td>{value.contact_number}</td>
              <td>
                <button onClick={() => deleteOrder(value._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardOrder;
