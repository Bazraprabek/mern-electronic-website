import React from "react";
import { useDataContext } from "../../contexts/Data.context";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers/helpers";
import { imgPath } from "../../utils/config";

const Cart = () => {
  const { cart, setCart, setMessage } = useDataContext();

  const removeFromCart = (id) => {
    const filterCart = cart.filter((value) => value.id !== id);
    localStorage.setItem("cart", JSON.stringify(filterCart));
    setCart(filterCart);
    setMessage({ type: "success", message: "Item removed" });
  };

  const calculateTotalPrice = (cartItems) => {
    return formatCurrency(
      cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    );
  };

  const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="box">
          {cart.length === 0 ? (
            <div className="not_items">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>No Item in Cart</span>
            </div>
          ) : (
            <>
              <h2>Shopping Cart</h2>

              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Details</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={imgPath + "/" + item.product_image}
                          alt={item.product_name}
                          loading="lazy"
                        />
                      </td>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>
                        <button onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <th></th>
                    <th>{calculateTotalQuantity(cart)}</th>
                    <th>{calculateTotalPrice(cart)}</th>
                    <td>
                      <Link className="buynow" to="/buynow">
                        Buy Now
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
