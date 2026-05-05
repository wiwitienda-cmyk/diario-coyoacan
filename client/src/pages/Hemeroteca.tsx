import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import ReservaSidebarShared, { LODGIFY_URL, MobileCTA } from '@/components/ReservaSidebar';
import {
  Home, Search, Facebook, Instagram, Youtube, Mail, Phone,
  Calendar, ChevronRight, BookOpen, Clock,
} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  'Todas', 'Cultura', 'Gastronomía', 'Historia', 'Turismo',
  'Deportes', 'Crónica Cultural', 'Guía', 'Noticias',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function estimateReadTime(text: string): number {
  const words = text?.split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

function formatDateEs(dateStr: string): string {
  if (!dateStr) return '';
  // Already formatted in Spanish (e.g. "1 de mayo de 2026")
  if (/de\s+\w+\s+de\s+\d{4}/.test(dateStr)) return dateStr;
  // ISO format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const d = new Date(dateStr + 'T12:00:00');
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }
  return dateStr;
}

// ─── Sidebar alias ───────────────────────────────────────────────────────────
const ReservaSidebar = () => <ReservaSidebarShared stickyTop="top-24" />;

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Hemeroteca() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [visibleCount, setVisibleCount] = useState(12);

  // Fetch both article types
  const { data: legacyArticles, isLoading: isLoadingLegacy } = trpc.articles.list.useQuery();
  const { data: newsArticles, isLoading: isLoadingNews } = trpc.newsArticles.list.useQuery();

  const isLoading = isLoadingLegacy || isLoadingNews;

  // Combine and normalize all articles
  const allArticles = useMemo(() => {
    const legacy = (legacyArticles || []).map((a: any) => ({
      id: `legacy-${a.id}`,
      title: a.headlineEs || a.title,
      summary: a.summaryEs || a.summary,
      category: a.categoryEs || a.category || 'Cultura',
      heroImage: a.heroImage,
      slug: a.slug,
      date: a.dateISO || a.date,
      readTime: estimateReadTime(a.bodyEs || a.body || ''),
      url: `/diario?slug=${a.slug}`,
      isNews: false,
    }));

    const news = (newsArticles || []).map((n: any) => ({
      id: `news-${n.id}`,
      title: n.title,
      summary: n.summary,
      category: n.category || 'Noticias',
      heroImage: n.heroImage,
      slug: n.slug,
      date: n.date,
      readTime: estimateReadTime(n.body || n.content || ''),
      url: `/noticias/${n.slug}`,
      isNews: true,
    }));

    // Sort by date descending (newest first)
    return [...news, ...legacy].sort((a, b) => {
      const dateA = new Date(a.date?.match(/\d{4}/) ? a.date : '2026-01-01').getTime();
      const dateB = new Date(b.date?.match(/\d{4}/) ? b.date : '2026-01-01').getTime();
      return dateB - dateA;
    });
  }, [legacyArticles, newsArticles]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Todas' ||
        article.category?.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        !searchQuery ||
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const todayFormatted = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'America/Mexico_City',
  });

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-amber-800 mx-auto mb-4" />
          <p className="text-sm text-gray-500 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            Cargando Hemeroteca...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Hemeroteca | Diario Coyoacán — Archivo de Noticias Coyoacán CDMX</title>
        <meta
          name="description"
          content="Hemeroteca completa del Diario Coyoacán: archivo de noticias locales, cultura, gastronomía e historia de Coyoacán, Ciudad de México. Hospédate con SúperAnfitrión."
        />
        <meta
          name="keywords"
          content="hemeroteca Coyoacán, archivo noticias Coyoacán, Diario Coyoacán, ediciones anteriores, periodismo local CDMX, qué hacer Coyoacán, hospedaje Coyoacán"
        />
        <meta name="author" content="Diario Coyoacán" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diario.superanfitrion.com.mx/hemeroteca" />
        <meta property="og:title" content="Hemeroteca | Diario Coyoacán — Archivo de Noticias" />
        <meta
          property="og:description"
          content="Archivo completo de noticias, cultura, gastronomía e historia de Coyoacán, Ciudad de México."
        />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hemeroteca | Diario Coyoacán" />
        <meta
          name="twitter:description"
          content="Archivo completo de noticias, cultura, gastronomía e historia de Coyoacán, Ciudad de México."
        />
        <link rel="canonical" href="https://diario.superanfitrion.com.mx/hemeroteca" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Hemeroteca — Diario Coyoacán',
            description: 'Archivo completo de noticias y artículos del Diario Coyoacán.',
            url: 'https://diario.superanfitrion.com.mx/hemeroteca',
            publisher: {
              '@type': 'NewsMediaOrganization',
              name: 'Diario Coyoacán',
              url: 'https://diario.superanfitrion.com.mx',
            },
            inLanguage: 'es-MX',
          })}
        </script>
      </Helmet>

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <h1
                  className="text-2xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Diario Coyoacán
                </h1>
              </div>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/"
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                <Home className="w-4 h-4" />
                Portada
              </Link>
              <Link
                href="/noticias"
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Noticias
              </Link>
              <Link
                href="/hemeroteca"
                className="px-3 py-2 text-sm font-semibold text-amber-800 bg-amber-50 rounded-lg transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                Hemeroteca
              </Link>
              <Link
                href="/hospedaje-mundial-2026"
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors hidden md:inline-flex"
              >
                Mundial 2026
              </Link>
              <a
                href={LODGIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-800 text-white text-sm font-medium rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
              >
                Reservar
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Sub-header ───────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 capitalize">{todayFormatted}</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span className="text-amber-700 font-medium">Hemeroteca</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>{allArticles.length} artículos en el archivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Breadcrumbs ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-amber-800 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-900 font-medium">Hemeroteca</span>
        </nav>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-10">

          {/* ── Content Column ────────────────────────────────────── */}
          <main className="flex-1 min-w-0">

            {/* Section header */}
            <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-gray-900">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Hemeroteca</span>
              <span className="text-xs text-gray-400">— Archivo completo</span>
            </div>

            {/* Search & Filters */}
            <div className="mb-8 space-y-4">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar en el archivo..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(12); }}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 bg-gray-50 transition-colors"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setVisibleCount(12); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      selectedCategory === cat
                        ? 'bg-amber-800 text-white border-amber-800'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-amber-800 hover:text-amber-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Results count */}
              {(searchQuery || selectedCategory !== 'Todas') && (
                <p className="text-xs text-gray-500">
                  {filteredArticles.length} resultado{filteredArticles.length !== 1 ? 's' : ''} encontrado{filteredArticles.length !== 1 ? 's' : ''}
                  {searchQuery && <span> para "<strong>{searchQuery}</strong>"</span>}
                  {selectedCategory !== 'Todas' && <span> en <strong>{selectedCategory}</strong></span>}
                </p>
              )}
            </div>

            {/* Articles Grid */}
            {visibleArticles.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No se encontraron artículos con esos criterios.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}
                  className="mt-4 text-amber-800 text-sm hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {visibleArticles.map((article) => (
                    <Link key={article.id} href={article.url}>
                      <article className="group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-amber-200 hover:shadow-md transition-all duration-300">
                        {/* Image */}
                        {article.heroImage && (
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={article.heroImage}
                              alt={article.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="inline-block bg-amber-800 text-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md shadow">
                                {article.category}
                              </span>
                            </div>
                            {article.isNews && (
                              <div className="absolute top-3 right-3">
                                <span className="inline-block bg-gray-900 text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md shadow">
                                  Noticia
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDateEs(article.date)}
                            </span>
                            {article.readTime > 0 && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.readTime} min
                              </span>
                            )}
                          </div>

                          <h3
                            className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors leading-snug"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {article.title}
                          </h3>

                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
                            {article.summary}
                          </p>

                          <div className="flex items-center gap-1 text-xs font-semibold text-amber-800 group-hover:gap-2 transition-all">
                            <span>Leer artículo</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + 12)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-amber-800 text-amber-800 text-sm font-semibold rounded-xl hover:bg-amber-800 hover:text-white transition-colors shadow-sm"
                    >
                      Cargar más artículos
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-400 mt-2">
                      Mostrando {visibleArticles.length} de {filteredArticles.length} artículos
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Mobile CTA */}
            <MobileCTA />

            {/* SEO content block */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h2
                className="text-lg font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sobre el Diario Coyoacán
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                El <strong>Diario Coyoacán</strong> es el archivo periodístico de referencia sobre la vida cultural, gastronómica e histórica del barrio más emblemático de la Ciudad de México. Cubrimos eventos, crónicas y reportajes que documentan el pulso cotidiano de Coyoacán.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Si visitas Coyoacán, <a href={LODGIFY_URL} target="_blank" rel="noopener noreferrer" className="text-amber-800 font-semibold hover:underline">hospédate con SúperAnfitrión</a> — departamentos completos a pasos del Jardín Centenario, sin comisiones de Airbnb.
              </p>
            </div>
          </main>

          {/* ── Sidebar ───────────────────────────────────────────── */}
          <aside className="hidden lg:block w-[340px] flex-shrink-0">
            <ReservaSidebar />
          </aside>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Diario Coyoacán
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Periodismo local, cultura y gastronomía desde el corazón de Coyoacán, Ciudad de México.
              </p>
            </div>

            {/* Navegación */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">Navegación</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-sm text-gray-300 hover:text-white transition-colors">Portada</Link>
                <Link href="/noticias" className="block text-sm text-gray-300 hover:text-white transition-colors">Noticias</Link>
                <Link href="/hemeroteca" className="block text-sm text-gray-300 hover:text-white transition-colors">Hemeroteca</Link>
                <Link href="/hospedaje-mundial-2026" className="block text-sm text-gray-300 hover:text-white transition-colors">Mundial 2026</Link>
              </div>
            </div>

            {/* Hospedaje */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">Hospedaje</h4>
              <div className="space-y-2">
                <a href="https://superanfitrion.com.mx" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">SúperAnfitrión</a>
                <a href="https://superanfitrion.com.mx/alojamientos" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">Alojamientos</a>
                <a href="https://superanfitrion.com.mx/estudiantes" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">Para Estudiantes</a>
                <a href="https://superanfitrion.com.mx/nomadas" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">Nómadas Digitales</a>
                <a href="https://superanfitrion.com.mx/mundial-2026" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-white transition-colors">Mundial 2026</a>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">Contacto</h4>
              <div className="space-y-2">
                <a
                  href="https://wa.me/5215511427252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> 55 1142 7252
                </a>
                <a
                  href="mailto:superanfitrioncoyoacan@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> superanfitrioncoyoacan@gmail.com
                </a>
              </div>
              <div className="flex gap-3 mt-4">
                {[
                  { href: 'https://www.facebook.com/SuperAnfitrionCoyoacan', label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
                  { href: 'https://www.instagram.com/superanfitrioncoyo/', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
                  { href: 'https://www.youtube.com/@SuperAnfitrioncoyo', label: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:bg-amber-800 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Diario Coyoacán — Publicado por{' '}
              <a href="https://superanfitrion.com.mx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline">
                SúperAnfitrión Coyoacán
              </a>
              {' · '}
              <a href="https://diario.superanfitrion.com.mx" className="text-gray-400 hover:text-white transition-colors underline">
                diario.superanfitrion.com.mx
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
}
