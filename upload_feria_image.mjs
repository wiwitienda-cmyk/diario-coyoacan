import { storagePut } from './server/storage.js';
import { readFileSync } from 'fs';

const imageBuffer = readFileSync('/home/ubuntu/feria-mezcal-temp.jpg');
const result = await storagePut('articles/feria-mezcal-cerveza.jpg', imageBuffer, 'image/jpeg');

console.log('Image uploaded successfully!');
console.log('URL:', result.url);
