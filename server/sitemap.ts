import { getAllArticles } from './articles-db';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function generateSitemap(): Promise<string> {
  const articles = await getAllArticles();
  const baseUrl = 'https://diario-coyo.manus.space';
  const today = new Date().toISOString().split('T')[0];
  
  const articleUrls = articles.map(article => {
    const lastmod = article.dateISO || today;
    return `
  <url>
    <loc>${baseUrl}/diario?slug=${encodeURIComponent(article.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>Diario Coyoacán</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${lastmod}</news:publication_date>
      <news:title>${escapeXml(article.headlineEs)}</news:title>
      <news:keywords>Coyoacán, CDMX, Mundial 2026, hospedaje, ${article.categoryEs}</news:keywords>
    </news:news>
    <image:image>
      <image:loc>${article.heroImage}</image:loc>
      <image:title>${escapeXml(article.headlineEs)}</image:title>
      <image:caption>${escapeXml(article.summaryEs)}</image:caption>
    </image:image>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Página principal -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- Diario Coyoacán (primera plana) -->
  <url>
    <loc>${baseUrl}/diario</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- Landing page Mundial 2026 (SEO prioritario) -->
  <url>
    <loc>${baseUrl}/hospedaje-mundial-2026</loc>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  
  <!-- Hemeroteca -->
  <url>
    <loc>${baseUrl}/hemeroteca</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Artículos individuales con schema de noticias e imágenes -->${articleUrls}
  
</urlset>`;

  return sitemap;
}
