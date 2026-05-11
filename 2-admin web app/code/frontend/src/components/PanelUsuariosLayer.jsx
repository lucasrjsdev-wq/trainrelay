import { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { usuarioService } from "../services/api";

const ESTADOS_ENTRENADOR = ["registrado", "suscripto_a_validar", "suscripto", "sin_suscripcion"];
const ESTADOS_ATLETA     = ["registrado", "entrenando"];

const estadosParaTipo = (tipo) =>
  tipo === "atleta" ? ESTADOS_ATLETA : ESTADOS_ENTRENADOR;

const ESTADO_LABEL = {
  registrado:          "Registrado",
  entrenando:          "Entrenando",
  suscripto_a_validar: "A validar",
  suscripto:           "Suscripto",
  sin_suscripcion:     "Sin suscripción",
  suspendido:          "Suspendido",
};

const estadoLabel = (estado) => ESTADO_LABEL[estado] ?? estado;

const estadoBadge = (estado) => {
  const map = {
    registrado:          "bg-info-focus text-info-600 border border-info-main",
    entrenando:          "bg-success-focus text-success-600 border border-success-main",
    suscripto_a_validar: "bg-warning-focus text-warning-600 border border-warning-main",
    suscripto:           "bg-success-focus text-success-600 border border-success-main",
    sin_suscripcion:     "bg-neutral-200 text-neutral-600 border border-neutral-400",
    suspendido:          "bg-danger-focus text-danger-600 border border-danger-main",
  };
  return map[estado] ?? "bg-neutral-200 text-neutral-600 border border-neutral-400";
};

const mpEstadoBadge = (mpEstado) => {
  const map = {
    authorized: "bg-success-focus text-success-600 border border-success-main",
    paused:     "bg-warning-focus text-warning-600 border border-warning-main",
    cancelled:  "bg-danger-focus text-danger-600 border border-danger-main",
  };
  return map[mpEstado] ?? "bg-neutral-200 text-neutral-600 border border-neutral-400";
};

const mpEstadoLabel = (mpEstado) => {
  const map = { authorized: "Activa", paused: "Pausada", cancelled: "Cancelada" };
  return map[mpEstado] ?? mpEstado ?? "—";
};

const tipoBadge = (tipo) =>
  tipo === "entrenador"
    ? "bg-primary-50 text-primary-600 border border-primary-200"
    : "bg-lilac-100 text-lilac-600 border border-lilac-200";

const nombreCompleto = (usuario) => {
  const p = usuario.perfil;
  if (!p) return usuario.username;
  const nombre = [p.nombre, p.apellido].filter(Boolean).join(" ");
  return nombre || usuario.username;
};

const PanelUsuariosLayer = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [buscar, setBuscar] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [pagina, setPagina] = useState(1);

  const [cambiando, setCambiando] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page: pagina, per_page: 10 };
      if (buscar) params.buscar = buscar;
      if (filtroTipo) params.tipo = filtroTipo;
      if (filtroEstado) params.estado = filtroEstado;
      const res = await usuarioService.listar(params);
      setUsuarios(res.data.data);
      setMeta({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
      });
    } catch {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, [buscar, filtroTipo, filtroEstado, pagina]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useEffect(() => {
    setPagina(1);
  }, [buscar, filtroTipo, filtroEstado]);

  const handleEstado = async (id, nuevoEstado) => {
    setCambiando(id);
    try {
      const res = await usuarioService.actualizarEstado(id, nuevoEstado);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? res.data.usuario : u))
      );
    } catch {
      setError("No se pudo actualizar el estado.");
    } finally {
      setCambiando(null);
    }
  };

  const estadosSiguientes = (estadoActual, tipo) =>
    estadosParaTipo(tipo).filter((e) => e !== estadoActual);

  return (
    <div className="card h-100 p-0 radius-12">
      {/* Header / Filtros */}
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          {/* Buscador */}
          <form
            className="navbar-search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="bg-base h-40-px"
              placeholder="Buscar usuario..."
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>

          {/* Filtro tipo */}
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="entrenador">Entrenador</option>
            <option value="atleta">Atleta</option>
          </select>

          {/* Filtro estado */}
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="registrado">Registrado</option>
            <option value="entrenando">Entrenando</option>
            <option value="suscripto_a_validar">A validar</option>
            <option value="suscripto">Suscripto</option>
            <option value="sin_suscripcion">Sin suscripción</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>

        <span className="text-sm text-secondary-light fw-medium">
          {meta.total} usuario{meta.total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Body / Tabla */}
      <div className="card-body p-24">
        {error && (
          <div className="alert alert-danger radius-8 mb-20">{error}</div>
        )}

        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Registro</th>
                <th scope="col">Nombre / Usuario</th>
                <th scope="col">Email</th>
                <th scope="col" className="text-center">Tipo</th>
                <th scope="col" className="text-center">Estado</th>
                <th scope="col">ID Suscripción MP</th>
                <th scope="col">Email pagador MP</th>
                <th scope="col" className="text-center">Estado MP</th>
                <th scope="col" className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-40">
                    <div className="spinner-border text-primary" role="status" />
                  </td>
                </tr>
              ) : usuarios.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-40 text-secondary-light">
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                usuarios.map((u, idx) => (
                  <tr key={u.id}>
                    <td>{(meta.current_page - 1) * 10 + idx + 1}</td>
                    <td className="text-secondary-light">
                      {new Date(u.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <Link
                          to={`/usuarios/${u.id}`}
                          className="fw-medium text-sm text-primary-600 hover-text-primary"
                          style={{ textDecoration: "none" }}
                        >
                          {nombreCompleto(u)}
                        </Link>
                        <span className="text-xs text-secondary-light">@{u.username}</span>
                      </div>
                    </td>
                    <td className="text-secondary-light text-sm">{u.email ?? "—"}</td>
                    <td className="text-center">
                      <span className={`px-12 py-4 radius-4 fw-medium text-xs ${tipoBadge(u.tipo)}`}>
                        {u.tipo === "entrenador" ? "Entrenador" : "Atleta"}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`px-12 py-4 radius-4 fw-medium text-xs ${estadoBadge(u.estado)}`}>
                        {estadoLabel(u.estado)}
                      </span>
                    </td>
                    <td className="text-sm text-secondary-light">
                      {u.suscripcion?.mp_subscription_id ?? <span className="text-neutral-400">—</span>}
                    </td>
                    <td className="text-sm text-secondary-light">
                      {u.suscripcion?.mp_payer_email ?? <span className="text-neutral-400">—</span>}
                    </td>
                    <td className="text-center">
                      {u.suscripcion?.mp_estado ? (
                        <span className={`px-12 py-4 radius-4 fw-medium text-xs ${mpEstadoBadge(u.suscripcion.mp_estado)}`}>
                          {mpEstadoLabel(u.suscripcion.mp_estado)}
                        </span>
                      ) : (
                        <span className="text-neutral-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary radius-8 px-12 py-4 d-flex align-items-center gap-2 mx-auto"
                          data-bs-toggle="dropdown"
                          disabled={cambiando === u.id}
                        >
                          {cambiando === u.id ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : (
                            <>
                              <Icon icon="lucide:settings-2" className="text-md" />
                              Estado
                            </>
                          )}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                          {estadosSiguientes(u.estado, u.tipo).map((e) => (
                            <li key={e}>
                              <button
                                className="dropdown-item text-sm d-flex align-items-center gap-2"
                                onClick={() => handleEstado(u.id, e)}
                              >
                                <span className={`w-8-px h-8-px rounded-circle ${estadoBadge(e).split(" ")[0]}`} />
                                {estadoLabel(e)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {!loading && meta.last_page > 1 && (
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
            <span className="text-sm text-secondary-light">
              Página {meta.current_page} de {meta.last_page}
            </span>
            <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
              <li className={`page-item ${meta.current_page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px px-8"
                  onClick={() => setPagina((p) => p - 1)}
                  disabled={meta.current_page === 1}
                >
                  <Icon icon="ep:d-arrow-left" />
                </button>
              </li>
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
                <li key={p} className="page-item">
                  <button
                    className={`page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-sm ${
                      p === meta.current_page
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-200 text-secondary-light"
                    }`}
                    onClick={() => setPagina(p)}
                  >
                    {p}
                  </button>
                </li>
              ))}
              <li className={`page-item ${meta.current_page === meta.last_page ? "disabled" : ""}`}>
                <button
                  className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px px-8"
                  onClick={() => setPagina((p) => p + 1)}
                  disabled={meta.current_page === meta.last_page}
                >
                  <Icon icon="ep:d-arrow-right" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelUsuariosLayer;
