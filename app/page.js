'use client'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const LOGO_MARK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABACAMAAACz8qB+AAAASFBMVEX/1bX/6az/0rP/y6r/38T/f3//u7T//3//483/4cf/5Mv/rnn/AAD//wD/fz8AAAD/1bf/y6n/4sn/3cL//v7/0rP/yqf/qqqd8RwwAAAAGHRSTlOkEFnkmAILAhpa2BABAQgA69T49ALYkQMNT2smAAADwElEQVR42q2Yi5ajIAyGCYqobTcIQd//TTcBvM121LOanjrH2n4TQi6/Kq3UyJaPX0xDi4jAb4P83e9W705q1QaXrRp+M6UnJMK3AeWGYfu9is1VbrHgA797hbWLMcr7V2hVKY1I/EL171X59UrNUGrz6XBAHQZXt8juGhp/LsjtTKChV4AqncZD6OAicGDNB374GndIJgaBWmr7Qj1gSoCA1z8hrJ/t3AyrcUwJuxDPPOWr1cCeoixs/mgbT1m3gL3PUKJ+u4Zqa5tVSgQmIgMxX9ov22+MoWixU7+lqRoqF0vkotO8fIu6XCpJKTb/zdYxVFLlNwPQg1t3A3JinZlAOQKwtWkxK9yxWqCyA0jyhfRF+m6gjv/n27wQ9Ro9QIsXPT00M5VMFhtTF7gPRWObJXFiczmmJ/bKAQiSjfAU9E0QS8l4/RSUOXUpa6+weQzalbL26jFPJ2x9gdaPQv3TUMAuQf2T0IY66T7PQiesfchY/dTu83CQ7itcTv7pGWgzO+p9fD20fJ54sk0J+lRDAXxFX6ihkdWnpmmtNcUoHT6XoTRN+FJ+hqpL7fRfqG2IX8nYH/F0SGMtpekLpzfCNzU1qk2rOfEUtEqjN7s6phHV+bAfvVlUjWte/IDyrOTZWMYjOxBDrs+y9Vagis8LcysVfodO2PXbEe78XPTMbJKY0C6snsYrUGmdnmPowgqT8gwpRSc01O7U00bXHEClIYnM9JtlJ25isqP1jjnEK56KWJrLJyujHIbxj/ym3e3SXn4dQS2BW9wrh6AaUeeJuYFuc2CojqDSkvo1knLgHcLpk+pVQuJGXawTm0/gKE95L/rUkIIrMQhATZlUaajq/6r9LKn0EgKVKh46n8WtzkKqmeuODwAvewydl1GXHhqc6BKCusRTn7Wqr56SNdY2FkrFBze86EMS0RvQTR34HFyZIlyg/jbU2DbmJOBbIzBGpsptKDunZ2hSJlNRqregH/vqizIJoszlJkJuKG5Bk2sh5aYo8ym1qNvQtDcF6jpG0UdVt6HsnC9M14Pl8QL3oZj0ft7zIKx0rs8EhToTJ7B2OuCiYFFd3YXK3izTQ5ob7919KFnoC3SoePkf08bbUGl4boYqsuL6A1Bq1Dw30xa9qcX3XS3FabQOYzAXRN8V1SdpVEZc3iN6AErUrs9CLt3xXhG90/KIQ2bmQ1CRJctTH31Bn1+8kdDz0xSn6CEoGVLLExp9rtAvQSXjq/LMqIrt2zwC5bCqVFPSo9VpVC9COaoix2Lfxz6ePkj4C/n8NGn/yFCkAAAAAElFTkSuQmCC'

const supabase = createClient(
  'https://jgfacgvwhipnafbzcjem.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZmFjZ3Z3aGlwbmFmYnpjamVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjYwNDQsImV4cCI6MjA4NzYwMjA0NH0.qQB8nZ_YXf0pCnHDglFxfeUe5riDHqRVZxLJxOBznc4'
)

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function WaitlistForm({ large = false }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    setLoading(false)

    if (error) {
      if (error.code === '23505') {
        setDone(true)
      } else {
        setError('Algo falló. Inténtalo de nuevo.')
      }
    } else {
      setDone(true)
    }
  }

  if (done) return (
    <div className={`flex items-center gap-3 glass rounded-2xl px-6 py-4 ${large ? 'text-lg' : ''}`}
         style={{ border: '1px solid rgba(232,84,122,0.3)', animation: 'float 4s ease-in-out infinite' }}>
      <span style={{ fontSize: large ? 28 : 20 }}>✦</span>
      <span className="gradient-text font-display" style={{ fontSize: large ? '1.3rem' : '1rem', fontStyle: 'italic' }}>
        Estás dentro. Te avisaremos pronto.
      </span>
    </div>
  )

  return (
    <div style={{ width: '100%', maxWidth: 480 }}>
      <form onSubmit={submit} className={`flex ${large ? 'flex-col sm:flex-row gap-3' : 'gap-2'} w-full`}>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className={`input-field rounded-2xl flex-1 ${large ? 'px-5 py-4 text-base' : 'px-4 py-3 text-sm'}`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`rounded-2xl font-medium whitespace-nowrap ${large ? 'px-8 py-4 text-base' : 'px-5 py-3 text-sm'}`}
          style={{
            fontFamily: 'var(--font-body)',
            background: 'linear-gradient(135deg, #ffffff, #f0d4db)',
            color: '#1a0a10',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {loading ? '...' : 'Unirme'}
        </button>
      </form>
      {error && <p style={{ fontSize: 12, color: '#e8547a', marginTop: 8 }}>{error}</p>}
    </div>
  )
}

function CompatCircle() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <svg width="200" height="200" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
        {visible && (
          <circle cx="100" cy="100" r="70" fill="none"
            stroke="url(#compatGrad)" strokeWidth="6"
            strokeLinecap="round"
            className="compat-ring"
          />
        )}
        <defs>
          <linearGradient id="compatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8547a"/>
            <stop offset="100%" stopColor="#9b5de5"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div className="gradient-text font-display" style={{ fontSize: '3rem', lineHeight: 1, fontWeight: 300 }}>
          {visible ? '87%' : '0%'}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>compatibilidad</div>
      </div>
    </div>
  )
}

export default function Home() {
  useReveal()

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main style={{ background: 'var(--bg)' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(4,3,10,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={LOGO_MARK} alt="RealFace" width={37} height={28} style={{ height: 28, width: 'auto', display: 'block' }}/>
          <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: '0.32em', color: '#e5c0a6', lineHeight: 1 }}>REALFACE</span>
        </div>
        <button onClick={scrollToWaitlist} className="btn-primary" style={{
          padding: '8px 20px', borderRadius: 50,
          fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 400,
          cursor: 'pointer', border: 'none', color: 'white'
        }}>
          <span>Lista de espera</span>
        </button>
      </nav>

      {/* HERO */}
      <section className="animated-gradient" style={{
        minHeight: '100vh', paddingTop: 64,
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb" style={{ width: 600, height: 600, top: -100, left: -200, background: 'radial-gradient(circle, rgba(155,93,229,0.15) 0%, transparent 70%)' }}/>
        <div className="orb" style={{ width: 500, height: 500, bottom: -150, right: -100, background: 'radial-gradient(circle, rgba(232,84,122,0.12) 0%, transparent 70%)' }}/>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 100px', width: '100%',
          textAlign: 'center', position: 'relative', zIndex: 2 }}>

          <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 50, marginBottom: 32,
            background: 'rgba(232,84,122,0.1)', border: '1px solid rgba(232,84,122,0.25)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8547a', boxShadow: '0 0 8px #e8547a' }}/>
            <span style={{ fontSize: 12, color: '#f8c8d4', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Próximamente · Sevilla
            </span>
          </div>

          <div className="reveal delay-100 font-display text-glow" style={{
            fontSize: 'clamp(6rem, 22vw, 16rem)',
            fontWeight: 300, lineHeight: 0.9, letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #f0ecea 20%, #f8c8d4 50%, #e8547a 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 24,
          }}>
            RealFace
          </div>

        <h1 className="reveal delay-200 font-display" style={{
  fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
  fontWeight: 300, lineHeight: 1.4,
  color: '#ffffff',
  marginBottom: 48, fontStyle: 'italic',
}}>
  <span className="hero-line">La app de citas con{' '}
  <span style={{
    background: 'linear-gradient(135deg, #f8c8d4, #e8547a 40%, #9b5de5)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  }}>IA</span>
  {' '}</span>
  <span className="hero-line">que encuentra a la persona más compatible contigo</span>
</h1>

          <div className="reveal delay-400" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <button onClick={scrollToWaitlist} style={{
              padding: '16px 48px', borderRadius: 50,
              fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600,
              cursor: 'pointer', border: 'none',
              background: 'linear-gradient(135deg, #ffffff, #f0d4db)',
              color: '#1a0a10', letterSpacing: 0.5,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Únete a la lista de espera
            </button>
            <span style={{ fontSize: 16, color: 'var(--text-muted)' }}>
              Más de 1200 personas esperando
            </span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '16px 0', background: 'rgba(232,84,122,0.04)' }}>
        <div className="marquee-inner" style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...Array(2)].map((_, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 64 }}>
              {['Menos swipe, más conexión', 'Personas que encajan contigo', 'Planes reales, no chats eternos',
                'IA que te conoce de verdad', 'No más conexiones vacías', 'Tu próxima pareja te espera'].map((t, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 13,
                  color: 'var(--text-muted)', letterSpacing: 1 }}>
                  <span className="gradient-text" style={{ fontSize: 10 }}>✦</span>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEMA */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, bottom: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(232,84,122,0.08) 0%, transparent 70%)' }}/>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="reveal" style={{ fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,84,122,0.7)', marginBottom: 20 }}>El problema</div>
            <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)', fontWeight: 300, lineHeight: 1.05, fontStyle: 'italic' }}>
              Las apps actuales<br/>
              <span style={{ color: 'rgba(240,236,234,0.35)', textDecoration: 'line-through' }}>no funcionan.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '∞', title: 'Swipe infinito', desc: 'Horas mirando fotos de personas que nunca conocerás.', color: 'rgba(232,84,122,0.2)' },
              { icon: '◌', title: 'Conversaciones vacías', desc: '"Hola" → silencio. Una y otra vez. Sin fin.', color: 'rgba(155,93,229,0.2)' },
              { icon: '⊘', title: 'Falta de contexto social', desc: 'Conoces a alguien sin ver quién es realmente en su vida real.', color: 'rgba(76,201,240,0.15)' },
            ].map((item, i) => (
              <div key={i} className={`reveal delay-${i * 150 + 100} glass`}
                style={{ padding: '32px 28px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: item.color,
                  border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 24, margin: '0 auto 20px', color: 'rgba(240,236,234,0.5)' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: 10, color: 'rgba(240,236,234,0.5)',
                  textDecoration: 'line-through', textDecorationColor: 'rgba(232,84,122,0.4)' }}>{item.title}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* SOLUCIÓN */}
<section style={{ padding: 'clamp(80px,12vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
  <div
    className="orb"
    style={{
      width: 600,
      height: 600,
      top: '10%',
      right: '-15%',
      background: 'radial-gradient(circle, rgba(232,84,122,0.14) 0%, transparent 70%)'
    }}
  />

  <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
    
    <div style={{ textAlign: 'center', marginBottom: 90 }}>
      <div
        className="reveal"
        style={{
          fontSize: 12,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'rgba(232,84,122,0.75)',
          marginBottom: 20
        }}
      >
        La solución
      </div>

      <h2 className="reveal delay-100 font-display gradient-text-cool" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, lineHeight: 1.1, fontStyle: 'italic' }}>
        RealFace es diferente.
      </h2>

      <p className="reveal delay-200" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: 16, fontStyle: 'italic', letterSpacing: 0.5 }}>
        This feels different.
      </p>

      <div
        className="reveal delay-300"
        style={{
          fontSize: 12,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'rgba(76,201,240,0.85)',
          marginTop: 80,
          marginBottom: 10,
        }}
      >
        Primer caso de uso
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1 }}>
      {[
  {
    icon: '✦',
          label: 'No eliges por fotos',
          sub: 'La IA entiende quién eres y qué buscas, y te conecta con personas que realmente encajan contigo. Luego tú decides.'
        },
        {
          icon: '⏱',
          label: 'No pierdes el tiempo',
          sub: 'Ves directamente personas que encajan contigo. Cuanto más la uses, mejores matches te dará.'
        },
        {
          icon: '✖',
          label: 'Sistema anti-ghosting y sin fomo',
          sub: 'Solo puedes hablar con 5 personas a la vez. Si quieres ver más, tienes que cerrar conversaciones de forma educada.'
        },
        {
          icon: '◉',
          label: 'La conexión no se queda en el chat',
          sub: 'La IA te conecta con personas compatibles y si hay feeling, pasáis a la vida real.'
        }
      ].map((item, i) => (
        <div
          key={i}
          className={`reveal delay-${i * 100 + 200}`}
          style={{
            padding: '36px 28px',
            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <div className="gradient-text" style={{ fontSize: 28, marginBottom: 16 }}>
            {item.icon}
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 500, marginBottom: 10 }}>
            {item.label}
          </h3>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {item.sub}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

      {/* 87% */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px',
        background: 'linear-gradient(160deg, rgba(155,93,229,0.05) 0%, rgba(232,84,122,0.05) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(155,93,229,0.1) 0%, transparent 60%)' }}/>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="reveal" style={{ fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(180,130,255,0.85)', marginBottom: 20 }}>La magia</div>
            <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(2.3rem, 6.5vw, 4.6rem)', fontWeight: 300, lineHeight: 1.15, fontStyle: 'italic' }}>
              Te conoce antes<br/><span className="gradient-text">de conectarte.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div className="reveal-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              <CompatCircle />
              <div className="glass" style={{ padding: '24px 28px', borderRadius: 20, width: '100%', maxWidth: 300, border: '1px solid rgba(232,84,122,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(232,84,122,0.4), rgba(155,93,229,0.4))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>◈</div>
                    <div><div style={{ fontSize: 13, fontWeight: 500 }}>Sofía & Tú</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Análisis IA</div></div>
                  </div>
                  <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 300, fontFamily: 'var(--font-display)' }}>87%</div>
                </div>
                {[
                  { label: 'Valores compartidos', val: 92, color: '#e8547a' },
                  { label: 'Estilo de comunicación', val: 84, color: '#9b5de5' },
                  { label: 'Alineación emocional', val: 88, color: '#4cc9f0' },
                ].map((bar, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11, color: 'var(--text-muted)' }}>
                      <span>{bar.label}</span><span style={{ color: bar.color }}>{bar.val}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
                      <div style={{ height: '100%', width: `${bar.val}%`, borderRadius: 2, background: `linear-gradient(90deg, ${bar.color}, ${bar.color}80)`, boxShadow: `0 0 8px ${bar.color}60` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { icon: '◉', title: 'La IA te aprende', body: 'Cuanto más usas RealFace, mejor te entiende. No rellenas formularios. Simplemente eres tú.' },
                { icon: '◈', title: 'Personalidad, valores, comportamiento', body: 'Analiza cómo te expresas, qué te importa y cómo te relacionas con el mundo.' },
                { icon: '✦', title: 'Match antes de hablar', body: 'Solo ves personas que ya tienen sentido para ti. No hay sorpresas desagradables.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="gradient-text" style={{ fontSize: 18 }}>{item.icon}</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 6 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* VALUE PROPS */}
      <section style={{ padding: 'clamp(60px,10vw,100px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {['Menos swipe, más conexión', 'Personas que encajan contigo', 'Planes reales, no chats eternos'].map((prop, i) => (
              <div key={i} className={`reveal delay-${i * 150} glass`} style={{ padding: '14px 28px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="font-display" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontWeight: 300, fontStyle: 'italic' }}>{prop}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{
        padding: 'clamp(80px,12vw,140px) 24px',
        background: 'linear-gradient(160deg, rgba(155,93,229,0.06) 0%, rgba(232,84,122,0.08) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden'
      }}>
        <div className="orb" style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(155,93,229,0.15) 0%, transparent 60%)' }}/>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,84,122,0.7)', marginBottom: 24 }}>Lista de espera</div>
          <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 300, lineHeight: 1.1, fontStyle: 'italic', marginBottom: 16 }}>
            Deja de elegir<br/><span className="gradient-text">a ciegas.</span>
          </h2>
          <p className="reveal delay-200" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: 48, lineHeight: 1.7 }}>
            Sé de los primeros en descubrir<br/>una forma diferente de conectar.
          </p>
          <div className="reveal delay-300" style={{ display: 'flex', justifyContent: 'center' }}>
            <WaitlistForm large />
          </div>
          <p className="reveal delay-400" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
            Sin spam. Solo te avisamos cuando esté listo.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(232,84,122,0.1) 0%, transparent 65%)' }}/>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="reveal float-slow" style={{ marginBottom: 40 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #e8547a, #9b5de5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto', boxShadow: '0 0 60px rgba(232,84,122,0.4), 0 0 120px rgba(155,93,229,0.2)' }}>✦</div>
          </div>
          <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 300, lineHeight: 1.1, fontStyle: 'italic', marginBottom: 32 }}>
            <span className="gradient-text">El futuro</span><br/>de conocer personas.
          </h2>
          <div className="reveal delay-200">
            <button onClick={scrollToWaitlist} style={{
              padding: '18px 56px', borderRadius: 50,
              fontSize: '1.05rem', fontFamily: 'var(--font-body)', fontWeight: 600,
              cursor: 'pointer', border: 'none',
              background: 'linear-gradient(135deg, #ffffff, #f0d4db)',
              color: '#1a0a10', letterSpacing: 0.5,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Únete a la lista de espera
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #e8547a, #9b5de5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✦</div>
          <span className="font-display" style={{ fontSize: '1rem', letterSpacing: 2, color: 'var(--text-muted)' }}>RealFace</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2025 RealFace · Todos los derechos reservados</div>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'var(--text-muted)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidad</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Términos</a>
        </div>
      </footer>

    </main>
  )
}
