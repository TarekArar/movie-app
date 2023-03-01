import React, { useState, useEffect, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { firebaseAPI } from "../apis/firebaseAPI";

const initialState = {
  user: {},
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    const cachedUser = await SecureStore.getItemAsync("user");
    if (cachedUser) setUser(JSON.parse(cachedUser));
    else setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await firebaseAPI.loginUser(email, password);
      await SecureStore.setItemAsync("user", JSON.stringify(response.user));
      setUser(response.user);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await firebaseAPI.createAccount(email, password);
      await SecureStore.setItemAsync("user", JSON.stringify(response.user));
      setUser(response.user);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("uid");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { AuthProvider, useAuthContext };
