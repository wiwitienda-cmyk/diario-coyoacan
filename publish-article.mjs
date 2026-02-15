import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.ts';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const slug = "coyoacan-une-cultura-y-solidaridad-en-festival-por-cuba-y-venezuela-en-marco-del-mundial-2026";
const title = "Coyoacán une cultura y solidaridad en festival por Cuba y Venezuela en marco del Mundial 2026";
const summary = "La Asamblea Popular de Coyoacán contra el Imperialismo convocó a un festival cultural en el Jardín Hidalgo en solidaridad con Cuba y Venezuela, mientras la alcaldía se prepara para recibir más de 1.5 millones de visitantes durante el Mundial de Fútbol 2026.";
const content = `Coyoacán, Ciudad de México.- En un contexto marcado por la proximidad del Mundial de Fútbol 2026 y una reciente emergencia ambiental por ozono, la Asamblea Popular de Coyoacán contra el Imperialismo convocó a un festival cultural en solidaridad con Cuba y Venezuela. El evento se realizó este domingo 15 de febrero a las 11:00 horas en el Jardín Hidalgo, espacio emblemático del barrio colonial que ha sido escenario recurrente de expresiones sociales y culturales.

El festival, que reunió a decenas de vecinos y activistas, incluyó presentaciones artísticas, música y poesía, como muestra de apoyo a los pueblos de Cuba y Venezuela, países que enfrentan tensiones políticas y económicas derivadas de políticas internacionales. La convocatoria fue difundida por N+ Noticias el mismo día, destacando el compromiso local con causas internacionales desde una perspectiva antiimperialista.

Este acto de solidaridad se inserta en una dinámica social activa en toda la Ciudad de México. Según el mismo medio, el domingo se registraron múltiples manifestaciones, incluyendo una marcha principal, once concentraciones, siete rodadas motociclistas, once ciclistas, una rodada automovilista y otros 23 eventos de esparcimiento. Esta compleja agenda refleja el carácter plural y activo de la capital mexicana.

Simultáneamente, Coyoacán se prepara para ser uno de los puntos neurálgicos durante el Mundial de Fútbol 2026, que iniciará con la inauguración en el renovado Estadio Banorte (antes Estadio Azteca) el próximo 28 de marzo. El alcalde Giovani Gutiérrez afirmó en entrevista con Excélsior el 14 de febrero que el municipio espera recibir a más de 1.5 millones de visitantes durante el evento, y que aprovechará esta oportunidad para reforzar su vocación histórica y artística.

Para ello, se han realizado importantes obras públicas: intervención en 75 escuelas, renovación de 22 mercados, mejoramiento de gimnasios y deportivos, así como trabajos en banquetas, pavimentación, redes de drenaje y agua potable, y una nueva iluminación que busca poner en valor los barrios tradicionales como Niño Jesús, La Candelaria y San Francisco Culhuacán. Además, la seguridad ha sido un eje prioritario con la renovación de 40 patrullas y una reducción del 26% en la incidencia delictiva general, colocando a Coyoacán en primer lugar en reducción de delitos de alto impacto entre las alcaldías de la capital.

Este impulso coincide con el reconocimiento del patrimonio cultural coyoacanense, cuna de personajes como Frida Kahlo, Diego Rivera, Agustín Lara y Dolores del Río. Espacios como el Museo Frida Kahlo, el Museo de las Intervenciones y el Anahuacalli forman parte del circuito artístico que se promociona para visitantes nacionales e internacionales.

El festival de este domingo en el Jardín Hidalgo, además de ser una respuesta solidaridad, se inscribe en esta tradición de compromiso social y cultural que caracteriza al barrio. En ese marco, visitantes interesados en conocer más sobre la historia y cultura local pueden encontrar opciones de alojamiento como SúperAnfitrión Coyoacán, que ofrece hospedaje en el corazón del barrio histórico.

No obstante, el fin de semana también estuvo marcado por una emergencia ambiental. De acuerdo con La Jornada, el Valle de México vivió más de 50 horas en fase 1 de contingencia ambiental por ozono, la más prolongada en lo que va de la temporada seca-caliente. La Comisión Ambiental de la Megalópolis activó esta alerta el jueves pasado y la levantó hasta la noche del sábado, afectando severamente la calidad del aire en alcaldías como Coyoacán, Benito Juárez y Cuauhtémoc.

Este episodio coincidió con un incremento en la movilidad vehicular, especialmente en vialidades como Churubusco, Paseo de la Reforma y Eje Central, complicando las condiciones ambientales. Pese a estas dificultades, la vida cultural y social de la ciudad no se detuvo, evidenciando la resiliencia de sus habitantes.

Finalmente, la alcaldía también enfrentó un corte de agua el pasado 12 de febrero, que fue atendido y restablecido en menos de 24 horas, según informó SEGIAGUA vía ADN40. Este tipo de incidencias logísticas son parte de los desafíos que la demarcación debe superar para garantizar un ambiente propicio tanto para residentes como para la creciente afluencia turística.

En suma, la jornada dominical en Coyoacán fue un reflejo de la complejidad social, cultural y ambiental que vive la Ciudad de México, donde expresiones solidarias se entrelazan con preparativos para eventos internacionales y retos ecológicos. La alcaldía continúa su transformación para posicionarse como un referente histórico y artístico, mientras mantiene su identidad crítica y comprometida con causas sociales.

**Fuentes:** N+ Noticias (15 feb 2026), Excélsior (14 feb 2026), La Jornada (15 feb 2026), ADN40 (12 feb 2026).`;

const heroImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663072521459/eOKmvcWQWUdpCUKi.png";
const category = "COMUNIDAD";
const date = "Domingo, 15 de febrero de 2026";

await db.insert(schema.articles).values({
  slug,
  title,
  summary,
  content,
  heroImage,
  category,
  date,
  createdAt: new Date(),
});

console.log("✅ Artículo publicado exitosamente");
await connection.end();
