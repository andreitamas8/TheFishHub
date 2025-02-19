/* import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartItemsSlice";
import { useFetch } from "./useFetch";

export function useCart() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userId =
    useSelector((state) => state.user?.userId) ||
    localStorage.getItem("userId");
  const cart = useSelector((state) => state.cartItems);

  const { data: userData } = useFetch(
    userId ? `${API_BASE_URL}/accounts/${userId}` : null,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  useEffect(() => {
    if (userId && userData?.cart) {
      dispatch(setCart(userData.cart));
    } else if (!userId) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch(setCart(storedCart));
    }
  }, [userId, userData, dispatch]);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  const updateBackendCart = async (updatedCart) => {
    if (!userId) return;
    await fetch(`${API_BASE_URL}/accounts/${userId}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ cart: updatedCart }),
    });
  };

  const addToCart = (product) => {
    const updatedCart = cart.find((item) => item.id === product.id)
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];
    dispatch(setCart(updatedCart));
    updateBackendCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    dispatch(setCart(updatedCart));
    updateBackendCart(updatedCart);
  };

  return { cart, addToCart, removeFromCart };
}
 */
