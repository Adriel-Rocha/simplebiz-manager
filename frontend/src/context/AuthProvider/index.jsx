import { useState } from "react";
import { AuthContext } from "../AuthContext";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const decoded = jwtDecode(token);

      return {
        token,
        email: decoded.sub,
        role: decoded.role,
      };
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);

      setUser({
        token,
        email: decoded.sub,
        role: decoded.role,
      });
    } catch {
      console.error("Token inválido no login");
    }
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
