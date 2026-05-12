export interface ArticleContent {
  title: string;
  text: string;
}

export interface MenuItem {
  item: string;
  desc: string;
  price: string;
}

export interface ArticleTranslation {
  headline: string;
  summary: string;
  category: string;
  date: string; // Formato legible
  weather: string;
  menuTitle: string;
  locationTitle: string;
  hoursTitle: string;
  weekHours: string;
  sundayHours: string;
  getDirections: string;
  openMaps: string;
  share: string;
  subscribeTitle: string;
  subscribeText: string;
  subscribePlaceholder: string;
  subscribeButton: string;
  previousEditions: string;
  recommended: string;
  scanCode: string;
  home: string;
  reservations: string;
  content: ArticleContent[];
  menuItems: MenuItem[];
  hours: {
    week: string;
    sunday: string;
  };
}

export interface ArticleData {
  id: string; // Slug único para la URL
  dateISO: string; // Fecha ISO para ordenar (YYYY-MM-DD)
  weatherTemp: number;
  location: {
    address: string;
    lat: number;
    lng: number;
    mapsUrl: string;
  };
  images: {
    hero: string; // Ruta de la imagen principal
  };
  translations: {
    es: ArticleTranslation;
    en: ArticleTranslation;
  };
}

export const articles: ArticleData[] = [
  {
    id: "mercado-coyoacan",
    dateISO: "2026-01-28",
    weatherTemp: 26,
    location: {
      address: "Ignacio Allende s/n, Del Carmen, Coyoacán, CDMX",
      lat: 19.3519,
      lng: -99.1623,
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mercado+de+Coyoacan"
    },
    images: {
      hero: "/images/mercado-coyoacan.jpg"
    },
    translations: {
      es: {
        headline: "Mercado de Coyoacán: Colores, Sabores y las Tostadas Más Famosas",
        summary: "Un viaje sensorial por el corazón del barrio: desde las legendarias tostadas hasta los puestos de artesanías que cuentan historias de tradición.",
        category: "Cultura y Sabor",
        date: "28 de enero de 2026",
        weather: "Soleado",
        menuTitle: "Imperdibles del Mercado",
        locationTitle: "Ubicación",
        hoursTitle: "Horarios",
        weekHours: "Lun-Dom",
        sundayHours: "Dom",
        getDirections: "Cómo llegar",
        openMaps: "Abrir en Maps",
        share: "Compartir",
        subscribeTitle: "¡Suscríbete al Diario!",
        subscribeText: "Recibe las mejores recomendaciones de Coyoacán directamente en tu correo cada semana.",
        subscribePlaceholder: "Tu correo electrónico",
        subscribeButton: "Suscribirse",
        previousEditions: "Ediciones Anteriores",
        recommended: "Clásico",
        scanCode: "Escanea para llevar",
        home: "Inicio",
        reservations: "Reservaciones",
        content: [
          {
            title: "El Corazón del Barrio",
            text: "Inaugurado en 1956, el Mercado de Coyoacán no es solo un lugar de abasto, es un ícono cultural. Sus pasillos estrechos rebosan de piñatas coloridas, disfraces, frutas exóticas y el inconfundible aroma de la cocina mexicana tradicional."
          },
          {
            title: "Paraíso Gastronómico",
            text: "Aquí la regla es simple: ven con hambre. Las famosas Tostadas de Coyoacán son la joya de la corona, montañas de sabor sobre una tortilla crujiente. Pero no te pierdas los jugos frescos, las quesadillas de comal y los postres tradicionales que endulzan la visita."
          }
        ],
        menuItems: [
          { item: "Tostada de Pulpo", desc: "Fresca, abundante y con salsa especial.", price: "$60" },
          { item: "Tostada de Cochinita", desc: "La receta tradicional yucateca.", price: "$50" },
          { item: "Agua de Frutas (1L)", desc: "Combinaciones exóticas y refrescantes.", price: "$45" },
          { item: "Esquites con Tuétano", desc: "Un antojito callejero elevado.", price: "$55" }
        ],
        hours: {
          week: "07:00 - 18:00",
          sunday: "07:00 - 18:00"
        }
      },
      en: {
        headline: "Coyoacán Market: Colors, Flavors, and the Most Famous Tostadas",
        summary: "A sensory journey through the heart of the neighborhood: from legendary tostadas to craft stalls that tell stories of tradition.",
        category: "Culture & Taste",
        date: "January 28, 2026",
        weather: "Sunny",
        menuTitle: "Market Must-Haves",
        locationTitle: "Location",
        hoursTitle: "Opening Hours",
        weekHours: "Mon-Sun",
        sundayHours: "Sun",
        getDirections: "Get Directions",
        openMaps: "Open in Maps",
        share: "Share",
        subscribeTitle: "Subscribe to the Daily!",
        subscribeText: "Get the best Coyoacán recommendations directly to your inbox every week.",
        subscribePlaceholder: "Your email address",
        subscribeButton: "Subscribe",
        previousEditions: "Previous Editions",
        recommended: "Classic",
        scanCode: "Scan to take away",
        home: "Home",
        reservations: "Reservations",
        content: [
          {
            title: "The Heart of the Neighborhood",
            text: "Inaugurated in 1956, the Coyoacán Market is not just a place for supplies, it is a cultural icon. Its narrow aisles overflow with colorful piñatas, costumes, exotic fruits, and the unmistakable aroma of traditional Mexican cuisine."
          },
          {
            title: "Gastronomic Paradise",
            text: "Here the rule is simple: come hungry. The famous Coyoacán Tostadas are the jewel in the crown, mountains of flavor on a crunchy tortilla. But don't miss the fresh juices, griddle quesadillas, and traditional desserts that sweeten the visit."
          }
        ],
        menuItems: [
          { item: "Octopus Tostada", desc: "Fresh, abundant, and with special sauce.", price: "$60" },
          { item: "Cochinita Tostada", desc: "Traditional Yucatecan recipe.", price: "$50" },
          { item: "Fruit Water (1L)", desc: "Exotic and refreshing combinations.", price: "$45" },
          { item: "Esquites with Bone Marrow", desc: "Elevated street food snack.", price: "$55" }
        ],
        hours: {
          week: "07:00 - 18:00",
          sunday: "07:00 - 18:00"
        }
      }
    }
  },
  {
    id: "cafe-avellaneda",
    dateISO: "2026-01-27",
    weatherTemp: 27,
    location: {
      address: "Higuera 40, Coyoacán, CDMX",
      lat: 19.3495,
      lng: -99.1625,
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+Avellaneda+Coyoacan"
    },
    images: {
      hero: "/images/cafe-avellaneda-real.jpg"
    },
    translations: {
      es: {
        headline: "Café Avellaneda: Un rincón auténtico para café y antojos en Coyoacán",
        summary: "Descubre Café Avellaneda, un local emblemático en Coyoacán donde el café de especialidad y la atmósfera bohemia se combinan para una experiencia auténtica y accesible.",
        category: "Gastronomía",
        date: "27 de enero de 2026",
        weather: "Lluvioso",
        menuTitle: "Menú Destacado",
        locationTitle: "Ubicación",
        hoursTitle: "Horarios",
        weekHours: "Lun-Sáb",
        sundayHours: "Dom",
        getDirections: "Cómo llegar",
        openMaps: "Abrir en Maps",
        share: "Compartir",
        subscribeTitle: "¡Suscríbete al Diario!",
        subscribeText: "Recibe las mejores recomendaciones de Coyoacán directamente en tu correo cada semana.",
        subscribePlaceholder: "Tu correo electrónico",
        subscribeButton: "Suscribirse",
        previousEditions: "Ediciones Anteriores",
        recommended: "Recomendado",
        scanCode: "Escanea para llevar",
        home: "Inicio",
        reservations: "Reservaciones",
        content: [
          {
            title: "Ambiente",
            text: "Desde que cruzas su puerta, te envuelve un ambiente íntimo y relajado que invita a sentarse, leer o platicar. Sus paredes decoradas con arte local y fotografías en blanco y negro crean una atmósfera bohemia y cálida."
          },
          {
            title: "La Experiencia",
            text: "Café Avellaneda es más que un lugar para tomar café; es una experiencia que conecta al visitante con la cultura cafetalera mexicana y el espíritu de Coyoacán, lejos de las aglomeraciones."
          }
        ],
        menuItems: [
          { item: "Café filtrado V60", desc: "Granos de Oaxaca, notas cítricas.", price: "$40 - $70" },
          { item: "Espresso Doble", desc: "Intenso y perfectamente equilibrado.", price: "$45" },
          { item: "Panqué de Naranja", desc: "Con chocolate, dulce y fresco.", price: "$45" },
          { item: "Sándwich Panela", desc: "Con aguacate y jitomate.", price: "$60" }
        ],
        hours: {
          week: "08:00 - 18:00",
          sunday: "09:00 - 15:00"
        }
      },
      en: {
        headline: "Café Avellaneda: An Authentic Corner for Coffee and Cravings in Coyoacán",
        summary: "Discover Café Avellaneda, an emblematic spot in Coyoacán where specialty coffee and a bohemian atmosphere combine for an authentic and accessible experience.",
        category: "Gastronomy",
        date: "January 27, 2026",
        weather: "Rainy",
        menuTitle: "Menu Highlights",
        locationTitle: "Location",
        hoursTitle: "Opening Hours",
        weekHours: "Mon-Sat",
        sundayHours: "Sun",
        getDirections: "Get Directions",
        openMaps: "Open in Maps",
        share: "Share",
        subscribeTitle: "Subscribe to the Daily!",
        subscribeText: "Get the best Coyoacán recommendations directly to your inbox every week.",
        subscribePlaceholder: "Your email address",
        subscribeButton: "Subscribe",
        previousEditions: "Previous Editions",
        recommended: "Recommended",
        scanCode: "Scan to take away",
        home: "Home",
        reservations: "Reservations",
        content: [
          {
            title: "Atmosphere",
            text: "From the moment you walk through the door, you are enveloped in an intimate and relaxed atmosphere that invites you to sit, read, or chat. Its walls decorated with local art and black and white photographs create a warm, bohemian vibe."
          },
          {
            title: "The Experience",
            text: "Café Avellaneda is more than just a place to drink coffee; it is an experience that connects the visitor with Mexican coffee culture and the spirit of Coyoacán, away from the crowds."
          }
        ],
        menuItems: [
          { item: "V60 Pour-over", desc: "Oaxacan beans, citrus notes.", price: "$40 - $70" },
          { item: "Double Espresso", desc: "Intense and perfectly balanced.", price: "$45" },
          { item: "Orange Pound Cake", desc: "With chocolate, sweet and fresh.", price: "$45" },
          { item: "Panela Cheese Sandwich", desc: "With avocado and tomato.", price: "$60" }
        ],
        hours: {
          week: "08:00 - 18:00",
          sunday: "09:00 - 15:00"
        }
      }
    }
  },
  // ===== SEMANA 4-10 MAYO 2026 =====
  {
    id: "bts-zocalo-sheinbaum-mayo-2026",
    dateISO: "2026-05-06",
    weatherTemp: 31,
    location: {
      address: "Plaza de la Constitución (Zócalo), Cuauhtémoc, CDMX",
      lat: 19.4326,
      lng: -99.1332,
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Zocalo+Ciudad+de+Mexico"
    },
    images: {
      hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/noticia-bts-zocalo-multitud_3295e856.jpg"
    },
    translations: {
      es: {
        headline: "BTS enciende el Zócalo: Encuentro con Sheinbaum desata euforia ARMY",
        summary: "La banda surcoreana BTS visitó Palacio Nacional y salió al balcón presidencial ante 50,000 fans congregados en la Plaza de la Constitución.",
        category: "CULTURA",
        date: "Miércoles 6 de mayo de 2026",
        weather: "Caluroso",
        menuTitle: "Conciertos en CDMX",
        locationTitle: "Ubicación",
        hoursTitle: "Fechas",
        weekHours: "7, 9 y 10 de mayo",
        sundayHours: "Estadio GNP Seguros",
        getDirections: "Cómo llegar al Zócalo",
        openMaps: "Abrir en Maps",
        share: "Compartir",
        subscribeTitle: "¡Suscríbete al Diario!",
        subscribeText: "Recibe las noticias más importantes de la CDMX y Coyoacán directamente en tu correo.",
        subscribePlaceholder: "Tu correo electrónico",
        subscribeButton: "Suscribirse",
        previousEditions: "Ediciones Anteriores",
        recommended: "Noticia de la semana",
        scanCode: "Escanea para llevar",
        home: "Inicio",
        reservations: "Reservaciones",
        content: [
          {
            title: "El Zócalo se tiñó de morado",
            text: "La Ciudad de México vivió este miércoles 6 de mayo un momento histórico: los siete integrantes de BTS fueron recibidos en Palacio Nacional por la presidenta Claudia Sheinbaum Pardo. Tras la reunión oficial, la banda apareció en el balcón del histórico recinto, desatando la euforia de aproximadamente 50,000 seguidores que desde tempranas horas habían tomado la Plaza de la Constitución."
          },
          {
            title: "El ARMY mexicano, el más ruidoso del mundo",
            text: "La plancha del Zócalo se transformó en un mar de luces moradas y pancartas bilingues. Los fans llegaron desde estados como Jalisco, Nuevo León y Yucatán, muchos de ellos acampando desde la noche anterior. La presidenta Sheinbaum había advertido que no había confirmación de concierto gratuito, pero la aparición en el balcón fue, por sí misma, un regalo inesperado."
          },
          {
            title: "Tres noches agotadas en el GNP Seguros",
            text: "La visita a Palacio fue el preludio de tres conciertos con entradas agotadas en el Estadio GNP Seguros los días 7, 9 y 10 de mayo, consolidando a México como uno de los mercados de K-pop más importantes del mundo. Según cifras de la promotora, los tres shows sumaron más de 180,000 asistentes."
          }
        ],
        menuItems: [
          { item: "Concierto 7 mayo", desc: "Estadio GNP Seguros — Sold Out", price: "Agotado" },
          { item: "Concierto 9 mayo", desc: "Estadio GNP Seguros — Sold Out", price: "Agotado" },
          { item: "Concierto 10 mayo", desc: "Estadio GNP Seguros — Sold Out", price: "Agotado" },
          { item: "Aparición balcón", desc: "Palacio Nacional — Gratuita", price: "Libre" }
        ],
        hours: {
          week: "Conciertos: 20:00 hrs",
          sunday: "Puertas: 17:00 hrs"
        }
      },
      en: {
        headline: "BTS Lights Up the Zócalo: Meeting with Sheinbaum Ignites ARMY Euphoria",
        summary: "The South Korean band BTS visited the National Palace and appeared on the presidential balcony before 50,000 fans gathered at the Plaza de la Constitución.",
        category: "CULTURE",
        date: "Wednesday, May 6, 2026",
        weather: "Hot",
        menuTitle: "Concerts in CDMX",
        locationTitle: "Location",
        hoursTitle: "Dates",
        weekHours: "May 7, 9 & 10",
        sundayHours: "GNP Seguros Stadium",
        getDirections: "How to get to the Zócalo",
        openMaps: "Open in Maps",
        share: "Share",
        subscribeTitle: "Subscribe to the Daily!",
        subscribeText: "Get the most important news from CDMX and Coyoacán directly to your inbox.",
        subscribePlaceholder: "Your email address",
        subscribeButton: "Subscribe",
        previousEditions: "Previous Editions",
        recommended: "Story of the week",
        scanCode: "Scan to take away",
        home: "Home",
        reservations: "Reservations",
        content: [
          {
            title: "The Zócalo Turned Purple",
            text: "Mexico City experienced a historic moment this Wednesday, May 6: all seven members of BTS were received at the National Palace by President Claudia Sheinbaum Pardo. After the official meeting, the band appeared on the balcony of the historic building, unleashing the euphoria of approximately 50,000 fans who had gathered at the Plaza de la Constitución since early morning."
          },
          {
            title: "The Mexican ARMY, the Loudest in the World",
            text: "The Zócalo plaza transformed into a sea of purple lights and bilingual banners. Fans arrived from states like Jalisco, Nuevo León, and Yucatán, many of them camping since the night before. President Sheinbaum had warned that there was no confirmation of a free concert, but the balcony appearance was, in itself, an unexpected gift."
          },
          {
            title: "Three Sold-Out Nights at GNP Seguros",
            text: "The Palace visit was the prelude to three sold-out concerts at Estadio GNP Seguros on May 7, 9, and 10, cementing Mexico as one of the most important K-pop markets in the world. According to the promoter, the three shows drew more than 180,000 attendees."
          }
        ],
        menuItems: [
          { item: "May 7 Concert", desc: "GNP Seguros Stadium — Sold Out", price: "Sold Out" },
          { item: "May 9 Concert", desc: "GNP Seguros Stadium — Sold Out", price: "Sold Out" },
          { item: "May 10 Concert", desc: "GNP Seguros Stadium — Sold Out", price: "Sold Out" },
          { item: "Balcony Appearance", desc: "National Palace — Free", price: "Free" }
        ],
        hours: {
          week: "Concerts: 8:00 PM",
          sunday: "Doors: 5:00 PM"
        }
      }
    }
  },
  {
    id: "alerta-amarilla-calor-cdmx-mayo-2026",
    dateISO: "2026-05-07",
    weatherTemp: 32,
    location: {
      address: "Ciudad de México — Todas las alcaldías",
      lat: 19.4326,
      lng: -99.1332,
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ciudad+de+Mexico"
    },
    images: {
      hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/noticia-calor-cdmx_b6d492b1.jpg"
    },
    translations: {
      es: {
        headline: "CDMX bajo Alerta Amarilla por ola de calor récord en mayo",
        summary: "Temperaturas de hasta 32°C azotan la capital del 5 al 8 de mayo, activando protocolos de emergencia y Fase 1 de contingencia ambiental por ozono.",
        category: "CLIMA",
        date: "Jueves 7 de mayo de 2026",
        weather: "Calor extremo 32°C",
        menuTitle: "Recomendaciones de Protección Civil",
        locationTitle: "Alcaldías afectadas",
        hoursTitle: "Horario crítico",
        weekHours: "13:00 — 18:00 hrs",
        sundayHours: "Vigente hasta 8 mayo",
        getDirections: "Protección Civil CDMX",
        openMaps: "Ver mapa de calor",
        share: "Compartir alerta",
        subscribeTitle: "¡Suscríbete al Diario!",
        subscribeText: "Recibe alertas y noticias de la CDMX directamente en tu correo.",
        subscribePlaceholder: "Tu correo electrónico",
        subscribeButton: "Suscribirse",
        previousEditions: "Ediciones Anteriores",
        recommended: "Alerta activa",
        scanCode: "Escanea para llevar",
        home: "Inicio",
        reservations: "Reservaciones",
        content: [
          {
            title: "Alerta Amarilla activada por la SGIRPC",
            text: "La Secretaría de Gestión Integral de Riesgos y Protección Civil (SGIRPC) activó Alerta Amarilla por ola de calor para la Ciudad de México a partir del 5 de mayo de 2026. Las temperaturas máximas proyectadas oscilan entre 30 y 32 grados Celsius, especialmente entre las 13:00 y las 18:00 horas, afectando a alcaldías como Coyoacán, Álvaro Obregón, Benito Juárez, Cuauhtémoc, Iztapalapa y seis más."
          },
          {
            title: "Fase 1 de contingencia ambiental por ozono",
            text: "Además del calor extremo, las autoridades activaron Fase 1 de contingencia ambiental por ozono. Las condiciones atmosféricas adversas, combinadas con las altas temperaturas, favorecen la acumulación de contaminantes. Se aplica Hoy No Circula reforzado y se recomienda evitar actividades físicas intensas al aire libre, especialmente para personas con asma o enfermedades respiratorias."
          },
          {
            title: "Recomendaciones para la población",
            text: "La SGIRPC exhortó a la ciudadanía a tomar agua constantemente aunque no sienta sed, usar ropa ligera de colores claros, aplicar bloqueador solar antes de salir y permanecer en espacios con sombra o ventilados durante las horas críticas. Se alertó especialmente sobre no dejar niños ni mascotas dentro de vehículos, y reconocer señales de golpe de calor: mareo, náuseas y piel caliente y seca."
          }
        ],
        menuItems: [
          { item: "Hidratación", desc: "Toma agua aunque no tengas sed", price: "Vital" },
          { item: "Bloqueador solar", desc: "Aplica antes de salir", price: "Obligatorio" },
          { item: "Hoy No Circula", desc: "Reforzado por contingencia", price: "Activo" },
          { item: "Emergencias", desc: "Llama al 911 ante golpe de calor", price: "911" }
        ],
        hours: {
          week: "Alerta: 13:00 — 18:00 hrs",
          sunday: "Vigente: 5 al 8 mayo"
        }
      },
      en: {
        headline: "CDMX Under Yellow Alert for Record May Heatwave",
        summary: "Temperatures up to 32°C hit the capital from May 5-8, activating emergency protocols and Phase 1 ozone environmental contingency.",
        category: "WEATHER",
        date: "Thursday, May 7, 2026",
        weather: "Extreme heat 32°C",
        menuTitle: "Civil Protection Recommendations",
        locationTitle: "Affected Districts",
        hoursTitle: "Critical Hours",
        weekHours: "1:00 PM — 6:00 PM",
        sundayHours: "Until May 8",
        getDirections: "Civil Protection CDMX",
        openMaps: "View heat map",
        share: "Share alert",
        subscribeTitle: "Subscribe to the Daily!",
        subscribeText: "Get CDMX alerts and news directly to your inbox.",
        subscribePlaceholder: "Your email address",
        subscribeButton: "Subscribe",
        previousEditions: "Previous Editions",
        recommended: "Active alert",
        scanCode: "Scan to take away",
        home: "Home",
        reservations: "Reservations",
        content: [
          {
            title: "Yellow Alert Activated by SGIRPC",
            text: "The Secretariat for Integral Risk Management and Civil Protection (SGIRPC) activated a Yellow Alert for a heatwave in Mexico City starting May 5, 2026. Maximum temperatures are projected between 30 and 32 degrees Celsius, especially between 1:00 PM and 6:00 PM, affecting districts including Coyoacán, Álvaro Obregón, Benito Juárez, Cuauhtémoc, Iztapalapa, and six others."
          },
          {
            title: "Phase 1 Ozone Environmental Contingency",
            text: "In addition to extreme heat, authorities activated Phase 1 ozone environmental contingency. Adverse atmospheric conditions combined with high temperatures favor the accumulation of pollutants. Reinforced No-Drive Day restrictions apply, and intense outdoor physical activities are discouraged, especially for people with asthma or respiratory conditions."
          },
          {
            title: "Recommendations for the Population",
            text: "The SGIRPC urged citizens to drink water constantly even if not thirsty, wear light-colored clothing, apply sunscreen before going out, and stay in shaded or ventilated spaces during critical hours. Special warnings were issued about not leaving children or pets inside vehicles, and to recognize signs of heat stroke: dizziness, nausea, and hot dry skin."
          }
        ],
        menuItems: [
          { item: "Hydration", desc: "Drink water even if not thirsty", price: "Vital" },
          { item: "Sunscreen", desc: "Apply before going out", price: "Mandatory" },
          { item: "No-Drive Day", desc: "Reinforced due to contingency", price: "Active" },
          { item: "Emergencies", desc: "Call 911 for heat stroke", price: "911" }
        ],
        hours: {
          week: "Alert: 1:00 PM — 6:00 PM",
          sunday: "Active: May 5-8"
        }
      }
    }
  },
  {
    id: "azteca-mundial-2026-preparativos",
    dateISO: "2026-05-06",
    weatherTemp: 29,
    location: {
      address: "Calzada de Tlalpan 3465, Santa Úrsula Xitla, Coyoacán, CDMX",
      lat: 19.3029,
      lng: -99.1505,
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Estadio+Azteca+Mexico+City"
    },
    images: {
      hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/noticia-azteca-mundial_78772db7.jpg"
    },
    translations: {
      es: {
        headline: "Estadio Azteca se alista: México será el primer país en tres Mundiales",
        summary: "Con el partido inaugural el 11 de junio, el Azteca — ubicado en la demarcación de Coyoacán — se prepara para escribir historia en el fútbol mundial.",
        category: "DEPORTES",
        date: "Miércoles 6 de mayo de 2026",
        weather: "Soleado",
        menuTitle: "Partidos en el Azteca",
        locationTitle: "Ubicación",
        hoursTitle: "Partido inaugural",
        weekHours: "11 de junio de 2026",
        sundayHours: "20:00 hrs (hora CDMX)",
        getDirections: "Cómo llegar al Azteca",
        openMaps: "Abrir en Maps",
        share: "Compartir",
        subscribeTitle: "¡Suscríbete al Diario!",
        subscribeText: "Recibe las noticias del Mundial 2026 desde Coyoacán.",
        subscribePlaceholder: "Tu correo electrónico",
        subscribeButton: "Suscribirse",
        previousEditions: "Ediciones Anteriores",
        recommended: "Evento histórico",
        scanCode: "Escanea para llevar",
        home: "Inicio",
        reservations: "Reservaciones",
        content: [
          {
            title: "El Coloso de Santa Úrsula, listo para la historia",
            text: "El Estadio Azteca, ubicado en la demarcación de Coyoacán, se encuentra en la recta final de sus trabajos de renovación para recibir el Mundial de la FIFA 2026. El icónico recinto será el anfitrión del partido inaugural el 11 de junio, convirtiendo a México en el primer país de la historia en organizar tres Copas del Mundo: 1970, 1986 y 2026."
          },
          {
            title: "Renovación y modernización",
            text: "Las obras de remodelación del Azteca avanzan a buen ritmo. La FIFA exigió mejoras en la infraestructura, los vestidores, los accesos para personas con discapacidad y los sistemas de transmisión. El estadio, que ahora lleva el nombre de Estadio Banorte por acuerdo de patrocinio, mantendrá su capacidad para más de 87,000 espectadores."
          },
          {
            title: "Coyoacán, epicentro del Mundial",
            text: "La proximidad del Azteca a la alcaldía Coyoacán convierte al barrio en un punto estratégico para los aficionados internacionales. Los hospedajes de la zona ya registran reservaciones de visitantes de Europa, Asia y América del Sur para las fechas del torneo. El Jardín Centenario y la Plaza Hidalgo se perfilan como zonas de convivencia y fan zones no oficiales."
          }
        ],
        menuItems: [
          { item: "Partido inaugural", desc: "México vs. Sudáfrica — 11 jun", price: "11 jun" },
          { item: "Fase de grupos", desc: "Varios partidos en el Azteca", price: "Jun 2026" },
          { item: "Capacidad", desc: "87,000 espectadores", price: "Sold Out" },
          { item: "Hospedaje Coyoacán", desc: "A 15 min del Azteca en metro", price: "Reservar" }
        ],
        hours: {
          week: "Partidos: 17:00 / 20:00 hrs",
          sunday: "Puertas: 3 hrs antes"
        }
      },
      en: {
        headline: "Azteca Stadium Ready: Mexico to Become First Three-Time World Cup Host",
        summary: "With the opening match on June 11, the Azteca — located in the Coyoacán district — prepares to write history in world football.",
        category: "SPORTS",
        date: "Wednesday, May 6, 2026",
        weather: "Sunny",
        menuTitle: "Matches at the Azteca",
        locationTitle: "Location",
        hoursTitle: "Opening Match",
        weekHours: "June 11, 2026",
        sundayHours: "8:00 PM (CDMX time)",
        getDirections: "How to get to the Azteca",
        openMaps: "Open in Maps",
        share: "Share",
        subscribeTitle: "Subscribe to the Daily!",
        subscribeText: "Get World Cup 2026 news from Coyoacán.",
        subscribePlaceholder: "Your email address",
        subscribeButton: "Subscribe",
        previousEditions: "Previous Editions",
        recommended: "Historic event",
        scanCode: "Scan to take away",
        home: "Home",
        reservations: "Reservations",
        content: [
          {
            title: "The Colossus of Santa Úrsula, Ready for History",
            text: "Estadio Azteca, located in the Coyoacán district, is in the final stretch of its renovation works to host the FIFA World Cup 2026. The iconic venue will host the opening match on June 11, making Mexico the first country in history to host three World Cups: 1970, 1986, and 2026."
          },
          {
            title: "Renovation and Modernization",
            text: "The Azteca remodeling works are progressing well. FIFA required improvements to infrastructure, locker rooms, accessibility for people with disabilities, and broadcasting systems. The stadium, now named Estadio Banorte under a sponsorship agreement, will maintain its capacity for more than 87,000 spectators."
          },
          {
            title: "Coyoacán, the World Cup Epicenter",
            text: "The Azteca's proximity to the Coyoacán district makes the neighborhood a strategic point for international fans. Local accommodations are already recording reservations from visitors from Europe, Asia, and South America for the tournament dates. Jardín Centenario and Plaza Hidalgo are shaping up as unofficial fan zones and gathering areas."
          }
        ],
        menuItems: [
          { item: "Opening Match", desc: "Mexico vs. South Africa — Jun 11", price: "Jun 11" },
          { item: "Group Stage", desc: "Several matches at the Azteca", price: "Jun 2026" },
          { item: "Capacity", desc: "87,000 spectators", price: "Sold Out" },
          { item: "Coyoacán Stay", desc: "15 min from Azteca by metro", price: "Book Now" }
        ],
        hours: {
          week: "Matches: 5:00 PM / 8:00 PM",
          sunday: "Gates: 3 hrs before"
        }
      }
    }
  },
  {
    id: "dia-de-las-madres-cdmx-2026",
    dateISO: "2026-05-10",
    weatherTemp: 28,
    location: {
      address: "Jardín Centenario, Coyoacán, CDMX",
      lat: 19.3501,
      lng: -99.1621,
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jardin+Centenario+Coyoacan"
    },
    images: {
      hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/noticia-dia-madres_78e8c7b7.jpg"
    },
    translations: {
      es: {
        headline: "Día de las Madres: Coyoacán y la CDMX se llenan de flores y música",
        summary: "El 10 de mayo, alcaldías de toda la capital ofrecen conciertos gratuitos, ferias y actividades familiares para celebrar a las mamás en su día.",
        category: "LOCAL",
        date: "Domingo 10 de mayo de 2026",
        weather: "Soleado",
        menuTitle: "Eventos en la CDMX",
        locationTitle: "Jardín Centenario, Coyoacán",
        hoursTitle: "Horarios",
        weekHours: "10:00 — 22:00 hrs",
        sundayHours: "Domingo 10 de mayo",
        getDirections: "Cómo llegar al Jardín Centenario",
        openMaps: "Abrir en Maps",
        share: "Compartir",
        subscribeTitle: "¡Suscríbete al Diario!",
        subscribeText: "Recibe los mejores planes de Coyoacán en tu correo cada semana.",
        subscribePlaceholder: "Tu correo electrónico",
        subscribeButton: "Suscribirse",
        previousEditions: "Ediciones Anteriores",
        recommended: "Especial 10 de mayo",
        scanCode: "Escanea para llevar",
        home: "Inicio",
        reservations: "Reservaciones",
        content: [
          {
            title: "La ciudad entera celebra a mamá",
            text: "El domingo 10 de mayo de 2026, la Ciudad de México vive una de sus celebraciones más emotivas: el Día de las Madres. Desde el Jardín Centenario de Coyoacán hasta la explanada de Xochimilco, pasando por las plazas de Gustavo A. Madero e Iztapalapa, las alcaldías capitalinas organizaron una programación gratuita de conciertos, bailes y actividades familiares para honrar a las mamás mexicanas."
          },
          {
            title: "Conciertos gratuitos en toda la ciudad",
            text: "En Gustavo A. Madero, Lucero ofreció un concierto gratuito el 8 de mayo. Venustiano Carranza recibió a Yuri el 9 de mayo. Iztapalapa presentó a Los Socios del Ritmo, Los Ákis y Merenglass. Xochimilco organizó la Big Band Swing & Soul y la Expo Venta Día de las Madres en el Jardín del Arte. La Magdalena Contreras llevó mariachis al Parque El Reloj y San Bernabé."
          },
          {
            title: "Coyoacán, el destino favorito para festejar",
            text: "El Jardín Centenario y la Plaza Hidalgo de Coyoacán se convirtieron en el escenario favorito para familias que llegaron de toda la ciudad a celebrar con un desayuno en los cafés del barrio, flores del mercado y la música de los mariachis que recorren las calles empedradas. Los restaurantes de la zona reportaron ocupación del 100% desde las 10 de la mañana."
          }
        ],
        menuItems: [
          { item: "Concierto Lucero", desc: "Gustavo A. Madero — 8 mayo", price: "Gratis" },
          { item: "Concierto Yuri", desc: "Venustiano Carranza — 9 mayo", price: "Gratis" },
          { item: "Big Band Swing", desc: "Xochimilco — 12 mayo", price: "Gratis" },
          { item: "Mariachis Coyoacán", desc: "Jardín Centenario todo el día", price: "Libre" }
        ],
        hours: {
          week: "Eventos: 10:00 — 22:00 hrs",
          sunday: "Domingo 10 de mayo"
        }
      },
      en: {
        headline: "Mother's Day: Coyoacán and CDMX Fill with Flowers and Music",
        summary: "On May 10, districts across the capital offer free concerts, fairs, and family activities to celebrate Mother's Day.",
        category: "LOCAL",
        date: "Sunday, May 10, 2026",
        weather: "Sunny",
        menuTitle: "Events in CDMX",
        locationTitle: "Jardín Centenario, Coyoacán",
        hoursTitle: "Hours",
        weekHours: "10:00 AM — 10:00 PM",
        sundayHours: "Sunday, May 10",
        getDirections: "How to get to Jardín Centenario",
        openMaps: "Open in Maps",
        share: "Share",
        subscribeTitle: "Subscribe to the Daily!",
        subscribeText: "Get the best Coyoacán plans in your inbox every week.",
        subscribePlaceholder: "Your email address",
        subscribeButton: "Subscribe",
        previousEditions: "Previous Editions",
        recommended: "May 10 Special",
        scanCode: "Scan to take away",
        home: "Home",
        reservations: "Reservations",
        content: [
          {
            title: "The Whole City Celebrates Mom",
            text: "On Sunday, May 10, 2026, Mexico City experiences one of its most emotional celebrations: Mother's Day. From Coyoacán's Jardín Centenario to Xochimilco's plaza, through the squares of Gustavo A. Madero and Iztapalapa, the capital's districts organized free concerts, dances, and family activities to honor Mexican mothers."
          },
          {
            title: "Free Concerts Throughout the City",
            text: "In Gustavo A. Madero, Lucero offered a free concert on May 8. Venustiano Carranza welcomed Yuri on May 9. Iztapalapa featured Los Socios del Ritmo, Los Ákis, and Merenglass. Xochimilco organized the Big Band Swing & Soul and the Mother's Day Expo Sale at Jardín del Arte. La Magdalena Contreras brought mariachis to Parque El Reloj and San Bernabé."
          },
          {
            title: "Coyoacán, the Favorite Destination to Celebrate",
            text: "Coyoacán's Jardín Centenario and Plaza Hidalgo became the favorite stage for families who came from across the city to celebrate with breakfast at neighborhood cafes, flowers from the market, and the music of mariachis roaming the cobblestone streets. Restaurants in the area reported 100% occupancy from 10 AM."
          }
        ],
        menuItems: [
          { item: "Lucero Concert", desc: "Gustavo A. Madero — May 8", price: "Free" },
          { item: "Yuri Concert", desc: "Venustiano Carranza — May 9", price: "Free" },
          { item: "Big Band Swing", desc: "Xochimilco — May 12", price: "Free" },
          { item: "Mariachis Coyoacán", desc: "Jardín Centenario all day", price: "Free" }
        ],
        hours: {
          week: "Events: 10:00 AM — 10:00 PM",
          sunday: "Sunday, May 10"
        }
      }
    }
  }
];
export const getLatestArticle = () => {
  return articles.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())[0];
};

export const getArticleById = (id: string) => {
  return articles.find(article => article.id === id);
};

export const getAllArticles = () => {
  return articles.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
};
