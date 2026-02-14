#!/usr/bin/env node

/**
 * Daily Article Automation for Diario Coyoacán
 * 
 * This script automatically:
 * 1. Searches for recent news from priority sources (La Jornada, El Universal, El Proceso)
 * 2. Generates a journalistic article with proper source citations
 * 3. Creates a subjective editorial image "bajo la lupa"
 * 4. Publishes the article to the database
 * 5. Sends newsletter to all subscribers
 * 
 * Usage:
 *   node scripts/daily-article-automation.mjs
 *   
 * Cron schedule (daily at 7:00 AM):
 *   0 7 * * * cd /home/ubuntu/cafe-avellaneda && node scripts/daily-article-automation.mjs >> /var/log/diario-coyoacan-automation.log 2>&1
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { articles } from '../drizzle/schema.ts';
import * as dotenv from 'dotenv';
import { invokeLLM } from '../server/_core/llm.ts';
import { generateImage } from '../server/_core/imageGeneration.ts';
import { storagePut } from '../server/storage.ts';

dotenv.config();

// Priority news sources
const PRIORITY_SOURCES = [
  { name: 'La Jornada', url: 'jornada.com.mx', bias: 'pro-4T' },
  { name: 'El Universal', url: 'eluniversal.com.mx', bias: 'mainstream' },
  { name: 'El Proceso', url: 'proceso.com.mx', bias: 'investigative' },
  { name: 'SinEmbargo', url: 'sinembargo.mx', bias: 'alternative' },
  { name: 'Aristegui Noticias', url: 'aristeguinoticias.com', bias: 'independent' }
];

// Days of week themes
const DAILY_THEMES = {
  0: { theme: 'Weekend events', category: 'Eventos', categoryEn: 'Events' },
  1: { theme: "Week's main news", category: 'CDMX', categoryEn: 'CDMX' },
  2: { theme: 'Culture & gastronomy', category: 'Cultura', categoryEn: 'Culture' },
  3: { theme: 'Heritage & conservation', category: 'Patrimonio', categoryEn: 'Heritage' },
  4: { theme: 'Security & services', category: 'Seguridad', categoryEn: 'Security' },
  5: { theme: 'Cultural events', category: 'Cultura', categoryEn: 'Culture' },
  6: { theme: 'Community & society', category: 'Comunidad', categoryEn: 'Community' }
};

// Get current day theme
function getDailyTheme() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return DAILY_THEMES[dayOfWeek];
}

// Search for recent news using Manus search API
async function searchNews(theme) {
  console.log(`🔍 Searching for news about: ${theme}`);
  
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // Build search queries focusing on priority sources
  const queries = [
    `site:jornada.com.mx Coyoacán ${theme} ${dateStr.substring(0, 7)}`,
    `site:eluniversal.com.mx CDMX ${theme} febrero 2026`,
    `site:proceso.com.mx Ciudad de México ${theme}`
  ];
  
  console.log('Search queries:', queries);
  
  // Use Manus search API to find news
  const searchResults = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `You are a news researcher for Diario Coyoacán. Search for recent news (last 7 days) from these priority sources: La Jornada, El Universal, El Proceso, SinEmbargo, Aristegui Noticias.
        
Focus on: Coyoacán, Benito Juárez, Xochimilco, Álvaro Obregón, Milpa Alta, Iztacalco, Centro Histórico.

Return a list of 3-5 recent news items with:
- Headline
- Source (prioritize La Jornada, El Universal, El Proceso)
- Date (must be within last 7 days)
- Brief summary (2-3 sentences)
- URL (if available)

Format as JSON array:
[
  {
    "headline": "...",
    "source": "La Jornada",
    "date": "9 de febrero de 2026",
    "summary": "...",
    "url": "https://..."
  }
]`
      },
      {
        role: 'user',
        content: `Find recent news about "${theme}" in CDMX, focusing on Coyoacán and surrounding boroughs. Today is ${today.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.

Search queries: ${queries.join(', ')}`
      }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'news_search_results',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            news_items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  headline: { type: 'string' },
                  source: { type: 'string' },
                  date: { type: 'string' },
                  summary: { type: 'string' },
                  url: { type: 'string' }
                },
                required: ['headline', 'source', 'date', 'summary'],
                additionalProperties: false
              }
            }
          },
          required: ['news_items'],
          additionalProperties: false
        }
      }
    }
  });
  
  const results = JSON.parse(searchResults.choices[0].message.content);
  console.log(`✅ Found ${results.news_items.length} news items`);
  
  return results.news_items;
}

// Generate journalistic article
async function generateArticle(newsItems, theme) {
  console.log('📝 Generating journalistic article...');
  
  const today = new Date();
  const dateISO = today.toISOString().split('T')[0];
  const dateEs = today.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const dateEn = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // Format news context for the prompt
  const newsContext = newsItems.map(item => 
    `- **${item.headline}** (${item.source}, ${item.date}): ${item.summary}`
  ).join('\n\n');
  
  const response = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `Eres un reportero profesional del periódico digital "Diario Coyoacán".

INSTRUCCIONES CRÍTICAS:
1. Escribe una NOTA PERIODÍSTICA (NO guía turística)
2. Tono: objetivo, profesional, estilo periódico
3. Longitud: 600-900 palabras
4. Estructura: titular, lead, cuerpo con pirámide invertida
5. SIEMPRE cita fuentes en formato: "reportó [Fuente] el [fecha]"
6. Incluye contexto histórico/cultural
7. Menciona sutilmente SúperAnfitrión Coyoacán como opción de hospedaje
8. **SEO MUNDIAL 2026**: Si el artículo NO habla del Mundial 2026, incluye al menos UNA mención natural relacionando el tema con el Mundial (ej: "Esta iniciativa cobra relevancia ante la llegada del Mundial 2026", "El sector hotelero se prepara para el Mundial de Fútbol 2026", "Coyoacán, que será sede del Mundial 2026 por tercera ocasión...")
9. Idioma: español

FUENTES PRIORITARIAS: La Jornada, El Universal, El Proceso, SinEmbargo, Aristegui Noticias

El artículo debe tener 4-6 secciones con subtítulos descriptivos.`
      },
      {
        role: 'user',
        content: `Genera un artículo periodístico basado en estas noticias recientes:

${newsContext}

Tema del día: ${theme}
Fecha: ${dateEs}

CONTEXTO IMPORTANTE: Coyoacán será sede del Mundial de Fútbol 2026 por tercera ocasión (después de 1970 y 1986). Si el artículo NO menciona el Mundial, incluye al menos una referencia natural conectando el tema con este evento.

Devuelve el artículo en formato JSON con esta estructura:
{
  "headlineEs": "Titular periodístico (máx 100 caracteres)",
  "summaryEs": "Lead/resumen para primera plana (150-200 caracteres)",
  "contentEs": [
    {"title": "Subtítulo 1", "text": "Párrafo completo..."},
    {"title": "Subtítulo 2", "text": "Párrafo completo..."}
  ],
  "headlineEn": "English headline",
  "summaryEn": "English summary",
  "contentEn": [
    {"title": "Subtitle 1", "text": "Full paragraph..."},
    {"title": "Subtitle 2", "text": "Full paragraph..."}
  ]
}`
      }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'article_content',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            headlineEs: { type: 'string' },
            summaryEs: { type: 'string' },
            contentEs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  text: { type: 'string' }
                },
                required: ['title', 'text'],
                additionalProperties: false
              }
            },
            headlineEn: { type: 'string' },
            summaryEn: { type: 'string' },
            contentEn: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  text: { type: 'string' }
                },
                required: ['title', 'text'],
                additionalProperties: false
              }
            }
          },
          required: ['headlineEs', 'summaryEs', 'contentEs', 'headlineEn', 'summaryEn', 'contentEn'],
          additionalProperties: false
        }
      }
    }
  });
  
  const article = JSON.parse(response.choices[0].message.content);
  
  // Generate slug
  const slug = article.headlineEs
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
  
  console.log(`✅ Article generated: "${article.headlineEs}"`);
  
  return {
    ...article,
    slug: `${slug}-${dateISO}`,
    dateISO,
    dateEs,
    dateEn
  };
}

// Generate subjective editorial image
async function generateEditorialImage(article, theme) {
  console.log('🎨 Generating subjective editorial image...');
  
  // Create image prompt based on article theme
  const imagePromptResponse = await invokeLLM({
    messages: [
      {
        role: 'system',
        content: `Eres un director de arte para un periódico digital. Crea prompts para imágenes SUBJETIVAS y EDITORIALES que representen el tema del artículo "bajo la lupa".

Características:
- Perspectiva: subjetiva, editorial, NO documental
- Estilo: artístico, atmosférico, simbólico
- Composición: close-up, enfoque en detalles, evocativo
- Mood: crítico, esperanzador, nostálgico (según tema)
- Técnica: iluminación dramática, enfoque selectivo, sombras fuertes

Ejemplos:
- "Close-up of worn soccer ball on cobblestone street with child's foot in old sneakers, dramatic shadows, black and white documentary style, shallow depth of field, gritty urban atmosphere"
- "Extreme close-up of colonial stone wall with moss and weathering, warm golden hour light, selective focus, texture emphasis, atmospheric perspective"
- "Hands of elderly person holding vintage photograph, soft window light, shallow depth of field, nostalgic mood, warm tones"`
      },
      {
        role: 'user',
        content: `Crea un prompt para una imagen editorial subjetiva que represente este artículo:

Titular: ${article.headlineEs}
Resumen: ${article.summaryEs}
Tema: ${theme}

Devuelve solo el prompt en inglés para DALL-E, máximo 400 caracteres.`
      }
    ]
  });
  
  const imagePrompt = imagePromptResponse.choices[0].message.content.trim();
  console.log('Image prompt:', imagePrompt);
  
  // Generate image
  const imageResult = await generateImage({ prompt: imagePrompt });
  
  // Download image
  const imageResponse = await fetch(imageResult.url);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  
  // Upload to S3
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const fileKey = `diario-coyoacan/articles/${article.slug}-${randomSuffix}.png`;
  
  const uploadResult = await storagePut(fileKey, imageBuffer, 'image/png');
  
  console.log(`✅ Image uploaded: ${uploadResult.url}`);
  
  return uploadResult.url;
}

// Publish article to database
async function publishArticle(article, imageUrl, category) {
  console.log('💾 Publishing article to database...');
  
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);
  
  try {
    await db.insert(articles).values({
      slug: article.slug,
      dateISO: article.dateISO,
      weatherTemp: 22,
      weatherConditionEs: 'Soleado',
      weatherConditionEn: 'Sunny',
      locationAddress: 'Alcaldía Coyoacán, Ciudad de México',
      locationLat: '19.3467',
      locationLng: '-99.1618',
      locationMapsUrl: 'https://maps.google.com/?q=19.3467,-99.1618',
      heroImage: imageUrl,
      headlineEs: article.headlineEs,
      summaryEs: article.summaryEs,
      categoryEs: category.category,
      dateEs: article.dateEs,
      contentEs: JSON.stringify(article.contentEs),
      menuItemsEs: JSON.stringify([{ item: 'N/A', desc: 'N/A', price: 'N/A' }]),
      hoursWeekEs: 'N/A',
      hoursSundayEs: 'N/A',
      headlineEn: article.headlineEn,
      summaryEn: article.summaryEn,
      categoryEn: category.categoryEn,
      dateEn: article.dateEn,
      contentEn: JSON.stringify(article.contentEn),
      menuItemsEn: JSON.stringify([{ item: 'N/A', desc: 'N/A', price: 'N/A' }]),
      hoursWeekEn: 'N/A',
      hoursSundayEn: 'N/A'
    });
    
    console.log('✅ Article published successfully');
  } finally {
    await connection.end();
  }
}

// Send newsletter to subscribers
async function sendNewsletter() {
  console.log('📧 Sending newsletter to subscribers...');
  
  try {
    // Call the tRPC endpoint via HTTP
    const response = await fetch(`${process.env.VITE_APP_URL || 'http://localhost:3000'}/api/trpc/newsletter.sendDaily`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    
    if (!response.ok) {
      throw new Error(`Newsletter send failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('✅ Newsletter sent successfully:', result);
  } catch (error) {
    console.error('❌ Error sending newsletter:', error);
    throw error;
  }
}

// Main automation function
async function main() {
  console.log('🚀 Starting daily article automation...');
  console.log('Time:', new Date().toLocaleString('es-MX'));
  
  try {
    // 1. Get today's theme
    const dailyTheme = getDailyTheme();
    console.log(`📅 Today's theme: ${dailyTheme.theme} (${dailyTheme.category})`);
    
    // 2. Search for news
    const newsItems = await searchNews(dailyTheme.theme);
    
    if (newsItems.length === 0) {
      throw new Error('No news items found');
    }
    
    // 3. Generate article
    const article = await generateArticle(newsItems, dailyTheme.theme);
    
    // 4. Generate editorial image
    const imageUrl = await generateEditorialImage(article, dailyTheme.theme);
    
    // 5. Publish article
    await publishArticle(article, imageUrl, dailyTheme);
    
    // 6. Send newsletter
    await sendNewsletter();
    
    console.log('✅ Daily automation completed successfully!');
    console.log(`📰 Article: "${article.headlineEs}"`);
    console.log(`🔗 Slug: ${article.slug}`);
    console.log(`🖼️  Image: ${imageUrl}`);
    
  } catch (error) {
    console.error('❌ Automation failed:', error);
    process.exit(1);
  }
}

// Run automation
main();
