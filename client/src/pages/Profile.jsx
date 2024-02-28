import React from "react";
import { useDataContext } from "../contexts/Data.context";

const Profile = () => {
  const { user } = useDataContext();
  return (
    <>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </>
  );
};

export default Profile;
