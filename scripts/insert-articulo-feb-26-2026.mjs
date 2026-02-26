import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.ts';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const slug = 'coyoacan-fuga-agua-rio-churubusco-clima-extremo-feb-26-2026';

// Insertar artículo del 26 de febrero de 2026
await db.insert(schema.articles).values({
  slug,
  dateISO: '2026-02-26',
  weatherTemp: 25,
  weatherConditionEs: 'Clima extremo',
  weatherConditionEn: 'Extreme weather',
  
  // Location data
  locationAddress: 'Río Churubusco, Coyoacán, Ciudad de México',
  locationLat: '19.3467',
  locationLng: '-99.1447',
  locationMapsUrl: 'https://www.google.com/maps/search/?api=1&query=19.3467,-99.1447',
  
  // Images
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/aRcqVXTnGIuDLGNK.png',
  
  // Spanish content
  headlineEs: 'Coyoacán enfrenta fuga de agua en Río Churubusco mientras clima extremo marca diferencia de 25 grados en un día',
  summaryEs: 'Una fuga de agua bloquea dos carriles de Río Churubusco mientras la alcaldía presenta estrategias de seguridad y recuperación de espacios públicos en medio de un fenómeno climático inusual.',
  categoryEs: 'INFRAESTRUCTURA',
  dateEs: 'Miércoles, 26 de febrero de 2026',
  contentEs: JSON.stringify([
    {
      title: 'Fuga de agua en Río Churubusco complica tránsito y expone vulnerabilidad hídrica',
      text: 'Una fuga de agua de grandes proporciones bloqueó este jueves dos carriles de la vialidad Río Churubusco en la alcaldía Coyoacán, complicando el tránsito vehicular y evidenciando la fragilidad de la infraestructura hídrica de la capital. El líquido desperdiciado abarcó una extensión considerable de la avenida, obligando a automovilistas a buscar rutas alternas durante las horas de mayor afluencia, según reportó Foro TV en su programa matutino Expreso.\n\nLa fuga ocurre en un contexto paradójico: mientras el agua se desperdicia en Río Churubusco, especialistas de la Secretaría de Educación, Ciencia, Tecnología e Innovación (SECTEI) y el Instituto Politécnico Nacional (IPN) presentaron un ambicioso plan para rescatar el agua en la Ciudad de México hacia 2045. La propuesta, denominada "Ciudad Lacustre", busca fortalecer la captación pluvial, proteger el suelo de conservación y transitar hacia un nuevo modelo sistémico de gestión del agua, según informó La Prensa.\n\nEl contraste entre la crisis inmediata y la visión a largo plazo subraya la urgencia de atender no solo los proyectos futuros, sino también el mantenimiento de la infraestructura existente. Coyoacán, una de las alcaldías con mayor densidad poblacional y actividad comercial, enfrenta el desafío de equilibrar el desarrollo urbano con la preservación de sus recursos naturales.'
    },
    {
      title: 'Fenómeno climático inusual: 25 grados de diferencia en un día',
      text: 'Los habitantes de la Ciudad de México y el Estado de México enfrentaron este jueves un fenómeno meteorológico poco común: una diferencia de 25 grados centígrados entre la temperatura matutina y la vespertina. La mañana comenzó con un frío rudo que obligó a los capitalinos a abrigarse, pero al mediodía el termómetro superó los 22 grados, y después de las 14:00 horas alcanzó 25.2°C en Coyoacán, 24°C en Benito Juárez y 24.9°C en Gustavo A. Madero, de acuerdo con datos de La Jornada.\n\nEste contraste térmico, que pasó de un frío intenso a un calor abrasador en cuestión de horas, generó desconcierto entre los habitantes y evidenció la creciente variabilidad climática que afecta a la región. Especialistas en meteorología advierten que este tipo de fenómenos podrían volverse más frecuentes debido al cambio climático, lo que obliga a las autoridades a implementar medidas de adaptación y prevención.'
    },
    {
      title: 'Alcaldía refuerza seguridad con dispositivo #EscudoCoyoacán',
      text: 'En materia de seguridad pública, la Alcaldía de Coyoacán implementó un nuevo dispositivo de revisión a personas a bordo de motocicletas en la colonia Pedregal de Santo Domingo, como parte de la estrategia #EscudoCoyoacán. La medida, coordinada con autoridades de seguridad locales y federales, busca prevenir delitos relacionados con el uso de motocicletas, un problema que ha ido en aumento en diversas zonas de la capital.\n\nEl operativo forma parte de una serie de acciones que la alcaldía ha desplegado en las últimas semanas para reforzar la seguridad en colonias consideradas de alta incidencia delictiva. Según informó la cuenta oficial de Twitter de la Alcaldía de Coyoacán, el dispositivo incluye la revisión de documentos, verificación de placas y detección de unidades con reporte de robo.'
    },
    {
      title: 'Recuperación de espacios públicos: el caso del Parque Los Cedros',
      text: 'El pasado miércoles 25 de febrero, la Alcaldía de Coyoacán llevó a cabo una jornada de limpieza y recuperación del Parque Los Cedros, como parte de la iniciativa #MiércolesVerde. La actividad, documentada en la página oficial de Facebook de la alcaldía, reunió a vecinos, funcionarios y voluntarios que trabajaron en la recolección de basura, poda de árboles y mantenimiento de áreas verdes.\n\n"En Coyoacán seguimos recuperando nuestros espacios", señaló el mensaje publicado por la alcaldía, acompañado de imágenes que muestran el antes y después del parque. La iniciativa forma parte de un programa más amplio de recuperación de espacios públicos que busca devolver a los vecinos áreas seguras y dignas para la convivencia comunitaria.'
    },
    {
      title: 'Movilizaciones estudiantiles y afectaciones viales',
      text: 'Este jueves, diversas movilizaciones afectaron la circulación en varias alcaldías de la Ciudad de México, incluyendo Coyoacán. A las 12:00 horas, el Comité Universitario de Solidaridad con Cuba se reunió en la Facultad de Filosofía y Letras de la Universidad Nacional Autónoma de México (UNAM), ubicada en Ciudad Universitaria, para manifestar su apoyo a la isla caribeña en medio de las tensiones geopolíticas que enfrenta.\n\nAdemás, se registraron bloqueos en Adolfo López Mateos 323, colonia San Juan Moyotepec, a las 10:00 horas, y en Circuito Interior s/n, Ciudad Universitaria, a las 12:00 horas, según reportó Milenio. Estas movilizaciones se sumaron a una marcha encabezada por madres y padres de los 43 estudiantes normalistas desaparecidos en Ayotzinapa, Guerrero, que partió del Ángel de la Independencia y afectó diversas vialidades del centro de la ciudad.'
    },
    {
      title: 'Contexto del Mundial 2026 y preparativos en la capital',
      text: 'En medio de estos acontecimientos cotidianos, la Ciudad de México continúa preparándose para recibir al Mundial de Fútbol 2026, que se celebrará por tercera ocasión en el país. La presidenta Claudia Sheinbaum reiteró que "hay todas las garantías para el Mundial" y que la FIFA ha expresado confianza en México como sede del torneo más importante del planeta, según publicó La Jornada en su portada del 25 de febrero.\n\nCoyoacán, ubicada a 20-25 minutos del Estadio Azteca mediante la Línea 2 del Metro, se perfila como una de las zonas preferidas por turistas y aficionados que buscan hospedaje en el corazón de la acción. La alcaldía ha intensificado sus esfuerzos para mejorar la infraestructura, la seguridad y la oferta cultural de cara al evento deportivo, que se espera atraiga a más de 1.5 millones de visitantes a la capital.'
    }
  ]),
  menuItemsEs: JSON.stringify([]),
  hoursWeekEs: 'Vialidad 24/7',
  hoursSundayEs: 'Vialidad 24/7',
  
  // English content
  headlineEn: 'Coyoacán faces water leak on Río Churubusco as extreme weather marks 25-degree difference in one day',
  summaryEn: 'A water leak blocks two lanes on Río Churubusco while the borough presents security strategies and public space recovery amid an unusual weather phenomenon.',
  categoryEn: 'INFRASTRUCTURE',
  dateEn: 'Wednesday, February 26, 2026',
  contentEn: JSON.stringify([
    {
      title: 'Water leak on Río Churubusco complicates traffic and exposes water vulnerability',
      text: 'A major water leak blocked two lanes of Río Churubusco avenue in the Coyoacán borough this Thursday, complicating vehicular traffic and evidencing the fragility of the capital\'s water infrastructure. The wasted liquid covered a considerable extension of the avenue, forcing motorists to seek alternate routes during peak hours, as reported by Foro TV on its morning program Expreso.\n\nThe leak occurs in a paradoxical context: while water is being wasted on Río Churubusco, specialists from the Secretariat of Education, Science, Technology and Innovation (SECTEI) and the National Polytechnic Institute (IPN) presented an ambitious plan to rescue water in Mexico City towards 2045. The proposal, called "Lacustrine City," seeks to strengthen rainwater harvesting, protect conservation land, and transition to a new systemic water management model, according to La Prensa.\n\nThe contrast between the immediate crisis and the long-term vision underscores the urgency of addressing not only future projects but also the maintenance of existing infrastructure. Coyoacán, one of the boroughs with the highest population density and commercial activity, faces the challenge of balancing urban development with the preservation of its natural resources.'
    },
    {
      title: 'Unusual weather phenomenon: 25-degree difference in one day',
      text: 'Residents of Mexico City and the State of Mexico faced an uncommon meteorological phenomenon this Thursday: a 25-degree Celsius difference between morning and afternoon temperatures. The morning began with harsh cold that forced residents to bundle up, but by noon the thermometer exceeded 22 degrees, and after 2:00 PM it reached 25.2°C in Coyoacán, 24°C in Benito Juárez, and 24.9°C in Gustavo A. Madero, according to data from La Jornada.\n\nThis thermal contrast, which went from intense cold to scorching heat in a matter of hours, generated bewilderment among residents and evidenced the growing climate variability affecting the region. Meteorology specialists warn that this type of phenomenon could become more frequent due to climate change, forcing authorities to implement adaptation and prevention measures.'
    },
    {
      title: 'Borough reinforces security with #EscudoCoyoacán operation',
      text: 'In terms of public security, the Coyoacán Borough implemented a new inspection operation for people on motorcycles in the Pedregal de Santo Domingo neighborhood, as part of the #EscudoCoyoacán strategy. The measure, coordinated with local and federal security authorities, seeks to prevent crimes related to the use of motorcycles, a problem that has been increasing in various areas of the capital.\n\nThe operation is part of a series of actions that the borough has deployed in recent weeks to reinforce security in neighborhoods considered to have high crime rates. According to the official Twitter account of the Coyoacán Borough, the operation includes document review, license plate verification, and detection of units reported as stolen.'
    },
    {
      title: 'Recovery of public spaces: the case of Los Cedros Park',
      text: 'On Wednesday, February 25, the Coyoacán Borough carried out a cleaning and recovery day at Los Cedros Park, as part of the #MiércolesVerde (Green Wednesday) initiative. The activity, documented on the borough\'s official Facebook page, brought together neighbors, officials, and volunteers who worked on garbage collection, tree pruning, and maintenance of green areas.\n\n"In Coyoacán we continue recovering our spaces," stated the message published by the borough, accompanied by images showing the before and after of the park. The initiative is part of a broader program to recover public spaces that seeks to return safe and dignified areas for community coexistence to residents.'
    },
    {
      title: 'Student mobilizations and traffic disruptions',
      text: 'This Thursday, various mobilizations affected traffic in several boroughs of Mexico City, including Coyoacán. At 12:00 PM, the University Committee of Solidarity with Cuba met at the Faculty of Philosophy and Letters of the National Autonomous University of Mexico (UNAM), located in Ciudad Universitaria, to express their support for the Caribbean island amid the geopolitical tensions it faces.\n\nIn addition, blockades were registered at Adolfo López Mateos 323, San Juan Moyotepec neighborhood, at 10:00 AM, and at Circuito Interior s/n, Ciudad Universitaria, at 12:00 PM, according to Milenio. These mobilizations were added to a march led by mothers and fathers of the 43 missing student teachers from Ayotzinapa, Guerrero, which departed from the Angel of Independence and affected various roads in the city center.'
    },
    {
      title: 'Context of the 2026 World Cup and preparations in the capital',
      text: 'Amid these daily events, Mexico City continues preparing to host the 2026 FIFA World Cup, which will be held for the third time in the country. President Claudia Sheinbaum reiterated that "there are all guarantees for the World Cup" and that FIFA has expressed confidence in Mexico as host of the planet\'s most important tournament, according to La Jornada\'s front page on February 25.\n\nCoyoacán, located 20-25 minutes from the Azteca Stadium via Metro Line 2, is emerging as one of the preferred areas for tourists and fans seeking accommodation in the heart of the action. The borough has intensified its efforts to improve infrastructure, security, and cultural offerings ahead of the sporting event, which is expected to attract more than 1.5 million visitors to the capital.'
    }
  ]),
  menuItemsEn: JSON.stringify([]),
  hoursWeekEn: 'Road 24/7',
  hoursSundayEn: 'Road 24/7'
});

console.log('✅ Artículo del 26 de febrero insertado exitosamente');
console.log(`Slug: ${slug}`);

await connection.end();
