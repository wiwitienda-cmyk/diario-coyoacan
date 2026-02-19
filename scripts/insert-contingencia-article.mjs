import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const articleData = {
  slug: 'contingencia-ambiental-en-cdmx-persiste-coyoacan-entre-las-alcaldias-mas-afectadas-2026-02-16',
  dateISO: '2026-02-16',
  weatherTemp: 20,
  weatherConditionEs: 'Soleado',
  weatherConditionEn: 'Sunny',
  
  locationAddress: 'Alcaldía Coyoacán, Ciudad de México',
  locationLat: '19.3467',
  locationLng: '-99.1618',
  locationMapsUrl: 'https://maps.google.com/?q=19.3467,-99.1618',
  
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/vHKoHljdVMxqSirf.png',
  
  // Spanish content
  headlineEs: 'Contingencia ambiental en CDMX persiste; Coyoacán entre las alcaldías más afectadas',
  summaryEs: 'La Fase 1 de contingencia ambiental continúa en la Ciudad de México y Estado de México con calidad del aire muy mala en Coyoacán, Benito Juárez y Tlalpan, mientras se implementa el Doble Hoy No Circula y persiste un sistema anticiclónico.',
  categoryEs: 'Medio Ambiente',
  dateEs: 'Domingo, 16 de febrero de 2026',
  contentEs: JSON.stringify([
    {
      title: 'Contingencia Ambiental Activa en el Valle de México',
      text: 'Ciudad de México, 16 de febrero de 2026.- La Ciudad de México y el Estado de México mantienen activa la Fase 1 de contingencia ambiental este lunes 16 de febrero debido a la persistente mala calidad del aire, especialmente en las alcaldías del sur de la capital como Coyoacán, Benito Juárez y Tlalpan, donde los niveles de contaminación alcanzan índices catalogados como "muy malos". Esta situación ha obligado a la Comisión Ambiental de la Megalópolis (CAMe) a mantener e intensificar las medidas para mitigar la emisión de contaminantes, entre ellas la aplicación del Doble Hoy No Circula, que restringe la circulación de vehículos con hologramas 1 y 2, así como aquellos con placas terminación 9 y 0 dos días consecutivos.'
    },
    {
      title: 'Condiciones Meteorológicas Adversas',
      text: 'El sistema anticiclónico que domina la atmósfera en la región ha contribuido a la estabilidad atmosférica, con vientos débiles y cielo despejado, condiciones que dificultan la dispersión de contaminantes y elevan las temperaturas máximas diurnas, pronosticadas para este lunes en un rango de 27 a 28 grados Celsius, según reportes del Servicio Meteorológico Nacional y el Heraldo de México. Esta contingencia ambiental, activada por tercera ocasión en lo que va de febrero, refleja un patrón histórico que afecta recurrentemente al Valle de México durante temporadas de estabilidad atmosférica y escasa ventilación.'
    },
    {
      title: 'Impacto en Coyoacán y Salud Pública',
      text: 'En el caso particular de Coyoacán, una alcaldía con una alta densidad poblacional y significativa actividad vehicular, la persistencia de estas condiciones genera un impacto considerable en la salud pública, aumentando los riesgos para personas vulnerables como niños, adultos mayores y quienes padecen enfermedades respiratorias crónicas. La CAMe ha reiterado su llamado a la ciudadanía para acatar las restricciones vehiculares, evitar actividades al aire libre en horarios críticos y emplear transporte público o medios no motorizados cuando sea posible.'
    },
    {
      title: 'Contraste con la Actividad Cultural',
      text: 'Paralelamente, la contingencia ambiental coincide con una semana de intensa actividad cultural en la Ciudad de México, lo que pone en evidencia el contraste entre la crisis ambiental y la vitalidad social de la capital. Eventos como la Art Week CDMX 2026, con su epicentro en el Alexander Hotel, la Feria Internacional del Libro en el Palacio de Minería, y festivales como el Carnaval 2026 en diversas colonias, continúan atrayendo a residentes y visitantes, pese a las recomendaciones sanitarias. En Coyoacán, la calidad del aire afecta el desarrollo pleno de actividades al aire libre, pero no ha impedido la realización de eventos culturales y sociales que forman parte de la identidad local.'
    },
    {
      title: 'Contexto Histórico y Estructural',
      text: 'Históricamente, la contaminación en el Valle de México ha sido un problema estructural derivado de la confluencia de factores como la alta concentración demográfica, la orografía de la cuenca, y las condiciones climáticas que dificultan la dispersión de contaminantes. Durante décadas, se han implementado programas de control vehicular y mejoras en la calidad del combustible, pero los episodios críticos persisten, evidenciando la necesidad de estrategias más integrales y sustentables. Para visitantes que buscan experimentar la riqueza cultural de Coyoacán durante estos días, alojamientos como SúperAnfitrión Coyoacán ofrecen opciones cómodas y bien ubicadas, aunque conscientes de las medidas restrictivas vigentes.'
    }
  ]),
  menuItemsEs: JSON.stringify([{item: 'N/A', desc: 'N/A', price: 'N/A'}]),
  hoursWeekEs: 'N/A',
  hoursSundayEs: 'N/A',
  
  // English content
  headlineEn: 'Environmental contingency persists in CDMX; Coyoacán among most affected boroughs',
  summaryEn: 'Phase 1 environmental contingency continues in Mexico City and State of Mexico with very poor air quality in Coyoacán, Benito Juárez and Tlalpan, while Double Hoy No Circula is implemented and an anticyclonic system persists.',
  categoryEn: 'Environment',
  dateEn: 'Sunday, February 16, 2026',
  contentEn: JSON.stringify([
    {
      title: 'Active Environmental Contingency in the Valley of Mexico',
      text: 'Mexico City, February 16, 2026.- Mexico City and the State of Mexico maintain active Phase 1 environmental contingency this Monday, February 16 due to persistent poor air quality, especially in southern boroughs of the capital such as Coyoacán, Benito Juárez and Tlalpan, where pollution levels reach indices classified as "very poor". This situation has forced the Environmental Commission of the Megalopolis (CAMe) to maintain and intensify measures to mitigate pollutant emissions, including the application of Double Hoy No Circula, which restricts the circulation of vehicles with holograms 1 and 2, as well as those with license plates ending in 9 and 0 for two consecutive days.'
    },
    {
      title: 'Adverse Weather Conditions',
      text: 'The anticyclonic system dominating the atmosphere in the region has contributed to atmospheric stability, with weak winds and clear skies, conditions that hinder the dispersion of pollutants and raise maximum daytime temperatures, forecast for this Monday in a range of 27 to 28 degrees Celsius, according to reports from the National Meteorological Service and Heraldo de México. This environmental contingency, activated for the third time so far in February, reflects a historical pattern that recurrently affects the Valley of Mexico during seasons of atmospheric stability and poor ventilation.'
    },
    {
      title: 'Impact on Coyoacán and Public Health',
      text: 'In the particular case of Coyoacán, a borough with high population density and significant vehicular activity, the persistence of these conditions generates a considerable impact on public health, increasing risks for vulnerable people such as children, elderly adults and those suffering from chronic respiratory diseases. CAMe has reiterated its call to citizens to comply with vehicle restrictions, avoid outdoor activities during critical hours and use public transport or non-motorized means when possible.'
    },
    {
      title: 'Contrast with Cultural Activity',
      text: 'At the same time, the environmental contingency coincides with a week of intense cultural activity in Mexico City, which highlights the contrast between the environmental crisis and the social vitality of the capital. Events such as Art Week CDMX 2026, with its epicenter at the Alexander Hotel, the International Book Fair at the Palacio de Minería, and festivals such as Carnaval 2026 in various neighborhoods, continue to attract residents and visitors, despite health recommendations. In Coyoacán, air quality affects the full development of outdoor activities, but has not prevented the realization of cultural and social events that are part of the local identity.'
    },
    {
      title: 'Historical and Structural Context',
      text: 'Historically, pollution in the Valley of Mexico has been a structural problem derived from the confluence of factors such as high demographic concentration, the orography of the basin, and climatic conditions that hinder the dispersion of pollutants. For decades, vehicle control programs and improvements in fuel quality have been implemented, but critical episodes persist, evidencing the need for more comprehensive and sustainable strategies. For visitors seeking to experience the cultural richness of Coyoacán during these days, accommodations such as SúperAnfitrión Coyoacán offer comfortable and well-located options, although aware of the restrictive measures in force.'
    }
  ]),
  menuItemsEn: JSON.stringify([{item: 'N/A', desc: 'N/A', price: 'N/A'}]),
  hoursWeekEn: 'N/A',
  hoursSundayEn: 'N/A'
};

async function insertArticle() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Insertando artículo de contingencia ambiental...');
    
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
