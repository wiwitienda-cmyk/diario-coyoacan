#!/usr/bin/env node
/**
 * Generador automático de artículos diarios para Diario Coyoacán
 * 
 * Calendario temático semanal:
 * - Lunes: Nuevo café o lugar en Coyoacán
 * - Martes: Noticias de transporte/movilidad
 * - Miércoles: Historia o curiosidad de Coyoacán
 * - Jueves: Guía de fin de semana - qué hacer
 * - Viernes: Evento cultural en CDMX
 * - Sábado: Guía gastronómica
 * - Domingo: Lugares para visitar en CDMX
 * 
 * Uso:
 *   node scripts/generate-daily-article.mjs
 * 
 * El script genera un archivo SQL listo para insertar en la base de datos.
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Calendario temático
const WEEKLY_THEMES = {
  0: { // Domingo
    theme: 'Lugares para visitar en CDMX',
    category: 'Cultura y Turismo',
    prompt: 'Escribe un artículo periodístico sobre un lugar interesante para visitar en la Ciudad de México (fuera de Coyoacán). Incluye historia, qué ver, cómo llegar desde Coyoacán, horarios y precios. Menciona sutilmente SúperAnfitrión Coyoacán como opción de hospedaje.'
  },
  1: { // Lunes
    theme: 'Nuevo café o lugar en Coyoacán',
    category: 'Gastronomía',
    prompt: 'Escribe un artículo periodístico sobre un café, restaurante o lugar poco conocido en Coyoacán. Enfócate en lo auténtico y local, evita lugares turísticos. Incluye menú destacado, horarios, ubicación y ambiente. Menciona SúperAnfitrión Coyoacán.'
  },
  2: { // Martes
    theme: 'Noticias de transporte/movilidad',
    category: 'Movilidad',
    prompt: 'Escribe un artículo periodístico sobre noticias de transporte o movilidad en CDMX que afecten a residentes y visitantes de Coyoacán. Puede ser sobre Metro, Metrobús, ciclovías, o cambios viales. Sé informativo y útil.'
  },
  3: { // Miércoles
    theme: 'Historia o curiosidad de Coyoacán',
    category: 'Historia',
    prompt: 'Escribe un artículo periodístico sobre un hecho histórico, leyenda o curiosidad poco conocida de Coyoacán. Investiga y presenta datos interesantes con tono narrativo. Conecta el pasado con el presente.'
  },
  4: { // Jueves
    theme: 'Guía de fin de semana',
    category: 'Cultura y Eventos',
    prompt: 'Escribe un artículo periodístico tipo guía para el fin de semana en Coyoacán y CDMX. Incluye eventos, exposiciones, conciertos o actividades especiales. Proporciona horarios, precios y cómo llegar.'
  },
  5: { // Viernes
    theme: 'Evento cultural en CDMX',
    category: 'Cultura y Eventos',
    prompt: 'Escribe un artículo periodístico sobre un evento cultural próximo en CDMX (exposición, concierto, festival, feria). Incluye fechas, ubicación, costo y qué esperar. Menciona cómo llegar desde Coyoacán.'
  },
  6: { // Sábado
    theme: 'Guía gastronómica',
    category: 'Gastronomía',
    prompt: 'Escribe un artículo periodístico sobre una ruta gastronómica, platillo típico o experiencia culinaria en Coyoacán o CDMX. Enfócate en lo auténtico y local. Incluye recomendaciones específicas y precios.'
  }
};

// Obtener tema del día
const today = new Date();
const dayOfWeek = today.getDay();
const themeData = WEEKLY_THEMES[dayOfWeek];

console.log(`\n📰 Generador de Artículos - Diario Coyoacán`);
console.log(`📅 Fecha: ${today.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
console.log(`🎯 Tema del día: ${themeData.theme}`);
console.log(`📁 Categoría: ${themeData.category}\n`);

console.log(`⚠️  IMPORTANTE: Este script genera la estructura SQL.`);
console.log(`    Para generar el contenido del artículo, usa el LLM con este prompt:\n`);
console.log(`"${themeData.prompt}"\n`);
console.log(`    Luego completa el SQL con el contenido generado.\n`);

// Generar slug base
const slugBase = `${themeData.theme.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${today.toISOString().split('T')[0]}`;

// Template SQL
const sqlTemplate = `-- Artículo generado automáticamente
-- Fecha: ${today.toISOString().split('T')[0]}
-- Tema: ${themeData.theme}
-- Categoría: ${themeData.category}

-- INSTRUCCIONES:
-- 1. Genera el contenido del artículo usando el LLM
-- 2. Genera la imagen periodística subjetiva
-- 3. Copia la imagen a client/public/images/
-- 4. Completa los campos [PENDIENTE] con el contenido generado
-- 5. Ejecuta este SQL con webdev_execute_sql

INSERT INTO articles (
  slug,
  headlineEs,
  headlineEn,
  summaryEs,
  summaryEn,
  contentEs,
  contentEn,
  featuredImage,
  category,
  dateISO,
  locationAddress,
  locationLat,
  locationLng,
  hoursWeek,
  hoursSunday,
  menuHighlights,
  createdAt,
  updatedAt
) VALUES (
  '${slugBase}',
  '[PENDIENTE - Título en español]',
  '[PENDIENTE - Title in English]',
  '[PENDIENTE - Resumen en español (150-200 caracteres)]',
  '[PENDIENTE - Summary in English (150-200 characters)]',
  '[PENDIENTE - Contenido completo en español en formato JSON: [{"title":"Sección 1","text":"Texto..."},{"title":"Sección 2","text":"Texto..."}]]',
  '[PENDIENTE - Full content in English in JSON format: [{"title":"Section 1","text":"Text..."},{"title":"Section 2","text":"Text..."}]]',
  '/images/[PENDIENTE-nombre-imagen].jpg',
  '${themeData.category}',
  '${today.toISOString().split('T')[0]}',
  '[PENDIENTE - Dirección si aplica, o NULL]',
  NULL,
  NULL,
  '[PENDIENTE - Horarios si aplica, o NULL]',
  '[PENDIENTE - Horarios domingo si aplica, o NULL]',
  '[PENDIENTE - Menú destacado en JSON si aplica: [{"item":"Nombre","desc":"Descripción","price":"$XX"}], o NULL]',
  NOW(),
  NOW()
);

-- PROMPT PARA EL LLM:
-- "${themeData.prompt}"
--
-- Formato de respuesta esperado:
-- {
--   "headlineEs": "Título en español",
--   "headlineEn": "Title in English",
--   "summaryEs": "Resumen en español",
--   "summaryEn": "Summary in English",
--   "contentEs": [{"title":"Sección 1","text":"Texto..."}],
--   "contentEn": [{"title":"Section 1","text":"Text..."}],
--   "locationAddress": "Dirección (si aplica)",
--   "hoursWeek": "Lun-Sáb: 09:00 - 21:00 (si aplica)",
--   "hoursSunday": "Dom: 10:00 - 18:00 (si aplica)",
--   "menuHighlights": [{"item":"Nombre","desc":"Descripción","price":"$XX"}] (si aplica)
-- }
`;

// Guardar SQL template
const outputPath = join(process.cwd(), 'generated-articles', `article-${slugBase}.sql`);
writeFileSync(outputPath, sqlTemplate, 'utf-8');

console.log(`✅ Template SQL generado: ${outputPath}\n`);
console.log(`📝 Próximos pasos:`);
console.log(`   1. Usa el LLM para generar el contenido del artículo`);
console.log(`   2. Genera la imagen periodística subjetiva`);
console.log(`   3. Completa el SQL con el contenido generado`);
console.log(`   4. Ejecuta el SQL con webdev_execute_sql\n`);
