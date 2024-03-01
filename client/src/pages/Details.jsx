import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/Data.context";

const Details = () => {
  const { id } = useParams();
  const { product } = useDataContext();

  return (
    <div className="details container">
      <div className="product">
        {product
          .filter((value) => value._id === id)
          .map((value) => (
            <>
              <div className="product_info">
                <div className="product_image">
                  <img
                    src={
                      import.meta.env.VITE_IMG_PATH + "/" + value.product_image
                    }
                    alt={value.product_name}
                    loading="lazy"
                    width="300px"
                    height="300px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="product_details">
                  <h2 className="title">{value.product_name}</h2>
                  <h4>Rs. {value.price}</h4>
                  <div className="actions">
                    <button className="buy_now">Buy Now</button>{" "}
                    <button className="add_to_cart">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="product_description">
                <h3>Description: </h3>
                <p>{value.description}</p>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Details;
