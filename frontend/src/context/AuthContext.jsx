// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide authentication context to its children
export const AuthProvider = ({ children }) => {
  // State to store the user data
  const [user, setUser] = useState(() => {
    // Retrieve the user data from localStorage if it exists
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // useEffect to update localStorage whenever the user state changes
  useEffect(() => {
    if (user) {
      // Store the user data in localStorage if user is not null
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Remove the user data from localStorage if user is null
      localStorage.removeItem("user");
    }
  }, [user]); // Dependency array to re-run the effect when the user state changes

  // Function to log in the user and set the user state
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out the user and clear the user state
  const logout = () => {
    setUser(null);
  };

  return (
    // Provide the user, login, and logout functions to the context consumers
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
