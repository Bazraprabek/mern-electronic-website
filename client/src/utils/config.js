// config.js
const isDevelopment = import.meta.env.MODE === "development";

const baseURL = isDevelopment
  ? import.meta.env.VITE_LOCAL_URL
  : import.meta.env.VITE_PROD_URL;
const imgPath = isDevelopment
  ? import.meta.env.VITE_LOCAL_IMG_PATH
  : import.meta.env.VITE_PROD_IMG_PATH;

export { isDevelopment, baseURL, imgPath };
