import { useState, useEffect } from "react";
import { useDataContext } from "../contexts/Data.context";

const useCart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const { setCart, setMessage } = useDataContext();

  useEffect(() => {
    // Load cart data from localStorage on hook initialization
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const addToCart = (newItem) => {
    const existingItem = cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      // If item already exists in the cart, update its quantity
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setMessage({ type: "success", message: "Item updated in cart" });
    } else {
      // If item is not in the cart, add it
      setCartItems((prevCart) => [...prevCart, newItem]);
      setMessage({ type: "success", message: "Item added in cart" });
    }
  };

  useEffect(() => {
    // Save cart data to localStorage whenever it changes
    setCart(cartItems);

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return { cartItems, addToCart };
};

export default useCart;
