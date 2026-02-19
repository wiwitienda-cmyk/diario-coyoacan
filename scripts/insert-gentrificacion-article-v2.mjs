import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const articleData = {
  slug: 'gentrificacion-en-coyoacan-entre-el-progreso-inmobiliario-y-el-desplazamiento-de-vecinos-historicos-2026-02-18',
  dateISO: '2026-02-18',
  weatherTemp: 24,
  weatherConditionEs: 'Soleado',
  weatherConditionEn: 'Sunny',
  
  // Location data (Coyoacán general)
  locationAddress: 'Alcaldía Coyoacán, Ciudad de México',
  locationLat: '19.3467',
  locationLng: '-99.1618',
  locationMapsUrl: 'https://www.google.com/maps/search/?api=1&query=19.3467,-99.1618',
  
  // Images
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/gDdBXINerfFAHHwL.png',
  
  // Spanish content
  headlineEs: 'Gentrificación en Coyoacán: entre el progreso inmobiliario y el desplazamiento de vecinos históricos',
  summaryEs: 'El boom de construcciones irregulares y el alza de rentas por el Mundial 2026 amenazan con desplazar a los habitantes originarios de Coyoacán, mientras las autoridades enfrentan acusaciones de omisión ante el avance del mercado inmobiliario.',
  categoryEs: 'SOCIEDAD',
  dateEs: 'Martes, 18 de febrero de 2026',
  contentEs: JSON.stringify([
    {
      title: 'Santa Úrsula Coapa: el epicentro de la transformación',
      text: 'La colonia Pedregal de Santa Úrsula Coapa, en la alcaldía Coyoacán, donde se ubica el Estadio Azteca, se ha convertido en el epicentro de un fenómeno que preocupa cada vez más a los vecinos: la gentrificación acelerada por el Mundial de Fútbol 2026. Gustavo Bolaños, residente de la zona, ha documentado más de treinta construcciones irregulares que han surgido en el último año, todas con características similares: edificios de más de cinco niveles en predios de doscientos metros cuadrados que antes albergaban casas de autoconstrucción de los años setenta. Según informó El Financiero el pasado diez de diciembre de dos mil veinticinco, estas construcciones no exhiben permisos ni responsables de obra, violando las normativas urbanas que exigen la publicitación de los proyectos inmobiliarios. Los vecinos acusan que las autoridades han hecho caso omiso a sus denuncias, y que incluso las constructoras han extendido sus horarios de trabajo hasta altas horas de la noche en represalia por las quejas. El incremento en la boleta del predial ha sido uno de los efectos más inmediatos: algunos residentes reportan aumentos de hasta treinta por ciento, una carga económica que muchos habitantes originarios no pueden sostener.'
    },
    {
      title: 'La crisis del agua se agrava',
      text: 'Adolfo Lara, maestro que ha vivido en Santa Úrsula desde que se pobló la zona, señala que la crisis de agua que padecen desde hace años se ha agravado con el boom de construcciones. La zona está marcada por el Sistema de Aguas de la Ciudad de México (Sacmex) como una de las más afectadas por la falta de infraestructura hídrica, lo que obliga a los vecinos a vivir bajo un sistema de tandeo: un día con agua, dos o tres días sin ella. La llegada de nuevos inquilinos a los edificios de más de diez departamentos cada uno amenaza con colapsar un sistema ya de por sí insuficiente. Lara expresó su preocupación ante la omisión de las autoridades para clausurar estas obras, y acusó que existe una confabulación entre funcionarios públicos y desarrolladores inmobiliarios. Este fenómeno no es exclusivo de Santa Úrsula Coapa. En otras zonas de Coyoacán, como el pueblo de Xoco, ubicado en la frontera con la alcaldía Benito Juárez, los vecinos han denunciado desplazamiento y encarecimiento del nivel de vida desde la construcción de la Torre Mítikah, el edificio más alto de la Ciudad de México, inaugurado en dos mil veintiuno con un costo total de veintidós mil quinientos millones de pesos.'
    },
    {
      title: 'Xoco y Mítikah: un caso emblemático',
      text: 'La Torre Mítikah, junto con su centro comercial abierto en dos mil veintidós, ha sido señalada como el símbolo más visible de la gentrificación en el sur de la capital. Los habitantes del pueblo de Xoco han manifestado que el proyecto, que comenzó en dos mil ocho, ha destruido el tejido social de los barrios originarios y ha elevado los costos de vida a niveles insostenibles para la población local. Según La Crónica de Hoy, que publicó un análisis comparativo el diecisiete de enero de dos mil veintiséis, el paisaje urbano de la Ciudad de México ha cambiado drásticamente en la última década, con nuevos rascacielos, centros comerciales y desarrollos de lujo que han reemplazado colonias populares. El artículo destaca que colonias como la Doctores, históricamente conocida por su carácter popular, ahora se promociona como "la nueva colonia Roma", con departamentos de lujo que superan los tres millones de pesos, precios que los habitantes originarios no pueden costear. Este proceso de sustitución de vivienda popular por desarrollos de alto valor ha provocado el desplazamiento de la población original, que gradualmente ha sido sustituida por personas de mayores ingresos.'
    },
    {
      title: '¿Qué es la gentrificación? La perspectiva académica',
      text: 'Luis Alberto Salinas Arreortua, geógrafo e investigador de la Universidad Nacional Autónoma de México (UNAM), define la gentrificación como un proceso de rehabilitación urbana y social de zonas deterioradas que atrae a habitantes con mayor poder adquisitivo y desplaza a la población original de bajos recursos. En un boletín publicado en agosto de dos mil veinticuatro, Salinas Arreortua explicó que este fenómeno está ligado a políticas de vivienda que favorecen a grandes inmobiliarias y empresarios del sector, y que ocurre de manera selectiva en colonias emblemáticas de la Ciudad de México, así como en Pueblos Mágicos del país. La gentrificación no es un fenómeno nuevo en Coyoacán. Barrios tradicionales como San Lucas, San Mateo Churubusco y San Diego Churubusco, con orígenes prehispánicos, han experimentado transformaciones significativas en las últimas décadas. Sin embargo, el Mundial de Fútbol dos mil veintiséis ha acelerado este proceso de manera exponencial, generando una presión inmobiliaria sin precedentes en zonas cercanas al Estadio Azteca y en el centro histórico de Coyoacán.'
    },
    {
      title: 'El dilema del progreso y la identidad',
      text: 'La gentrificación plantea un dilema complejo: por un lado, la inversión inmobiliaria puede traer mejoras en infraestructura, servicios y espacios públicos; por otro, el desplazamiento de los habitantes originarios erosiona el tejido social y la identidad cultural de los barrios. En Coyoacán, este dilema es particularmente agudo, ya que la alcaldía es reconocida por su riqueza histórica, cultural y gastronómica, elementos que han atraído tanto a turistas como a inversionistas. Para quienes visiten Coyoacán durante el Mundial dos mil veintiséis, opciones de alojamiento como SúperAnfitrión Coyoacán ofrecen hospedaje accesible y cercano a los puntos culturales y gastronómicos más relevantes, permitiendo una experiencia más integrada con el entorno local sin contribuir al desplazamiento de los vecinos. La clave, según expertos, está en encontrar un equilibrio entre el desarrollo urbano y la preservación de la identidad comunitaria. Las autoridades enfrentan el reto de regular el mercado inmobiliario, garantizar el acceso a servicios básicos como el agua, y proteger los derechos de los habitantes originarios, quienes han construido y mantenido la identidad de estos barrios durante décadas. El Mundial dos mil veintiséis será una prueba de fuego para Coyoacán: ¿podrá la alcaldía gestionar el crecimiento sin sacrificar su esencia? La respuesta a esta pregunta determinará el futuro de uno de los barrios más emblemáticos de la Ciudad de México.'
    }
  ]),
  menuItemsEs: JSON.stringify([
    { item: 'Fuentes Consultadas', desc: 'El Financiero, La Crónica, UNAM, Sacmex', price: 'N/A' }
  ]),
  hoursWeekEs: 'N/A',
  hoursSundayEs: 'N/A',
  
  // English content
  headlineEn: 'Gentrification in Coyoacán: between real estate progress and displacement of historic residents',
  summaryEn: 'The boom of irregular constructions and rising rents due to the 2026 World Cup threaten to displace the original inhabitants of Coyoacán, while authorities face accusations of omission in the face of the real estate market advance.',
  categoryEn: 'SOCIETY',
  dateEn: 'Tuesday, February 18, 2026',
  contentEn: JSON.stringify([
    {
      title: 'Santa Úrsula Coapa: the epicenter of transformation',
      text: 'The Pedregal de Santa Úrsula Coapa neighborhood, in the Coyoacán borough, where the Azteca Stadium is located, has become the epicenter of a phenomenon that increasingly worries residents: gentrification accelerated by the 2026 World Cup. Gustavo Bolaños, a local resident, has documented more than thirty irregular constructions that have emerged in the last year, all with similar characteristics: buildings of more than five levels on two-hundred-square-meter plots that previously housed self-built houses from the seventies. According to El Financiero on December 10, 2025, these constructions do not display permits or responsible parties, violating urban regulations that require the publicization of real estate projects. Residents accuse that authorities have ignored their complaints, and that even construction companies have extended their working hours until late at night in retaliation for the complaints. The increase in property tax has been one of the most immediate effects: some residents report increases of up to thirty percent, an economic burden that many original inhabitants cannot sustain.'
    },
    {
      title: 'The water crisis worsens',
      text: 'Adolfo Lara, a teacher who has lived in Santa Úrsula since the area was populated, points out that the water crisis they have suffered for years has worsened with the construction boom. The area is marked by the Mexico City Water System (Sacmex) as one of the most affected by the lack of water infrastructure, forcing residents to live under a rationing system: one day with water, two or three days without it. The arrival of new tenants to buildings with more than ten apartments each threatens to collapse an already insufficient system. Lara expressed his concern about the authorities omission to close these works, and accused that there is a collusion between public officials and real estate developers. This phenomenon is not exclusive to Santa Úrsula Coapa. In other areas of Coyoacán, such as the town of Xoco, located on the border with the Benito Juárez borough, residents have denounced displacement and rising cost of living since the construction of the Mítikah Tower, the tallest building in Mexico City, inaugurated in 2021 with a total cost of twenty-two thousand five hundred million pesos.'
    },
    {
      title: 'Xoco and Mítikah: an emblematic case',
      text: 'The Mítikah Tower, along with its shopping center opened in 2022, has been pointed out as the most visible symbol of gentrification in the south of the capital. The inhabitants of the town of Xoco have stated that the project, which began in 2008, has destroyed the social fabric of the original neighborhoods and has raised the cost of living to unsustainable levels for the local population. According to La Crónica de Hoy, which published a comparative analysis on January 17, 2026, the urban landscape of Mexico City has changed drastically in the last decade, with new skyscrapers, shopping centers and luxury developments that have replaced popular neighborhoods. The article highlights that neighborhoods like Doctores, historically known for its popular character, is now promoted as "the new Roma neighborhood", with luxury apartments that exceed three million pesos, prices that the original inhabitants cannot afford. This process of substitution of popular housing for high-value developments has caused the displacement of the original population, which has gradually been replaced by people with higher incomes.'
    },
    {
      title: 'What is gentrification? The academic perspective',
      text: 'Luis Alberto Salinas Arreortua, geographer and researcher at the National Autonomous University of Mexico (UNAM), defines gentrification as a process of urban and social rehabilitation of deteriorated areas that attracts inhabitants with greater purchasing power and displaces the original low-income population. In a bulletin published in August 2024, Salinas Arreortua explained that this phenomenon is linked to housing policies that favor large real estate companies and businessmen in the sector, and that it occurs selectively in emblematic neighborhoods of Mexico City, as well as in Magical Towns of the country. Gentrification is not a new phenomenon in Coyoacán. Traditional neighborhoods such as San Lucas, San Mateo Churubusco and San Diego Churubusco, with pre-Hispanic origins, have experienced significant transformations in recent decades. However, the 2026 World Cup has accelerated this process exponentially, generating unprecedented real estate pressure in areas near the Azteca Stadium and in the historic center of Coyoacán.'
    },
    {
      title: 'The dilemma of progress and identity',
      text: 'Gentrification poses a complex dilemma: on the one hand, real estate investment can bring improvements in infrastructure, services and public spaces; on the other, the displacement of the original inhabitants erodes the social fabric and cultural identity of the neighborhoods. In Coyoacán, this dilemma is particularly acute, as the borough is recognized for its historical, cultural and gastronomic wealth, elements that have attracted both tourists and investors. For those visiting Coyoacán during the 2026 World Cup, accommodation options such as SúperAnfitrión Coyoacán offer accessible lodging close to the most relevant cultural and gastronomic points, allowing a more integrated experience with the local environment without contributing to the displacement of neighbors. The key, according to experts, is to find a balance between urban development and the preservation of community identity. Authorities face the challenge of regulating the real estate market, guaranteeing access to basic services such as water, and protecting the rights of the original inhabitants, who have built and maintained the identity of these neighborhoods for decades. The 2026 World Cup will be a litmus test for Coyoacán: will the borough be able to manage growth without sacrificing its essence? The answer to this question will determine the future of one of the most emblematic neighborhoods in Mexico City.'
    }
  ]),
  menuItemsEn: JSON.stringify([
    { item: 'Sources Consulted', desc: 'El Financiero, La Crónica, UNAM, Sacmex', price: 'N/A' }
  ]),
  hoursWeekEn: 'N/A',
  hoursSundayEn: 'N/A',
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

  console.log('✅ Artículo de gentrificación insertado exitosamente en tabla articles');
  console.log('ID del artículo:', result.insertId);
  console.log('Slug:', articleData.slug);
  console.log('URL:', `https://cafeavellan-q8betawp.manus.space/diario?slug=${articleData.slug}`);
} catch (error) {
  console.error('❌ Error al insertar artículo:', error.message);
  throw error;
} finally {
  await connection.end();
}
