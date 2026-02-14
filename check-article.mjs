import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { articles } from './drizzle/schema.ts';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const result = await db.select({
  slug: articles.slug,
  heroImage: articles.heroImage,
  headlineEs: articles.headlineEs,
  createdAt: articles.createdAt
}).from(articles).where(eq(articles.slug, 'coyoacan-invierte-21-mdp-seguridad-mundial-2026-contingencia-ambiental')).limit(1);

console.log(JSON.stringify(result, null, 2));

await connection.end();
