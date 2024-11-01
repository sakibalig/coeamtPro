import React, { useEffect, useState } from "react";
import { UserAuthContext } from "../context/AuthContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      console.log("Stored user found", storedUser);
      setUser(JSON.parse(storedUser));
    } else {
      console.log("No user found in local storage");
    }
    setIsLoading(false); // Set loading to false after checking
  }, []);

  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("user");
  };

  return (
    <UserAuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default AuthContextProvider;