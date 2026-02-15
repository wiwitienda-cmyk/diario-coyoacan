import { db } from "./server/db.ts";
import * as schema from "./drizzle/schema.ts";

const article = await db.select().from(schema.newsArticles).orderBy(schema.newsArticles.createdAt).limit(1);
const subscribers = await db.select().from(schema.subscribers);

console.log(`📧 Enviando newsletter a ${subscribers.length} suscriptores...`);
console.log(`📰 Artículo: ${article[0].title}`);

// Aquí iría la lógica de envío de newsletter
// Por ahora solo simulamos el envío

console.log("✅ Newsletter enviado exitosamente");
