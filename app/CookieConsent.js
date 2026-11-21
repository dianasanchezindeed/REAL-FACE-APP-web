'use client'
import { useEffect, useState } from 'react'
import { PIXEL_ID, getConsent, setConsent, loadPixel } from './tracking'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!PIXEL_ID) return
    const c = getConsent()
    if (c === 'granted') loadPixel()
    else if (!c) setShow(true)
    const reopen = () => setShow(true)
    window.addEventListener('rf-open-cookies', reopen)
    return () => window.removeEventListener('rf-open-cookies', reopen)
  }, [])

  if (!show) return null

  const choose = (v) => { setConsent(v); setShow(false) }

  return (
    <div className="glass-strong" role="dialog" aria-label="Preferencias de cookies" style={{
      position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 200,
      maxWidth: 560, margin: '0 auto', borderRadius: 20, padding: '18px 20px',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14,
      background: 'rgba(10,6,18,0.85)',
    }}>
      <p style={{ flex: '1 1 260px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Usamos cookies de medición de Meta solo si las aceptas, para saber cómo funcionan nuestros anuncios.{' '}
        <a href="/privacidad#cookies" style={{ color: '#f8c8d4' }}>Más información</a>
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => choose('denied')} style={{
          padding: '10px 18px', borderRadius: 50, fontSize: 13, cursor: 'pointer',
          background: 'transparent', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.2)',
          fontFamily: 'var(--font-body)',
        }}>Rechazar</button>
        <button onClick={() => choose('granted')} style={{
          padding: '10px 18px', borderRadius: 50, fontSize: 13, cursor: 'pointer', fontWeight: 600,
          background: 'linear-gradient(135deg, #ffffff, #f0d4db)', color: '#1a0a10', border: 'none',
          fontFamily: 'var(--font-body)',
        }}>Aceptar</button>
      </div>
    </div>
  )
}
