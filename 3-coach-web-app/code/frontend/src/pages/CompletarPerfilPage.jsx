import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { coachService } from "../services/api";

const CompletarPerfilPage = () => {
  const { usuario, refreshUsuario } = useAuth();
  const navigate = useNavigate();
  const perfil = usuario?.perfil ?? {};

  const [imagePreview, setImagePreview] = useState("assets/images/user-grid/user-grid-img14.png");
  const [form, setForm] = useState({
    nombre:   perfil.nombre   ?? "",
    apellido: perfil.apellido ?? "",
    documento: perfil.documento ?? "",
    telefono: perfil.telefono ?? "",
    ciudad:   perfil.ciudad   ?? "",
    pais:     perfil.pais     ?? "",
  });
  const [passwords, setPasswords] = useState({ password: "", password_confirmation: "" });
  const [showPass, setShowPass]     = useState(false);
  const [showConf, setShowConf]     = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");
  const [loading, setLoading]       = useState(false);

  const handleReadURL = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFormChange  = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePassChange  = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleGuardarPerfil = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await coachService.actualizarPerfil(form);
      await refreshUsuario();
      setSuccess("Perfil guardado correctamente.");
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al guardar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarPassword = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (passwords.password !== passwords.password_confirmation) {
      setError("Las contraseñas no coinciden."); return;
    }
    setLoading(true);
    try {
      await coachService.actualizarPerfil(passwords);
      await refreshUsuario();
      setSuccess("Contraseña actualizada. Ya podés ingresar normalmente.");
      setTimeout(() => navigate("/", { replace: true }), 1500);
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Completar Perfil" />

      {(error || success) && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"} radius-12 mb-20`}>
          {error || success}
        </div>
      )}

      <div className="row gy-4">
        {/* Panel izquierdo */}
        <div className="col-lg-4">
          <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
            <img src="assets/images/user-grid/user-grid-bg1.png" alt="" className="w-100 object-fit-cover" />
            <div className="pb-24 ms-16 mb-24 me-16 mt--100">
              <div className="text-center border border-top-0 border-start-0 border-end-0">
                <img
                  src={imagePreview}
                  alt="Foto de perfil"
                  className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
                />
                <h6 className="mb-0 mt-16">
                  {form.nombre || form.apellido ? `${form.nombre} ${form.apellido}`.trim() : usuario?.username}
                </h6>
                <span className="text-secondary-light mb-16">{usuario?.email}</span>
              </div>
              <div className="mt-24">
                <h6 className="text-xl mb-16">Información personal</h6>
                <ul>
                  {[
                    ["Nombre",    `${form.nombre} ${form.apellido}`.trim() || "—"],
                    ["Email",     usuario?.email ?? "—"],
                    ["Teléfono",  form.telefono  || "—"],
                    ["Ciudad",    form.ciudad    || "—"],
                    ["País",      form.pais      || "—"],
                    ["Documento", form.documento || "—"],
                  ].map(([label, value]) => (
                    <li key={label} className="d-flex align-items-center gap-1 mb-12">
                      <span className="w-30 text-md fw-semibold text-primary-light">{label}</span>
                      <span className="w-70 text-secondary-light fw-medium">: {value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-body p-24">
              <ul className="nav border-gradient-tab nav-pills mb-20 d-inline-flex" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link d-flex align-items-center px-24 active" data-bs-toggle="pill" data-bs-target="#pills-datos" type="button">
                    Datos personales
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link d-flex align-items-center px-24" data-bs-toggle="pill" data-bs-target="#pills-password" type="button">
                    Contraseña
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                {/* Tab datos personales */}
                <div className="tab-pane fade show active" id="pills-datos" role="tabpanel">
                  <h6 className="text-md text-primary-light mb-16">Foto de perfil</h6>
                  <div className="mb-24 mt-16">
                    <div className="avatar-upload">
                      <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                        <input type="file" id="imageUpload" accept=".png,.jpg,.jpeg" hidden onChange={handleReadURL} />
                        <label htmlFor="imageUpload" className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">
                          <Icon icon="solar:camera-outline" />
                        </label>
                      </div>
                      <div className="avatar-preview">
                        <div id="imagePreview" style={{ backgroundImage: `url(${imagePreview})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleGuardarPerfil}>
                    <div className="row">
                      {[
                        ["nombre",    "Nombre",    "text", "Tu nombre"],
                        ["apellido",  "Apellido",  "text", "Tu apellido"],
                        ["documento", "Documento", "text", "DNI / Pasaporte"],
                        ["telefono",  "Teléfono",  "text", "Tu teléfono"],
                        ["ciudad",    "Ciudad",    "text", "Tu ciudad"],
                        ["pais",      "País",      "text", "Tu país"],
                      ].map(([name, label, type, placeholder]) => (
                        <div key={name} className="col-sm-6">
                          <div className="mb-20">
                            <label className="form-label fw-semibold text-primary-light text-sm mb-8">{label}</label>
                            <input name={name} type={type} className="form-control radius-8" placeholder={placeholder} value={form[name]} onChange={handleFormChange} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button type="submit" disabled={loading} className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">
                        {loading ? "Guardando..." : "Guardar"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Tab contraseña */}
                <div className="tab-pane fade" id="pills-password" role="tabpanel">
                  <p className="text-secondary-light mb-20">Establecé tu contraseña de acceso para poder ingresar en el futuro.</p>
                  <form onSubmit={handleGuardarPassword}>
                    <div className="mb-20">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Nueva contraseña <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input name="password" type={showPass ? "text" : "password"} className="form-control radius-8" placeholder="Ingresá tu nueva contraseña" value={passwords.password} onChange={handlePassChange} required />
                        <span className={`toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light ${showPass ? "ri-eye-off-line" : "ri-eye-line"}`} onClick={() => setShowPass(!showPass)} />
                      </div>
                    </div>
                    <div className="mb-20">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Confirmar contraseña <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input name="password_confirmation" type={showConf ? "text" : "password"} className="form-control radius-8" placeholder="Confirmá tu contraseña" value={passwords.password_confirmation} onChange={handlePassChange} required />
                        <span className={`toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light ${showConf ? "ri-eye-off-line" : "ri-eye-line"}`} onClick={() => setShowConf(!showConf)} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button type="submit" disabled={loading} className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">
                        {loading ? "Guardando..." : "Guardar contraseña"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default CompletarPerfilPage;
