export default function Solution() {
  return (
    <section
      id="solucion"
      className="py-28"
      style={{ background: '#080f1e' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — copy */}
          <div>
            <p className="section-eyebrow mb-4">La solución</p>
            <div className="section-divider mb-6" />
            <h2
              className="text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)' }}
            >
              Convertí cada entrenamiento en una{' '}
              <span className="text-[#3B7FD4]">ejecución perfecta</span>
            </h2>
            <p
              className="mb-10"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.05rem',
                lineHeight: '1.8',
                textTransform: 'none',
                letterSpacing: 'normal',
                fontWeight: 400,
              }}
            >
              TrainRelay no es una app más. Es un sistema de alto rendimiento
              donde entrenar deja de ser un intento y pasa a ser un proceso.
            </p>

            <div className="space-y-5">
              {[
                { n: '01', label: 'Cada rutina', desc: 'es el testigo.' },
                { n: '02', label: 'Cada intercambio', desc: 'es información valiosa.' },
                { n: '03', label: 'Cada ciclo', desc: 'es una mejora medible.' },
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-5">
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{
                      border: '2px solid rgba(59,127,212,0.5)',
                      fontFamily: 'Rajdhani, sans-serif',
                      fontWeight: 700,
                      color: '#3B7FD4',
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {s.n}
                  </div>
                  <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    <span className="text-white">{s.label} </span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>{s.desc}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div>
            <div
              className="p-10 rounded-none"
              style={{
                background: 'rgba(22, 37, 71, 0.5)',
                border: '1px solid rgba(59,127,212,0.2)',
                borderLeft: '4px solid #3B7FD4',
              }}
            >
              {/* Coach → Athlete relay */}
              <div className="space-y-6">
                <div
                  className="flex items-center gap-5 p-5"
                  style={{ background: 'rgba(59,127,212,0.1)', border: '1px solid rgba(59,127,212,0.2)' }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl"
                    style={{ background: '#3B7FD4', fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    C
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Entrenador</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', textTransform: 'none', letterSpacing: 'normal' }}>Diseña · Ajusta · Decide con datos</p>
                  </div>
                  <span style={{ color: '#3B7FD4', fontSize: '1.5rem' }}>↓</span>
                </div>

                {/* Baton */}
                <div className="flex justify-center items-center gap-4 py-2">
                  <div className="flex-1 h-px" style={{ background: 'rgba(59,127,212,0.3)' }} />
                  <div
                    className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{
                      background: 'linear-gradient(90deg, #3B7FD4, #4D9FEF)',
                      color: '#fff',
                      fontFamily: 'Rajdhani, sans-serif',
                      boxShadow: '0 0 20px rgba(59,127,212,0.5)',
                    }}
                  >
                    el testigo
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'rgba(59,127,212,0.3)' }} />
                </div>

                <div
                  className="flex items-center gap-5 p-5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    A
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Atleta</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', textTransform: 'none', letterSpacing: 'normal' }}>Ejecuta · Mide · Reporta</p>
                  </div>
                  <span style={{ color: '#4ade80', fontSize: '1.5rem' }}>↑</span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { v: '+34%', l: 'Progreso' },
                    { v: '2x', l: 'Adherencia' },
                    { v: '100%', l: 'Trazabilidad' },
                  ].map((stat) => (
                    <div
                      key={stat.l}
                      className="text-center py-4"
                      style={{ background: 'rgba(8,15,30,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.6rem', color: '#3B7FD4', letterSpacing: '0.02em' }}>{stat.v}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'none', letterSpacing: 'normal' }}>{stat.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
