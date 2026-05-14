import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "../context/AuthContext";
import { coachService } from "../services/api";

const CompletarPerfilPage = () => {
  const { usuario, refreshUsuario } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: usuario?.perfil?.nombre ?? "",
    apellido: usuario?.perfil?.apellido ?? "",
    documento: usuario?.perfil?.documento ?? "",
    telefono: usuario?.perfil?.telefono ?? "",
    ciudad: usuario?.perfil?.ciudad ?? "",
    pais: usuario?.perfil?.pais ?? "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConf, setShowPassConf] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password && form.password !== form.password_confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      await coachService.actualizarPerfil(form);
      await refreshUsuario();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al guardar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none" style={{ backgroundImage: "url(assets/images/auth/auth-img.png)", backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%" }} />

      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <h4 className="mb-8">Completá tu perfil</h4>
          <p className="mb-24 text-secondary-light text-lg">
            Completá tus datos para empezar a usar TrainRelay Coach
          </p>

          {error && <div className="alert alert-danger radius-12 mb-20">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-16 mb-16">
              <div className="col-6">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">Nombre</label>
                <input name="nombre" type="text" className="form-control h-56-px bg-neutral-50 radius-12" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">Apellido</label>
                <input name="apellido" type="text" className="form-control h-56-px bg-neutral-50 radius-12" placeholder="Tu apellido" value={form.apellido} onChange={handleChange} required />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">Documento</label>
                <input name="documento" type="text" className="form-control h-56-px bg-neutral-50 radius-12" placeholder="DNI / Pasaporte" value={form.documento} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">Teléfono</label>
                <input name="telefono" type="text" className="form-control h-56-px bg-neutral-50 radius-12" placeholder="Tu teléfono" value={form.telefono} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">Ciudad</label>
                <input name="ciudad" type="text" className="form-control h-56-px bg-neutral-50 radius-12" placeholder="Tu ciudad" value={form.ciudad} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold text-primary-light text-sm mb-8">País</label>
                <input name="pais" type="text" className="form-control h-56-px bg-neutral-50 radius-12" placeholder="Tu país" value={form.pais} onChange={handleChange} />
              </div>
            </div>

            <p className="fw-semibold text-primary-light text-sm mb-12 mt-8">Establecé tu contraseña de acceso</p>

            <div className="position-relative mb-16">
              <input name="password" type={showPass ? "text" : "password"} className="form-control h-56-px bg-neutral-50 radius-12" placeholder="Nueva contraseña" value={form.password} onChange={handleChange} autoComplete="new-password" />
              <span className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light" onClick={() => setShowPass(!showPass)} style={{ cursor: "pointer" }}>
                <Icon icon={showPass ? "ri:eye-off-line" : "ri:eye-line"} />
              </span>
            </div>

            <div className="position-relative mb-24">
              <input name="password_confirmation" type={showPassConf ? "text" : "password"} className="form-control h-56-px bg-neutral-50 radius-12" placeholder="Confirmá tu contraseña" value={form.password_confirmation} onChange={handleChange} autoComplete="new-password" />
              <span className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light" onClick={() => setShowPassConf(!showPassConf)} style={{ cursor: "pointer" }}>
                <Icon icon={showPassConf ? "ri:eye-off-line" : "ri:eye-line"} />
              </span>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-8">
              {loading ? "Guardando..." : "Guardar perfil"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CompletarPerfilPage;
