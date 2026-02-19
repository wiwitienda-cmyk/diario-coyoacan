import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const articleData = {
  slug: 'coyoacan-invierte-21-mdp-en-seguridad-y-enfrenta-contingencia-ambiental-2026-02-14',
  dateISO: '2026-02-14',
  weatherTemp: 22,
  weatherConditionEs: 'Parcialmente nublado',
  weatherConditionEn: 'Partly cloudy',
  
  locationAddress: 'Alcaldía Coyoacán, Ciudad de México',
  locationLat: '19.3467',
  locationLng: '-99.1618',
  locationMapsUrl: 'https://maps.google.com/?q=19.3467,-99.1618',
  
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/UIaXUYhUPzDXsAQL.png',
  
  // Spanish content
  headlineEs: 'Coyoacán invierte 21 mdp en seguridad y enfrenta contingencia ambiental; refuerza transporte y coordinación con Álvaro Obregón',
  summaryEs: 'La alcaldía Coyoacán destina 21 mdp para seguridad ante Mundial 2026 y enfrenta segunda contingencia ambiental por ozono; además, se incorporan trenes nuevos y se fortalece coordinación con Álvaro Obregón.',
  categoryEs: 'Gobierno Local',
  dateEs: 'Viernes, 14 de febrero de 2026',
  contentEs: JSON.stringify([
    {
      title: 'Inversión en Seguridad para el Mundial 2026',
      text: 'La alcaldía Coyoacán anunció una inversión de 21 millones de pesos para reforzar la seguridad en el marco del Mundial de Futbol 2026, evento que atraerá aproximadamente dos millones de turistas a la capital. Esta medida busca mantener la percepción de seguridad, que según el Instituto Nacional de Estadística y Geografía (INEGI) aumentó ligeramente del 46.7% al 47.2%, consolidando a Coyoacán como la cuarta alcaldía más segura de la Ciudad de México. El alcalde Giovani Gutiérrez entregó un total de 74 nuevas patrullas y vehículos utilitarios para fortalecer las labores de vigilancia y prevención del delito. En consonancia con esta estrategia, el Congreso capitalino aprobó un incremento presupuestal del 10% para la Secretaría de Seguridad Ciudadana de la demarcación. "Con estas acciones buscamos garantizar un ambiente seguro tanto para los residentes como para los visitantes durante el Mundial", comentó Gutiérrez en la entrega de los vehículos, reportó La Prensa el 9 de febrero.'
    },
    {
      title: 'Coyoacán: Sede Mundial por Tercera Ocasión',
      text: 'Además, Coyoacán se prepara para ser sede por tercera ocasión de la Copa del Mundo, después de haber albergado el evento en 1970 y 1986. La Casa Centenario funcionará como Casa de la Copa del Mundo, brindando atención especializada para turistas, una iniciativa que se espera complemente los esfuerzos de seguridad y hospitalidad. Esta preparación también impacta al sector hotelero y de hospedaje local, donde plataformas como SúperAnfitrión Coyoacán podrían facilitar la llegada de visitantes durante el torneo.'
    },
    {
      title: 'Segunda Contingencia Ambiental del Año',
      text: 'Por otro lado, la Comisión Ambiental de la Megalópolis (CAMe) informó la activación de la Fase 1 de contingencia ambiental por ozono el pasado 12 de febrero. La estación Centro de Ciencias de la Atmósfera, ubicada en Coyoacán, registró concentraciones de 155 partes por billón (ppb) a las 16:00 horas, mientras que la estación Ajusco Medio reportó 156 ppb a las 17:00 horas. Seis estaciones en total superaron los 90 ppb, niveles que obligaron a restringir la circulación de vehículos con holograma 1 y 2 desde las 5:00 hasta las 22:00 horas. Este fenómeno se originó por un sistema de alta presión que generó acumulación de contaminantes debido a vientos débiles y baja humedad. CAMe recomendó evitar la exposición al aire libre entre las 13:00 y 19:00 horas, especialmente a niños, adultos mayores y personas con problemas respiratorios, de acuerdo con el reporte publicado por La Jornada el 13 de febrero. Esta es la segunda contingencia de ozono del año en la capital, lo que pone en alerta a las autoridades locales y a la población para reforzar medidas ambientales.'
    },
    {
      title: 'Mejoras en Transporte Público',
      text: 'En materia de infraestructura, el Servicio de Transportes Eléctricos incorporó dos nuevas unidades al Tren Ligero que conecta Xochimilco con el centro de la ciudad. Con una inversión de 1,383 millones de pesos, estas unidades cuentan con capacidad para 292 pasajeros, accesibilidad universal y cámaras de videovigilancia. Actualmente, la flotilla comprende 20 trenes, pero se planea aumentar a 37 con la llegada de otros 15 trenes nuevos. Este incremento permitirá elevar el volumen de pasajeros diarios de 130 mil a 250 mil, sumando 18 estaciones con un costo accesible de tres pesos por viaje, informó La Jornada el 9 de febrero.'
    },
    {
      title: 'Coordinación Intermunicipal Coyoacán-Álvaro Obregón',
      text: 'Finalmente, las alcaldías de Coyoacán y Álvaro Obregón reforzaron su coordinación intermunicipal, especialmente en las zonas limítrofes de Chimalistac y Copilco. Ambas demarcaciones trabajan en conjunto con la Secretaría de Movilidad y Seguridad Pública para atender problemas comunes como la seguridad y el tránsito. Este trabajo conjunto busca mejorar la calidad de vida de los habitantes, disminuir incidentes y optimizar recursos, según informó El Trinar Noticias el 9 de febrero. Para los residentes de Coyoacán, estas noticias representan avances significativos en seguridad, movilidad y medio ambiente, aunque también desafíos como la contaminación atmosférica. La inversión en seguridad y transporte público apunta a mejorar la infraestructura urbana y la percepción ciudadana, mientras que la coordinación interalcaldía puede ser un modelo para atender problemas integrales en la metrópoli. En el contexto del Mundial 2026, la combinación de estos esfuerzos será crucial para garantizar un entorno seguro y funcional tanto para los habitantes como para los millones de turistas que llegarán.'
    }
  ]),
  menuItemsEs: JSON.stringify([{item: 'N/A', desc: 'N/A', price: 'N/A'}]),
  hoursWeekEs: 'N/A',
  hoursSundayEs: 'N/A',
  
  // English content
  headlineEn: 'Coyoacán invests 21 million pesos in security and faces environmental contingency; strengthens transport and coordination with Álvaro Obregón',
  summaryEn: 'Coyoacán borough allocates 21 million pesos for security ahead of World Cup 2026 and faces second environmental contingency due to ozone; new trains are also incorporated and coordination with Álvaro Obregón is strengthened.',
  categoryEn: 'Local Government',
  dateEn: 'Friday, February 14, 2026',
  contentEn: JSON.stringify([
    {
      title: 'Security Investment for World Cup 2026',
      text: 'Coyoacán borough announced an investment of 21 million pesos to reinforce security in the framework of the 2026 World Cup, an event that will attract approximately two million tourists to the capital. This measure seeks to maintain the perception of security, which according to the National Institute of Statistics and Geography (INEGI) increased slightly from 46.7% to 47.2%, consolidating Coyoacán as the fourth safest borough in Mexico City. Mayor Giovani Gutiérrez delivered a total of 74 new patrol cars and utility vehicles to strengthen surveillance and crime prevention efforts. In line with this strategy, the capital Congress approved a 10% budget increase for the Citizen Security Secretariat of the borough. "With these actions we seek to guarantee a safe environment for both residents and visitors during the World Cup," commented Gutiérrez at the vehicle delivery, reported La Prensa on February 9.'
    },
    {
      title: 'Coyoacán: World Cup Host for Third Time',
      text: 'In addition, Coyoacán is preparing to host the World Cup for the third time, after having hosted the event in 1970 and 1986. Casa Centenario will function as the World Cup House, providing specialized attention for tourists, an initiative that is expected to complement security and hospitality efforts. This preparation also impacts the local hotel and lodging sector, where platforms such as SúperAnfitrión Coyoacán could facilitate the arrival of visitors during the tournament.'
    },
    {
      title: 'Second Environmental Contingency of the Year',
      text: 'On the other hand, the Environmental Commission of the Megalopolis (CAMe) reported the activation of Phase 1 environmental contingency due to ozone on February 12. The Atmospheric Sciences Center station, located in Coyoacán, recorded concentrations of 155 parts per billion (ppb) at 4:00 PM, while the Ajusco Medio station reported 156 ppb at 5:00 PM. Six stations in total exceeded 90 ppb, levels that forced the restriction of vehicles with holograms 1 and 2 from 5:00 AM to 10:00 PM. This phenomenon originated from a high-pressure system that generated pollutant accumulation due to weak winds and low humidity. CAMe recommended avoiding outdoor exposure between 1:00 PM and 7:00 PM, especially for children, elderly adults and people with respiratory problems, according to the report published by La Jornada on February 13. This is the second ozone contingency of the year in the capital, which puts local authorities and the population on alert to reinforce environmental measures.'
    },
    {
      title: 'Public Transport Improvements',
      text: 'In terms of infrastructure, the Electric Transport Service incorporated two new units to the Light Rail that connects Xochimilco with the city center. With an investment of 1,383 million pesos, these units have capacity for 292 passengers, universal accessibility and video surveillance cameras. Currently, the fleet comprises 20 trains, but it is planned to increase to 37 with the arrival of another 15 new trains. This increase will allow raising the volume of daily passengers from 130 thousand to 250 thousand, adding 18 stations with an accessible cost of three pesos per trip, reported La Jornada on February 9.'
    },
    {
      title: 'Inter-municipal Coordination Coyoacán-Álvaro Obregón',
      text: 'Finally, the boroughs of Coyoacán and Álvaro Obregón strengthened their inter-municipal coordination, especially in the border areas of Chimalistac and Copilco. Both boroughs work together with the Secretariat of Mobility and Public Security to address common problems such as security and traffic. This joint work seeks to improve the quality of life of the inhabitants, reduce incidents and optimize resources, as reported by El Trinar Noticias on February 9. For Coyoacán residents, this news represents significant advances in security, mobility and environment, although also challenges such as atmospheric pollution. The investment in security and public transport aims to improve urban infrastructure and citizen perception, while inter-borough coordination can be a model for addressing comprehensive problems in the metropolis. In the context of the 2026 World Cup, the combination of these efforts will be crucial to guarantee a safe and functional environment for both inhabitants and the millions of tourists who will arrive.'
    }
  ]),
  menuItemsEn: JSON.stringify([{item: 'N/A', desc: 'N/A', price: 'N/A'}]),
  hoursWeekEn: 'N/A',
  hoursSundayEn: 'N/A'
};

async function insertArticle() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Insertando artículo del alcalde Giovani...');
    
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
