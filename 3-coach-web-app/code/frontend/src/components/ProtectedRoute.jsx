import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ESTADOS_ACCESO_COMPLETO = ["suscripto"];
const ESTADOS_SOLO_PERFIL = ["suscripto_a_validar", "sin_suscripcion"];

const ProtectedRoute = ({ children, allowRegistrado = false }) => {
  const { isAuthenticated, usuario, loading } = useAuth();

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary" /></div>;

  if (!isAuthenticated) return <Navigate to="/acceso-denegado" replace />;

  if (usuario?.estado === "suspendido") return <Navigate to="/acceso-denegado" replace />;

  if (usuario?.estado === "registrado") {
    if (allowRegistrado) return children;
    return <Navigate to="/completar-perfil" replace />;
  }

  if (ESTADOS_SOLO_PERFIL.includes(usuario?.estado)) {
    const isPerfil = window.location.pathname === "/perfil" || window.location.pathname === "/completar-perfil";
    if (!isPerfil && !allowRegistrado) return <Navigate to="/perfil" replace />;
  }

  return children;
};

export default ProtectedRoute;
