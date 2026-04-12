import { Helmet } from 'react-helmet-async';
import { trpc } from "@/lib/trpc";
import { Link, useRoute } from "wouter";
import { Calendar, ArrowLeft, Share2, MapPin } from "lucide-react";
import { useEffect } from 'react';

// Colores del periódico
const INK = '#1A1A1A';
const RUST = '#722F37';
const NEWSPRINT = '#F5F0E8';

export default function NewsArticleDetail() {
  const [, params] = useRoute("/noticias/:slug");
  const slug = params?.slug || '';

  const { data: article, isLoading, error } = trpc.newsArticles.bySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title || 'Diario Coyoacán',
          text: article?.summary || '',
          url: shareUrl,
        });
      } catch (e) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copiado al portapapeles');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-newsprint flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ink mx-auto mb-4"></div>
          <p className="font-subhead text-ink uppercase tracking-widest text-sm">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-newsprint flex items-center justify-center">
        <div className="text-center bg-white border-4 border-ink p-12 max-w-md" style={{ boxShadow: '8px 8px 0px 0px #1A1A1A' }}>
          <h2 className="text-3xl font-headline mb-4">Artículo no encontrado</h2>
          <p className="font-body text-gray-600 mb-6">La edición que buscas no existe o fue retirada del archivo.</p>
          <Link href="/noticias" className="inline-block px-6 py-3 bg-rust text-white font-subhead uppercase border-2 border-ink hover:bg-ink transition-colors">
            Volver al Archivo
          </Link>
        </div>
      </div>
    );
  }

  // Parse markdown content into sections
  const contentSections = parseContent(article.content || '');

  return (
    <div className="min-h-screen bg-newsprint text-ink font-body selection:bg-rust selection:text-white">
      <Helmet>
        <title>{article.title} | Diario Coyoacán</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={`${article.category}, Coyoacán, CDMX, ${article.title}, SúperAnfitrión, hospedaje Coyoacán`} />
        <meta name="author" content="Diario Coyoacán" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://diario.superanfitrion.com.mx/noticias/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        {article.heroImage && <meta property="og:image" content={article.heroImage} />}
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        {article.heroImage && <meta name="twitter:image" content={article.heroImage} />}
        <link rel="canonical" href={`https://diario.superanfitrion.com.mx/noticias/${article.slug}`} />
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
            mainEntityOfPage: `https://diario.superanfitrion.com.mx/noticias/${article.slug}`,
            articleSection: article.category,
            inLanguage: 'es-MX',
          })}
        </script>
      </Helmet>

      {/* Marquee */}
      <div className="bg-ink text-newsprint py-2 overflow-hidden whitespace-nowrap border-b-4 border-rust">
        <div className="animate-marquee inline-block font-subhead uppercase tracking-widest text-sm">
          HOY EN COYOACÁN: {article.title?.toUpperCase().slice(0, 80)}… • 
          HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX • 
          DESCUBRE LOS MEJORES LUGARES DE LA CDMX • 
          HOY EN COYOACÁN: {article.title?.toUpperCase().slice(0, 80)}… • 
          HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX •
        </div>
      </div>

      {/* Header */}
      <header className="border-b-4 border-ink p-4 md:p-8 bg-newsprint sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/diario">
            <div className="cursor-pointer">
              <h1 className="text-4xl md:text-6xl font-headline leading-none">Diario Coyoacán</h1>
              <p className="font-subhead text-sm uppercase tracking-widest mt-1 text-rust">
                {article.category} • {article.date}
              </p>
            </div>
          </Link>
          <div className="flex gap-3 items-center flex-wrap justify-center">
            <Link href="/diario" className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors">
              Portada
            </Link>
            <Link href="/noticias" className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors">
              Noticias
            </Link>
            <a
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-rust text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-ink transition-colors shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]"
            >
              Reservaciones
            </a>
          </div>
        </div>
      </header>

      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/noticias" className="inline-flex items-center gap-2 font-subhead uppercase text-sm text-rust hover:text-ink transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Archivo
        </Link>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-rust text-white px-4 py-2 font-subhead uppercase text-sm border-2 border-ink shadow-[4px_4px_0px_0px_#1A1A1A]">
            {article.category}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-headline leading-tight mb-6">
          {article.title}
        </h2>

        {/* Summary */}
        <p className="text-xl md:text-2xl font-body italic text-gray-700 border-l-4 border-rust pl-6 py-2 mb-8">
          "{article.summary}"
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm mb-8 pb-4 border-b-2 border-ink">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rust" />
            <span className="font-mono uppercase tracking-wider">{article.date}</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="font-subhead uppercase">Redacción Diario Coyoacán</span>
        </div>

        {/* Hero Image */}
        {article.heroImage && (
          <div className="relative group mb-10">
            <div className="absolute inset-0 bg-ink translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
            <img
              src={article.heroImage}
              alt={article.title}
              className="relative w-full h-[400px] md:h-[500px] object-cover border-4 border-ink"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg prose-headings:font-headline prose-p:font-body max-w-none">
          {contentSections.map((section, idx) => (
            <div key={idx} className="mb-8">
              {section.heading && (
                <h3 className="text-2xl font-bold mb-4 uppercase font-subhead border-b-2 border-ink inline-block pb-1">
                  {section.heading}
                </h3>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-lg leading-relaxed text-justify mb-4" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          ))}
        </div>

        {/* Share Button */}
        <div className="mt-12 mb-8 flex justify-center">
          <button
            onClick={handleShare}
            className="px-8 py-4 bg-ink text-newsprint font-subhead uppercase tracking-wider border-2 border-ink hover:bg-rust transition-colors flex items-center gap-3 shadow-[6px_6px_0px_0px_#722F37] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#722F37]"
          >
            <Share2 className="w-5 h-5" /> Compartir este artículo
          </button>
        </div>

        {/* CTA Hospedaje */}
        <div className="bg-rust text-white border-4 border-ink p-8 mt-8 mb-8" style={{ boxShadow: '8px 8px 0px 0px #1A1A1A' }}>
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-headline mb-3">¿Vienes a la CDMX?</h3>
              <p className="font-body mb-4">
                Hospédate en el corazón de Coyoacán con SúperAnfitrión. Departamentos completos a pasos del centro histórico, el Jardín Centenario y los mejores cafés del barrio.
              </p>
              <a
                href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white text-ink font-subhead uppercase border-2 border-ink hover:bg-newsprint transition-colors shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                Ver Alojamientos Disponibles
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-newsprint py-12 mt-12 border-t-8 border-rust">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-headline mb-4">Diario Coyoacán</h2>
          <p className="font-subhead uppercase tracking-widest text-sm opacity-70 mb-8">
            Periodismo local • Cultura • Gastronomía
          </p>
          <div className="border-t border-newsprint/30 pt-6 mt-6">
            <p className="text-xs font-mono opacity-50">
              © 2026 Diario Coyoacán. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper: parse markdown-like content into sections
interface ContentSection {
  heading?: string;
  paragraphs: string[];
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

    // Bold text conversion
    let processed = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links
    processed = processed.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#722F37;text-decoration:underline">$1</a>');

    current.paragraphs.push(processed);
  }

  if (current.heading || current.paragraphs.length > 0) {
    sections.push(current);
  }

  return sections;
}
