import { getDb } from './db';
import { articles, newsArticles } from '../drizzle/schema';
import { desc } from 'drizzle-orm';

const BASE_URL = 'https://diario.superanfitrion.com.mx';

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateEmptySitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="es-mx" href="${BASE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>
  </url>
  <url>
    <loc>${BASE_URL}/diario</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
  </url>
</urlset>`;
}

export async function generateSitemap(): Promise<string> {
  try {
    const db = await getDb();
    if (!db) return generateEmptySitemap();

    const articlesData = await db
      .select({
        slug: articles.slug,
        headlineEs: articles.headlineEs,
        summaryEs: articles.summaryEs,
        heroImage: articles.heroImage,
        categoryEs: articles.categoryEs,
        dateISO: articles.dateISO,
        updatedAt: articles.updatedAt,
      })
      .from(articles)
      .orderBy(desc(articles.createdAt));

    const newsData = await db
      .select({
        slug: newsArticles.slug,
        headlineEs: newsArticles.title,
        summaryEs: newsArticles.summary,
        heroImage: newsArticles.heroImage,
        categoryEs: newsArticles.category,
        dateISO: newsArticles.date,
        updatedAt: newsArticles.updatedAt,
      })
      .from(newsArticles)
      .orderBy(desc(newsArticles.createdAt));

    const allArticles = [...articlesData, ...newsData];
    const today = new Date().toISOString().split('T')[0];

    const articleUrls = allArticles
      .filter(a => a.slug)
      .map((article) => {
        const lastmod = article.dateISO || today;
        const imageTag = article.heroImage
          ? `
    <image:image>
      <image:loc>${escapeXml(article.heroImage)}</image:loc>
      <image:title>${escapeXml(article.headlineEs)}</image:title>
      <image:caption>${escapeXml((article.summaryEs || '').substring(0, 200))}</image:caption>
    </image:image>`
          : '';
        return `
  <url>
    <loc>${BASE_URL}/diario?slug=${encodeURIComponent(article.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`;
      })
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Página principal -->
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="es-mx" href="${BASE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>
  </url>

  <!-- Diario Coyoacán (primera plana) -->
  <url>
    <loc>${BASE_URL}/diario</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="es-mx" href="${BASE_URL}/diario"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/diario"/>
  </url>

  <!-- Hospedaje Mundial 2026 (SEO prioritario) -->
  <url>
    <loc>${BASE_URL}/hospedaje-mundial-2026</loc>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="es-mx" href="${BASE_URL}/hospedaje-mundial-2026"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en/world-cup-2026-accommodation"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/hospedaje-mundial-2026"/>
  </url>

  <!-- English page - World Cup 2026 -->
  <url>
    <loc>${BASE_URL}/en</loc>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en"/>
    <xhtml:link rel="alternate" hreflang="es-mx" href="${BASE_URL}/hospedaje-mundial-2026"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en"/>
  </url>

  <!-- Noticias -->
  <url>
    <loc>${BASE_URL}/noticias</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>

  <!-- Hemeroteca -->
  <url>
    <loc>${BASE_URL}/hemeroteca</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    <lastmod>${today}</lastmod>
  </url>

  <!-- Artículos individuales con imágenes -->${articleUrls}

</urlset>`;
  } catch (error) {
    console.error('[Sitemap] Error:', error);
    return generateEmptySitemap();
  }
}

/** Sitemap de Google News - solo artículos recientes */
export async function generateNewsSitemap(): Promise<string> {
  try {
    const db = await getDb();
    if (!db) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
    }

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoISO = twoDaysAgo.toISOString().split('T')[0];

    const newsData = await db
      .select({
        slug: newsArticles.slug,
        title: newsArticles.title,
        summary: newsArticles.summary,
        heroImage: newsArticles.heroImage,
        category: newsArticles.category,
        date: newsArticles.date,
      })
      .from(newsArticles)
      .orderBy(desc(newsArticles.createdAt));

    // También incluir artículos de la tabla principal (articles)
    const mainArticlesData = await db
      .select({
        slug: articles.slug,
        title: articles.headlineEs,
        summary: articles.summaryEs,
        heroImage: articles.heroImage,
        category: articles.categoryEs,
        date: articles.dateISO,
      })
      .from(articles)
      .orderBy(desc(articles.createdAt));

    const allNewsData = [
      ...mainArticlesData,
      ...newsData,
    ];

    const recentNews = allNewsData
      .filter(a => a.date && /^\d{4}-\d{2}-\d{2}$/.test(a.date) && a.date >= twoDaysAgoISO)
      .slice(0, 1000);;

    const newsUrls = recentNews
      .filter(a => a.slug && a.title)
      .map(article => {
        let pubDate = new Date().toISOString();
        try {
          if (article.date && /^\d{4}-\d{2}-\d{2}$/.test(article.date)) {
            pubDate = new Date(article.date + 'T12:00:00Z').toISOString();
          }
        } catch { /* use default */ }
        return `
  <url>
    <loc>${BASE_URL}/diario?slug=${encodeURIComponent(article.slug)}</loc>
    <news:news>
      <news:publication>
        <news:name>Diario Coyoacán</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>Coyoacán, CDMX, ${escapeXml(article.category || 'noticias')}, hospedaje, México</news:keywords>
    </news:news>
  </url>`;
      })
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${newsUrls}
</urlset>`;
  } catch (error) {
    console.error('[NewsSitemap] Error:', error);
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
  }
}
