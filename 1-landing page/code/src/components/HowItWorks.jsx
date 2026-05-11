const steps = [
  { n: '01', title: 'Definí tu rol', desc: 'Entrenador o atleta, el punto de partida es claro: mejorar.', detail: 'Configurá tu perfil en minutos y conectate con tu equipo.' },
  { n: '02', title: 'Diseñá el testigo', desc: 'El entrenador crea la rutina que marca el camino.', detail: 'Planificación con cargas, series y objetivos medibles.' },
  { n: '03', title: 'Ejecutá con precisión', desc: 'El atleta entrena, mide y reporta cada resultado.', detail: 'Registro en tiempo real integrado con Strava.' },
  { n: '04', title: 'Ajustá y superá', desc: 'Cada ciclo eleva el nivel. Cada posta exige más.', detail: 'El entrenador recibe datos y optimiza el próximo ciclo.' },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28"
      style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #080f1e 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Cómo funciona</p>
          <div className="section-divider center mb-6" />
          <h2 className="text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Cuatro pasos.{' '}
            <span className="text-[#3B7FD4]">Un ciclo sin límites.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px mb-16" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="p-8"
              style={{ background: '#080f1e', borderTop: '3px solid #3B7FD4' }}
            >
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '3rem', color: 'rgba(59,127,212,0.25)', lineHeight: 1 }}>
                {step.n}
              </p>
              <h3 className="text-white mt-3 mb-3" style={{ fontSize: '1.3rem' }}>
                {step.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: '1.6', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400, marginBottom: '0.75rem' }}>
                {step.desc}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', lineHeight: '1.5', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Strava integration */}
        <div
          className="flex flex-col lg:flex-row items-center gap-8 p-8"
          style={{ background: 'rgba(59,127,212,0.07)', border: '1px solid rgba(59,127,212,0.2)', borderLeft: '4px solid #3B7FD4' }}
        >
          <div className="flex-1">
            <h3 className="text-white mb-2" style={{ fontSize: '1.5rem' }}>Integrado con Strava</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: '1.7', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
              Sincronizá automáticamente todas las actividades. Sin fricciones, sin carga manual.
              Los datos llegan solos para que el análisis sea inmediato.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div
              className="w-16 h-16 flex items-center justify-center"
              style={{ background: 'rgba(252,76,2,0.1)', border: '1px solid rgba(252,76,2,0.3)' }}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FC4C02">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff' }}>Strava Connect</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'none', letterSpacing: 'normal' }}>Sincronización automática</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
