const {
  VITE_ENVIRONMENT,
  VITE_LOCAL_URL,
  VITE_PROD_URL,
  VITE_LOCAL_IMG_PATH,
  VITE_PROD_IMG_PATH,
} = import.meta.env;

const isDevelopment = VITE_ENVIRONMENT === "development";

const baseURL = isDevelopment ? VITE_LOCAL_URL : VITE_PROD_URL;
const imgPath = isDevelopment ? VITE_LOCAL_IMG_PATH : VITE_PROD_IMG_PATH;

export { isDevelopment, baseURL, imgPath };
