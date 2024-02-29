import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/Data.context";

const Details = () => {
  const { id } = useParams();
  const { product } = useDataContext();

  return (
    <>
      <br />
      {product
        .filter((value) => value._id === id)
        .map((value) => (
          <>
            <img
              src={import.meta.env.VITE_IMG_PATH + "/" + value.product_image}
              alt={value.product_name}
              width="300px"
              height="300px"
              style={{ objectFit: "cover" }}
            />
            <h2>{value.product_name}</h2>
            <h5>Rs. {value.price}</h5>
            <p>{value.description}</p>
            <div className="actions">
              <button>Buy Now</button> <button>Add to Cart</button>
            </div>
          </>
        ))}
    </>
  );
};

export default Details;
