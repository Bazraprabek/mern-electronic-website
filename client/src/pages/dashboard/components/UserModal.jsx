import React from "react";
import { useForm } from "react-hook-form";

const UserModal = ({ show, setShow, addUser }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    addUser(data);
  };

  return show ? (
    <div className="modal_background">
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal_header">
            <h2>Add Account</h2>
            <button onClick={() => setShow(false)}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="modal_content">
            <div className="mb-2 mt-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...register("username", { required: true })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                {...register("role", { required: true })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="modal_footer">
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default UserModal;
