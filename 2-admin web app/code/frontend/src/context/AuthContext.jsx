import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("tr_token"));
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem("tr_usuario");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (tokenValue, usuarioData) => {
    localStorage.setItem("tr_token", tokenValue);
    localStorage.setItem("tr_usuario", JSON.stringify(usuarioData));
    setToken(tokenValue);
    setUsuario(usuarioData);
  };

  const logout = () => {
    localStorage.removeItem("tr_token");
    localStorage.removeItem("tr_usuario");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
