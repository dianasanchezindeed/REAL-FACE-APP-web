'use client'
import { PIXEL_ID } from '../tracking'

export default function CookieSettingsButton() {
  if (!PIXEL_ID) return null
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('rf-open-cookies'))}
      style={{
        marginTop: 8, padding: '10px 20px', borderRadius: 50, fontSize: 14, cursor: 'pointer',
        background: 'transparent', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.2)',
        fontFamily: 'var(--font-body)',
      }}
    >
      Cambiar mis preferencias de cookies
    </button>
  )
}
