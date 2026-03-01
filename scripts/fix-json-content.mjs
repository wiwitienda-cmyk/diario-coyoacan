/**
 * Script para corregir artículos cuyo campo content está en formato JSON
 * en lugar de texto plano separado por punto y coma.
 * 
 * Uso: node scripts/fix-json-content.mjs
 */

import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not found in .env');
  process.exit(1);
}

async function fixJsonContent() {
  const conn = await mysql.createConnection(DATABASE_URL);
  
  try {
    // Get all articles
    const [rows] = await conn.execute('SELECT id, slug, content FROM newsArticles');
    
    let fixed = 0;
    for (const row of rows) {
      const content = row.content;
      // Check if content looks like JSON array
      if (content && content.trim().startsWith('[') && content.includes('"title"')) {
        try {
          const sections = JSON.parse(content);
          if (Array.isArray(sections)) {
            // Extract text from each section, join with '; '
            const plainText = sections
              .map(s => s.text || s.content || '')
              .filter(Boolean)
              .join('; ');
            
            if (plainText) {
              await conn.execute(
                'UPDATE newsArticles SET content = ? WHERE id = ?',
                [plainText, row.id]
              );
              console.log(`✅ Fixed article: ${row.slug} (${plainText.length} chars)`);
              fixed++;
            }
          }
        } catch (e) {
          console.error(`❌ Error parsing JSON for ${row.slug}:`, e.message);
        }
      }
    }
    
    console.log(`\nDone. Fixed ${fixed} article(s).`);
  } finally {
    await conn.end();
  }
}

fixJsonContent().catch(console.error);
