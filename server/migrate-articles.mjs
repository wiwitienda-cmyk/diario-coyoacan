import { drizzle } from "drizzle-orm/mysql2";
import { articles } from "../drizzle/schema.ts";
import { articles as articlesData } from "../client/src/data/articles.ts";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

async function migrateArticles() {
  console.log("Starting article migration...");
  
  for (const article of articlesData) {
    const insertData = {
      slug: article.id,
      dateISO: article.dateISO,
      weatherTemp: article.weatherTemp,
      weatherConditionEs: article.translations.es.weather,
      weatherConditionEn: article.translations.en.weather,
      
      // Location
      locationAddress: article.location.address,
      locationLat: String(article.location.lat),
      locationLng: String(article.location.lng),
      locationMapsUrl: article.location.mapsUrl,
      
      // Images
      heroImage: article.images.hero,
      
      // Spanish content
      headlineEs: article.translations.es.headline,
      summaryEs: article.translations.es.summary,
      categoryEs: article.translations.es.category,
      dateEs: article.translations.es.date,
      contentEs: JSON.stringify(article.translations.es.content),
      menuItemsEs: JSON.stringify(article.translations.es.menuItems),
      hoursWeekEs: article.translations.es.hours.week,
      hoursSundayEs: article.translations.es.hours.sunday,
      
      // English content
      headlineEn: article.translations.en.headline,
      summaryEn: article.translations.en.summary,
      categoryEn: article.translations.en.category,
      dateEn: article.translations.en.date,
      contentEn: JSON.stringify(article.translations.en.content),
      menuItemsEn: JSON.stringify(article.translations.en.menuItems),
      hoursWeekEn: article.translations.en.hours.week,
      hoursSundayEn: article.translations.en.hours.sunday,
    };
    
    try {
      await db.insert(articles).values(insertData);
      console.log(`✓ Migrated article: ${article.id}`);
    } catch (error) {
      console.error(`✗ Error migrating article ${article.id}:`, error.message);
    }
  }
  
  console.log("Migration complete!");
  process.exit(0);
}

migrateArticles().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
