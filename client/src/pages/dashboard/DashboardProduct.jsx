import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";
import Modal from "./components/Modal";

const DashboardProduct = () => {
  const [products, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const { setMessage } = useDataContext();

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/product");
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      var result = confirm("Are you sure want to buy?");
      if (result) {
        const res = await axiosInstance.delete(`/product/delete/${id}`);
        setMessage({ type: "success", message: "Deleted Successful" });
      } else {
        console.log("User clicked Cancel");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (data) => {
    try {
      console.log("Formadata: ", data);
      const res = await axiosInstance.post("/product/create", data);
      if (res) {
        setMessage({ type: "success", message: "Added Successful" });
        setShow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="dashboard_product">
      <div className="d-flex-between mb-2">
        <h1>Product</h1>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          Add
        </button>
        <Modal show={show} setShow={setShow} addProduct={addProduct} />
      </div>
      <table width="100%" border="1">
        <thead>
          <tr>
            <th>Prodcut Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stack</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((value, index) => (
            <tr key={index}>
              <td>
                <img
                  src={import.meta.env.VITE_IMG_PATH + value.product_image}
                  alt={value.name}
                  width="100px"
                />
              </td>
              <td>{value.product_name}</td>
              <td>{value.description}</td>
              <td>{value.price}</td>
              <td>
                <p>{value.stack}</p>
              </td>
              <td>
                <button onClick={() => deleteProduct(value._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardProduct;
