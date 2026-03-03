import 'dotenv/config';
import mysql2 from 'mysql2/promise';

const conn = await mysql2.createConnection(process.env.DATABASE_URL);

const articles = [
  // ========== 1. ECLIPSE LUNAR / LUNA DE SANGRE / ALINEACIÓN PLANETARIA ==========
  {
    id: 690001,
    slug: 'eclipse-lunar-luna-sangre-alineacion-planetaria-cdmx-2026-03-03',
    dateISO: '2026-03-03',
    weatherTemp: 14,
    weatherConditionEs: 'Despejado',
    weatherConditionEn: 'Clear',
    locationAddress: 'Coyoacán, Ciudad de México',
    locationLat: '19.3500',
    locationLng: '-99.1620',
    locationMapsUrl: 'https://maps.google.com/?q=19.3500,-99.1620',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/eclipse-luna-sangre_5e768a43.jpeg',
    headlineEs: 'Luna de Sangre sobre la CDMX: eclipse total y seis planetas alineados marcan una madrugada histórica',
    summaryEs: 'La madrugada del 3 de marzo de 2026, el cielo de la Ciudad de México fue escenario de un eclipse lunar total que tiñó la Luna de rojo intenso, mientras seis planetas del sistema solar permanecían alineados en el firmamento. Astrónomos, astrólogos y miles de capitalinos coinciden: una noche cabalística e irrepetible.',
    categoryEs: 'Ciencia y Astronomía',
    dateEs: 'Martes, 3 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'El cielo se tiñó de rojo',
        text: 'A las 5:04 de la madrugada, hora del centro de México, la sombra de la Tierra cubrió por completo el disco lunar. No fue oscuridad lo que vieron los miles de capitalinos que madrugaron para observar el fenómeno, sino un resplandor cobrizo, casi sangriento, que transformó la Luna llena en una esfera rojiza suspendida sobre los volcanes. El eclipse lunar total —el primero visible desde la CDMX en más de tres años— alcanzó su punto máximo cuando la atmósfera terrestre filtró la luz solar, dispersó los tonos azules y dejó pasar únicamente las longitudes de onda rojas, tiñendo nuestro satélite natural de ese tono que la tradición popular bautizó como Luna de Sangre. La NASA, a través de su programa What\'s Up de marzo 2026, lo describió así: "Bask in the red glow of our lunar companion." Desde azoteas de Coyoacán, el Ajusco y la explanada de Ciudad Universitaria, vecinos y aficionados a la astronomía montaron telescopios y compartieron el espectáculo en redes sociales. Foto: 20Minutos / EFE.'
      },
      {
        title: 'Seis planetas en fila: un desfile cósmico que no se repetirá en décadas',
        text: 'El eclipse no fue el único protagonista de la noche. Desde finales de febrero, seis planetas del sistema solar —Mercurio, Venus, Júpiter, Saturno, Urano y Neptuno— se alinearon en un arco visible tras el atardecer, un fenómeno que la comunidad científica denominó "gran desfile planetario". Según la NASA y el Instituto de Astrofísica de Canarias (IAC), Mercurio, Venus, Saturno y Júpiter fueron observables a simple vista, mientras que Urano y Neptuno requirieron binoculares o telescopio. La alineación, que comenzó el 28 de febrero, se mantuvo durante los primeros días de marzo, coincidiendo con el eclipse y creando una conjunción de eventos astronómicos que no se veía desde hace décadas. CNN en Español, La Jornada, DW y National Geographic documentaron ampliamente el fenómeno, que fue tendencia mundial en redes sociales con los hashtags #LunaDeSangre, #AlineaciónPlanetaria y #BloodMoon2026.'
      },
      {
        title: 'El 3/3 cabalístico: lo que dicen los astrólogos',
        text: 'Para la comunidad astrológica, la fecha no fue casual. El eclipse lunar total ocurrió en el signo de Virgo, según la astróloga Mhoni Vidente, quien lo describió como un momento de "soltar, limpiar y despedirse de lo que ya no va". La influencer Melody Saenz lo resumió en Instagram: "Un amanecer rojo, silencioso y poderoso." La numerología del 3/3 (tercer día del tercer mes) se asocia en diversas tradiciones con la trinidad, la manifestación y los ciclos de transformación. Sumado a la alineación de seis planetas y la entrada de Venus en Aries —signo de fuego y nuevos comienzos—, astrólogos de todo el continente coincidieron en señalar esta madrugada como un punto de inflexión energético. El equinoccio de primavera, previsto para el 20 de marzo, completará lo que muchos ya llaman "el mes más intenso del cielo en 2026".'
      },
      {
        title: '¿Dónde observar el cielo desde Coyoacán?',
        text: 'Coyoacán ofrece algunos de los mejores puntos de observación astronómica del sur de la CDMX. Los Viveros de Coyoacán, la explanada de Ciudad Universitaria y las azoteas del Centro Histórico de la alcaldía son sitios frecuentados por clubes de astronomía amateur. Para quienes visiten la zona en las próximas semanas, el 8 de marzo traerá otra joya celeste: la conjunción de Venus y Saturno, separados por apenas un grado en el cielo occidental tras el atardecer. Si planeas observar el cielo desde el corazón de Coyoacán, SúperAnfitrión Coyoacán ofrece alojamientos a pasos de los mejores puntos de observación. Reserva en superanfitrion.com.mx y vive la experiencia de despertar bajo el cielo más espectacular de la capital. Fuentes: NASA/JPL-Caltech, IAC, CNN en Español, La Jornada, DW, National Geographic, Mhoni Vidente (Instagram), Melody Saenz (Instagram).'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Blood Moon over Mexico City: total eclipse and six aligned planets mark a historic dawn',
    summaryEn: 'In the early hours of March 3, 2026, Mexico City\'s sky hosted a total lunar eclipse that turned the Moon blood red, while six solar system planets remained aligned across the firmament. Astronomers, astrologers, and thousands of residents agree: a once-in-a-generation, mystical night.',
    categoryEn: 'Science & Astronomy',
    dateEn: 'Tuesday, March 3, 2026',
    contentEn: JSON.stringify([
      {
        title: 'The sky turned red',
        text: 'At 5:04 AM Central Mexico Time, Earth\'s shadow completely covered the lunar disk. Thousands of early risers across the capital witnessed not darkness but a coppery, almost bloody glow that transformed the full Moon into a reddish sphere suspended above the volcanoes. The total lunar eclipse—the first visible from Mexico City in over three years—peaked when Earth\'s atmosphere filtered sunlight, scattered blue wavelengths, and let only red light through, painting our natural satellite in the hue popularly known as the Blood Moon. NASA\'s March 2026 What\'s Up program described it: "Bask in the red glow of our lunar companion." From Coyoacán rooftops, the Ajusco foothills, and the Ciudad Universitaria esplanade, neighbors and amateur astronomers set up telescopes and shared the spectacle on social media. Photo: 20Minutos / EFE.'
      },
      {
        title: 'Six planets in a row: a cosmic parade not seen in decades',
        text: 'The eclipse was not the night\'s only star. Since late February, six solar system planets—Mercury, Venus, Jupiter, Saturn, Uranus, and Neptune—aligned in an arc visible after sunset, a phenomenon scientists called the "grand planetary parade." According to NASA and the Instituto de Astrofísica de Canarias (IAC), Mercury, Venus, Saturn, and Jupiter were visible to the naked eye, while Uranus and Neptune required binoculars or a telescope. The alignment, which began February 28, persisted through early March, coinciding with the eclipse and creating a conjunction of astronomical events unseen in decades. CNN, La Jornada, DW, and National Geographic extensively documented the phenomenon, which trended worldwide under #BloodMoon, #PlanetaryAlignment, and #BloodMoon2026.'
      },
      {
        title: 'The mystical 3/3: what astrologers say',
        text: 'For the astrological community, the date was no coincidence. The total lunar eclipse occurred in Virgo, according to astrologer Mhoni Vidente, who described it as a moment to "release, cleanse, and say goodbye to what no longer serves." Influencer Melody Saenz summarized it on Instagram: "A red, silent, and powerful dawn." The numerology of 3/3 (third day of the third month) is associated in various traditions with trinity, manifestation, and transformation cycles. Combined with the six-planet alignment and Venus entering Aries—a fire sign of new beginnings—astrologers across the continent agreed this dawn marked an energetic turning point. The spring equinox on March 20 will complete what many already call "the most intense sky month of 2026."'
      },
      {
        title: 'Where to stargaze from Coyoacán',
        text: 'Coyoacán offers some of the best astronomical observation points in southern Mexico City. Viveros de Coyoacán, the Ciudad Universitaria esplanade, and the rooftops of the borough\'s historic center are popular spots for amateur astronomy clubs. For those visiting in the coming weeks, March 8 brings another celestial gem: the Venus-Saturn conjunction, just one degree apart in the western sky after sunset. If you plan to stargaze from the heart of Coyoacán, SúperAnfitrión Coyoacán offers accommodations steps from the best observation points. Book at superanfitrion.com.mx and experience waking up under the capital\'s most spectacular sky. Sources: NASA/JPL-Caltech, IAC, CNN en Español, La Jornada, DW, National Geographic, Mhoni Vidente (Instagram), Melody Saenz (Instagram).'
      }
    ]),
    menuItemsEn: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },

  // ========== 2. VIVIENDAS → HOSPEDAJE TEMPORAL POR MUNDIAL 2026 ==========
  {
    id: 690002,
    slug: 'viviendas-hospedaje-temporal-mundial-2026-cdmx-coyoacan-2026-03-03',
    dateISO: '2026-03-03',
    weatherTemp: 14,
    weatherConditionEs: 'Despejado',
    weatherConditionEn: 'Clear',
    locationAddress: 'Alcaldía Coyoacán, Ciudad de México',
    locationLat: '19.3500',
    locationLng: '-99.1620',
    locationMapsUrl: 'https://maps.google.com/?q=19.3500,-99.1620',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/viviendas-mundial-2026_29671d92.jpeg',
    headlineEs: 'Cada 48 horas, tres viviendas en la CDMX dejan de ser hogar para convertirse en hospedaje turístico rumbo al Mundial',
    summaryEs: 'Un análisis de la plataforma Inside Airbnb y la Coalición Internacional para el Hábitat revela que Coyoacán, Benito Juárez, Cuauhtémoc y Miguel Hidalgo concentran el 81% de las propiedades de alquiler temporal en la capital. El Mundial 2026 acelera la conversión de viviendas residenciales en alojamientos turísticos a un ritmo sin precedentes.',
    categoryEs: 'Vivienda y Urbanismo',
    dateEs: 'Martes, 3 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'El ritmo de la conversión: tres viviendas cada dos días',
        text: 'Los números son contundentes. Según el análisis más reciente de Inside Airbnb —plataforma independiente que monitorea la actividad de alquiler temporal en ciudades del mundo—, entre diciembre de 2024 y junio de 2025, Airbnb sumó 778 nuevos espacios en la Ciudad de México. Eso equivale a tres departamentos o casas completas que cada 48 horas dejaron de estar disponibles para renta residencial y pasaron al mercado de hospedaje turístico. La Coalición Internacional para el Hábitat de América Latina (HIC-AL), junto con el Centro de Derechos Humanos Fray Francisco de Vittoria y la Fundación María Luisa Marín, presentó estos datos el 27 de febrero en un comunicado que advierte: la tendencia se acelera conforme se acerca la Copa del Mundo. Foto: Xataka México.'
      },
      {
        title: 'Coyoacán, en el epicentro del fenómeno',
        text: 'Cuatro alcaldías concentran el 81% de las propiedades listadas en plataformas de alquiler temporal: Cuauhtémoc, Miguel Hidalgo, Benito Juárez y Coyoacán. En estas demarcaciones, la plataforma contabiliza 7,531 propiedades activas, de las cuales 1,264 pertenecen a anfitriones con más de un listado —lo que sugiere operaciones comerciales, no hogares compartidos—. El total de alojamientos activos en la CDMX asciende a 27,651, distribuidos en apenas 939 grandes anfitriones. La Ley de Turismo de la CDMX limita a 180 noches anuales la operación de viviendas como hospedaje temporal, pero la fiscalización es prácticamente inexistente. Según Xataka México, el incremento neto fue de 778 nuevos espacios en solo seis meses, "lo que nos habla de una aceleración en la conversión de viviendas de uso residencial a alojamiento temporal en un momento crítico para la ciudad".'
      },
      {
        title: 'El efecto Mundial: gentrificación acelerada',
        text: 'El Mundial de Fútbol 2026 —con sede compartida entre México, Estados Unidos y Canadá— ha disparado la especulación inmobiliaria en las zonas cercanas a los estadios y los corredores turísticos. En Coyoacán, donde el Centro Histórico, los Viveros y la cercanía con Ciudad Universitaria atraen a visitantes internacionales, los precios de renta residencial han subido entre un 15% y un 25% en el último año, según datos de Inmuebles24 y Propiedades.com. Los vecinos históricos del barrio —muchos de ellos adultos mayores con contratos de renta antiguos— enfrentan presiones para desocupar sus viviendas. "No es que estemos en contra del turismo", declaró una vecina de la colonia Del Carmen a Desinformémonos, "sino de que nos saquen de nuestras casas para meter turistas". Fuentes: Xataka México, Reforma, Kaos en la Red, Luces del Siglo, Buzos, Desinformémonos, HIC-AL.'
      },
      {
        title: 'Nota del editor: hospedaje responsable',
        text: 'El debate sobre la conversión de viviendas en hospedaje temporal no es nuevo, pero el Mundial 2026 lo ha llevado a un punto de inflexión. En SúperAnfitrión Coyoacán creemos que el turismo y la comunidad pueden coexistir cuando el hospedaje se gestiona con responsabilidad, respeto al vecindario y compromiso con la economía local. Nuestros alojamientos operan bajo la normativa vigente y priorizan la experiencia auténtica del barrio. Si buscas hospedarte en Coyoacán con un anfitrión comprometido con la comunidad, visita superanfitrion.com.mx.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Every 48 hours, three Mexico City homes become tourist rentals as the World Cup approaches',
    summaryEn: 'An analysis by Inside Airbnb and the International Coalition for Habitat reveals that Coyoacán, Benito Juárez, Cuauhtémoc, and Miguel Hidalgo concentrate 81% of short-term rental properties in the capital. The 2026 World Cup is accelerating the conversion of residential housing into tourist accommodation at an unprecedented pace.',
    categoryEn: 'Housing & Urbanism',
    dateEn: 'Tuesday, March 3, 2026',
    contentEn: JSON.stringify([
      {
        title: 'The pace of conversion: three homes every two days',
        text: 'The numbers are stark. According to the latest analysis by Inside Airbnb—an independent platform monitoring short-term rental activity worldwide—between December 2024 and June 2025, Airbnb added 778 new listings in Mexico City. That equals three apartments or complete houses every 48 hours leaving the residential rental market for tourist accommodation. The International Coalition for Habitat in Latin America (HIC-AL), together with the Fray Francisco de Vittoria Human Rights Center and the María Luisa Marín Foundation, presented these figures on February 27 in a statement warning: the trend is accelerating as the World Cup approaches. Photo: Xataka México.'
      },
      {
        title: 'Coyoacán, at the epicenter',
        text: 'Four boroughs concentrate 81% of properties listed on short-term rental platforms: Cuauhtémoc, Miguel Hidalgo, Benito Juárez, and Coyoacán. In these areas, the platform counts 7,531 active properties, of which 1,264 belong to hosts with multiple listings—suggesting commercial operations, not shared homes. The total active listings in Mexico City reach 27,651, distributed among just 939 large-scale hosts. Mexico City\'s Tourism Law limits short-term rental operations to 180 nights per year, but enforcement is virtually nonexistent. According to Xataka México, the net increase was 778 new listings in just six months, "which speaks to an acceleration in the conversion of residential housing to temporary accommodation at a critical moment for the city."'
      },
      {
        title: 'The World Cup effect: accelerated gentrification',
        text: 'The 2026 FIFA World Cup—co-hosted by Mexico, the United States, and Canada—has triggered real estate speculation near stadiums and tourist corridors. In Coyoacán, where the Historic Center, Viveros park, and proximity to Ciudad Universitaria attract international visitors, residential rents have risen 15-25% in the past year, according to Inmuebles24 and Propiedades.com data. Long-time neighborhood residents—many of them elderly with legacy rental contracts—face pressure to vacate their homes. "We\'re not against tourism," a Del Carmen resident told Desinformémonos, "but against being pushed out of our homes to make room for tourists." Sources: Xataka México, Reforma, Kaos en la Red, Luces del Siglo, Buzos, Desinformémonos, HIC-AL.'
      },
      {
        title: 'Editor\'s note: responsible hosting',
        text: 'The debate over converting homes into tourist accommodation is not new, but the 2026 World Cup has brought it to a tipping point. At SúperAnfitrión Coyoacán, we believe tourism and community can coexist when hosting is managed responsibly, with respect for the neighborhood and commitment to the local economy. Our accommodations operate under current regulations and prioritize an authentic neighborhood experience. If you\'re looking to stay in Coyoacán with a host committed to the community, visit superanfitrion.com.mx.'
      }
    ]),
    menuItemsEn: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },

  // ========== 3. LIMPIEZA CANAL NACIONAL COYOACÁN ==========
  {
    id: 690003,
    slug: 'limpieza-canal-nacional-coyoacan-9-toneladas-basura-2026-03-03',
    dateISO: '2026-03-03',
    weatherTemp: 14,
    weatherConditionEs: 'Despejado',
    weatherConditionEn: 'Clear',
    locationAddress: 'Canal Nacional, Barrio de la Magdalena, Alcaldía Coyoacán',
    locationLat: '19.3380',
    locationLng: '-99.1450',
    locationMapsUrl: 'https://maps.google.com/?q=19.3380,-99.1450',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/canal-nacional-limpieza_ab98b918.webp',
    headlineEs: 'Retiran 9 toneladas de basura del Canal Nacional en Coyoacán: 90 voluntarios rescatan un tramo olvidado',
    summaryEs: 'Una jornada de limpieza encabezada por el diputado Gerardo Villanueva y 90 voluntarios retiró nueve toneladas de desechos del Canal Nacional a la altura del Barrio de la Magdalena, en Coyoacán. La acción incluyó una mesa de trabajo con la SEDEMA para dar seguimiento al saneamiento del cuerpo de agua.',
    categoryEs: 'Medio Ambiente',
    dateEs: 'Martes, 3 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'Nueve toneladas en una mañana',
        text: 'El sábado 1 de marzo, desde las 7 de la mañana, un contingente de 90 personas —entre vecinos, activistas ambientales y personal de limpieza— se reunió en las orillas del Canal Nacional, a la altura del Barrio de la Magdalena, en la alcaldía Coyoacán. La convocatoria, impulsada por el diputado local Gerardo Villanueva, tenía un objetivo concreto: retirar la mayor cantidad posible de basura acumulada en un tramo de aproximadamente 500 metros del canal. Al mediodía, el resultado superó las expectativas: nueve toneladas de desechos —plásticos, llantas, escombro, ropa y hasta un colchón— fueron extraídas del lecho y las márgenes del cuerpo de agua. La empresa Kaji colaboró con equipo de riego para facilitar la remoción de residuos incrustados en el fango. Foto: La Prensa / OEM.'
      },
      {
        title: 'Un canal con historia y abandono',
        text: 'El Canal Nacional es uno de los últimos vestigios del sistema lacustre que definió la geografía de la Ciudad de México durante siglos. En su tramo por Coyoacán, el canal atraviesa barrios históricos como La Magdalena, Los Reyes y San Francisco Culhuacán, zonas donde la urbanización desordenada y la falta de infraestructura de drenaje han convertido el cuerpo de agua en un vertedero a cielo abierto. Vecinos del Barrio de la Magdalena relataron a La Prensa que llevan años denunciando la acumulación de basura sin obtener respuesta de las autoridades. "Cada temporada de lluvias el canal se desborda y el agua sucia entra a las casas", declaró doña Margarita, habitante de la zona desde hace 40 años. La jornada de limpieza, aunque celebrada, fue calificada por los propios vecinos como "un parche" ante un problema estructural que requiere inversión en infraestructura hidráulica.'
      },
      {
        title: 'Mesa de trabajo con SEDEMA',
        text: 'Tras la jornada de limpieza, el diputado Villanueva anunció la instalación de una mesa de trabajo con Julia Álvarez Icaza, titular de la Secretaría del Medio Ambiente (SEDEMA) de la CDMX, para dar seguimiento al saneamiento integral del Canal Nacional. Entre los compromisos se encuentran: la instalación de trampas de basura en los puntos de mayor acumulación, la programación de jornadas de limpieza mensuales con participación ciudadana, y un estudio de factibilidad para la rehabilitación ecológica del tramo Coyoacán-Xochimilco. El Canal Nacional conecta, aguas abajo, con la zona chinampera de Xochimilco, Patrimonio de la Humanidad por la UNESCO, lo que añade urgencia al tema. Fuente: La Prensa (OEM).'
      },
      {
        title: 'Nota del editor',
        text: 'El Canal Nacional es parte del patrimonio ambiental e histórico del sur de la CDMX. Su recuperación no solo beneficiaría a los vecinos de Coyoacán, sino que fortalecería el corredor ecológico que conecta con Xochimilco. Para quienes visiten la zona y quieran conocer de cerca este paisaje urbano en transformación, SúperAnfitrión Coyoacán ofrece alojamientos en el corazón de la alcaldía. Reserva en superanfitrion.com.mx.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: '9 tons of trash removed from Canal Nacional in Coyoacán: 90 volunteers rescue a forgotten stretch',
    summaryEn: 'A cleanup effort led by congressman Gerardo Villanueva and 90 volunteers removed nine tons of waste from Canal Nacional near Barrio de la Magdalena in Coyoacán. The action included a working group with SEDEMA to follow up on the waterway\'s restoration.',
    categoryEn: 'Environment',
    dateEn: 'Tuesday, March 3, 2026',
    contentEn: JSON.stringify([
      {
        title: 'Nine tons in one morning',
        text: 'On Saturday, March 1, starting at 7 AM, a contingent of 90 people—neighbors, environmental activists, and cleaning crews—gathered along the banks of Canal Nacional near Barrio de la Magdalena in Coyoacán. The effort, organized by local congressman Gerardo Villanueva, had a concrete goal: remove as much accumulated trash as possible from a roughly 500-meter stretch of the canal. By noon, results exceeded expectations: nine tons of waste—plastics, tires, rubble, clothing, and even a mattress—were extracted from the waterway bed and banks. Company Kaji provided irrigation equipment to help remove debris embedded in the mud. Photo: La Prensa / OEM.'
      },
      {
        title: 'A canal with history and neglect',
        text: 'Canal Nacional is one of the last vestiges of the lake system that defined Mexico City\'s geography for centuries. In its Coyoacán stretch, the canal passes through historic neighborhoods like La Magdalena, Los Reyes, and San Francisco Culhuacán—areas where unplanned urbanization and lack of drainage infrastructure have turned the waterway into an open-air dump. Barrio de la Magdalena residents told La Prensa they have spent years reporting trash accumulation without government response. "Every rainy season the canal overflows and dirty water enters our homes," said doña Margarita, a 40-year resident. The cleanup, while celebrated, was described by neighbors themselves as "a patch" for a structural problem requiring investment in hydraulic infrastructure.'
      },
      {
        title: 'Working group with SEDEMA',
        text: 'Following the cleanup, congressman Villanueva announced a working group with Julia Álvarez Icaza, head of Mexico City\'s Environmental Secretariat (SEDEMA), to follow up on comprehensive Canal Nacional restoration. Commitments include: installing trash traps at major accumulation points, scheduling monthly citizen-participation cleanups, and a feasibility study for ecological rehabilitation of the Coyoacán-Xochimilco stretch. Canal Nacional connects downstream with Xochimilco\'s chinampa zone, a UNESCO World Heritage Site, adding urgency to the matter. Source: La Prensa (OEM).'
      },
      {
        title: 'Editor\'s note',
        text: 'Canal Nacional is part of southern Mexico City\'s environmental and historical heritage. Its recovery would benefit not only Coyoacán residents but strengthen the ecological corridor connecting to Xochimilco. For visitors wanting to experience this transforming urban landscape firsthand, SúperAnfitrión Coyoacán offers accommodations in the heart of the borough. Book at superanfitrion.com.mx.'
      }
    ]),
    menuItemsEn: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },

  // ========== 4. BOMBEROS RESCATAN 4 GATOS EN COYOACÁN ==========
  {
    id: 690004,
    slug: 'bomberos-cdmx-rescatan-4-gatos-incendio-coyoacan-2026-03-03',
    dateISO: '2026-03-03',
    weatherTemp: 14,
    weatherConditionEs: 'Despejado',
    weatherConditionEn: 'Clear',
    locationAddress: 'Colonia Los Cedros, Alcaldía Coyoacán',
    locationLat: '19.3350',
    locationLng: '-99.1580',
    locationMapsUrl: 'https://maps.google.com/?q=19.3350,-99.1580',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/bomberos-gatos-coyoacan_14703c0f.jpg',
    headlineEs: 'Milagro en Coyoacán: bomberos de la CDMX rescatan a cuatro gatos de un incendio en la colonia Los Cedros',
    summaryEs: 'Una fuga de gas en un horno de cocina provocó un incendio en una vivienda de la colonia Los Cedros, en Coyoacán. Los bomberos de la CDMX controlaron el siniestro y rescataron con vida a cuatro felinos atrapados entre el humo. El Jefe Vulcano Juan Manuel Pérez Cova confirmó saldo blanco.',
    categoryEs: 'Comunidad',
    dateEs: 'Martes, 3 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'Humo y maullidos en Los Cedros',
        text: 'La alerta llegó al C5 poco después de las 11 de la mañana del domingo 2 de marzo. Vecinos de la colonia Los Cedros, en la alcaldía Coyoacán, reportaron una columna de humo negro que salía de una vivienda en la calle Fresno. Al llegar, los bomberos de la CDMX encontraron un incendio originado en la cocina, donde una fuga de gas en el horno había provocado la ignición. La familia —dos adultos y un menor— ya había evacuado la vivienda, pero cuatro gatos domésticos permanecían atrapados en el interior, ocultos entre muebles y rincones donde buscaron refugio del humo. Los bomberos ingresaron con equipo de respiración autónoma y, tras sofocar las llamas, localizaron uno a uno a los felinos. Los cuatro fueron rescatados con vida, aunque con signos de inhalación de humo. Foto: Escapada H / AlaCrítica.'
      },
      {
        title: 'El Jefe Vulcano confirma saldo blanco',
        text: 'Juan Manuel Pérez Cova, conocido en el cuerpo de bomberos como el "Jefe Vulcano", confirmó en declaraciones a AlaCrítica que el incendio fue controlado en aproximadamente 40 minutos y que no hubo personas lesionadas. "Los cuatro felinos están estables. Los entregamos a sus dueños con recomendación de llevarlos al veterinario para revisión por inhalación de humo", detalló. El Jefe Vulcano aprovechó para recordar a los vecinos de Coyoacán la importancia de revisar periódicamente las conexiones de gas en cocinas y calentadores, especialmente en viviendas antiguas donde las instalaciones pueden tener décadas de uso sin mantenimiento.'
      },
      {
        title: 'Coyoacán y sus gatos: una relación histórica',
        text: 'La noticia se viralizó rápidamente en redes sociales, donde los usuarios celebraron el rescate con memes y mensajes de agradecimiento a los bomberos. No es casual: Coyoacán es conocida como una de las alcaldías con mayor población felina de la CDMX. Los gatos del Jardín Centenario, los del mercado de artesanías y los que deambulan por las calles empedradas del Centro Histórico son parte del paisaje cotidiano del barrio. Organizaciones como Gatitos de Coyoacán y Adopta Coyoacán trabajan en programas de esterilización y adopción responsable. El rescate de Los Cedros se suma a una larga lista de intervenciones de los bomberos de la CDMX en favor de animales domésticos atrapados en emergencias. Fuente: AlaCrítica, Escapada H.'
      },
      {
        title: 'Nota del editor',
        text: 'Si visitas Coyoacán, no te sorprendas si un gato callejero se cruza en tu camino mientras recorres sus calles coloniales. Son parte del alma del barrio. Y si buscas un lugar donde hospedarte para vivir la experiencia completa de Coyoacán —gatos incluidos—, SúperAnfitrión Coyoacán te espera. Reserva en superanfitrion.com.mx.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Miracle in Coyoacán: Mexico City firefighters rescue four cats from a house fire in Los Cedros',
    summaryEn: 'A gas leak in a kitchen oven caused a fire in a home in the Los Cedros neighborhood of Coyoacán. Mexico City firefighters controlled the blaze and rescued four cats alive from the smoke. Fire Chief Juan Manuel Pérez Cova confirmed no injuries.',
    categoryEn: 'Community',
    dateEn: 'Tuesday, March 3, 2026',
    contentEn: JSON.stringify([
      {
        title: 'Smoke and meowing in Los Cedros',
        text: 'The alert reached the C5 emergency center shortly after 11 AM on Sunday, March 2. Residents of the Los Cedros neighborhood in Coyoacán reported a column of black smoke rising from a home on Fresno Street. Upon arrival, Mexico City firefighters found a fire originating in the kitchen, where a gas leak in the oven had caused ignition. The family—two adults and a child—had already evacuated, but four domestic cats remained trapped inside, hidden among furniture where they sought refuge from the smoke. Firefighters entered with self-contained breathing apparatus and, after extinguishing the flames, located each cat one by one. All four were rescued alive, though showing signs of smoke inhalation. Photo: Escapada H / AlaCrítica.'
      },
      {
        title: 'Fire Chief confirms no injuries',
        text: 'Juan Manuel Pérez Cova, known in the fire department as "Jefe Vulcano," confirmed to AlaCrítica that the fire was controlled in approximately 40 minutes with no human injuries. "All four cats are stable. We returned them to their owners with a recommendation to visit a veterinarian for smoke inhalation evaluation," he detailed. The Fire Chief took the opportunity to remind Coyoacán residents about the importance of periodically checking gas connections in kitchens and water heaters, especially in older homes where installations may have gone decades without maintenance.'
      },
      {
        title: 'Coyoacán and its cats: a historic relationship',
        text: 'The story quickly went viral on social media, where users celebrated the rescue with memes and messages of gratitude to firefighters. It\'s no coincidence: Coyoacán is known as one of Mexico City\'s boroughs with the largest feline population. The cats of Jardín Centenario, the artisan market, and those wandering the cobblestone streets of the Historic Center are part of the neighborhood\'s daily landscape. Organizations like Gatitos de Coyoacán and Adopta Coyoacán work on spay/neuter and responsible adoption programs. The Los Cedros rescue joins a long list of Mexico City firefighter interventions on behalf of domestic animals trapped in emergencies. Source: AlaCrítica, Escapada H.'
      },
      {
        title: 'Editor\'s note',
        text: 'If you visit Coyoacán, don\'t be surprised if a street cat crosses your path as you stroll its colonial streets. They\'re part of the neighborhood\'s soul. And if you\'re looking for a place to stay and experience everything Coyoacán has to offer—cats included—SúperAnfitrión Coyoacán awaits. Book at superanfitrion.com.mx.'
      }
    ]),
    menuItemsEn: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  },

  // ========== 5. COYOACÁN VS FRANELEROS ==========
  {
    id: 690005,
    slug: 'coyoacan-operativo-franeleros-trafitambos-2026-03-03',
    dateISO: '2026-03-03',
    weatherTemp: 14,
    weatherConditionEs: 'Despejado',
    weatherConditionEn: 'Clear',
    locationAddress: 'Centro Histórico de Coyoacán, Ciudad de México',
    locationLat: '19.3500',
    locationLng: '-99.1620',
    locationMapsUrl: 'https://maps.google.com/?q=19.3500,-99.1620',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/franeleros-coyoacan_b490eb5d.webp',
    headlineEs: 'Coyoacán declara guerra a los franeleros: retiran una tonelada de trafitambos y cubetas del Centro Histórico',
    summaryEs: 'La alcaldía de Coyoacán desplegó un operativo para retirar trafitambos, cubetas, cadenas y otros objetos con los que franeleros obstruyen la vía pública y cobran ilegalmente por estacionamiento en calles del Centro Histórico. Se retiraron más de una tonelada de objetos en una sola jornada.',
    categoryEs: 'Gobierno Local',
    dateEs: 'Martes, 3 de marzo de 2026',
    contentEs: JSON.stringify([
      {
        title: 'Una tonelada de obstrucciones',
        text: 'Trafitambos naranjas, cubetas de pintura rellenas de cemento, cadenas con candado, conos viales y hasta sillas de plástico. Ese fue el inventario que los equipos de la alcaldía de Coyoacán retiraron de las calles del Centro Histórico durante un operativo realizado el fin de semana del 1 y 2 de marzo. En total, más de una tonelada de objetos que franeleros utilizaban para "apartar" lugares de estacionamiento en la vía pública y cobrar entre 20 y 50 pesos a los automovilistas por ocuparlos. El operativo, documentado por La Prensa (OEM), incluyó la participación de personal de Servicios Urbanos, Seguridad Ciudadana y la Dirección de Gobierno de la alcaldía. Los objetos fueron trasladados a un depósito municipal. Foto: La Prensa / OEM.'
      },
      {
        title: 'El negocio de los franeleros: una economía informal enquistada',
        text: 'El fenómeno de los franeleros —personas que se apropian de tramos de la vía pública para cobrar por estacionamiento sin autorización— es uno de los problemas urbanos más arraigados de la CDMX. En Coyoacán, donde el flujo de visitantes al Centro Histórico, los mercados y las plazas genera alta demanda de estacionamiento, los franeleros operan con particular agresividad. Vecinos de las colonias Del Carmen, La Concepción y Villa Coyoacán han denunciado durante años que los franeleros no solo cobran por estacionar, sino que rayan o dañan los vehículos de quienes se niegan a pagar. "Es una extorsión a plena luz del día", declaró un comerciante de la calle Higuera a La Prensa. La alcaldía informó que el operativo se repetirá de manera periódica, aunque los vecinos se muestran escépticos: "Los quitan un día y al siguiente ya están de vuelta con nuevas cubetas", señaló una vecina de la calle Tres Cruces.'
      },
      {
        title: 'El reto de la movilidad en Coyoacán',
        text: 'El problema de los franeleros está directamente ligado a la falta de infraestructura de estacionamiento en el Centro Histórico de Coyoacán, una zona con calles estrechas, trazado colonial y un flujo de visitantes que supera con creces la capacidad vial. La alcaldía ha anunciado en diversas ocasiones la construcción de estacionamientos públicos y la implementación de parquímetros, pero ninguno de estos proyectos se ha concretado. Mientras tanto, los franeleros llenan el vacío institucional. El operativo del fin de semana es un paso, pero los especialistas en movilidad urbana coinciden en que sin una solución estructural —más transporte público, ciclovías seguras y estacionamientos regulados— el problema seguirá reproduciéndose. Fuente: La Prensa (OEM).'
      },
      {
        title: 'Nota del editor',
        text: 'Si visitas Coyoacán, nuestra recomendación es llegar en transporte público (Metro Coyoacán o Viveros) o en bicicleta. Evitarás el estrés del estacionamiento y los franeleros, y disfrutarás más del barrio a pie. Y si vienes de fuera de la ciudad, hospédate en el corazón de Coyoacán con SúperAnfitrión: caminarás a todo. Reserva en superanfitrion.com.mx.'
      }
    ]),
    menuItemsEs: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEs: 'N/A',
    hoursSundayEs: 'N/A',
    headlineEn: 'Coyoacán declares war on illegal parking attendants: one ton of barriers removed from Historic Center',
    summaryEn: 'Coyoacán borough deployed an operation to remove traffic cones, buckets, chains, and other objects used by illegal parking attendants to obstruct public roads and charge for street parking in the Historic Center. Over one ton of objects were removed in a single day.',
    categoryEn: 'Local Government',
    dateEn: 'Tuesday, March 3, 2026',
    contentEn: JSON.stringify([
      {
        title: 'One ton of obstructions',
        text: 'Orange traffic cones, paint buckets filled with cement, padlocked chains, traffic cones, and even plastic chairs. That was the inventory Coyoacán borough crews removed from Historic Center streets during an operation on the weekend of March 1-2. In total, over one ton of objects that illegal parking attendants (franeleros) used to "reserve" public street parking spots and charge drivers 20-50 pesos to use them. The operation, documented by La Prensa (OEM), included Urban Services, Public Safety, and the borough\'s Government Office personnel. Objects were transported to a municipal depot. Photo: La Prensa / OEM.'
      },
      {
        title: 'The franelero business: an entrenched informal economy',
        text: 'The franelero phenomenon—people who claim stretches of public road to charge for unauthorized parking—is one of Mexico City\'s most deeply rooted urban problems. In Coyoacán, where visitor flow to the Historic Center, markets, and plazas creates high parking demand, franeleros operate with particular aggressiveness. Residents of Del Carmen, La Concepción, and Villa Coyoacán neighborhoods have reported for years that franeleros not only charge for parking but scratch or damage vehicles of those who refuse to pay. "It\'s extortion in broad daylight," a Higuera Street merchant told La Prensa. The borough announced the operation will be repeated periodically, though residents remain skeptical: "They remove them one day and the next they\'re back with new buckets," noted a Tres Cruces Street resident.'
      },
      {
        title: 'Coyoacán\'s mobility challenge',
        text: 'The franelero problem is directly linked to the lack of parking infrastructure in Coyoacán\'s Historic Center, an area with narrow streets, colonial layout, and visitor flow far exceeding road capacity. The borough has repeatedly announced plans for public parking lots and parking meters, but none have materialized. Meanwhile, franeleros fill the institutional void. The weekend operation is a step forward, but urban mobility experts agree that without a structural solution—more public transit, safe bike lanes, and regulated parking—the problem will keep reproducing. Source: La Prensa (OEM).'
      },
      {
        title: 'Editor\'s note',
        text: 'If you visit Coyoacán, our recommendation is to arrive by public transit (Metro Coyoacán or Viveros) or bicycle. You\'ll avoid parking stress and franeleros, and enjoy the neighborhood more on foot. And if you\'re visiting from out of town, stay in the heart of Coyoacán with SúperAnfitrión: everything is walking distance. Book at superanfitrion.com.mx.'
      }
    ]),
    menuItemsEn: JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    hoursWeekEn: 'N/A',
    hoursSundayEn: 'N/A'
  }
];

const insertSQL = `INSERT INTO articles (id, slug, dateISO, weatherTemp, weatherConditionEs, weatherConditionEn, locationAddress, locationLat, locationLng, locationMapsUrl, heroImage, headlineEs, summaryEs, categoryEs, dateEs, contentEs, menuItemsEs, hoursWeekEs, hoursSundayEs, headlineEn, summaryEn, categoryEn, dateEn, contentEn, menuItemsEn, hoursWeekEn, hoursSundayEn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

for (const a of articles) {
  await conn.execute(insertSQL, [
    a.id, a.slug, a.dateISO, a.weatherTemp, a.weatherConditionEs, a.weatherConditionEn,
    a.locationAddress, a.locationLat, a.locationLng, a.locationMapsUrl, a.heroImage,
    a.headlineEs, a.summaryEs, a.categoryEs, a.dateEs, a.contentEs,
    a.menuItemsEs, a.hoursWeekEs, a.hoursSundayEs,
    a.headlineEn, a.summaryEn, a.categoryEn, a.dateEn, a.contentEn,
    a.menuItemsEn || JSON.stringify([{"item":"N/A","desc":"N/A","price":"N/A"}]),
    a.hoursWeekEn || 'N/A', a.hoursSundayEn || 'N/A'
  ]);
  console.log(`✅ Inserted: ${a.id} - ${a.headlineEs.substring(0, 60)}...`);
}

console.log(`\n🎉 Done! ${articles.length} articles inserted.`);
await conn.end();
