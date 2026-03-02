import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';

/**
 * Página principal que redirige automáticamente al Diario Coyoacán
 * Esta es una subpágina de superanfitrion.com.mx
 */
export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirigir automáticamente a /diario
    setLocation('/diario');
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-newsprint">
      <Helmet>
        <title>Diario Coyoacán - Noticias y Lugares</title>
        <meta name="description" content="Descubre los mejores lugares de Coyoacán, CDMX. Noticias diarias, cultura, gastronomía y recomendaciones locales." />
        <meta name="keywords" content="Coyoacán, CDMX, Ciudad de México, turismo, hospedaje, cultura, gastronomía, lugares, noticias" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diario.superanfitrion.com.mx/" />
        <meta property="og:title" content="Diario Coyoacán - Noticias y Lugares" />
        <meta property="og:description" content="Descubre los mejores lugares de Coyoacán, CDMX. Noticias diarias, cultura, gastronomía y recomendaciones locales." />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diario Coyoacán - Noticias y Lugares" />
        <meta name="twitter:description" content="Descubre los mejores lugares de Coyoacán, CDMX. Noticias diarias, cultura, gastronomía y recomendaciones locales." />
        {/* Canonical */}
        <link rel="canonical" href="https://diario.superanfitrion.com.mx/" />
        {/* hreflang */}
        <link rel="alternate" hrefLang="es-mx" href="https://diario.superanfitrion.com.mx/" />
        <link rel="alternate" hrefLang="en" href="https://diario.superanfitrion.com.mx/en" />
        <link rel="alternate" hrefLang="x-default" href="https://diario.superanfitrion.com.mx/" />
        {/* Schema.org WebSite + Organization */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Diario Coyoacán",
              "url": "https://diario.superanfitrion.com.mx",
              "description": "Noticias diarias, cultura, gastronomía y recomendaciones locales de Coyoacán, Ciudad de México.",
              "inLanguage": "es-MX",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://diario.superanfitrion.com.mx/noticias?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Diario Coyoacán",
              "url": "https://diario.superanfitrion.com.mx",
              "logo": {
                "@type": "ImageObject",
                "url": "https://diario.superanfitrion.com.mx/logo-diario.png",
                "width": 600,
                "height": 60
              },
              "sameAs": [
                "https://superanfitrion.com.mx",
                "https://www.facebook.com/superanfitrioncoyoacan",
                "https://www.instagram.com/superanfitrioncoyoacan"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Coyoacán",
                "addressRegion": "Ciudad de México",
                "addressCountry": "MX"
              },
              "foundingDate": "2026",
              "publishingPrinciples": "https://diario.superanfitrion.com.mx/"
            }
          ])}
        </script>
      </Helmet>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ink mx-auto"></div>
        <p className="mt-4 font-subhead text-ink">Cargando Diario Coyoacán...</p>
      </div>
    </div>
  );
}
