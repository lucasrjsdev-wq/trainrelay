import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Precios', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(8, 15, 32, 0.97)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(59,127,212,0.2)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      {/* Top accent line */}
      {scrolled && <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#3B7FD4]" />}

      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/images/logo-icon.png"
              alt="TrainRelay"
              className="h-9 w-9 object-contain"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <img
              src="/images/logo-text.png"
              alt="Train Relay"
              className="h-7 object-contain"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </a>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.65)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#fff')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.65)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
              }}
            >
              Iniciar sesión
            </a>
            <a href="#pricing" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
              Empezar ahora
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className="block h-0.5 bg-white transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
              <span className="block h-0.5 bg-white transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-0.5 bg-white transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-8 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a href="#pricing" className="btn-primary mt-2" style={{ textAlign: 'center', justifyContent: 'center' }}>
                Empezar ahora
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
