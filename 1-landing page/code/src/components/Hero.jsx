export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #080f20 0%, #0D1B3E 40%, #0a1530 100%)',
      }}
    >
      {/* Diagonal stripe accent — top right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, #3B7FD4 100%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Left vertical accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3B7FD4]" />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16 py-32 w-full pt-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div>
            {/* Eyebrow */}
            <p className="section-eyebrow mb-5">
              Sistema de entrenamiento de alto rendimiento
            </p>

            {/* H1 */}
            <h1
              className="text-white mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              Competí por tu{' '}
              <span className="text-[#3B7FD4]">mejor versión.</span>
              <br />
              No entrenes sin sistema.
            </h1>

            {/* Divider */}
            <div className="section-divider mb-6" />

            {/* Subheadline */}
            <p
              className="text-white/70 mb-4 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}
            >
              TrainRelay convierte cada rutina en una posta entre entrenador y atleta.
              Un flujo constante de ejecución, feedback y mejora real.
            </p>

            {/* Micro storytelling */}
            <ul className="mb-10 space-y-2">
              {[
                'El entrenador diseña el plan.',
                'El atleta ejecuta con precisión.',
                'El progreso vuelve en datos.',
                'Y el ciclo empieza otra vez, más fuerte.',
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-3 text-white/60"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B7FD4] flex-shrink-0" />
                  {line}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#pricing" className="btn-primary">
                Empezar ahora
                <span>→</span>
              </a>
              <a href="#how-it-works" className="btn-outline">
                Ver cómo funciona
              </a>
            </div>

            {/* Trust */}
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textTransform: 'none', letterSpacing: 'normal' }}>
              Gratis · Sin tarjeta · Listo en menos de 2 minutos
            </p>
          </div>

          {/* ── RIGHT: App mockup ── */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div
                className="absolute -inset-8 rounded-3xl opacity-20"
                style={{ background: 'radial-gradient(ellipse at center, #3B7FD4, transparent 70%)' }}
              />

              {/* Card */}
              <div
                className="relative rounded-2xl p-7 shadow-2xl"
                style={{ background: 'rgba(22, 37, 71, 0.9)', border: '1px solid rgba(59,127,212,0.25)' }}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Rajdhani, sans-serif' }}>Sesión activa</p>
                    <p className="text-white font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Resistencia — Semana 3</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', fontFamily: 'Inter, sans-serif', textTransform: 'none', letterSpacing: 'normal' }}
                  >
                    En progreso
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', textTransform: 'none' }}>Progreso de la rutina</span>
                    <span style={{ fontSize: '0.7rem', color: '#3B7FD4', fontWeight: 700, fontFamily: 'Inter, sans-serif', textTransform: 'none' }}>75%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: '75%', background: 'linear-gradient(90deg, #3B7FD4, #4D9FEF)' }}
                    />
                  </div>
                </div>

                {/* Exercise list */}
                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Calentamiento dinámico', done: true },
                    { name: 'Intervalos 4×4', done: true },
                    { name: 'Fuerza tren inferior', done: true },
                    { name: 'Vuelta a la calma', done: false },
                  ].map((ex) => (
                    <div key={ex.name} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: ex.done ? '#3B7FD4' : 'transparent',
                          border: ex.done ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        {ex.done && <span style={{ color: '#fff', fontSize: '0.65rem' }}>✓</span>}
                      </div>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          fontFamily: 'Inter, sans-serif',
                          textTransform: 'none',
                          letterSpacing: 'normal',
                          color: ex.done ? 'rgba(255,255,255,0.35)' : '#ffffff',
                          textDecoration: ex.done ? 'line-through' : 'none',
                        }}
                      >
                        {ex.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coach feedback */}
                <div
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(59,127,212,0.1)', border: '1px solid rgba(59,127,212,0.2)' }}
                >
                  <p style={{ fontSize: '0.65rem', color: '#3B7FD4', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Feedback del entrenador
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.5' }}>
                    "Excelente ritmo en los intervalos. Aumentá la carga en fuerza la próxima semana."
                  </p>
                </div>
              </div>

              {/* Floating stat badge */}
              <div
                className="absolute -bottom-5 -left-5 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
                style={{ background: '#0D1B3E', border: '1px solid rgba(59,127,212,0.3)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
                  <span style={{ color: '#4ade80', fontSize: '1rem' }}>↑</span>
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>+18% rendimiento</p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontFamily: 'Inter, sans-serif', textTransform: 'none', letterSpacing: 'normal' }}>vs. mes anterior</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #0D1B3E, transparent)' }} />
    </section>
  )
}
