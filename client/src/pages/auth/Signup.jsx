import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDataContext } from "../../contexts/Data.context";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { setMessage } = useDataContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/signup", data);
      setLoading(false);
      navigate("/login");
      setMessage({ type: "success", message: res?.data?.message });
      console.log(res);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      setMessage({ type: "error", message: err?.response?.data });
    }
  };

  const validatePasswordMatch = (value) => {
    const password = watch("password", "");

    return value === password || "Passwords do not match";
  };

  return (
    <section className="auth">
      <div className="box">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: validatePasswordMatch,
              })}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          {loading ? (
            <button type="submit" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit">Register</button>
          )}
        </form>
        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
