import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import {
  Trophy, MapPin, Star, Calendar, Users, ExternalLink,
  ChevronRight, Newspaper, Home, Zap, Shield, Clock
} from 'lucide-react';
import ReservaSidebar, { MobileCTA } from '@/components/ReservaSidebar';

// ─── Data ────────────────────────────────────────────────────────────────────

const GRUPOS = [
  {
    id: 'A', sede: 'Ciudad de México / Guadalajara', color: 'from-green-700 to-green-900',
    badge: 'bg-green-600', highlight: true,
    equipos: [
      { pais: 'México', bandera: '🇲🇽', conf: 'CONCACAF', estrella: 'Santiago Giménez', nota: 'Local. Abre el Mundial el 11 jun en el Azteca.' },
      { pais: 'Sudáfrica', bandera: '🇿🇦', conf: 'CAF', estrella: 'Percy Tau', nota: 'Rival inaugural de México.' },
      { pais: 'Corea del Sur', bandera: '🇰🇷', conf: 'AFC', estrella: 'Son Heung-min', nota: 'Favorita del grupo.' },
      { pais: 'Chequia', bandera: '🇨🇿', conf: 'UEFA', estrella: 'Tomáš Souček', nota: 'Repechaje UEFA D.' },
    ],
    partidos: ['11 jun — México vs Sudáfrica (Azteca, INAUGURACIÓN)', '15 jun — Corea del Sur vs Chequia (Azteca)', '19 jun — México vs Corea del Sur (Guadalajara)', '19 jun — Chequia vs Sudáfrica (Guadalajara)', '23 jun — México vs Chequia (Azteca)', '23 jun — Sudáfrica vs Corea del Sur (Guadalajara)'],
  },
  {
    id: 'B', sede: 'Los Ángeles / San Francisco', color: 'from-red-700 to-red-900',
    badge: 'bg-red-600', highlight: false,
    equipos: [
      { pais: 'Canadá', bandera: '🇨🇦', conf: 'CONCACAF', estrella: 'Alphonso Davies', nota: 'Co-anfitrión. Debut histórico.' },
      { pais: 'Bosnia y Herz.', bandera: '🇧🇦', conf: 'UEFA', estrella: 'Edin Džeko', nota: 'Repechaje UEFA A.' },
      { pais: 'Catar', bandera: '🇶🇦', conf: 'AFC', estrella: 'Akram Afif', nota: 'Campeón de Asia.' },
      { pais: 'Suiza', bandera: '🇨🇭', conf: 'UEFA', estrella: 'Granit Xhaka', nota: 'Sólida y disciplinada.' },
    ],
    partidos: ['12 jun — Canadá vs Bosnia (SoFi Stadium, LA)', '12 jun — Suiza vs Catar (Levi\'s Stadium, SF)', '16 jun — Canadá vs Catar (LA)', '16 jun — Bosnia vs Suiza (SF)', '20 jun — Canadá vs Suiza (LA)', '20 jun — Catar vs Bosnia (SF)'],
  },
  {
    id: 'C', sede: 'Miami / Atlanta', color: 'from-yellow-600 to-yellow-800',
    badge: 'bg-yellow-600', highlight: false,
    equipos: [
      { pais: 'Brasil', bandera: '🇧🇷', conf: 'CONMEBOL', estrella: 'Vinicius Jr.', nota: 'Máximo favorito al título.' },
      { pais: 'Marruecos', bandera: '🇲🇦', conf: 'CAF', estrella: 'Achraf Hakimi', nota: 'Semifinalista en Qatar 2022.' },
      { pais: 'Haití', bandera: '🇭🇹', conf: 'CONCACAF', estrella: 'Duckens Nazon', nota: 'Debut histórico.' },
      { pais: 'Escocia', bandera: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', conf: 'UEFA', estrella: 'Scott McTominay', nota: 'Clasificó por primera vez desde 1998.' },
    ],
    partidos: ['12 jun — Brasil vs Marruecos (Hard Rock, Miami)', '12 jun — Haití vs Escocia (Mercedes-Benz, Atlanta)', '16 jun — Brasil vs Haití (Miami)', '16 jun — Escocia vs Marruecos (Atlanta)', '20 jun — Brasil vs Escocia (Miami)', '20 jun — Marruecos vs Haití (Atlanta)'],
  },
  {
    id: 'D', sede: 'Dallas / Houston', color: 'from-blue-700 to-blue-900',
    badge: 'bg-blue-600', highlight: false,
    equipos: [
      { pais: 'Estados Unidos', bandera: '🇺🇸', conf: 'CONCACAF', estrella: 'Christian Pulisic', nota: 'Co-anfitrión. Enorme presión local.' },
      { pais: 'Paraguay', bandera: '🇵🇾', conf: 'CONMEBOL', estrella: 'Miguel Almirón', nota: 'Sorpresa de CONMEBOL.' },
      { pais: 'Australia', bandera: '🇦🇺', conf: 'AFC', estrella: 'Mathew Ryan', nota: 'Semifinalista en Qatar 2022.' },
      { pais: 'Repechaje UEFA C', bandera: '🏳️', conf: 'UEFA', estrella: 'Por definir', nota: 'Pendiente de repechaje.' },
    ],
    partidos: ['13 jun — EE.UU. vs Paraguay (AT&T Stadium, Dallas)', '13 jun — Australia vs Rep. UEFA C (Houston)', '17 jun — EE.UU. vs Australia (Dallas)', '17 jun — Paraguay vs Rep. UEFA C (Houston)', '21 jun — EE.UU. vs Rep. UEFA C (Dallas)', '21 jun — Paraguay vs Australia (Houston)'],
  },
  {
    id: 'E', sede: 'Nueva York / Boston', color: 'from-slate-700 to-slate-900',
    badge: 'bg-slate-600', highlight: false,
    equipos: [
      { pais: 'Alemania', bandera: '🇩🇪', conf: 'UEFA', estrella: 'Jamal Musiala', nota: 'Bicampeón de Europa. Favorita.' },
      { pais: 'Curazao', bandera: '🇨🇼', conf: 'CONCACAF', estrella: 'Leandro Bacuna', nota: 'Primera Copa del Mundo.' },
      { pais: 'Costa de Marfil', bandera: '🇨🇮', conf: 'CAF', estrella: 'Sébastien Haller', nota: 'Campeón de África 2023.' },
      { pais: 'Ecuador', bandera: '🇪🇨', conf: 'CONMEBOL', estrella: 'Moisés Caicedo', nota: 'Revelación de CONMEBOL.' },
    ],
    partidos: ['13 jun — Alemania vs Curazao (MetLife, NJ)', '13 jun — Costa de Marfil vs Ecuador (Gillette, Boston)', '17 jun — Alemania vs Costa de Marfil (NJ)', '17 jun — Ecuador vs Curazao (Boston)', '21 jun — Alemania vs Ecuador (NJ)', '21 jun — Curazao vs Costa de Marfil (Boston)'],
  },
  {
    id: 'F', sede: 'Seattle / Vancouver', color: 'from-orange-700 to-orange-900',
    badge: 'bg-orange-600', highlight: false,
    equipos: [
      { pais: 'Países Bajos', bandera: '🇳🇱', conf: 'UEFA', estrella: 'Virgil van Dijk', nota: 'Subcampeón de Europa 2024.' },
      { pais: 'Japón', bandera: '🇯🇵', conf: 'AFC', estrella: 'Takefusa Kubo', nota: 'Sensación de la Liga española.' },
      { pais: 'Repechaje UEFA B', bandera: '🏳️', conf: 'UEFA', estrella: 'Por definir', nota: 'Pendiente de repechaje.' },
      { pais: 'Túnez', bandera: '🇹🇳', conf: 'CAF', estrella: 'Wahbi Khazri', nota: 'Veterano del continente africano.' },
    ],
    partidos: ['14 jun — Países Bajos vs Japón (Lumen Field, Seattle)', '14 jun — Rep. UEFA B vs Túnez (BC Place, Vancouver)', '18 jun — Países Bajos vs Rep. UEFA B (Seattle)', '18 jun — Túnez vs Japón (Vancouver)', '22 jun — Países Bajos vs Túnez (Seattle)', '22 jun — Japón vs Rep. UEFA B (Vancouver)'],
  },
  {
    id: 'G', sede: 'Kansas City / Denver', color: 'from-purple-700 to-purple-900',
    badge: 'bg-purple-600', highlight: false,
    equipos: [
      { pais: 'Bélgica', bandera: '🇧🇪', conf: 'UEFA', estrella: 'Kevin De Bruyne', nota: 'Generación de oro en su último intento.' },
      { pais: 'Egipto', bandera: '🇪🇬', conf: 'CAF', estrella: 'Mohamed Salah', nota: 'Posiblemente su último Mundial.' },
      { pais: 'Irán', bandera: '🇮🇷', conf: 'AFC', estrella: 'Mehdi Taremi', nota: 'Confirmado el 15 de abril por Infantino.' },
      { pais: 'Nueva Zelanda', bandera: '🇳🇿', conf: 'OFC', estrella: 'Chris Wood', nota: 'Campeón de Oceanía.' },
    ],
    partidos: ['14 jun — Bélgica vs Egipto (Arrowhead, KC)', '14 jun — Irán vs Nueva Zelanda (Empower, Denver)', '18 jun — Bélgica vs Irán (KC)', '18 jun — Nueva Zelanda vs Egipto (Denver)', '22 jun — Bélgica vs Nueva Zelanda (KC)', '22 jun — Egipto vs Irán (Denver)'],
  },
  {
    id: 'H', sede: 'Chicago / Toronto', color: 'from-rose-700 to-rose-900',
    badge: 'bg-rose-600', highlight: false,
    equipos: [
      { pais: 'España', bandera: '🇪🇸', conf: 'UEFA', estrella: 'Lamine Yamal', nota: 'Campeón de Europa 2024. Gran favorita.' },
      { pais: 'Cabo Verde', bandera: '🇨🇻', conf: 'CAF', estrella: 'Garry Rodrigues', nota: 'Primera Copa del Mundo.' },
      { pais: 'Arabia Saudita', bandera: '🇸🇦', conf: 'AFC', estrella: 'Salem Al-Dawsari', nota: 'Venció a Argentina en Qatar 2022.' },
      { pais: 'Uruguay', bandera: '🇺🇾', conf: 'CONMEBOL', estrella: 'Darwin Núñez', nota: 'Potencia histórica de CONMEBOL.' },
    ],
    partidos: ['15 jun — España vs Cabo Verde (Soldier Field, Chicago)', '15 jun — Arabia Saudita vs Uruguay (BMO, Toronto)', '19 jun — España vs Arabia Saudita (Chicago)', '19 jun — Uruguay vs Cabo Verde (Toronto)', '23 jun — España vs Uruguay (Chicago)', '23 jun — Cabo Verde vs Arabia Saudita (Toronto)'],
  },
  {
    id: 'I', sede: 'Monterrey / San Francisco', color: 'from-teal-700 to-teal-900',
    badge: 'bg-teal-600', highlight: false,
    equipos: [
      { pais: 'Francia', bandera: '🇫🇷', conf: 'UEFA', estrella: 'Kylian Mbappé', nota: 'Favorita al título. Mbappé en su prime.' },
      { pais: 'Senegal', bandera: '🇸🇳', conf: 'CAF', estrella: 'Sadio Mané', nota: 'Campeón de África 2022.' },
      { pais: 'Colombia', bandera: '🇨🇴', conf: 'CONMEBOL', estrella: 'Luis Díaz', nota: 'Finalista de Copa América 2024.' },
      { pais: 'Repechaje FIFA B', bandera: '🏳️', conf: 'Inter', estrella: 'Por definir', nota: 'Pendiente de repechaje.' },
    ],
    partidos: ['15 jun — Francia vs Senegal (BBVA, Monterrey)', '15 jun — Colombia vs Rep. FIFA B (SF)', '19 jun — Francia vs Colombia (Monterrey)', '19 jun — Rep. FIFA B vs Senegal (SF)', '23 jun — Francia vs Rep. FIFA B (Monterrey)', '23 jun — Senegal vs Colombia (SF)'],
  },
  {
    id: 'J', sede: 'Dallas / Miami', color: 'from-indigo-700 to-indigo-900',
    badge: 'bg-indigo-600', highlight: false,
    equipos: [
      { pais: 'Argentina', bandera: '🇦🇷', conf: 'CONMEBOL', estrella: 'Lionel Messi', nota: 'Campeón del mundo. Posiblemente su último Mundial.' },
      { pais: 'Argelia', bandera: '🇩🇿', conf: 'CAF', estrella: 'Riyad Mahrez', nota: 'Campeón de África 2019.' },
      { pais: 'Austria', bandera: '🇦🇹', conf: 'UEFA', estrella: 'Marcel Sabitzer', nota: 'Clasificó por primera vez desde 1998.' },
      { pais: 'Uzbekistán', bandera: '🇺🇿', conf: 'AFC', estrella: 'Eldor Shomurodov', nota: 'Primera Copa del Mundo.' },
    ],
    partidos: ['16 jun — Argentina vs Argelia (AT&T, Dallas)', '16 jun — Austria vs Uzbekistán (Hard Rock, Miami)', '20 jun — Argentina vs Austria (Dallas)', '20 jun — Uzbekistán vs Argelia (Miami)', '24 jun — Argentina vs Uzbekistán (Dallas)', '24 jun — Argelia vs Austria (Miami)'],
  },
  {
    id: 'K', sede: 'Los Ángeles / Guadalajara', color: 'from-amber-700 to-amber-900',
    badge: 'bg-amber-600', highlight: false,
    equipos: [
      { pais: 'Portugal', bandera: '🇵🇹', conf: 'UEFA', estrella: 'Cristiano Ronaldo', nota: 'Posiblemente su último Mundial. CR7 a los 41 años.' },
      { pais: 'Repechaje FIFA A', bandera: '🏳️', conf: 'Inter', estrella: 'Por definir', nota: 'Pendiente de repechaje.' },
      { pais: 'Uzbekistán', bandera: '🇺🇿', conf: 'AFC', estrella: 'Eldor Shomurodov', nota: 'Primera Copa del Mundo.' },
      { pais: 'Por definir', bandera: '🏳️', conf: '—', estrella: '—', nota: 'Cuarto equipo pendiente.' },
    ],
    partidos: ['16 jun — Portugal vs Rep. FIFA A (SoFi, LA)', '16 jun — Uzbekistán vs 4.° (Akron, Guadalajara)', '20 jun — Portugal vs Uzbekistán (LA)', '20 jun — 4.° vs Rep. FIFA A (Guadalajara)', '24 jun — Portugal vs 4.° (LA)', '24 jun — Rep. FIFA A vs Uzbekistán (Guadalajara)'],
  },
  {
    id: 'L', sede: 'Nueva York / Toronto', color: 'from-cyan-700 to-cyan-900',
    badge: 'bg-cyan-600', highlight: false,
    equipos: [
      { pais: 'Inglaterra', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', conf: 'UEFA', estrella: 'Jude Bellingham', nota: 'Finalista de la Eurocopa 2024.' },
      { pais: 'Croacia', bandera: '🇭🇷', conf: 'UEFA', estrella: 'Luka Modrić', nota: 'Subcampeón en 2018. Modrić a los 40 años.' },
      { pais: 'Ghana', bandera: '🇬🇭', conf: 'CAF', estrella: 'Mohammed Kudus', nota: 'Talento joven de la Premier League.' },
      { pais: 'Por definir', bandera: '🏳️', conf: '—', estrella: '—', nota: 'Cuarto equipo pendiente.' },
    ],
    partidos: ['17 jun — Inglaterra vs Croacia (MetLife, NJ)', '17 jun — Ghana vs 4.° (BMO, Toronto)', '21 jun — Inglaterra vs Ghana (NJ)', '21 jun — 4.° vs Croacia (Toronto)', '25 jun — Inglaterra vs 4.° (NJ)', '25 jun — Croacia vs Ghana (Toronto)'],
  },
];

const NOTICIAS = [
  {
    fecha: '14 Mar 2025',
    titulo: '¿Azteca, Banorte o Ciudad de México? El estadio tiene tres nombres y son el mismo recinto',
    resumen: 'El histórico estadio se llama hoy oficialmente “Estadio Banorte” por un acuerdo de patrocinio con el banco mexicano. Sin embargo, durante el Mundial 2026 la FIFA lo denominará “Estadio Ciudad de México”, ya que prohíbe nombres comerciales en sus torneos. El apodo popular “Azteca” sigue siendo el más usado. Son el mismo recinto: el único en albergar tres Copas del Mundo (1970, 1986 y 2026).',
    fuente: 'ESPN / FIFA / Billboard',
    tag: 'DATO CLAVE',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  {
    fecha: '11 Jun 2026',
    titulo: 'El “Estadio Ciudad de México” (Banorte/Azteca) abrirá el Mundial con México vs Sudáfrica',
    resumen: 'El partido inaugural del Mundial 2026 se jugará en el estadio que todos conocen como Azteca, hoy llamado Banorte y que durante el torneo llevará el nombre oficial de “Estadio Ciudad de México” por normas FIFA. El recinto reunirá a más de 83,000 aficionados el 11 de junio.',
    fuente: 'FIFA.com',
    tag: 'INAUGURACIÓN',
    color: 'bg-green-100 text-green-800 border-green-200',
  },
  {
    fecha: '15 Abr 2026',
    titulo: 'Irán confirmado en el Mundial tras polémica resolución de la FIFA',
    resumen: 'El presidente de la FIFA Gianni Infantino confirmó la participación de Irán en el Grupo G. La decisión generó controversia internacional pero la FIFA mantuvo su postura.',
    fuente: 'FIFA / Reuters',
    tag: 'POLÉMICA',
    color: 'bg-red-100 text-red-800 border-red-200',
  },
  {
    fecha: '5 Dic 2025',
    titulo: 'Sorteo Final: 48 selecciones divididas en 12 grupos en Washington D.C.',
    resumen: 'En el Centro Kennedy, con presencia de Trump, Sheinbaum y Carney, se realizó el sorteo más esperado. México quedó en el Grupo A junto a Sudáfrica, Corea del Sur y Chequia.',
    fuente: 'FIFA / Televisa',
    tag: 'SORTEO',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    fecha: '4 May 2026',
    titulo: 'Hoteles en CDMX con reservas por debajo de proyecciones: oportunidad para hospedaje alternativo',
    resumen: 'El 80% de los hoteles en ciudades sede reportan reservas por debajo de lo esperado, según encuesta de la industria. La demanda de apartamentos y hospedaje local crece.',
    fuente: 'KPBS / Breaking Travel News',
    tag: 'HOSPEDAJE',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    fecha: '22 Abr 2026',
    titulo: 'A 50 días del Mundial: Cronograma completo de actividades en México',
    resumen: 'TUDN publicó el cronograma oficial de actividades previas al Mundial. La inauguración en el Azteca el 11 de junio marcará el inicio del torneo más grande de la historia.',
    fuente: 'TUDN',
    tag: 'CUENTA REGRESIVA',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    fecha: '8 Abr 2026',
    titulo: 'Ciudad de México, Boston y Vancouver lideran la demanda de hospedaje',
    resumen: 'Breaking Travel News reporta que CDMX tiene uno de los crecimientos más fuertes en demanda de alojamiento para el Mundial. Coyoacán, zona segura y cultural, emerge como destino favorito.',
    fuente: 'Breaking Travel News',
    tag: 'TURISMO',
    color: 'bg-teal-100 text-teal-800 border-teal-200',
  },
];

const SEDES_MEXICO = [
  {
    ciudad: 'Ciudad de México',
    estadio: 'Estadio Ciudad de México',
    estadioNota: '(Banorte / Azteca)',
    capacidad: '83,000',
    partidos: 5,
    inauguracion: true,
    descripcion: 'El único estadio en albergar 3 Copas del Mundo (1970, 1986 y 2026). Conocido popularmente como “Azteca” y hoy llamado “Banorte”, la FIFA lo renombrará “Estadio Ciudad de México” durante el torneo. Sede del partido inaugural el 11 de junio.',
    emoji: '🏟️',
  },
  {
    ciudad: 'Guadalajara',
    estadio: 'Estadio Akron',
    capacidad: '49,850',
    partidos: 4,
    inauguracion: false,
    descripcion: 'Casa de las Chivas. Albergará 4 partidos del Grupo A y K, incluyendo encuentros de México y Portugal.',
    emoji: '⚽',
  },
  {
    ciudad: 'Monterrey',
    estadio: 'Estadio BBVA',
    capacidad: '51,350',
    partidos: 4,
    inauguracion: false,
    descripcion: 'Moderno estadio del norte de México. Sede de partidos del Grupo I con Francia y Colombia.',
    emoji: '🦁',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function HospedajeMundial2026() {
  const [grupoActivo, setGrupoActivo] = useState<string | null>(null);
  const [vistaGrupos, setVistaGrupos] = useState<'album' | 'lista'>('album');

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-body">
      <Helmet>
        <title>Mundial 2026: Grupos, Selecciones y Sedes en México | Diario Coyoacán</title>
        <meta name="description" content="Guía completa del Mundial 2026: los 12 grupos, 48 selecciones clasificadas, sedes en México (Azteca, Guadalajara, Monterrey), noticias más relevantes y cómo hospedarte en Coyoacán a 40 min del Azteca en Metro + Tren Ligero." />
        <meta name="keywords" content="Mundial 2026 grupos, Copa del Mundo 2026 México, selecciones clasificadas Mundial 2026, Estadio Azteca Mundial 2026, hospedaje Mundial 2026 CDMX, Coyoacán Mundial 2026, donde ver Mundial 2026 Ciudad de México" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://diario.superanfitrion.com.mx/mundial-2026" />
        <meta property="og:title" content="Mundial 2026: Álbum completo de las 48 selecciones | Diario Coyoacán" />
        <meta property="og:description" content="Los 12 grupos, 48 selecciones, sedes en México y cómo hospedarte en Coyoacán para vivir el Mundial desde adentro." />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mundial 2026: Álbum completo de las 48 selecciones | Diario Coyoacán" />
        <link rel="canonical" href="https://diario.superanfitrion.com.mx/mundial-2026" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          "name": "Copa Mundial de la FIFA 2026",
          "startDate": "2026-06-11",
          "location": [
            { "@type": "Place", "name": "Estadio Azteca", "address": { "@type": "PostalAddress", "addressLocality": "Ciudad de México", "addressCountry": "MX" } },
            { "@type": "Place", "name": "Estadio Akron", "address": { "@type": "PostalAddress", "addressLocality": "Guadalajara", "addressCountry": "MX" } },
            { "@type": "Place", "name": "Estadio BBVA", "address": { "@type": "PostalAddress", "addressLocality": "Monterrey", "addressCountry": "MX" } },
          ],
          "organizer": { "@type": "Organization", "name": "FIFA", "url": "https://www.fifa.com" },
          "url": "https://diario.superanfitrion.com.mx/mundial-2026"
        })}</script>
      </Helmet>

      {/* ── Ticker ── */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] py-1.5 overflow-hidden border-b-2 border-amber-600">
        <div className="animate-marquee whitespace-nowrap inline-block text-xs font-mono tracking-widest uppercase">
          ⚽ MUNDIAL 2026 — 11 JUN: MÉXICO VS SUDÁFRICA EN EL AZTECA (INAUGURACIÓN)  •  48 SELECCIONES · 104 PARTIDOS · 3 PAÍSES SEDE  •  MESSI Y RONALDO EN SU POSIBLE ÚLTIMO MUNDIAL  •  COYOACÁN A ~40 MIN DEL AZTECA: METRO L2 TASQUEÑA + TREN LIGERO  •  RESERVA TU HOSPEDAJE EN SUPERANFITRION.COM.MX  •  ⚽ MUNDIAL 2026 — 11 JUN: MÉXICO VS SUDÁFRICA EN EL AZTECA (INAUGURACIÓN)  • 
        </div>
      </div>

      {/* ── Header ── */}
      <header className="bg-[#FAFAF8] border-b border-[#1A1A1A]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <span className="font-headline text-2xl text-[#1A1A1A] cursor-pointer hover:text-amber-700 transition-colors">
              Diario Coyoacán
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-subhead uppercase tracking-wider">
            <Link href="/"><span className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors cursor-pointer flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Portada</span></Link>
            <Link href="/noticias"><span className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors cursor-pointer flex items-center gap-1"><Newspaper className="w-3.5 h-3.5" /> Noticias</span></Link>
            <Link href="/hemeroteca"><span className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors cursor-pointer">Hemeroteca</span></Link>
            <span className="text-amber-700 font-bold border-b-2 border-amber-600 pb-0.5 flex items-center gap-1"><Trophy className="w-3.5 h-3.5" /> Mundial 2026</span>
          </nav>
          <a
            href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-600 text-white text-sm font-subhead uppercase tracking-wider hover:bg-amber-700 transition-colors rounded-sm shadow-sm"
          >
            Reservar
          </a>
        </div>
      </header>

      {/* ── Sub-header ── */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-400" /> 11 Jun – Jul 2026</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3 text-amber-400" /> 48 selecciones</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-400" /> 3 países sede</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Zap className="w-3 h-3" />
            <span>Cuenta regresiva: {Math.max(0, Math.ceil((new Date('2026-06-11').getTime() - Date.now()) / 86400000))} días para la inauguración</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#1A1A1A] via-[#2D1B00] to-[#1A1A1A] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/40 text-amber-400 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6">
            <Trophy className="w-3.5 h-3.5" /> Edición Especial Mundial 2026
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
            Copa Mundial de la FIFA
            <span className="block text-amber-400">2026™</span>
          </h1>
          <p className="text-[#F5F0E8]/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-body">
            El torneo más grande de la historia del fútbol. 48 selecciones, 104 partidos, 3 países sede. México abre el Mundial el 11 de junio en el Estadio Azteca.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#grupos" className="px-6 py-3 bg-amber-600 text-white font-subhead uppercase tracking-wider hover:bg-amber-500 transition-colors rounded-sm text-sm">
              Ver Álbum de Grupos
            </a>
            <a href="#sedes-mexico" className="px-6 py-3 border border-white/30 text-white font-subhead uppercase tracking-wider hover:bg-white/10 transition-colors rounded-sm text-sm">
              Sedes en México
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        {/* ── Left Column ── */}
        <div className="space-y-12">

          {/* ── Noticias Destacadas ── */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b-2 border-[#1A1A1A] pb-3">
              <Newspaper className="w-5 h-5 text-amber-600" />
              <h2 className="font-subhead text-lg uppercase tracking-widest text-[#1A1A1A]">Noticias Más Relevantes</h2>
            </div>
            <div className="space-y-4">
              {NOTICIAS.map((n, i) => (
                <article key={i} className="border border-[#1A1A1A]/15 bg-white p-4 hover:border-amber-400 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center font-headline text-lg rounded-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-mono px-2 py-0.5 border rounded-full ${n.color}`}>{n.tag}</span>
                        <span className="text-xs text-[#1A1A1A]/50 font-mono">{n.fecha}</span>
                        <span className="text-xs text-[#1A1A1A]/40 font-mono">— {n.fuente}</span>
                      </div>
                      <h3 className="font-headline text-base md:text-lg text-[#1A1A1A] leading-snug mb-1 group-hover:text-amber-700 transition-colors">
                        {n.titulo}
                      </h3>
                      <p className="text-sm text-[#1A1A1A]/65 leading-relaxed">{n.resumen}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── Sedes en México ── */}
          <section id="sedes-mexico">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-[#1A1A1A] pb-3">
              <MapPin className="w-5 h-5 text-amber-600" />
              <h2 className="font-subhead text-lg uppercase tracking-widest text-[#1A1A1A]">Sedes en México</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SEDES_MEXICO.map((s) => (
                <div key={s.ciudad} className={`border-2 p-5 relative ${s.inauguracion ? 'border-amber-500 bg-amber-50' : 'border-[#1A1A1A]/20 bg-white'}`}>
                  {s.inauguracion && (
                    <div className="absolute -top-3 left-4 bg-amber-600 text-white text-xs font-mono px-3 py-0.5 uppercase tracking-widest">
                      ★ Inauguración
                    </div>
                  )}
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <h3 className="font-headline text-xl text-[#1A1A1A] mb-1">{s.ciudad}</h3>
                  <p className="text-xs font-mono text-[#1A1A1A]/60 uppercase mb-1">{s.estadio}</p>
                  {'estadioNota' in s && s.estadioNota && (
                    <p className="text-xs text-[#1A1A1A]/50 italic mb-3">También conocido como: {(s as any).estadioNota}</p>
                  )}
                  <div className="flex gap-4 text-xs font-mono text-[#1A1A1A]/70 mb-3">
                    <span>👥 {s.capacidad}</span>
                    <span>⚽ {s.partidos} partidos</span>
                  </div>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{s.descripcion}</p>
                </div>
              ))}
            </div>
            {/* CTA Hospedaje */}
            <div className="mt-6 bg-[#1A1A1A] text-white p-6 border-l-4 border-amber-500">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="font-subhead uppercase tracking-widest text-amber-400 text-xs mb-1">Para aficionados del Mundial</p>
                  <h3 className="font-headline text-xl mb-1">Coyoacán está a ~40 minutos del Estadio Ciudad de México</h3>
                  <p className="text-[#F5F0E8]/70 text-sm">El estadio que el mundo conoce como “Azteca” (hoy Banorte, nombre FIFA: Ciudad de México). Metro Línea 2 hasta Tasqueña + Tren Ligero directo. Los DEA enfrente. Sin comisiones de Airbnb.</p>
                </div>
                <a
                  href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-6 py-3 bg-amber-600 text-white font-subhead uppercase tracking-wider hover:bg-amber-500 transition-colors text-sm whitespace-nowrap"
                >
                  Ver Disponibilidad →
                </a>
              </div>
            </div>
          </section>

          {/* ── Álbum de Grupos ── */}
          <section id="grupos">
            <div className="flex items-center justify-between mb-6 border-b-2 border-[#1A1A1A] pb-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-600" />
                <h2 className="font-subhead text-lg uppercase tracking-widest text-[#1A1A1A]">Álbum de Grupos — 48 Selecciones</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setVistaGrupos('album')}
                  className={`px-3 py-1 text-xs font-mono uppercase ${vistaGrupos === 'album' ? 'bg-[#1A1A1A] text-white' : 'border border-[#1A1A1A]/30 text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/5'}`}
                >
                  Álbum
                </button>
                <button
                  onClick={() => setVistaGrupos('lista')}
                  className={`px-3 py-1 text-xs font-mono uppercase ${vistaGrupos === 'lista' ? 'bg-[#1A1A1A] text-white' : 'border border-[#1A1A1A]/30 text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/5'}`}
                >
                  Lista
                </button>
              </div>
            </div>

            {vistaGrupos === 'album' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GRUPOS.map((grupo) => (
                  <div
                    key={grupo.id}
                    className={`border-2 overflow-hidden cursor-pointer transition-all ${
                      grupo.highlight
                        ? 'border-amber-500 shadow-lg shadow-amber-100'
                        : grupoActivo === grupo.id
                        ? 'border-[#1A1A1A] shadow-md'
                        : 'border-[#1A1A1A]/20 hover:border-[#1A1A1A]/60'
                    }`}
                    onClick={() => setGrupoActivo(grupoActivo === grupo.id ? null : grupo.id)}
                  >
                    {/* Grupo Header */}
                    <div className={`bg-gradient-to-r ${grupo.color} text-white px-4 py-3 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <span className="font-headline text-3xl leading-none">G</span>
                        <div>
                          <div className="font-headline text-2xl leading-none">{grupo.id}</div>
                          <div className="text-xs font-mono opacity-70 uppercase">{grupo.sede}</div>
                        </div>
                      </div>
                      {grupo.highlight && (
                        <span className="bg-amber-400 text-[#1A1A1A] text-xs font-mono px-2 py-0.5 uppercase tracking-wider">
                          ★ Sede México
                        </span>
                      )}
                    </div>

                    {/* Equipos — Tarjetas Panini */}
                    <div className="bg-white p-3 grid grid-cols-2 gap-2">
                      {grupo.equipos.map((eq, i) => (
                        <div
                          key={i}
                          className={`p-3 border rounded-sm ${i === 0 ? 'border-amber-300 bg-amber-50' : 'border-[#1A1A1A]/10 bg-[#FAFAF8]'}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{eq.bandera}</span>
                            <div className="min-w-0">
                              <div className="font-subhead text-xs uppercase font-bold text-[#1A1A1A] truncate">{eq.pais}</div>
                              <div className="text-[10px] font-mono text-[#1A1A1A]/50">{eq.conf}</div>
                            </div>
                          </div>
                          <div className="text-[10px] font-mono text-amber-700 truncate">⭐ {eq.estrella}</div>
                          <div className="text-[10px] text-[#1A1A1A]/55 leading-tight mt-0.5">{eq.nota}</div>
                        </div>
                      ))}
                    </div>

                    {/* Partidos expandibles */}
                    {grupoActivo === grupo.id && (
                      <div className="border-t border-[#1A1A1A]/10 bg-[#F5F0E8] p-3">
                        <p className="text-xs font-mono uppercase text-[#1A1A1A]/50 mb-2 tracking-wider">Calendario del Grupo {grupo.id}</p>
                        <ul className="space-y-1">
                          {grupo.partidos.map((p, i) => (
                            <li key={i} className="text-xs font-mono text-[#1A1A1A]/70 flex items-start gap-1.5">
                              <ChevronRight className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-[#1A1A1A]/5 px-4 py-2 text-center">
                      <span className="text-xs font-mono text-[#1A1A1A]/50">
                        {grupoActivo === grupo.id ? '▲ Ocultar partidos' : '▼ Ver calendario del grupo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Vista Lista */
              <div className="space-y-4">
                {GRUPOS.map((grupo) => (
                  <div key={grupo.id} className="border border-[#1A1A1A]/15 bg-white overflow-hidden">
                    <div className={`bg-gradient-to-r ${grupo.color} text-white px-4 py-2 flex items-center gap-3`}>
                      <span className="font-headline text-xl">Grupo {grupo.id}</span>
                      <span className="text-xs font-mono opacity-70">{grupo.sede}</span>
                      {grupo.highlight && <span className="ml-auto bg-amber-400 text-[#1A1A1A] text-xs font-mono px-2 py-0.5">★ México</span>}
                    </div>
                    <div className="divide-y divide-[#1A1A1A]/8">
                      {grupo.equipos.map((eq, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                          <span className="text-xl w-8">{eq.bandera}</span>
                          <span className="font-subhead text-sm uppercase font-bold text-[#1A1A1A] w-32">{eq.pais}</span>
                          <span className="text-xs font-mono text-[#1A1A1A]/50 w-20">{eq.conf}</span>
                          <span className="text-xs text-amber-700 flex-1">⭐ {eq.estrella}</span>
                          <span className="text-xs text-[#1A1A1A]/50 hidden md:block max-w-xs">{eq.nota}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Atractivos Turísticos cerca del Azteca ── */}
          <section id="atractivos">
            <div className="flex items-center justify-between mb-6 border-b-2 border-[#1A1A1A] pb-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h2 className="font-subhead text-lg uppercase tracking-widest text-[#1A1A1A]">Guía Secreta: Qué Hacer cerca del Estadio</h2>
              </div>
              <span className="text-xs font-mono text-[#1A1A1A]/50 hidden md:block">Zona Azteca · Coyoacán · Tlalpan</span>
            </div>

            {/* Intro editorial */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                El Estadio Ciudad de México (Banorte/Azteca) está rodeado de una zona que la mayoría de los turistas no conoce. Aquí no encontrarás los lugares de siempre: esta es la guía que los locales del sur de la CDMX guardan para ellos mismos.
              </p>
            </div>

            {/* Grid de atractivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  emoji: '🟺',
                  categoria: 'Arqueología',
                  nombre: 'Zona Arqueológica Cuicuilco',
                  descripcion: 'El sitio arqueológico más antiguo de la CDMX (800 a.C.), con una pirámide circular única en Mesoamérica. Rodeada de lava del volcán Xitle. La mayoría de los aficionados del mundo nunca la verán en ningún otro Mundial.',
                  distancia: '15 min en Tren Ligero',
                  horario: 'Mar-Dom 9:00-17:00',
                  precio: 'Entrada libre',
                  fuente: 'INAH',
                  color: 'border-amber-400',
                  tagColor: 'bg-amber-100 text-amber-800',
                },
                {
                  emoji: '⏰',
                  categoria: 'Cultura Local',
                  nombre: 'Museo del Tiempo Tlalpan',
                  descripcion: 'Instalado en un convento del siglo XVI en el centro histórico de Tlalpan. Relojes y mecanismos de medición del tiempo de todas las épocas. Un lugar que los propios capitalinos desconocen, a 10 minutos del estadio.',
                  distancia: '10 min en taxi',
                  horario: 'Mar-Dom 10:00-18:00',
                  precio: 'Entrada libre',
                  fuente: 'TripAdvisor (492 reseñas)',
                  color: 'border-blue-400',
                  tagColor: 'bg-blue-100 text-blue-800',
                },
                {
                  emoji: '🌮',
                  categoria: 'Gastronomía Local',
                  nombre: 'Tortas El Monje Loco',
                  descripcion: 'Casi 90 años de historia. Las tortas más famosas del sur de la CDMX. Jamón, carnitas, lomo adobado, pollo y queso. El lugar donde va el vecino, no el guía turístico. Imperdible antes o después del partido.',
                  distancia: '5 min a pie del estadio',
                  horario: 'Lun-Sáb 9:00-20:30 · Dom 10:00-19:00',
                  precio: 'Desde $50 MXN',
                  fuente: 'CDMX Secreta',
                  color: 'border-orange-400',
                  tagColor: 'bg-orange-100 text-orange-800',
                },
                {
                  emoji: '🍺',
                  categoria: 'Ocio Nocturno',
                  nombre: 'Terraza Victoria',
                  descripcion: 'Cocteles de autor, aguachile de rib eye y costilla BBQ con vista a la zona. El lugar donde los locales celebran (o lloran) los resultados. Abre hasta la 1 AM los jueves-sábado. Perfecto para la noche del partido.',
                  distancia: '8 min en taxi',
                  horario: 'Dom-Mar 9:00-23:00 · Jue-Sáb hasta 1:00 AM',
                  precio: 'Cocteles desde $120 MXN',
                  fuente: 'CDMX Secreta',
                  color: 'border-purple-400',
                  tagColor: 'bg-purple-100 text-purple-800',
                },
                {
                  emoji: '🌿',
                  categoria: 'Naturaleza Urbana',
                  nombre: 'Parque Ecológico Huayamilpas',
                  descripcion: 'El pulmón verde de Coyoacán. Lagos artificiales, zona de meditación, huertos comunitarios y senderos entre árboles centenarios. Desconocido para el turismo masivo. Ideal para recuperarse entre partido y partido.',
                  distancia: '20 min en metro desde el Azteca',
                  horario: 'Todos los días 6:00-18:00',
                  precio: 'Entrada libre',
                  fuente: 'Alcaldía Coyoacán',
                  color: 'border-green-400',
                  tagColor: 'bg-green-100 text-green-800',
                },
                {
                  emoji: '🎳',
                  categoria: 'Diversión',
                  nombre: 'Bol Tlalpan',
                  descripcion: 'Boliche con mesa de billar a 5 minutos del estadio. Abre hasta las 23:45 todos los días. El plan perfecto para grupos que quieren seguir la fiesta después del partido sin gastar una fortuna.',
                  distancia: '5 min en taxi',
                  horario: 'Lun-Dom 9:00-23:45',
                  precio: 'Desde $80 MXN por juego',
                  fuente: 'CDMX Secreta',
                  color: 'border-red-400',
                  tagColor: 'bg-red-100 text-red-800',
                },
                {
                  emoji: '🍽️',
                  categoria: 'Mercado Local',
                  nombre: 'Mercado de Comidas Huipulco',
                  descripcion: 'Comida corrida, tacos, birria, gorditas y pozole. El mercado donde come el sur de la CDMX. Sin precios de turista, sin menú en inglés, sin Instagram. Solo comida real y buena.',
                  distancia: '10 min en taxi',
                  horario: 'Lun-Sáb 6:00-22:00 · Dom 6:00-20:00',
                  precio: 'Comida corrida desde $80 MXN',
                  fuente: 'CDMX Secreta',
                  color: 'border-yellow-400',
                  tagColor: 'bg-yellow-100 text-yellow-800',
                },
                {
                  emoji: '🏛️',
                  categoria: 'Historia',
                  nombre: 'Centro Histórico de Tlalpan',
                  descripcion: 'Pueblo Mágico a 10 minutos del estadio. Plaza colonial del siglo XVI, mercado de artesanías, pulquerías centenarias y la Parroquia de San Agustín. El lugar donde la CDMX todavía se parece a lo que era.',
                  distancia: '10 min en taxi',
                  horario: 'Siempre abierto (plaza pública)',
                  precio: 'Entrada libre',
                  fuente: 'Secretaría de Turismo CDMX',
                  color: 'border-stone-400',
                  tagColor: 'bg-stone-100 text-stone-800',
                },
              ].map((lugar, i) => (
                <div key={i} className={`bg-white border border-[#1A1A1A]/15 border-l-4 ${lugar.color} p-5 hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{lugar.emoji}</span>
                    <span className={`text-[10px] font-subhead uppercase tracking-wider px-2 py-0.5 rounded-sm ${lugar.tagColor}`}>{lugar.categoria}</span>
                  </div>
                  <h3 className="font-headline text-lg text-[#1A1A1A] mb-2">{lugar.nombre}</h3>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed mb-3">{lugar.descripcion}</p>
                  <div className="space-y-1 text-xs font-mono text-[#1A1A1A]/60 border-t border-[#1A1A1A]/10 pt-3">
                    <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-amber-600" /> {lugar.distancia}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-amber-600" /> {lugar.horario}</div>
                    <div className="flex items-center gap-1.5"><span className="text-amber-600 font-bold">$</span> {lugar.precio}</div>
                    <div className="text-[#1A1A1A]/40 mt-1">Fuente: {lugar.fuente}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Coyoacán como base */}
            <div className="bg-[#1A1A1A] text-white p-6 border-l-4 border-amber-500">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="font-subhead uppercase tracking-widest text-amber-400 text-xs mb-1">La base perfecta para explorar todo esto</p>
                  <h3 className="font-headline text-xl mb-1">Coyoacán: a 40 min del Azteca, a pasos de todo lo demás</h3>
                  <p className="text-[#F5F0E8]/70 text-sm">Desde Coyoacán llegas al Azteca en Tren Ligero, a Cuicuilco en 15 minutos, a Tlalpan en taxi, y al Centro Histórico en metro. La base logística perfecta para el Mundial 2026.</p>
                </div>
                <a
                  href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-6 py-3 bg-amber-600 text-white font-subhead uppercase tracking-wider hover:bg-amber-500 transition-colors text-sm whitespace-nowrap"
                >
                  Ver Disponibilidad →
                </a>
              </div>
            </div>
          </section>

          {/* ── Bloque SEO Final ── */}
          <section className="bg-white border border-[#1A1A1A]/15 p-6">
            <h2 className="font-headline text-2xl text-[#1A1A1A] mb-3">Hospédate en Coyoacán para el Mundial 2026</h2>
            <p className="text-[#1A1A1A]/70 leading-relaxed mb-4">
              Si vas a vivir el Mundial 2026 desde la Ciudad de México, Coyoacán es tu base ideal. A ~40 minutos del Estadio Azteca: Metro Línea 2 hasta Tasqueña, luego Tren Ligero directo al Azteca. Los Deportivos Azteca (DEA) justo enfrente. El barrio más cultural y seguro de la CDMX. SúperAnfitrión tiene 7 propiedades verificadas con reserva directa, sin comisiones de plataformas externas, con precios competitivos y atención personalizada.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 text-center">
              {[
                { icon: '🏟️', label: '~40 min al Azteca', sub: 'Metro L2 + Tren Ligero' },
                { icon: '🏠', label: '7 propiedades', sub: 'Verificadas' },
                { icon: '⭐', label: 'Calificación 4.97', sub: '186 reseñas' },
                { icon: '💳', label: 'Sin comisiones', sub: 'Reserva directa' },
              ].map((item, i) => (
                <div key={i} className="bg-[#FAFAF8] border border-[#1A1A1A]/10 p-3 rounded-sm">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs font-subhead uppercase font-bold text-[#1A1A1A]">{item.label}</div>
                  <div className="text-[10px] font-mono text-[#1A1A1A]/50">{item.sub}</div>
                </div>
              ))}
            </div>
            <a
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-subhead uppercase tracking-wider hover:bg-amber-700 transition-colors text-sm"
            >
              Ver disponibilidad para el Mundial <ExternalLink className="w-4 h-4" />
            </a>
          </section>

        </div>

        {/* ── Right Sidebar ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            {/* Cuenta regresiva */}
            <div className="bg-[#1A1A1A] text-white p-5 border-l-4 border-amber-500">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-subhead text-xs uppercase tracking-widest text-amber-400">Cuenta Regresiva</span>
              </div>
              <div className="text-center">
                <div className="font-headline text-5xl text-amber-400">
                  {Math.max(0, Math.ceil((new Date('2026-06-11').getTime() - Date.now()) / 86400000))}
                </div>
                <div className="text-xs font-mono text-white/60 uppercase tracking-wider">días para la inauguración</div>
              </div>
              <div className="mt-3 text-center text-xs font-mono text-white/50">
                11 Jun 2026 · México vs Sudáfrica<br />Estadio Azteca · CDMX
              </div>
            </div>

            {/* Partidos en CDMX */}
            <div className="bg-white border border-[#1A1A1A]/15 p-4">
              <div className="flex items-center gap-2 mb-3 border-b border-[#1A1A1A]/10 pb-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span className="font-subhead text-xs uppercase tracking-widest text-[#1A1A1A]">Partidos en el Azteca</span>
              </div>
              <ul className="space-y-2 text-xs font-mono">
                {[
                  { fecha: '11 Jun', partido: 'México vs Sudáfrica', nota: '★ INAUGURACIÓN' },
                  { fecha: '17 Jun', partido: 'Colombia vs Uzbekistán', nota: 'Grupo I' },
                  { fecha: '19 Jun', partido: 'México vs Corea del Sur', nota: 'Grupo A' },
                  { fecha: '23 Jun', partido: 'México vs Chequia', nota: 'Grupo A' },
                  { fecha: 'Jul', partido: 'Ronda de 32', nota: 'Por definir' },
                ].map((p, i) => (
                  <li key={i} className={`flex items-start gap-2 py-1.5 ${i < 4 ? 'border-b border-[#1A1A1A]/8' : ''}`}>
                    <span className="text-amber-600 font-bold w-12 flex-shrink-0">{p.fecha}</span>
                    <div>
                      <div className="text-[#1A1A1A] font-medium">{p.partido}</div>
                      <div className="text-[#1A1A1A]/50 text-[10px]">{p.nota}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar de reservas */}
            <ReservaSidebar />
          </div>
        </aside>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#1A1A1A] text-[#F5F0E8] mt-12 py-12 border-t-4 border-amber-600">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline text-2xl mb-2">Diario Coyoacán</h3>
            <p className="text-xs font-mono text-[#F5F0E8]/50 uppercase tracking-widest mb-3">Periodismo local · Cultura · Gastronomía</p>
            <p className="text-sm text-[#F5F0E8]/60 leading-relaxed">Cobertura editorial independiente de Coyoacán y la Ciudad de México.</p>
          </div>
          <div>
            <h4 className="font-subhead text-xs uppercase tracking-widest text-[#F5F0E8]/50 mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"><span className="text-[#F5F0E8]/70 hover:text-amber-400 transition-colors cursor-pointer">Portada</span></Link></li>
              <li><Link href="/noticias"><span className="text-[#F5F0E8]/70 hover:text-amber-400 transition-colors cursor-pointer">Noticias</span></Link></li>
              <li><Link href="/hemeroteca"><span className="text-[#F5F0E8]/70 hover:text-amber-400 transition-colors cursor-pointer">Hemeroteca</span></Link></li>
              <li><span className="text-amber-400">Mundial 2026</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-subhead text-xs uppercase tracking-widest text-[#F5F0E8]/50 mb-3">Hospedaje</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://superanfitrion.com.mx" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/70 hover:text-amber-400 transition-colors">SúperAnfitrión</a></li>
              <li><a href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/70 hover:text-amber-400 transition-colors">Reservar ahora</a></li>
              <li><a href="https://superanfitrion.com/aviso-cdmx" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/70 hover:text-amber-400 transition-colors">Aviso CDMX</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-subhead text-xs uppercase tracking-widest text-[#F5F0E8]/50 mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-[#F5F0E8]/70">
              <li>📱 <a href="https://wa.me/525511427252" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">WhatsApp: 55 1142 7252</a></li>
              <li>✉️ <a href="mailto:superanfitrioncoyoacan@gmail.com" className="hover:text-amber-400 transition-colors">superanfitrioncoyoacan@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-[#F5F0E8]/10 text-center">
          <p className="text-xs font-mono text-[#F5F0E8]/30">© 2026 Diario Coyoacán. Todos los derechos reservados.</p>
        </div>
      </footer>

      <MobileCTA />
    </div>
  );
}
