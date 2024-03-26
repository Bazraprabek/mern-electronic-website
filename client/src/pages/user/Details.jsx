import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataContext } from "../../contexts/Data.context";
import Card from "../../components/Card";
import useCart from "../../hooks/useCart";
import { formatCurrency } from "../../helpers/helpers";

const Details = () => {
  const { id } = useParams();
  const { product, setMessage } = useDataContext();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const filterProduct = product.filter((value) => value._id === id);
  console.log(filterProduct);

  const plusQuantity = () => {
    if (filterProduct[0].stack > quantity) {
      setQuantity(quantity + 1);
    } else {
      setMessage({ type: "error", message: "Item is out of stock" });
    }
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setMessage({ type: "error", message: "Quantity must be atleast one" });
    }
  };

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  return (
    <div className="details">
      <div className="container">
        <div className="product">
          {filterProduct.length === 0
            ? "Something went Wrong!"
            : filterProduct.map((value, index) => (
                <div key={index}>
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
                      <h4 className="price">{formatCurrency(value.price)}</h4>
                      {value.stack < 1 ? (
                        <span className="out_stock">Item is out of stock</span>
                      ) : (
                        <>
                          <div className="quantity">
                            <button className="minus" onClick={minusQuantity}>
                              -
                            </button>
                            <span className="value">{quantity}</span>
                            <button className="plus" onClick={plusQuantity}>
                              +
                            </button>
                          </div>
                          <div className="actions">
                            <Link
                              to={`/buynow/${value._id}/${quantity}`}
                              className="buy_now"
                            >
                              Buy Now
                            </Link>{" "}
                            <button
                              className="add_to_cart"
                              onClick={() => {
                                addToCart({
                                  id: value._id,
                                  product_image: value.product_image,
                                  product_name: value.product_name,
                                  price: value.price,
                                  quantity,
                                });
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="product_description">
                    <h3>Description </h3>
                    <p>{value.description}</p>
                  </div>
                </div>
              ))}
        </div>
        <div className="related_product">
          <h4 className="mb-2">People Who Viewed This Item Also Viewed</h4>
          <div className="d-flex">
            {product
              .filter((value) => value._id !== id)
              .slice(0, 5)
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
