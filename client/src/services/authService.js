import axiosInstance from "../utils/axios";

const signup = async (data) => {
  try {
    const response = await axiosInstance.post("/signup", data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);

    localStorage.setItem("userdata", JSON.stringify(response.data));
    return response;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export default { signup, login, fetchUser };
