import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { Share2, Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Convierte el texto plano separado por ";" en un array de párrafos */
function parseSections(raw: string): string[] {
  // Handle JSON array format: [{"title":"...","text":"..."},...]
  if (raw && raw.trim().startsWith('[')) {
    try {
      const sections = JSON.parse(raw) as Array<{ title?: string; text?: string; content?: string }>;
      if (Array.isArray(sections)) {
        return sections
          .map((s) => s.text || s.content || '')
          .filter(Boolean);
      }
    } catch {
      // Fall through to plain text parsing
    }
  }
  // Handle plain text separated by semicolons
  return raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !s.startsWith('---') && !s.startsWith('**Fuentes') && !s.startsWith('Fuentes:'));
}

/** Extrae la primera cita directa o frase destacable para pull quote */
function extractPullQuote(paragraphs: string[]): string {
  for (const p of paragraphs) {
    const match = p.match(/"([^"]{40,150})"/);
    if (match) return match[1];
  }
  const first = paragraphs.find((p) => p.length > 120);
  if (first) {
    const sentences = first.split(/(?<=[.!?])\s+/);
    if (sentences[1] && sentences[1].length > 40) return sentences[1].substring(0, 150);
  }
  return paragraphs[0]?.substring(0, 130) || '';
}

/** Calcula el número de edición desde el 1 de enero de 2026. Maneja formato ISO y texto largo */
function getEditionNumber(dateStr: string): string {
  let d: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    d = new Date(dateStr + 'T12:00:00');
  } else {
    // Texto largo: extraer números para parsear
    d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      // Intentar extraer año, mes y día del texto en español
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

/** Formatea fecha en español largo. Maneja tanto formato ISO (2026-02-28) como texto largo ya formateado */
function formatDateEs(dateStr: string): string {
  // Si ya viene en formato de texto largo (ej: "Domingo, 15 de febrero de 2026"), devolverlo tal cual
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Formato ISO: parsear y formatear
  const d = new Date(dateStr + 'T12:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Genera anuncio contextual según categoría/título */
function getContextualAd(category: string, title: string): {
  headline: string;
  body: string;
  cta: string;
  url: string;
} {
  const lower = (category + ' ' + title).toLowerCase();
  if (lower.includes('mundial') || lower.includes('fútbol') || lower.includes('futbol')) {
    return {
      headline: 'Asegura tu lugar para el Mundial 2026',
      body: 'SúperAnfitrión Coyoacán tiene disponibilidad para junio y julio con tarifas directas, sin comisiones de plataforma y con factura incluida. A 20–25 minutos del Estadio Azteca.',
      cta: 'Reservar para el Mundial →',
      url: 'https://superanfitrion.com.mx/mundial-2026',
    };
  }
  if (lower.includes('gentrificaci') || lower.includes('vivienda') || lower.includes('vecin')) {
    return {
      headline: 'Hospédate con quienes conocen el barrio',
      body: 'Antes de que se acaben los lugares. SúperAnfitrión Coyoacán ofrece hospedaje directo con anfitriones locales, no con corporativos. Reserva sin intermediarios.',
      cta: 'Reservar directo →',
      url: 'https://superanfitrion.com.mx',
    };
  }
  if (lower.includes('festival') || lower.includes('feria') || lower.includes('cultura') || lower.includes('arte')) {
    return {
      headline: 'Vive el festival desde adentro del barrio',
      body: 'SúperAnfitrión Coyoacán tiene alojamientos auténticos a pasos del Jardín Centenario. WiFi de alta velocidad, sin hoteles, sin clichés.',
      cta: 'Ver alojamientos →',
      url: 'https://superanfitrion.com.mx',
    };
  }
  return {
    headline: 'Hospédate en el corazón de Coyoacán',
    body: 'Alojamientos auténticos en el barrio más bonito de México. Reserva directa sin comisiones. Anfitriones locales que conocen cada rincón de Coyoacán.',
    cta: 'Ver disponibilidad →',
    url: 'https://superanfitrion.com.mx',
  };
}

// ─── Paleta de colores ───────────────────────────────────────────────────────
const PAPER = '#f5f0e8';
const INK = '#1a1008';
const WINE = '#8b1a1a';
const GOLD = '#c9a96e';
const PAPER_DARK = '#ede8dc';
const INK_LIGHT = '#3a2a1a';
const INK_MUTED = '#6b5a3e';

// ─── Familias tipográficas ───────────────────────────────────────────────────
const SERIF_BODY = "'Source Serif 4', 'Merriweather', Georgia, serif";
const SERIF_HEADLINE = "'Playfair Display', 'Merriweather', Georgia, serif";
const GOTHIC = "'UnifrakturMaguntia', 'Playfair Display', serif";
const SANS_SUBHEAD = "'Oswald', 'Arial Narrow', sans-serif";

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
  // ─── Cotizaciones de divisas (se actualiza cada 10 min) ─────────────────────
  const { data: divisas } = trpc.divisas.rates.useQuery(undefined, {
    refetchInterval: 10 * 60 * 1000, // refetch cada 10 minutos
    staleTime: 9 * 60 * 1000,
  });
  // ─── Índice IPC/BMV (se actualiza cada 15 min) ──────────────────────────────────────────
  const { data: ipc } = trpc.divisas.ipc.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000,
    staleTime: 14 * 60 * 1000,
  });
  // ─── Petróleo WTI/Brent (se actualiza cada 15 min) ──────────────────────────
  const { data: oil } = trpc.divisas.oil.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000,
    staleTime: 14 * 60 * 1000,
  });
  // ─── Tipos de cambio Latam ARS/COP (se actualiza cada 15 min) ─────────────────
  const { data: latam } = trpc.divisas.latam.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000,
    staleTime: 14 * 60 * 1000,
  });
  // ─── Clima Coyoacán (se actualiza cada hora) ─────────────────────────────────────────────
  const { data: weather } = trpc.weather.coyoacan.useQuery(undefined, {
    refetchInterval: 60 * 60 * 1000, // refetch cada hora
    staleTime: 59 * 60 * 1000,
  });
  // ─── Precio del Oro XAU/USD (se actualiza cada 15 min) ──────────────────────────
  const { data: gold } = trpc.divisas.gold.useQuery(undefined, {
    refetchInterval: 15 * 60 * 1000,
    staleTime: 14 * 60 * 1000,
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
  // En modo portada (sin slug), mostrar 3 tarjetas de artículos
  const isPortadaMode = !articleSlug;
  // En modo portada esperamos allArticles; en modo artículo esperamos el artículo individual
  const isLoadingAny = isPortadaMode ? isLoadingAll : (articleSlug ? isLoading : isLoadingLatest);

  // ─── Estado de carga ───────────────────────────────────────────────────────
  if (isLoadingAny) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: PAPER, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: GOTHIC, fontSize: '4rem', color: INK, marginBottom: '1rem' }}>
            Diario Coyoacán
          </p>
          <p style={{ fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', letterSpacing: '0.15em', color: WINE, fontSize: '0.85rem' }}>
            Cargando edición…
          </p>
        </div>
      </div>
    );
  }

  // ─── Sin  // ─── Sin artículo ──────────────────────────────────────────────
  // En modo portada, no necesitamos currentArticle (usamos allArticles)
  if (!isPortadaMode && !currentArticle) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: PAPER, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 1rem' }}>
          <p style={{ fontFamily: GOTHIC, fontSize: '4rem', color: INK, marginBottom: '1rem' }}>
            Diario Coyoacán
          </p>
          <p style={{ fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', letterSpacing: '0.15em', color: WINE, marginBottom: '2rem', fontSize: '0.85rem' }}>
            La edición de hoy está en preparación
          </p>
          <p style={{ fontFamily: SERIF_BODY, color: INK, marginBottom: '1.5rem', lineHeight: 1.7 }}>
            Nuestros redactores están trabajando en el artículo del día. Vuelve pronto.
          </p>
          <a
            href="https://superanfitrion.com.mx"
            style={{ display: 'inline-block', backgroundColor: WINE, color: PAPER, padding: '0.75rem 1.5rem', fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', textDecoration: 'none' }}
          >
            Visitar SúperAnfitrión →
          </a>
        </div>
      </div>
    );
  }

   // ─── Procesamiento de datos ────────────────────────────────────────────
  // Artículos para portada (los 3 más recientes)
  const portadaArticles = (allArticles || []).slice(0, 3);
  // Artículo de referencia para cabecera/SEO: el más reciente
  // En modo portada currentArticle puede ser undefined; usamos portadaArticles[0] como fallback
  const safeArticle = currentArticle ?? portadaArticles[0];
  const refArticle = portadaArticles[0] ?? safeArticle;

  const paragraphs = parseSections((safeArticle as any)?.content ?? (safeArticle as any)?.contentEs ?? '');
  const pullQuote = extractPullQuote(paragraphs);
   // Fecha de la cabecera: siempre la fecha real de hoy en zona horaria CDMX
  const todayIso = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' }); // YYYY-MM-DD
  const editionNum = getEditionNumber(todayIso);
  const dateFormatted = formatDateEs(todayIso);
  const ad = getContextualAd(safeArticle?.category ?? '', safeArticle?.title ?? '');
  const shareUrl = `https://diario.superanfitrion.com.mx/diario?slug=${safeArticle?.slug ?? ''}`;

  // Artículos recientes para columna lateral (modo artículo individual)
  const recentArticles = (allArticles || [])
    .filter((a) => a.slug !== safeArticle?.slug)
    .slice(0, 3);

  // Distribución de párrafos
  const firstParagraph = paragraphs[0] || '';
  const restParagraphs = paragraphs.slice(1);
  const beforePullQuote = restParagraphs.slice(0, 2);
  const afterPullQuote = restParagraphs.slice(2);

  // Título para <title> SEO: máximo 42 chars + " | Diario Coyoacán" (18) = 60 total
  const rawTitle = safeArticle?.title ?? '';
  const seoTitle = rawTitle.length > 42
      ? rawTitle.substring(0, 39) + '…'
      : rawTitle;

  // Título visible en H2 (≤78 chars para dejar margen)
  const displayTitle = rawTitle.length > 78
      ? rawTitle.substring(0, 75) + '…'
      : rawTitle;

  // Summary truncado (≤160 chars)
  const displaySummary = (safeArticle?.summary ?? '').length > 160
      ? (safeArticle?.summary ?? '').substring(0, 157) + '…'
      : (safeArticle?.summary ?? '');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: PAPER, color: INK }}>
      <Helmet>
        <title>{seoTitle} | Diario Coyoacán</title>
        <meta name="description" content={displaySummary} />
        <meta
          name="keywords"
          content={`Coyoacán, ${safeArticle?.category}, qué hacer en Coyoacán, hospedaje Coyoacán, nómadas digitales CDMX, Mundial 2026 CDMX, Diario Coyoacán`}
        />
        <meta name="author" content="Diario Coyoacán" />
        {/* Open Graph - sobreescribe los que inyecta la plataforma */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={`${seoTitle} | Diario Coyoacán`} />
        <meta property="og:description" content={displaySummary} />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        {safeArticle?.heroImage && <meta property="og:image" content={safeArticle.heroImage} />}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${seoTitle} | Diario Coyoacán`} />
        <meta name="twitter:description" content={displaySummary} />
        {safeArticle?.heroImage && <meta name="twitter:image" content={safeArticle.heroImage} />}
        {/* Canonical */}
        <link rel="canonical" href={shareUrl} />
        {/* ld+json Schema.org - NewsArticle completo para Google News */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: (displayTitle || '').substring(0, 110),
            description: (displaySummary || '').substring(0, 300),
            image: safeArticle?.heroImage ? [{
              '@type': 'ImageObject',
              url: safeArticle.heroImage,
              width: 1200,
              height: 630,
            }] : undefined,
            datePublished: (() => { try { if (safeArticle?.date && /^\d{4}-\d{2}-\d{2}$/.test(safeArticle.date)) return new Date(safeArticle.date + 'T12:00:00Z').toISOString(); } catch {} return new Date().toISOString(); })(),
            dateModified: (() => { try { if (safeArticle?.date && /^\d{4}-\d{2}-\d{2}$/.test(safeArticle.date)) return new Date(safeArticle.date + 'T12:00:00Z').toISOString(); } catch {} return new Date().toISOString(); })(),
            author: [{
              '@type': 'Organization',
              name: 'Diario Coyoacán',
              url: 'https://diario.superanfitrion.com.mx',
            }],
            publisher: {
              '@type': 'NewsMediaOrganization',
              name: 'Diario Coyoacán',
              url: 'https://diario.superanfitrion.com.mx',
              logo: {
                '@type': 'ImageObject',
                url: 'https://diario.superanfitrion.com.mx/logo-diario.png',
                width: 600,
                height: 60,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': shareUrl,
            },
            articleSection: safeArticle?.category || 'Noticias',
            inLanguage: 'es-MX',
            isAccessibleForFree: true,
            keywords: `Coyoacán, CDMX, ${safeArticle?.category || 'noticias'}, hospedaje Coyoacán, SúperAnfitrión`,
            about: {
              '@type': 'Place',
              name: 'Coyoacán',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Coyoacán',
                addressRegion: 'Ciudad de México',
                addressCountry: 'MX',
              },
            },
          })}
        </script>
      </Helmet>

      {/* ── BANNER SUPERIOR NEGRO ─────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: INK,
          color: PAPER,
          padding: '0.4rem 1rem',
          textAlign: 'center',
          fontSize: '0.7rem',
          fontFamily: SANS_SUBHEAD,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        <a
          href="https://superanfitrion.com.mx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: GOLD, textDecoration: 'none' }}
        >
          🏠 Hospédate en Coyoacán con SúperAnfitrión · superanfitrion.com.mx
        </a>
      </div>

      {/* ── MARQUEE DE NOTICIAS ───────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: WINE,
          color: PAPER,
          padding: '0.35rem 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'marquee 35s linear infinite',
            fontFamily: SANS_SUBHEAD,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '0.7rem',
          }}
        >
          HOY EN COYOACÁN: {safeArticle?.title.substring(0, 60)} &bull; CLIMA: {weather ? `${weather.morning.icon} MAÑANA ${weather.morning.temp}°C · ${weather.afternoon.icon} TARDE ${weather.afternoon.temp}°C · ${weather.night.icon} NOCHE ${weather.night.temp}°C · ☀️ UV ${weather.afternoon.uvIndex} (${weather.afternoon.uvLabel})` : 'CARGANDO CLIMA...'} &bull; HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX &bull; ALCALDÍAS: COYOACÁN · BENITO JUÁREZ · XOCHIMILCO · ÁLVARO OBREGÓN · MILPA ALTA · IZTACALCO · CENTRO HISTÓRICO &bull;&nbsp;
          HOY EN COYOACÁN: {safeArticle?.title.substring(0, 60)} &bull; CLIMA: {weather ? `${weather.morning.icon} MAÑANA ${weather.morning.temp}°C · ${weather.afternoon.icon} TARDE ${weather.afternoon.temp}°C · ${weather.night.icon} NOCHE ${weather.night.temp}°C · ☀️ UV ${weather.afternoon.uvIndex} (${weather.afternoon.uvLabel})` : 'CARGANDO CLIMA...'} &bull; HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX &bull; ALCALDÍAS: COYOACÁN · BENITO JUÁREZ · XOCHIMILCO · ÁLVARO OBREGÓN · MILPA ALTA · IZTACALCO · CENTRO HISTÓRICO &bull;&nbsp;
        </div>
      </div>
      {/* ── CINTILLA DE DIVISAS ───────────────────────────────── */}
      <div
        style={{
          backgroundColor: '#0d1117',
          color: '#e6edf3',
          padding: '0.3rem 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderBottom: `1px solid ${GOLD}`,
          fontSize: '0.68rem',
          fontFamily: SANS_SUBHEAD,
          letterSpacing: '0.08em',
        }}
      >
        {divisas ? (
          <div
            style={{
              display: 'inline-flex',
              gap: '0',
              animation: 'marquee 28s linear infinite',
            }}
          >
            {([
              { label: 'USD/MXN', cur: 'USD_MXN' as const, flag: '🇺🇸' },
              { label: 'EUR/MXN', cur: 'EUR_MXN' as const, flag: '🇪🇺' },
              { label: 'CAD/MXN', cur: 'CAD_MXN' as const, flag: '🇨🇦' },
              { label: 'GBP/MXN', cur: 'GBP_MXN' as const, flag: '🇬🇧' },
            ] as const).map(({ label, cur, flag }) => {
              const rate = divisas.rates[cur];
              const prev = divisas.prevRates?.[cur];
              const diff = prev ? rate - prev : null;
              const isUp = diff !== null && diff > 0;
              const isDown = diff !== null && diff < 0;
              const arrow = isUp ? '▲' : isDown ? '▼' : '▶';
              const arrowColor = isUp ? '#4ade80' : isDown ? '#f87171' : GOLD;
              const diffText = diff !== null ? ` (${isUp ? '+' : ''}${diff.toFixed(2)})` : '';
              return (
                <span
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 1.2rem',
                    borderRight: `1px solid #30363d`,
                  }}
                >
                  <span>{flag}</span>
                  <span style={{ color: GOLD, fontWeight: 700 }}>{label}</span>
                  <span style={{ color: '#e6edf3' }}>{rate.toFixed(2)}</span>
                  <span style={{ color: arrowColor, fontSize: '0.6rem' }}>
                    {arrow}{diffText}
                  </span>
                </span>
              );
            })}
            {/* IPC/BMV */}
            {ipc && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0 1.2rem',
                  borderRight: `1px solid #30363d`,
                  borderLeft: `2px solid ${GOLD}`,
                  marginLeft: '0.5rem',
                }}
              >
                <span style={{ color: GOLD, fontWeight: 700 }}>IPC BMV</span>
                <span style={{ color: '#e6edf3' }}>{ipc.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span style={{ color: ipc.change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>
                  {ipc.change >= 0 ? '▲' : '▼'} {ipc.change >= 0 ? '+' : ''}{ipc.change.toFixed(0)} ({ipc.changePct >= 0 ? '+' : ''}{ipc.changePct.toFixed(2)}%)
                </span>
              </span>
            )}
            {/* Petróleo WTI/Brent */}
            {oil && (
              <>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 1.2rem',
                    borderRight: `1px solid #30363d`,
                    borderLeft: `2px solid #f97316`,
                    marginLeft: '0.5rem',
                  }}
                >
                  <span>🛢️</span>
                  <span style={{ color: '#f97316', fontWeight: 700 }}>WTI</span>
                  <span style={{ color: '#e6edf3' }}>${oil.wti.price.toFixed(2)}</span>
                  <span style={{ color: oil.wti.change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>
                    {oil.wti.change >= 0 ? '▲' : '▼'} {oil.wti.change >= 0 ? '+' : ''}{oil.wti.change.toFixed(2)} ({oil.wti.changePct >= 0 ? '+' : ''}{oil.wti.changePct.toFixed(2)}%)
                  </span>
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 1.2rem',
                    borderRight: `1px solid #30363d`,
                  }}
                >
                  <span>🛢️</span>
                  <span style={{ color: '#f97316', fontWeight: 700 }}>BRENT</span>
                  <span style={{ color: '#e6edf3' }}>${oil.brent.price.toFixed(2)}</span>
                  <span style={{ color: oil.brent.change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>
                    {oil.brent.change >= 0 ? '▲' : '▼'} {oil.brent.change >= 0 ? '+' : ''}{oil.brent.change.toFixed(2)} ({oil.brent.changePct >= 0 ? '+' : ''}{oil.brent.changePct.toFixed(2)}%)
                  </span>
                </span>
              </>
            )}
            {/* Latam: ARS/MXN y COP/MXN */}
            {latam && (
              <>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 1.2rem',
                    borderRight: `1px solid #30363d`,
                    borderLeft: `2px solid #a78bfa`,
                    marginLeft: '0.5rem',
                  }}
                >
                  <span>🇦🇷</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>ARS/MXN</span>
                  <span style={{ color: '#e6edf3' }}>{latam.ARS_MXN.toFixed(4)}</span>
                  <span style={{ color: latam.ARS_MXN >= latam.ARS_MXN_prev ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>
                    {latam.ARS_MXN >= latam.ARS_MXN_prev ? '▲' : '▼'}
                  </span>
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 1.2rem',
                    borderRight: `1px solid #30363d`,
                  }}
                >
                  <span>🇨🇴</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>COP/MXN</span>
                  <span style={{ color: '#e6edf3' }}>{latam.COP_MXN.toFixed(5)}</span>
                  <span style={{ color: latam.COP_MXN >= latam.COP_MXN_prev ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>
                    {latam.COP_MXN >= latam.COP_MXN_prev ? '▲' : '▼'}
                  </span>
                </span>
              </>
            )}
            {/* Oro XAU/USD */}
            {gold && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0 1.2rem',
                  borderRight: `1px solid #30363d`,
                  borderLeft: `2px solid #fbbf24`,
                  marginLeft: '0.5rem',
                }}
              >
                <span>ORO</span>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>XAU/USD</span>
                <span style={{ color: '#e6edf3' }}>${gold.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span style={{ color: gold.change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>
                  {gold.change >= 0 ? '\u25b2' : '\u25bc'} {gold.change >= 0 ? '+' : ''}{gold.change.toFixed(2)} ({gold.changePct >= 0 ? '+' : ''}{gold.changePct.toFixed(2)}%)
                </span>
              </span>
            )}
            {/* Separador y fuente */}
            <span style={{ padding: '0 1.5rem', color: '#8b949e', borderRight: `1px solid #30363d` }}>
              TIPO DE CAMBIO REFERENCIAL · FUENTE: BCE/YAHOO
            </span>
            {/* Repetir para loop continuo */}
            {([
              { label: 'USD/MXN', cur: 'USD_MXN' as const, flag: '🇺🇸' },
              { label: 'EUR/MXN', cur: 'EUR_MXN' as const, flag: '🇪🇺' },
              { label: 'CAD/MXN', cur: 'CAD_MXN' as const, flag: '🇨🇦' },
              { label: 'GBP/MXN', cur: 'GBP_MXN' as const, flag: '🇬🇧' },
            ] as const).map(({ label, cur, flag }) => {
              const rate = divisas.rates[cur];
              const prev = divisas.prevRates?.[cur];
              const diff = prev ? rate - prev : null;
              const isUp = diff !== null && diff > 0;
              const isDown = diff !== null && diff < 0;
              const arrow = isUp ? '▲' : isDown ? '▼' : '▶';
              const arrowColor = isUp ? '#4ade80' : isDown ? '#f87171' : GOLD;
              const diffText = diff !== null ? ` (${isUp ? '+' : ''}${diff.toFixed(2)})` : '';
              return (
                <span
                  key={`${label}-2`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 1.2rem',
                    borderRight: `1px solid #30363d`,
                  }}
                >
                  <span>{flag}</span>
                  <span style={{ color: GOLD, fontWeight: 700 }}>{label}</span>
                  <span style={{ color: '#e6edf3' }}>{rate.toFixed(2)}</span>
                  <span style={{ color: arrowColor, fontSize: '0.6rem' }}>
                    {arrow}{diffText}
                  </span>
                </span>
              );
            })}
            {/* Petróleo WTI/Brent (loop 2) */}
            {oil && (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0 1.2rem', borderRight: `1px solid #30363d`, borderLeft: `2px solid #f97316`, marginLeft: '0.5rem' }}>
                  <span>🛢️</span>
                  <span style={{ color: '#f97316', fontWeight: 700 }}>WTI</span>
                  <span style={{ color: '#e6edf3' }}>${oil.wti.price.toFixed(2)}</span>
                  <span style={{ color: oil.wti.change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>{oil.wti.change >= 0 ? '▲' : '▼'} {oil.wti.change >= 0 ? '+' : ''}{oil.wti.change.toFixed(2)}%</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0 1.2rem', borderRight: `1px solid #30363d` }}>
                  <span>🛢️</span>
                  <span style={{ color: '#f97316', fontWeight: 700 }}>BRENT</span>
                  <span style={{ color: '#e6edf3' }}>${oil.brent.price.toFixed(2)}</span>
                  <span style={{ color: oil.brent.change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>{oil.brent.change >= 0 ? '▲' : '▼'} {oil.brent.change >= 0 ? '+' : ''}{oil.brent.change.toFixed(2)}%</span>
                </span>
              </>
            )}
            {/* Latam ARS/COP (loop 2) */}
            {latam && (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0 1.2rem', borderRight: `1px solid #30363d`, borderLeft: `2px solid #a78bfa`, marginLeft: '0.5rem' }}>
                  <span>🇦🇷</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>ARS/MXN</span>
                  <span style={{ color: '#e6edf3' }}>{latam.ARS_MXN.toFixed(4)}</span>
                  <span style={{ color: latam.ARS_MXN >= latam.ARS_MXN_prev ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>{latam.ARS_MXN >= latam.ARS_MXN_prev ? '▲' : '▼'}</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0 1.2rem', borderRight: `1px solid #30363d` }}>
                  <span>🇨🇴</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>COP/MXN</span>
                  <span style={{ color: '#e6edf3' }}>{latam.COP_MXN.toFixed(5)}</span>
                  <span style={{ color: latam.COP_MXN >= latam.COP_MXN_prev ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>{latam.COP_MXN >= latam.COP_MXN_prev ? '\u25b2' : '\u25bc'}</span>
                </span>
              </>
            )}
            {/* Oro XAU/USD (loop 2) */}
            {gold && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0 1.2rem', borderRight: `1px solid #30363d`, borderLeft: `2px solid #fbbf24`, marginLeft: '0.5rem' }}>
                <span>ORO</span>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>XAU/USD</span>
                <span style={{ color: '#e6edf3' }}>${gold.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span style={{ color: gold.change >= 0 ? '#4ade80' : '#f87171', fontSize: '0.6rem' }}>{gold.change >= 0 ? '\u25b2' : '\u25bc'} {gold.change >= 0 ? '+' : ''}{gold.change.toFixed(2)}%</span>
              </span>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'inline-block',
              padding: '0 1.5rem',
              color: '#8b949e',
              animation: 'marquee 20s linear infinite',
            }}
          >
            CARGANDO COTIZACIONES · USD/MXN · EUR/MXN · CAD/MXN · GBP/MXN &nbsp;&nbsp;
            CARGANDO COTIZACIONES · USD/MXN · EUR/MXN · CAD/MXN · GBP/MXN
          </div>
        )}
      </div>
      {/* CABECERA PRINCIPAL */}
      <header
        style={{
          borderBottom: `4px solid ${INK}`,
          backgroundColor: PAPER,
          padding: '1.5rem 2rem 0.75rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Línea de información superior */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${INK}`,
              paddingBottom: '0.4rem',
              marginBottom: '0.75rem',
              fontSize: '0.65rem',
              fontFamily: SANS_SUBHEAD,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <span>Coyoacán · Benito Juárez · Xochimilco · Álvaro Obregón · Milpa Alta · Iztacalco · Centro Histórico</span>
            <span>Edición N.º {editionNum}</span>
          </div>

          {/* Título gótico central */}
          <div
            style={{
              textAlign: 'center',
              borderBottom: `2px solid ${INK}`,
              paddingBottom: '0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            <h1
              style={{
                fontFamily: GOTHIC,
                fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
                lineHeight: 1,
                color: INK,
                margin: 0,
              }}
            >
              Diario Coyoacán
            </h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.5rem',
                fontSize: '0.65rem',
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              <span>Periodismo local · Cultura · Gastronomía · Comunidad</span>
              <span style={{ textTransform: 'capitalize' }}>{dateFormatted}</span>
              {weather && (
                <span style={{ color: WINE, fontWeight: 600 }}>
                  {weather.morning.icon} {weather.morning.temp}°C &middot; {weather.afternoon.icon} {weather.afternoon.temp}°C &middot; {weather.night.icon} {weather.night.temp}°C &middot; <span title="Índice de Rayos UV (hora pico)">UV {weather.afternoon.uvIndex} — {weather.afternoon.uvLabel}</span>
                </span>
              )}
              <span>Precio: Gratuito</span>
            </div>
          </div>

          {/* Barra de navegación */}
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              paddingTop: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.7rem', fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <a href="/" style={{ color: INK, textDecoration: 'none', borderBottom: `2px solid ${WINE}` }}>Portada</a>
              <a href="/noticias" style={{ color: INK, textDecoration: 'none' }}>Noticias</a>
              <a href="/hemeroteca" style={{ color: INK, textDecoration: 'none' }}>Hemeroteca</a>
              <a href="/hospedaje-mundial-2026" style={{ color: INK, textDecoration: 'none' }}>Mundial 2026</a>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <a
                href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.35rem 1rem',
                  backgroundColor: WINE,
                  color: PAPER,
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                Reservaciones
              </a>
              <a
                href="https://superanfitrion.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: INK, textDecoration: 'none', fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}
              >
                Inicio
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ── CUERPO PRINCIPAL: DOS COLUMNAS ───────────────────────────────── */}
      <main
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
        }}
        className="newspaper-grid"
      >
        {/* ── COLUMNA IZQUIERDA: ARTÍCULO PRINCIPAL ─────────────────────── */}
        {/* ── COLUMNA IZQUIERDA: PORTADA O ARTÍCULO ─────────────────────── */}
        {isPortadaMode ? (
          /* ── MODO PORTADA: 3 TARJETAS DE PRIMERA PLANA ────────────────── */
          <section style={{ minWidth: 0 }}>
            {/* Línea divisoria de sección */}
            <div style={{ borderBottom: `4px double ${INK}`, marginBottom: '1.5rem', paddingBottom: '0.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span style={{ fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem', color: WINE }}>
                Edición del Día
              </span>
              <span style={{ fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.65rem', color: INK_MUTED }}>
                {dateFormatted}
              </span>
            </div>

            {portadaArticles.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', border: `2px dashed ${INK}` }}>
                <p style={{ fontFamily: SERIF_BODY, color: INK_MUTED, fontSize: '1rem' }}>
                  La redacción está preparando la edición de hoy. Vuelve pronto.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {portadaArticles.map((art, idx) => {
                  const isMain = idx === 0;
                  const artSummary = art.summary.length > 180
                    ? art.summary.substring(0, 177) + '…'
                    : art.summary;
                  const artTitle = art.title.length > 90
                    ? art.title.substring(0, 87) + '…'
                    : art.title;

                  return (
                    <div
                      key={art.slug}
                      style={{
                        borderBottom: `2px solid ${INK}`,
                        paddingBottom: isMain ? '2rem' : '1.25rem',
                        marginBottom: isMain ? '2rem' : '1.25rem',
                        display: isMain ? 'block' : 'grid',
                        gridTemplateColumns: isMain ? undefined : '1fr 3fr',
                        gap: isMain ? undefined : '1rem',
                        alignItems: isMain ? undefined : 'start',
                      }}
                    >
                      {/* Imagen (solo artículo principal) */}
                      {isMain && art.heroImage && (
                        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                          <div style={{ position: 'absolute', inset: 0, backgroundColor: INK, transform: 'translate(4px,4px)', zIndex: 0 }} />
                          <img
                            src={art.heroImage}
                            alt={artTitle}
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: '320px',
                              objectFit: 'cover',
                              border: `3px solid ${INK}`,
                              filter: 'grayscale(10%)',
                              display: 'block',
                              zIndex: 1,
                            }}
                          />
                          <div style={{
                            position: 'absolute', top: '0.75rem', left: '0.75rem',
                            backgroundColor: WINE, color: PAPER,
                            padding: '0.2rem 0.6rem',
                            fontFamily: SANS_SUBHEAD, textTransform: 'uppercase',
                            fontSize: '0.6rem', letterSpacing: '0.12em',
                            border: `1.5px solid ${INK}`, zIndex: 2,
                          }}>
                            {art.category}
                          </div>
                        </div>
                      )}

                      {/* Thumbnail pequeño para artículos 2 y 3 */}
                      {!isMain && art.heroImage && (
                        <img
                          src={art.heroImage}
                          alt={artTitle}
                          style={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover',
                            border: `2px solid ${INK}`,
                            filter: 'grayscale(20%)',
                            display: 'block',
                          }}
                        />
                      )}

                      {/* Contenido textual */}
                      <div>
                        {/* Categoría */}
                        <span style={{
                          fontFamily: SANS_SUBHEAD, textTransform: 'uppercase',
                          fontSize: '0.6rem', letterSpacing: '0.15em', color: WINE,
                          display: 'block', marginBottom: '0.3rem',
                        }}>
                          {art.category}
                        </span>

                        {/* Titular */}
                        <h2 style={{
                          fontFamily: SERIF_HEADLINE,
                          fontSize: isMain ? 'clamp(1.4rem, 3.5vw, 2.4rem)' : 'clamp(1rem, 2.5vw, 1.3rem)',
                          color: INK,
                          fontWeight: 700,
                          lineHeight: 1.2,
                          marginBottom: '0.5rem',
                        }}>
                          {artTitle}
                        </h2>

                        {/* Lead / Sumario */}
                        <p style={{
                          fontFamily: SERIF_BODY,
                          fontSize: isMain ? '1rem' : '0.875rem',
                          fontStyle: 'italic',
                          color: INK_LIGHT,
                          lineHeight: 1.6,
                          marginBottom: '0.75rem',
                        }}>
                          {artSummary}
                        </p>

                        {/* Firma y botón */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{
                            fontFamily: SANS_SUBHEAD, textTransform: 'uppercase',
                            fontSize: '0.6rem', letterSpacing: '0.1em', color: INK_MUTED,
                          }}>
                            Redacción · {formatDateEs(art.date).split(',')[0]}
                          </span>
                          <a
                            href={`/diario?slug=${art.slug}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.35rem 0.85rem',
                              backgroundColor: INK,
                              color: PAPER,
                              fontFamily: SANS_SUBHEAD,
                              textTransform: 'uppercase',
                              fontSize: '0.65rem',
                              letterSpacing: '0.1em',
                              textDecoration: 'none',
                              border: `2px solid ${INK}`,
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = WINE; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = INK; }}
                          >
                            Leer más →
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Enlace a hemeroteca */}
                <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                  <a
                    href="/hemeroteca"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.6rem 1.5rem',
                      backgroundColor: PAPER,
                      color: INK,
                      fontFamily: SANS_SUBHEAD,
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textDecoration: 'none',
                      border: `2px solid ${INK}`,
                      boxShadow: `3px 3px 0 ${INK}`,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = INK; (e.currentTarget as HTMLAnchorElement).style.color = PAPER; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = PAPER; (e.currentTarget as HTMLAnchorElement).style.color = INK; }}
                  >
                    Ver Hemeroteca Completa →
                  </a>
                </div>

                {/* Anuncio de primera plana en modo portada */}
                <div style={{
                  marginTop: '2.5rem',
                  padding: '2rem 2.5rem',
                  backgroundColor: INK,
                  color: PAPER,
                  border: `4px solid ${WINE}`,
                  boxShadow: `6px 6px 0px 0px ${WINE}`,
                  textAlign: 'center',
                }}>
                  <p style={{ fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.18em', color: GOLD, marginBottom: '0.75rem' }}>
                    — Anuncio de Primera Plana —
                  </p>
                  <h3 style={{ fontFamily: SERIF_HEADLINE, fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: PAPER, fontWeight: 700, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                    Hospédate en el corazón de Coyoacán
                  </h3>
                  <p style={{ fontFamily: SERIF_BODY, fontSize: '0.9rem', color: '#d4c4a8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Alojamientos auténticos en el barrio más bonito de México. Reserva directa sin comisiones. Anfitriones locales que conocen cada rincón de Coyoacán.
                  </p>
                  <a
                    href="https://superanfitrion.com.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.75rem 2rem',
                      backgroundColor: WINE,
                      color: PAPER,
                      fontFamily: SANS_SUBHEAD,
                      textTransform: 'uppercase',
                      fontSize: '0.8rem',
                      letterSpacing: '0.12em',
                      textDecoration: 'none',
                      border: `2px solid ${PAPER}`,
                      boxShadow: `3px 3px 0px 0px ${PAPER}`,
                    }}
                  >
                    Ver disponibilidad →
                  </a>
                </div>
              </div>
            )}
          </section>
        ) : (
          /* ── MODO ARTÍCULO INDIVIDUAL: contenido completo ──────────────── */
          <article style={{ minWidth: 0 }}>
          {/* Categoría + Titular */}
          <div style={{ borderBottom: `3px double ${INK}`, paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <span
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                color: WINE,
              }}
            >
              {safeArticle?.category}
            </span>
            <h2
              style={{
                fontFamily: SERIF_HEADLINE,
                fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                color: INK,
                fontWeight: 700,
                lineHeight: 1.2,
                marginTop: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              {displayTitle}
            </h2>
            <p
              style={{
                fontFamily: SERIF_BODY,
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: INK_LIGHT,
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}
            >
              {displaySummary}
            </p>
            <p
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: WINE,
              }}
            >
              Por la Redacción del Diario Coyoacán &bull; {dateFormatted}
            </p>
          </div>
          {/* Imagen hero */}
          <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: INK,
                transform: 'translate(5px, 5px)',
                zIndex: 0,
              }}
            />
            <img
              src={safeArticle?.heroImage}
              alt={`Fotografía editorial: ${safeArticle?.title}`}
              style={{
                position: 'relative',
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                border: `3px solid ${INK}`,
                filter: 'grayscale(12%)',
                display: 'block',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: WINE,
                color: PAPER,
                padding: '0.25rem 0.75rem',
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                border: `2px solid ${INK}`,
                transform: 'rotate(2deg)',
                zIndex: 2,
              }}
            >
              {safeArticle?.category}
            </div>
          </div>
          {/* Primer párrafo con LETRA CAPITAL */}
          {firstParagraph && (
            <p
              style={{
                fontFamily: SERIF_BODY,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'justify',
                marginBottom: '1.25rem',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  float: 'left',
                  fontFamily: SERIF_HEADLINE,
                  fontSize: '5rem',
                  lineHeight: '0.75',
                  color: WINE,
                  fontWeight: 700,
                  marginRight: '0.15rem',
                  marginTop: '0.1rem',
                }}
              >
                {firstParagraph.charAt(0)}
              </span>
              {firstParagraph.substring(1)}
            </p>
          )}
          {/* Párrafos 2 y 3 */}
          {beforePullQuote.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: SERIF_BODY,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'justify',
                marginBottom: '1.25rem',
              }}
            >
              {p}
            </p>
          ))}
          {/* PULL QUOTE con líneas dobles */}
          {pullQuote && (
            <blockquote
              style={{
                margin: '2rem 0',
                padding: '1.25rem 2rem',
                borderTop: `3px double ${INK}`,
                borderBottom: `3px double ${INK}`,
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: SERIF_HEADLINE,
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontStyle: 'italic',
                  color: INK,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                "{pullQuote}"
              </p>
            </blockquote>
          )}
          {/* Párrafos restantes */}
          {afterPullQuote.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: SERIF_BODY,
                fontSize: '1rem',
                lineHeight: 1.8,
                textAlign: 'justify',
                marginBottom: '1.25rem',
              }}
            >
              {p}
            </p>
          ))}
          {/* Botón volver a portada */}
          <div style={{ marginBottom: '1.5rem' }}>
            <a
              href="/diario"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 1rem',
                backgroundColor: PAPER,
                color: INK,
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                border: `2px solid ${INK}`,
              }}
            >
              ← Volver a Portada
            </a>
          </div>
          {/* Botones de compartir */}
          <div
            style={{
              borderTop: `2px solid ${INK}`,
              borderBottom: `2px solid ${INK}`,
              padding: '1rem 0',
              margin: '2rem 0',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: INK,
              }}
            >
              Compartir:
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(safeArticle?.title + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                backgroundColor: '#25D366',
                color: '#fff',
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                border: `2px solid ${INK}`,
              }}
            >
              <Share2 size={12} aria-hidden="true" /> WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                backgroundColor: '#1877F2',
                color: '#fff',
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                border: `2px solid ${INK}`,
              }}
            >
              <Facebook size={12} aria-hidden="true" /> Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(safeArticle?.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                backgroundColor: INK,
                color: PAPER,
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                border: `2px solid ${INK}`,
              }}
            >
              <Share2 size={12} aria-hidden="true" /> X / Twitter
            </a>
          </div>
          {/* ── ANUNCIO DE PRIMERA PLANA ────────────────────────────────── */}
          <div
            style={{
              margin: '2.5rem 0',
              padding: '2rem 2.5rem',
              backgroundColor: INK,
              color: PAPER,
              border: `4px solid ${WINE}`,
              boxShadow: `6px 6px 0px 0px ${WINE}`,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                color: GOLD,
                marginBottom: '0.75rem',
              }}
            >
              — Anuncio de Primera Plana —
            </p>
            <h3
              style={{
                fontFamily: SERIF_HEADLINE,
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                color: PAPER,
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: '0.75rem',
              }}
            >
              {ad.headline}
            </h3>
            <p
              style={{
                fontFamily: SERIF_BODY,
                fontSize: '0.9rem',
                color: '#d4c4a8',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {ad.body}
            </p>
            <a
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: WINE,
                color: PAPER,
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                border: `2px solid ${PAPER}`,
                boxShadow: `3px 3px 0px 0px ${PAPER}`,
              }}
            >
              {ad.cta}
            </a>
          </div>
          {/* Newsletter */}
          <div
            style={{
              margin: '2rem 0',
              padding: '1.5rem',
              border: `3px solid ${INK}`,
              backgroundColor: PAPER,
            }}
          >
            <h3
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: '0.75rem',
                color: WINE,
                marginBottom: '0.5rem',
              }}
            >
              Recibe el Diario cada mañana
            </h3>
            <p
              style={{
                fontFamily: SERIF_BODY,
                fontSize: '0.9rem',
                color: INK,
                marginBottom: '1rem',
                lineHeight: 1.6,
              }}
            >
              Suscríbete y recibe las noticias de Coyoacán directamente en tu correo, antes de que salga el sol.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) subscribeMutation.mutate({ email });
              }}
              style={{ display: 'flex', gap: '0.5rem' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: `2px solid ${INK}`,
                  backgroundColor: '#fff',
                  fontFamily: SERIF_BODY,
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: WINE,
                  color: PAPER,
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  border: `2px solid ${INK}`,
                  cursor: 'pointer',
                  opacity: subscribeMutation.isPending ? 0.6 : 1,
                }}
              >
                {subscribeMutation.isPending ? '…' : 'Suscribir'}
              </button>
            </form>
          </div>
        </article>
        )}

        {/* ── COLUMNA DERECHA: NOTAS SECUNDARIAS ────────────────────────── */}
        <aside style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }} className="article-aside">

          {/* Agenda del barrio */}
          <div style={{ border: `3px solid ${INK}` }}>
            <div style={{ padding: '0.5rem 1rem', backgroundColor: INK }}>
              <h3
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontSize: '0.7rem',
                  color: PAPER,
                  margin: 0,
                }}
              >
                Agenda del Barrio
              </h3>
            </div>
            <div style={{ padding: '1rem' }}>
              <p
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: WINE,
                  marginBottom: '0.75rem',
                }}
              >
                Coyoacán &bull; {dateFormatted.split(',')[0]}
              </p>
              {[
                { title: 'Mercado de Artesanías', desc: 'Jardín Centenario · 10:00–20:00 hrs · Entrada libre' },
                { title: 'Museo Frida Kahlo', desc: 'Londres 247, Del Carmen · Mar–Dom 10:00–17:30 hrs' },
                { title: 'Cineteca Nacional', desc: 'Av. México-Coyoacán 389 · Cartelera en cineteca.mx' },
                { title: 'Mercado de Coyoacán', desc: 'Ignacio Allende s/n · Lun–Dom 7:00–18:00 hrs' },
              ].map((item, i, arr) => (
                <div
                  key={i}
                  style={{
                    borderBottom: i < arr.length - 1 ? `1px dashed ${INK}` : 'none',
                    paddingBottom: '0.6rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <strong style={{ fontFamily: SANS_SUBHEAD, textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>
                    {item.title}
                  </strong>
                  <p style={{ fontFamily: SERIF_BODY, fontSize: '0.8rem', color: INK_MUTED, margin: '0.15rem 0 0' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Efeméride del barrio */}
          <div style={{ border: `3px solid ${INK}`, backgroundColor: INK, color: PAPER }}>
            <div style={{ padding: '0.5rem 1rem', borderBottom: `2px solid ${WINE}` }}>
              <h3
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontSize: '0.7rem',
                  color: GOLD,
                  margin: 0,
                }}
              >
                Efeméride del Barrio
              </h3>
            </div>
            <div style={{ padding: '1rem' }}>
              <p
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: WINE,
                  marginBottom: '0.5rem',
                }}
              >
                Hoy en la historia de Coyoacán
              </p>
              <p
                style={{
                  fontFamily: SERIF_BODY,
                  fontSize: '0.85rem',
                  color: '#d4c4a8',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                En 1524, Hernán Cortés estableció en Coyoacán la primera capital de la Nueva España, antes de que la Ciudad de México fuera fundada sobre las ruinas de Tenochtitlan. El barrio fue sede del primer ayuntamiento del continente americano.
              </p>
            </div>
          </div>

          {/* Artículos recientes */}
          {recentArticles.length > 0 && (
            <div style={{ border: `3px solid ${INK}` }}>
              <div style={{ padding: '0.5rem 1rem', backgroundColor: WINE }}>
                <h3
                  style={{
                    fontFamily: SANS_SUBHEAD,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontSize: '0.7rem',
                    color: PAPER,
                    margin: 0,
                  }}
                >
                  Ediciones Anteriores
                </h3>
              </div>
              {recentArticles.map((art, i) => (
                <a
                  key={art.slug}
                  href={`/diario?slug=${art.slug}`}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderBottom: i < recentArticles.length - 1 ? `1px solid ${INK}` : 'none',
                    textDecoration: 'none',
                    backgroundColor: PAPER,
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PAPER_DARK)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PAPER)}
                >
                  <p
                    style={{
                      fontFamily: SANS_SUBHEAD,
                      textTransform: 'uppercase',
                      fontSize: '0.6rem',
                      letterSpacing: '0.12em',
                      color: WINE,
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {art.category}
                  </p>
                  <p
                    style={{
                      fontFamily: SERIF_HEADLINE,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: INK,
                      lineHeight: 1.3,
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {art.title.length > 70 ? art.title.substring(0, 67) + '…' : art.title}
                  </p>
                  <p style={{ fontFamily: SERIF_BODY, fontSize: '0.75rem', color: INK_MUTED, margin: 0 }}>
                    {art.date}
                  </p>
                </a>
              ))}
              <div style={{ padding: '0.6rem 1rem', borderTop: `2px solid ${INK}` }}>
                <a
                  href="/hemeroteca"
                  style={{
                    fontFamily: SANS_SUBHEAD,
                    textTransform: 'uppercase',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: WINE,
                    textDecoration: 'none',
                  }}
                >
                  Ver hemeroteca completa →
                </a>
              </div>
            </div>
          )}

          {/* Mini anuncio lateral */}
          <div
            style={{
              padding: '1.25rem',
              textAlign: 'center',
              border: `3px solid ${WINE}`,
              backgroundColor: PAPER,
            }}
          >
            <p
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: WINE,
                marginBottom: '0.5rem',
              }}
            >
              Hospedaje en Coyoacán
            </p>
            <p
              style={{
                fontFamily: SERIF_BODY,
                fontSize: '0.85rem',
                color: INK,
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              Alojamientos auténticos en el barrio más bonito de México. Anfitriones locales. Sin comisiones.
            </p>
            <a
              href="https://superanfitrion.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '0.6rem',
                backgroundColor: WINE,
                color: PAPER,
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
              }}
            >
              Ver Alojamientos →
            </a>
          </div>
        </aside>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: INK,
          color: PAPER,
          borderTop: `6px solid ${WINE}`,
          marginTop: '3rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>
          {/* Cabecera del footer */}
          <div
            style={{
              textAlign: 'center',
              borderBottom: `2px solid ${WINE}`,
              paddingBottom: '2rem',
              marginBottom: '2.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: GOTHIC,
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                color: PAPER,
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}
            >
              Diario Coyoacán
            </h2>
            <p
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: '0.65rem',
                color: GOLD,
              }}
            >
              Periodismo local · Cultura · Gastronomía · Comunidad
            </p>
          </div>

          {/* Columnas del directorio */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              marginBottom: '2.5rem',
            }}
            className="footer-grid"
          >
            {/* Diario */}
            <div>
              <h4
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontSize: '0.65rem',
                  color: WINE,
                  borderBottom: `1px solid ${WINE}`,
                  paddingBottom: '0.4rem',
                  marginBottom: '0.75rem',
                }}
              >
                Diario Coyoacán
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { label: 'Portada', href: '/' },
                  { label: 'Noticias', href: '/noticias' },
                  { label: 'Hemeroteca', href: '/hemeroteca' },
                  { label: 'Hospedaje Mundial 2026', href: '/hospedaje-mundial-2026' },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} style={{ fontFamily: SERIF_BODY, fontSize: '0.8rem', color: '#d4c4a8', textDecoration: 'none' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hospedaje */}
            <div>
              <h4
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontSize: '0.65rem',
                  color: WINE,
                  borderBottom: `1px solid ${WINE}`,
                  paddingBottom: '0.4rem',
                  marginBottom: '0.75rem',
                }}
              >
                Hospedaje
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { label: 'SúperAnfitrión', href: 'https://superanfitrion.com.mx' },
                  { label: 'Alojamientos', href: 'https://superanfitrion.com.mx/alojamientos' },
                  { label: 'Para Estudiantes', href: 'https://superanfitrion.com.mx/estudiantes' },
                  { label: 'Nómadas Digitales', href: 'https://superanfitrion.com.mx/nomadas' },
                  { label: 'Renta Mensual', href: 'https://superanfitrion.com.mx/renta-mensual' },
                  { label: 'Mundial 2026', href: 'https://superanfitrion.com.mx/mundial-2026' },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SERIF_BODY, fontSize: '0.8rem', color: '#d4c4a8', textDecoration: 'none' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* El Barrio */}
            <div>
              <h4
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontSize: '0.65rem',
                  color: WINE,
                  borderBottom: `1px solid ${WINE}`,
                  paddingBottom: '0.4rem',
                  marginBottom: '0.75rem',
                }}
              >
                El Barrio
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { label: 'Coyoacán', href: 'https://superanfitrion.com.mx/coyoacan' },
                  { label: 'Pet-Friendly', href: 'https://superanfitrion.com.mx/pet-friendly' },
                  { label: 'Blog', href: 'https://superanfitrion.com.mx/blog' },
                  { label: 'Ayuda', href: 'https://superanfitrion.com.mx/ayuda' },
                  { label: 'Política Mascotas', href: 'https://superanfitrion.com.mx/politica-mascotas' },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: SERIF_BODY, fontSize: '0.8rem', color: '#d4c4a8', textDecoration: 'none' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto y Redes */}
            <div>
              <h4
                style={{
                  fontFamily: SANS_SUBHEAD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontSize: '0.65rem',
                  color: WINE,
                  borderBottom: `1px solid ${WINE}`,
                  paddingBottom: '0.4rem',
                  marginBottom: '0.75rem',
                }}
              >
                Contacto
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>
                  <a
                    href="https://wa.me/5215511427252"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: SERIF_BODY, fontSize: '0.8rem', color: '#d4c4a8', textDecoration: 'none' }}
                  >
                    <Phone size={12} aria-hidden="true" /> 55 1142 7252
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:superanfitrioncoyoacan@gmail.com"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: SERIF_BODY, fontSize: '0.8rem', color: '#d4c4a8', textDecoration: 'none' }}
                  >
                    <Mail size={12} aria-hidden="true" /> superanfitrioncoyoacan@gmail.com
                  </a>
                </li>
              </ul>
              {/* Redes sociales */}
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
                {[
                  {
                    href: 'https://www.facebook.com/SuperAnfitrionCoyoacan',
                    label: 'Facebook de SúperAnfitrión Coyoacán',
                    icon: <Facebook size={16} aria-hidden="true" />,
                  },
                  {
                    href: 'https://www.instagram.com/superanfitrioncoyo/',
                    label: 'Instagram de SúperAnfitrión Coyoacán',
                    icon: <Instagram size={16} aria-hidden="true" />,
                  },
                  {
                    href: 'https://www.youtube.com/@SuperAnfitrioncoyo',
                    label: 'YouTube de SúperAnfitrión Coyoacán',
                    icon: <Youtube size={16} aria-hidden="true" />,
                  },
                  {
                    href: 'https://wa.me/5215511427252',
                    label: 'WhatsApp de SúperAnfitrión Coyoacán',
                    icon: (
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.4rem',
                      border: `1px solid ${WINE}`,
                      color: PAPER,
                      textDecoration: 'none',
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Pie de créditos */}
          <div
            style={{
              borderTop: `1px solid ${WINE}`,
              paddingTop: '1.5rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: SANS_SUBHEAD,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontSize: '0.65rem',
                color: INK_MUTED,
              }}
            >
              © {new Date().getFullYear()} Diario Coyoacán · Publicado por{' '}
              <a
                href="https://superanfitrion.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#d4c4a8', textDecoration: 'underline' }}
              >
                SúperAnfitrión Coyoacán
              </a>
              {' '}·{' '}
              <a
                href="https://diario.superanfitrion.com.mx"
                style={{ color: '#d4c4a8', textDecoration: 'underline' }}
              >
                diario.superanfitrion.com.mx
              </a>
            </p>
            <p style={{ fontFamily: SERIF_BODY, fontSize: '0.7rem', color: '#4a3a2a', marginTop: '0.25rem' }}>
              Periodismo local independiente · Coyoacán, Ciudad de México
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Estilos globales para este componente */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (min-width: 768px) {
          .newspaper-grid {
            grid-template-columns: 8fr 4fr !important;
          }
          .footer-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
