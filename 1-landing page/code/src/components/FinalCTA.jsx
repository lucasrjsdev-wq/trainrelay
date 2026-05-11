export default function FinalCTA() {
  return (
    <section
      id="cta-final"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080f20 0%, #0D1B3E 50%, #0a1530 100%)' }}
    >
      {/* BG accent */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: 'radial-gradient(ellipse at center, #3B7FD4, transparent 70%)' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-[#3B7FD4]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#3B7FD4]" />

      <div className="relative max-w-4xl mx-auto px-8 lg:px-16 text-center">
        <p className="section-eyebrow mb-4">¿Listo para empezar?</p>
        <div className="section-divider center mb-8" />
        <h2 className="text-white mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
          Tu próximo nivel no es{' '}
          <span className="text-[#3B7FD4]">casualidad.</span>
          <br />
          Es decisión.
        </h2>

        <div className="space-y-2 mb-12">
          {[
            'Cada rutina es una oportunidad.',
            'Cada posta define el resultado.',
            'Dejá de entrenar sin sistema.',
            'Empezá a competir en serio.',
          ].map((line) => (
            <p
              key={line}
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.05rem',
                textTransform: 'none',
                letterSpacing: 'normal',
                fontWeight: 400,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
          <a href="#pricing" className="btn-primary" style={{ justifyContent: 'center', fontSize: '1rem', padding: '1.1rem 3rem' }}>
            Empezar ahora →
          </a>
          <a href="#pricing" className="btn-outline" style={{ justifyContent: 'center', fontSize: '1rem', padding: '1.1rem 3rem' }}>
            Crear cuenta gratis
          </a>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
          Gratis · Sin tarjeta de crédito · Sin compromisos
        </p>
      </div>
    </section>
  )
}
