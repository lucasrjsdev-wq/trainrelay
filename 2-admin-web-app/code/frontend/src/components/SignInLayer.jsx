import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/api";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const REDIRECT_BY_TIPO = {
  dueno:       "/",
  entrenador:  "/coming-soon",
  atleta:      "/coming-soon",
};

const SignInLayer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const captchaToken = await new Promise((resolve) => {
        if (!RECAPTCHA_SITE_KEY) return resolve(null);
        window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "login" });
          resolve(token);
        });
      });
      const res = await authService.login(username, password, captchaToken);
      login(res.data.token, res.data.usuario);

      const destino = REDIRECT_BY_TIPO[res.data.usuario.tipo] ?? "/";
      navigate(destino, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Credenciales incorrectas.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div
          style={{
            backgroundImage: "url(assets/images/auth/auth-img.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <h4 className="mb-12">Iniciar sesión</h4>
            <p className="mb-32 text-secondary-light text-lg">
              TrainRelay — Ingresá con tu usuario
            </p>
          </div>

          {error && (
            <div className="alert alert-danger radius-12 mb-20" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:user" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <span
                className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <Icon icon={showPassword ? "ri:eye-off-line" : "ri:eye-line"} />
              </span>
            </div>

            <div className="d-flex justify-content-end mb-20">
              <Link
                to="/recuperar-contrasena"
                className="text-primary-600 fw-medium text-sm"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-8"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <div className="mt-24 text-center text-sm text-secondary-light">
              ¿No tenés cuenta?{" "}
              <Link to="/registrarse" className="text-primary-600 fw-semibold">
                Registrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
