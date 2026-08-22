'use client'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

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
        setError('Something went wrong. Please try again.')
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
        You're in. We'll let you know soon.
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
          placeholder="you@email.com"
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
          {loading ? '...' : 'Join'}
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
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>compatibility</div>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8547a, #9b5de5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, boxShadow: '0 0 16px rgba(232,84,122,0.4)' }}>✦</div>
          <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 300, letterSpacing: 2 }}>RealFace</span>
        </div>
        <button onClick={scrollToWaitlist} className="btn-primary" style={{
          padding: '8px 20px', borderRadius: 50,
          fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 400,
          cursor: 'pointer', border: 'none', color: 'white'
        }}>
          <span>Waitlist</span>
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
              Coming soon · Seville
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
  <span className="hero-line">The first AI that understands who you are,{' '}</span>
  <span className="hero-line">introduces you to{' '}
  <span style={{
    background: 'linear-gradient(135deg, #f8c8d4, #e8547a 40%, #9b5de5)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  }}>your future partner</span>
  {' '}</span>
  <span className="hero-line">and connects you with a{' '}
  <span style={{
    background: 'linear-gradient(135deg, #a8edea, #4cc9f0 40%, #9b5de5)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  }}>community of like-minded people</span>
  {' '}</span>
  <span className="hero-line">through events and activities.</span>
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
              Join the waitlist
            </button>
            <span style={{ fontSize: 16, color: 'var(--text-muted)' }}>
              More than 1,200 people are waiting
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
              {['Less swiping, more connection', 'People who fit you', 'Real plans, not endless chats',
                'AI that truly knows you', 'No more empty connections', 'Your next partner is waiting'].map((t, i) => (
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
            <div className="reveal" style={{ fontSize: 18, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,84,122,0.7)', marginBottom: 20 }}>The problem</div>
            <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)', fontWeight: 300, lineHeight: 1.05, fontStyle: 'italic' }}>
              Current dating apps<br/>
              <span style={{ color: 'rgba(240,236,234,0.35)', textDecoration: 'line-through' }}>don't work.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '∞', title: 'Endless swiping', desc: 'Hours looking at photos of people you'll never meet.', color: 'rgba(232,84,122,0.2)' },
              { icon: '◌', title: 'Empty conversations', desc: '"Hi" → silence. Again and again. Endless.', color: 'rgba(155,93,229,0.2)' },
              { icon: '⊘', title: 'Lack of social context', desc: 'You meet someone without seeing who they really are in real life.', color: 'rgba(76,201,240,0.15)' },
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
        The solution
      </div>

      <h2 className="reveal delay-100 font-display gradient-text-cool" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, lineHeight: 1.1, fontStyle: 'italic' }}>
        RealFace is different.
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
        First use case
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1 }}>
      {[
  {
    icon: '✦',
          label: 'You don't choose by photos',
          sub: 'The AI understands who you are and what you're looking for, and connects you with people who truly fit you. Then you decide.'
        },
        {
          icon: '⏱',
          label: 'You don't waste time',
          sub: 'You see people who fit you right away. The more you use it, the better your matches become.'
        },
        {
          icon: '✖',
          label: 'Anti-ghosting, no-FOMO system',
          sub: 'You can only talk to 5 people at a time. If you want to see more, you have to close conversations politely.'
        },
        {
          icon: '◉',
          label: 'The connection doesn't stay in the chat',
          sub: 'The AI connects you with compatible people and, if there's chemistry, you take it into real life.'
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
            <div className="reveal" style={{ fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(180,130,255,0.85)', marginBottom: 20 }}>The magic</div>
            <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(2.3rem, 6.5vw, 4.6rem)', fontWeight: 300, lineHeight: 1.15, fontStyle: 'italic' }}>
              It gets to know you before<br/><span className="gradient-text">connecting you.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div className="reveal-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              <CompatCircle />
              <div className="glass" style={{ padding: '24px 28px', borderRadius: 20, width: '100%', maxWidth: 300, border: '1px solid rgba(232,84,122,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(232,84,122,0.4), rgba(155,93,229,0.4))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>◈</div>
                    <div><div style={{ fontSize: 13, fontWeight: 500 }}>Sofía & You</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>AI Analysis</div></div>
                  </div>
                  <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 300, fontFamily: 'var(--font-display)' }}>87%</div>
                </div>
                {[
                  { label: 'Shared values', val: 92, color: '#e8547a' },
                  { label: 'Communication style', val: 84, color: '#9b5de5' },
                  { label: 'Emotional alignment', val: 88, color: '#4cc9f0' },
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
                { icon: '◉', title: 'The AI learns you', body: 'The more you use RealFace, the better it understands you. You don't fill out forms. You simply be yourself.' },
                { icon: '◈', title: 'Personality, values, behavior', body: 'It analyzes how you express yourself, what matters to you, and how you relate to the world.' },
                { icon: '✦', title: 'Match before you talk', body: 'You only see people who already make sense for you. No unpleasant surprises.' },
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

     {/* PLANES */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, top: '5%', left: '-10%', background: 'radial-gradient(circle, rgba(76,201,240,0.1) 0%, transparent 70%)' }}/>
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(76,201,240,0.7)', marginBottom: 20 }}>Second use case</div>
            <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.2, fontStyle: 'italic' }}>
              Events, activities and communities<br/><span style={{ color: 'var(--text-muted)' }}> Connect with like-minded people.</span>
            </h2>
            <p className="reveal delay-200" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: 500, margin: '20px auto 0', lineHeight: 1.7 }}>
              Create your own plans or join communities and events that are already organized.<br/>Meet people who think like you and share your interests
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { emoji: '🍽', label: 'Dinners', desc: 'Share a table with interesting people.' },
              { emoji: '⛰', label: 'Sports', desc: 'Train or explore with people who match your pace.' },
              { emoji: '✈️', label: 'Getaways', desc: 'Travel plans with compatible people.' },
              { emoji: '◈', label: 'Events', desc: 'Concerts, exhibitions, culture.' },
            ].map((plan, i) => (
              <div key={i} className={`reveal delay-${i * 100 + 100} card-hover glass`}
                style={{ padding: '28px 24px', borderRadius: 20, textAlign: 'center', cursor: 'default' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{plan.emoji}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8 }}>{plan.label}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{plan.desc}</p>
              </div>
            ))}
          </div>

          {/* POLAROIDS */}
          <div style={{
            marginTop: 80,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 24,
            padding: '0 12px',
          }}>
            {[
              { src: '/polaroid-1.jpg', label: 'Sevilla, 2:14 AM', rotate: '-4deg', delay: '0s' },
              { src: '/polaroid-2.jpg', label: 'At the office', rotate: '2.5deg', delay: '1.2s' },
              { src: '/polaroid-3.jpg', label: 'I should have taken more photos' , rotate: '-2deg', delay: '0.6s' },
              { src: '/polaroid-4.jpg', label: 'Previously on..', rotate: '3.5deg', delay: '1.8s' },
              { src: '/polaroid-5.jpg', label: 'Sunday vibes', rotate: '-1.5deg', delay: '0.9s' },
              { src: '/polaroid-6.jpg', label: 'Barcelona blues', rotate: '2deg', delay: '2.1s' },
              { src: '/polaroid-7.jpg', label: 'Alexa, skip to summer', rotate: '-3deg', delay: '1.5s' },
            ].map((p, i) => (
              <div key={i} style={{
                transform: `rotate(${p.rotate})`,
                animation: `floatSlow ${6 + i * 0.7}s ease-in-out infinite`,
                animationDelay: p.delay,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = `rotate(${p.rotate}) scale(1)`}
              >
                <div style={{
                  background: '#ffffff',
                  padding: '10px 10px 32px 10px',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)',
                  width: 180,
                }}>
                  <div style={{
                    width: '100%',
                    height: 220,
                    overflow: 'hidden',
                    borderRadius: 2,
                    background: '#111',
                  }}>
                    <img
                      src={p.src}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        filter: 'brightness(0.92) contrast(1.05) saturate(0.9)',
                      }}
                    />
                  </div>
                  {p.label && (
                    <div style={{
                      marginTop: 10,
                      textAlign: 'center',
                      fontFamily: '"Segoe UI", cursive',
                      fontSize: 11,
                      color: '#444',
                      letterSpacing: 0.3,
                      fontStyle: 'italic',
                    }}>
                      {p.label}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

     

      {/* VALUE PROPS */}
      <section style={{ padding: 'clamp(60px,10vw,100px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {['Less swiping, more connection', 'People who fit you', 'Real plans, not endless chats'].map((prop, i) => (
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
          <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,84,122,0.7)', marginBottom: 24 }}>Waitlist</div>
          <h2 className="reveal delay-100 font-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 300, lineHeight: 1.1, fontStyle: 'italic', marginBottom: 16 }}>
            Stop choosing<br/><span className="gradient-text">blindly.</span>
          </h2>
          <p className="reveal delay-200" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: 48, lineHeight: 1.7 }}>
            Be among the first to discover<br/>a different way to connect.
          </p>
          <div className="reveal delay-300" style={{ display: 'flex', justifyContent: 'center' }}>
            <WaitlistForm large />
          </div>
          <p className="reveal delay-400" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
            No spam. We'll only let you know when it's ready.
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
            <span className="gradient-text">The future</span><br/>of meeting people.
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
              Join the waitlist
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
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2025 RealFace · All rights reserved</div>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'var(--text-muted)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
        </div>
      </footer>

    </main>
  )
}
