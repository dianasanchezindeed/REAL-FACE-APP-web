'use client'

// Meta Pixel + origen del registro.
// El ID del Pixel se configura en Vercel como variable de entorno NEXT_PUBLIC_META_PIXEL_ID.
// Si no existe, no se carga nada y no se muestra el aviso de cookies.
// El Pixel solo se carga si la persona acepta las cookies de medición.
// Nunca se envían datos personales (nombre, email, edad...) en los eventos.

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

const CONSENT_KEY = 'rf_cookie_consent'
const SOURCE_KEY = 'rf_source'
const META_SOURCES = ['facebook', 'fb', 'instagram', 'ig', 'meta']

export function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY) } catch { return null }
}

export function setConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value) } catch {}
  if (value === 'granted') loadPixel()
}

let pixelLoaded = false

export function loadPixel() {
  if (pixelLoaded || !PIXEL_ID || typeof window === 'undefined') return
  if (getConsent() !== 'granted') return
  pixelLoaded = true
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  // Desactiva la detección automática de Meta (evita que lea botones o campos del formulario)
  window.fbq('set', 'autoConfig', false, PIXEL_ID)
  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

export function track(event, params) {
  if (!PIXEL_ID || typeof window === 'undefined' || getConsent() !== 'granted') return
  loadPixel()
  if (!window.fbq) return
  if (params) window.fbq('track', event, params)
  else window.fbq('track', event)
}

// Origen del registro: 'facebook_ads' si la visita llega desde un anuncio de Meta
// (enlace con utm_source=facebook / instagram / fb / ig / meta); 'web' en cualquier otro caso.
export function detectSource() {
  const empty = { source: 'web', utm_source: null, utm_medium: null, utm_campaign: null }
  if (typeof window === 'undefined') return empty
  try {
    const p = new URLSearchParams(window.location.search)
    const utm_source = (p.get('utm_source') || '').trim().toLowerCase()
    if (utm_source) {
      const data = {
        source: META_SOURCES.includes(utm_source) ? 'facebook_ads' : 'web',
        utm_source: utm_source.slice(0, 100),
        utm_medium: (p.get('utm_medium') || '').slice(0, 100) || null,
        utm_campaign: (p.get('utm_campaign') || '').slice(0, 200) || null,
      }
      sessionStorage.setItem(SOURCE_KEY, JSON.stringify(data))
      return data
    }
    const saved = sessionStorage.getItem(SOURCE_KEY)
    return saved ? JSON.parse(saved) : empty
  } catch {
    return empty
  }
}
