import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const imageUrl = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/BskECKriWbPQUxob.png';

const contentEs = [
  {
    title: "Operativo nocturno desmantela fiesta clandestina",
    text: "El pasado fin de semana, la Secretaría de Gobierno de la Ciudad de México (Secgob) ejecutó el operativo 'La Noche es de Todos', cuyo objetivo central es fortalecer el orden, la legalidad y la seguridad en establecimientos mercantiles, especialmente en zonas con alta afluencia nocturna. Según reportó El Universal el 15 de febrero, durante este operativo se desmanteló una fiesta clandestina en la colonia Prados Churubusco, en la alcaldía Coyoacán, donde más de mil personas se congregaron, incluyendo menores de edad en estado de ebriedad."
  },
  {
    title: "Programa de sustentabilidad interviene 8 mil viviendas",
    text: "Paralelamente, las autoridades locales han impulsado un ambicioso programa de sustentabilidad que ha intervenido más de 8 mil viviendas en Santa Úrsula y colonias aledañas, informó La Jornada el 22 de febrero. Estas intervenciones incluyen la instalación de sistemas de captación de agua de lluvia, calentadores solares y huertos domésticos, con una capacidad de captación superior a los 300 millones de litros de agua anuales."
  },
  {
    title: "Programa Casa por Casa y mejoras en espacios públicos",
    text: "En el ámbito cultural y educativo, el programa musical 'Do, Re, Mi, Fa, Sol por Mi Escuela' se ha implementado en tres planteles de la demarcación, contribuyendo a la formación artística y la cohesión social. Hasta la fecha, se han realizado 49 visitas previas que abarcan 111 unidades territoriales, 6,500 manzanas, 344,622 viviendas y un total aproximado de 1.2 millones de personas beneficiadas por estas políticas integrales de desarrollo urbano."
  },
  {
    title: "Preparativos para el Mundial 2026",
    text: "Las obras también incluyen mejoras en espacios deportivos, albercas, mercados y escuelas de educación básica, lo que refleja un enfoque integral para elevar la calidad de vida de los habitantes. Este conjunto de acciones refleja la voluntad política y administrativa de Coyoacán para responder a los retos que implica la preparación para el Mundial 2026, que traerá una afluencia masiva de visitantes y la necesidad de garantizar condiciones óptimas de seguridad, movilidad y sustentabilidad."
  }
];

const contentEn = [
  {
    title: "Night operation dismantles clandestine party",
    text: "Last weekend, the Mexico City Government Secretariat (Secgob) executed the operation 'The Night Belongs to Everyone', whose central objective is to strengthen order, legality and security in commercial establishments, especially in areas with high nighttime traffic. According to El Universal on February 15, during this operation a clandestine party was dismantled in the Prados Churubusco neighborhood, in the Coyoacán district, where more than a thousand people gathered, including minors in a state of intoxication."
  },
  {
    title: "Sustainability program intervenes 8 thousand homes",
    text: "At the same time, local authorities have promoted an ambitious sustainability program that has intervened more than 8 thousand homes in Santa Úrsula and surrounding neighborhoods, La Jornada reported on February 22. These interventions include the installation of rainwater harvesting systems, solar heaters and home gardens, with a harvesting capacity of more than 300 million liters of water per year."
  },
  {
    title: "House by House Program and improvements in public spaces",
    text: "In the cultural and educational field, the musical program 'Do, Re, Mi, Fa, Sol for My School' has been implemented in three schools in the district, contributing to artistic training and social cohesion. To date, 49 previous visits have been made covering 111 territorial units, 6,500 blocks, 344,622 homes and a total of approximately 1.2 million people benefited by these comprehensive urban development policies."
  },
  {
    title: "Preparations for the 2026 World Cup",
    text: "The works also include improvements in sports facilities, swimming pools, markets and basic education schools, which reflects a comprehensive approach to raising the quality of life of the inhabitants. This set of actions reflects the political and administrative will of Coyoacán to respond to the challenges involved in preparing for the 2026 World Cup, which will bring a massive influx of visitors and the need to guarantee optimal conditions of security, mobility and sustainability."
  }
];

const menuItemsEs = [
  { item: "Información", desc: "Artículo periodístico", price: "Gratis" },
  { item: "Hospedaje Mundial 2026", desc: "SúperAnfitrión Coyoacán", price: "Desde $800 MXN/noche" }
];

const menuItemsEn = [
  { item: "Information", desc: "News article", price: "Free" },
  { item: "World Cup 2026 Lodging", desc: "SúperAnfitrión Coyoacán", price: "From $800 MXN/night" }
];

const articleData = {
  slug: 'coyoacan-impulsa-seguridad-y-sustentabilidad-en-transformacion-urbana-2026-02-24',
  dateISO: '2026-02-24',
  weatherTemp: 20,
  weatherConditionEs: 'Soleado',
  weatherConditionEn: 'Sunny',
  
  // Ubicación ficticia (Jardín Centenario, Coyoacán)
  locationAddress: 'Jardín Centenario, Coyoacán, Ciudad de México',
  locationLat: '19.3501',
  locationLng: '-99.1624',
  locationMapsUrl: 'https://www.google.com/maps/search/?api=1&query=19.3501,-99.1624',
  
  heroImage: imageUrl,
  
  // Contenido en español
  headlineEs: 'Coyoacán impulsa seguridad y sustentabilidad en transformación urbana rumbo a Mundial 2026',
  summaryEs: 'Operativos nocturnos, obras públicas y programas ecológicos fortalecen seguridad y calidad de vida en Coyoacán, ante retos y oportunidades del Mundial 2026.',
  categoryEs: 'GOBIERNO LOCAL',
  dateEs: 'Lunes, 24 de febrero de 2026',
  contentEs: JSON.stringify(contentEs),
  menuItemsEs: JSON.stringify(menuItemsEs),
  hoursWeekEs: 'Información 24/7',
  hoursSundayEs: 'Información 24/7',
  
  // Contenido en inglés
  headlineEn: 'Coyoacán promotes security and sustainability in urban transformation towards 2026 World Cup',
  summaryEn: 'Night operations, public works and ecological programs strengthen security and quality of life in Coyoacán, facing challenges and opportunities of the 2026 World Cup.',
  categoryEn: 'LOCAL GOVERNMENT',
  dateEn: 'Monday, February 24, 2026',
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
  console.log('🖼️ Imagen:', articleData.heroImage);
} catch (error) {
  console.error('❌ Error al insertar artículo:', error);
  process.exit(1);
}

await connection.end();
process.exit(0);
