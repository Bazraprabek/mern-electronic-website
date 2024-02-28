import axios from "axios";

const token = localStorage.getItem("userdata")
  ? JSON.parse(localStorage.getItem("userdata"))
  : null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
