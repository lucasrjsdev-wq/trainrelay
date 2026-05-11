const testimonials = [
  { quote: 'Pasé de improvisar a trabajar con precisión total.', name: 'Martín G.', role: 'Entrenador personal', avatar: 'M' },
  { quote: 'Mis atletas mejoraron porque ahora todo está conectado.', name: 'Carolina V.', role: 'Triatlonista y coach', avatar: 'C' },
  { quote: 'No es solo entrenar. Es competir contra tu mejor versión.', name: 'Diego R.', role: 'Atleta amateur', avatar: 'D' },
  { quote: 'La diferencia es brutal: control, claridad y progreso real.', name: 'Lucía M.', role: 'Corredora de fondo', avatar: 'L' },
]

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-28"
      style={{ background: '#080f1e' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Testimonios</p>
          <div className="section-divider center mb-6" />
          <h2 className="text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Cuando el sistema cambia,{' '}
            <span className="text-[#3B7FD4]">los resultados aparecen</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 flex flex-col gap-5"
              style={{ background: '#080f1e', borderTop: '3px solid transparent', transition: 'border-color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = '#3B7FD4' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = 'transparent' }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#3B7FD4', fontSize: '0.9rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  textTransform: 'none',
                  letterSpacing: 'normal',
                  fontWeight: 400,
                  flex: 1,
                }}
              >
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold"
                  style={{
                    background: 'rgba(59,127,212,0.2)',
                    border: '1px solid rgba(59,127,212,0.4)',
                    color: '#3B7FD4',
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.1rem',
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff' }}>{t.name}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textTransform: 'none', letterSpacing: 'normal' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
