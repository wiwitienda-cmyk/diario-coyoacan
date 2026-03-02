import { createConnection } from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const db = await createConnection(process.env.DATABASE_URL);

const articles = [
  // ─────────────────────────────────────────────────────────────────
  // ARTÍCULO 1: Retas AntiFIFA
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "retas-antififa-coyoacan-protesta-mundial-despojo-2026-03-02",
    dateISO: "2026-03-02",
    weatherTemp: 17,
    weatherConditionEs: "Frío y nublado",
    weatherConditionEn: "Cold and cloudy",
    locationAddress: "Calzada de Tlalpan, Santa Úrsula Coapa, Alcaldía Coyoacán",
    locationLat: "19.3050",
    locationLng: "-99.1500",
    locationMapsUrl: "https://maps.google.com/?q=19.3050,-99.1500",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/retas-antififa-coyoacan-2026-03-02-SXTrTm3iZ45yUYY3vULHyh.webp",
    headlineEs: "'¡Agua para las casas, no para las plazas!': Jóvenes cierran Tlalpan con 'Retas AntiFIFA'",
    headlineEn: "'Water for homes, not for plazas!': Youth block Tlalpan with 'Anti-FIFA Matches'",
    summaryEs: "Alrededor de 30 jóvenes del colectivo 'Retas AntiFIFA' marcharon por Santa Úrsula Coapa, pintaron una cancha en el asfalto de la Calzada de Tlalpan y denunciaron que el Mundial 2026 profundiza el despojo, la gentrificación y la escasez de agua en colonias del sur de la CDMX.",
    summaryEn: "Around 30 young people from the 'Anti-FIFA Matches' collective marched through Santa Úrsula Coapa, painted a football pitch on Calzada de Tlalpan's asphalt, and denounced that the 2026 World Cup is deepening displacement, gentrification, and water scarcity in southern Mexico City neighborhoods.",
    categoryEs: "Comunidad",
    categoryEn: "Community",
    dateEs: "Lunes, 2 de marzo de 2026",
    dateEn: "Monday, March 2, 2026",
    contentEs: JSON.stringify([
      {
        title: "Una cancha en el asfalto",
        text: "La tarde del domingo 1 de marzo, cuando la luz del día comenzaba a ceder sobre la Calzada de Tlalpan, un grupo de jóvenes con el rostro cubierto sacó botes de pintura blanca y trazó las líneas de una cancha de fútbol directamente sobre el asfalto, frente al estadio Banorte, en la alcaldía Coyoacán. No era un acto vandálico sino una declaración política: 'Jugar también es una forma de organización política y social', rezaba su pronunciamiento. Así nació la primera 'Reta AntiFIFA', una manifestación que cerró la circulación vial y convirtió la vía pública en campo de disputa simbólica contra la Copa Mundial de la FIFA 2026. La acción fue reportada por la revista Proceso y confirmada por fotografías del fotoperiodista Miguel Dimayuga."
      },
      {
        title: "El despojo que viene con el silbatazo",
        text: "El colectivo, integrado por alrededor de 30 hombres y mujeres de distintas colonias del sur capitalino, marchó desde el kiosco de Santa Úrsula Coapa hasta el bajo puente frente al estadio. En la vanguardia, una manta blanca con letras negras: '¡No al mundial del despojo!'. Las consignas que lanzaron durante el recorrido sintetizan el pliego de agravios que acumulan los vecinos de la zona: 'Queremos vivienda, el mundial nos vale verga', 'FIFA entiende, el agua no se vende' y 'Ni la FIFA ni el gobierno detendrán al movimiento'. En su pronunciamiento formal, el colectivo denunció que el torneo 'está profundizando en procesos de despojo, limpieza social, desplazamiento y gentrificación' en la Ciudad de México, Guadalajara, Monterrey, Quintana Roo y Puebla."
      },
      {
        title: "Agua, vivienda y megadesarrollos sin freno",
        text: "La escasez de agua es el agravio más inmediato que señalan los vecinos de Santa Úrsula Coapa y colonias aledañas. Según testimonios recogidos por Reporte Índigo y El Universal, las obras de remodelación de infraestructura vinculadas a la organización del Mundial han generado cortes frecuentes en el suministro de agua potable. A esto se suma la proliferación de megadesarrollos inmobiliarios que, según la Asamblea Vecinal Tlalpan-Coyoacán, comenzaron obras sin permisos en calles como Popocatépetl, Calzada de Tlalpan y San Carlos. Los manifestantes convocaron a más 'retas' en las semanas siguientes, bajo la consigna de que 'la calle es de quien la habita'. Hasta el cierre de esta edición, la alcaldía Coyoacán no había emitido respuesta oficial al pronunciamiento del colectivo."
      },
      {
        title: "Nota del editor",
        text: "Diario Coyoacán reconoce que el hospedaje en la zona sur de la CDMX —incluyendo las propiedades de SúperAnfitrión Coyoacán— se beneficia del flujo de visitantes que trae el Mundial. Sin embargo, el periodismo local exige dar voz también a quienes señalan los costos sociales del evento. Esta nota se basa en información publicada por Proceso (Miguel Dimayuga), Reporte Índigo y El Universal el 2 de marzo de 2026."
      }
    ]),
    contentEn: JSON.stringify([
      {
        title: "A pitch on the asphalt",
        text: "On Sunday afternoon, March 1, as daylight faded over Calzada de Tlalpan, a group of masked young people pulled out cans of white paint and drew the lines of a football pitch directly on the asphalt in front of Estadio Banorte, in the Coyoacán borough. It was not vandalism but a political statement: 'Playing is also a form of political and social organization,' read their manifesto. Thus was born the first 'Anti-FIFA Match,' a demonstration that blocked traffic and turned the public road into a symbolic battleground against the FIFA 2026 World Cup. The action was reported by Proceso magazine and documented by photojournalist Miguel Dimayuga."
      },
      {
        title: "The dispossession that comes with the kickoff",
        text: "The collective, made up of around 30 men and women from various southern Mexico City neighborhoods, marched from the Santa Úrsula Coapa kiosk to the underpass in front of the stadium. At the front, a white banner with black letters: 'No to the World Cup of dispossession!' Their chants summarize the grievances accumulated by area residents: 'We want housing, the World Cup can go to hell,' 'FIFA listen up, water is not for sale,' and 'Neither FIFA nor the government will stop the movement.' In their formal statement, the collective denounced that the tournament 'is deepening processes of dispossession, social cleansing, displacement, and gentrification' in Mexico City, Guadalajara, Monterrey, Quintana Roo, and Puebla."
      },
      {
        title: "Water, housing, and unchecked mega-developments",
        text: "Water scarcity is the most immediate grievance cited by residents of Santa Úrsula Coapa and surrounding neighborhoods. According to testimonies collected by Reporte Índigo and El Universal, infrastructure renovation works linked to World Cup preparations have caused frequent cuts in the potable water supply. Added to this is the proliferation of real estate mega-developments that, according to the Tlalpan-Coyoacán Neighborhood Assembly, began construction without permits on streets such as Popocatépetl, Calzada de Tlalpan, and San Carlos. The demonstrators called for more 'matches' in the coming weeks, under the rallying cry that 'the street belongs to those who inhabit it.' At press time, the Coyoacán borough government had not issued an official response to the collective's statement."
      }
    ]),
    menuItemsEs: JSON.stringify([{ item: "N/A", desc: "N/A", price: "N/A" }]),
    menuItemsEn: JSON.stringify([{ item: "N/A", desc: "N/A", price: "N/A" }]),
    hoursWeekEs: "N/A",
    hoursSundayEs: "N/A",
    hoursWeekEn: "N/A",
    hoursSundayEn: "N/A",
  },

  // ─────────────────────────────────────────────────────────────────
  // ARTÍCULO 2: Operativo espacio público Coyoacán
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "coyoacan-recupera-primer-cuadro-40-motos-franeleros-2026-03-02",
    dateISO: "2026-03-02",
    weatherTemp: 17,
    weatherConditionEs: "Frío y nublado",
    weatherConditionEn: "Cold and cloudy",
    locationAddress: "Primer cuadro de Coyoacán, entre Quevedo, División del Norte, Universidad y Churubusco",
    locationLat: "19.3467",
    locationLng: "-99.1618",
    locationMapsUrl: "https://maps.google.com/?q=19.3467,-99.1618",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/coyoacan-espacio-publico-operativo-2026-03-02-GPPTyMajqpN2ZjcauKZf2R.webp",
    headlineEs: "Coyoacán despliega 31 equipos y retira 40 motos del primer cuadro en operativo contra franeleros",
    headlineEn: "Coyoacán deploys 31 teams and removes 40 motorcycles from historic center in anti-'franelero' operation",
    summaryEs: "La alcaldía Coyoacán, en coordinación con la SSC, realizó un operativo en el polígono Quevedo-División del Norte-Universidad-Churubusco: retiraron 40 motocicletas, una tonelada de trafitambos y aplicaron 50 amonestaciones. El alcalde Giovani Gutiérrez prometió repetir los dispositivos de forma aleatoria.",
    summaryEn: "The Coyoacán borough government, in coordination with the SSC, carried out an operation in the Quevedo-División del Norte-Universidad-Churubusco polygon: 40 motorcycles removed, one ton of traffic cones confiscated, and 50 verbal warnings issued. Mayor Giovani Gutiérrez promised to repeat the operations randomly.",
    categoryEs: "Gobierno Local",
    categoryEn: "Local Government",
    dateEs: "Lunes, 2 de marzo de 2026",
    dateEn: "Monday, March 2, 2026",
    contentEs: JSON.stringify([
      {
        title: "31 equipos, una góndola y tonelada de trafitambos",
        text: "El domingo 1 de marzo, la alcaldía Coyoacán y la Secretaría de Seguridad Ciudadana (SSC) ejecutaron un operativo coordinado en el primer cuadro de la demarcación para recuperar el espacio público. Según informó El Heraldo de México, se desplegaron 31 equipos integrados por elementos de Vialidad, Escudo Coyoacán y personal de vía pública, bajo el mando del director general de Control de Tránsito, comisario Roberto Carlos Ríos Martínez, con indicativo 'Rayo'. El operativo se concentró en el polígono delimitado por las avenidas Miguel Ángel de Quevedo, División del Norte, Universidad y Churubusco, con énfasis especial en el centro histórico de Coyoacán."
      },
      {
        title: "Franeleros, motos y bienes mostrencos",
        text: "Los resultados del operativo, según datos oficiales reportados por El Heraldo de México y Megalópolis MX, incluyeron el retiro mediante góndola de 40 motocicletas trasladadas al depósito vehicular 'Fuerte de Loreto', el decomiso de 5 juegos de placas, 50 amonestaciones verbales y la confiscación de una tonelada de trafitambos, cubetas y enseres utilizados por los llamados franeleros para apropiarse de cajones de estacionamiento en la vía pública. Además, se retiraron bienes mostrencos —objetos abandonados que obstruían rampas para personas con discapacidad, pasos peatonales y carriles de circulación— en todo el primer cuadro de la demarcación."
      },
      {
        title: "El alcalde promete más operativos",
        text: "El alcalde Giovani Gutiérrez agradeció públicamente el apoyo de la SSC y ratificó que los dispositivos continuarán 'de manera aleatoria durante las siguientes semanas', sin fechas ni horarios fijos, precisamente para evitar que los infractores anticipen los operativos. La estrategia de aleatoriedad busca mantener la presión sobre quienes se apropian del espacio público de forma sistemática. Para los vecinos del centro histórico de Coyoacán, la medida es bienvenida pero insuficiente: en redes sociales, varios residentes señalaron que los franeleros regresan horas después de cada operativo. El debate sobre la efectividad de las acciones puntuales versus políticas de largo plazo sigue abierto en la alcaldía."
      }
    ]),
    contentEn: JSON.stringify([
      {
        title: "31 teams, one crane truck, and a ton of traffic cones",
        text: "On Sunday, March 1, the Coyoacán borough government and the Mexico City Security Secretariat (SSC) carried out a coordinated operation in the historic center to reclaim public space. According to El Heraldo de México, 31 teams were deployed, made up of Traffic Control, Escudo Coyoacán, and public road personnel, under the command of Traffic Control Director Commissioner Roberto Carlos Ríos Martínez, call sign 'Rayo.' The operation focused on the polygon bounded by Miguel Ángel de Quevedo, División del Norte, Universidad, and Churubusco avenues, with special emphasis on Coyoacán's historic center."
      },
      {
        title: "Parking hustlers, motorcycles, and abandoned goods",
        text: "The operation's results, according to official data reported by El Heraldo de México and Megalópolis MX, included the removal by crane truck of 40 motorcycles taken to the 'Fuerte de Loreto' vehicle pound, the seizure of 5 sets of license plates, 50 verbal warnings, and the confiscation of one ton of traffic cones, buckets, and equipment used by so-called 'franeleros' (informal parking attendants) to claim public parking spots. Additionally, abandoned goods blocking disability ramps, pedestrian crossings, and traffic lanes were cleared throughout the historic center."
      },
      {
        title: "The mayor promises more operations",
        text: "Mayor Giovani Gutiérrez publicly thanked the SSC and confirmed that the operations will continue 'randomly over the coming weeks,' without fixed dates or times, precisely to prevent violators from anticipating the crackdowns. The randomness strategy aims to maintain pressure on those who systematically appropriate public space. For residents of Coyoacán's historic center, the measure is welcome but insufficient: on social media, several residents noted that the parking hustlers return hours after each operation. The debate over the effectiveness of one-off actions versus long-term policies remains open in the borough."
      }
    ]),
    menuItemsEs: JSON.stringify([{ item: "N/A", desc: "N/A", price: "N/A" }]),
    menuItemsEn: JSON.stringify([{ item: "N/A", desc: "N/A", price: "N/A" }]),
    hoursWeekEs: "N/A",
    hoursSundayEs: "N/A",
    hoursWeekEn: "N/A",
    hoursSundayEn: "N/A",
  },

  // ─────────────────────────────────────────────────────────────────
  // ARTÍCULO 3: Incendio Xochimilco / calidad del aire
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "incendio-xochimilco-calidad-aire-mala-cdmx-2026-03-02",
    dateISO: "2026-03-02",
    weatherTemp: 15,
    weatherConditionEs: "Humo y mala calidad del aire",
    weatherConditionEn: "Smoky, poor air quality",
    locationAddress: "Circuito Cuemanco, Barrio 18, Alcaldía Xochimilco, Ciudad de México",
    locationLat: "19.2800",
    locationLng: "-99.1000",
    locationMapsUrl: "https://maps.google.com/?q=19.2800,-99.1000",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/incendio-xochimilco-calidad-aire-2026-03-02-39gW6H7X8mMgs8fw2inhMq.webp",
    headlineEs: "Incendio en Xochimilco y fábrica de PET en Chalco: el sur de la CDMX amanece con aire 'malo' y riesgo 'alto'",
    headlineEn: "Fire in Xochimilco and PET factory in Chalco: southern Mexico City wakes up to 'bad' air and 'high' risk",
    summaryEs: "Un incendio de dos hectáreas de pasto seco en Circuito Cuemanco, Xochimilco, y otro simultáneo en una fábrica de PET en Chalco, Edomex, deterioraron la calidad del aire en el Valle de México durante la madrugada del lunes. El índice AIRE Y SALUD reporta nivel 'malo' con riesgo 'alto' por PM10 y PM2.5. No se activó contingencia ambiental.",
    summaryEn: "A two-hectare dry grass fire on Circuito Cuemanco in Xochimilco, and a simultaneous blaze at a PET factory in Chalco, State of Mexico, deteriorated air quality in the Valley of Mexico during the early hours of Monday. The AIRE Y SALUD index reports 'bad' quality with 'high' risk due to PM10 and PM2.5. No environmental contingency was activated.",
    categoryEs: "Medio Ambiente",
    categoryEn: "Environment",
    dateEs: "Lunes, 2 de marzo de 2026",
    dateEn: "Monday, March 2, 2026",
    contentEs: JSON.stringify([
      {
        title: "Dos hectáreas en Cuemanco, confinadas al amanecer",
        text: "La madrugada del lunes 2 de marzo, elementos del Heroico Cuerpo de Bomberos de la Ciudad de México respondieron a un incendio de pasto seco en Circuito Cuemanco, Barrio 18, en la alcaldía Xochimilco. Según informó ADN40, el siniestro afectó aproximadamente dos hectáreas de vegetación seca. A través de sus redes sociales, los Bomberos CDMX confirmaron que el fuego fue confinado y apagado en su totalidad, sin personas lesionadas ni daños a viviendas cercanas. Las labores se concentraron en el control y enfriamiento del terreno para prevenir una posible reactivación. Sin embargo, el humo generado se dispersó hacia colonias del sur de la ciudad, incluyendo zonas de Coyoacán, Tlalpan y Benito Juárez."
      },
      {
        title: "Fábrica de PET en Chalco suma contaminantes",
        text: "De forma paralela, un incendio en una fábrica de PET ubicada en la avenida Sebastián Lerdo de Tejada, colonia San Isidro, en el municipio de Chalco, Estado de México, generó una columna de humo negro que se sumó a los contaminantes en el aire del Valle de México. Las autoridades del Edomex desalojaron al menos dos casas cercanas como medida preventiva y no reportaron víctimas ni heridos. La combinación de ambos incendios, sumada a las condiciones atmosféricas de estabilidad y poca dispersión propias de la temporada de secas, contribuyó al deterioro de la calidad del aire registrado durante la mañana del lunes."
      },
      {
        title: "Índice AIRE Y SALUD: 'malo' con riesgo 'alto'",
        text: "El Índice AIRE Y SALUD correspondiente al 2 de marzo de 2026 reportó calidad 'mala' con nivel de riesgo 'alto', principalmente por concentraciones elevadas de partículas PM10 y PM2.5, según datos publicados por ADN40. Estos contaminantes representan un riesgo especialmente serio para niñas, niños, adultos mayores y personas con enfermedades respiratorias crónicas como asma o EPOC. Las autoridades ambientales no activaron la Fase 1 de Contingencia Ambiental, pero mantuvieron el escenario bajo vigilancia. En caso de que los niveles de partículas suspendidas superaran los límites establecidos, se podrían aplicar restricciones vehiculares como el Doble Hoy No Circula y recomendaciones para limitar actividades al aire libre. Para quienes visitan Coyoacán o Xochimilco esta semana, se recomienda consultar el índice AIRE Y SALUD antes de actividades al exterior, especialmente en las primeras horas de la mañana."
      }
    ]),
    contentEn: JSON.stringify([
      {
        title: "Two hectares in Cuemanco, contained by dawn",
        text: "In the early hours of Monday, March 2, members of the Mexico City Heroic Fire Department responded to a dry grass fire on Circuito Cuemanco, Barrio 18, in the Xochimilco borough. According to ADN40, the blaze affected approximately two hectares of dry vegetation. Through their social media channels, CDMX Firefighters confirmed that the fire was fully contained and extinguished, with no injuries or damage to nearby homes. Efforts focused on controlling and cooling the terrain to prevent possible reignition. However, the smoke generated dispersed toward southern Mexico City neighborhoods, including areas of Coyoacán, Tlalpan, and Benito Juárez."
      },
      {
        title: "PET factory in Chalco adds pollutants",
        text: "Simultaneously, a fire at a PET factory on Avenida Sebastián Lerdo de Tejada, Colonia San Isidro, in the municipality of Chalco, State of Mexico, generated a column of black smoke that added to the pollutants in the Valley of Mexico's air. State of Mexico authorities evacuated at least two nearby homes as a precautionary measure and reported no casualties or injuries. The combination of both fires, along with the atmospheric stability and low dispersion conditions typical of the dry season, contributed to the air quality deterioration recorded on Monday morning."
      },
      {
        title: "AIRE Y SALUD index: 'bad' with 'high' risk",
        text: "The AIRE Y SALUD Index for March 2, 2026 reported 'bad' quality with a 'high' risk level, primarily due to elevated concentrations of PM10 and PM2.5 particles, according to data published by ADN40. These pollutants pose a particularly serious risk for children, the elderly, and people with chronic respiratory conditions such as asthma or COPD. Environmental authorities did not activate Phase 1 of the Environmental Contingency, but kept the situation under surveillance. Should suspended particle levels exceed established limits, vehicle restrictions such as the Double Hoy No Circula program and recommendations to limit outdoor activities could be applied. For those visiting Coyoacán or Xochimilco this week, checking the AIRE Y SALUD index before outdoor activities is recommended, especially in the early morning hours."
      }
    ]),
    menuItemsEs: JSON.stringify([{ item: "N/A", desc: "N/A", price: "N/A" }]),
    menuItemsEn: JSON.stringify([{ item: "N/A", desc: "N/A", price: "N/A" }]),
    hoursWeekEs: "N/A",
    hoursSundayEs: "N/A",
    hoursWeekEn: "N/A",
    hoursSundayEn: "N/A",
  },
];

let inserted = 0;
for (const article of articles) {
  try {
    await db.execute(
      `INSERT INTO articles (
        slug, dateISO, weatherTemp, weatherConditionEs, weatherConditionEn,
        locationAddress, locationLat, locationLng, locationMapsUrl, heroImage,
        headlineEs, summaryEs, categoryEs, dateEs, contentEs, menuItemsEs, hoursWeekEs, hoursSundayEs,
        headlineEn, summaryEn, categoryEn, dateEn, contentEn, menuItemsEn, hoursWeekEn, hoursSundayEn
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        article.slug, article.dateISO, article.weatherTemp,
        article.weatherConditionEs, article.weatherConditionEn,
        article.locationAddress, article.locationLat, article.locationLng,
        article.locationMapsUrl, article.heroImage,
        article.headlineEs, article.summaryEs, article.categoryEs,
        article.dateEs, article.contentEs, article.menuItemsEs,
        article.hoursWeekEs, article.hoursSundayEs,
        article.headlineEn, article.summaryEn, article.categoryEn,
        article.dateEn, article.contentEn, article.menuItemsEn,
        article.hoursWeekEn, article.hoursSundayEn,
      ]
    );
    console.log(`✅ Insertado: ${article.slug}`);
    inserted++;
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      console.log(`⚠️  Ya existe: ${article.slug}`);
    } else {
      console.error(`❌ Error en ${article.slug}:`, err.message);
    }
  }
}

await db.end();
console.log(`\n🗞️  ${inserted} artículos insertados correctamente.`);
