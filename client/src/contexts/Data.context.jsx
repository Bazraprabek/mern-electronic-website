import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  setTimeout(() => {
    setMessage(null);
  }, 5000);

  return (
    <DataContext.Provider value={{ setMessage }}>
      {children}
      <Toast message={message} />
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
