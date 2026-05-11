import { useState } from 'react'

const coachBenefits = [
  { icon: '📊', text: 'Dominá cada variable del proceso sin perder tiempo operativo.' },
  { icon: '📈', text: 'Escalá tu negocio con estructura profesional.' },
  { icon: '🧠', text: 'Tomá decisiones basadas en datos, no en intuición.' },
  { icon: '⭐', text: 'Convertí tu servicio en una experiencia de alto nivel.' },
  { icon: '🏷️', text: 'Diferenciate con una marca sólida y moderna.' },
]

const athleteBenefits = [
  { icon: '🎯', text: 'Entrená con un plan diseñado para rendir, no para cumplir.' },
  { icon: '📱', text: 'Sentí el control de tu progreso en cada sesión.' },
  { icon: '💬', text: 'Recibí feedback que impacta directamente en tu rendimiento.' },
  { icon: '🔥', text: 'Sostené la motivación con objetivos claros y medibles.' },
  { icon: '🏆', text: 'Formá parte de un sistema que te empuja a mejorar.' },
]

export default function Benefits() {
  const [active, setActive] = useState('coach')
  const items = active === 'coach' ? coachBenefits : athleteBenefits

  return (
    <section
      id="beneficios"
      className="py-28"
      style={{ background: '#0D1B3E' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-4">Beneficios</p>
          <div className="section-divider center mb-6" />
          <h2 className="text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Diseñado para ambos lados{' '}
            <span className="text-[#3B7FD4]">del relevo</span>
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-px" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { key: 'coach', label: 'Entrenadores' },
              { key: 'athlete', label: 'Atletas' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.9rem 2.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: active === tab.key ? '#3B7FD4' : 'transparent',
                  color: active === tab.key ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Benefits list */}
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.text}
              className="flex gap-4 p-6 transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderLeft: '3px solid #3B7FD4',
              }}
            >
              <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{item.icon}</span>
              <p
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  textTransform: 'none',
                  letterSpacing: 'normal',
                  fontWeight: 400,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
