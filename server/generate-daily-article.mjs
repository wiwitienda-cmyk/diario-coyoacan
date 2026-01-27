import { drizzle } from "drizzle-orm/mysql2";
import { articles } from "../drizzle/schema.ts";
import { invokeLLM } from "./_core/llm.ts";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

// Lista de lugares emblemáticos de Coyoacán para generar artículos
const coyoacanPlaces = [
  {
    name: "Jardín Centenario",
    type: "plaza",
    keywords: "fuente, kiosco, artesanías, ambiente bohemio"
  },
  {
    name: "Casa Azul (Museo Frida Kahlo)",
    type: "museo",
    keywords: "Frida Kahlo, arte mexicano, historia, cultura"
  },
  {
    name: "Viveros de Coyoacán",
    type: "parque",
    keywords: "naturaleza, jogging, árboles, tranquilidad"
  },
  {
    name: "Librería El Péndulo",
    type: "librería-café",
    keywords: "libros, café, música en vivo, cultura"
  },
  {
    name: "Coyoacán Market",
    type: "mercado",
    keywords: "tostadas, comida tradicional, artesanías"
  }
];

// Función para obtener un lugar aleatorio que no se haya usado recientemente
async function getNextPlace() {
  // Obtener los últimos 3 artículos para evitar repetir
  const recentArticles = await db.select().from(articles).orderBy(articles.dateISO).limit(3);
  const recentSlugs = recentArticles.map(a => a.slug);
  
  // Filtrar lugares no usados recientemente
  const availablePlaces = coyoacanPlaces.filter(place => {
    const slug = place.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return !recentSlugs.includes(slug);
  });
  
  if (availablePlaces.length === 0) {
    // Si todos fueron usados, usar cualquiera
    return coyoacanPlaces[Math.floor(Math.random() * coyoacanPlaces.length)];
  }
  
  return availablePlaces[Math.floor(Math.random() * availablePlaces.length)];
}

// Función para generar el artículo con IA
async function generateArticleContent(place) {
  const prompt = `Eres un periodista local experto en Coyoacán, Ciudad de México. Escribe un artículo periodístico estilo "Diario Local" sobre: ${place.name}.

CONTEXTO:
- Tipo de lugar: ${place.type}
- Características clave: ${place.keywords}
- Tono: Cálido, informativo, con personalidad local
- Audiencia: Turistas y locales que buscan experiencias auténticas

GENERA UN JSON con esta estructura EXACTA (sin markdown, solo JSON puro):
{
  "slug": "nombre-del-lugar-en-kebab-case",
  "headlineEs": "Título atractivo en español (máx 80 caracteres)",
  "headlineEn": "Attractive English title (max 80 chars)",
  "summaryEs": "Resumen breve en español (1-2 oraciones, máx 150 caracteres)",
  "summaryEn": "Brief English summary (1-2 sentences, max 150 chars)",
  "categoryEs": "Categoría en español (ej: Cultura, Gastronomía, Naturaleza)",
  "categoryEn": "Category in English",
  "contentEs": [
    {
      "title": "Subtítulo 1 en español",
      "text": "Párrafo descriptivo de 3-4 oraciones sobre el lugar, su historia o ambiente."
    },
    {
      "title": "Subtítulo 2 en español",
      "text": "Párrafo de 3-4 oraciones sobre qué hacer, qué esperar, o experiencias destacadas."
    }
  ],
  "contentEn": [
    {
      "title": "Subtitle 1 in English",
      "text": "Descriptive paragraph of 3-4 sentences about the place, its history or atmosphere."
    },
    {
      "title": "Subtitle 2 in English",
      "text": "Paragraph of 3-4 sentences about what to do, what to expect, or featured experiences."
    }
  ],
  "menuItemsEs": [
    {"item": "Nombre del item 1", "desc": "Descripción breve", "price": "$XX"},
    {"item": "Nombre del item 2", "desc": "Descripción breve", "price": "$XX"},
    {"item": "Nombre del item 3", "desc": "Descripción breve", "price": "$XX"},
    {"item": "Nombre del item 4", "desc": "Descripción breve", "price": "$XX"}
  ],
  "menuItemsEn": [
    {"item": "Item name 1", "desc": "Brief description", "price": "$XX"},
    {"item": "Item name 2", "desc": "Brief description", "price": "$XX"},
    {"item": "Item name 3", "desc": "Brief description", "price": "$XX"},
    {"item": "Item name 4", "desc": "Brief description", "price": "$XX"}
  ],
  "locationAddress": "Dirección completa real del lugar",
  "locationLat": "Latitud (formato: 19.XXXX)",
  "locationLng": "Longitud (formato: -99.XXXX)",
  "weatherConditionEs": "Condición climática en español (ej: Soleado, Nublado)",
  "weatherConditionEn": "Weather condition in English"
}

IMPORTANTE:
- Los "menuItems" deben ser relevantes al tipo de lugar (si es café: bebidas/comida; si es museo: tickets/tours; si es parque: actividades/servicios)
- Usa datos reales de ubicación de Coyoacán
- Precios realistas para CDMX 2026
- NO uses markdown, solo JSON puro`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "Eres un asistente que genera contenido en formato JSON. Siempre respondes únicamente con JSON válido, sin texto adicional ni formato markdown." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article_content",
          strict: true,
          schema: {
            type: "object",
            properties: {
              slug: { type: "string" },
              headlineEs: { type: "string" },
              headlineEn: { type: "string" },
              summaryEs: { type: "string" },
              summaryEn: { type: "string" },
              categoryEs: { type: "string" },
              categoryEn: { type: "string" },
              contentEs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    text: { type: "string" }
                  },
                  required: ["title", "text"],
                  additionalProperties: false
                }
              },
              contentEn: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    text: { type: "string" }
                  },
                  required: ["title", "text"],
                  additionalProperties: false
                }
              },
              menuItemsEs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    item: { type: "string" },
                    desc: { type: "string" },
                    price: { type: "string" }
                  },
                  required: ["item", "desc", "price"],
                  additionalProperties: false
                }
              },
              menuItemsEn: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    item: { type: "string" },
                    desc: { type: "string" },
                    price: { type: "string" }
                  },
                  required: ["item", "desc", "price"],
                  additionalProperties: false
                }
              },
              locationAddress: { type: "string" },
              locationLat: { type: "string" },
              locationLng: { type: "string" },
              weatherConditionEs: { type: "string" },
              weatherConditionEn: { type: "string" }
            },
            required: [
              "slug", "headlineEs", "headlineEn", "summaryEs", "summaryEn",
              "categoryEs", "categoryEn", "contentEs", "contentEn",
              "menuItemsEs", "menuItemsEn", "locationAddress",
              "locationLat", "locationLng", "weatherConditionEs", "weatherConditionEn"
            ],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating article with AI:", error);
    throw error;
  }
}

// Función principal
async function generateDailyArticle() {
  console.log("🤖 Iniciando generación de artículo diario...");
  
  try {
    // 1. Seleccionar lugar
    const place = await getNextPlace();
    console.log(`📍 Lugar seleccionado: ${place.name}`);
    
    // 2. Generar contenido con IA
    console.log("✍️  Generando contenido con IA...");
    const content = await generateArticleContent(place);
    
    // 3. Preparar datos para la base de datos
    const today = new Date();
    const dateISO = today.toISOString().split('T')[0]; // YYYY-MM-DD
    
    const dateEs = today.toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    const dateEn = today.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    // Temperatura aleatoria realista para CDMX (18-28°C)
    const weatherTemp = Math.floor(Math.random() * 11) + 18;
    
    const articleData = {
      slug: content.slug,
      dateISO,
      weatherTemp,
      weatherConditionEs: content.weatherConditionEs,
      weatherConditionEn: content.weatherConditionEn,
      
      locationAddress: content.locationAddress,
      locationLat: content.locationLat,
      locationLng: content.locationLng,
      locationMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.locationAddress)}`,
      
      heroImage: "/images/placeholder-article.jpg", // Placeholder - se puede mejorar con generación de imágenes
      
      headlineEs: content.headlineEs,
      summaryEs: content.summaryEs,
      categoryEs: content.categoryEs,
      dateEs,
      contentEs: JSON.stringify(content.contentEs),
      menuItemsEs: JSON.stringify(content.menuItemsEs),
      hoursWeekEs: "09:00 - 20:00",
      hoursSundayEs: "10:00 - 18:00",
      
      headlineEn: content.headlineEn,
      summaryEn: content.summaryEn,
      categoryEn: content.categoryEn,
      dateEn,
      contentEn: JSON.stringify(content.contentEn),
      menuItemsEn: JSON.stringify(content.menuItemsEn),
      hoursWeekEn: "09:00 AM - 08:00 PM",
      hoursSundayEn: "10:00 AM - 06:00 PM",
    };
    
    // 4. Guardar en la base de datos
    console.log("💾 Guardando en la base de datos...");
    await db.insert(articles).values(articleData);
    
    console.log("✅ ¡Artículo generado y publicado exitosamente!");
    console.log(`📰 Título: ${content.headlineEs}`);
    console.log(`🔗 Slug: ${content.slug}`);
    console.log(`📅 Fecha: ${dateEs}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generando artículo:", error);
    process.exit(1);
  }
}

// Ejecutar
generateDailyArticle();
