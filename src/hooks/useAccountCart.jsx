import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartItemsSlice";
import { login } from "../redux/userSlice";

const API_BASE_URL = "http://localhost:3000/api";

export function useAccountCart() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const cartItems = useSelector((state) => state.cartItems);
  const userId =
    useSelector((state) => state.user?.userId) ||
    localStorage.getItem("userId"); // Derive userId

  const cart = cartItems;
  // Fetch user data when logged in
  const {
    data: userData,
    loading,
    error,
  } = useFetch(userId ? `${API_BASE_URL}/accounts/${userId}` : null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Include token
    },
  });

  useEffect(() => {
    if (userId && userData) {
      if (cart.length === 0 && userData.cart) {
        dispatch(setCart(userData.cart));
      }
    } else if (!userId) {
      // If guest, load from localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        dispatch(setCart(storedCart));
      }
    }
  }, [userId, userData, dispatch]);

  useEffect(() => {
    if (!userId) {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }, [cart, userId]);

  const updateBackend = async (key, updatedData) => {
    if (!userId) return;
    await fetch(`${API_BASE_URL}/accounts/${userId}/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Include token
      },
      body: JSON.stringify({ [key]: updatedData }),
    });
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    dispatch(setCart(updatedCart));
    updateBackend("cart", updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    dispatch(setCart(updatedCart));
    updateBackend("cart", updatedCart);
  };

  // Manage login state and credentials
  const [loginCredentials, setLoginCredentials] = useState(null);
  const { data: loginData, error: loginError } = useFetch(
    loginCredentials ? `${API_BASE_URL}/auth/login` : null,
    loginCredentials
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginCredentials),
        }
      : null
  );

  const { data: backendCart } = useFetch(
    loginData ? `${API_BASE_URL}/accounts/${loginData.userId}/cart` : null
  );
  useEffect(() => {
    if (loginData) {
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

      const mergedCart = [...(backendCart || [])];
      guestCart.forEach((gItem) => {
        const existingItem = mergedCart.find((bItem) => bItem.id === gItem.id);
        if (existingItem) {
          existingItem.quantity += gItem.quantity;
        } else {
          mergedCart.push(gItem);
        }
      });

      dispatch(setCart(mergedCart));

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("userId", loginData.userId);
      dispatch(login({ userId: loginData.userId }));

      console.log("Login successful, data merged!");
    }
  }, [loginData, backendCart, dispatch]);

  const handleLogin = (credentials) => {
    console.log("Sending Login Request:", credentials);
    setLoginCredentials(credentials);
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    handleLogin,
  };
}
