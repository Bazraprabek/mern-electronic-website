import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

const DashboardAccount = () => {
  const [account, setAccount] = useState([]);
  const getData = async () => {
    try {
      const res = await axiosInstance.get("/user/account");
      console.log(res.data);
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
      } else {
        console.log("User clicked Cancel");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Account</h1>
      <table width="100%" border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {account.map((value, index) => (
            <tr key={index}>
              <td>{value.username}</td>
              <td>{value.email}</td>
              <td>{value.role}</td>
              <td>
                <button onClick={() => deleteAccount(value._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DashboardAccount;
