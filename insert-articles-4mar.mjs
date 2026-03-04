import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const c = await mysql.createConnection(process.env.DATABASE_URL);

const articles = [
  {
    id: 700001,
    slug: 'jacarandas-tinen-morado-coyoacan-ruta-fotografica-2026-03-04',
    dateISO: '2026-03-04',
    weatherTemp: 21,
    weatherConditionEs: 'Parcialmente nublado',
    weatherConditionEn: 'Partly cloudy',
    locationAddress: 'Viveros de Coyoacán, Ciudad de México',
    locationLat: '19.3520',
    locationLng: '-99.1750',
    locationMapsUrl: 'https://maps.google.com/?q=19.3520,-99.1750',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/jacarandas-cdmx_f8802c91.jpg',
    headlineEs: 'Marzo morado: las jacarandas conquistan Coyoacán y el sur de la capital',
    summaryEs: 'La temporada de jacarandas alcanza su punto máximo en las calles del sur de la CDMX, con Coyoacán como uno de los epicentros del fenómeno que atrae a miles de visitantes cada año.',
    categoryEs: 'Cultura',
    dateEs: 'Martes, 4 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'El legado de Tatsugoro Matsumoto florece una vez más',
        text: 'Las calles de Coyoacán amanecieron este martes cubiertas de un manto violeta que ya se ha convertido en sello distintivo de la primavera capitalina. La temporada de jacarandas 2026, que según especialistas del Instituto de Biología de la UNAM alcanzará su pico entre la primera y segunda semana de marzo, ha transformado avenidas como Universidad, División del Norte y los camellones de Viveros de Coyoacán en corredores fotográficos naturales, reportó ADN40 en su cobertura especial de la temporada.'
      },
      {
        title: 'Un fenómeno que mueve a miles',
        text: 'La historia de las jacarandas en la Ciudad de México se remonta a inicios del siglo XX, cuando el jardinero japonés Tatsugoro Matsumoto introdujo la especie Jacaranda mimosifolia desde Brasil por encargo del gobierno de Porfirio Díaz. Más de un siglo después, se estima que la capital alberga entre 35,000 y 40,000 ejemplares, según datos de la Secretaría del Medio Ambiente capitalina. El fenómeno ha generado un movimiento propio en redes sociales: la cuenta @cazajacarandas en Instagram acumula más de 200,000 seguidores que documentan la floración en tiempo real, convirtiendo a la CDMX en tendencia internacional cada marzo, de acuerdo con Infobae México.'
      },
      {
        title: 'Coyoacán, epicentro del morado',
        text: 'Si bien las jacarandas adornan prácticamente toda la ciudad, los barrios del sur —particularmente Coyoacán, San Ángel y la colonia Del Valle— concentran algunos de los túneles de jacarandas más fotografiados. La calle Francisco Sosa, que conecta los jardines Centenario e Hidalgo, se ha convertido en una pasarela natural donde los árboles centenarios forman un arco morado casi continuo. Los Viveros de Coyoacán, con sus senderos sombreados, ofrecen otro de los escenarios más buscados por fotógrafos y familias que buscan capturar el momento. El Souvenir y Chilango han incluido ambos puntos en sus rutas recomendadas para esta temporada.'
      },
      {
        title: 'Entre la contemplación y la ciencia',
        text: 'Investigadores de la UNAM han señalado que la floración de las jacarandas es un indicador biológico del cambio climático: en las últimas dos décadas, la temporada se ha adelantado entre dos y tres semanas respecto a los registros históricos. Este año, los primeros brotes aparecieron a finales de enero, cuando tradicionalmente no se veían hasta mediados de febrero. La Secretaría del Medio Ambiente de la CDMX ha aprovechado el fenómeno para impulsar su programa de reforestación urbana, con la meta de plantar 5,000 nuevos ejemplares antes de 2028. Para quienes deseen recorrer las rutas de jacarandas con calma, los barrios del sur de la capital ofrecen la combinación perfecta de naturaleza, arquitectura colonial y gastronomía que invita a quedarse más de un día.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Purple March: Jacaranda trees conquer Coyoacán and southern Mexico City',
    summaryEn: 'Jacaranda season peaks in the streets of southern CDMX, with Coyoacán as one of the epicenters of the phenomenon that attracts thousands of visitors every year.',
    categoryEn: 'Culture',
    dateEn: 'Tuesday, March 4, 2026',
    contentEn: JSON.stringify([
      {
        title: 'Tatsugoro Matsumoto\'s legacy blooms once more',
        text: 'The streets of Coyoacán woke up this Tuesday covered in a violet blanket that has become the hallmark of Mexico City\'s spring. The 2026 jacaranda season, which according to specialists from UNAM\'s Institute of Biology will peak between the first and second week of March, has transformed avenues like Universidad, División del Norte, and the medians of Viveros de Coyoacán into natural photographic corridors, ADN40 reported in its special coverage.'
      },
      {
        title: 'A phenomenon that moves thousands',
        text: 'The history of jacarandas in Mexico City dates back to the early 20th century, when Japanese gardener Tatsugoro Matsumoto introduced the Jacaranda mimosifolia species from Brazil by commission of the Porfirio Díaz government. More than a century later, the capital is estimated to host between 35,000 and 40,000 specimens. The phenomenon has generated its own movement on social media: the @cazajacarandas Instagram account has over 200,000 followers documenting the bloom in real time.'
      },
      {
        title: 'Coyoacán, the purple epicenter',
        text: 'While jacarandas adorn virtually the entire city, the southern neighborhoods—particularly Coyoacán, San Ángel, and Colonia Del Valle—concentrate some of the most photographed jacaranda tunnels. Francisco Sosa street, connecting the Centenario and Hidalgo gardens, has become a natural runway where century-old trees form an almost continuous purple arch. The Viveros de Coyoacán, with their shaded paths, offer another of the most sought-after settings for photographers and families looking to capture the moment.'
      },
      {
        title: 'Between contemplation and science',
        text: 'UNAM researchers have noted that jacaranda blooming is a biological indicator of climate change: over the past two decades, the season has advanced by two to three weeks compared to historical records. For those wishing to explore the jacaranda routes at leisure, the southern neighborhoods of the capital offer the perfect combination of nature, colonial architecture, and gastronomy that invites visitors to stay more than a day.'
      }
    ]),
    menuItemsEn: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },
  {
    id: 700002,
    slug: 'placas-conmemorativas-mundial-2026-cdmx-tramite-digital-2026-03-04',
    dateISO: '2026-03-04',
    weatherTemp: 21,
    weatherConditionEs: 'Parcialmente nublado',
    weatherConditionEn: 'Partly cloudy',
    locationAddress: 'Ciudad de México',
    locationLat: '19.4326',
    locationLng: '-99.1332',
    locationMapsUrl: 'https://maps.google.com/?q=19.4326,-99.1332',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/placas-mundial-2026_cbdd5a59.jpeg',
    headlineEs: 'Placas del Mundial 2026: la fiebre futbolera llega a las calles de la CDMX desde el 9 de marzo',
    summaryEs: 'El Gobierno de la Ciudad de México presentó las placas vehiculares conmemorativas del Mundial 2026 en tres colores, con un costo de $1,500 pesos y trámite 100% digital.',
    categoryEs: 'Comunidad',
    dateEs: 'Martes, 4 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'Tres diseños, un solo objetivo: vestir la capital de Mundial',
        text: 'A menos de tres meses del inicio de la Copa del Mundo FIFA 2026, el Gobierno de la Ciudad de México dio a conocer las placas vehiculares conmemorativas que estarán disponibles a partir del próximo 9 de marzo. Los diseños, presentados en conferencia de prensa por la jefa de gobierno, vienen en tres colores —blanco, negro y amarillo— y llevan impreso el logotipo oficial del torneo junto con la mascota del evento, reportó Infobae México. El costo será de $1,500 pesos mexicanos y el trámite se realizará exclusivamente a través de la aplicación CDMX Digital.'
      },
      {
        title: 'Un mercado de cinco millones de vehículos',
        text: 'Con un padrón vehicular que supera los cinco millones de unidades registradas en la capital, la Secretaría de Movilidad estima que la demanda de las placas conmemorativas podría alcanzar las 500,000 solicitudes durante el primer mes, según datos publicados por Merca20. El trámite estará disponible tanto para vehículos particulares como para motocicletas, y los conductores podrán conservar su número de placa actual o solicitar uno nuevo. La medida busca no solo generar ingresos para la ciudad sede, sino también fortalecer el sentido de pertenencia mundialista entre los capitalinos, de acuerdo con el comunicado oficial del Gobierno de la CDMX.'
      },
      {
        title: 'La capital se prepara para recibir al mundo',
        text: 'Las placas conmemorativas se suman a una serie de acciones que la administración capitalina ha implementado de cara al Mundial: desde la remodelación de vialidades cercanas al Estadio Azteca hasta la ampliación de la oferta de transporte público en las zonas sur y poniente de la ciudad. Alcaldías como Coyoacán, Tlalpan y Benito Juárez —las más cercanas al recinto de Coapa— han reportado un incremento sostenido en la demanda de alojamiento temporal, según datos del portal Inside Airbnb analizados por Xataka México. El fenómeno ha generado un debate sobre la regulación del hospedaje temporal y su impacto en el mercado inmobiliario de los barrios residenciales del sur.'
      },
      {
        title: 'Requisitos y fechas clave',
        text: 'Para obtener las placas conmemorativas, los interesados deberán contar con la aplicación CDMX Digital actualizada, tener su tarjeta de circulación vigente y estar al corriente en el pago de tenencia y verificación vehicular. El periodo de solicitud será del 9 de marzo al 31 de diciembre de 2026, aunque analistas consultados por N+ anticipan que los diseños más populares podrían agotarse en las primeras semanas. La entrega se realizará en los módulos de la Secretaría de Movilidad distribuidos en las 16 alcaldías. Para quienes planean visitar la capital durante el torneo, los barrios del sur ofrecen una ubicación estratégica a minutos del Estadio Azteca, con opciones de hospedaje que van desde departamentos completos hasta habitaciones en casas de época en colonias como Del Carmen, La Concepción y Churubusco.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'World Cup 2026 commemorative plates: football fever hits Mexico City streets from March 9',
    summaryEn: 'Mexico City government unveiled commemorative vehicle plates for the 2026 World Cup in three colors, at a cost of $1,500 pesos with a fully digital process.',
    categoryEn: 'Community',
    dateEn: 'Tuesday, March 4, 2026',
    contentEn: JSON.stringify([
      { title: 'Three designs, one goal: dressing the capital for the World Cup', text: 'Less than three months before the start of the 2026 FIFA World Cup, Mexico City\'s government unveiled commemorative vehicle plates available from March 9. The designs come in three colors—white, black, and yellow—featuring the official tournament logo and mascot, Infobae México reported. The cost is $1,500 Mexican pesos with an exclusively digital process through the CDMX Digital app.' },
      { title: 'A market of five million vehicles', text: 'With a vehicle registry exceeding five million units in the capital, the Mobility Secretariat estimates demand could reach 500,000 applications in the first month, according to Merca20. The process is available for both private vehicles and motorcycles.' },
      { title: 'The capital prepares to welcome the world', text: 'The commemorative plates join a series of actions the city administration has implemented ahead of the World Cup: from road renovations near Estadio Azteca to expanded public transport in the southern and western zones. Boroughs like Coyoacán, Tlalpan, and Benito Juárez have reported sustained increases in temporary lodging demand.' },
      { title: 'Requirements and key dates', text: 'Applicants need the updated CDMX Digital app, valid vehicle registration, and current tax payments. The application period runs from March 9 to December 31, 2026. For those planning to visit the capital during the tournament, the southern neighborhoods offer strategic locations minutes from Estadio Azteca.' }
    ]),
    menuItemsEn: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },
  {
    id: 700003,
    slug: 'megamarcha-locatarios-mercados-cdmx-digitalizacion-2026-03-04',
    dateISO: '2026-03-04',
    weatherTemp: 21,
    weatherConditionEs: 'Parcialmente nublado',
    weatherConditionEn: 'Partly cloudy',
    locationAddress: 'Zócalo, Centro Histórico, Ciudad de México',
    locationLat: '19.4326',
    locationLng: '-99.1332',
    locationMapsUrl: 'https://maps.google.com/?q=19.4326,-99.1332',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/megamarcha-locatarios_555105a3.jpg',
    headlineEs: 'Miles de locatarios marchan al Zócalo contra la digitalización forzada de mercados públicos',
    summaryEs: 'Comerciantes de mercados públicos de toda la CDMX se movilizaron este martes para exigir la derogación de los nuevos lineamientos digitales que, aseguran, amenazan su permanencia en los espacios que han ocupado por décadas.',
    categoryEs: 'Comunidad',
    dateEs: 'Martes, 4 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'La voz de los mercados toma las calles',
        text: 'Desde las primeras horas de este martes, contingentes de locatarios provenientes de mercados públicos de al menos 12 alcaldías comenzaron a concentrarse en diversos puntos de la ciudad con dirección al Zócalo capitalino. La movilización, convocada por la Unión de Locatarios de Mercados Públicos de la CDMX, rechaza los nuevos lineamientos de digitalización de cédulas de empadronamiento publicados en la Gaceta Oficial el pasado enero, reportó el periodista Guillermo Ortega en su portal. Los manifestantes aseguran que el proceso digital excluye a comerciantes de edad avanzada y condiciona la renovación de permisos a requisitos tecnológicos que muchos no pueden cumplir.'
      },
      {
        title: 'Vialidades afectadas en el sur y centro de la capital',
        text: 'Los contingentes partieron desde múltiples puntos: Calzada de Tlalpan, Eje Central Lázaro Cárdenas, Avenida Insurgentes Sur y Paseo de la Reforma, generando afectaciones viales significativas durante la mañana, según reportes de la Secretaría de Seguridad Ciudadana. En alcaldías del sur como Coyoacán y Benito Juárez, donde operan mercados emblemáticos como el Mercado de Coyoacán y el Mercado de Portales, los locatarios cerraron temporalmente sus puestos para sumarse a la marcha. ADN40 estimó la participación en varios miles de comerciantes, aunque las cifras oficiales no han sido confirmadas por las autoridades.'
      },
      {
        title: 'Los mercados como patrimonio vivo',
        text: 'Los mercados públicos de la Ciudad de México constituyen una red de más de 300 espacios comerciales que atienden a millones de personas diariamente, según datos de la Secretaría de Desarrollo Económico. En Coyoacán, el mercado de artesanías y el mercado gastronómico son referentes no solo para los vecinos sino para visitantes nacionales e internacionales que buscan la experiencia culinaria auténtica de la capital. La Silla Rota ha documentado cómo estos espacios funcionan como centros de cohesión social donde convergen tradiciones gastronómicas, relaciones comerciales multigeneracionales y dinámicas comunitarias que difícilmente pueden trasladarse a una plataforma digital.'
      },
      {
        title: 'Entre la modernización y la tradición',
        text: 'El gobierno capitalino ha defendido la digitalización como una medida de transparencia y combate a la corrupción en la asignación de espacios comerciales. Sin embargo, los locatarios argumentan que el proceso se implementó sin consulta previa y sin considerar la brecha digital que afecta particularmente a los comerciantes mayores de 60 años, que representan aproximadamente el 35% de los empadronados, según cifras de la propia Unión de Locatarios. La marcha concluyó con un pliego petitorio entregado en Palacio de Gobierno que exige la derogación de los lineamientos y la apertura de mesas de diálogo. Los mercados públicos, con su bullicio cotidiano y sus recetas transmitidas por generaciones, siguen siendo el corazón gastronómico de barrios como Coyoacán, donde cada puesto cuenta una historia que ningún algoritmo puede replicar.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Thousands of market vendors march to Zócalo against forced digitalization of public markets',
    summaryEn: 'Public market vendors from across Mexico City mobilized this Tuesday to demand the repeal of new digital guidelines that they say threaten their permanence in spaces they have occupied for decades.',
    categoryEn: 'Community',
    dateEn: 'Tuesday, March 4, 2026',
    contentEn: JSON.stringify([
      { title: 'The voice of the markets takes to the streets', text: 'From early Tuesday morning, contingents of vendors from public markets in at least 12 boroughs began gathering at various points across the city heading toward the Zócalo. The mobilization rejects new digitalization guidelines for vendor registration certificates published in the Official Gazette last January, journalist Guillermo Ortega reported.' },
      { title: 'Roads affected in the south and center of the capital', text: 'Contingents departed from multiple points: Calzada de Tlalpan, Eje Central, Avenida Insurgentes Sur, and Paseo de la Reforma, causing significant traffic disruptions during the morning. In southern boroughs like Coyoacán and Benito Juárez, vendors temporarily closed their stalls to join the march.' },
      { title: 'Markets as living heritage', text: 'Mexico City\'s public markets constitute a network of more than 300 commercial spaces serving millions daily. In Coyoacán, the artisan market and gastronomic market are landmarks not only for neighbors but for national and international visitors seeking the authentic culinary experience of the capital.' },
      { title: 'Between modernization and tradition', text: 'The city government has defended digitalization as a transparency measure. However, vendors argue the process was implemented without prior consultation and without considering the digital divide affecting vendors over 60, who represent approximately 35% of registered vendors. Public markets, with their daily bustle and recipes passed down through generations, remain the gastronomic heart of neighborhoods like Coyoacán.' }
    ]),
    menuItemsEn: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },
  {
    id: 700004,
    slug: 'alerta-amarilla-frio-coyoacan-tlalpan-xochimilco-2026-03-04',
    dateISO: '2026-03-04',
    weatherTemp: 21,
    weatherConditionEs: 'Parcialmente nublado',
    weatherConditionEn: 'Partly cloudy',
    locationAddress: 'Alcaldías del sur, Ciudad de México',
    locationLat: '19.3100',
    locationLng: '-99.1500',
    locationMapsUrl: 'https://maps.google.com/?q=19.3100,-99.1500',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/alerta-frio-cdmx_a179f547.jpg',
    headlineEs: 'Alerta amarilla por frío en Coyoacán, Tlalpan y Xochimilco: temperaturas de 4°C en la madrugada',
    summaryEs: 'Protección Civil activó la alerta amarilla por bajas temperaturas en seis alcaldías del sur y poniente de la CDMX, con mínimas de entre 4 y 6 grados centígrados.',
    categoryEs: 'Servicios',
    dateEs: 'Martes, 4 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'El sur de la capital bajo el termómetro',
        text: 'La Secretaría de Gestión Integral de Riesgos y Protección Civil de la Ciudad de México activó este martes la alerta amarilla por bajas temperaturas en seis alcaldías del sur y poniente de la capital: Coyoacán, Tlalpan, Xochimilco, Milpa Alta, Cuajimalpa de Morelos y Álvaro Obregón. Las temperaturas mínimas registradas durante la madrugada oscilaron entre los 4 y 6 grados centígrados, con sensación térmica cercana a los 2°C en las zonas más elevadas, reportó Publimetro con datos del Servicio Meteorológico Nacional.'
      },
      {
        title: 'Recomendaciones para la población',
        text: 'Las autoridades emitieron una serie de recomendaciones para los habitantes de las alcaldías afectadas: abrigarse con varias capas de ropa, evitar cambios bruscos de temperatura, consumir alimentos ricos en vitaminas A y C, y mantener ventilados los espacios donde se utilicen calentadores de gas. TV Azteca informó que los albergues temporales de la red SIBISO permanecen abiertos las 24 horas para personas en situación de calle. En Coyoacán, el DIF de la alcaldía habilitó puntos de distribución de cobijas y bebidas calientes en los jardines Centenario e Hidalgo durante las primeras horas de la mañana.'
      },
      {
        title: 'Un marzo atípico para la capital',
        text: 'Aunque marzo marca el inicio de la primavera en el hemisferio norte, los meteorólogos consultados por Infobae México señalan que la entrada de un frente frío proveniente del norte del país ha provocado un descenso inusual de las temperaturas en el Valle de México. El fenómeno, combinado con cielos despejados durante la noche, favorece la pérdida de calor por radiación en las zonas de mayor altitud. Meteored México prevé que las condiciones frías se mantendrán hasta el jueves, cuando un sistema de alta presión elevará las máximas por encima de los 25°C. Para quienes recorren las calles empedradas de Coyoacán en estas mañanas frías, las cafeterías del barrio ofrecen el refugio perfecto: un café de olla humeante mientras las jacarandas se mecen con el viento helado es una de esas experiencias que solo se viven en el sur de la capital.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Yellow alert for cold in Coyoacán, Tlalpan and Xochimilco: temperatures of 4°C at dawn',
    summaryEn: 'Civil Protection activated the yellow alert for low temperatures in six southern and western boroughs of Mexico City, with lows between 4 and 6 degrees Celsius.',
    categoryEn: 'Services',
    dateEn: 'Tuesday, March 4, 2026',
    contentEn: JSON.stringify([
      { title: 'The south of the capital under the thermometer', text: 'Mexico City\'s Civil Protection activated the yellow alert for low temperatures in six boroughs: Coyoacán, Tlalpan, Xochimilco, Milpa Alta, Cuajimalpa, and Álvaro Obregón. Minimum temperatures during the early morning ranged between 4 and 6 degrees Celsius, with wind chill near 2°C in higher elevation areas, Publimetro reported.' },
      { title: 'Recommendations for the population', text: 'Authorities issued recommendations including layering clothing, avoiding sudden temperature changes, and consuming vitamin-rich foods. Temporary shelters remain open 24 hours for homeless individuals. In Coyoacán, the borough DIF set up blanket and hot beverage distribution points at the Centenario and Hidalgo gardens.' },
      { title: 'An atypical March for the capital', text: 'Although March marks the beginning of spring, a cold front from northern Mexico has caused an unusual temperature drop in the Valley of Mexico. Meteored México forecasts cold conditions will persist until Thursday. For those walking the cobblestone streets of Coyoacán on these cold mornings, the neighborhood cafés offer the perfect refuge.' }
    ]),
    menuItemsEn: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },
  {
    id: 700005,
    slug: 'talleres-carteles-8m-arte-tipografico-cdmx-2026-03-04',
    dateISO: '2026-03-04',
    weatherTemp: 21,
    weatherConditionEs: 'Parcialmente nublado',
    weatherConditionEn: 'Partly cloudy',
    locationAddress: 'Ciudad de México',
    locationLat: '19.3600',
    locationLng: '-99.1650',
    locationMapsUrl: 'https://maps.google.com/?q=19.3600,-99.1650',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/talleres-8m_0e75babc.jpg',
    headlineEs: 'Cuando las letras se vuelven protesta: talleres de carteles preparan el 8M en la CDMX',
    summaryEs: 'A cuatro días de la marcha del Día Internacional de la Mujer, colectivos feministas y artistas gráficas organizan talleres de pósteres y tipografía como herramienta de protesta visual.',
    categoryEs: 'Cultura',
    dateEs: 'Martes, 4 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'El arte como trinchera',
        text: 'A cuatro días de la marcha del 8 de marzo, Día Internacional de la Mujer, los talleres de carteles y tipografía de protesta se han multiplicado en espacios culturales, centros comunitarios y universidades de la Ciudad de México. La iniciativa, documentada por Animal Político en un reportaje especial titulado "Cuando las letras se vuelven protesta", muestra cómo colectivos feministas han convertido la creación de pósteres en una herramienta de organización y expresión artística que trasciende la consigna política.'
      },
      {
        title: 'Tipografía con mensaje',
        text: 'Los talleres, que se imparten de manera gratuita o a cambio de una cooperación voluntaria, enseñan técnicas de serigrafía, lettering manual y composición gráfica aplicadas a la creación de carteles para la marcha. Las facilitadoras —en su mayoría diseñadoras gráficas y artistas visuales— enfatizan que el cartel de protesta tiene una tradición centenaria en México que se remonta a los grabados de José Guadalupe Posada y los carteles del movimiento estudiantil de 1968. En Coyoacán, el Foro Cultural Coyoacanense y espacios independientes como Casa Vecina han albergado sesiones donde las participantes diseñan piezas que abordan temas como la violencia de género, los derechos reproductivos y la brecha salarial.'
      },
      {
        title: 'La marcha que moviliza a la capital',
        text: 'El 8M se ha consolidado como una de las movilizaciones más multitudinarias de la Ciudad de México. En 2025, la Secretaría de Seguridad Ciudadana estimó la participación en más de 80,000 personas en la marcha principal que recorrió Paseo de la Reforma desde el Ángel de la Independencia hasta el Zócalo. Para este año, los colectivos organizadores anticipan una convocatoria similar o mayor, con contingentes partiendo desde diversos puntos de la ciudad, incluyendo la Glorieta de las Mujeres que Luchan en Reforma y el Monumento a la Revolución. Las alcaldías del sur, particularmente Coyoacán y Benito Juárez, han sido históricamente puntos de concentración previos a la marcha.'
      },
      {
        title: 'Más allá de la marcha',
        text: 'Los talleres de carteles representan solo una parte de la agenda cultural que rodea al 8M en la capital. Exposiciones fotográficas, proyecciones de documentales, conversatorios y presentaciones de libros se han programado a lo largo de la semana en recintos como la Cineteca Nacional, el Centro Cultural Universitario y diversos foros independientes de Coyoacán. La efervescencia cultural que genera el 8M ha convertido a la primera semana de marzo en uno de los momentos de mayor actividad artística y social en los barrios del sur de la ciudad, donde la tradición de lucha social se entrelaza con la vida cotidiana de sus calles y plazas.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'When letters become protest: poster workshops prepare for March 8 in Mexico City',
    summaryEn: 'Four days before International Women\'s Day, feminist collectives and graphic artists organize poster and typography workshops as a tool for visual protest.',
    categoryEn: 'Culture',
    dateEn: 'Tuesday, March 4, 2026',
    contentEn: JSON.stringify([
      { title: 'Art as a trench', text: 'Four days before the March 8 demonstration, poster and protest typography workshops have multiplied in cultural spaces, community centers, and universities across Mexico City. The initiative, documented by Animal Político, shows how feminist collectives have turned poster creation into a tool for organization and artistic expression.' },
      { title: 'Typography with a message', text: 'The free workshops teach screen printing, hand lettering, and graphic composition techniques applied to protest poster creation. In Coyoacán, the Foro Cultural Coyoacanense and independent spaces have hosted sessions where participants design pieces addressing gender violence, reproductive rights, and the wage gap.' },
      { title: 'The march that mobilizes the capital', text: 'March 8 has become one of Mexico City\'s largest mobilizations. In 2025, security authorities estimated over 80,000 participants. Southern boroughs, particularly Coyoacán and Benito Juárez, have historically been gathering points before the march.' },
      { title: 'Beyond the march', text: 'The poster workshops represent just part of the cultural agenda surrounding March 8. Photo exhibitions, documentary screenings, and book presentations are scheduled throughout the week at venues including the Cineteca Nacional and various independent forums in Coyoacán.' }
    ]),
    menuItemsEn: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },
  {
    id: 700006,
    slug: 'fuga-gas-tlalpan-evacuacion-emergencia-2026-03-04',
    dateISO: '2026-03-04',
    weatherTemp: 21,
    weatherConditionEs: 'Parcialmente nublado',
    weatherConditionEn: 'Partly cloudy',
    locationAddress: 'Colonia Miguel Hidalgo, Tlalpan, Ciudad de México',
    locationLat: '19.2847',
    locationLng: '-99.1700',
    locationMapsUrl: 'https://maps.google.com/?q=19.2847,-99.1700',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/fuga-gas-tlalpan_96b8b8b0.webp',
    headlineEs: 'Fuga de gas en Tlalpan moviliza cuerpos de emergencia y obliga a evacuar decenas de viviendas',
    summaryEs: 'Una fuga de gas natural provocada por obras de construcción en la colonia Miguel Hidalgo de Tlalpan obligó a la evacuación de al menos 40 viviendas y movilizó a bomberos y Protección Civil.',
    categoryEs: 'Seguridad',
    dateEs: 'Martes, 4 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'Obras dañan tubería de gas natural',
        text: 'Una fuga de gas natural se registró la mañana de este martes en la calle Corregidora número 444, colonia Miguel Hidalgo 2da Sección, en la alcaldía Tlalpan, luego de que trabajos de construcción dañaran una tubería subterránea de distribución. El incidente fue reportado alrededor de las 8:30 horas por vecinos que detectaron el olor característico del mercaptano, la sustancia que se añade al gas natural para facilitar su detección, informó POSTA con datos de Reporteros en Movimiento.'
      },
      {
        title: 'Evacuación y perímetro de seguridad',
        text: 'Elementos del Heroico Cuerpo de Bomberos de la Ciudad de México, junto con personal de Protección Civil de Tlalpan y técnicos de la empresa distribuidora de gas, establecieron un perímetro de seguridad de 200 metros alrededor del punto de la fuga. Al menos 40 viviendas fueron evacuadas de manera preventiva, según reportó TV Azteca. Los bomberos utilizaron equipo especializado de medición de concentración de gas para determinar los niveles de riesgo en la zona. La vialidad sobre Corregidora fue cerrada en ambos sentidos entre las calles de Morelos y Guerrero, generando desvíos vehiculares que afectaron la circulación en la zona sur de Tlalpan.'
      },
      {
        title: 'Control de la emergencia',
        text: 'Tras aproximadamente tres horas de trabajos, los técnicos de la empresa distribuidora lograron cerrar la válvula de suministro y sellar la tubería dañada. El Heroico Cuerpo de Bomberos confirmó saldo blanco: no se registraron personas lesionadas ni daños a inmuebles más allá de la tubería afectada. Los vecinos evacuados pudieron regresar a sus domicilios alrededor del mediodía, una vez que las mediciones de concentración de gas en el ambiente arrojaron niveles seguros. La alcaldía de Tlalpan informó que abrirá una investigación sobre las condiciones en que se realizaban las obras de construcción que provocaron el daño a la infraestructura de gas, ya que presuntamente no contaban con los permisos correspondientes para trabajos de excavación profunda.'
      },
      {
        title: 'Infraestructura subterránea bajo presión',
        text: 'El incidente en Tlalpan se suma a una serie de fugas de gas registradas en las alcaldías del sur de la capital durante los últimos meses, un fenómeno que especialistas en infraestructura urbana atribuyen al envejecimiento de las redes de distribución y al aumento de obras de construcción sin supervisión adecuada. Reforma ha documentado al menos 15 incidentes similares en la zona sur durante 2025 y lo que va de 2026. Las autoridades de Protección Civil reiteran la importancia de reportar cualquier olor a gas al número de emergencias 911 y evitar encender cerillos, encendedores o aparatos eléctricos en caso de detectar una fuga. La colonia Miguel Hidalgo de Tlalpan, colindante con Coyoacán, es una zona residencial donde la convivencia entre el crecimiento urbano y la infraestructura existente plantea desafíos que requieren atención constante de las autoridades.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Gas leak in Tlalpan mobilizes emergency services and forces evacuation of dozens of homes',
    summaryEn: 'A natural gas leak caused by construction work in Tlalpan\'s Miguel Hidalgo neighborhood forced the evacuation of at least 40 homes and mobilized firefighters and Civil Protection.',
    categoryEn: 'Security',
    dateEn: 'Tuesday, March 4, 2026',
    contentEn: JSON.stringify([
      { title: 'Construction damages natural gas pipeline', text: 'A natural gas leak was reported Tuesday morning at Corregidora street 444, Miguel Hidalgo 2nd Section, in the Tlalpan borough, after construction work damaged an underground distribution pipeline. The incident was reported around 8:30 AM by neighbors who detected the characteristic mercaptan odor, POSTA reported.' },
      { title: 'Evacuation and security perimeter', text: 'Mexico City firefighters, along with Tlalpan Civil Protection and gas company technicians, established a 200-meter security perimeter. At least 40 homes were preventively evacuated, TV Azteca reported.' },
      { title: 'Emergency under control', text: 'After approximately three hours, technicians managed to close the supply valve and seal the damaged pipeline. Firefighters confirmed no injuries or property damage beyond the affected pipeline. Evacuated residents returned home around noon.' },
      { title: 'Underground infrastructure under pressure', text: 'The Tlalpan incident joins a series of gas leaks recorded in the capital\'s southern boroughs in recent months, a phenomenon that urban infrastructure specialists attribute to aging distribution networks and increased unsupervised construction.' }
    ]),
    menuItemsEn: JSON.stringify([{"item": "N/A", "desc": "N/A", "price": "N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  }
];

const cols = [
  'id','slug','dateISO','weatherTemp','weatherConditionEs','weatherConditionEn',
  'locationAddress','locationLat','locationLng','locationMapsUrl','heroImage',
  'headlineEs','summaryEs','categoryEs','dateEs','contentEs','menuItemsEs','hoursWeekEs','hoursSundayEs',
  'headlineEn','summaryEn','categoryEn','dateEn','contentEn','menuItemsEn','hoursWeekEn','hoursSundayEn'
];

for (const a of articles) {
  const vals = cols.map(col => a[col]);
  const placeholders = cols.map(() => '?').join(',');
  const sql = `INSERT INTO articles (${cols.join(',')}) VALUES (${placeholders})`;
  await c.execute(sql, vals);
  console.log(`Inserted: ${a.id} - ${a.headlineEs.substring(0, 60)}...`);
  // Small delay to ensure different createdAt timestamps (jacarandas = last = most recent)
  await new Promise(r => setTimeout(r, 1500));
}

console.log('\\n6 artículos del 4 de marzo insertados correctamente.');
await c.end();
