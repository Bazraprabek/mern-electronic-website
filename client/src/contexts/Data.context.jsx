import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({});
  const [product, setProduct] = useState([]);

  setTimeout(() => {
    setMessage(null);
  }, 4000);

  return (
    <DataContext.Provider
      value={{ setMessage, user, setUser, product, setProduct }}
    >
      {children}
      <Toast message={message} />
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
