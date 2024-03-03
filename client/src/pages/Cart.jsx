import React from "react";
import { useDataContext } from "../contexts/Data.context";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, setMessage } = useDataContext();
  let totalPrice = 0;
  let totalQuantity = 0;

  const removeFromCart = (id) => {
    const filterCart = cart.filter((value) => value.id !== id);
    localStorage.setItem("cart", JSON.stringify(filterCart));
    setCart(filterCart);
    setMessage({ type: "success", message: "Item removed" });
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
                          src={import.meta.env.VITE_IMG_PATH + "/" + item.image}
                          alt={item.product_name}
                          loading="lazy"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        {(() => {
                          totalQuantity = totalQuantity + item.quantity;
                          return item.quantity;
                        })()}
                      </td>
                      <td>
                        {(() => {
                          totalPrice = totalPrice + item.quantity * item.price;
                          return "Rs. " + item.quantity * item.price;
                        })()}
                      </td>
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
                    <th>{totalQuantity}</th>
                    <th>Rs. {totalPrice}</th>
                    <td>
                      <button className="buynow">
                        <Link to="/buynow">Buy Now</Link>
                      </button>
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
