import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '/home/ubuntu/cafe-avellaneda/.env' });

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const articleData = {
  slug: 'coyoacan-confirma-quinta-edicion-feria-internacional-del-libro-2026-02-19',
  dateISO: '2026-02-19',
  weatherTemp: 20,
  weatherConditionEs: 'Soleado',
  weatherConditionEn: 'Sunny',
  
  // Location data (Jardines Hidalgo y Centenario)
  locationAddress: 'Jardines Hidalgo y Centenario, Coyoacán, Ciudad de México',
  locationLat: '19.3500',
  locationLng: '-99.1619',
  locationMapsUrl: 'https://www.google.com/maps/search/?api=1&query=19.3500,-99.1619',
  
  // Images
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/ppzcFjSGahYpWrdX.png',
  
  // Spanish content
  headlineEs: 'Coyoacán confirma la quinta edición de la Feria Internacional del Libro con foco en literatura y fútbol',
  summaryEs: 'Del 6 al 15 de marzo, la FILCO 2026 reunirá a 900 editoriales y 2 mil invitados en Coyoacán, con mesas sobre deporte y programa para visibilizar escritoras.',
  categoryEs: 'CULTURA',
  dateEs: 'Miércoles, 19 de febrero de 2026',
  contentEs: JSON.stringify([
    {
      title: 'Un encuentro literario de relevancia nacional',
      text: 'La alcaldía Coyoacán anunció oficialmente la quinta edición de la Feria Internacional del Libro de Coyoacán (FILCO), que se celebrará del 6 al 15 de marzo de 2026 en los emblemáticos Jardines Hidalgo y Centenario. Con una oferta cultural que supera las 350 actividades y la participación de más de 900 sellos editoriales, este evento se consolida como uno de los encuentros literarios más relevantes de la Ciudad de México. Según información difundida por W Radio el 17 de febrero de 2026, la FILCO contará con la presencia de cerca de 2 mil invitados nacionales e internacionales, entre ellos figuras destacadas de la literatura contemporánea como Elena Poniatowska, Laura Restrepo, Elmer Mendoza, Juan Pablo Villalobos, Alberto Ruy Sánchez, Carmen Boullosa, Guadalupe Loaeza y Carlos Martínez Assad. La inclusión de estos autores subraya el compromiso del certamen con la diversidad literaria y el diálogo cultural.'
    },
    {
      title: 'Fútbol y literatura: una intersección inédita',
      text: 'Un aspecto novedoso de esta edición será la incorporación del fútbol como eje temático, un reflejo de la coyuntura deportiva que vive México ante la cercanía del Mundial 2026, cuya inauguración se realizará en el Estadio Azteca, ubicado en la alcaldía Benito Juárez, colindante con Coyoacán. El programa incluye mesas de diálogo que exploran las intersecciones entre la literatura y el deporte, abriendo espacios para analizar cómo el fútbol ha influido en la narrativa y la cultura popular. Esta iniciativa busca atraer a un público más diverso y conectar dos universos que, aunque aparentemente distantes, comparten elementos de pasión, identidad y memoria colectiva.'
    },
    {
      title: 'Visibilización de escritoras y cápsula del tiempo',
      text: 'Además, la FILCO 2026 implementará el programa "Mujer es cultura", orientado a visibilizar la obra de escritoras contemporáneas, un esfuerzo para fortalecer la presencia femenina en un campo históricamente dominado por voces masculinas. En línea con esta iniciativa, se instalará una cápsula del tiempo con testimonios y materiales culturales que se abrirán dentro de 25 años, buscando preservar el legado cultural actual para futuras generaciones. Este gesto simbólico refuerza el compromiso de la FILCO con la memoria y la proyección cultural de Coyoacán.'
    },
    {
      title: 'Coyoacán se prepara para el Mundial 2026',
      text: 'Este evento cultural se da en un contexto de importantes preparativos de infraestructura y obra pública en la alcaldía Coyoacán, que se alista para recibir a un número estimado de más de un millón y medio de visitantes durante el Mundial 2026. Tal como informó Excélsior el 14 de febrero, el gobierno local ha impulsado la rehabilitación de 75 escuelas, 22 mercados, gimnasios y espacios deportivos, además de intervenciones en banquetas, pavimentación, redes de drenaje y alumbrado público. Estas acciones no sólo buscan mejorar la calidad de vida de los 650 mil habitantes de la demarcación, sino también potenciar la experiencia de turistas y visitantes.'
    },
    {
      title: 'Patrimonio cultural y opciones de hospedaje',
      text: 'La Casa de la Copa del Mundo, que se instalará en el Jardín Centenario durante el Mundial, exhibirá camisetas de las 48 selecciones participantes y balones históricos desde 1970, un complemento cultural y deportivo que se suma a la oferta tradicional de la alcaldía. Coyoacán, conocido por su riqueza cultural e histórica, alberga espacios como el Museo Nacional de Artes Populares, el Museo Frida Kahlo, el Museo Anahuacalli y la Parroquia de San Juan Bautista, que atraen a visitantes interesados en el patrimonio artístico y popular. Para quienes deseen asistir a la FILCO 2026 y explorar el patrimonio cultural de Coyoacán, opciones de alojamiento como SúperAnfitrión Coyoacán ofrecen hospedaje en el corazón de la demarcación, facilitando el acceso tanto a los eventos literarios como a los atractivos históricos y culturales del área. La quinta edición de la FILCO representa un esfuerzo por consolidar a Coyoacán como un polo cultural que articula literatura, deporte y memoria, en un momento de gran relevancia para la ciudad y el país.'
    }
  ]),
  menuItemsEs: JSON.stringify([
    { item: 'Fuentes Consultadas', desc: 'W Radio, Excélsior, CDMX Secreta, Alcaldía Xochimilco', price: 'N/A' }
  ]),
  hoursWeekEs: '6-15 de marzo, 2026',
  hoursSundayEs: '6-15 de marzo, 2026',
  
  // English content
  headlineEn: 'Coyoacán confirms the fifth edition of the International Book Fair with focus on literature and football',
  summaryEn: 'From March 6 to 15, FILCO 2026 will bring together 900 publishers and 2,000 guests in Coyoacán, with panels on sports and a program to showcase women writers.',
  categoryEn: 'CULTURE',
  dateEn: 'Wednesday, February 19, 2026',
  contentEn: JSON.stringify([
    {
      title: 'A literary gathering of national relevance',
      text: 'The Coyoacán borough officially announced the fifth edition of the Coyoacán International Book Fair (FILCO), which will be held from March 6 to 15, 2026 in the emblematic Hidalgo and Centenario Gardens. With a cultural offering that exceeds 350 activities and the participation of more than 900 publishing houses, this event is consolidated as one of the most relevant literary gatherings in Mexico City. According to information released by W Radio on February 17, 2026, FILCO will have the presence of nearly 2,000 national and international guests, including prominent figures of contemporary literature such as Elena Poniatowska, Laura Restrepo, Elmer Mendoza, Juan Pablo Villalobos, Alberto Ruy Sánchez, Carmen Boullosa, Guadalupe Loaeza and Carlos Martínez Assad. The inclusion of these authors underscores the fair commitment to literary diversity and cultural dialogue.'
    },
    {
      title: 'Football and literature: an unprecedented intersection',
      text: 'A novel aspect of this edition will be the incorporation of football as a thematic axis, a reflection of the sports situation that Mexico is experiencing in the face of the proximity of the 2026 World Cup, whose inauguration will take place at the Azteca Stadium, located in the Benito Juárez borough, adjacent to Coyoacán. The program includes dialogue panels that explore the intersections between literature and sports, opening spaces to analyze how football has influenced narrative and popular culture. This initiative seeks to attract a more diverse audience and connect two universes that, although apparently distant, share elements of passion, identity and collective memory.'
    },
    {
      title: 'Visibility of women writers and time capsule',
      text: 'In addition, FILCO 2026 will implement the "Woman is culture" program, aimed at making visible the work of contemporary women writers, an effort to strengthen the female presence in a field historically dominated by male voices. In line with this initiative, a time capsule will be installed with testimonies and cultural materials that will be opened in 25 years, seeking to preserve the current cultural legacy for future generations. This symbolic gesture reinforces FILCO commitment to the memory and cultural projection of Coyoacán.'
    },
    {
      title: 'Coyoacán prepares for the 2026 World Cup',
      text: 'This cultural event takes place in a context of important infrastructure and public works preparations in the Coyoacán borough, which is preparing to receive an estimated number of more than one and a half million visitors during the 2026 World Cup. As reported by Excélsior on February 14, the local government has promoted the rehabilitation of 75 schools, 22 markets, gyms and sports spaces, in addition to interventions in sidewalks, paving, drainage networks and public lighting. These actions not only seek to improve the quality of life of the 650 thousand inhabitants of the demarcation, but also enhance the experience of tourists and visitors.'
    },
    {
      title: 'Cultural heritage and accommodation options',
      text: 'The World Cup House, which will be installed in the Centenario Garden during the World Cup, will exhibit jerseys from the 48 participating teams and historic balls since 1970, a cultural and sports complement that adds to the traditional offer of the borough. Coyoacán, known for its cultural and historical richness, houses spaces such as the National Museum of Popular Arts, the Frida Kahlo Museum, the Anahuacalli Museum and the Parish of San Juan Bautista, which attract visitors interested in artistic and popular heritage. For those who wish to attend FILCO 2026 and explore the cultural heritage of Coyoacán, accommodation options such as SúperAnfitrión Coyoacán offer lodging in the heart of the demarcation, facilitating access to both literary events and the historical and cultural attractions of the area. The fifth edition of FILCO represents an effort to consolidate Coyoacán as a cultural hub that articulates literature, sports and memory, at a time of great relevance for the city and the country.'
    }
  ]),
  menuItemsEn: JSON.stringify([
    { item: 'Sources Consulted', desc: 'W Radio, Excélsior, CDMX Secreta, Xochimilco Borough', price: 'N/A' }
  ]),
  hoursWeekEn: 'March 6-15, 2026',
  hoursSundayEn: 'March 6-15, 2026',
};

try {
  const [result] = await connection.execute(
    `INSERT INTO articles (
      slug, dateISO, weatherTemp, weatherConditionEs, weatherConditionEn,
      locationAddress, locationLat, locationLng, locationMapsUrl,
      heroImage,
      headlineEs, summaryEs, categoryEs, dateEs, contentEs, menuItemsEs, hoursWeekEs, hoursSundayEs,
      headlineEn, summaryEn, categoryEn, dateEn, contentEn, menuItemsEn, hoursWeekEn, hoursSundayEn,
      createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
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
      articleData.hoursSundayEn,
    ]
  );

  console.log('✅ Artículo de FILCO 2026 publicado exitosamente');
  console.log('ID del artículo:', result.insertId);
  console.log('Slug:', articleData.slug);
  console.log('URL:', `https://cafeavellan-q8betawp.manus.space/diario?slug=${articleData.slug}`);
  console.log('Fecha de publicación:', new Date().toISOString());
} catch (error) {
  console.error('❌ Error al publicar artículo:', error.message);
  throw error;
} finally {
  await connection.end();
}
