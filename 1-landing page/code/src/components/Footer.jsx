export default function Footer() {
  return (
    <footer style={{ background: '#080f1e', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/logo-icon.png"
                alt="TrainRelay"
                className="h-8 w-8 object-contain"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
                Train Relay
              </span>
            </div>
            <div className="section-divider mb-4" />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: '1.7', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400, maxWidth: '280px' }}>
              Sistema de entrenamiento de alto rendimiento para coaches y atletas que no negocian con sus resultados.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.2rem' }}>
              Producto
            </h4>
            <ul className="space-y-3">
              {['Funcionalidades', 'Precios', 'Cómo funciona', 'Integraciones'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', textTransform: 'none', letterSpacing: 'normal', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.target.style.color = '#3B7FD4' }}
                    onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.4)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.2rem' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              {['Términos de uso', 'Privacidad', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', textTransform: 'none', letterSpacing: 'normal', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.target.style.color = '#3B7FD4' }}
                    onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.4)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
            © 2026 Train Relay. Todos los derechos reservados.
          </p>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
            Multisport Coaching
          </p>
        </div>
      </div>
    </footer>
  )
}
