import { createContext, useContext, useState, useEffect } from "react";
import { coachService } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tr_coach_token");
    if (!token) { setLoading(false); return; }
    coachService.me()
      .then((res) => setUsuario(res.data))
      .catch(() => localStorage.removeItem("tr_coach_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("tr_coach_token", token);
    setUsuario(userData);
  };

  const logout = () => {
    localStorage.removeItem("tr_coach_token");
    setUsuario(null);
  };

  const refreshUsuario = async () => {
    try {
      const res = await coachService.me();
      setUsuario(res.data);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout, refreshUsuario, isAuthenticated: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
