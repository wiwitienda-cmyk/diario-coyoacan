import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const imageUrl = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/BskECKriWbPQUxob.png';

const articleData = {
  slug: 'coyoacan-impulsa-seguridad-y-sustentabilidad-en-transformacion-urbana-rumbo-a-mu-2026-02-24',
  headline: 'Coyoacán impulsa seguridad y sustentabilidad en transformación urbana rumbo a Mundial 2026',
  summary: 'Operativos nocturnos, obras públicas y programas ecológicos fortalecen seguridad y calidad de vida en Coyoacán, ante retos y oportunidades del Mundial 2026.',
  category: 'GOBIERNO LOCAL',
  date: 'Lunes, 24 de febrero de 2026',
  dateISO: '2026-02-24',
  heroImage: imageUrl,
  content: JSON.stringify([
    {
      title: 'Operativo nocturno desmantel--snip--a fiesta clandestina',
      text: 'Coyoacán vive una intensa transformación urbana que abarca desde operativos de seguridad nocturna hasta la implementación de programas de sustentabilidad y renovación de espacios públicos, en vísperas del Mundial de Futbol 2026. En una semana marcada por la intervención de más de 8 mil viviendas y la desarticulación de una fiesta clandestina con más de mil asistentes, las autoridades buscan consolidar un entorno seguro y sostenible para sus habitantes.\n\nEl pasado fin de semana, la Secretaría de Gobierno de la Ciudad de México (Secgob) ejecutó el operativo "La Noche es de Todos", cuyo objetivo central es fortalecer el orden, la legalidad y la seguridad en establecimientos mercantiles, especialmente en zonas con alta afluencia nocturna. Según reportó El Universal el 15 de febrero, durante este operativo se desmanteló una fiesta clandestina en la colonia Prados Churubusco, en la alcaldía Coyoacán, donde más de mil personas se congregaron, incluyendo menores de edad en estado de ebriedad. En total, se verificaron 16 establecimientos, de los cuales nueve fueron suspendidos y tres clausurados, además de la detención de tres personas por quebrantamiento de sellos.'
    },
    {
      title: 'Programa de sustentabilidad interviene 8 mil viviendas',
      text: 'Paralelamente, las autoridades locales han impulsado un ambicioso programa de sustentabilidad que ha intervenido más de 8 mil viviendas en Santa Úrsula y colonias aledañas, informó La Jornada el 22 de febrero. Estas intervenciones incluyen la instalación de sistemas de captación de agua de lluvia, calentadores solares y huertos domésticos, con una capacidad de captación superior a los 300 millones de litros de agua anuales. La jefa de Gobierno, Clara Brugada, destacó que "la meta es equilibrar el ciclo hídrico mediante infraestructura verde y espacios públicos que favorezcan la infiltración pluvial", buscando mitigar los efectos del cambio climático y mejorar la calidad de vida.\n\nEl programa Comunidad Iluminada, Comunidad Segura ha logrado un avance del 60% en Santa Úrsula y Pedregal, con la intervención de 174 calles que suman 52 kilómetros y la instalación de 2,500 luminarias nuevas, cuya conclusión está prevista para finales de marzo. Este esfuerzo lumínico no solo mejora la visibilidad nocturna, sino que también coadyuva a la seguridad ciudadana, complementando las acciones del operativo nocturno.'
    },
    {
      title: 'Programa Casa por Casa y mejoras en espacios públicos',
      text: 'En el ámbito cultural y educativo, el programa musical "Do, Re, Mi, Fa, Sol por Mi Escuela" se ha implementado en tres planteles de la demarcación, contribuyendo a la formación artística y la cohesión social. Hasta la fecha, se han realizado 49 visitas previas que abarcan 111 unidades territoriales, 6,500 manzanas, 344,622 viviendas y un total aproximado de 1.2 millones de personas beneficiadas por estas políticas integrales de desarrollo urbano.\n\nEl alcalde Giovani Gutiérrez Aguilar y la jefa de Gobierno Clara Brugada Molina encabezaron la visita número 50 del programa Casa por Casa en Santa Úrsula Coapa, como informó El Heraldo de México el 22 de febrero. El alcalde manifestó que "en Coyoacán construimos y dignificamos los espacios públicos con obras que perduran", haciendo referencia a las intervenciones realizadas en fachadas a través del programa "Pintando Coyoacán" en las colonias Pedregal de Santa Úrsula, Ajusco, Pedregal de Santo Domingo y Ruiz Cortines.'
    },
    {
      title: 'Preparativos para el Mundial 2026',
      text: 'Las obras también incluyen mejoras en espacios deportivos, albercas, mercados y escuelas de educación básica, lo que refleja un enfoque integral para elevar la calidad de vida de los habitantes. Brugada Molina afirmó que "se continuará con la coordinación en los diferentes temas que requieren atención en la demarcación", subrayando la importancia de la cooperación interinstitucional.\n\nEste conjunto de acciones refleja la voluntad política y administrativa de Coyoacán para responder a los retos que implica la preparación para el Mundial 2026, que traerá una afluencia masiva de visitantes y la necesidad de garantizar condiciones óptimas de seguridad, movilidad y sustentabilidad.'
    },
    {
      title: 'Desafíos y oportunidades para el futuro',
      text: 'No obstante, la desarticulación de fiestas clandestinas con alta concurrencia y consumo de alcohol entre menores evidencia que la seguridad sigue siendo un desafío que requiere vigilancia constante y acciones preventivas. En este sentido, la ampliación de la infraestructura verde y la mejora en la iluminación pública contribuyen a crear entornos más seguros y habitables.\n\nEn el contexto de la Ciudad de México, Coyoacán se erige como un ejemplo de transformación urbana que combina la recuperación del espacio público, la promoción de prácticas sustentables y el fortalecimiento de la seguridad, alineando sus políticas con los objetivos globales de desarrollo sostenible y bienestar social. Estas iniciativas, además, sirven de modelo para otras alcaldías que enfrentan desafíos similares en un entorno urbano complejo y dinámico.\n\nCabe destacar que la oferta de hospedaje en la demarcación, como la que ofrece SúperAnfitrión Coyoacán, refleja también el crecimiento de la actividad turística, que se verá potenciada con la llegada del Mundial, por lo que la consolidación de estos programas adquiere una relevancia estratégica para el futuro inmediato de la alcaldía.'
    }
  ]),
  location: JSON.stringify({
    address: 'Santa Úrsula Coapa, Coyoacán, Ciudad de México',
    lat: 19.30,
    lng: -99.14
  }),
  hours: JSON.stringify({
    week: 'N/A',
    sunday: 'N/A'
  }),
  menuHighlights: JSON.stringify([]),
  weather: JSON.stringify({
    condition: 'Soleado',
    temp: 19
  }),
  sources: 'El Universal (15 feb 2026), La Jornada (22 feb 2026), El Heraldo de México (22 feb 2026), Secgob CDMX'
};

try {
  const result = await db.insert(schema.articles).values(articleData);
  console.log('✅ Artículo insertado exitosamente:', result);
  console.log('📰 Slug:', articleData.slug);
  console.log('📅 Fecha:', articleData.date);
} catch (error) {
  console.error('❌ Error al insertar artículo:', error);
  process.exit(1);
}

await connection.end();
process.exit(0);
