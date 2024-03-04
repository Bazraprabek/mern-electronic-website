import React from "react";
import { useDataContext } from "../../contexts/Data.context";

const Profile = () => {
  const { user } = useDataContext();
  return (
    <div className="profile">
      <div className="container">
        <div className="box">
          <i className="fa-solid fa-user"></i>
          <div className="profile_details">
            <h2>Personal Information</h2>
            <form>
              <input type="text" value={user.username} />
              <input type="email" value={user.email} />
              <button>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
