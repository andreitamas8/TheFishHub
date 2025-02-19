import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useFetch } from "./useFetch";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/api";

export function useAuth() {
  const dispatch = useDispatch();
  const [loginCredentials, setLoginCredentials] = useState(null);

  const {
    data: loginData,
    loading,
    error,
  } = useFetch(
    loginCredentials ? `${API_BASE_URL}/auth/login` : null,
    loginCredentials
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginCredentials),
        }
      : null
  );
  useEffect(() => {
    if (loginData) {
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("userId", loginData.userId);
      dispatch(login({ userId: loginData.userId }));
    }
  }, [loginData, dispatch]);

  const handleLogin = (credentials) => {
    setLoginCredentials(credentials);
  };

  return { handleLogin, loading, error };
}
