const plans = [
  {
    name: 'Inicio',
    tagline: 'Para dar el primer paso con estructura',
    price: 'Gratis',
    period: '',
    highlight: false,
    features: ['1 entrenador activo', 'Hasta 5 atletas', 'Rutinas básicas', 'Seguimiento semanal', 'Integración Strava'],
    cta: 'Empezar gratis',
  },
  {
    name: 'Pro',
    tagline: 'Para entrenadores que buscan dominar su negocio',
    price: '$29',
    period: '/mes',
    highlight: true,
    features: ['Entrenadores ilimitados', 'Hasta 50 atletas', 'Rutinas avanzadas + IA', 'Seguimiento en tiempo real', 'Marketplace profesional', 'Marca personal para coaches', 'Soporte prioritario'],
    cta: 'Empezar con Pro',
  },
  {
    name: 'Elite',
    tagline: 'Para quienes compiten en serio',
    price: '$79',
    period: '/mes',
    highlight: false,
    features: ['Todo en Pro', 'Atletas ilimitados', 'IA avanzada + gamificación', 'API personalizada', 'Panel de análisis avanzado', 'Manager de cuenta dedicado', 'SLA garantizado'],
    cta: 'Ir a Elite',
  },
]

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-28"
      style={{ background: '#0D1B3E' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Precios</p>
          <div className="section-divider center mb-6" />
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Invertí en rendimiento.{' '}
            <span className="text-[#3B7FD4]">Escalá sin límites.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '1rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
            Entrá sin fricción. Crecé sin techo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-px max-w-5xl mx-auto" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col p-10"
              style={{
                background: plan.highlight ? '#3B7FD4' : '#0D1B3E',
                borderTop: plan.highlight ? '4px solid #4D9FEF' : '4px solid transparent',
                position: 'relative',
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 text-xs font-bold"
                  style={{ background: '#fff', color: '#3B7FD4', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  Más popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white mb-1" style={{ fontSize: '1.6rem' }}>{plan.name}</h3>
                <p style={{ color: plan.highlight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
                  {plan.tagline}
                </p>
              </div>

              <div className="flex items-end gap-1 mb-8">
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '3rem', color: '#fff', lineHeight: 1 }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '0.3rem', textTransform: 'none', letterSpacing: 'normal' }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span style={{ color: plan.highlight ? 'rgba(255,255,255,0.9)' : '#3B7FD4', fontSize: '0.8rem', marginTop: '0.15rem', flexShrink: 0 }}>✓</span>
                    <span style={{ color: plan.highlight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="btn-primary"
                style={{
                  background: plan.highlight ? '#fff' : '#3B7FD4',
                  color: plan.highlight ? '#3B7FD4' : '#fff',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-8" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
          Sin contratos innecesarios. Sin límites artificiales.
        </p>
      </div>
    </section>
  )
}
