import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { coachService } from "../services/api";

const AuthRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) { navigate("/acceso-denegado", { replace: true }); return; }

    localStorage.setItem("tr_coach_token", token);

    coachService.me()
      .then((res) => {
        const usuario = res.data;
        if (usuario.tipo !== "entrenador") {
          localStorage.removeItem("tr_coach_token");
          navigate("/acceso-denegado", { replace: true });
          return;
        }
        login(token, usuario);
        if (usuario.estado === "registrado") {
          navigate("/completar-perfil", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        localStorage.removeItem("tr_coach_token");
        navigate("/acceso-denegado", { replace: true });
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
};

export default AuthRedirectPage;
