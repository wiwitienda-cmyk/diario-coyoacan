import { Helmet } from 'react-helmet-async';
import { trpc } from "@/lib/trpc";
import { Link, useRoute } from "wouter";
import { Calendar, ArrowLeft, Clock, Star, ExternalLink, ChevronRight, Home, Copy, Check } from "lucide-react";
import { useEffect, useMemo, useState } from 'react';

// ── Propiedades SúperAnfitrión ──────────────────────────────────────────
const PROPERTIES = [
  { name: 'Flamingo 38', price: 24, rating: 4.97, reviews: 186 },
  { name: 'La Pequeña París', price: 26, rating: 4.95, reviews: 142 },
  { name: 'El Balcón de Buda', price: 32, rating: 4.95, reviews: 128 },
  { name: 'King 1', price: 39, rating: 4.95, reviews: 97 },
  { name: 'El Alebrije', price: 43, rating: 4.95, reviews: 84 },
  { name: 'Rompecabezas', price: 39, rating: 4.89, reviews: 76 },
  { name: 'El Cuarto Cuatro', price: 60, rating: 4.88, reviews: 52 },
];

const LODGIFY_URL = 'https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades';

// ── Helpers ─────────────────────────────────────────────────────────────
function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
}

// ── Share Buttons ───────────────────────────────────────────────────────
function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
  };
  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };
  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-500 mr-1">Compartir:</span>
      <button
        onClick={shareWhatsApp}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
        aria-label="Compartir en WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </button>
      <button
        onClick={shareFacebook}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label="Compartir en Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Facebook
      </button>
      <button
        onClick={shareTwitter}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
        aria-label="Compartir en X (Twitter)"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X
      </button>
      <button
        onClick={copyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          copied
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
        }`}
        aria-label="Copiar enlace"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  );
}

// ── Sidebar de Reserva ──────────────────────────────────────────────────
function ReservaSidebar() {
  return (
    <aside className="hidden lg:block w-[340px] flex-shrink-0">
      <div className="sticky top-28">
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
    </aside>
  );
}

// ── CTA Móvil (visible solo en pantallas pequeñas) ──────────────────────
function MobileCTA() {
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
        Ver Alojamientos Disponibles
      </a>
    </div>
  );
}

// ── Componente Principal ────────────────────────────────────────────────
export default function NewsArticleDetail() {
  const [, params] = useRoute("/noticias/:slug");
  const slug = params?.slug || '';

  const { data: article, isLoading, error } = trpc.newsArticles.bySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Fetch related articles
  const { data: allArticles } = trpc.newsArticles.list.useQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const readingTime = useMemo(() => {
    if (!article?.content) return 0;
    return estimateReadingTime(stripHtml(article.content));
  }, [article?.content]);

  const relatedArticles = useMemo(() => {
    if (!allArticles || !article) return [];
    return allArticles
      .filter((a: any) => a.id !== article.id)
      .slice(0, 3);
  }, [allArticles, article]);

  const articleUrl = `https://diario.superanfitrion.com.mx/noticias/${slug}`;

  // ── Loading ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-amber-800 mx-auto mb-4" />
          <p className="text-sm text-gray-500 tracking-wide">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  // ── Error / Not Found ───────────────────────────────────────────────
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Artículo no encontrado
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            La edición que buscas no existe o fue retirada del archivo.
          </p>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Archivo
          </Link>
        </div>
      </div>
    );
  }

  const contentSections = parseContent(article.content || '');

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{article.title} | Diario Coyoacán</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={`${article.category}, Coyoacán, CDMX, ${article.title}, SúperAnfitrión, hospedaje Coyoacán, qué hacer en Coyoacán, eventos CDMX`} />
        <meta name="author" content="Diario Coyoacán" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        {article.heroImage && <meta property="og:image" content={article.heroImage} />}
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        {article.heroImage && <meta name="twitter:image" content={article.heroImage} />}
        <link rel="canonical" href={articleUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            description: article.summary,
            image: article.heroImage,
            datePublished: article.createdAt,
            dateModified: article.updatedAt || article.createdAt,
            author: { '@type': 'Organization', name: 'Diario Coyoacán' },
            publisher: {
              '@type': 'Organization',
              name: 'SúperAnfitrión Coyoacán',
              url: 'https://superanfitrion.com.mx',
              logo: { '@type': 'ImageObject', url: 'https://superanfitrion.com.mx/logo.png' },
            },
            mainEntityOfPage: articleUrl,
            articleSection: article.category,
            inLanguage: 'es-MX',
          })}
        </script>
      </Helmet>

      {/* ── Header ──────────────────────────────────────────────────── */}
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

      {/* ── Breadcrumbs ─────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 overflow-x-auto" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-900 transition-colors whitespace-nowrap flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <Link href="/noticias" className="hover:text-gray-900 transition-colors whitespace-nowrap">
              Noticias
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate max-w-[300px]">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Content Area ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-10">
          {/* ── Article Column ────────────────────────────────────── */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Category + Reading time */}
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block bg-amber-800 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min de lectura</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {article.title}
            </h1>

            {/* Summary */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 border-l-4 border-amber-800 pl-5 italic">
              {article.summary}
            </p>

            {/* Meta: date + author + share */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time>{article.date}</time>
                </div>
                <span className="text-gray-300">|</span>
                <span className="font-medium text-gray-700">Redacción Diario Coyoacán</span>
              </div>
              <div className="sm:ml-auto">
                <ShareButtons title={article.title} url={articleUrl} />
              </div>
            </div>

            {/* Hero Image */}
            {article.heroImage && (
              <figure className="mb-10 -mx-4 sm:mx-0">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-auto sm:rounded-xl object-cover"
                  loading="eager"
                />
              </figure>
            )}

            {/* ── Article Body ─────────────────────────────────── */}
            <div className="prose-article">
              {contentSections.map((section, idx) => (
                <div key={idx} className="mb-8">
                  {section.heading && (
                    <h2
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-10 leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {section.heading}
                    </h2>
                  )}
                  {section.image && (
                    <figure className="my-6 -mx-4 sm:mx-0">
                      <img
                        src={section.image}
                        alt={section.imageAlt || section.heading || ''}
                        className="w-full h-auto sm:rounded-xl object-cover"
                        loading="lazy"
                      />
                      {section.imageCaption && (
                        <figcaption className="mt-2 px-4 sm:px-0 text-xs text-gray-500 italic">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {section.paragraphs.map((p, pIdx) => {
                    // Check if it's a table
                    if (p.startsWith('<table')) {
                      return (
                        <div
                          key={pIdx}
                          className="my-6 overflow-x-auto rounded-xl border border-gray-200"
                          dangerouslySetInnerHTML={{ __html: p }}
                        />
                      );
                    }
                    // Check if it's a CTA link paragraph
                    if (p.includes('superanfitrion') || p.includes('SúperAnfitrión') || p.includes('Lodgify')) {
                      return (
                        <p
                          key={pIdx}
                          className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4 bg-amber-50 border-l-4 border-amber-600 pl-4 py-3 rounded-r-lg"
                          dangerouslySetInnerHTML={{ __html: p }}
                        />
                      );
                    }
                    return (
                      <p
                        key={pIdx}
                        className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* ── Mobile CTA ───────────────────────────────────── */}
            <MobileCTA />

            {/* ── Bottom Share ──────────────────────────────────── */}
            <div className="border-t border-gray-200 pt-6 mt-8 mb-8">
              <p className="text-sm font-medium text-gray-700 mb-3">¿Te gustó este artículo? Compártelo:</p>
              <ShareButtons title={article.title} url={articleUrl} />
            </div>

            {/* ── Related Articles ──────────────────────────────── */}
            {relatedArticles.length > 0 && (
              <section className="border-t border-gray-200 pt-8 mt-4">
                <h3
                  className="text-xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Más noticias de Coyoacán
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedArticles.map((ra: any) => (
                    <Link
                      key={ra.id}
                      href={`/noticias/${ra.slug}`}
                      className="group block"
                    >
                      {ra.heroImage && (
                        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-gray-100">
                          <img
                            src={ra.heroImage}
                            alt={ra.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                        {ra.category}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 mt-1 leading-snug group-hover:text-amber-800 transition-colors line-clamp-3">
                        {ra.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <ReservaSidebar />
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">Navegación</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-sm text-gray-300 hover:text-white transition-colors">Portada</Link>
                <Link href="/noticias" className="block text-sm text-gray-300 hover:text-white transition-colors">Noticias</Link>
                <Link href="/hemeroteca" className="block text-sm text-gray-300 hover:text-white transition-colors">Hemeroteca</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">Hospedaje</h4>
              <p className="text-sm text-gray-300 mb-3">
                Reserva directo y ahorra en alojamientos en Coyoacán.
              </p>
              <a
                href={LODGIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                Ver Alojamientos <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2026 Diario Coyoacán — SúperAnfitrión. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Content Parser ──────────────────────────────────────────────────────
interface ContentSection {
  heading?: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

function parseContent(content: string): ContentSection[] {
  const lines = content.split('\n');
  const sections: ContentSection[] = [];
  let current: ContentSection = { paragraphs: [] };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Heading (## or ###)
    const headingMatch = trimmed.match(/^#{2,3}\s+(.+)/);
    if (headingMatch) {
      if (current.heading || current.paragraphs.length > 0) {
        sections.push(current);
      }
      current = { heading: headingMatch[1], paragraphs: [] };
      continue;
    }

    // Image with caption: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      current.imageAlt = imgMatch[1];
      current.image = imgMatch[2];
      continue;
    }

    // Italic line right after image = caption
    const captionMatch = trimmed.match(/^_(.+)_$/);
    if (captionMatch && !current.imageCaption && current.image) {
      current.imageCaption = captionMatch[1];
      continue;
    }
    // Also handle *caption* style
    const captionMatch2 = trimmed.match(/^\*([^*]+)\*$/);
    if (captionMatch2 && !current.imageCaption && current.image) {
      current.imageCaption = captionMatch2[1];
      continue;
    }

    // Horizontal rule (---)
    if (trimmed.match(/^-{3,}$/)) {
      if (current.heading || current.paragraphs.length > 0) {
        sections.push(current);
      }
      current = { paragraphs: [] };
      continue;
    }

    // Table detection: lines starting with |
    if (trimmed.startsWith('|')) {
      // Collect all table lines
      const tableLines: string[] = [trimmed];
      // Look ahead for more table lines (already in paragraphs or next lines)
      // For now, accumulate in current paragraph as HTML table
      const lastP = current.paragraphs[current.paragraphs.length - 1];
      if (lastP && lastP.startsWith('<table')) {
        // Append to existing table - skip for now, tables are processed below
      }
      // We'll handle tables in a second pass
      current.paragraphs.push(trimmed);
      continue;
    }

    // Bold text conversion
    let processed = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links - style them nicely
    processed = processed.replace(
      /\[(.+?)\]\(([^)]*)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-amber-800 font-semibold underline decoration-amber-300 underline-offset-2 hover:text-amber-900 hover:decoration-amber-500 transition-colors">$1</a>'
    );

    current.paragraphs.push(processed);
  }

  if (current.heading || current.paragraphs.length > 0) {
    sections.push(current);
  }

  // Second pass: convert markdown table rows into HTML tables
  return sections.map((section) => {
    const newParagraphs: string[] = [];
    let tableRows: string[] = [];

    for (const p of section.paragraphs) {
      if (p.startsWith('|')) {
        tableRows.push(p);
      } else {
        if (tableRows.length > 0) {
          newParagraphs.push(buildHtmlTable(tableRows));
          tableRows = [];
        }
        newParagraphs.push(p);
      }
    }
    if (tableRows.length > 0) {
      newParagraphs.push(buildHtmlTable(tableRows));
    }

    return { ...section, paragraphs: newParagraphs };
  });
}

function buildHtmlTable(rows: string[]): string {
  if (rows.length < 2) return rows.join('\n');

  // Filter out separator rows (|---|---|)
  const dataRows = rows.filter((r) => !r.match(/^\|[\s-:|]+\|$/));
  if (dataRows.length === 0) return '';

  const parseRow = (row: string) =>
    row
      .split('|')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

  const headerCells = parseRow(dataRows[0]);
  const bodyRows = dataRows.slice(1);

  let html = '<table class="w-full text-sm">';
  html += '<thead class="bg-gray-50"><tr>';
  for (const cell of headerCells) {
    html += `<th class="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider">${cell.replace(/\*\*/g, '')}</th>`;
  }
  html += '</tr></thead><tbody class="divide-y divide-gray-100">';
  for (const row of bodyRows) {
    const cells = parseRow(row);
    html += '<tr class="hover:bg-gray-50">';
    for (const cell of cells) {
      let processed = cell.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
      html += `<td class="px-4 py-3 text-gray-600">${processed}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  return html;
}
