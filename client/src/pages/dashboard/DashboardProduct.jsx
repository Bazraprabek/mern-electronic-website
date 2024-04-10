import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";
import Modal from "./components/Modal";

const DashboardProduct = () => {
  const [products, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const { setMessage } = useDataContext();
  const [search, setSearch] = useState("");

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
      var result = confirm("Are you sure want to delete?");
      if (result) {
        const res = await axiosInstance.delete(`/product/delete/${id}`);
        setMessage({ type: "success", message: "Deleted Successful" });
        getData();
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
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProduct = search
    ? products.filter((value) =>
        value.product_name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="dashboard_product box">
      <div className="box-head">
        <div className="custom-input">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="addbtn"
          onClick={() => {
            setShow(!show);
          }}
        >
          <i className="fa-solid fa-plus"></i> Add Product
        </button>
        <Modal show={show} setShow={setShow} addProduct={addProduct} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Prodcut Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduct.length > 0 ? (
            filteredProduct.map((value, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={import.meta.env.VITE_IMG_PATH + value.product_image}
                    alt={value.name}
                    width="50px"
                  />
                </td>
                <td>{value.product_name}</td>
                <td>{value.description}</td>
                <td>{value.price}</td>
                <td>
                  <p>{value.stock}</p>
                </td>
                <td>
                  <td>
                    <button>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button onClick={() => deleteProduct(value._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Product Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardProduct;
