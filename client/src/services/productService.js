import axiosInstance from "../utils/axios";

const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/product");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default { fetchProducts };
