import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useDataContext } from "../../contexts/Data.context";
import UserModal from "./components/UserModal";

const DashboardAccount = () => {
  const { user, setMessage } = useDataContext();
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/user/account");
      setAccount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAccount = async (id) => {
    try {
      var result = confirm("Are you sure want to delete?");
      if (result) {
        const res = await axiosInstance.delete(`/user/delete/${id}`);
        setMessage({ type: "success", message: "Deleted Successful" });
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAccount = search
    ? account.filter((value) =>
        value.username.toLowerCase().includes(search.toLowerCase())
      )
    : account;

  const addUser = async (data) => {
    try {
      console.log("Formadata: ", data);
      const res = await axiosInstance.post("/user/create", data);
      if (res) {
        setMessage({ type: "success", message: "Added Successful" });
        setShow(false);
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
    <div className="box">
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
          <i className="fa-solid fa-plus"></i> Add Account
        </button>
        <UserModal show={show} setShow={setShow} addUser={addUser} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccount.length > 0 ? (
            filteredAccount.map((value, index) => (
              <tr key={index}>
                <td>{value.username}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                {user.username === value.username ? (
                  <td>Current User</td>
                ) : (
                  <td>
                    <button>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteAccount(value._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td>No Account Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAccount;
