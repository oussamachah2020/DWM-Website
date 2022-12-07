import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useLogin = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password, admin = false) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify({ ...json, admin }));

      // update the auth state
      dispatch({ type: "LOGIN", payload: { ...json, admin } });

      setIsLoading(false);
      return true;
    }
  };

  return { login, isLoading, error };
};
