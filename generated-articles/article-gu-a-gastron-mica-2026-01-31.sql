-- Artículo generado automáticamente
-- Fecha: 2026-01-31
-- Tema: Guía gastronómica
-- Categoría: Gastronomía

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
  'gu-a-gastron-mica-2026-01-31',
  '[PENDIENTE - Título en español]',
  '[PENDIENTE - Title in English]',
  '[PENDIENTE - Resumen en español (150-200 caracteres)]',
  '[PENDIENTE - Summary in English (150-200 characters)]',
  '[PENDIENTE - Contenido completo en español en formato JSON: [{"title":"Sección 1","text":"Texto..."},{"title":"Sección 2","text":"Texto..."}]]',
  '[PENDIENTE - Full content in English in JSON format: [{"title":"Section 1","text":"Text..."},{"title":"Section 2","text":"Text..."}]]',
  '/images/[PENDIENTE-nombre-imagen].jpg',
  'Gastronomía',
  '2026-01-31',
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
-- "Escribe un artículo periodístico sobre una ruta gastronómica, platillo típico o experiencia culinaria en Coyoacán o CDMX. Enfócate en lo auténtico y local. Incluye recomendaciones específicas y precios."
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
