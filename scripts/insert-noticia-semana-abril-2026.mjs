/**
 * Script de inserción: Noticia semanal Coyoacán/CDMX — semana 23-30 abril 2026
 * Diario Coyoacán — Crónica periodística en pasado
 * SEO: schema.org NewsArticle, keywords long-tail, estructura semántica
 *
 * Uso: node scripts/insert-noticia-semana-abril-2026.mjs
 */

import { createConnection } from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL no definida. Verifica tu .env");
  process.exit(1);
}

// ─── Datos de la noticia ─────────────────────────────────────────────────────

const SLUG = "coyoacan-cdmx-semana-telescopios-ccxp-leonora-carrington-fiesta-libro-31-minutos-abril-2026";

const TITLE = "Coyoacán y la CDMX se desbordaron: telescopios, CCXP, Leonora Carrington, Fiesta del Libro y 230 mil personas con 31 Minutos en el Zócalo";

const SUMMARY = "La semana del 23 al 30 de abril de 2026 quedará grabada en la memoria colectiva de la Ciudad de México. Cinco eventos de distinta naturaleza —científico, geek, literario, artístico y musical— coincidieron en la capital y en el corazón de Coyoacán, convirtiendo esos días en una de las semanas culturales más densas del año.";

const CATEGORY = "Crónica Cultural";

const DATE = "1 de mayo de 2026";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/31minutos-zocalo-multitud_6c54f141.jpg";

// Contenido en formato JSON (array de secciones con tipo, título, texto e imágenes)
const CONTENT = JSON.stringify([
  {
    type: "intro",
    text: "La semana del 23 al 30 de abril de 2026 quedará grabada en la memoria colectiva de la Ciudad de México. Cinco eventos de distinta naturaleza —científico, geek, literario, artístico y musical— coincidieron en la capital y en el corazón de Coyoacán, convirtiendo esos días en una de las semanas culturales más densas del año. Esta es la crónica de lo que pasó."
  },
  {
    type: "section",
    title: "Sábado 25 de abril: Telescopios, terror y cerveza bajo el cielo de Coyoacán",
    text: "El Ex Convento de Churubusco, en el corazón de Coyoacán, fue el escenario de una noche que combinó tres cosas que pocas veces comparten espacio: astronomía, cine de terror y cerveza artesanal. El evento, que se agotó en horas, reunió a astrónomos aficionados que instalaron telescopios en los jardines del convento para apuntar hacia Saturno y sus anillos, mientras en el interior se proyectaban cortometrajes de terror independiente mexicano. Las cervezas artesanales de productores locales completaron una velada que duró hasta la madrugada bajo un cielo inusualmente despejado para la temporada.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/telescopios-terror-cerveza-coyoacan_98cb1db3.jpg",
    imageAlt: "Noche de telescopios, terror y cerveza artesanal en el Ex Convento de Churubusco, Coyoacán",
    imageCredit: "Foto: Chilango / CDMX Secreta",
    imageSource: "https://www.chilango.com"
  },
  {
    type: "section",
    title: "24 al 26 de abril: CCXP México 2026 — Aaron Paul, Christopher Lloyd y Spider-Man Noir",
    text: "El Centro Citibanamex se convirtió durante tres días en la capital geek de América Latina. La Comic Con Experience México 2026 trajo a Aaron Paul (Jesse Pinkman en Breaking Bad) y a Christopher Lloyd (Doc Brown en Volver al Futuro) para presentar juntos el panel de Spider-Man Noir, la nueva serie de Amazon Prime Video que los reúne en pantalla por primera vez. La revelación del primer vistazo a los villanos de la serie desató una ovación que se escuchó en toda la sala principal. Más de 80,000 asistentes pasaron por el Citibanamex durante los tres días, agotando la disponibilidad hotelera en Polanco y zonas aledañas.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/ccxp-mx-2026-christopher-lloyd_6f0438c4.jpg",
    imageAlt: "Christopher Lloyd en el escenario principal de CCXP México 2026, Centro Citibanamex",
    imageCredit: "Foto: Paloma & Nacho / CCXP MX",
    imageSource: "https://www.ccxp.mx"
  },
  {
    type: "section",
    title: "23 al 26 de abril: Fiesta del Libro y la Rosa UNAM — 'Nombrar para existir'",
    text: "Ciudad Universitaria vivió cuatro días de presentaciones, talleres y conciertos bajo el lema 'Nombrar para existir'. La Fiesta del Libro y la Rosa 2026, organizada por la UNAM, reunió a escritores, poetas y editores de más de 20 países en el Centro Cultural Universitario. La entrada fue libre y el aforo se agotó en los eventos principales. La escritora Cristina Rivera Garza, Premio Pulitzer 2024, encabezó la sesión inaugural con una lectura que arrancó aplausos de pie. Los puestos de libros, flores y artesanías llenaron los jardines de CU durante todo el fin de semana.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/fiesta-libro-rosa-unam-asistentes_3b64310e.jpg",
    imageAlt: "Asistentes en la Fiesta del Libro y la Rosa 2026 en Ciudad Universitaria, UNAM",
    imageCredit: "Foto: Milenio / Gaceta UNAM",
    imageSource: "https://www.milenio.com"
  },
  {
    type: "section",
    title: "Leonora Carrington: Laberinto Mágico sigue convocando multitudes en el CAI",
    text: "La exposición inmersiva dedicada a Leonora Carrington, instalada en el Centro de las Artes Inmersivas (CAI) en la Colonia Juárez, continuó siendo uno de los eventos más comentados de la temporada. Las 14 salas de inmersión total que recrean el universo surrealista de la artista británico-mexicana —sus bestias mitológicas, sus laberintos de luz y sus jardines imposibles— recibieron miles de visitantes durante la semana. La exposición permanece abierta hasta el 2 de septiembre de 2026. Los boletos, desde $291 pesos, se agotan con días de anticipación en fines de semana.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/leonora-carrington-laberinto-magico-cai_aff30402.jpg",
    imageAlt: "Sala inmersiva de la exposición Laberinto Mágico de Leonora Carrington en el CAI, Colonia Juárez CDMX",
    imageCredit: "Foto: Mundo Internacional / Escapada H",
    imageSource: "https://cdmxsecreta.com"
  },
  {
    type: "section",
    title: "30 de abril: 31 Minutos llenó el Zócalo con 230,000 personas",
    text: "El cierre de semana fue histórico. El miércoles 30 de abril, Día del Niño, la Plaza de la Constitución registró una de sus mayores concentraciones de los últimos años: más de 230,000 personas se reunieron para ver a 31 Minutos en un concierto gratuito organizado por el Gobierno de la Ciudad de México. La Jefa de Gobierno, Clara Brugada, confirmó la cifra oficial al término del espectáculo. El grupo chileno, que lleva más de dos décadas conquistando a generaciones de niños y adultos con sus marionetas y sus canciones sobre la televisión y la vida cotidiana, abrió con 'Vivimos de la desgracia ajena' y cerró con la aparición en vivo de las personas detrás de las marionetas, lo que desató una ovación generalizada.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/31minutos-zocalo-multitud_6c54f141.jpg",
    imageAlt: "230,000 personas en el Zócalo de la Ciudad de México durante el concierto de 31 Minutos el 30 de abril de 2026",
    imageCredit: "Foto: REUTERS / Raquel Cunha",
    imageSource: "https://www.infobae.com/mexico/2026/05/01/exito-total-en-el-zocalo-31-minutos-reune-a-mas-de-200-mil-asistentes-en-la-cdmx/"
  },
  {
    type: "section",
    title: "El setlist completo y los momentos que nadie olvidará",
    text: "El concierto de 31 Minutos en el Zócalo duró poco más de dos horas. Tulio Triviño y Patana condujeron el espectáculo con su energía característica, mientras Bodoque apareció en el segmento 'Ritmo Sideral' para interpretar su icónico tema. El público, que llegó con títeres caseros, disfraces y diademas de los personajes, cantó cada canción de memoria. El setlist incluyó 'Yo nunca vi televisión', 'Mi muñeca me habló', 'Ríe', 'Diente Blanco' —con el clásico diente volador sobre el escenario—, 'Tangananica, Tanganana', 'Objeción denegada' y 'Lala'. Los extraterrestres del planeta Cilurio hicieron su aparición estelar en el cierre, y la revelación de los actores detrás de las marionetas generó el momento más emotivo de la noche.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/31minutos-zocalo-escenario_45422350.jpg",
    imageAlt: "Escenario del concierto de 31 Minutos en el Zócalo CDMX con Tulio, Patana y Bodoque",
    imageCredit: "Foto: REUTERS / Raquel Cunha",
    imageSource: "https://www.infobae.com/mexico/2026/05/01/exito-total-en-el-zocalo-31-minutos-reune-a-mas-de-200-mil-asistentes-en-la-cdmx/"
  },
  {
    type: "ranking",
    title: "El Zócalo y sus conciertos históricos: 31 Minutos entra al top 5",
    text: "Con 230,000 asistentes confirmados, 31 Minutos se ubicó en el cuarto lugar histórico de los conciertos gratuitos en la Plaza de la Constitución, por encima de Vicente Fernández (2009), Justin Bieber (2012), Paul McCartney (2012) y Roger Waters (2016). Solo Shakira (2026, +400,000), Los Fabulosos Cadillacs (2023, ~300,000) y Grupo Firme (2022, ~280,000) superaron la cifra.",
    table: [
      { pos: 1, artista: "Shakira", año: 2026, asistencia: "+400,000" },
      { pos: 2, artista: "Los Fabulosos Cadillacs", año: 2023, asistencia: "~300,000" },
      { pos: 3, artista: "Grupo Firme", año: 2022, asistencia: "~280,000" },
      { pos: 4, artista: "31 Minutos", año: 2026, asistencia: "+230,000" },
      { pos: 5, artista: "Vicente Fernández", año: 2009, asistencia: "+217,000" },
      { pos: 6, artista: "Justin Bieber", año: 2012, asistencia: "+210,000" },
      { pos: 7, artista: "Paul McCartney", año: 2012, asistencia: "+200,000" }
    ]
  },
  {
    type: "cta",
    title: "¿Vienes a la CDMX y quieres vivir semanas como esta?",
    text: "Coyoacán es el barrio desde donde se vive mejor la Ciudad de México. A 20 minutos del Zócalo, a 10 del CAI y con acceso directo a CU, los hospedajes de SúperAnfitrión te ubican en el centro de todo lo que pasa. Entrada autónoma, sin recepción, con la comodidad de un espacio real. Consulta disponibilidad.",
    ctaLabel: "Ver hospedajes en Coyoacán",
    ctaUrl: "https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
  },
  {
    type: "sources",
    title: "Fuentes consultadas",
    sources: [
      { name: "Infobae México — Éxito total en el Zócalo: 31 Minutos reúne a más de 200 mil asistentes", url: "https://www.infobae.com/mexico/2026/05/01/exito-total-en-el-zocalo-31-minutos-reune-a-mas-de-200-mil-asistentes-en-la-cdmx/" },
      { name: "REUTERS / Raquel Cunha — Fotografías del concierto de 31 Minutos en el Zócalo", url: "https://www.reuters.com" },
      { name: "UNAM — Fiesta del Libro y la Rosa 2026", url: "https://www.fiestadellibroylarosa.unam.mx" },
      { name: "Gaceta UNAM — La Fiesta del Libro y la Rosa 2026 apuesta por la cultura de paz", url: "https://www.gaceta.unam.mx" },
      { name: "Chilango — Noche de telescopios, terror y cerveza en Coyoacán", url: "https://www.chilango.com" },
      { name: "CDMX Secreta — Telescopios, cerveza y terror en Coyoacán", url: "https://cdmxsecreta.com" },
      { name: "CCXP México 2026 — Día 1: resumen completo, anuncios y paneles", url: "https://www.ccxp.mx" },
      { name: "Mundo Internacional — Laberinto Mágico de Leonora Carrington abre en el CAI", url: "https://mundointernacional.mx" }
    ]
  }
]);

// ─── Inserción en base de datos ───────────────────────────────────────────────

async function main() {
  const conn = await createConnection(DATABASE_URL);
  
  try {
    // Verificar si ya existe
    const [existing] = await conn.execute(
      "SELECT id FROM newsArticles WHERE slug = ?",
      [SLUG]
    );
    
    if (existing.length > 0) {
      console.log(`⚠️  Artículo ya existe con slug: ${SLUG}`);
      console.log("Actualizando contenido...");
      
      await conn.execute(
        `UPDATE newsArticles SET 
          title = ?, summary = ?, content = ?, heroImage = ?,
          category = ?, date = ?, updatedAt = NOW()
         WHERE slug = ?`,
        [TITLE, SUMMARY, CONTENT, HERO_IMAGE, CATEGORY, DATE, SLUG]
      );
      
      console.log("✅ Artículo actualizado correctamente");
    } else {
      await conn.execute(
        `INSERT INTO newsArticles (slug, title, summary, content, heroImage, category, date, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [SLUG, TITLE, SUMMARY, CONTENT, HERO_IMAGE, CATEGORY, DATE]
      );
      
      console.log("✅ Artículo insertado correctamente");
    }
    
    console.log(`\n📰 Título: ${TITLE}`);
    console.log(`🔗 Slug: ${SLUG}`);
    console.log(`📅 Fecha: ${DATE}`);
    console.log(`🖼️  Hero: ${HERO_IMAGE}`);
    console.log(`\n🌐 URL: /noticias/${SLUG}`);
    
  } catch (error) {
    console.error("❌ Error al insertar artículo:", error);
    throw error;
  } finally {
    await conn.end();
  }
}

main().catch(console.error);
