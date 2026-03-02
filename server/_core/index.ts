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
