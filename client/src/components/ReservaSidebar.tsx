import { Star, ExternalLink, AlertTriangle, ShieldCheck, Phone, BookOpen, Trophy, Home, Newspaper } from 'lucide-react';
import { Link } from 'wouter';

// ─── Constants ──────────────────────────────────────────────────────────────
const LODGIFY_URL = 'https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades';

const PROPERTIES = [
  { name: 'Flamingo 38', price: 24, rating: 4.97, reviews: 186 },
  { name: 'La Pequeña París', price: 26, rating: 4.95, reviews: 142 },
  { name: 'El Balcón de Buda', price: 32, rating: 4.95, reviews: 128 },
  { name: 'King 1', price: 39, rating: 4.95, reviews: 97 },
  { name: 'El Alebrije', price: 43, rating: 4.95, reviews: 84 },
  { name: 'Rompecabezas', price: 39, rating: 4.89, reviews: 76 },
  { name: 'El Cuarto Cuatro', price: 60, rating: 4.88, reviews: 52 },
];

export { LODGIFY_URL, PROPERTIES };

// ─── Alerta CDMX Banner ────────────────────────────────────────────────────
function AlertaCDMX() {
  return (
    <div className="mb-6 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-md">
      {/* Cabecera de alerta */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-300 px-5 py-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-900 flex-shrink-0" />
          <span className="text-sm font-bold text-yellow-900 uppercase tracking-wide">
            Alerta CDMX Activa
          </span>
        </div>
      </div>

      {/* Cuerpo: descripción + links de emergencia */}
      <div className="bg-yellow-50 px-5 py-4">
        <div className="flex items-start gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-800 leading-relaxed">
            <strong className="text-amber-900">Tu seguridad es nuestra prioridad.</strong>{' '}
            Consulta las instrucciones vigentes para huéspedes en la Ciudad de México.
          </p>
        </div>

        {/* Links de emergencia */}
        <div className="flex flex-col gap-2 mb-4">
          <a
            href="https://superanfitrion.com/aviso-cdmx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 bg-amber-800 text-white text-xs font-bold rounded-lg hover:bg-amber-900 transition-colors"
          >
            <span>Ver aviso completo para huéspedes</span>
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://proteccioncivil.cdmx.gob.mx/comunicacion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-yellow-100 border border-yellow-300 text-yellow-900 text-xs font-semibold rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              Protección Civil
            </a>
            <a
              href="tel:911"
              className="flex items-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 text-red-800 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              Emergencias 911
            </a>
          </div>
        </div>

        {/* Mini-nav: salida para no quedar atrapado */}
        <div className="border-t border-yellow-200 pt-3">
          <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wide mb-2">
            Navegar el Diario Coyoacán
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Link
              href="/"
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-50 hover:text-amber-800 transition-colors"
            >
              <Home className="w-3 h-3" />
              Portada
            </Link>
            <Link
              href="/noticias"
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-50 hover:text-amber-800 transition-colors"
            >
              <Newspaper className="w-3 h-3" />
              Noticias
            </Link>
            <Link
              href="/hemeroteca"
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-50 hover:text-amber-800 transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              Hemeroteca
            </Link>
            <Link
              href="/hospedaje-mundial-2026"
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-50 hover:text-amber-800 transition-colors"
            >
              <Trophy className="w-3 h-3" />
              Mundial 2026
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ReservaSidebar Component ───────────────────────────────────────────────
/**
 * Sidebar compartido con:
 * 1. Banner de Alerta CDMX (seguridad para huéspedes) con links de emergencia y mini-nav
 * 2. Banner de reserva directa
 * 3. Lista de propiedades con precios y ratings
 * 4. Nota de confianza
 *
 * Props:
 * - showAlert: mostrar el banner de alerta CDMX (default: true)
 * - stickyTop: clase CSS para el top del sticky (default: "top-24")
 * - asAside: envolver en <aside> con clases de ancho (default: false)
 */
interface ReservaSidebarProps {
  showAlert?: boolean;
  stickyTop?: string;
  asAside?: boolean;
}

export default function ReservaSidebar({ showAlert = true, stickyTop = 'top-24', asAside = false }: ReservaSidebarProps) {
  const content = (
    <div className={`sticky ${stickyTop}`}>
      {/* Alerta CDMX */}
      {showAlert && <AlertaCDMX />}

      {/* Banner de reserva directa */}
      <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 rounded-2xl p-6 text-white mb-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">Reserva directa</span>
        </div>
        <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Hospédate en Coyoacán
        </h3>
        <p className="text-amber-100 text-sm mb-4 leading-relaxed">
          Sin comisiones de Airbnb. Departamentos completos a pasos del Jardín Centenario.
        </p>
        <a
          href={LODGIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 px-4 bg-white text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition-colors text-sm shadow-lg"
        >
          Ver Disponibilidad
        </a>
      </div>

      {/* Lista de propiedades */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h4 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
            Nuestros alojamientos
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">Precios desde — por noche</p>
        </div>
        <div className="divide-y divide-gray-50">
          {PROPERTIES.map((prop) => (
            <a
              key={prop.name}
              href={LODGIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-3 hover:bg-amber-50/50 transition-colors group"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-800 transition-colors truncate">
                  {prop.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs text-gray-600">{prop.rating}</span>
                  <span className="text-xs text-gray-400">({prop.reviews})</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-sm font-bold text-amber-800">${prop.price} USD</p>
                <p className="text-[10px] text-gray-400">por noche</p>
              </div>
            </a>
          ))}
        </div>
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <a
            href={LODGIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            Ver todos los alojamientos
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Nota de confianza */}
      <div className="mt-4 px-4 py-3 bg-green-50 rounded-xl border border-green-100">
        <p className="text-xs text-green-800 leading-relaxed">
          <strong>100% satisfacción.</strong> Entrada autónoma, WiFi de alta velocidad, a una cuadra del transporte público. Reserva directo y ahorra.
        </p>
      </div>
    </div>
  );

  if (asAside) {
    return (
      <aside className="hidden lg:block w-[340px] flex-shrink-0">
        {content}
      </aside>
    );
  }

  return content;
}

// ─── Mobile CTA (para usar en cualquier página) ────────────────────────────
export function MobileCTA() {
  return (
    <div className="lg:hidden bg-gradient-to-r from-amber-800 to-amber-900 rounded-2xl p-6 text-white my-8 shadow-lg">
      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        ¿Vienes a la CDMX?
      </h3>
      <p className="text-amber-100 text-sm mb-4 leading-relaxed">
        Hospédate en el corazón de Coyoacán con SúperAnfitrión. Departamentos completos, sin comisiones de Airbnb.
      </p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {PROPERTIES.slice(0, 4).map((prop) => (
          <div key={prop.name} className="bg-white/10 rounded-lg px-3 py-2">
            <p className="text-xs font-semibold text-white">{prop.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span className="text-xs text-amber-200">{prop.rating}</span>
              <span className="text-xs text-amber-300 ml-auto">${prop.price}</span>
            </div>
          </div>
        ))}
      </div>
      <a
        href={LODGIFY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-3 px-4 bg-white text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition-colors text-sm shadow-lg"
      >
        Ver Disponibilidad y Reservar
      </a>

      {/* Alerta CDMX en móvil — con links de emergencia */}
      <div className="mt-4 px-4 py-3 bg-yellow-400/20 rounded-xl border border-yellow-400/40">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-yellow-300 flex-shrink-0" />
          <span className="text-xs text-yellow-100 font-bold">Alerta CDMX Activa</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <a
            href="https://superanfitrion.com/aviso-cdmx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-200 hover:text-white underline"
          >
            Ver aviso completo para huéspedes →
          </a>
          <a
            href="https://proteccioncivil.cdmx.gob.mx/comunicacion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-200 hover:text-white underline"
          >
            Protección Civil CDMX →
          </a>
          <a href="tel:911" className="text-xs text-red-300 hover:text-red-200 font-bold">
            Emergencias: 911
          </a>
        </div>
      </div>
    </div>
  );
}
