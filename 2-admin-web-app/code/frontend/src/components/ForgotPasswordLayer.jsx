import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { authService } from "../services/api";

const ForgotPasswordLayer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch {
      setError("Ocurrió un error. Intentá de nuevo más tarde.");
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
            <h4 className="mb-12">Recuperar contraseña</h4>
            <p className="text-secondary-light text-lg">
              Ingresá tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.
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
              Si el correo está registrado, recibirás un enlace en tu bandeja de entrada en los próximos minutos.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="icon-field mb-24">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="mage:email" />
                </span>
                <input
                  type="email"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12"
              >
                {loading ? "Enviando..." : "Enviar enlace de recuperación"}
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

export default ForgotPasswordLayer;
