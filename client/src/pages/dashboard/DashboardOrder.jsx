import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";
import { timeConvert } from "../../helpers/helpers";

const DashboardOrder = () => {
  const [order, setOrder] = useState([]);
  const { setMessage } = useDataContext();
  const newOrder = order.filter((value) => value.status === "processing");
  const ongoingOrder = order.filter((value) => value.status === "ongoing");
  const orderHistory = order.filter(
    (value) => value.status === "completed" || value.status === "canceled"
  );

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/order");
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      var result = confirm(`Are you sure want to ${status} order?`);
      if (result) {
        const res = await axiosInstance.post("/order/status", { id, status });
        setMessage({ type: "success", message: `Order ${status}` });
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dashboard_order">
      <div className="box">
        <div className="box-head">
          <h3>New Orders</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Products</th>
              <th>Payment Method</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newOrder.length > 0 ? (
              newOrder
                .filter((value) => value.status === "processing")
                .map((value, index) => (
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
                    <td>{timeConvert(value.order_date)}</td>
                    <td>
                      <button
                        onClick={() => changeStatus(value._id, "ongoing")}
                        title="Succeed"
                      >
                        <i class="fa-solid fa-check"></i>
                      </button>
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
      <div className="box mt-2">
        <div className="box-head">
          <h3>Ongoing Orders</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Products</th>
              <th>Payment Method</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ongoingOrder.length > 0 ? (
              ongoingOrder
                .filter((value) => value.status === "ongoing")
                .map((value, index) => (
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
                    <td>{timeConvert(value.order_date)}</td>
                    <td>
                      <button
                        onClick={() => changeStatus(value._id, "completed")}
                        title="Succeed"
                      >
                        <i class="fa-solid fa-check"></i>
                      </button>
                      <button
                        onClick={() => changeStatus(value._id, "canceled")}
                        title="Canceled"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
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
      <div className="box mt-2">
        <div className="box-head">
          <h3>Order History</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Products</th>
              <th>Payment Method</th>
              <th>Address</th>
              <th>Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.length > 0 ? (
              orderHistory.map((value, index) => (
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
                  <td>
                    <span className={value.status}>{value.status}</span>
                  </td>
                  <td>{timeConvert(value.order_date)}</td>
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

export default DashboardOrder;
