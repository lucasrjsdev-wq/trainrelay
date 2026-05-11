const platforms = [
  { name: 'iOS', icon: '📱' },
  { name: 'Android', icon: '🤖' },
  { name: 'Web', icon: '💻' },
  { name: 'Smartwatch', icon: '⌚' },
]

export default function Multiplatform() {
  return (
    <section
      id="multiplataforma"
      className="py-28"
      style={{ background: '#080f1e' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div
          className="text-center p-16"
          style={{ border: '1px solid rgba(59,127,212,0.2)', borderTop: '4px solid #3B7FD4', background: 'rgba(22,37,71,0.4)' }}
        >
          <p className="section-eyebrow mb-4">Multiplataforma</p>
          <div className="section-divider center mb-6" />
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            El rendimiento{' '}
            <span className="text-[#3B7FD4]">no espera.</span>
          </h2>
          <p
            className="mx-auto mb-12"
            style={{
              maxWidth: '560px',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.7',
              textTransform: 'none',
              letterSpacing: 'normal',
              fontWeight: 400,
            }}
          >
            Accedé desde cualquier dispositivo y mantené el sistema activo en todo momento.
            Entrená, ajustá y progresá sin interrupciones.
          </p>

          <div className="flex justify-center gap-10 flex-wrap mb-12">
            {platforms.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-3 group">
                <div
                  className="w-16 h-16 flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(59,127,212,0.08)',
                    border: '1px solid rgba(59,127,212,0.2)',
                    fontSize: '1.8rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59,127,212,0.2)'
                    e.currentTarget.style.borderColor = 'rgba(59,127,212,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(59,127,212,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(59,127,212,0.2)'
                  }}
                >
                  {p.icon}
                </div>
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          <div
            className="inline-flex items-center gap-3 px-6 py-4"
            style={{ background: 'rgba(8,15,30,0.8)', border: '1px solid rgba(59,127,212,0.2)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" style={{ animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'none', letterSpacing: 'normal' }}>
              Sincronización en tiempo real entre todos tus dispositivos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
