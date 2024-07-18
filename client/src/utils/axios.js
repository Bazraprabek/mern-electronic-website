import axios from "axios";
import { baseURL } from "./config";

const token = localStorage.getItem("userdata")
  ? JSON.parse(localStorage.getItem("userdata"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token?.accessToken}`,
  },
});

axiosInstance.interceptors.request.use(
  async (req) => {
    if (!token) {
      const token = localStorage.getItem("userdata")
        ? JSON.parse(localStorage.getItem("userdata"))
        : null;

      req.headers.Authorization = `Bearer ${token?.accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
