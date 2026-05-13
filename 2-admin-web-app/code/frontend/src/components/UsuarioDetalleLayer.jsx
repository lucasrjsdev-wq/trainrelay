import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, useNavigate } from "react-router-dom";
import { usuarioService } from "../services/api";

const ESTADOS_POR_TIPO = {
  atleta:     ["registrado", "entrenando"],
  entrenador: ["registrado", "suscripto_a_validar", "suscripto", "sin_suscripcion"],
};

const ESTADO_LABEL = {
  registrado:          "Registrado",
  entrenando:          "Entrenando",
  suscripto_a_validar: "Suscripto a validar",
  suscripto:           "Suscripto",
  sin_suscripcion:     "Sin suscripción",
};

const estadoLabel = (e) => ESTADO_LABEL[e] ?? e;

const estadoBadge = (estado) => {
  const map = {
    registrado:          "bg-info-focus text-info-600 border border-info-main",
    entrenando:          "bg-success-focus text-success-600 border border-success-main",
    suscripto_a_validar: "bg-warning-focus text-warning-600 border border-warning-main",
    suscripto:           "bg-success-focus text-success-600 border border-success-main",
    sin_suscripcion:     "bg-neutral-200 text-neutral-600 border border-neutral-400",
    suspendido:          "bg-danger-focus text-danger-600 border border-danger-main",
  };
  return map[estado] ?? "bg-neutral-200 text-neutral-600";
};

const FOTO_DEFAULT = "assets/images/users/user1.png";

const UsuarioDetalleLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm]               = useState(null);
  const [fotoUrl, setFotoUrl]         = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoFile, setFotoFile]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [toggling, setToggling]       = useState(false);
  const [chequeando, setChequeando]   = useState(false);
  const [chequeoMsg, setChequeoMsg]   = useState(null);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const res = await usuarioService.obtener(id);
        const u = res.data;
        setForm({
          username:           u.username ?? "",
          email:              u.email ?? "",
          tipo:               u.tipo ?? "",
          estado:             u.estado ?? "",
          nombre:             u.perfil?.nombre ?? "",
          apellido:           u.perfil?.apellido ?? "",
          documento:          u.perfil?.documento ?? "",
          telefono:           u.perfil?.telefono ?? "",
          ciudad:             u.perfil?.ciudad ?? "",
          pais:               u.perfil?.pais ?? "",
          mp_subscription_id: u.suscripcion?.mp_subscription_id ?? "",
          mp_payer_email:     u.suscripcion?.mp_payer_email ?? "",
          mp_estado:          u.suscripcion?.mp_estado ?? "",
          created_at:         u.created_at,
        });
        setFotoUrl(u.perfil?.foto_url ?? null);
      } catch {
        setError("No se pudo cargar el usuario.");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
    setSuccess(false);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
    setSuccess(false);
  };

  const handleChequearSuscripcion = async () => {
    setChequeando(true);
    setChequeoMsg(null);
    try {
      const res = await usuarioService.chequearSuscripcion(id);
      const u = res.data.usuario;
      setForm((prev) => ({
        ...prev,
        estado:   u.estado,
        mp_estado: u.suscripcion?.mp_estado ?? prev.mp_estado,
      }));
      setChequeoMsg({ ok: true, texto: res.data.mensaje });
    } catch (err) {
      setChequeoMsg({ ok: false, texto: err.response?.data?.mensaje || "No se pudo chequear la suscripción." });
    } finally {
      setChequeando(false);
    }
  };

  const handleToggleSuspension = async () => {
    setToggling(true);
    setError("");
    setSuccess(false);
    try {
      const esSuspendido = form.estado === "suspendido";
      const res = esSuspendido
        ? await usuarioService.rehabilitar(id)
        : await usuarioService.suspender(id);
      const u = res.data;
      setForm((prev) => ({ ...prev, estado: u.estado }));
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo cambiar el estado.");
    } finally {
      setToggling(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSuccess(false);
    setSaving(true);

    try {
      if (fotoFile) {
        const res = await usuarioService.subirFoto(id, fotoFile);
        setFotoUrl(res.data.foto_url);
        setFotoPreview(null);
        setFotoFile(null);
      }
      await usuarioService.actualizar(id, form);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      if (err.response?.status === 422) {
        setFieldErrors(err.response.data.errors ?? {});
      } else {
        setError("No se pudo guardar. Intentá de nuevo.");
      }
    } finally {
      setSaving(false);
    }
  };

  const fieldError = (field) =>
    fieldErrors[field] ? (
      <p className="text-danger text-xs mt-4 mb-0">{fieldErrors[field][0]}</p>
    ) : null;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-80">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!form) {
    return <div className="alert alert-danger radius-12 m-24">{error || "Usuario no encontrado."}</div>;
  }

  const nombreCompleto = [form.nombre, form.apellido].filter(Boolean).join(" ") || form.username;
  const fechaRegistro  = new Date(form.created_at).toLocaleDateString("es-AR", {
    day: "2-digit", month: "long", year: "numeric",
  });
  const imagenMostrada = fotoPreview ?? fotoUrl ?? FOTO_DEFAULT;

  return (
    <div className="row gy-4">

      {/* Encabezado */}
      <div className="col-12">
        <div className="d-flex align-items-center gap-12 flex-wrap">
          <button
            type="button"
            onClick={() => navigate("/panel-usuarios")}
            className="btn btn-sm btn-outline-secondary radius-8 d-flex align-items-center gap-2"
          >
            <Icon icon="ep:arrow-left" /> Volver al listado
          </button>
          <div>
            <h5 className="mb-0">{nombreCompleto}</h5>
            <span className="text-secondary-light text-sm">
              @{form.username} &mdash; Registrado el {fechaRegistro}
            </span>
          </div>
          <span className={`px-12 py-4 radius-4 fw-medium text-xs ${estadoBadge(form.estado)}`}>
            {estadoLabel(form.estado)}
          </span>

          {/* Switch suspender / rehabilitar */}
          <div className="ms-auto d-flex align-items-center gap-12">
            <span className={`text-sm fw-medium ${form.estado === "suspendido" ? "text-danger-600" : "text-secondary-light"}`}>
              {form.estado === "suspendido" ? "Suspendido" : "Activo"}
            </span>
            <div
              className="position-relative"
              style={{ width: 48, height: 26, cursor: toggling ? "wait" : "pointer" }}
              onClick={!toggling ? handleToggleSuspension : undefined}
              title={form.estado === "suspendido" ? "Rehabilitar usuario" : "Suspender usuario"}
            >
              <input
                type="checkbox"
                className="d-none"
                checked={form.estado !== "suspendido"}
                readOnly
              />
              <div
                style={{
                  width: 48, height: 26, borderRadius: 13,
                  background: form.estado === "suspendido" ? "#ef4444" : "#22c55e",
                  transition: "background 0.2s",
                  opacity: toggling ? 0.6 : 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 3, width: 20, height: 20,
                  borderRadius: "50%", background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  transition: "left 0.2s",
                  left: form.estado === "suspendido" ? 4 : 24,
                }}
              />
            </div>
            <span className="text-xs text-secondary-light">
              {form.estado === "suspendido" ? "Clic para rehabilitar" : "Clic para suspender"}
            </span>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="col-12">
          <div className="alert alert-danger radius-12">{error}</div>
        </div>
      )}
      {success && (
        <div className="col-12">
          <div className="alert alert-success radius-12 d-flex align-items-center gap-2">
            <Icon icon="mdi:check-circle" />
            Los datos del usuario fueron actualizados correctamente.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="col-12">
        <div className="row gy-4">

          {/* Foto de perfil */}
          <div className="col-12">
            <div className="card p-0 radius-12">
              <div className="card-header bg-base border-bottom py-16 px-24">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <Icon icon="mage:image" className="text-primary-600" />
                  Foto de perfil
                </h6>
              </div>
              <div className="card-body p-24 d-flex align-items-center gap-24 flex-wrap">
                <div className="position-relative" style={{ width: 96, height: 96 }}>
                  <img
                    src={imagenMostrada}
                    alt="Foto de perfil"
                    className="rounded-circle object-fit-cover border"
                    style={{ width: 96, height: 96 }}
                    onError={(e) => { e.target.src = FOTO_DEFAULT; }}
                  />
                  {fotoPreview && (
                    <span
                      className="position-absolute top-0 end-0 bg-warning-600 rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 20, height: 20 }}
                      title="Foto nueva (sin guardar)"
                    >
                      <Icon icon="mdi:pencil" className="text-white text-xs" />
                    </span>
                  )}
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpg,image/jpeg,image/png,image/webp"
                    className="d-none"
                    onChange={handleFotoChange}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary radius-8 d-flex align-items-center gap-2 mb-8"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Icon icon="mdi:upload" />
                    {fotoPreview ? "Cambiar selección" : "Subir foto"}
                  </button>
                  <p className="text-secondary-light text-xs mb-0">
                    JPG, PNG o WEBP. Máximo 2 MB.
                    {fotoPreview && (
                      <span className="text-warning-600 ms-8 fw-medium">
                        Nueva foto seleccionada — guardá para aplicar.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Datos personales */}
          <div className="col-12">
            <div className="card p-0 radius-12">
              <div className="card-header bg-base border-bottom py-16 px-24">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <Icon icon="mage:user" className="text-primary-600" />
                  Datos personales
                </h6>
              </div>
              <div className="card-body p-24">
                <div className="row gy-16">
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Nombre</label>
                    <input type="text" name="nombre" className="form-control radius-8"
                      value={form.nombre} onChange={handleChange} placeholder="Nombre" />
                    {fieldError("nombre")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Apellido</label>
                    <input type="text" name="apellido" className="form-control radius-8"
                      value={form.apellido} onChange={handleChange} placeholder="Apellido" />
                    {fieldError("apellido")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Número de documento</label>
                    <input type="text" name="documento" className="form-control radius-8"
                      value={form.documento} onChange={handleChange} placeholder="Ej: 30123456" />
                    {fieldError("documento")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Teléfono</label>
                    <input type="text" name="telefono" className="form-control radius-8"
                      value={form.telefono} onChange={handleChange} placeholder="Ej: +54 9 11 1234-5678" />
                    {fieldError("telefono")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Ciudad de residencia</label>
                    <input type="text" name="ciudad" className="form-control radius-8"
                      value={form.ciudad} onChange={handleChange} placeholder="Ej: Buenos Aires" />
                    {fieldError("ciudad")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">País de residencia</label>
                    <input type="text" name="pais" className="form-control radius-8"
                      value={form.pais} onChange={handleChange} placeholder="Ej: Argentina" />
                    {fieldError("pais")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Datos de cuenta */}
          <div className="col-12">
            <div className="card p-0 radius-12">
              <div className="card-header bg-base border-bottom py-16 px-24">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <Icon icon="solar:lock-password-outline" className="text-primary-600" />
                  Datos de cuenta
                </h6>
              </div>
              <div className="card-body p-24">
                <div className="row gy-16">
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Nombre de usuario</label>
                    <input type="text" name="username" className="form-control radius-8"
                      value={form.username} onChange={handleChange} required />
                    {fieldError("username")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Email</label>
                    <input type="email" name="email" className="form-control radius-8"
                      value={form.email} onChange={handleChange} required />
                    {fieldError("email")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Tipo</label>
                    <select name="tipo" className="form-select radius-8"
                      value={form.tipo} onChange={handleChange} required>
                      <option value="entrenador">Entrenador</option>
                      <option value="atleta">Atleta</option>
                    </select>
                    {fieldError("tipo")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Estado</label>
                    <select name="estado" className="form-select radius-8"
                      value={form.estado} onChange={handleChange} required
                      disabled={form.estado === "suspendido"}
                    >
                      {form.estado === "suspendido"
                        ? <option value="suspendido">Suspendido</option>
                        : (ESTADOS_POR_TIPO[form.tipo] ?? ESTADOS_POR_TIPO.entrenador).map((e) => (
                            <option key={e} value={e}>{estadoLabel(e)}</option>
                          ))
                      }
                    </select>
                    {form.estado === "suspendido" && (
                      <p className="text-xs text-danger-600 mt-4 mb-0">
                        Rehabilitá el usuario con el switch para modificar su estado.
                      </p>
                    )}
                    {fieldError("estado")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Suscripción MercadoPago — solo entrenadores */}
          {form.tipo === "entrenador" && (
          <div className="col-12">
            <div className="card p-0 radius-12">
              <div className="card-header bg-base border-bottom py-16 px-24 d-flex align-items-center justify-content-between flex-wrap gap-12">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <Icon icon="simple-icons:mercadopago" className="text-primary-600" />
                  Suscripción MercadoPago
                </h6>
                <button
                  type="button"
                  disabled={chequeando || !form.mp_subscription_id}
                  onClick={handleChequearSuscripcion}
                  className="btn btn-sm btn-outline-primary radius-8 d-flex align-items-center gap-2"
                  title={!form.mp_subscription_id ? "Ingresá el ID de suscripción primero" : "Consultar estado actual en MercadoPago"}
                >
                  {chequeando
                    ? <><span className="spinner-border spinner-border-sm" /> Chequeando...</>
                    : <><Icon icon="mdi:refresh" /> Chequear estado suscripción</>
                  }
                </button>
              </div>

              {chequeoMsg && (
                <div className={`mx-24 mt-16 alert radius-8 d-flex align-items-center gap-2 ${chequeoMsg.ok ? "alert-success" : "alert-danger"}`}>
                  <Icon icon={chequeoMsg.ok ? "mdi:check-circle" : "mdi:alert-circle"} />
                  {chequeoMsg.texto}
                </div>
              )}

              <div className="card-body p-24">
                <div className="row gy-16">
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">ID de suscripción MP</label>
                    <input type="text" name="mp_subscription_id" className="form-control radius-8"
                      value={form.mp_subscription_id} onChange={handleChange}
                      placeholder="Ej: 2c938084726fca480172750000000000" />
                    {fieldError("mp_subscription_id")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label fw-medium text-sm">Email del pagador MP</label>
                    <input type="email" name="mp_payer_email" className="form-control radius-8"
                      value={form.mp_payer_email} onChange={handleChange}
                      placeholder="email@ejemplo.com" />
                    {fieldError("mp_payer_email")}
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label fw-medium text-sm">Estado MP</label>
                    <select name="mp_estado" className="form-select radius-8"
                      value={form.mp_estado} onChange={handleChange}>
                      <option value="">Sin suscripción</option>
                      <option value="authorized">Activa</option>
                      <option value="paused">Pausada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                    {fieldError("mp_estado")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Botones */}
          <div className="col-12 d-flex justify-content-end gap-12">
            <button type="button" onClick={() => navigate("/panel-usuarios")}
              className="btn btn-outline-secondary radius-8 px-24">
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="btn btn-primary radius-8 px-24 d-flex align-items-center gap-2">
              {saving
                ? <><span className="spinner-border spinner-border-sm" /> Guardando...</>
                : <><Icon icon="mdi:content-save" /> Guardar cambios</>
              }
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default UsuarioDetalleLayer;
