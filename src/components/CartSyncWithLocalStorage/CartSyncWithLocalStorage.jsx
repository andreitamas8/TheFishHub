import { useEffect } from "react";
import { useSelector } from "react-redux";

const CartSyncWithLocalStorage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  return null;
};

export default CartSyncWithLocalStorage;
