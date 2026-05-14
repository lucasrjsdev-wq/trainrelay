import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { usuario, logout } = useAuth();

  return (
    <div className="container py-40">
      <div className="d-flex justify-content-between align-items-center mb-32">
        <div>
          <h4 className="mb-4">Bienvenido, {usuario?.perfil?.nombre ?? usuario?.username}</h4>
          <p className="text-secondary-light">Panel de control — TrainRelay Coach</p>
        </div>
        <button onClick={logout} className="btn btn-outline-danger radius-8">
          Cerrar sesión
        </button>
      </div>

      {usuario?.estado === "suscripto_a_validar" && (
        <div className="alert alert-warning radius-12 mb-24">
          Tu suscripción está siendo validada. Te avisaremos cuando esté activa.
        </div>
      )}

      {usuario?.estado === "sin_suscripcion" && (
        <div className="alert alert-danger radius-12 mb-24">
          Tu suscripción no está vigente. Renová tu plan para acceder a todas las funcionalidades.
        </div>
      )}

      <div className="row">
        <div className="col-12 text-center py-60 text-secondary-light">
          Dashboard en construcción
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
