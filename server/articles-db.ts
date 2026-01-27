import { eq, desc } from "drizzle-orm";
import { articles, subscribers, InsertArticle, InsertSubscriber } from "../drizzle/schema";
import { getDb } from "./db";

export async function getAllArticles() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(articles).orderBy(desc(articles.dateISO));
  return result;
}

export async function getLatestArticle() {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(articles).orderBy(desc(articles.dateISO)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createArticle(data: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(articles).values(data);
}

export async function addSubscriber(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.insert(subscribers).values({ email });
    return { success: true };
  } catch (error: any) {
    // Duplicate entry error (MySQL error code 1062)
    // Check both the error itself and its cause
    const isDuplicate = 
      error.errno === 1062 || 
      error.code === 'ER_DUP_ENTRY' || 
      error.cause?.errno === 1062 || 
      error.cause?.code === 'ER_DUP_ENTRY' ||
      error.message?.includes('Duplicate') ||
      error.cause?.message?.includes('Duplicate');
    
    if (isDuplicate) {
      return { success: false, error: 'Ya estás suscrito' };
    }
    throw error;
  }
}

export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(subscribers);
  return result;
}
