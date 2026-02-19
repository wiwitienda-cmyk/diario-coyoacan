import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const articleData = {
  slug: 'gentrificacion-en-coyoacan-entre-el-progreso-inmobiliario-y-el-desplazamiento-de-vecinos-historicos-2026-02-18',
  title: 'Gentrificación en Coyoacán: entre el progreso inmobiliario y el desplazamiento de vecinos históricos',
  summary: 'El boom de construcciones irregulares y el alza de rentas por el Mundial 2026 amenazan con desplazar a los habitantes originarios de Coyoacán, mientras las autoridades enfrentan acusaciones de omisión ante el avance del mercado inmobiliario.',
  category: 'SOCIEDAD',
  date: '2026-02-18',
  heroImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/gDdBXINerfFAHHwL.png',
  content: JSON.stringify([
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
  sources: JSON.stringify([
    'El Financiero (10 diciembre 2025)',
    'La Crónica de Hoy (17 enero 2026)',
    'UNAM (boletín agosto 2024)',
    'Sistema de Aguas de la Ciudad de México (Sacmex)'
  ])
};

try {
  const [result] = await connection.execute(
    `INSERT INTO newsArticles (slug, title, summary, category, date, heroImage, content, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      articleData.slug,
      articleData.title,
      articleData.summary,
      articleData.category,
      articleData.date,
      articleData.heroImage,
      articleData.content
    ]
  );

  console.log('✅ Artículo de gentrificación insertado exitosamente');
  console.log('ID del artículo:', result.insertId);
  console.log('Slug:', articleData.slug);
} catch (error) {
  console.error('❌ Error al insertar artículo:', error.message);
  throw error;
} finally {
  await connection.end();
}
