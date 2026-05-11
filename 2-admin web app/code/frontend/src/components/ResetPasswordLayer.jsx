import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../services/api";

const ResetPasswordLayer = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!token || !email) {
      setError("El enlace no es válido. Solicitá uno nuevo desde la página de recuperación.");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(email, token, password, passwordConfirmation);
      setSuccess(true);
      setTimeout(() => navigate("/sign-in", { replace: true }), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "El enlace no es válido o ha expirado.");
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
          <div className="mb-32">
            <h4 className="mb-12">Nueva contraseña</h4>
            <p className="text-secondary-light text-lg">
              Ingresá tu nueva contraseña. Debe tener al menos 8 caracteres.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger radius-12 mb-20" role="alert">
              {error}
            </div>
          )}

          {success ? (
            <div className="alert alert-success radius-12 mb-20" role="alert">
              <Icon icon="mdi:check-circle" className="me-8" />
              ¡Contraseña actualizada correctamente! Redirigiendo al inicio de sesión...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="position-relative mb-16">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
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

              <div className="position-relative mb-24">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    placeholder="Confirmar contraseña"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                <span
                  className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ cursor: "pointer" }}
                >
                  <Icon icon={showConfirm ? "ri:eye-off-line" : "ri:eye-line"} />
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12"
              >
                {loading ? "Guardando..." : "Guardar nueva contraseña"}
              </button>
            </form>
          )}

          <div className="mt-24 text-center text-sm">
            <Link to="/sign-in" className="text-primary-600 fw-semibold">
              ← Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordLayer;
