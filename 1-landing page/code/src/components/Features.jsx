const features = [
  { icon: '⚡', title: 'Planificación avanzada', desc: 'Rutinas dinámicas, adaptables y listas para evolucionar con el atleta.' },
  { icon: '📊', title: 'Seguimiento de alto nivel', desc: 'Datos claros, históricos completos y métricas que importan.' },
  { icon: '💬', title: 'Comunicación sin fricción', desc: 'Cada mensaje, cada ajuste, en el momento exacto.' },
  { icon: '🔗', title: 'Integración total', desc: 'Todos los datos conectados en un mismo ecosistema.' },
  { icon: '🤖', title: 'Inteligencia aplicada (IA)', desc: 'Optimización constante basada en comportamiento y rendimiento.' },
  { icon: '🛒', title: 'Marketplace profesional', desc: 'Los mejores entrenadores, en un solo lugar.' },
  { icon: '🏷️', title: 'Marca personal para coaches', desc: 'Construí autoridad y posicionate como referente.' },
  { icon: '🏆', title: 'Sistema de motivación', desc: 'Progreso visible, logros concretos, competitividad constante.' },
]

export default function Features() {
  return (
    <section
      id="funcionalidades"
      className="py-28"
      style={{ background: 'linear-gradient(180deg, #080f1e 0%, #0D1B3E 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Funcionalidades</p>
          <div className="section-divider center mb-6" />
          <h2 className="text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Tecnología diseñada{' '}
            <span className="text-[#3B7FD4]">para ganar</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-8 transition-all duration-300"
              style={{
                background: '#0D1B3E',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59,127,212,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0D1B3E'
              }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-5"
                style={{ background: 'rgba(59,127,212,0.1)', border: '1px solid rgba(59,127,212,0.2)', fontSize: '1.8rem' }}
              >
                {f.icon}
              </div>
              <h3
                className="text-white mb-3"
                style={{ fontSize: '1.05rem', lineHeight: '1.2' }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  textTransform: 'none',
                  letterSpacing: 'normal',
                  fontWeight: 400,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
