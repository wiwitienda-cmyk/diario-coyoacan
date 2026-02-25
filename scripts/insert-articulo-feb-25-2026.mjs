import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const imageUrl = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/UGkxdKidInIqWUvH.png';

const contentEs = [
  {
    title: "Cronistas mantienen viva la memoria de San Mateo Churubusco",
    text: "La Fundación Nancy Cárdenas organizó este miércoles 25 de febrero el evento cultural 'En voz de los cronistas: San Mateo Churubusco' en Los Reyes Héroes, Coyoacán. A través de relatos, memoria y anécdotas, los asistentes viajaron por la historia de uno de los pueblos originarios de la alcaldía, donde la tradición oral se convierte en el hilo conductor que conecta el pasado con el presente. Este tipo de iniciativas refuerza la importancia de preservar la historia oral de los barrios, un patrimonio intangible que corre el riesgo de perderse con el paso del tiempo."
  },
  {
    title: "Noche de Museos abre las puertas del patrimonio cultural",
    text: "Más de 40 museos de la Ciudad de México abrieron sus puertas en horario nocturno este miércoles, incluyendo el Museo Nacional de Culturas Populares ubicado en Hidalgo 289, Del Carmen, Coyoacán. La Secretaría de Cultura CDMX promueve así el acceso gratuito al patrimonio cultural, democratizando la experiencia museística para quienes no pueden asistir en horarios tradicionales. Esta iniciativa mensual se ha consolidado como una de las estrategias más exitosas para acercar la cultura a la ciudadanía."
  },
  {
    title: "Alcalde vincula patriotismo con acciones concretas de gobierno",
    text: "El pasado 24 de febrero, el alcalde Giovani Gutiérrez Aguilar encabezó la ceremonia del Día de la Bandera en Coyoacán, donde destacó que el patriotismo moderno no debe limitarse a ceremonias, sino traducirse en acciones concretas que mejoren el entorno urbano y la calidad de vida de los habitantes. 'Sabemos honrar a nuestra patria siendo buen gobierno, representando a la gente y estando aquí presentes 24/7', afirmó el mandatario local, quien definió a Coyoacán como 'tierra mundialista y de profundas raíces', consolidando a la demarcación como referente de identidad nacional en la capital."
  },
  {
    title: "Festival San Patricio y Open House CDMX amplían oferta cultural",
    text: "El patrimonio arquitectónico de Coyoacán será escenario de importantes eventos culturales en las próximas semanas. Del 28 de febrero al 15 de marzo se realizará el Festival Cultural San Patricio México 2026, que combinará tradiciones irlandesas con cultura mexicana en el Museo Nacional de las Intervenciones, incluyendo música celta, gaitas, danza irlandesa y un desfile desde el Parque Frida Kahlo. Posteriormente, del 17 al 22 de marzo, Open House CDMX abrirá gratuitamente más de 50 edificios históricos, incluyendo la casa donde vivió Leonora Carrington, permitiendo al público acceder a patrimonio arquitectónico normalmente inaccesible."
  }
];

const contentEn = [
  {
    title: "Chroniclers keep alive the memory of San Mateo Churubusco",
    text: "The Nancy Cárdenas Foundation organized this Wednesday, February 25, the cultural event 'In the voice of the chroniclers: San Mateo Churubusco' in Los Reyes Héroes, Coyoacán. Through stories, memory and anecdotes, attendees traveled through the history of one of the original towns of the district, where oral tradition becomes the thread that connects the past with the present. This type of initiative reinforces the importance of preserving the oral history of neighborhoods, an intangible heritage that risks being lost over time."
  },
  {
    title: "Museum Night opens the doors of cultural heritage",
    text: "More than 40 museums in Mexico City opened their doors at night this Wednesday, including the National Museum of Popular Cultures located at Hidalgo 289, Del Carmen, Coyoacán. The CDMX Ministry of Culture thus promotes free access to cultural heritage, democratizing the museum experience for those who cannot attend during traditional hours. This monthly initiative has been consolidated as one of the most successful strategies to bring culture closer to citizens."
  },
  {
    title: "Mayor links patriotism with concrete government actions",
    text: "On February 24, Mayor Giovani Gutiérrez Aguilar led the Flag Day ceremony in Coyoacán, where he emphasized that modern patriotism should not be limited to ceremonies, but should translate into concrete actions that improve the urban environment and the quality of life of the inhabitants. 'We know how to honor our homeland by being good government, representing the people and being here 24/7', said the local leader, who defined Coyoacán as 'world cup land with deep roots', consolidating the district as a reference of national identity in the capital."
  },
  {
    title: "San Patricio Festival and Open House CDMX expand cultural offer",
    text: "The architectural heritage of Coyoacán will be the scene of important cultural events in the coming weeks. From February 28 to March 15, the San Patricio Mexico 2026 Cultural Festival will be held, which will combine Irish traditions with Mexican culture at the National Museum of Interventions, including Celtic music, bagpipes, Irish dance and a parade from Frida Kahlo Park. Subsequently, from March 17 to 22, Open House CDMX will open more than 50 historic buildings for free, including the house where Leonora Carrington lived, allowing the public to access architectural heritage normally inaccessible."
  }
];

const menuItemsEs = [
  { item: "Información Cultural", desc: "Artículo periodístico", price: "Gratis" },
  { item: "Hospedaje Mundial 2026", desc: "SúperAnfitrión Coyoacán", price: "Desde $800 MXN/noche" }
];

const menuItemsEn = [
  { item: "Cultural Information", desc: "News article", price: "Free" },
  { item: "World Cup 2026 Lodging", desc: "SúperAnfitrión Coyoacán", price: "From $800 MXN/night" }
];

const articleData = {
  slug: 'coyoacan-mantiene-viva-memoria-historica-eventos-culturales-patrimonio-feb-25-2026',
  dateISO: '2026-02-25',
  weatherTemp: 20,
  weatherConditionEs: 'Soleado',
  weatherConditionEn: 'Sunny',
  
  // Ubicación: Museo Nacional de Culturas Populares
  locationAddress: 'Museo Nacional de Culturas Populares, Hidalgo 289, Del Carmen, Coyoacán',
  locationLat: '19.3541',
  locationLng: '-99.1620',
  locationMapsUrl: 'https://www.google.com/maps/search/?api=1&query=19.3541,-99.1620',
  
  heroImage: imageUrl,
  
  // Contenido en español
  headlineEs: 'Coyoacán mantiene viva su memoria histórica con eventos culturales y acceso al patrimonio',
  summaryEs: 'Cronistas narran la historia de San Mateo Churubusco mientras la Noche de Museos democratiza el acceso al patrimonio cultural en la alcaldía.',
  categoryEs: 'PATRIMONIO',
  dateEs: 'Miércoles, 25 de febrero de 2026',
  contentEs: JSON.stringify(contentEs),
  menuItemsEs: JSON.stringify(menuItemsEs),
  hoursWeekEs: 'Información 24/7',
  hoursSundayEs: 'Información 24/7',
  
  // Contenido en inglés
  headlineEn: 'Coyoacán keeps its historical memory alive with cultural events and access to heritage',
  summaryEn: 'Chroniclers narrate the history of San Mateo Churubusco while Museum Night democratizes access to cultural heritage in the district.',
  categoryEn: 'HERITAGE',
  dateEn: 'Wednesday, February 25, 2026',
  contentEn: JSON.stringify(contentEn),
  menuItemsEn: JSON.stringify(menuItemsEn),
  hoursWeekEn: 'Information 24/7',
  hoursSundayEn: 'Information 24/7',
};

try {
  const result = await db.insert(schema.articles).values(articleData);
  console.log('✅ Artículo insertado exitosamente en articles');
  console.log('📰 Slug:', articleData.slug);
  console.log('📅 Fecha:', articleData.dateEs);
  console.log('🖼️ Imagen:', 'Mano tocando muro de piedra colonial (imagen editorial subjetiva)');
  console.log('🏛️ Tema:', 'Patrimonio histórico y memoria cultural de Coyoacán');
} catch (error) {
  console.error('❌ Error al insertar artículo:', error);
  process.exit(1);
}

await connection.end();
process.exit(0);
