import { drizzle } from "drizzle-orm/mysql2";
import { articles, subscribers } from "../drizzle/schema.ts";
import { notifyOwner } from "./_core/notification.ts";
import { desc } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

/**
 * Script para enviar newsletter a los suscriptores
 * Este script obtiene el artículo más reciente y notifica al propietario
 * con la lista de suscriptores para que pueda enviar el newsletter manualmente
 * o integrarlo con un servicio de email marketing.
 */
async function sendNewsletter() {
  console.log("📧 Iniciando envío de newsletter...");
  
  try {
    // 1. Obtener el artículo más reciente
    const latestArticles = await db.select().from(articles).orderBy(desc(articles.dateISO)).limit(1);
    
    if (latestArticles.length === 0) {
      console.log("⚠️  No hay artículos para enviar");
      return;
    }
    
    const latestArticle = latestArticles[0];
    console.log(`📰 Artículo más reciente: ${latestArticle.headlineEs}`);
    
    // 2. Obtener todos los suscriptores
    const allSubscribers = await db.select().from(subscribers);
    console.log(`👥 Total de suscriptores: ${allSubscribers.length}`);
    
    if (allSubscribers.length === 0) {
      console.log("⚠️  No hay suscriptores para notificar");
      return;
    }
    
    // 3. Preparar el contenido del newsletter
    const articleUrl = `${process.env.VITE_APP_URL || 'https://diario-coyo.manus.space'}/diario?slug=${latestArticle.slug}`;
    
    const newsletterContent = `
🗞️ NUEVO ARTÍCULO PUBLICADO - Diario Coyoacán

📰 ${latestArticle.headlineEs}
📅 ${latestArticle.dateEs}
🌡️ ${latestArticle.weatherConditionEs} ${latestArticle.weatherTemp}°C

📝 Resumen:
${latestArticle.summaryEs}

🔗 Leer artículo completo:
${articleUrl}

👥 Suscriptores activos: ${allSubscribers.length}
📧 Lista de correos:
${allSubscribers.map(s => s.email).join(', ')}

---
💡 PRÓXIMOS PASOS:
1. Puedes copiar esta lista de correos y enviar el newsletter manualmente
2. O integrar con un servicio de email marketing (SendGrid, Mailchimp, etc.)
3. El contenido del artículo está disponible en la base de datos
    `.trim();
    
    // 4. Notificar al propietario
    console.log("📤 Enviando notificación al propietario...");
    const notificationSent = await notifyOwner({
      title: `📰 Nuevo artículo: ${latestArticle.headlineEs}`,
      content: newsletterContent
    });
    
    if (notificationSent) {
      console.log("✅ Notificación enviada al propietario exitosamente");
      console.log("\n📋 RESUMEN:");
      console.log(`   - Artículo: ${latestArticle.headlineEs}`);
      console.log(`   - Suscriptores: ${allSubscribers.length}`);
      console.log(`   - URL: ${articleUrl}`);
    } else {
      console.warn("⚠️  No se pudo enviar la notificación al propietario");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error enviando newsletter:", error);
    process.exit(1);
  }
}

// Ejecutar
sendNewsletter();
