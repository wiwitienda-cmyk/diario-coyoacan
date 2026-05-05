import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import ReservaSidebarShared, { LODGIFY_URL, PROPERTIES } from '@/components/ReservaSidebar';
import { Link } from 'wouter';
import {
  Star, ExternalLink, Calendar, Clock, ChevronRight, Home,
  Facebook, Instagram, Youtube, Mail, Phone, ArrowRight,
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────
function getEditionNumber(dateStr: string): string {
  let d: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    d = new Date(dateStr + 'T12:00:00');
  } else {
    d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      const meses: Record<string, number> = {
        enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
        julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
      };
      const match = dateStr.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
      if (match) {
        const day = parseInt(match[1], 10);
        const month = meses[match[2].toLowerCase()] ?? 0;
        const year = parseInt(match[3], 10);
        d = new Date(year, month, day, 12, 0, 0);
      } else {
        return '001';
      }
    }
  }
  if (isNaN(d.getTime())) return '001';
  const start = new Date('2026-01-01');
  const diff = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return String(Math.max(1, diff + 1)).padStart(3, '0');
}

function formatDateEs(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr + 'T12:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ReservaSidebar ahora se importa desde @/components/ReservaSidebar
const ReservaSidebar = () => <ReservaSidebarShared stickyTop="top-24" />;

// ─── Componente principal ────────────────────────────────────────────────────
export default function DiarioCoyoacan() {
  const [email, setEmail] = useState('');

  const searchParams = new URLSearchParams(window.location.search);
  const articleSlug = searchParams.get('slug');

  const { data: article, isLoading } = trpc.articles.bySlug.useQuery(
    { slug: articleSlug || '' },
    { enabled: !!articleSlug }
  );

  const { data: latestArticle, isLoading: isLoadingLatest } = trpc.articles.latest.useQuery(
    undefined,
    { enabled: !articleSlug }
  );

  const { data: allArticles, isLoading: isLoadingAll } = trpc.articles.list.useQuery();
  const { data: newsArticlesData } = trpc.newsArticles.list.useQuery();

  // ─── Datos secundarios (no bloquean render) ──────────────────────────────
  const { data: divisas } = trpc.divisas.rates.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000, staleTime: 9 * 60 * 1000,
  });
  const { data: ipc } = trpc.divisas.ipc.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000, staleTime: 14 * 60 * 1000,
  });
  const { data: oil } = trpc.divisas.oil.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000, staleTime: 14 * 60 * 1000,
  });
  const { data: latam } = trpc.divisas.latam.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000, staleTime: 14 * 60 * 1000,
  });
  const { data: weather } = trpc.weather.coyoacan.useQuery(undefined, {
    refetchInterval: 60 * 60 * 1000, staleTime: 59 * 60 * 1000,
  });
  const { data: gold } = trpc.divisas.gold.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000, staleTime: 14 * 60 * 1000,
  });

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success('¡Gracias por suscribirte al Diario Coyoacán!');
        setEmail('');
      } else {
        toast.error(data.error || 'Error al suscribirse');
      }
    },
    onError: () => {
      toast.error('Error al suscribirse. Intenta de nuevo.');
    },
  });

  const currentArticle = articleSlug ? article : latestArticle;
  const isPortadaMode = !articleSlug;
  const isLoadingArticles = isPortadaMode ? isLoadingAll : (articleSlug ? isLoading : isLoadingLatest);

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (isLoadingArticles) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-amber-800 mx-auto mb-4" />
          <p className="text-sm text-gray-500 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            Cargando Diario Coyoacán...
          </p>
        </div>
      </div>
    );
  }

  // ─── Sin artículo ─────────────────────────────────────────────────────────
  if (!isPortadaMode && !currentArticle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Edición no disponible
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Nuestros redactores están trabajando en el artículo del día. Vuelve pronto.
          </p>
          <a
            href="https://superanfitrion.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors text-sm font-medium"
          >
            Visitar SúperAnfitrión <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // ─── Procesamiento de datos ───────────────────────────────────────────────
  const normalizedNews = (newsArticlesData || []).map((n: any) => ({
    ...n,
    headlineEs: n.title,
    summaryEs: n.summary,
    categoryEs: n.category,
    heroImage: n.heroImage,
    slug: n.slug,
    date: n.date,
    title: n.title,
    summary: n.summary,
    category: n.category,
    _isNews: true,
  }));
  const combinedArticles = [...normalizedNews, ...(allArticles || [])];
  const portadaArticles = combinedArticles.slice(0, 6);
  const safeArticle = currentArticle ?? portadaArticles[0];

  const todayIso = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
  const editionNum = getEditionNumber(todayIso);
  const dateFormatted = formatDateEs(todayIso);

  // SEO
  const rawTitle = safeArticle?.title ?? 'Diario Coyoacán';
  const seoTitle = rawTitle.length > 42 ? rawTitle.substring(0, 39) + '…' : rawTitle;
  const displaySummary = (safeArticle?.summary ?? '').length > 160
    ? (safeArticle?.summary ?? '').substring(0, 157) + '…'
    : (safeArticle?.summary ?? '');
  const shareUrl = `https://diario.superanfitrion.com.mx/diario?slug=${safeArticle?.slug ?? ''}`;

  // ─── Currency ticker helper ───────────────────────────────────────────────
  const renderCurrencyTicker = () => {
    if (!divisas) return null;
    const pairs = [
      { label: 'USD/MXN', cur: 'USD_MXN' as const, flag: '🇺🇸' },
      { label: 'EUR/MXN', cur: 'EUR_MXN' as const, flag: '🇪🇺' },
      { label: 'CAD/MXN', cur: 'CAD_MXN' as const, flag: '🇨🇦' },
      { label: 'GBP/MXN', cur: 'GBP_MXN' as const, flag: '🇬🇧' },
    ] as const;

    return pairs.map(({ label, cur, flag }) => {
      const rate = divisas.rates[cur];
      const prev = divisas.prevRates?.[cur];
      const diff = prev ? rate - prev : null;
      const isUp = diff !== null && diff > 0;
      const isDown = diff !== null && diff < 0;
      return (
        <span key={label} className="inline-flex items-center gap-1.5 px-3 text-xs whitespace-nowrap">
          <span>{flag}</span>
          <span className="font-semibold text-amber-300">{label}</span>
          <span className="text-gray-200">{rate.toFixed(2)}</span>
          {diff !== null && (
            <span className={isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-gray-400'} style={{ fontSize: '0.6rem' }}>
              {isUp ? '▲' : isDown ? '▼' : '▶'} ({isUp ? '+' : ''}{diff.toFixed(2)})
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{seoTitle} | Diario Coyoacán</title>
        <meta name="description" content={displaySummary} />
        <meta name="keywords" content={`Coyoacán, ${safeArticle?.category}, qué hacer en Coyoacán, hospedaje Coyoacán, nómadas digitales CDMX, Mundial 2026 CDMX, Diario Coyoacán`} />
        <meta name="author" content="Diario Coyoacán" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={`${seoTitle} | Diario Coyoacán`} />
        <meta property="og:description" content={displaySummary} />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        {safeArticle?.heroImage && <meta property="og:image" content={safeArticle.heroImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${seoTitle} | Diario Coyoacán`} />
        <meta name="twitter:description" content={displaySummary} />
        {safeArticle?.heroImage && <meta name="twitter:image" content={safeArticle.heroImage} />}
        <link rel="canonical" href={shareUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: (rawTitle || '').substring(0, 110),
            description: (displaySummary || '').substring(0, 300),
            image: safeArticle?.heroImage ? [{ '@type': 'ImageObject', url: safeArticle.heroImage, width: 1200, height: 630 }] : undefined,
            datePublished: (() => { try { if (safeArticle?.date && /^\d{4}-\d{2}-\d{2}$/.test(safeArticle.date)) return new Date(safeArticle.date + 'T12:00:00Z').toISOString(); } catch {} return new Date().toISOString(); })(),
            dateModified: (() => { try { if (safeArticle?.date && /^\d{4}-\d{2}-\d{2}$/.test(safeArticle.date)) return new Date(safeArticle.date + 'T12:00:00Z').toISOString(); } catch {} return new Date().toISOString(); })(),
            author: [{ '@type': 'Organization', name: 'Diario Coyoacán', url: 'https://diario.superanfitrion.com.mx' }],
            publisher: { '@type': 'NewsMediaOrganization', name: 'Diario Coyoacán', url: 'https://diario.superanfitrion.com.mx', logo: { '@type': 'ImageObject', url: 'https://diario.superanfitrion.com.mx/logo-diario.png', width: 600, height: 60 } },
            mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
            articleSection: safeArticle?.category || 'Noticias',
            inLanguage: 'es-MX',
            isAccessibleForFree: true,
          })}
        </script>
      </Helmet>

      {/* ── Currency Ticker ──────────────────────────────────────────── */}
      <div className="bg-gray-950 text-gray-300 overflow-hidden whitespace-nowrap border-b border-gray-800" style={{ fontSize: '0.68rem' }}>
        <div className="inline-flex py-1.5 animate-[marquee_30s_linear_infinite]">
          {renderCurrencyTicker()}
          {ipc && (
            <span className="inline-flex items-center gap-1.5 px-3 text-xs whitespace-nowrap border-l border-gray-700 ml-1">
              <span className="font-semibold text-blue-300">IPC BMV</span>
              <span className="text-gray-200">{ipc.price.toLocaleString('es-MX')}</span>
              <span className={ipc.change >= 0 ? 'text-green-400' : 'text-red-400'} style={{ fontSize: '0.6rem' }}>
                {ipc.change >= 0 ? '▲' : '▼'} {ipc.changePct.toFixed(2)}%
              </span>
            </span>
          )}
          {oil && (
            <>
              <span className="inline-flex items-center gap-1.5 px-3 text-xs whitespace-nowrap border-l border-gray-700 ml-1">
                <span>🛢️</span>
                <span className="font-semibold text-orange-300">WTI</span>
                <span className="text-gray-200">${oil.wti.price.toFixed(2)}</span>
                <span className={oil.wti.change >= 0 ? 'text-green-400' : 'text-red-400'} style={{ fontSize: '0.6rem' }}>
                  {oil.wti.change >= 0 ? '▲' : '▼'} {oil.wti.change >= 0 ? '+' : ''}{oil.wti.change.toFixed(2)}%
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 text-xs whitespace-nowrap">
                <span>🛢️</span>
                <span className="font-semibold text-orange-300">BRENT</span>
                <span className="text-gray-200">${oil.brent.price.toFixed(2)}</span>
                <span className={oil.brent.change >= 0 ? 'text-green-400' : 'text-red-400'} style={{ fontSize: '0.6rem' }}>
                  {oil.brent.change >= 0 ? '▲' : '▼'} {oil.brent.change >= 0 ? '+' : ''}{oil.brent.change.toFixed(2)}%
                </span>
              </span>
            </>
          )}
          {gold && (
            <span className="inline-flex items-center gap-1.5 px-3 text-xs whitespace-nowrap border-l border-gray-700 ml-1">
              <span className="font-semibold text-yellow-300">ORO XAU/USD</span>
              <span className="text-gray-200">${gold.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className={gold.change >= 0 ? 'text-green-400' : 'text-red-400'} style={{ fontSize: '0.6rem' }}>
                {gold.change >= 0 ? '▲' : '▼'} {gold.change >= 0 ? '+' : ''}{gold.change.toFixed(2)} ({gold.changePct >= 0 ? '+' : ''}{gold.changePct.toFixed(2)}%)
              </span>
            </span>
          )}
          {/* Duplicate for seamless loop */}
          {renderCurrencyTicker()}
        </div>
      </div>

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
              <a
                href="https://superanfitrion.com.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                <Home className="w-4 h-4" />
                Home
              </a>
              <Link
                href="/"
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
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
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors hidden sm:inline-flex"
              >
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

      {/* ── Sub-header: Edition info + Weather ───────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 capitalize">{dateFormatted}</span>
              <span className="text-gray-300">|</span>
              <span>Edición N.° {editionNum}</span>
            </div>
            {weather && (
              <div className="flex items-center gap-2 text-xs">
                <span>{weather.morning.icon} {weather.morning.temp}°C</span>
                <span className="text-gray-300">·</span>
                <span>{weather.afternoon.icon} {weather.afternoon.temp}°C</span>
                <span className="text-gray-300">·</span>
                <span>{weather.night.icon} {weather.night.temp}°C</span>
                <span className="text-gray-300">·</span>
                <span className="font-medium text-amber-700">UV {weather.current.uvIndex} ({weather.current.uvLabel})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-10">
          {/* ── Content Column ────────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            {isPortadaMode ? (
              /* ── PORTADA MODE ─────────────────────────────────── */
              <>
                {/* Section label */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-gray-900">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Edición del Día</span>
                  <span className="text-xs text-gray-400 capitalize">{dateFormatted}</span>
                </div>

                {portadaArticles.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-gray-500 text-sm">La redacción está preparando la edición de hoy. Vuelve pronto.</p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {/* Main article (first) */}
                    {portadaArticles[0] && (() => {
                      const art = portadaArticles[0];
                      const artTitle = art.title.length > 90 ? art.title.substring(0, 87) + '…' : art.title;
                      const artSummary = art.summary.length > 200 ? art.summary.substring(0, 197) + '…' : art.summary;
                      const artUrl = (art as any)._isNews ? `/noticias/${art.slug}` : `/diario?slug=${art.slug}`;
                      return (
                        <article className="pb-8 mb-8 border-b border-gray-200">
                          {art.heroImage && (
                            <Link href={artUrl}>
                              <div className="relative mb-5 overflow-hidden rounded-xl cursor-pointer group">
                                <img
                                  src={art.heroImage}
                                  alt={artTitle}
                                  loading="eager"
                                  fetchPriority="high"
                                  className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                  <span className="inline-block bg-amber-800 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md shadow-lg">
                                    {art.category}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          )}
                          <Link href={artUrl}>
                            <h2
                              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 hover:text-amber-800 transition-colors cursor-pointer"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {artTitle}
                            </h2>
                          </Link>
                          <p className="text-lg text-gray-600 leading-relaxed mb-4 border-l-4 border-amber-800 pl-5 italic">
                            {artSummary}
                          </p>
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDateEs(art.date).split(',')[0]}</span>
                              </div>
                              <span className="text-gray-300">|</span>
                              <span className="font-medium text-gray-700">Redacción</span>
                            </div>
                            <Link
                              href={artUrl}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-amber-800 transition-colors"
                            >
                              Leer artículo <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </article>
                      );
                    })()}

                    {/* Secondary articles (2-column grid) */}
                    {portadaArticles.length > 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        {portadaArticles.slice(1, 5).map((art, idx) => {
                          const artTitle = art.title.length > 80 ? art.title.substring(0, 77) + '…' : art.title;
                          const artSummary = art.summary.length > 120 ? art.summary.substring(0, 117) + '…' : art.summary;
                          const artUrl = (art as any)._isNews ? `/noticias/${art.slug}` : `/diario?slug=${art.slug}`;
                          return (
                            <article key={art.slug} className="group">
                              {art.heroImage && (
                                <Link href={artUrl}>
                                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-gray-100 cursor-pointer">
                                    <img
                                      src={art.heroImage}
                                      alt={artTitle}
                                      loading="lazy"
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                </Link>
                              )}
                              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                                {art.category}
                              </span>
                              <Link href={artUrl}>
                                <h3
                                  className="text-base sm:text-lg font-bold text-gray-900 mt-1 mb-2 leading-snug group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-3"
                                  style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                  {artTitle}
                                </h3>
                              </Link>
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-2">
                                {artSummary}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDateEs(art.date).split(',')[0]}</span>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}

                    {/* Hemeroteca link */}
                    <div className="text-center py-6 border-t border-gray-200">
                      <Link
                        href="/hemeroteca"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Ver Hemeroteca Completa <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* CTA Banner */}
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-white mt-8 shadow-xl">
                      <div className="text-center max-w-lg mx-auto">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 block">
                          Recomendación del Diario
                        </span>
                        <h3
                          className="text-2xl font-bold mb-3"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Hospédate en el corazón de Coyoacán
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                          Alojamientos auténticos en el barrio más bonito de México. Reserva directa sin comisiones. Anfitriones locales que conocen cada rincón de Coyoacán.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a
                            href="https://superanfitrion.com.mx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 text-white text-sm font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg"
                          >
                            Ver disponibilidad <ExternalLink className="w-4 h-4" />
                          </a>
                          <Link
                            href="/hospedaje-mundial-2026"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white text-sm font-bold rounded-xl border-2 border-amber-600 hover:bg-amber-600/20 transition-colors"
                          >
                            Mundial 2026 <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Newsletter (portada mode) */}
                    <div className="mt-8 bg-amber-50 rounded-2xl border border-amber-100 p-6">
                      <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Recibe el Diario cada mañana
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        Suscríbete y recibe las noticias de Coyoacán directamente en tu correo.
                      </p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (email) subscribeMutation.mutate({ email });
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          required
                          className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={subscribeMutation.isPending}
                          className="px-5 py-2.5 bg-amber-800 text-white text-sm font-semibold rounded-xl hover:bg-amber-900 transition-colors disabled:opacity-50"
                        >
                          {subscribeMutation.isPending ? '...' : 'Suscribir'}
                        </button>
                      </form>
                    </div>

                    {/* Mobile CTA */}
                    <div className="lg:hidden bg-gradient-to-r from-amber-800 to-amber-900 rounded-2xl p-6 text-white mt-8 shadow-lg">
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
                        Ver Alojamientos Disponibles
                      </a>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* ── ARTICLE MODE (legacy /diario?slug=...) ────────── */
              <article>
                <p className="text-sm text-gray-500 mb-8">
                  Este artículo está en el archivo del Diario. Para artículos recientes, visita la{' '}
                  <Link href="/" className="text-amber-800 font-semibold hover:underline">portada</Link>.
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block bg-amber-800 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md">
                    {safeArticle?.category}
                  </span>
                </div>
                <h1
                  className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {safeArticle?.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 border-l-4 border-amber-800 pl-5 italic">
                  {safeArticle?.summary}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time>{safeArticle?.date}</time>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="font-medium text-gray-700">Redacción Diario Coyoacán</span>
                </div>
                {safeArticle?.heroImage && (
                  <figure className="mb-10 -mx-4 sm:mx-0">
                    <img
                      src={safeArticle.heroImage}
                      alt={safeArticle.title}
                      className="w-full h-auto sm:rounded-xl object-cover"
                      loading="eager"
                    />
                  </figure>
                )}
                {/* Article content */}
                <div className="prose-article">
                  {((safeArticle as any)?.content ?? (safeArticle as any)?.contentEs ?? '').split(';').filter(Boolean).map((p: string, i: number) => (
                    <p key={i} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
                      {p.trim()}
                    </p>
                  ))}
                </div>
              </article>
            )}
          </main>

          {/* ── Sidebar ───────────────────────────────────────────── */}
          <aside className="hidden lg:block w-[340px] flex-shrink-0">
            <ReservaSidebar />

            {/* Agenda del barrio */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-gray-900">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">Agenda del Barrio</h4>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-3">
                  Coyoacán · {dateFormatted.split(',')[0]}
                </p>
                {[
                  { title: 'Mercado de Artesanías', desc: 'Jardín Centenario · 10:00–20:00 hrs · Entrada libre' },
                  { title: 'Museo Frida Kahlo', desc: 'Londres 247, Del Carmen · Mar–Dom 10:00–17:30 hrs' },
                  { title: 'Cineteca Nacional', desc: 'Av. México-Coyoacán 389 · Cartelera en cineteca.mx' },
                  { title: 'Mercado de Coyoacán', desc: 'Ignacio Allende s/n · Lun–Dom 7:00–18:00 hrs' },
                ].map((item, i, arr) => (
                  <div key={i} className={`pb-3 mb-3 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Efeméride */}
            <div className="mt-6 bg-gray-900 rounded-2xl p-5 text-white shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Efeméride del Barrio</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                En 1524, Hernán Cortés estableció en Coyoacán la primera capital de la Nueva España, antes de que la Ciudad de México fuera fundada sobre las ruinas de Tenochtitlan. El barrio fue sede del primer ayuntamiento del continente americano.
              </p>
            </div>
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

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
