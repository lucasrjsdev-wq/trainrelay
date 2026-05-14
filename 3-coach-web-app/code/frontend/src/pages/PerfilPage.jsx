import { useAuth } from "../context/AuthContext";

const PerfilPage = () => {
  const { usuario, logout } = useAuth();
  const perfil = usuario?.perfil ?? {};

  return (
    <div className="container py-40">
      <div className="d-flex justify-content-between align-items-center mb-32">
        <h4 className="mb-0">Mi Perfil</h4>
        <button onClick={logout} className="btn btn-outline-danger radius-8">
          Cerrar sesión
        </button>
      </div>

      {usuario?.estado === "sin_suscripcion" && (
        <div className="alert alert-warning radius-12 mb-24">
          Tu suscripción no está vigente. Solo podés ver tu perfil.
        </div>
      )}

      <div className="card radius-12 p-24">
        <div className="row g-16">
          <div className="col-md-6">
            <label className="text-secondary-light text-sm mb-4">Nombre</label>
            <p className="fw-semibold">{perfil.nombre || "—"}</p>
          </div>
          <div className="col-md-6">
            <label className="text-secondary-light text-sm mb-4">Apellido</label>
            <p className="fw-semibold">{perfil.apellido || "—"}</p>
          </div>
          <div className="col-md-6">
            <label className="text-secondary-light text-sm mb-4">Email</label>
            <p className="fw-semibold">{usuario?.email || "—"}</p>
          </div>
          <div className="col-md-6">
            <label className="text-secondary-light text-sm mb-4">Usuario</label>
            <p className="fw-semibold">{usuario?.username || "—"}</p>
          </div>
          <div className="col-md-6">
            <label className="text-secondary-light text-sm mb-4">Teléfono</label>
            <p className="fw-semibold">{perfil.telefono || "—"}</p>
          </div>
          <div className="col-md-6">
            <label className="text-secondary-light text-sm mb-4">País</label>
            <p className="fw-semibold">{perfil.pais || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
