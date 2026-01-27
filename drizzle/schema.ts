import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Articles table for Diario Coyoacán
 * Stores daily news articles with bilingual content
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  dateISO: varchar("dateISO", { length: 10 }).notNull(), // YYYY-MM-DD format
  weatherTemp: int("weatherTemp").notNull(),
  weatherConditionEs: varchar("weatherConditionEs", { length: 50 }).notNull(),
  weatherConditionEn: varchar("weatherConditionEn", { length: 50 }).notNull(),
  
  // Location data
  locationAddress: varchar("locationAddress", { length: 255 }).notNull(),
  locationLat: varchar("locationLat", { length: 20 }).notNull(),
  locationLng: varchar("locationLng", { length: 20 }).notNull(),
  locationMapsUrl: text("locationMapsUrl").notNull(),
  
  // Images
  heroImage: varchar("heroImage", { length: 500 }).notNull(),
  
  // Spanish content
  headlineEs: text("headlineEs").notNull(),
  summaryEs: text("summaryEs").notNull(),
  categoryEs: varchar("categoryEs", { length: 100 }).notNull(),
  dateEs: varchar("dateEs", { length: 100 }).notNull(),
  contentEs: text("contentEs").notNull(), // JSON string of content sections
  menuItemsEs: text("menuItemsEs").notNull(), // JSON string of menu items
  hoursWeekEs: varchar("hoursWeekEs", { length: 50 }).notNull(),
  hoursSundayEs: varchar("hoursSundayEs", { length: 50 }).notNull(),
  
  // English content
  headlineEn: text("headlineEn").notNull(),
  summaryEn: text("summaryEn").notNull(),
  categoryEn: varchar("categoryEn", { length: 100 }).notNull(),
  dateEn: varchar("dateEn", { length: 100 }).notNull(),
  contentEn: text("contentEn").notNull(), // JSON string of content sections
  menuItemsEn: text("menuItemsEn").notNull(), // JSON string of menu items
  hoursWeekEn: varchar("hoursWeekEn", { length: 50 }).notNull(),
  hoursSundayEn: varchar("hoursSundayEn", { length: 50 }).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Subscribers table for newsletter
 */
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;