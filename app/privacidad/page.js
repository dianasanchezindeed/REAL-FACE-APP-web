import CookieSettingsButton from './CookieSettingsButton'

export const metadata = {
  title: 'Política de privacidad — RealFace',
  description: 'Cómo trata REALFACE los datos del formulario de registro de realfacecommunity.com.',
}

const CONTACT = 'realfacecommunity@gmail.com'

const h2 = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 400, fontStyle: 'italic', margin: '48px 0 16px' }
const p = { fontSize: '1rem', color: 'rgba(240,236,234,0.75)', lineHeight: 1.75, marginBottom: 14 }
const li = { ...p, marginBottom: 8 }
const ul = { paddingLeft: 22, marginBottom: 14, listStyle: 'disc' }
const a = { color: '#f8c8d4', textDecoration: 'underline' }

export default function Privacidad() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(4,3,10,0.6)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <a href="/" style={{ fontSize: 13, letterSpacing: '0.32em', color: '#e5c0a6', textDecoration: 'none' }}>REALFACE</a>
        <a href="/" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>← Volver</a>
      </nav>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
        <div style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,84,122,0.7)', marginBottom: 20 }}>Privacidad</div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 7vw, 4rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 24 }}>
          Política de <span className="gradient-text">privacidad</span>
        </h1>
        <p style={p}>Última actualización: noviembre de 2026.</p>
        <p style={p}>
          Esta política explica cómo tratamos los datos que nos facilitas a través del formulario
          «¡Únete a REALFACE!» de realfacecommunity.com, y las cookies de medición de esta web.
          No se aplica al uso de la aplicación REALFACE, que tiene su propia política de privacidad.
        </p>

        <h2 style={h2}>1. Quién es el responsable</h2>
        <p style={p}>
          El responsable del tratamiento es el titular del proyecto REALFACE. Puedes contactar con nosotros
          para cualquier cuestión sobre tus datos en <a style={a} href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>

        <h2 style={h2}>2. Qué datos recogemos</h2>
        <ul style={ul}>
          <li style={li}>Los que escribes en el formulario: nombre, edad, ciudad, correo electrónico y tipo de móvil (iPhone, Android o «No lo sé»).</li>
          <li style={li}>Si aceptas o no la política de privacidad y, si lo marcas, tu consentimiento para recibir novedades y promociones.</li>
          <li style={li}>Datos técnicos del registro: la fecha y cómo llegaste a la web (por ejemplo, desde un anuncio de Facebook o Instagram, o directamente).</li>
          <li style={li}>Solo si aceptas las cookies de medición: datos de navegación recogidos por el Pixel de Meta (ver apartado 8).</li>
        </ul>
        <p style={p}>No te pedimos fotografías ni datos sobre tus preferencias sentimentales en este formulario.</p>

        <h2 style={h2}>3. Para qué los usamos</h2>
        <ul style={ul}>
          <li style={li}>Para avisarte por correo electrónico cuando puedas empezar a utilizar REALFACE.</li>
          <li style={li}>Para organizar el lanzamiento: saber en qué ciudades y en qué tipo de móvil hay más personas interesadas. Este análisis lo hacemos de forma agregada.</li>
          <li style={li}>Para saber de forma agregada qué campañas publicitarias funcionan mejor.</li>
          <li style={li}>Solo si marcas la casilla opcional: para enviarte novedades y promociones de REALFACE.</li>
        </ul>
        <p style={p}>No tomamos decisiones automatizadas sobre ti con estos datos.</p>

        <h2 style={h2}>4. Base legal</h2>
        <p style={p}>
          Tratamos tus datos porque nos das tu consentimiento al enviar el formulario (artículo 6.1.a del
          Reglamento General de Protección de Datos). El consentimiento para recibir novedades y promociones
          es independiente y opcional: puedes registrarte sin darlo. Puedes retirar cualquiera de tus
          consentimientos en cualquier momento, sin que eso afecte a lo tratado antes.
        </p>

        <h2 style={h2}>5. Edad mínima</h2>
        <p style={p}>REALFACE es solo para mayores de 18 años. Si tienes menos de 18 años, no envíes el formulario.</p>

        <h2 style={h2}>6. Cuánto tiempo los conservamos</h2>
        <p style={p}>
          Conservamos tus datos hasta que nos pidas que los borremos o retires tu consentimiento y, como
          máximo, hasta 12 meses después de que REALFACE esté disponible en tu ciudad. Después los eliminamos.
        </p>

        <h2 style={h2}>7. Con quién los compartimos</h2>
        <p style={p}>No vendemos tus datos. Solo acceden a ellos los proveedores que necesitamos para funcionar, que los tratan por cuenta nuestra:</p>
        <ul style={ul}>
          <li style={li}>Supabase: base de datos donde se guardan los registros, alojada en servidores de la Unión Europea (Fráncfort, Alemania).</li>
          <li style={li}>Vercel: alojamiento de esta web.</li>
          <li style={li}>Brevo: envío de los correos de aviso.</li>
          <li style={li}>Meta Platforms Ireland: solo si aceptas las cookies de medición.</li>
        </ul>
        <p style={p}>
          Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En ese caso,
          lo hacen con las garantías que exige el RGPD, como las cláusulas contractuales tipo aprobadas por
          la Comisión Europea o el Marco de Privacidad de Datos UE–EE. UU.
        </p>

        <h2 id="cookies" style={h2}>8. Cookies</h2>
        <p style={p}>
          Esta web no usa cookies de publicidad ni de medición salvo que las aceptes en el aviso de cookies.
          Si las aceptas, cargamos el Pixel de Meta para medir de forma agregada las visitas, cuántas
          personas ven el formulario y cuántas se registran. No enviamos a Meta tu nombre, tu edad ni tu
          correo electrónico. Si las rechazas, la web funciona igual.
        </p>
        <CookieSettingsButton />

        <h2 style={h2}>9. Tus derechos</h2>
        <p style={p}>
          Puedes pedirnos acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento,
          limitarlo, solicitar su portabilidad o retirar tu consentimiento. Escríbenos a{' '}
          <a style={a} href={`mailto:${CONTACT}`}>{CONTACT}</a> desde el correo con el que te registraste.
        </p>
        <p style={p}>
          Si crees que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia
          Española de Protección de Datos (<a style={a} href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).
        </p>

        <h2 style={h2}>10. Cambios</h2>
        <p style={p}>Si cambiamos esta política, publicaremos aquí la nueva versión con su fecha de actualización.</p>
      </article>
    </main>
  )
}
