import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const newImageUrl = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/cyCTXDDxLpbBHpcY.png';
const slug = 'coyoacan-une-cultura-y-solidaridad-en-festival-por-cuba-y-venezuela-2026-02-15';

async function updateArticleImage() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Actualizando imagen del artículo del festival...');
    
    const [result] = await connection.execute(
      `UPDATE articles SET heroImage = ? WHERE slug = ?`,
      [newImageUrl, slug]
    );
    
    if (result.affectedRows > 0) {
      console.log('✅ Imagen actualizada exitosamente!');
      console.log(`   Slug: ${slug}`);
      console.log(`   Nueva URL: ${newImageUrl}`);
    } else {
      console.log('⚠️  No se encontró el artículo con ese slug');
    }
    
  } catch (error) {
    console.error('❌ Error al actualizar imagen:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

updateArticleImage();
