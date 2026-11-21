import './globals.css'
import CookieConsent from './CookieConsent'

export const metadata = {
  title: 'RealFace — La app para la gente que busca algo serio',
  description: 'Conoce personas compatibles contigo según tu personalidad, tus valores, tus intereses y lo que buscas en una pareja. Sin chat: si ambos os dais match, reserváis una cita y os conocéis en persona.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
