const problems = [
  { icon: '📋', title: 'Planes genéricos', desc: 'Rutinas copy-paste que no contemplan al atleta real.' },
  { icon: '🔍', title: 'Seguimiento superficial', desc: 'Sin datos, sin historial, sin decisiones inteligentes.' },
  { icon: '💬', title: 'Comunicación fragmentada', desc: 'Mensajes dispersos, contexto perdido, tiempo desperdiciado.' },
]

export default function Problem() {
  return (
    <section
      id="problema"
      className="relative py-28"
      style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #080f1e 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">El problema real</p>
          <div className="section-divider center mb-6" />
          <h2
            className="text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            La mayoría entrena.{' '}
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Muy pocos progresan.</span>
          </h2>
          <p
            className="mx-auto"
            style={{
              maxWidth: '600px',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              lineHeight: '1.7',
              textTransform: 'none',
              letterSpacing: 'normal',
              fontWeight: 400,
            }}
          >
            Demasiado ruido, poca precisión. El resultado es siempre el mismo:
            atletas estancados y entrenadores desbordados.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group p-8 rounded-none transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderTop: '3px solid rgba(255,59,59,0.4)',
                transition: 'border-color 0.3s',
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>{p.icon}</span>
              <h3
                className="text-white mb-3"
                style={{ fontSize: '1.3rem' }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: '1.7',
                  textTransform: 'none',
                  letterSpacing: 'normal',
                  fontWeight: 400,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className="text-center py-8 px-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p
            className="text-white"
            style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Si no hay sistema, no hay evolución.
          </p>
          <p
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal', marginTop: '0.4rem' }}
          >
            Si no hay conexión, no hay resultado.
          </p>
        </div>
      </div>
    </section>
  )
}
