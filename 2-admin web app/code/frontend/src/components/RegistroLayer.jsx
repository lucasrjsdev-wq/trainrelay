import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { authService } from "../services/api";

const RegistroLayer = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    tipo: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setErrorGeneral("");
    setLoading(true);

    try {
      await authService.registrarse(form);
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors ?? {};
        setErrors(validationErrors);
      } else {
        setErrorGeneral("Ocurrió un error. Intentá de nuevo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field) =>
    errors[field] ? (
      <p className="text-danger text-sm mt-4 mb-0">{errors[field][0]}</p>
    ) : null;

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
            <h4 className="mb-12">Crear cuenta</h4>
            <p className="text-secondary-light text-lg">
              Completá los datos para registrarte en TrainRelay.
            </p>
          </div>

          {errorGeneral && (
            <div className="alert alert-danger radius-12 mb-20" role="alert">
              {errorGeneral}
            </div>
          )}

          {success ? (
            <div className="alert alert-success radius-12 mb-20" role="alert">
              <Icon icon="mdi:check-circle" className="me-8" />
              Su usuario fue creado exitosamente. En breve se comunicarán con usted via correo electrónico para definir las funcionalidades.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6 mb-16">
                  <div className="icon-field">
                    <span className="icon top-50 translate-middle-y">
                      <Icon icon="mage:user" />
                    </span>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control h-56-px bg-neutral-50 radius-12"
                      placeholder="Nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {fieldError("nombre")}
                </div>

                <div className="col-sm-6 mb-16">
                  <div className="icon-field">
                    <span className="icon top-50 translate-middle-y">
                      <Icon icon="mage:user" />
                    </span>
                    <input
                      type="text"
                      name="apellido"
                      className="form-control h-56-px bg-neutral-50 radius-12"
                      placeholder="Apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {fieldError("apellido")}
                </div>
              </div>

              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="mage:email" />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              {fieldError("email")}

              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="mage:at-sign" />
                </span>
                <input
                  type="text"
                  name="username"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Nombre de usuario"
                  value={form.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>
              {fieldError("username")}

              <div className="mb-24">
                <select
                  name="tipo"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  value={form.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccioná tu rol</option>
                  <option value="entrenador">Entrenador</option>
                  <option value="atleta">Atleta</option>
                </select>
                {fieldError("tipo")}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12"
              >
                {loading ? "Registrando..." : "Crear cuenta"}
              </button>
            </form>
          )}

          <div className="mt-24 text-center text-sm">
            ¿Ya tenés cuenta?{" "}
            <Link to="/sign-in" className="text-primary-600 fw-semibold">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistroLayer;
