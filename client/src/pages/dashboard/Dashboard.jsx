import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axiosInstance from "../../utils/axios";
import { timeConvert } from "../../helpers/helpers";

const Dashboard = () => {
  const [order, setOrder] = useState([]);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: ["red", "blue", "yellow"],
        borderColor: ["red", "blue", "yellow"],
        borderWidth: 1,
      },
    ],
  };

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/order");
      const latestProducts = res.data.slice(0, 4);
      setOrder(latestProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dash_home">
      <div className="overall">
        <div className="box">
          <h2>Total Sells</h2>
          <p>
            <i class="fa-solid fa-dollar-sign"></i>
            2000
          </p>
        </div>
        <div className="box">
          <h2>Total Users</h2>
          <p>
            <i class="fa-solid fa-users"></i>
            2000
          </p>
        </div>
        <div className="box">
          <h2>Total Products</h2>
          <p>
            <i class="fa-solid fa-box"></i>
            2000
          </p>
        </div>
      </div>
      <div className="overall_chart">
        <div className="box chart">
          <Doughnut data={data} />
        </div>
        <div className="box">
          <div className="box-head">
            <h2>Recent Orders</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Products</th>
                <th>Order Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {order.length > 0 ? (
                order.map((value, index) => (
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
                    <td>{timeConvert(value.order_date)}</td>
                    <td>
                      <span className={value.status}>{value.status}</span>
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
    </div>
  );
};

export default Dashboard;
