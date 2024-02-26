import React from "react";

const Toast = ({ message }) => {
  return message ? (
    <div
      className="toast"
      style={{
        backgroundColor:
          message.type === "success" ? "rgb(197, 197, 10)" : "red",
      }}
    >
      {message.message}
    </div>
  ) : null;
};

export default Toast;
