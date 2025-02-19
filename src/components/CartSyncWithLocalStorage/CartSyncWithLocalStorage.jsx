import { useEffect } from "react";
import { useSelector } from "react-redux";

const CartSyncWithLocalStorage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const userId = localStorage.getItem("userId"); // Assuming you store user ID in state

  useEffect(() => {
    if (userId) {
      // Sync the cart with local storage if the user is logged in
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, userId]); // Only update when the cart items or userId change

  return null; // This component does not render anything
};

export default CartSyncWithLocalStorage;
