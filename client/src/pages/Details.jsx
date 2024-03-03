import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDataContext } from "../contexts/Data.context";
import Card from "../components/Card";
import useCart from "../hooks/useCart";

const Details = () => {
  const { id } = useParams();
  const { product } = useDataContext();
  const { addToCart } = useCart();

  return (
    <div className="details">
      <div className="container">
        <div className="product">
          {product
            .filter((value) => value._id === id)
            .map((value, index) => (
              <>
                <div className="product_info">
                  <div className="product_image">
                    <img
                      src={
                        import.meta.env.VITE_IMG_PATH +
                        "/" +
                        value.product_image
                      }
                      alt={value.product_name}
                      loading="lazy"
                    />
                  </div>
                  <div className="product_details">
                    <h2 className="title">{value.product_name}</h2>
                    <h4>Rs. {value.price}</h4>
                    <div className="actions">
                      <Link to="/buynow" className="buy_now">
                        Buy Now
                      </Link>{" "}
                      <button
                        className="add_to_cart"
                        onClick={() => {
                          addToCart({
                            id: value._id,
                            image: value.product_image,
                            name: value.product_name,
                            price: value.price,
                            quantity: 1,
                          });
                        }}
                      >
                        Add to Cart
                      </button>
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
        <div className="related_product">
          <h4>People Who Viewed This Item Also Viewed</h4>
          <div className="d-flex">
            {product
              .filter((value) => value._id !== id)
              .map((product) => (
                <Card key={product._id} {...product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
