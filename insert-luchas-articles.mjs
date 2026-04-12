import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('No DATABASE_URL'); process.exit(1); }

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const articles = [
  // ─── ARTÍCULO 1: Crónica AAA en Juan de la Barrera ───
  {
    slug: "penta-retiene-intercontinental-wwe-aaa-juan-barrera-catalina-debuta-lucha-libre-cdmx-2026",
    title: "Penta retiene el Intercontinental WWE en el Juan de la Barrera y La Catalina sacude AAA con debut explosivo",
    summary: "Noche histórica en Coyoacán: por primera vez en 22 años se defendió un título WWE en la Ciudad de México. Penta venció a Hijo del Vikingo con Canadian Destroyer, mientras La Catalina irrumpió para retar a Flammer por el Reina de Reinas.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/penta-campeon-aaa_2d46f5f2.jpeg",
    category: "LUCHA LIBRE",
    date: "Sábado, 12 de abril de 2026",
    content: `El Gimnasio Olímpico Juan de la Barrera, esa mole de concreto brutalista enclavada en la alcaldía Coyoacán que los Juegos Olímpicos de 1968 le heredaron a la ciudad, volvió a rugir la noche del viernes 11 de abril. Lucha Libre AAA regresó a la capital con una función que dejó tres momentos para la historia: la primera defensa del Campeonato Intercontinental WWE en la CDMX en más de dos décadas, el debut estruendoso de La Catalina y un desafío de máscara contra máscara que promete sacudir las próximas semanas.

## Penta retiene con Canadian Destroyer ante un Vikingo feroz

La última vez que el Campeonato Intercontinental WWE se puso en juego en suelo capitalino fue el 6 de noviembre de 2004, cuando Shelton Benjamin lo retuvo ante Christian en la Arena Monterrey. Veintidós años después, Penta Zero Miedo subió al ring del Juan de la Barrera con el cinturón al hombro y la misión de demostrar que la alianza WWE-AAA no es solo un acuerdo corporativo, sino un puente real entre dos tradiciones de lucha libre.

Hijo del Vikingo, acompañado por Dorian Roldán y el imponente Omos, salió decidido a arrebatarle el oro. Desde el primer minuto la intensidad fue máxima: Penta atrapó al vuelo un tope suicida del Vikingo y lo estrelló sobre la mesa de comentaristas, provocando un silencio momentáneo que se rompió con un rugido colectivo. El poblano respondió con una Poison Rana desde las cuerdas y un Shooting Star Press hacia el piso que casi termina la lucha.

El momento decisivo llegó cuando Dorian Roldán intentó intervenir y el réferi Adrian Butler lo expulsó. Vikingo, desesperado, quiso golpear a Penta con el propio cinturón, pero Mini Vikingo se lo arrebató de las manos. Penta aprovechó el desconcierto y conectó su devastador Canadian Destroyer para la cuenta de tres. El Juan de la Barrera explotó. Calificación de Superluchas: cuatro estrellas.

## La Catalina irrumpe y el público enloquece

Antes de la lucha estelar, el gimnasio fue escenario de otro momento que nadie esperaba. Flammer, la Reina de Reinas AAA con 974 días de reinado ininterrumpido, celebraba su récord acompañada de Las Tóxicas (La Hiedra y Lady Maravilla). Videos de felicitación de Martha Villalobos, JBL y Rossy Moreno se proyectaron en la pantalla gigante. Flammer se declaró "la mejor luchadora en la historia de la lucha libre mexicana" y sentenció: "Este reinado nunca, pero nunca, acabará".

Las luces se apagaron. Un video apareció en la pantalla. Y entonces salió La Catalina.

La chilena, recién llegada de CMLL, fue recibida con una ovación ensordecedora. "Hoy es tu gran día. Espero que disfrutes tu fiesta... Peeero... Tú nunca te has enfrentado a La Catalina", dijo antes de despachar a Hiedra y Maravilla y propinarle una tunda a Flammer. El mensaje fue claro: viene por el título. La rivalidad que se avecina promete ser la más importante de la división femenil en años.

## Máscara contra máscara: el desafío que cierra la noche

En la primera lucha de la noche, Original Grande Americano derrotó a Octagón Jr. con un candado al tobillo, no sin antes arrancarle la máscara al técnico sin que el réferi lo descalificara, lo que generó abucheos generalizados. Después del combate, la tensión escaló hasta que se lanzó el reto definitivo: máscara contra máscara. "¡Ojo por ojo, diente por diente y sangre por sangre!", se escuchó en el micrófono. AAA tiene una bomba de relojería entre manos.

## El Juan de la Barrera: Coyoacán como capital de la lucha libre

El Gimnasio Olímpico Juan de la Barrera, ubicado en la Colonia Country Club de la alcaldía Coyoacán, a pocos minutos de Ciudad Universitaria y del centro histórico de Coyoacán, se ha consolidado como la sede principal de AAA en la Ciudad de México. Construido para los Juegos Olímpicos de 1968 y nombrado en honor al cadete Juan de la Barrera, uno de los Niños Héroes de Chapultepec, el recinto tiene capacidad para aproximadamente 5,000 espectadores y cada función de AAA lo llena hasta las banderas.

La próxima función de AAA en el Juan de la Barrera está programada para el sábado 18 de abril, también transmitida por FOX. Si vienes de fuera de la ciudad a vivir la experiencia de la lucha libre mexicana en uno de los recintos más emblemáticos de Coyoacán, [SúperAnfitrión Coyoacán](https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades) ofrece hospedaje a minutos del gimnasio y del corazón del barrio.

---

**Fuentes:** Superluchas, Medio Tiempo, Mundo Lucha, WWE.com`
  },

  // ─── ARTÍCULO 2: Guía del Gimnasio Juan de la Barrera ───
  {
    slug: "gimnasio-olimpico-juan-barrera-coyoacan-historia-lucha-libre-aaa-como-llegar-eventos-2026",
    title: "Gimnasio Juan de la Barrera: la catedral olímpica de Coyoacán donde AAA hace temblar la CDMX",
    summary: "Construido para los Juegos Olímpicos de 1968, el Gimnasio Olímpico Juan de la Barrera es hoy la sede principal de Lucha Libre AAA en la capital. Historia, cómo llegar, próximos eventos y por qué Coyoacán es la base perfecta para vivirlo.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/gimnasio-juan-barrera-aereo_3055b380.jpg",
    category: "CULTURA Y DEPORTE",
    date: "Sábado, 12 de abril de 2026",
    content: `Hay edificios que cargan con la memoria de una ciudad entera. El Gimnasio Olímpico Juan de la Barrera es uno de ellos. Desde que abrió sus puertas en 1968 para albergar las competencias de voleibol de los XIX Juegos Olímpicos, este coloso de concreto en la alcaldía Coyoacán ha sido testigo de hazañas deportivas, conciertos memorables y, en los últimos años, de las noches más electrizantes de la lucha libre mexicana.

## De los Juegos Olímpicos a la Tres Veces Estelar

El gimnasio fue diseñado como parte del complejo deportivo olímpico del sur de la ciudad, junto con el Estadio Olímpico de CU y la Alberca Olímpica. Su nombre honra a Juan de la Barrera, el cadete más joven entre los Niños Héroes que defendieron el Castillo de Chapultepec en 1847 durante la invasión estadounidense. Con capacidad para aproximadamente 5,000 espectadores, el recinto combina la arquitectura brutalista característica de la época con una funcionalidad que lo mantiene vigente casi seis décadas después.

En años recientes, Lucha Libre AAA Worldwide lo adoptó como su sede principal en la Ciudad de México para las funciones televisadas por FOX. Cada sábado que AAA programa función en el Juan de la Barrera, las inmediaciones de la Colonia Country Club se transforman: vendedores de máscaras y camisetas ocupan las banquetas, familias enteras llegan con horas de anticipación, y el rugido del público se escucha desde la avenida Río Churubusco.

## Cómo llegar desde el centro de Coyoacán

El gimnasio se ubica en Avenida José María Rico s/n, Colonia Country Club, alcaldía Coyoacán, CP 04220. Desde el centro histórico de Coyoacán (Plaza Hidalgo) hay varias opciones:

**En transporte público:** Tomar el Metrobús Línea 1 en la estación Doctor Gálvez (a 10 minutos caminando desde Plaza Hidalgo) y bajar en la estación Ciudad de los Deportes. De ahí, caminar 15 minutos hacia el sur por Avenida Río Churubusco. Alternativamente, el Metro Línea 3 (estación Copilco) queda a 20 minutos caminando.

**En auto:** Desde Plaza Hidalgo, tomar Avenida Miguel Ángel de Quevedo hacia el poniente hasta Avenida Universidad, girar al norte y luego incorporarse a Río Churubusco. El trayecto es de aproximadamente 15 minutos sin tráfico. Hay estacionamiento limitado en las inmediaciones del gimnasio; se recomienda llegar temprano.

**En bicicleta o scooter:** La ciclovía de Avenida Universidad conecta directamente con la zona. Hay estaciones de Ecobici en las cercanías.

## Próximos eventos confirmados

La agenda de AAA en el Juan de la Barrera para las próximas semanas incluye:

- **Sábado 18 de abril de 2026** — Lucha Libre AAA en FOX. Cartelera por confirmar, pero se espera la continuación de la rivalidad La Catalina vs. Flammer y posibles avances en el desafío de máscara contra máscara entre los Grandes Americanos.
- **Sábado 23 de mayo de 2026** — Función de gala anunciada.

Los boletos se consiguen en taquilla del gimnasio el día del evento o a través de los canales oficiales de AAA. Los precios oscilan entre $150 y $800 MXN dependiendo de la ubicación.

## Coyoacán: la base perfecta para vivir la lucha libre

Si vienes de fuera de la ciudad específicamente para una función de AAA, hospedarte en Coyoacán tiene sentido logístico y cultural. El gimnasio está a minutos del centro del barrio, lo que significa que puedes pasar la tarde recorriendo el Jardín Centenario, tomando un café en la Plaza Hidalgo o visitando el Museo Frida Kahlo, y caminar directamente a la función por la noche.

[SúperAnfitrión Coyoacán](https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades) ofrece alojamientos en el corazón del barrio, a distancia caminable de los principales puntos de interés y con fácil acceso al Juan de la Barrera. Ideal para quienes quieren combinar la experiencia de la lucha libre con la vida cultural de uno de los barrios más emblemáticos de la Ciudad de México.

---

**Fuentes:** CONADE, Gobierno de la Ciudad de México, Lucha Libre AAA Worldwide`
  },

  // ─── ARTÍCULO 3: Qué hacer en CDMX este fin de semana ───
  {
    slug: "que-hacer-cdmx-fin-semana-12-13-abril-2026-slow-art-day-exposiciones-musica-coyoacan",
    title: "Qué hacer en CDMX este fin de semana: Slow Art Day, Kati Horna y listening party de Sabina",
    summary: "Del Slow Art Day en 50 museos al último fin de semana de la exposición de Kati Horna en San Ángel, pasando por una listening party de Joaquín Sabina en la Condesa. La agenda cultural del 12 y 13 de abril en la Ciudad de México.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/juan-barrera-interior_1b61e049.jpg",
    category: "AGENDA CULTURAL",
    date: "Sábado, 12 de abril de 2026",
    content: `La Ciudad de México no descansa los fines de semana, y este 12 y 13 de abril la oferta cultural es particularmente densa. Desde una iniciativa global que invita a contemplar el arte con calma hasta el cierre de una de las exposiciones fotográficas más importantes del año, hay planes para todos los temperamentos. Aquí va lo que vale la pena.

## Slow Art Day: ver menos para sentir más

La segunda edición mexicana del Slow Art Day se celebró este 11 de abril con la participación de más de 50 espacios museísticos de la ciudad. La premisa es sencilla y radical: en lugar de recorrer un museo entero en una hora, detenerse frente a una sola obra durante diez minutos. Contemplarla. Dejar que hable. Más de 50 recintos se sumaron con actividades especiales que incluyen journaling, recorridos guiados y experimentación con herramientas digitales de Adobe. Si te lo perdiste ayer, varios museos mantienen las dinámicas durante el fin de semana. Consulta la programación completa en slowartday.com.mx.

## Último fin de semana: Kati Horna en San Ángel

La exposición "Kati Horna: La mirada puesta en página" en el Museo Casa Estudio Diego Rivera y Frida Kahlo cierra este domingo 12 de abril. Si no la has visto, este es el momento. La muestra recorre la obra de una de las fotorreporteras más importantes del siglo XX, desde su trabajo durante la Guerra Civil Española hasta su papel como editora visual en México. No es solo una exposición de fotografía: es un recorrido por la historia cultural del país vista a través de los ojos de una mujer que supo mirar lo que otros ignoraban. El museo está en San Ángel, a 15 minutos en auto desde el centro de Coyoacán.

## Gunther Gerzso en el Carrillo Gil

Para quienes prefieren la abstracción, el Museo de Arte Carrillo Gil presenta "Algo en común con el pasado", una selección de más de 40 obras de Gunther Gerzso realizadas entre 1950 y 1990. El artista, que comenzó influido por el surrealismo, construyó un lenguaje pictórico donde el paisaje ancestral y las formas pétreas de la arquitectura mesoamericana adquieren una dimensión metafísica. El Carrillo Gil está en Avenida Revolución, en la frontera entre San Ángel y Coyoacán.

## Listening party de Joaquín Sabina en la Condesa

Si lo tuyo es la música y la noche, la Mezcalería Finca Robles en la Condesa (Av. Tamaulipas 136, Hipódromo Condesa) organiza una listening party dedicada a Joaquín Sabina este sábado a las 19:00 horas. No hay reservación, los lugares se asignan por orden de llegada. La noche está dedicada al cantautor de "19 días y 500 noches" y "Y sin embargo", acompañada de la coctelería de mezcal del lugar. Sabina no estará presente, pero su música sí, y en un lugar así, con buena compañía, eso basta.

## Papalote Museo del Niño: nuevas exhibiciones

Para familias con niños, el Papalote Museo del Niño inauguró dos nuevas exhibiciones: "Interconectados", dedicada al cuerpo humano, y "Wow Lab", un laboratorio vivo donde la ciencia se descubre a través de la experimentación. Ambas muestras buscan despertar la curiosidad de las nuevas infancias a través del juego y la interacción directa.

## El Gran Showman con orquesta en vivo

El Teatro Xola Julio Prieto presenta funciones especiales de "El Gran Showman" (The Greatest Showman) con orquesta en vivo. El musical protagonizado por Hugh Jackman y Zac Efron cobra nueva vida con la música interpretada en directo. Funciones a las 18:00 y 20:30 horas.

## Coyoacán como base de operaciones

Todos estos eventos están a menos de 30 minutos del centro de Coyoacán, lo que convierte al barrio en la base ideal para un fin de semana cultural en la ciudad. Si vienes de fuera, [SúperAnfitrión Coyoacán](https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades) ofrece alojamientos en el corazón del barrio, con acceso directo a transporte público y a la vida cultural del sur de la ciudad.

---

**Fuentes:** Mundo Ejecutivo CDMX, Slow Art Day México, INBAL, Papalote Museo del Niño`
  }
];

console.log('Insertando 3 artículos nuevos en newsArticles...');

for (const article of articles) {
  try {
    await db.insert(schema.newsArticles).values(article);
    console.log(`✅ Insertado: ${article.slug.substring(0, 60)}...`);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      console.log(`⚠️ Ya existe: ${article.slug.substring(0, 60)}...`);
    } else {
      console.error(`❌ Error: ${article.slug.substring(0, 60)}...`, err.message);
    }
  }
}

console.log('Listo. Cerrando conexión...');
await connection.end();
process.exit(0);
