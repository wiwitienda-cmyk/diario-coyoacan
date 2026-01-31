import { storagePut } from './server/storage.js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

try {
  console.log('Reading image file...');
  const imageBuffer = readFileSync('/home/ubuntu/feria-mezcal-temp.jpg');
  console.log(`Image size: ${imageBuffer.length} bytes`);
  
  console.log('Uploading to S3...');
  const result = await storagePut('articles/feria-mezcal-cerveza.jpg', imageBuffer, 'image/jpeg');
  
  console.log('✅ Image uploaded successfully!');
  console.log('URL:', result.url);
  console.log('Key:', result.key);
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error);
  process.exit(1);
}
