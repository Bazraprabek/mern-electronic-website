import React, { useEffect } from "react";
import { useDataContext } from "../../contexts/Data.context";
import axiosInstance from "../../utils/axios";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { user, setUser, setMessage } = useDataContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put("/user/update", data);
      setUser(response.data);
      setMessage({
        type: "success",
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage({
        type: "success",
        message: "Fail to update",
      });
    }
  };

  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
  }, [user]);

  return (
    <div className="profile">
      <div className="container">
        <div className="box">
          <i className="fa-solid fa-user"></i>
          <div className="profile_details">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register("username")} />
              <input type="email" {...register("email")} />
              <button type="submit" disabled={!isDirty}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
