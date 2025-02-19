import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useFetch } from "./useFetch";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/api";

export function useRegister() {
  const dispatch = useDispatch();
  const [registerCredentials, setRegisterCredentials] = useState(null);

  const {
    data: registerData,
    loading,
    error,
  } = useFetch(
    registerCredentials ? `${API_BASE_URL}/auth/register` : null,
    registerCredentials
      ? {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerCredentials),
        }
      : null
  );

  const handleRegister = (credentials) => {
    setRegisterCredentials(credentials);
  };

  return { handleRegister, loading, error };
}
