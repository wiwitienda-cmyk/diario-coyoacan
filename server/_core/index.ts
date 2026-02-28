import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
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
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Sitemap.xml
  app.get("/sitemap.xml", async (req, res) => {
    try {
      console.log('[Server] Sitemap requested');
      const sitemap = await generateSitemap();
      console.log(`[Server] Sitemap generated, length: ${sitemap.length} chars`);
      res.header("Content-Type", "application/xml");
      res.header("Cache-Control", "no-cache"); // Disable cache for debugging
      res.send(sitemap);
    } catch (error) {
      console.error("[Server] Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });
  
  // Robots.txt — SEO optimizado para Diario Coyoacán
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `# robots.txt para Diario Coyoacán — diario.superanfitrion.com.mx
# Optimizado para máxima indexación en Google, Bing y buscadores internacionales

User-agent: *
Allow: /
Allow: /diario
Allow: /hemeroteca
Allow: /hospedaje-mundial-2026
Allow: /noticias

# Sitemap canónico con dominio personalizado
Sitemap: https://diario.superanfitrion.com.mx/sitemap.xml

# Permitir todos los bots de búsqueda principales
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Bloquear bots de scraping agresivo
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Crawl-delay moderado para no sobrecargar
Crawl-delay: 1`;
    res.header("Content-Type", "text/plain");
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
