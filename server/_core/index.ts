import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import compression from "compression";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { generateSitemap } from "../sitemap";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Compresión gzip para todas las respuestas
  app.use(compression());
  
  // Headers de seguridad y performance
  app.use((req, res, next) => {
    // Seguridad
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Cache para assets estáticos (JS/CSS/imágenes)
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Middleware para inyectar meta tags OG dinámicos para crawlers de redes sociales
  // Facebook, Twitter, LinkedIn, etc. no ejecutan JavaScript, así que necesitan
  // los meta tags directamente en el HTML estático.
  app.use(async (req, res, next) => {
    const ua = (req.headers['user-agent'] || '').toLowerCase();
    const isCrawler = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|pinterest|googlebot/i.test(ua);
    
    if (!isCrawler) return next();
    
    // Solo interceptar rutas de páginas (no API, assets, etc.)
    if (req.path.startsWith('/api/') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map|json)$/)) {
      return next();
    }
    
    try {
      const { getLatestArticle, getArticleBySlug } = await import('../articles-db');
      
      let ogTitle = 'Diario Coyoacán - Noticias locales, cultura y gastronomía';
      let ogDescription = 'Tu periódico digital del barrio. Noticias diarias de Coyoacán, clima en tiempo real, índice UV y lo que pasa en el sur de la CDMX.';
      let ogImage = 'https://diario.superanfitrion.com.mx/logo-diario.png';
      let ogUrl = 'https://diario.superanfitrion.com.mx' + req.path;
      let ogType = 'website';
      
      // Si es un artículo específico (/diario/slug)
      const articleMatch = req.path.match(/^\/diario\/(.+)$/);
      if (articleMatch) {
        const slug = articleMatch[1];
        const article = await getArticleBySlug(slug);
        if (article) {
          ogTitle = (article.headlineEs || '').substring(0, 65) + ' | Diario Coyoacán';
          ogDescription = (article.summaryEs || '').substring(0, 160);
          ogImage = article.heroImage || ogImage;
          ogType = 'article';
        }
      } else {
        // Página principal: usar imagen del artículo más reciente
        const latest = await getLatestArticle();
        if (latest) {
          ogTitle = (latest.headlineEs || '').substring(0, 50) + ' | Diario Coyoacán';
          ogDescription = (latest.summaryEs || '').substring(0, 160);
          ogImage = latest.heroImage || ogImage;
        }
      }
      
      // Servir HTML mínimo con meta tags OG para el crawler
      const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${ogTitle}</title>
  <meta name="description" content="${ogDescription}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${ogUrl}">
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDescription}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Diario Coyoacán">
  <meta property="og:locale" content="es_MX">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${ogTitle}">
  <meta name="twitter:description" content="${ogDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="canonical" href="${ogUrl}">
</head>
<body>
  <h1>${ogTitle}</h1>
  <p>${ogDescription}</p>
  <img src="${ogImage}" alt="${ogTitle}">
</body>
</html>`;
      
      res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    } catch (error) {
      console.error('[OG Crawler] Error:', error);
      next();
    }
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Sitemap.xml
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.header("Content-Type", "application/xml; charset=utf-8");
      res.header("Cache-Control", "public, max-age=3600"); // 1 hora de cache
      res.send(sitemap);
    } catch (error) {
      console.error("[Server] Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Sitemap de noticias (Google News)
  app.get("/sitemap-news.xml", async (req, res) => {
    try {
      const { generateNewsSitemap } = await import('../sitemap');
      const sitemap = await generateNewsSitemap();
      res.header("Content-Type", "application/xml; charset=utf-8");
      res.header("Cache-Control", "public, max-age=1800"); // 30 min
      res.send(sitemap);
    } catch (error) {
      console.error("[Server] Error generating news sitemap:", error);
      res.status(500).send("Error generating news sitemap");
    }
  });
  
  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Googlebot
User-agent: Googlebot
Allow: /
Disallow: /api/

# Bingbot
User-agent: bingbot
Allow: /
Disallow: /api/

# Sitemaps
Sitemap: https://diario.superanfitrion.com.mx/sitemap.xml
Sitemap: https://diario.superanfitrion.com.mx/sitemap-news.xml`;
    res.header("Content-Type", "text/plain");
    res.header("Cache-Control", "public, max-age=86400");
    res.send(robotsTxt);
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
