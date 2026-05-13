import { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";
import { dashboardService } from "../services/api";

/* ─── helpers ─── */
const fmtMes = (ym) => {
  const [y, m] = ym.split("-");
  const nombres = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${nombres[parseInt(m, 10) - 1]} ${y}`;
};

const StatCard = ({ icon, iconBg, iconColor, label, value, sub }) => (
  <div className="col-xxl-3 col-sm-6">
    <div className="card p-20 radius-8 h-100 border">
      <div className="d-flex align-items-center gap-16">
        <div className={`w-56-px h-56-px d-flex align-items-center justify-content-center radius-12 ${iconBg}`}>
          <Icon icon={icon} className={`text-2xl ${iconColor}`} />
        </div>
        <div>
          <span className="text-secondary-light text-sm fw-medium">{label}</span>
          <h4 className="mb-0 mt-4">{value ?? "—"}</h4>
          {sub && <span className="text-xs text-secondary-light">{sub}</span>}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Tab Usuarios ─── */
const TabUsuarios = ({ filtros }) => {
  const [resumen, setResumen] = useState(null);
  const [series, setSeries]   = useState({ meses: [], entrenadores: [], atletas: [] });
  const [paises, setPaises]   = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const [r1, r2, r3] = await Promise.all([
        dashboardService.resumenUsuarios(filtros),
        dashboardService.registrosPorMes(filtros),
        dashboardService.usuariosPorPais(filtros),
      ]);
      setResumen(r1.data);
      setSeries({
        meses:        r2.data.meses.map(fmtMes),
        entrenadores: r2.data.series.entrenadores,
        atletas:      r2.data.series.atletas,
      });
      setPaises({
        labels: r3.data.paises,
        values: r3.data.totales,
      });
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => { cargar(); }, [cargar]);

  if (loading) return (
    <div className="text-center py-60">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );

  const t = resumen?.totales ?? {};
  const donutSeries  = [t.registrado ?? 0, t.entrenando ?? 0, t.suscripto_a_validar ?? 0, t.suscripto ?? 0, t.sin_suscripcion ?? 0, t.suspendido ?? 0];
  const donutTotal   = donutSeries.reduce((a, b) => a + b, 0);
  const donutOptions = {
    chart: { type: "donut", toolbar: { show: false } },
    labels: ["Registrado", "Entrenando", "A validar", "Suscripto", "Sin suscripción", "Suspendido"],
    colors: ["#0ea5e9", "#22c55e", "#f59e0b", "#6366f1", "#94a3b8", "#ef4444"],
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: "70%" } } },
    tooltip: { y: { formatter: (v) => `${v} usuarios` } },
  };

  const barOptions = {
    chart: { type: "bar", toolbar: { show: false }, stacked: false },
    plotOptions: { bar: { horizontal: false, columnWidth: "45%", borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { categories: series.meses.length ? series.meses : ["Sin datos"] },
    colors: ["#6366f1", "#06b6d4"],
    legend: { position: "top" },
    tooltip: { y: { formatter: (v) => `${v} usuarios` } },
    yaxis: { labels: { formatter: (v) => Math.round(v) } },
  };

  const donutLabels = [
    { label: "Registrado",      color: "bg-info-600",       val: t.registrado          ?? 0 },
    { label: "Entrenando",      color: "bg-success-600",    val: t.entrenando          ?? 0 },
    { label: "A validar",       color: "bg-warning-600",    val: t.suscripto_a_validar ?? 0 },
    { label: "Suscripto",       color: "bg-primary-600",    val: t.suscripto           ?? 0 },
    { label: "Sin suscripción", color: "bg-secondary-400",  val: t.sin_suscripcion     ?? 0 },
    { label: "Suspendido",      color: "bg-danger-600",     val: t.suspendido          ?? 0 },
  ];

  return (
    <>
      {/* Stat cards */}
      <div className="row gy-4 mb-24">
        <StatCard icon="flowbite:users-group-outline" iconBg="bg-primary-50"  iconColor="text-primary-600"  label="Total usuarios"   value={t.total}        />
        <StatCard icon="lucide:dumbbell"              iconBg="bg-cyan-50"     iconColor="text-cyan-600"     label="Entrenadores"     value={t.entrenadores} />
        <StatCard icon="lucide:person-standing"       iconBg="bg-purple-50"   iconColor="text-purple-600"   label="Atletas"          value={t.atletas}      />
        <StatCard icon="lucide:shield-check"          iconBg="bg-success-50"  iconColor="text-success-600"  label="Activos"          value={t.activo}       />
      </div>

      {/* Charts row */}
      <div className="row gy-4 mb-24">
        {/* Donut */}
        <div className="col-lg-5">
          <div className="card p-24 radius-8 h-100 border">
            <h6 className="text-lg fw-semibold mb-20">Distribución por estado</h6>
            <div className="d-flex align-items-center gap-24 flex-wrap justify-content-center">
              <div className="position-relative">
                <ReactApexChart
                  options={donutOptions}
                  series={donutSeries}
                  type="donut"
                  height={220}
                  width={220}
                />
                <div className="position-absolute start-50 top-50 translate-middle text-center">
                  <span className="text-xs text-secondary-light">Total</span>
                  <h5 className="mb-0">{donutTotal}</h5>
                </div>
              </div>
              <div className="flex-grow-1">
                {donutLabels.map(({ label, color, val }) => (
                  <div key={label} className="d-flex align-items-center justify-content-between gap-8 mb-12">
                    <span className="d-flex align-items-center gap-8 text-sm text-secondary-light">
                      <span className={`w-10-px h-10-px rounded-circle ${color}`} />
                      {label}
                    </span>
                    <span className="fw-medium text-sm">{val}</span>
                    <span className="text-xs text-secondary-light">
                      {donutTotal ? `${Math.round((val / donutTotal) * 100)}%` : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bar entrenadores vs atletas */}
        <div className="col-lg-7">
          <div className="card p-24 radius-8 h-100 border">
            <h6 className="text-lg fw-semibold mb-20">Registros mensuales</h6>
            {series.meses.length === 0 ? (
              <p className="text-secondary-light text-sm">Sin datos para el período seleccionado.</p>
            ) : (
              <ReactApexChart
                options={barOptions}
                series={[
                  { name: "Entrenadores", data: series.entrenadores },
                  { name: "Atletas",      data: series.atletas },
                ]}
                type="bar"
                height={220}
              />
            )}
          </div>
        </div>
      </div>

      {/* Distribución por país */}
      <div className="row gy-4 mb-24">
        <div className="col-12">
          <div className="card p-24 radius-8 border">
            <h6 className="text-lg fw-semibold mb-20">Distribución por país</h6>
            {paises.values.length === 0 || paises.values.every(v => v === 0) ? (
              <p className="text-secondary-light text-sm">Sin datos de país registrados.</p>
            ) : (
              <div className="row align-items-center gy-4">
                <div className="col-lg-5 d-flex justify-content-center">
                  <ReactApexChart
                    options={{
                      chart: { type: "pie", toolbar: { show: false } },
                      labels: paises.labels,
                      legend: { show: false },
                      dataLabels: {
                        enabled: true,
                        formatter: (val) => `${Math.round(val)}%`,
                        style: { fontSize: "12px" },
                        dropShadow: { enabled: false },
                      },
                      tooltip: { y: { formatter: (v) => `${v} usuarios` } },
                      stroke: { width: 2 },
                    }}
                    series={paises.values}
                    type="pie"
                    height={280}
                    width={280}
                  />
                </div>
                <div className="col-lg-7">
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <thead>
                        <tr>
                          <th className="text-secondary-light fw-medium text-sm">País</th>
                          <th className="text-end text-secondary-light fw-medium text-sm">Usuarios</th>
                          <th className="text-end text-secondary-light fw-medium text-sm">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paises.labels.map((pais, i) => {
                          const total = paises.values.reduce((a, b) => a + b, 0);
                          return (
                            <tr key={pais}>
                              <td className="text-sm">{pais}</td>
                              <td className="text-end fw-medium text-sm">{paises.values[i]}</td>
                              <td className="text-end text-secondary-light text-xs">
                                {total ? `${Math.round((paises.values[i] / total) * 100)}%` : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detalle por tipo */}
      <div className="row gy-4">
        {["entrenador", "atleta"].map((tipo) => {
          const d = resumen?.porTipo?.[tipo] ?? {};
          const total = Object.values(d).reduce((a, b) => a + b, 0);
          return (
            <div key={tipo} className="col-md-6">
              <div className="card p-24 radius-8 border h-100">
                <h6 className="text-lg fw-semibold mb-16 text-capitalize">{tipo === "entrenador" ? "Entrenadores" : "Atletas"}</h6>
                <table className="table table-sm mb-0">
                  <tbody>
                    {(tipo === "atleta"
                      ? [
                          { est: "registrado", label: "Registrado", color: "bg-info-600" },
                          { est: "entrenando", label: "Entrenando", color: "bg-success-600" },
                        ]
                      : [
                          { est: "registrado",          label: "Registrado",      color: "bg-info-600"    },
                          { est: "suscripto_a_validar", label: "A validar",       color: "bg-warning-600" },
                          { est: "suscripto",           label: "Suscripto",       color: "bg-primary-600" },
                          { est: "sin_suscripcion",     label: "Sin suscripción", color: "bg-danger-600"  },
                        ]
                    ).map(({ est, label, color }) => (
                      <tr key={est}>
                        <td>
                          <span className="d-flex align-items-center gap-8 text-sm">
                            <span className={`w-10-px h-10-px rounded-circle ${color}`} />
                            {label}
                          </span>
                        </td>
                        <td className="text-end fw-medium">{d[est] ?? 0}</td>
                        <td className="text-end text-secondary-light text-xs">
                          {total ? `${Math.round(((d[est] ?? 0) / total) * 100)}%` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="fw-semibold">
                      <td>Total</td>
                      <td className="text-end">{total}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ─── Tab Ingresos ─── */
const TabIngresos = ({ filtros }) => {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await dashboardService.suscripcionesPorMes(filtros);
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => { cargar(); }, [cargar]);

  if (loading) return (
    <div className="text-center py-60">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );

  const t = data?.totales ?? {};
  const meses = (data?.meses ?? []).map(fmtMes);

  const barOptions = {
    chart: { type: "bar", toolbar: { show: false }, stacked: true },
    plotOptions: { bar: { columnWidth: "45%", borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { categories: meses.length ? meses : ["Sin datos"] },
    colors: ["#22c55e", "#f59e0b", "#ef4444"],
    legend: { position: "top" },
    tooltip: { y: { formatter: (v) => `${v} suscripciones` } },
    yaxis: { labels: { formatter: (v) => Math.round(v) } },
  };

  return (
    <>
      {/* Aviso */}
      <div className="alert d-flex align-items-center gap-12 radius-8 mb-24"
           style={{ background: "#fffbeb", border: "1px solid #fcd34d" }}>
        <Icon icon="lucide:info" className="text-warning-600 text-xl flex-shrink-0" />
        <span className="text-sm text-warning-700">
          Los montos exactos estarán disponibles una vez integrado MercadoPago (caso de uso 3).
          Por ahora se muestra el conteo de suscripciones.
        </span>
      </div>

      {/* Stat cards */}
      <div className="row gy-4 mb-24">
        <StatCard icon="lucide:check-circle-2"  iconBg="bg-success-50"  iconColor="text-success-600"  label="Suscripciones activas"   value={t.authorized ?? 0} />
        <StatCard icon="lucide:pause-circle"    iconBg="bg-warning-50"  iconColor="text-warning-600"  label="Pausadas"                value={t.paused     ?? 0} />
        <StatCard icon="lucide:x-circle"        iconBg="bg-danger-50"   iconColor="text-danger-600"   label="Canceladas"              value={t.cancelled  ?? 0} />
        <StatCard icon="lucide:trending-up"     iconBg="bg-primary-50"  iconColor="text-primary-600"  label="Total con suscripción"   value={(t.authorized ?? 0) + (t.paused ?? 0) + (t.cancelled ?? 0)} />
      </div>

      {/* Chart */}
      <div className="card p-24 radius-8 border">
        <h6 className="text-lg fw-semibold mb-20">Suscripciones por mes</h6>
        {meses.length === 0 ? (
          <p className="text-secondary-light text-sm">Sin datos para el período seleccionado.</p>
        ) : (
          <ReactApexChart
            options={barOptions}
            series={[
              { name: "Activas",    data: data.series.authorized },
              { name: "Pausadas",   data: data.series.paused },
              { name: "Canceladas", data: data.series.cancelled },
            ]}
            type="bar"
            height={280}
          />
        )}
      </div>
    </>
  );
};

/* ─── Dashboard principal ─── */
const DashboardTrainRelayLayer = () => {
  const [tab, setTab]           = useState("usuarios");
  const [filtroTipo, setFiltroTipo]   = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [desde, setDesde]       = useState("");
  const [hasta, setHasta]       = useState("");

  const filtros = {
    ...(filtroTipo   && { tipo: filtroTipo }),
    ...(filtroEstado && { estado: filtroEstado }),
    ...(desde        && { desde }),
    ...(hasta        && { hasta }),
  };

  return (
    <div>
      {/* Filtros */}
      <div className="card p-16 radius-8 border mb-24">
        <div className="d-flex align-items-center flex-wrap gap-12">
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-8 h-40-px"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="entrenador">Entrenadores</option>
            <option value="atleta">Atletas</option>
          </select>

          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-8 h-40-px"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="registrado">Registrado</option>
            <option value="entrenando">Entrenando</option>
            <option value="suscripto_a_validar">A validar</option>
            <option value="suscripto">Suscripto</option>
            <option value="sin_suscripcion">Sin suscripción</option>
          </select>

          <div className="d-flex align-items-center gap-8">
            <label className="text-sm text-secondary-light mb-0">Desde</label>
            <input
              type="date"
              className="form-control form-control-sm h-40-px radius-8"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center gap-8">
            <label className="text-sm text-secondary-light mb-0">Hasta</label>
            <input
              type="date"
              className="form-control form-control-sm h-40-px radius-8"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>

          {(filtroTipo || filtroEstado || desde || hasta) && (
            <button
              className="btn btn-sm btn-outline-secondary radius-8 h-40-px px-12"
              onClick={() => { setFiltroTipo(""); setFiltroEstado(""); setDesde(""); setHasta(""); }}
            >
              <Icon icon="lucide:x" className="me-4" /> Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-24 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link fw-medium px-20 py-12 ${tab === "usuarios" ? "active" : "text-secondary-light"}`}
            onClick={() => setTab("usuarios")}
          >
            <Icon icon="flowbite:users-group-outline" className="me-8" />
            Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-medium px-20 py-12 ${tab === "ingresos" ? "active" : "text-secondary-light"}`}
            onClick={() => setTab("ingresos")}
          >
            <Icon icon="lucide:credit-card" className="me-8" />
            Ingresos MP
          </button>
        </li>
      </ul>

      {tab === "usuarios" && <TabUsuarios filtros={filtros} />}
      {tab === "ingresos" && <TabIngresos filtros={filtros} />}
    </div>
  );
};

export default DashboardTrainRelayLayer;
