import { createContext, useState, useEffect } from "react";

// AuthContext is a context object
const AuthContext = createContext({});

// Children represents the components nested inside the Auth Provider
export const AuthProvider = ({ children }) => {
  // Initialize auth state from localStorage
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });

  // Persist auth state to localStorage whenever it changes
  useEffect(() => {
    if (auth && Object.keys(auth).length > 0) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    // Allows consuming components to subscribe to changes
    // Value is passed to consuming components (children)
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;