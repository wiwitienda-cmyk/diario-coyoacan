import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const articleData = {
  slug: 'coyoacan-une-cultura-y-solidaridad-en-festival-por-cuba-y-venezuela-2026-02-15',
  dateISO: '2026-02-15',
  weatherTemp: 22,
  weatherConditionEs: 'Soleado',
  weatherConditionEn: 'Sunny',
  locationAddress: 'Jardín Hidalgo, Coyoacán, Ciudad de México',
  locationLat: '19.3467',
  locationLng: '-99.1618',
  locationMapsUrl: 'https://maps.google.com/?q=19.3467,-99.1618',
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/yaGLCgqLuvuAyEaF.png',
  headlineEs: 'Coyoacán une cultura y solidaridad en festival por Cuba y Venezuela en marco del Mundial 2026',
  summaryEs: 'La Asamblea Popular de Coyoacán organiza un festival cultural en el Jardín Hidalgo en apoyo a Cuba y Venezuela, en un fin de semana marcado por preparativos para el Mundial y alerta ambiental.',
  categoryEs: 'COMUNIDAD',
  dateEs: 'Domingo, 15 de febrero de 2026',
  contentEs: JSON.stringify([
    {
      title: "Festival de Solidaridad en el Jardín Hidalgo",
      text: "En un contexto marcado por la proximidad del Mundial de Fútbol 2026 y una reciente emergencia ambiental por ozono, la Asamblea Popular de Coyoacán contra el Imperialismo convocó a un festival cultural en solidaridad con Cuba y Venezuela. El evento se realizó este domingo 15 de febrero a las 11:00 horas en el Jardín Hidalgo, espacio emblemático del barrio colonial que ha sido escenario recurrente de expresiones sociales y culturales. El festival, que reunió a decenas de vecinos y activistas, incluyó presentaciones artísticas, música y poesía, como muestra de apoyo a los pueblos de Cuba y Venezuela, países que enfrentan tensiones políticas y económicas derivadas de políticas internacionales. La convocatoria fue difundida por N+ Noticias el mismo día, destacando el compromiso local con causas internacionales desde una perspectiva antiimperialista."
    },
    {
      title: "Contexto de Movilización Social en la CDMX",
      text: "Este acto de solidaridad se inserta en una dinámica social activa en toda la Ciudad de México. Según el mismo medio, el domingo se registraron múltiples manifestaciones, incluyendo una marcha principal, once concentraciones, siete rodadas motociclistas, once ciclistas, una rodada automovilista y otros 23 eventos de esparcimiento. Esta compleja agenda refleja el carácter plural y activo de la capital mexicana."
    },
    {
      title: "Coyoacán se Prepara para el Mundial 2026",
      text: "Simultáneamente, Coyoacán se prepara para ser uno de los puntos neurálgicos durante el Mundial de Fútbol 2026, que iniciará con la inauguración en el renovado Estadio Banorte (antes Estadio Azteca) el próximo 28 de marzo. El alcalde Giovani Gutiérrez afirmó en entrevista con Excélsior el 14 de febrero que el municipio espera recibir a más de 1.5 millones de visitantes durante el evento, y que aprovechará esta oportunidad para reforzar su vocación histórica y artística. Para ello, se han realizado importantes obras públicas: intervención en 75 escuelas, renovación de 22 mercados, mejoramiento de gimnasios y deportivos, así como trabajos en banquetas, pavimentación, redes de drenaje y agua potable, y una nueva iluminación que busca poner en valor los barrios tradicionales como Niño Jesús, La Candelaria y San Francisco Culhuacán."
    },
    {
      title: "Seguridad y Patrimonio Cultural",
      text: "Además, la seguridad ha sido un eje prioritario con la renovación de 40 patrullas y una reducción del 26% en la incidencia delictiva general, colocando a Coyoacán en primer lugar en reducción de delitos de alto impacto entre las alcaldías de la capital. Este impulso coincide con el reconocimiento del patrimonio cultural coyoacanense, cuna de personajes como Frida Kahlo, Diego Rivera, Agustín Lara y Dolores del Río. Espacios como el Museo Frida Kahlo, el Museo de las Intervenciones y el Anahuacalli forman parte del circuito artístico que se promociona para visitantes nacionales e internacionales."
    },
    {
      title: "Emergencia Ambiental por Ozono",
      text: "No obstante, el fin de semana también estuvo marcado por una emergencia ambiental. De acuerdo con La Jornada, el Valle de México vivió más de 50 horas en fase 1 de contingencia ambiental por ozono, la más prolongada en lo que va de la temporada seca-caliente. La Comisión Ambiental de la Megalópolis activó esta alerta el jueves pasado y la levantó hasta la noche del sábado, afectando severamente la calidad del aire en alcaldías como Coyoacán, Benito Juárez y Cuauhtémoc. Este episodio coincidió con un incremento en la movilidad vehicular, especialmente en vialidades como Churubusco, Paseo de la Reforma y Eje Central, complicando las condiciones ambientales."
    }
  ]),
  menuItemsEs: JSON.stringify([{item: "N/A", desc: "N/A", price: "N/A"}]),
  hoursWeekEs: 'N/A',
  hoursSundayEs: 'N/A',
  headlineEn: 'Coyoacán Unites Culture and Solidarity in Festival for Cuba and Venezuela During World Cup 2026',
  summaryEn: 'The Popular Assembly of Coyoacán organizes a cultural festival at Jardín Hidalgo in support of Cuba and Venezuela, during a weekend marked by World Cup preparations and environmental alert.',
  categoryEn: 'COMMUNITY',
  dateEn: 'Sunday, February 15, 2026',
  contentEn: JSON.stringify([
    {
      title: "Solidarity Festival at Jardín Hidalgo",
      text: "In a context marked by the proximity of the 2026 FIFA World Cup and a recent environmental emergency due to ozone, the Popular Assembly of Coyoacán against Imperialism convened a cultural festival in solidarity with Cuba and Venezuela. The event took place this Sunday, February 15 at 11:00 AM at Jardín Hidalgo, an emblematic space in the colonial neighborhood that has been a recurring stage for social and cultural expressions. The festival, which brought together dozens of neighbors and activists, included artistic presentations, music and poetry, as a show of support for the peoples of Cuba and Venezuela, countries facing political and economic tensions derived from international policies."
    },
    {
      title: "Context of Social Mobilization in CDMX",
      text: "This act of solidarity is part of an active social dynamic throughout Mexico City. According to the same media, on Sunday multiple demonstrations were registered, including a main march, eleven concentrations, seven motorcycle rides, eleven bicycle rides, one car ride and 23 other recreational events. This complex agenda reflects the plural and active character of the Mexican capital."
    },
    {
      title: "Coyoacán Prepares for World Cup 2026",
      text: "Simultaneously, Coyoacán is preparing to be one of the nerve centers during the 2026 FIFA World Cup, which will begin with the inauguration at the renovated Banorte Stadium (formerly Azteca Stadium) on March 28. Mayor Giovani Gutiérrez stated in an interview with Excélsior on February 14 that the municipality expects to receive more than 1.5 million visitors during the event, and that it will take advantage of this opportunity to reinforce its historical and artistic vocation."
    },
    {
      title: "Security and Cultural Heritage",
      text: "In addition, security has been a priority axis with the renovation of 40 patrol cars and a 26% reduction in general crime incidence, placing Coyoacán in first place in reduction of high-impact crimes among the capital's boroughs. This impulse coincides with the recognition of Coyoacán's cultural heritage, birthplace of personalities such as Frida Kahlo, Diego Rivera, Agustín Lara and Dolores del Río."
    },
    {
      title: "Environmental Emergency Due to Ozone",
      text: "However, the weekend was also marked by an environmental emergency. According to La Jornada, the Valley of Mexico experienced more than 50 hours in phase 1 of environmental contingency due to ozone, the longest in the dry-hot season so far. The Environmental Commission of the Megalopolis activated this alert last Thursday and lifted it until Saturday night, severely affecting air quality in boroughs such as Coyoacán, Benito Juárez and Cuauhtémoc."
    }
  ]),
  menuItemsEn: JSON.stringify([{item: "N/A", desc: "N/A", price: "N/A"}]),
  hoursWeekEn: 'N/A',
  hoursSundayEn: 'N/A'
};

async function insertArticle() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Insertando artículo del festival...');
    
    const [result] = await connection.execute(
      `INSERT INTO articles (
        slug, dateISO, weatherTemp, weatherConditionEs, weatherConditionEn,
        locationAddress, locationLat, locationLng, locationMapsUrl,
        heroImage,
        headlineEs, summaryEs, categoryEs, dateEs, contentEs, menuItemsEs, hoursWeekEs, hoursSundayEs,
        headlineEn, summaryEn, categoryEn, dateEn, contentEn, menuItemsEn, hoursWeekEn, hoursSundayEn
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        articleData.slug,
        articleData.dateISO,
        articleData.weatherTemp,
        articleData.weatherConditionEs,
        articleData.weatherConditionEn,
        articleData.locationAddress,
        articleData.locationLat,
        articleData.locationLng,
        articleData.locationMapsUrl,
        articleData.heroImage,
        articleData.headlineEs,
        articleData.summaryEs,
        articleData.categoryEs,
        articleData.dateEs,
        articleData.contentEs,
        articleData.menuItemsEs,
        articleData.hoursWeekEs,
        articleData.hoursSundayEs,
        articleData.headlineEn,
        articleData.summaryEn,
        articleData.categoryEn,
        articleData.dateEn,
        articleData.contentEn,
        articleData.menuItemsEn,
        articleData.hoursWeekEn,
        articleData.hoursSundayEn
      ]
    );
    
    console.log('✅ Artículo insertado exitosamente!');
    console.log(`   ID: ${result.insertId}`);
    console.log(`   Slug: ${articleData.slug}`);
    console.log(`   Título: ${articleData.headlineEs}`);
    
  } catch (error) {
    console.error('❌ Error al insertar artículo:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

insertArticle();
