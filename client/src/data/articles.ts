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
