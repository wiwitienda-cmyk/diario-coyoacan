import { getAllArticles } from './articles-db';

export async function generateSitemap(): Promise<string> {
  const articles = await getAllArticles();
  const baseUrl = 'https://diario-coyo.manus.space';
  
  const articleUrls = articles.map(article => {
    const lastmod = article.updatedAt.toISOString().split('T')[0];
    return `
  <url>
    <loc>${baseUrl}/diario?slug=${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/diario</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/hemeroteca</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>${articleUrls}
</urlset>`;

  return sitemap;
}
