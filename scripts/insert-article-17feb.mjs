import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const articleData = {
  slug: 'coyoacan-refuerza-seguridad-y-enfrenta-retos-culturales-ante-mundial-2026-2026-02-17',
  dateISO: '2026-02-17',
  weatherTemp: 26,
  weatherConditionEs: 'Soleado',
  weatherConditionEn: 'Sunny',
  
  locationAddress: 'Alcaldía Coyoacán, Ciudad de México',
  locationLat: '19.3467',
  locationLng: '-99.1618',
  locationMapsUrl: 'https://maps.google.com/?q=19.3467,-99.1618',
  
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/pCTxSHTVAgiBSZgl.png',
  
  // Spanish content
  headlineEs: 'Coyoacán refuerza seguridad y enfrenta retos culturales ante Mundial 2026',
  summaryEs: 'La alcaldía Coyoacán invierte 21 mdp en seguridad para el Mundial 2026 mientras museos locales permanecen cerrados, generando preocupación entre vecinos y expertos.',
  categoryEs: 'Gobierno Local',
  dateEs: 'Lunes, 17 de febrero de 2026',
  contentEs: JSON.stringify([
    {
      title: 'Inversión en Seguridad para el Mundial 2026',
      text: 'La alcaldía Coyoacán ha anunciado una inversión de 21 millones de pesos destinados a reforzar la seguridad y vigilancia en la demarcación con motivo de la llegada del Mundial de Fútbol 2026, que se celebrará en varias sedes de México, incluido el Estadio Azteca en la Ciudad de México. Se espera que durante este evento, que congregará a millones de visitantes internacionales, Coyoacán reciba a más de dos millones de personas, según informó La Jornada el pasado 15 de febrero. Este desembolso contempla la instalación de cámaras de seguridad en puntos estratégicos del territorio, así como un aumento en la presencia policial para garantizar la tranquilidad tanto de residentes como de turistas. Esta medida responde a la necesidad de mantener el orden público en una alcaldía que, por su riqueza cultural y gastronómica, es uno de los destinos más visitados dentro de la capital.'
    },
    {
      title: 'Preocupación por el Patrimonio Cultural',
      text: 'Sin embargo, mientras las autoridades refuerzan la seguridad, persisten preocupaciones en torno a la preservación del patrimonio cultural local. Un caso emblemático es el del Museo Hueytlilatl, dedicado a la cultura prehispánica, que permanece cerrado desde hace más de un año sin justificación oficial. Esta situación ha generado el descontento de vecinos y activistas culturales, quienes han manifestado su inquietud ante la proximidad del Mundial, evento que potencialmente podría atraer a turistas interesados en la riqueza histórica de Coyoacán. Proceso informó el 12 de febrero sobre esta problemática, destacando la ausencia de comunicación oficial por parte de las autoridades culturales.'
    },
    {
      title: 'Coyoacán: Historia y Cultura Vivas',
      text: 'Coyoacán tiene una historia profunda ligada al México prehispánico y colonial. Sus calles, plazas y espacios culturales, como el Museo Frida Kahlo y la Casa de Cultura Jesús Reyes Heroles, son testimonio de un mosaico cultural que incluye tradiciones ancestrales y la vida artística moderna. Por ello, la reapertura del Museo Hueytlilatl es vista no solo como una obligación cultural, sino como un elemento esencial que complementa la experiencia de visitantes y residentes.'
    },
    {
      title: 'Gastronomía y Preparativos Metropolitanos',
      text: 'Paralelamente, la gastronomía de la Ciudad de México también se encuentra en una fase de revitalización para atender la demanda esperada durante el Mundial. En la alcaldía Benito Juárez, el nuevo mercado gastronómico "Sabores del Sur", inaugurado en la colonia Del Valle, ofrece una combinación de cocina tradicional mexicana y opciones internacionales, buscando reactivar la zona comercial y posicionarse como un punto de encuentro gastronómico para locales y turistas. Este proyecto, reportado por El Universal el 14 de febrero, refleja la apuesta por la diversidad culinaria como un motor económico y cultural. La interrelación entre cultura y gastronomía es una constante en la Ciudad de México, donde las tradiciones culinarias son parte inseparable del patrimonio intangible. Coyoacán, en particular, destaca por su oferta gastronómica tradicional que incluye desde mercados locales hasta restaurantes emblemáticos. La preparación para el Mundial ha impulsado a estos negocios a fortalecer sus servicios, aunque la falta de algunos espacios culturales activos puede afectar la oferta integral del barrio.'
    },
    {
      title: 'Desafíos y Oportunidades',
      text: 'Además, a nivel metropolitano, otras alcaldías también se preparan para el Mundial. Por ejemplo, Xochimilco desarrolla un programa de restauración de sus canales históricos, con una inversión de 15 millones de pesos destinada a preservar el ecosistema y mejorar la experiencia turística, según informó SinEmbargo el 13 de febrero. Este esfuerzo complementa la estrategia general de la Ciudad de México para ofrecer una infraestructura turística y cultural renovada y segura. Coyoacán también enfrenta el desafío de equilibrar la afluencia turística con la calidad de vida de sus habitantes. La instalación de cámaras y el aumento de vigilancia responden a demandas históricas de seguridad, pero deben implementarse con sensibilidad para no afectar el tejido social ni la dinámica cultural del barrio. Para quienes visiten la zona durante el Mundial, opciones de alojamiento como SúperAnfitrión Coyoacán ofrecen hospedaje accesible y cercano a los puntos culturales y gastronómicos más relevantes, permitiendo una experiencia más integrada con el entorno local. En conclusión, Coyoacán se encuentra en una etapa crítica de preparación para un evento global que pondrá a prueba su capacidad para combinar seguridad, cultura y gastronomía. La inversión en infraestructura y vigilancia es un avance necesario, pero la reapertura de espacios culturales como el Museo Hueytlilatl es vital para preservar la identidad y ofrecer una experiencia completa a los visitantes. La coordinación entre autoridades, sociedad civil y empresarios será determinante para que el Mundial 2026 deje un legado positivo en esta emblemática alcaldía de la Ciudad de México.'
    }
  ]),
  menuItemsEs: JSON.stringify([{item: 'N/A', desc: 'N/A', price: 'N/A'}]),
  hoursWeekEs: 'N/A',
  hoursSundayEs: 'N/A',
  
  // English content
  headlineEn: 'Coyoacán strengthens security and faces cultural challenges ahead of World Cup 2026',
  summaryEn: 'Coyoacán borough invests 21 million pesos in security for World Cup 2026 while local museums remain closed, generating concern among neighbors and experts.',
  categoryEn: 'Local Government',
  dateEn: 'Monday, February 17, 2026',
  contentEn: JSON.stringify([
    {
      title: 'Security Investment for World Cup 2026',
      text: 'Coyoacán borough has announced an investment of 21 million pesos to strengthen security and surveillance in the area in preparation for the 2026 World Cup, which will be held at several venues in Mexico, including the Azteca Stadium in Mexico City. It is expected that during this event, which will bring together millions of international visitors, Coyoacán will receive more than two million people, according to La Jornada on February 15. This investment includes the installation of security cameras at strategic points in the territory, as well as an increase in police presence to ensure the safety of both residents and tourists. This measure responds to the need to maintain public order in a borough that, due to its cultural and gastronomic richness, is one of the most visited destinations in the capital.'
    },
    {
      title: 'Concern for Cultural Heritage',
      text: 'However, while authorities strengthen security, concerns persist regarding the preservation of local cultural heritage. An emblematic case is that of the Hueytlilatl Museum, dedicated to pre-Hispanic culture, which has remained closed for more than a year without official justification. This situation has generated discontent among neighbors and cultural activists, who have expressed their concern about the proximity of the World Cup, an event that could potentially attract tourists interested in the historical richness of Coyoacán. Proceso reported on February 12 about this problem, highlighting the absence of official communication from cultural authorities.'
    },
    {
      title: 'Coyoacán: Living History and Culture',
      text: 'Coyoacán has a deep history linked to pre-Hispanic and colonial Mexico. Its streets, squares and cultural spaces, such as the Frida Kahlo Museum and the Jesús Reyes Heroles Cultural Center, are testimony to a cultural mosaic that includes ancestral traditions and modern artistic life. Therefore, the reopening of the Hueytlilatl Museum is seen not only as a cultural obligation, but as an essential element that complements the experience of visitors and residents.'
    },
    {
      title: 'Gastronomy and Metropolitan Preparations',
      text: 'At the same time, Mexico City\'s gastronomy is also in a revitalization phase to meet the expected demand during the World Cup. In the Benito Juárez borough, the new gastronomic market "Sabores del Sur", inaugurated in the Del Valle neighborhood, offers a combination of traditional Mexican cuisine and international options, seeking to reactivate the commercial area and position itself as a gastronomic meeting point for locals and tourists. This project, reported by El Universal on February 14, reflects the commitment to culinary diversity as an economic and cultural engine. The interrelation between culture and gastronomy is a constant in Mexico City, where culinary traditions are an inseparable part of intangible heritage. Coyoacán, in particular, stands out for its traditional gastronomic offer that includes everything from local markets to emblematic restaurants. Preparation for the World Cup has prompted these businesses to strengthen their services, although the lack of some active cultural spaces may affect the comprehensive offer of the neighborhood.'
    },
    {
      title: 'Challenges and Opportunities',
      text: 'In addition, at the metropolitan level, other boroughs are also preparing for the World Cup. For example, Xochimilco is developing a restoration program for its historic canals, with an investment of 15 million pesos to preserve the ecosystem and improve the tourist experience, according to SinEmbargo on February 13. This effort complements Mexico City\'s overall strategy to offer renewed and safe tourist and cultural infrastructure. Coyoacán also faces the challenge of balancing tourist influx with the quality of life of its inhabitants. The installation of cameras and increased surveillance respond to historical security demands, but must be implemented with sensitivity so as not to affect the social fabric or the cultural dynamics of the neighborhood. For those visiting the area during the World Cup, accommodation options such as SúperAnfitrión Coyoacán offer accessible lodging close to the most relevant cultural and gastronomic points, allowing a more integrated experience with the local environment. In conclusion, Coyoacán is at a critical stage of preparation for a global event that will test its ability to combine security, culture and gastronomy. Investment in infrastructure and surveillance is a necessary advance, but the reopening of cultural spaces such as the Hueytlilatl Museum is vital to preserve identity and offer a complete experience to visitors. Coordination between authorities, civil society and businesspeople will be decisive for the 2026 World Cup to leave a positive legacy in this emblematic borough of Mexico City.'
    }
  ]),
  menuItemsEn: JSON.stringify([{item: 'N/A', desc: 'N/A', price: 'N/A'}]),
  hoursWeekEn: 'N/A',
  hoursSundayEn: 'N/A'
};

async function insertArticle() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Insertando artículo del 17 de febrero...');
    
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
