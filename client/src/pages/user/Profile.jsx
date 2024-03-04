import React from "react";
import { useDataContext } from "../../contexts/Data.context";

const Profile = () => {
  const { user } = useDataContext();
  return (
    <div className="profile">
      <div className="container">
        <div className="box">
          <h1>Profile</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
