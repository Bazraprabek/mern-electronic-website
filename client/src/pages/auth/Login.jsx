import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataContext } from "../../contexts/Data.context";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setMessage } = useDataContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/login", data);
      console.log(res.status);
      if (res) {
        setLoading(false);
        navigate("/");
        setMessage({ type: "success", message: res?.data?.message });
      }
      console.log(res);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      setMessage({ type: "error", message: err?.response?.data });
    }
  };

  return (
    <section className="auth">
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {loading ? (
            <button type="submit" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
        <p>
          New User? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
