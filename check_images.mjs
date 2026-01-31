import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await connection.execute('SELECT id, slug, heroImage FROM articles ORDER BY dateISO DESC');

console.log('Current image URLs in database:\n');
rows.forEach(article => {
  console.log(`${article.slug}:`);
  console.log(`  ${article.heroImage}\n`);
});

await connection.end();
