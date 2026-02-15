import { getDb } from "./db";
import * as schema from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";

export async function getLatestNewsArticle() {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const articles = await db
      .select()
      .from(schema.newsArticles)
      .orderBy(desc(schema.newsArticles.createdAt))
      .limit(1);
    
    return articles[0] || null;
  } catch (error) {
    console.error("Error fetching latest news article:", error);
    return null;
  }
}

export async function getNewsArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const articles = await db
      .select()
      .from(schema.newsArticles)
      .where(eq(schema.newsArticles.slug, slug))
      .limit(1);
    
    return articles[0] || null;
  } catch (error) {
    console.error("Error fetching news article by slug:", error);
    return null;
  }
}

export async function getAllNewsArticles() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const articles = await db
      .select()
      .from(schema.newsArticles)
      .orderBy(desc(schema.newsArticles.createdAt));
    
    return articles;
  } catch (error) {
    console.error("Error fetching all news articles:", error);
    return [];
  }
}
