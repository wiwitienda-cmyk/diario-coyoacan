import { Helmet } from 'react-helmet-async';

export default function WorldCup2026En() {
  const PAPER = '#f5f0e8';
  const INK = '#1a1008';
  const WINE = '#8b1a1a';
  const GOLD = '#c9a96e';
  const SERIF = "'Playfair Display', Georgia, serif";
  const SANS = "'Oswald', 'Arial Narrow', sans-serif";

  return (
    <div style={{ minHeight: '100vh', backgroundColor: PAPER, color: INK, fontFamily: SERIF }}>
      <Helmet>
        <title>Accommodation in Coyoacán for FIFA World Cup 2026 | SúperAnfitrión</title>
        <meta name="description" content="Stay in Coyoacán, Mexico City for the 2026 FIFA World Cup. Authentic apartments 20 min from Estadio Azteca. Direct booking, no fees, local hosts." />
        <meta name="keywords" content="accommodation world cup 2026, where to stay world cup 2026 mexico city, airbnb coyoacan world cup, lodging near estadio azteca, mexico city 2026 fifa, coyoacan apartments world cup" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diario.superanfitrion.com.mx/en" />
        <meta property="og:title" content="Accommodation in Coyoacán for FIFA World Cup 2026" />
        <meta property="og:description" content="Stay in Coyoacán, Mexico City for the 2026 FIFA World Cup. Authentic apartments 20 min from Estadio Azteca. Direct booking, no fees, local hosts." />
        <meta property="og:site_name" content="SúperAnfitrión Coyoacán" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="es_MX" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accommodation in Coyoacán for FIFA World Cup 2026" />
        <meta name="twitter:description" content="Stay in Coyoacán, Mexico City for the 2026 FIFA World Cup. Authentic apartments 20 min from Estadio Azteca." />
        {/* Canonical + hreflang */}
        <link rel="canonical" href="https://diario.superanfitrion.com.mx/en" />
        <link rel="alternate" hrefLang="en" href="https://diario.superanfitrion.com.mx/en" />
        <link rel="alternate" hrefLang="es-mx" href="https://diario.superanfitrion.com.mx/hospedaje-mundial-2026" />
        <link rel="alternate" hrefLang="x-default" href="https://diario.superanfitrion.com.mx/en" />
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": "SúperAnfitrión Coyoacán",
            "description": "Authentic accommodations in Coyoacán, Mexico City for the 2026 FIFA World Cup. 20 minutes from Estadio Azteca.",
            "url": "https://diario.superanfitrion.com.mx/en",
            "sameAs": [
              "https://superanfitrion.com.mx",
              "https://superanfitrioncoyoacan.lodgify.com"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Coyoacán",
              "addressRegion": "Mexico City",
              "addressCountry": "MX",
              "postalCode": "04000"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 19.3500,
              "longitude": -99.1620
            },
            "telephone": "+52-55-1142-7252",
            "email": "superanfitrioncoyoacan@gmail.com",
            "priceRange": "$$",
            "checkinTime": "15:00",
            "checkoutTime": "11:00",
            "amenityFeature": [
              { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Self check-in", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Kitchen", "value": true }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5"
            }
          })}
        </script>
      </Helmet>

      {/* Top Banner */}
      <div style={{ backgroundColor: INK, color: PAPER, padding: '0.4rem 1rem', textAlign: 'center', fontSize: '0.7rem', fontFamily: SANS, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        <a href="https://superanfitrion.com.mx" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: 'none' }}>
          🏠 Book directly at SúperAnfitrión Coyoacán · superanfitrion.com.mx
        </a>
      </div>

      {/* Header */}
      <header style={{ borderBottom: `4px solid ${INK}`, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', backgroundColor: PAPER, position: 'sticky', top: 0, zIndex: 40 }}>
        <div>
          <h1 style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 0, lineHeight: 1 }}>
            Diario Coyoacán
          </h1>
          <p style={{ fontFamily: SANS, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: WINE, margin: '0.25rem 0 0' }}>
            The Insider Guide to Mexico City · World Cup 2026 Edition
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="/" style={{ padding: '0.5rem 1rem', border: `2px solid ${INK}`, fontFamily: SANS, textTransform: 'uppercase', fontSize: '0.75rem', textDecoration: 'none', color: INK }}>
            Español
          </a>
          <a
            href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '0.5rem 1rem', backgroundColor: WINE, color: PAPER, border: `2px solid ${INK}`, fontFamily: SANS, textTransform: 'uppercase', fontSize: '0.75rem', textDecoration: 'none', boxShadow: `4px 4px 0 ${INK}` }}
          >
            Book Now →
          </a>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Hero */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start', borderBottom: `2px solid ${INK}`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: SANS, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: WINE, margin: '0 0 0.5rem' }}>
                Special Report · FIFA World Cup 2026
              </p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 4vw, 3rem)', margin: 0, lineHeight: 1.1 }}>
                Where to Stay in Mexico City for the 2026 World Cup
              </h2>
            </div>
            <div style={{ backgroundColor: WINE, color: PAPER, padding: '0.5rem 1rem', fontFamily: SANS, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', transform: 'rotate(2deg)', boxShadow: `3px 3px 0 ${INK}`, whiteSpace: 'nowrap' }}>
              June–July<br />2026
            </div>
          </div>

          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', borderLeft: `4px solid ${WINE}`, paddingLeft: '1.5rem', color: '#3a2a1a', lineHeight: 1.7, marginBottom: '2rem' }}>
            "Coyoacán is not where tourists go — it's where they wish they had stayed."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                The 2026 FIFA World Cup brings 48 nations and millions of fans to Mexico, the United States, and Canada. Mexico City hosts six matches at the iconic <strong>Estadio Azteca</strong> — the only stadium to host two World Cup finals.
              </p>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem', marginTop: '1rem' }}>
                While most visitors scramble for overpriced hotels near the stadium, smart travelers are discovering <strong>Coyoacán</strong> — a bohemian neighborhood 20 minutes south, where Frida Kahlo lived, Diego Rivera painted, and Leon Trotsky sought exile.
              </p>
            </div>
            <div>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                <strong>SúperAnfitrión Coyoacán</strong> offers verified apartments and rooms in the heart of this neighborhood. No hotel markups, no platform fees. Direct booking with local hosts who know every corner of the barrio.
              </p>
              <p style={{ lineHeight: 1.8, fontSize: '1.05rem', marginTop: '1rem' }}>
                High-speed WiFi for remote work, self check-in, and a neighborhood that actually feels like Mexico — not a tourist bubble.
              </p>
            </div>
          </div>
        </section>

        {/* Key Facts */}
        <section style={{ backgroundColor: 'white', border: `4px solid ${INK}`, padding: '2rem', marginBottom: '3rem', boxShadow: `6px 6px 0 ${INK}` }}>
          <h3 style={{ fontFamily: SANS, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.1rem', borderBottom: `2px solid ${INK}`, paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            Essential Facts · World Cup 2026 Mexico City
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'Matches in Mexico City', value: '6 games', note: 'Including Group Stage & Round of 16' },
              { label: 'Stadium', value: 'Estadio Azteca', note: 'Capacity: 87,000 seats' },
              { label: 'Distance from Coyoacán', value: '20–25 min', note: 'By Metro Line 2 or Uber' },
              { label: 'Tournament dates', value: 'Jun 11 – Jul 19', note: '2026' },
              { label: 'Participating teams', value: '48 nations', note: 'First expanded World Cup' },
              { label: 'SúperAnfitrión rating', value: '4.9 / 5.0', note: 'Based on 127+ reviews' },
            ].map((fact, i) => (
              <div key={i} style={{ borderBottom: `1px dashed #c9b89a`, paddingBottom: '1rem' }}>
                <p style={{ fontFamily: SANS, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em', color: WINE, margin: '0 0 0.25rem' }}>{fact.label}</p>
                <p style={{ fontFamily: SERIF, fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.2rem' }}>{fact.value}</p>
                <p style={{ fontSize: '0.8rem', color: '#6b5a3e', margin: 0 }}>{fact.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Coyoacán */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: SERIF, fontSize: '2rem', borderBottom: `2px solid ${INK}`, paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            Why Coyoacán?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '🚇',
                title: 'Direct Metro Access',
                text: 'Metro Line 2 (Viveros station) connects Coyoacán to Estadio Azteca in 20–25 minutes. No traffic, no parking stress.',
              },
              {
                icon: '🏛️',
                title: 'Culture & History',
                text: "Frida Kahlo Museum, Diego Rivera murals, Trotsky House. Walk everywhere — Coyoacán's center is entirely pedestrian-friendly.",
              },
              {
                icon: '🍜',
                title: 'Real Mexican Food',
                text: 'Tlayudas at Mercado de Coyoacán, tacos at Los Sifones, mezcal at local cantinas. No tourist traps, just neighborhood spots.',
              },
              {
                icon: '💻',
                title: 'Digital Nomad Friendly',
                text: 'Fiber internet, coworking spaces, and dozens of cafés with reliable WiFi. Coyoacán is Mexico City\'s remote work hub.',
              },
              {
                icon: '🌳',
                title: 'Safe & Walkable',
                text: 'Tree-lined streets, colonial architecture, and a relaxed pace. Coyoacán consistently ranks as one of CDMX\'s safest neighborhoods.',
              },
              {
                icon: '💰',
                title: 'Better Value',
                text: 'Skip the inflated hotel rates near the stadium. SúperAnfitrión offers direct booking — no Airbnb fees, no hotel markup.',
              },
            ].map((item, i) => (
              <div key={i} style={{ border: `2px solid ${INK}`, padding: '1.25rem', backgroundColor: i % 2 === 0 ? 'white' : PAPER }}>
                <p style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>{item.icon}</p>
                <h4 style={{ fontFamily: SANS, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em', margin: '0 0 0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0, color: '#3a2a1a' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: WINE, color: PAPER, border: `4px solid ${INK}`, padding: '2.5rem', textAlign: 'center', boxShadow: `6px 6px 0 ${INK}`, marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: SERIF, fontSize: '2rem', margin: '0 0 1rem' }}>
            Secure Your Spot for the World Cup
          </h3>
          <p style={{ fontFamily: SERIF, fontSize: '1.1rem', margin: '0 0 2rem', opacity: 0.9, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Availability for June–July 2026 is limited. Direct booking with local hosts — no platform fees, invoice included.
          </p>
          <a
            href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: PAPER, color: INK, padding: '1rem 2.5rem', fontFamily: SANS, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', textDecoration: 'none', border: `2px solid ${INK}`, boxShadow: `4px 4px 0 ${INK}`, fontWeight: 600 }}
          >
            Check Availability →
          </a>
          <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '1rem', fontFamily: SANS }}>
            📞 +52 55 1142 7252 · superanfitrioncoyoacan@gmail.com
          </p>
        </section>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={{ padding: '0.6rem 1.5rem', border: `2px solid ${INK}`, fontFamily: SANS, textTransform: 'uppercase', fontSize: '0.75rem', textDecoration: 'none', color: INK }}>
            ← Diario Coyoacán (Español)
          </a>
          <a href="/hospedaje-mundial-2026" style={{ padding: '0.6rem 1.5rem', border: `2px solid ${INK}`, fontFamily: SANS, textTransform: 'uppercase', fontSize: '0.75rem', textDecoration: 'none', color: INK }}>
            Versión en Español →
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: INK, color: PAPER, padding: '3rem 2rem', marginTop: '3rem', borderTop: `8px solid ${WINE}`, textAlign: 'center' }}>
        <p style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: '2.5rem', margin: '0 0 0.5rem' }}>Diario Coyoacán</p>
        <p style={{ fontFamily: SANS, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6, marginBottom: '1rem' }}>
          Local Journalism · Culture · Gastronomy · Coyoacán, Mexico City
        </p>
        <p style={{ fontFamily: SANS, fontSize: '0.65rem', opacity: 0.4 }}>
          © 2026 Diario Coyoacán. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
