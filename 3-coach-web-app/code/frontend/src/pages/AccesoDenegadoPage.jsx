const AccesoDenegadoPage = () => (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3">
    <h2 className="mb-3">Acceso denegado</h2>
    <p className="text-secondary mb-4">
      No tenés permiso para acceder a esta sección.<br />
      Si sos entrenador, ingresá desde el panel principal.
    </p>
    <a href={import.meta.env.VITE_ADMIN_URL ?? "http://localhost:5173/sign-in"} className="btn btn-primary radius-8">
      Ir al login
    </a>
  </div>
);

export default AccesoDenegadoPage;
