import { useState } from 'react'

const faqs = [
  { q: '¿Es difícil empezar?', a: 'No. Está diseñado para que empieces rápido y mejores constantemente. En menos de 2 minutos tenés tu perfil listo y podés conectarte con tu equipo.' },
  { q: '¿Sirve para cualquier nivel?', a: 'Sí. Desde quienes empiezan hasta quienes compiten. El sistema se adapta al nivel del atleta y a los objetivos del entrenador.' },
  { q: '¿Puedo escalar con muchos atletas?', a: 'Sí. El sistema está pensado para crecer sin perder control. Con los planes Pro y Elite podés gestionar decenas o cientos de atletas con la misma precisión.' },
  { q: '¿Se adapta a distintos deportes?', a: 'Sí. Es flexible, preciso y escalable. Funciona para running, ciclismo, triatlón, natación, fitness funcional y más.' },
  { q: '¿Puedo salir cuando quiera?', a: 'Sí. Sin ataduras. No hay contratos de permanencia ni penalidades. Tu cuenta y tus datos son tuyos.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section
      id="faq"
      className="py-28"
      style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #080f1e 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-4">FAQ</p>
          <div className="section-divider center mb-6" />
          <h2 className="text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Preguntas{' '}
            <span className="text-[#3B7FD4]">frecuentes</span>
          </h2>
        </div>

        <div className="space-y-px" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: i < faqs.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                background: open === i ? 'rgba(59,127,212,0.06)' : 'transparent',
                borderLeft: open === i ? '3px solid #3B7FD4' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left px-6 py-5"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.03em', textTransform: 'uppercase', color: '#fff', paddingRight: '1rem' }}>
                  {faq.q}
                </span>
                <span
                  style={{
                    color: '#3B7FD4',
                    fontSize: '1.4rem',
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 300,
                    flexShrink: 0,
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.2s',
                    display: 'inline-block',
                  }}
                >
                  +
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-5">
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: '1.7', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
