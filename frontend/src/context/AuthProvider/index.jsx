import { useState } from "react";
import { AuthContext } from "../AuthContext";

const token = localStorage.getItem("token");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(token ? { token } : null);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
