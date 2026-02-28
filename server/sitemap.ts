import { getDb } from './db';
import { articles, newsArticles } from '../drizzle/schema';
import { desc } from 'drizzle-orm';

// Dominio canónico — siempre usar el dominio personalizado
const BASE_URL = 'https://diario.superanfitrion.com.mx';

function generateEmptySitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/diario</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/hospedaje-mundial-2026</loc>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <lastmod>${today}</lastmod>
  </url>
  <url>
    <loc>${BASE_URL}/hemeroteca</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    <lastmod>${today}</lastmod>
  </url>
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function generateSitemap(): Promise<string> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('[Sitemap] Database not available');
      return generateEmptySitemap();
    }
    
    console.log('[Sitemap] Fetching articles from database...');
    
    // Fetch from articles table
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
    
    // Fetch from newsArticles table
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
    console.log(`[Sitemap] Found ${articlesData.length} articles and ${newsData.length} news articles`);
    
    if (allArticles.length === 0) {
      console.warn('[Sitemap] No articles found, returning empty sitemap');
      return generateEmptySitemap();
    }

  const today = new Date().toISOString().split('T')[0];
  
  const articleUrls = allArticles.map((article) => {
    const lastmod = article.dateISO || today;
    const articleUrl = `${BASE_URL}/diario?slug=${encodeURIComponent(article.slug)}`;
    return `
  <url>
    <loc>${articleUrl}</loc>
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
      <news:keywords>Coyoacán, CDMX, Mundial 2026, hospedaje, ${escapeXml(article.categoryEs || 'cultura')}</news:keywords>
    </news:news>
    <image:image>
      <image:loc>${escapeXml(article.heroImage || '')}</image:loc>
      <image:title>${escapeXml(article.headlineEs)}</image:title>
      <image:caption>${escapeXml(article.summaryEs || '')}</image:caption>
    </image:image>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Página principal -->
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- Diario Coyoacán (primera plana) -->
  <url>
    <loc>${BASE_URL}/diario</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- Landing page Mundial 2026 (SEO prioritario) -->
  <url>
    <loc>${BASE_URL}/hospedaje-mundial-2026</loc>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- Hemeroteca / Archivo de noticias -->
  <url>
    <loc>${BASE_URL}/hemeroteca</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- Artículos individuales con schema de noticias e imágenes -->${articleUrls}
  
</urlset>`;

  return sitemap;
  } catch (error) {
    console.error('[Sitemap] Error generating sitemap:', error);
    return generateEmptySitemap();
  }
}
