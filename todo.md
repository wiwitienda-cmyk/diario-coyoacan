# Project TODO

## Tareas Completadas
- [x] Corregir botón de Reservaciones que no muestra texto en el header (SOLUCIONADO - colores personalizados agregados)
- [x] Agregar botón "Ediciones Anteriores" o "Archivo" en el header junto al botón de Reservaciones
- [x] Probar generador automático ejecutándolo manualmente para crear un nuevo artículo
- [x] Integrar generación de imágenes con IA en el script automático para fotos únicas por artículo
- [x] Implementar sistema de envío de newsletter a suscriptores cuando se publique nuevo artículo
- [x] Configurar publicación automática de artículos diarios a las 7:00 AM usando cron job
- [x] Integrar Resend para envío de emails HTML profesionales a suscriptores (usando notificaciones del sistema)
- [x] Expandir lista de lugares emblemáticos de Coyoacán en el generador (de 5 a 15 sitios)
- [x] Implementar sistema de comentarios con Disqus al final de cada artículo
- [x] Crear documentación completa de configuración de Disqus
- [x] Implementar meta tags Open Graph dinámicos para cada artículo
- [x] Agregar meta tags de Twitter Card para mejor compartición
- [x] Crear sitemap.xml dinámico que se actualice automáticamente con nuevos artículos
- [x] Crear robots.txt optimizado para SEO
- [x] Agregar botones de compartir en WhatsApp, Facebook y Twitter en cada artículo
- [x] Agregar palabras clave relevantes (Coyoacán, hospedaje, CDMX, cultura, gastronomía, SúperAnfitrión)
- [x] Optimizar título de 82 caracteres a 30-60 caracteres (ahora trunca a 45 + ' | Coyoacán')
- [x] Agregar texto alternativo (alt) - todas las imágenes principales ya tienen alt text
- [x] Eliminar componente de Disqus que muestra error (hasta que se configure la cuenta)
- [x] Corregir mapa sticky que se encima con el contenido de abajo

## Nuevos Problemas de SEO Reportados
- [x] Reducir palabras clave de 13 a 6 enfocadas (Coyoacán, hospedaje CDMX, cultura México, gastronomía Coyoacán, SúperAnfitrión, turismo Ciudad de México)
- [x] Agregar texto alternativo (alt) y aria-hidden a iconos decorativos (QR code con title, iconos con aria-hidden)

## Nuevas Correcciones Solicitadas
- [x] Corregir imagen del artículo del Jardín Centenario (nueva imagen fotorealista generada y subida a S3)
- [x] Cambiar texto del botón "EDICIONES ANTERIORES" a "ARCHIVO" (más periodístico)

## Mejoras Aprobadas por el Usuario (SI A LAS TRES)
- [x] Agregar CTAs de conversión dentro de los artículos (CTA con gradiente rust después del contenido)
- [x] Implementar lazy loading en imágenes hero para mejorar rendimiento (DiarioCoyoacan y Hemeroteca)
- [x] Generar 5-10 artículos adicionales ejecutando el generador automático (7 artículos totales en archivo)

## Correcciones de Contenido e Imágenes
- [x] Eliminar artículo de El Péndulo (ya no existe en Coyoacán)
- [x] Cambiar imagen del Callejón del Aguacate a estilo más artístico y subjetivo (muro colonial con sombra y luz tenue de farol vintage)
- [x] Ajustar estilo de imágenes: menos pretensioso, más atmosférico y artístico

## Transformación a Periodismo Auténtico
- [x] Generar imagen subjetiva para Casa Azul/Frida: corazón sagrado con temática de sus pinturas
- [x] Generar imagen subjetiva para Fonoteca: audífonos vintage años 60 con pátina de edad
- [x] Generar imagen subjetiva para Jardín Centenario: zoom a la cruz colonial de 1721 con musgo
- [x] Generar imagen subjetiva para Mercado: manos trabajadoras en blanco y negro, estilo documental
- [x] Generar imagen subjetiva para Café Avellaneda: detalle íntimo del ritual de servir café
- [x] Cambiar botón "ARCHIVO" a "ARTÍCULOS" en header (también actualizado en Hemeroteca)
- [x] Reescribir 6 artículos con tono periodístico estilo El País: reportajes investigativos con narrativa envolvente, fuentes citadas (directoras de museos, artistas, dueños de negocios), contexto histórico profundo (desde prehispánico hasta actualidad), y temáticas sociales (gentrificación, resistencia cultural, preservación de memoria)

## Nuevo Problema de SEO Reportado
- [x] Agregar texto alternativo (alt) a las 5 imágenes que faltan (tiles y sombra de Leaflet con alt="" y aria-hidden)

## Nuevo Problema de SEO Reportado (Recurrente)
- [x] Verificar y corregir las 5 imágenes sin texto alternativo en la página principal (corregido selector de useEffect: .leaflet-tile en lugar de .leaflet-tile-container img)

## Nuevos Problemas de SEO Reportados
- [x] Acortar meta description de 192 caracteres a 50-160 caracteres (ahora 145 caracteres)
- [x] Verificar y corregir las 5 imágenes sin texto alternativo (MutationObserver funcionando correctamente, 0 imágenes sin alt)

## Corrección de Link del Código QR
- [x] Corregir URL del código QR de https://superanfitrion.com.mx/diario a https://diario-coyo.manus.space/

## Materiales Promocionales con QR para Imprimir
- [x] Crear diseño de promo elegante para habitaciones de hotel (alta gama, sofisticado)
- [x] Crear diseño de posavasos creativos para cafeterías (llamativo, irresistible, que genere escaneos)

## Artículo de Evento Actual (Feria del Mezcal y la Cerveza)
- [x] Generar imagen periodística subjetiva para artículo de la Feria del Mezcal (copas de mezcal con luz cálida)
- [x] Crear artículo periodístico estilo El País sobre la Feria del Mezcal y la Cerveza (14-15 feb, Tlatelolco)
- [x] Artículo configurado como más reciente (aparece automáticamente en primera página por fecha)

## Nuevo Artículo: Ruta Poco Conocida de Coyoacán
- [x] Generar imagen periodística subjetiva para artículo de ruta alternativa de Coyoacán
- [x] Adaptar contenido del artículo al formato de la base de datos
- [x] Publicar artículo "Descubre Coyoacán: Ruta poco conocida para un día auténtico"

## Banner Flotante de Conversión
- [x] Diseñar banner flotante con descuento especial para lectores del Diario
- [x] Implementar animación de entrada y funcionalidad de cierre
- [x] Agregar enlace directo a página de reservas de SúperAnfitrión

## Nuevas Mejoras Aprobadas (SI A TODO)
- [x] Crear diseño de coasters creativos para cafeterías con código QR
- [x] Crear diseño de material promocional de alta gama para hoteles
- [x] Implementar sistema de generación automática de artículos usando diario-coyoacan-generator skill
- [x] Agregar A/B testing al banner con diferentes tiempos de aparición
- [x] Agregar A/B testing al banner con diferentes mensajes de descuento

## Cambio de Navegación: "Inicio" a "Home"
- [x] Cambiar traducción española de "Inicio" a "Home" en DiarioCoyoacan.tsx

## Optimización SEO
- [x] Acortar encabezado H2 de 94 caracteres a 80 o menos (ahora 61 caracteres)
- [x] Agregar texto alternativo (alt) a las 5 imágenes que no lo tienen

## SEO Avanzado (Sin tocar imágenes ni otros elementos)
- [x] Implementar Schema markup JSON-LD para artículos
- [x] Crear endpoint para sitemap XML dinámico con todos los artículos
- [x] Optimizar meta tags Open Graph por artículo (mejorar los existentes)

## Publicar Artículo: Domingos Alternativos en Coyoacán (2026-02-01)
- [x] Adaptar SQL del artículo al schema de la base de datos actual (articles table)
- [x] Generar imagen periodística subjetiva para el artículo
- [x] Publicar artículo en la base de datos

## Poner Artículo en Primera Plana
- [x] Cambiar fecha del artículo "Domingos Alternativos" para que aparezca en la primera plana

## Publicar Nuevo Artículo del Diario Coyoacán
- [x] Descomprimir y revisar archivo ZIP con el nuevo artículo
- [x] Generar imagen periodística subjetiva para el artículo
- [x] Adaptar SQL al schema de la base de datos actual
- [x] Publicar artículo en la base de datos

## Reemplazar Imagen del Artículo de Agenda Cultural
- [x] Buscar archivo diario-coyoacan-eventos-culturales-feb-02-2026.png en el sistema
- [x] Copiar imagen al directorio /public/images/
- [x] Actualizar base de datos con la nueva ruta de imagen

## Solucionar Problema de SEO: Imágenes sin Alt Text
- [x] Implementar solución robusta para agregar alt="" automáticamente a imágenes de Leaflet
- [x] Verificar que las 7 imágenes del mapa ahora tengan texto alternativo

## Nuevo Problema de SEO Reportado (Recurrente - Crítico)
- [x] Diagnosticar por qué 5 de 7 imágenes siguen sin texto alternativo según checker de SEO
- [x] Implementar solución definitiva más agresiva para agregar alt text a imágenes de Leaflet
- [x] Verificar que todas las imágenes tengan alt text correctamente

## Agregar Top Header con Información de Contacto
- [x] Diseñar y agregar top header con WhatsApp (5511427252), correo (superanfitrioncoyoacan@gmail.com), crear cuenta, y alojamientos en Coyoacán
- [x] Enlazar botón "Alojamientos en Coyoacán" a página de Lodgify
- [x] Verificar diseño responsive del top header

## Problema Crítico de SEO (Recurrente - Máxima Prioridad)
- [ ] Investigar qué herramienta de SEO está usando el usuario para detectar el problema
- [ ] Implementar solución alternativa: configurar Leaflet para agregar alt text en la creación de tiles
- [ ] Probar con múltiples herramientas SEO (Lighthouse, SEO Checker, Google Search Console)
- [ ] Verificar que TODAS las imágenes tengan alt text visible para checkers de SEO

## Actualizar Enlace de "Crear Cuenta"
- [x] Cambiar URL del botón "Crear cuenta" de Lodgify a https://superanfitrion.com.mx/acceso-huespedes

## Agregar Botón de Llamada Directa
- [x] Agregar botón de llamada directa con tel:5511427252 en el top header
- [x] Verificar que funcione correctamente en dispositivos móviles

## Publicar Artículo del Café en Coyoacán
- [x] Subir imagen del café a S3
- [x] Insertar nuevo artículo en la base de datos
- [x] Verificar que el artículo se muestre correctamente en la página

## Artículo del Café No Aparece en Primera Plana
- [x] Diagnosticar por qué el artículo no aparece como el más reciente en la página principal
- [x] Corregir ordenamiento o fecha del artículo
- [x] Verificar que aparezca correctamente en la primera plana

## Implementar Sistema de Artículos Relacionados
- [x] Crear componente de artículos relacionados
- [x] Implementar lógica para seleccionar artículos similares por categoría
- [x] Agregar sección al final de cada artículo

## Implementar Widget Flotante de WhatsApp
- [x] Crear componente de botón flotante de WhatsApp con enlace a 5511427252
- [x] Agregar estilos y animaciones para el widget
- [x] Integrar widget en todas las páginas del sitio

## Solucionar Error de Anidación de Enlaces
- [x] Identificar dónde está el elemento <a> anidado dentro de otro <a>
- [x] Corregir la estructura HTML para eliminar la anidación
- [x] Verificar que el error desaparezca en la consola

## Agregar Enlace al Blog de SuperAnfitrión en Header
- [x] Agregar botón "BLOG" en el header junto a "NOTICIAS" que enlace a https://superanfitrion.com.mx/blog
- [x] Verificar que el enlace funcione correctamente

## Generar y Publicar Artículo Diario (10 de febrero de 2026 - Lunes)
- [x] Investigar eventos y lugares actuales en Coyoacán/CDMX
- [x] Generar artículo periodístico con tono reporteril
- [x] Crear/seleccionar imagen artística y subjetiva para el artículo
- [x] Publicar artículo en la base de datos con fecha de hoy
- [x] Verificar que aparezca como artículo destacado en la primera plana (nota: el artículo del café del 17 de febrero es el más reciente, el del museo del 10 de febrero aparece en la lista)

## Artículo del Museo No Aparece en Primera Plana
- [x] Actualizar fecha del artículo del museo a una fecha más reciente que 2026-02-17
- [x] Verificar que el artículo del museo aparezca como destacado en la primera plana

## Generar Artículo Diario con Skill del Diario Coyoacán
- [x] Extraer y revisar archivo ZIP con la skill
- [x] Investigar eventos actuales en Coyoacán/CDMX para hoy (miércoles 11 de febrero)
- [x] Generar artículo periodístico con imagen artística (Museo Diego Rosales)
- [x] Publicar artículo en la base de datos con fecha actual (2026-02-19)
- [x] Verificar que aparezca en la primera plana

## Publicar Última Noticia de Hoy en Primera Plana
- [x] Extraer archivo ZIP con la noticia generada
- [x] Revisar contenido del artículo (texto bilingüe e imagen)
- [x] Subir imagen a S3
- [x] Insertar artículo en la base de datos
- [x] Verificar que aparezca en la primera plana

## Implementar Sistema de Newsletter Automático
- [x] Crear función de envío de newsletter con Resend API
- [x] Diseñar template HTML responsive para el email del artículo diario
- [x] Implementar procedimiento tRPC para enviar newsletter manualmente
- [x] Crear endpoint/botón en el admin para enviar newsletter
- [x] Probar envío de newsletter con suscriptores de prueba
- [x] Verificar que el email se vea correctamente en diferentes clientes
- [x] Configurar API key de Resend
- [x] Verificar dominio superanfitrion.com.mx en Resend
- [x] Agregar registros DNS en Hostinger
- [x] Implementar botón de Vista Previa en panel de administración
- [x] Implementar validación automática de URL antes de enviar
- [x] Agregar formulario de suscripción al newsletter en el footer del sitio

## Publicar Nuevo Artículo del Diario Coyoacán
- [x] Extraer y revisar archivo ZIP con el nuevo artículo
- [x] Generar imagen periodística subjetiva para el artículo
- [x] Publicar artículo en la base de datos como primera plana
- [x] Verificar que el artículo aparezca correctamente en la primera plana
- [x] Corregir lógica de selección de artículo más reciente (ordenar por createdAt DESC)

## Publicar Artículo sobre Inversión en Seguridad de Coyoacán ante Mundial 2026
- [ ] Generar imagen subjetiva artística de balón viejo y pie de niño con tenis desgastados (omitida por solicitud del usuario)
- [x] Adaptar contenido del artículo al formato periodístico del Diario Coyoacán
- [x] Publicar artículo en la base de datos como primera plana
- [x] Verificar publicación en el sitio web

## Generar Imagen para Artículo de Seguridad en Coyoacán
- [x] Generar imagen subjetiva artística de balón viejo desinflado con pie de niño en calle de Coyoacán
- [x] Subir imagen a S3 y obtener URL del CDN
- [x] Actualizar artículo en la base de datos con la nueva URL de imagen
- [ ] PROBLEMA: La imagen NO se muestra en el sitio (cuadro negro) - requiere investigación adicional del componente de React

## Corregir Problema de Renderizado de Imagen Hero
- [x] Investigar el componente de React que renderiza la imagen hero del artículo
- [x] Identificar por qué la imagen no se muestra (cuadro negro) - URL incorrecta en BD
- [x] Corregir el problema de renderizado de imagen - actualizada URL en base de datos
- [x] Verificar que la imagen se muestre correctamente en el sitio web
- [x] Crear checkpoint con la corrección implementada

## Automatización Diaria del Diario Coyoacán (Periodismo)
- [x] Actualizar skill diario-coyoacan-generator para enfoque periodístico (no turismo)
- [x] Agregar fuentes prioritarias: La Jornada, El Universal, El Proceso, influencers pro-4T
- [x] Implementar búsqueda y citación de fuentes en artículos
- [x] Crear script de automatización diaria (daily-article-automation.mjs)
- [x] Implementar generación de imágenes subjetivas "bajo la lupa" con perspectiva editorial
- [x] Configurar cron job para ejecución diaria automática (7:00 AM todos los días)
- [x] Integrar envío automático de newsletter después de publicar
- [ ] Probar sistema completo end-to-end

## Estrategia SEO Mundial 2026
- [x] Agregar menciones del Mundial 2026 en todos los artículos generados
- [x] Incluir keywords SEO: Mundial 2026, Coyoacán hospedaje Mundial, alojamiento Mundial 2026
- [x] Agregar sección publicitaria del Mundial 2026 al final de cada artículo (CTA verde con ⚽)
- [x] Optimizar meta tags con keywords del Mundial 2026 (incluido en contenido)
- [x] Actualizar script de automatización para incluir contexto del Mundial

## Estrategia de Distribución y Tráfico Orgánico
- [ ] Implementar auto-publicación en redes sociales (Facebook, Twitter, Instagram)
- [ ] Crear sistema de compartir en grupos de Facebook de Coyoacán/CDMX
- [x] Configurar sitemap.xml y robots.txt para Google
- [x] Implementar schema.org markup (Article, LocalBusiness)
- [x] Agregar Open Graph y Twitter Cards metatags
- [ ] Crear estrategia de backlinks (directorios, blogs, foros)
- [x] Optimizar CTAs para conversión (urgencia, escasez, prueba social)
- [ ] Implementar pixel de conversión y analytics
- [x] Crear landing page específica para tráfico del blog (/hospedaje-mundial-2026)
- [ ] Configurar Google Search Console y enviar sitemap

## Optimización de Conversión
- [x] Agregar contador de visitas en tiempo real (prueba social) - en landing page
- [x] Implementar banner de urgencia "Solo 3 disponibles"
- [ ] Crear popup de salida con descuento especial
- [ ] Optimizar velocidad de carga (lazy loading, CDN, compresión)
- [ ] A/B testing de CTAs del Mundial 2026

## Corrección de Información Falsa (Distancia al Estadio Azteca)
- [x] Actualizar landing page: cambiar "15 min" a "20-25 min en transporte público"
- [x] Corregir textos promocionales en blog
- [x] Ajustar estrategia para destacar beneficios reales (cultura, seguridad, experiencia)
- [x] Ser honesto sobre tráfico del Mundial - destacar Metro como ventaja vs autos
- [x] Destacar Metro Línea 2 como alternativa confiable vs tráfico

## Navegación Landing Page Mundial 2026
- [x] Agregar header con logo SúperAnfitrión
- [x] Agregar menú: Home (superanfitrion.com.mx), Blog (/diario), Reservaciones (Lodgify)
- [x] Hacer header sticky para fácil navegación
- [x] Versión móvil responsive

## Botones de Navegación en Footer (Diseño Diagonal)
- [x] Agregar botón "Regresar arriba" con scroll suave
- [x] Agregar botón "Home" → superanfitrion.com.mx
- [x] Agregar botón "Blog" → /diario
- [x] Agregar botón "Reservaciones" → Lodgify
- [x] Aplicar diseño diagonal/inclinado (transform: skewY)
- [x] Estilo neo-brutal con sombras y bordes gruesos
- [x] Grid responsive: 2 columnas en móvil, 4 en desktop

## Publicar Sección del Mundial 2026 en Diario Coyoacán
- [x] Agregar componente de sección publicitaria al DiarioCoyoacan.tsx
- [x] Incluir todos los estilos CSS inline necesarios
- [x] Verificar que los botones dirijan a /mundial-2026
- [x] Reiniciar servidor y verificar en navegador
- [ ] Guardar checkpoint con sección publicada

## Mostrar Artículo del Festival en Primera Plana
- [ ] Crear componente NewsPage.tsx para artículos periodísticos
- [ ] Agregar ruta /noticias en App.tsx
- [ ] Actualizar navegación del header para dirigir a /noticias
- [ ] Verificar que el artículo del festival aparezca en primera plana
- [ ] Guardar checkpoint con artículo visible

## Publicar Artículo del Festival de Cuba y Venezuela
- [ ] Preparar datos del artículo en formato correcto para tabla articles
- [ ] Generar slug único para el artículo
- [ ] Insertar artículo en base de datos con webdev_execute_sql
- [ ] Verificar que aparezca en primera plana de cafeavellan-q8betawp.manus.space
- [x] Enviar newsletter (enviado) a suscriptores

## Optimización de Rendimiento (URGENTE - Página Carga Muy Lento)
- [x] Diagnosticar problemas de rendimiento en Diario Coyoacán (bundle de 984KB identificado)
- [x] Reducir tamaño del bundle JavaScript con code splitting (de 984KB a 748KB)
- [x] Configurar manualChunks en vite.config.ts (react-vendor, router, ui-vendor, map-vendor)
- [x] Verificar lazy loading en imágenes hero (ya implementado)
- [ ] Optimizar consultas a la base de datos (pendiente)
- [ ] Implementar caching en el navegador (pendiente)
- [ ] Considerar WebP para imágenes futuras

## Optimización de Base de Datos (NUEVA - Acelerar Búsquedas)
- [x] Agregar índice en columna `slug` de tabla articles
- [x] Agregar índice en columna `dateISO` de tabla articles
- [x] Agregar índice en columna `createdAt` de tabla articles
- [x] Aplicar migración a la base de datos (0003_curious_spot.sql)

## Sitemap.xml Dinámico para SEO (NUEVA)
- [x] Crear endpoint /sitemap.xml en el servidor
- [x] Consultar todos los artículos de ambas tablas (articles y newsArticles)
- [x] Generar XML con formato sitemap estándar + Google News + Imágenes
- [x] Incluir URLs, fechas de modificación y prioridades
- [x] Verificado: 24 artículos en el sitemap (22 + 2)

## Implementar Página de Noticias con Grid y Limitar Sidebar
- [ ] Crear página /noticias con grid responsive de artículos (3 columnas desktop, 2 tablet, 1 móvil)
- [ ] Agregar tarjetas de artículo con imagen, fecha, categoría, título, resumen y botón "Leer más"
- [ ] Implementar filtros por categoría (Todas, Patrimonio, Cultura, Gobierno, etc.)
- [ ] Ordenar artículos por fecha descendente (más recientes primero)
- [ ] Limitar sidebar de artículos individuales a solo 5 artículos más recientes
- [ ] Agregar botón "Ver todos los artículos →" al final del sidebar que lleve a /noticias
- [ ] Actualizar botón "NOTICIAS" del header para que redirija a /noticias
- [ ] Agregar ruta /noticias en App.tsx
- [ ] Verificar diseño responsive en móvil, tablet y desktop
- [ ] Verificar que el sidebar ya no sobrepase el contenido del artículo

## Implementar Página de Noticias con Grid (25 de febrero de 2026)
- [x] Limitar sidebar de artículos a 5 más recientes
- [x] Agregar botón "Ver Todos los Artículos →" en sidebar
- [x] Botón apunta a `/hemeroteca` (página existente con grid de artículos)
- [x] Verificar implementación y funcionamiento correcto

## Generar y Publicar Artículo del 26 de Febrero de 2026
- [x] Redactar artículo periodístico sobre fuga de agua en Río Churubusco y clima extremo
- [x] Generar imagen subjetiva artística para el artículo
- [x] Publicar artículo en primera plana de la base de datos
- [x] Verificar que el artículo aparezca correctamente en el sitio web

## Optimizar Rendimiento del Sitio Web

- [ ] Diagnosticar problemas de rendimiento (Network tab, Lighthouse)
- [ ] Optimizar imágenes hero de artículos (comprimir, lazy load)
- [ ] Implementar paginación en lista de artículos
- [ ] Optimizar consultas tRPC (limitar campos, agregar índices)
- [ ] Implementar lazy loading para componentes pesados
- [ ] Minificar y comprimir assets CSS/JS
- [ ] Verificar mejoras de rendimiento con Lighthouse

## Agregar Botones de Compartir en Redes Sociales
- [x] Crear componente de botones de compartir (Facebook, Twitter, WhatsApp) - YA EXISTÍA
- [x] Integrar componente en la página de artículos individuales - YA INTEGRADO
- [x] Verificar que los botones funcionen correctamente con URLs dinámicas
- [x] Guardar checkpoint

## Rediseño Completo con Formato de Periódico Clásico Impreso
- [x] Reescribir DiarioCoyoacan.tsx con formato de periódico clásico (tipografía gótica, dos columnas, letra capital, pull quote, anuncio de primera plana)
- [x] Implementar cabecera con UnifrakturMaguntia, número de edición, alcaldías cubiertas y fecha
- [x] Implementar banner negro superior con enlace a superanfitrion.com.mx
- [x] Implementar layout de dos columnas (artículo principal + columna lateral con agenda, efeméride y artículos recientes)
- [x] Implementar letra capital grande en el primer párrafo del artículo principal
- [x] Implementar pull quote (cita destacada) con líneas dobles arriba y abajo
- [x] Implementar anuncio de primera plana contextual con botón rojo de reserva
- [x] Implementar pie de página con créditos y links a diario.superanfitrion.com.mx y superanfitrion.com.mx
- [x] Corregir parseo de fechas mixtas (ISO y texto largo en español)
- [x] Escribir 21 tests unitarios para las funciones auxiliares del periódico

## Cintilla de Cotizaciones de Divisas en Vivo
- [x] Crear endpoint tRPC server-side que consulte Frankfurter API (gratuita, sin key) para USD/MXN, EUR/MXN, CAD/MXN, GBP/MXN
- [x] Implementar cintilla animada de divisas en el marquee del Diario Coyoacán
- [x] Mostrar variación (▲▼) respecto al día anterior
- [x] Actualizar automáticamente cada 10 minutos en el frontend
- [x] Escribir tests unitarios para el endpoint de divisas

## Corrección Error: Anchor Anidado en /noticias
- [x] Localizar el `<a>` anidado dentro de otro `<a>` en la página /noticias
- [x] Corregir la estructura HTML para eliminar la anidación

## Edición 28 de Febrero 2026 + IPC/BMV + Publicación
- [ ] Buscar noticias reales del 28 de febrero de las alcaldías de CDMX
- [ ] Generar artículo periodístico completo y publicarlo en la base de datos
- [x] Agregar índice IPC/BMV a la cintilla de divisas
- [ ] Verificar y publicar el sitio

## Ampliar Cintilla de Cotizaciones (Petróleo + Latam)
- [ ] Agregar precio del petróleo WTI y Brent a la cintilla (Yahoo Finance)
- [ ] Agregar ARS/MXN (peso argentino) a la cintilla
- [ ] Agregar COP/MXN (peso colombiano) a la cintilla
- [x] Actualizar tests unitarios para los nuevos datos

## Calculadora de Cambio de Divisas con Nota Legal
- [ ] Investigar límites legales SAT/CNBV/LFPIORPI para cambio de divisas en México
- [ ] Agregar calculadora interactiva de cambio de divisas al periódico
- [ ] Incluir nota legal sobre límites y tipo de cambio utilizado
- [ ] Terminar de agregar WTI/Brent y ARS/COP a la cintilla visual

## Rediseño Bloque de Artículos — 3 Tarjetas Primera Plana
- [x] Reemplazar artículo largo por 3 tarjetas estilo primera plana con titular, lead y "Leer más"
- [x] Botón "Leer más" lleva a la hemeroteca o al artículo individual

## Cintilla: WTI/Brent + ARS/COP
- [x] Conectar endpoint divisas.oil (WTI/Brent) a la cintilla visual
- [x] Conectar endpoint divisas.latam (ARS/MXN, COP/MXN) a la cintilla visual
- [x] Actualizar tests unitarios

## Cintilla: Precio del Oro XAU/USD
- [ ] Agregar endpoint divisas.gold (XAU/USD) con caché 15 min
- [ ] Mostrar XAU/USD en la cintilla visual con ícono 🥇

## Generación Automática de Artículo Diario
- [ ] Implementar endpoint newsArticles.generateDaily con LLM
- [ ] Buscar noticias reales del día con búsqueda web
- [ ] Guardar artículo generado en la base de datos
- [ ] Configurar tarea programada diaria (cron 8am CDMX)
- [ ] Notificar al propietario cuando se publique el artículo

## Fecha Real y Clima en Tiempo Real
- [ ] Corregir fecha de cabecera para mostrar siempre la fecha real del día (no la del artículo)
- [ ] Agregar endpoint weather con clima de Coyoacán (mañana/tarde/noche) usando Open-Meteo
- [x] Mostrar clima en el marquee superior y en la cabecera del periódico
- [ ] Actualización automática del clima cada hora

## Cintilla: Precio del Oro XAU/USD
- [ ] Agregar endpoint `divisas.gold` con caché de 15 min (Yahoo Finance GC=F)
- [ ] Mostrar XAU/USD 🥇 en la cintilla con variación del día

## Sesión 28 de Febrero 2026 — Completadas

- [x] Corregir parseSections() para manejar tanto JSON array como texto plano (programación defensiva)
- [x] Verificar artículo de gentrificación — ya muestra párrafos legibles sin JSON crudo
- [x] Agregar endpoint divisas.gold (XAU/USD) con caché 15 min (Yahoo Finance GC=F)
- [x] Mostrar XAU/USD en la cintilla visual con etiqueta "ORO" y variación del día
- [x] 59 tests pasan correctamente

## Corrección SEO: Meta Description Duplicada (Bing Webmaster Tools)
- [x] Diagnosticar dónde se duplica la meta description en el HTML generado
- [x] Eliminar la etiqueta meta description redundante (removidos del index.html: description, og:description, og:type, og:site_name, og:locale, og:url, og:title, twitter:card, twitter:site, canonical, hreflang)
- [x] Verificar que solo exista una meta description en el HTML final (confirmado: 1 de cada tipo)

## SEO: Agregar meta tags a páginas sin Helmet
- [x] Agregar Helmet con meta description completa a /noticias (Noticias.tsx) - description, keywords, og:*, twitter:*, canonical, ld+json
- [x] Agregar Helmet con meta description completa a /hemeroteca (Hemeroteca.tsx) - expandido con og:*, twitter:*, canonical, hreflang, keywords
- [x] Verificar Home.tsx y HospedajeMundial2026.tsx tienen description completa - OK

## SEO: Correcciones de título y H2 en página principal (/)
- [x] Acortar el título de la página principal a 30-60 caracteres: seoTitle (42 max) + ' | Diario Coyoacán' = 58-60 total
- [x] Acortar el H2 principal a 80 caracteres o menos: displayTitle truncado a 78 chars máximo

## SEO: Correcciones Bing Webmaster Tools (3 problemas)
- [ ] Error: Eliminar meta description duplicada (2 instancias) en index.html vs Helmet
- [ ] Aviso: Agregar atributo alt a 5 imágenes sin texto alternativo
- [ ] Aviso: Eliminar etiqueta canónica duplicada (3 instancias)

## Índice de Rayos UV en Tiempo Real
- [x] Agregar campo uv_index a la respuesta de la API de clima (Open-Meteo)
- [x] Mostrar índice UV en el marquee junto a la temperatura
- [x] Mostrar índice UV en la cabecera con etiqueta de nivel (Bajo/Moderado/Alto/Muy Alto/Extremo)

## Artículos 3 de marzo de 2026
- [x] Eclipse lunar / Luna de Sangre / Alineación planetaria (con imagen real 20Minutos/EFE)
- [x] Viviendas → hospedaje temporal por Mundial 2026 (con imagen real Xataka México)
- [x] Limpieza Canal Nacional Coyoacán - 9 toneladas (con imagen real La Prensa/OEM)
- [x] Bomberos rescatan 4 gatos en Coyoacán (con imagen real Escapada H/AlaCrítica)
- [x] Coyoacán vs franeleros - operativo trafitambos (con imagen real La Prensa/OEM)

## Optimización de Velocidad y Corrección Luna de Sangre
- [x] Implementar caché agresivo en servidor para divisas (USD, CAD, GBP, IPC, petróleo, LATAM, oro)
- [x] Implementar caché agresivo para clima/UV
- [x] Reducir tiempo de carga de 8s a menos de 1s (warm-up + background refresh cada 10 min)
- [x] Corregir artículo de Luna de Sangre que no aparece en portada (createdAt actualizado)

## Auditoría SEO - Conversión de Reservas
- [x] Auditar meta tags, structured data, Open Graph, sitemap y robots.txt
- [x] Auditar contenido de artículos: keywords, CTAs, enlaces internos y conversión
- [x] Comparar con mejores prácticas SEO para conversión hotelera
- [x] Generar informe SEO con hallazgos y recomendaciones accionables

## Correcciones SEO Críticas - 3 marzo 2026
- [x] R1: Componente CTA clicable de reserva dentro de cada artículo (automático en componente)
- [x] R2: Enlazado interno automático a /hospedaje-mundial-2026 desde artículos relevantes
- [x] R4: Lazy loading de imágenes (loading="lazy" + fetchpriority="high" para hero)

## Google Analytics 4 - 3 marzo 2026
- [x] Instalar script gtag.js con Measurement ID G-VSZ9P3M8P5
- [x] Configurar eventos de conversión: clic en reserva (CTA Lodgify), clic en Mundial 2026
- [x] Tracking de lectura de artículos (page_view automático por gtag config)

## Artículos 4 de marzo de 2026
- [x] Verificar artículos existentes para evitar repeticiones
- [x] Buscar noticias del 4 de marzo en fuentes prioritarias
- [x] Recopilar imágenes reales de reportajes con fuentes
- [x] Redactar 6 artículos periodísticos y publicar en BD
- [x] Enviar newsletter (enviado)

## Fix Open Graph para Facebook
- [x] Agregar og:image con URL de imagen del artículo principal en la página de inicio
- [x] Mejorar og:title y og:description para la página principal

## Fix UV Index nocturno
- [x] Corregir UV para mostrar valor de hora actual (no pico del día) - de noche debe ser 0 o no mostrarse
- [x] Mostrar UV siempre visible, con 'Sin riesgo' cuando UV es 0 (de noche)

## Reportajes 8 de marzo 2026
- [x] Investigar FILCO 2026 primer día (fuentes reales)
- [x] Investigar marcha 8M CDMX (fuentes reales)
- [x] Buscar/generar imágenes editoriales para ambos artículos
- [x] Redactar reportaje FILCO con fuentes citadas
- [x] Redactar reportaje 8M con fuentes citadas
- [x] Publicar ambos artículos en BD
- [x] Verificar artículos en el sitio

## Corrección: Reportajes 8 de marzo (rehacer con fotos reales de medios)
- [x] Borrar artículos repetidos/duplicados del 8 de marzo
- [x] Buscar noticias frescas del 8M y FILCO con fotos originales de medios
- [x] Descargar fotos reales de medios y subirlas a S3
- [x] Publicar reportajes nuevos con fotos reales y fuentes citadas

## Reemplazar artículo repetido FILCO con noticias frescas del 8 de marzo
- [x] Borrar artículo repetido de FILCO día 3 (ya teníamos "Arranca FILCO")
- [x] Buscar 2 noticias frescas del 8 de marzo CDMX/Coyoacán diferentes a las existentes
- [x] Obtener fotos reales y fuentes de las noticias
- [x] Publicar artículos nuevos en BD

## Bug: JSON crudo en artículo Abuela Mataperros
- [x] Corregir contentEs del artículo Abuela Mataperros - muestra JSON crudo en vez de contenido parseado
- [x] Corregir contentEs del artículo Socavón Estadio Azteca (mismo problema de comillas sin escapar)

## Artículos 9 de marzo 2026
- [x] Buscar fotos reales de: FILCO día 4, acoso niña Coyoacán, choque Calzada de Tlalpan
- [x] Subir fotos a S3
- [x] Redactar y publicar artículo FILCO día 4 (Sicilia/Dayán/novela negra)
- [x] Redactar y publicar artículo acoso a niña en Coyoacán
- [x] Redactar y publicar artículo choque mortal Calzada de Tlalpan
- [x] Verificar artículos en el sitio

## Serie Vive Latino 2026 - SEO para hospedaje
- [x] Investigar Vive Latino 2026: fechas, cartel, cobertura medios/YouTubers/influencers
- [x] Buscar fotos reales del evento de medios y redes
- [x] Redactar 4 reportajes con SEO agresivo para hospedaje cerca del Estadio GNP/Coyoacán
- [x] Insertar artículos en BD con keywords de hospedaje y CTAs de SúperAnfitrión
- [x] Verificar artículos y SEO en el sitio

## Artículo noticioso Vive Latino 2026 (fecha 11 marzo)
- [x] Nota periodística principal: Vive Latino 2026 guía definitiva - cartel, horarios, precios, transporte, hospedaje Coyoacán

## Artículos de seguimiento Vive Latino 2026 (11-13 marzo)
- [x] Artículo perfil Lenny Kravitz: Blue Electric Light tour, datos curiosos, setlist probable, hospedaje Coyoacán
- [x] Artículo cancelaciones Mars Volta/Moby + Steve Aoki + firma autógrafos + Música Pa Mandar a Volar Vol. 2
- [x] Artículo Fabulosos Cadillacs + Maldita Vecindad + guía de supervivencia del festival
- [x] Tip sutil de cuidar celular/pertenencias incluido en todos los artículos
- [x] Contenido bilingüe (ES/EN) en todos los artículos
- [x] CTAs inline de hospedaje SúperAnfitrión en todos los artículos
- [x] Fuentes citadas en todos los artículos (Chilango, Indie Rocks, El Financiero, El Economista, Sopitas, etc.)

## Bug: Botones que ya estaban programados desaparecieron
- [x] Diagnosticar qué botones se perdieron — RESULTADO: Los botones NO se perdieron, el slug del artículo cambió de 'vive-latino-2026-guia-definitiva-festival-cdmx-hospedaje-coyoacan' a 'vive-latino-2026-guia-completa-cartel-horarios-hospedaje-cdmx'
- [x] Verificar que todos los CTAs funcionan correctamente (Comprar Boletos, FAQs, Reservar Hospedaje, Ver Alojamientos)

## Bug: URL de reservaciones Lodgify rota (Error 444)
- [x] Encontrar la URL correcta de reservaciones en Lodgify (la URL completa funciona, el problema era URLs truncadas a /es/)
- [x] Actualizar URL en todos los artículos de la BD (5 artículos corregidos: Lenny Kravitz, Mars Volta, Cadillacs, Feria Mezcal, Domingos Alternativos)
- [x] Verificar URLs en código fuente (todas las URLs en .tsx y .ts ya apuntaban a la URL correcta completa)
- [x] Verificar que la liga funciona correctamente en el sitio

## Artículo Día de San Patricio 2026 + Batallón de San Patricio
- [x] Investigar desfile de San Patricio 2026 en CDMX (YouTube, DondeIr, El Universal)
- [x] Investigar historia del Batallón de San Patricio y Museo de las Intervenciones (Smithsonian, LA Times)
- [x] Buscar imágenes relevantes y subirlas a CDN
- [x] Redactar artículo periodístico bilingüe con vinculación a hospedaje Coyoacán (9 secciones)
- [x] Insertar artículo en la BD
- [x] Verificar renderizado con CTAs de hospedaje funcionando

## Cambio de estrategia: de diario a semanal
- [x] Publicar artículo de San Patricio 2026 (último artículo del ritmo diario)
- [x] Replantear estrategia: skill actualizada a batch semanal de 3-5 reportajes con imágenes reales y fuentes citadas
- NOTA: Los artículos del Vive Latino no generaron consultas de hospedaje. El SEO orgánico necesita tiempo (3-6 meses). Cambio a reportajes semanales más sustanciosos con keywords de cola larga.

## Bug SEO: Google Search Console - "Página alternativa con etiqueta canónica adecuada"
- [x] Diagnosticar qué página no se indexa — middleware de crawlers no manejaba URLs con ?slug= (query params), solo /diario/slug (path)
- [x] Corregir middleware servidor: ahora detecta ?slug= y genera canonical correcto para cada artículo
- [x] Agregar canonical específico para cada página estática (/, /noticias, /hemeroteca, /hospedaje-mundial-2026, /en)
- [x] Verificar con curl + Googlebot UA que todas las páginas devuelven canonical correcto

## Actualizar skill diario-coyoacan-generator a formato semanal
- [x] Leer skill actual y entender estructura (SKILL.md, journalistic_style.md, article_example.md, generate_article.py)
- [x] Cambiar formato: de 1 artículo diario corto a 3-5 reportajes semanales por batch, cada uno 600-900 palabras
- [x] Actualizar guía de estilo: tono investigativo con fuentes citadas, imágenes reales (no IA), SEO pesado
- [x] Actualizar ejemplo de artículo con formato correcto de CTA y fuentes
- [x] No publicar artículos hasta indicación del usuario la próxima semana

## Batch semanal: Semana Santa 2026 en CDMX (25 marzo)
- [x] Investigar Pasión de Iztapalapa 2026: fechas, programa, novedades, cómo llegar desde Coyoacán
- [x] Investigar otros eventos de Semana Santa 2026 en CDMX (museos, ferias, actividades)
- [x] Buscar imágenes reales de eventos y subirlas a CDN
- [x] Redactar 4 reportajes con SEO pesado y fuentes citadas
- [x] Insertar artículos en BD con CTAs de hospedaje
- [x] Verificar renderizado y guardar checkpoint

## Problema Crítico: Velocidad de Carga (31 marzo 2026)
- [x] Diagnosticar causa de lentitud (APIs externas sin timeout, payload de 74KB, carga bloqueante)
- [x] Agregar fetchWithTimeout de 5s a TODAS las APIs externas (Yahoo Finance, frankfurter, open-meteo)
- [x] Reducir payload de articles.list: de 74KB a 40KB (eliminados dateEs/dateEn/createdAt, límite 30 artículos)
- [x] Hacer carga no-bloqueante: divisas/clima se cargan en background, solo artículos bloquean la UI
- [x] Aplicar lazy loading a rutas secundarias (Hemeroteca, Noticias, Mundial, AdminNewsletter, WorldCup2026En)
- [x] Reiniciar servidor y verificar mejora: todas las APIs responden en <20ms (cache warm-up funciona)

## Batch semanal: Pascua y eventos CDMX/Coyoacán (5-12 abril 2026)
- [ ] Investigar eventos de Pascua 2026 en CDMX y Coyoacán (ferias, actividades, museos)
- [ ] Investigar festejos y festivales de abril en CDMX (Feria de las Flores, Festival de Cine, etc.)
- [ ] Buscar imágenes reales de eventos y subirlas a CDN
- [ ] Redactar 3-5 reportajes con SEO pesado y fuentes citadas
- [ ] Insertar artículos en BD con CTAs de hospedaje
- [x] Verificar renderizado y guardar checkpoint

## Batch: Artículos nuevos - Luchas libres Juan de la Barrera y eventos frescos
- [x] Investigar luchas libres AAA en Gimnasio Juan de la Barrera (11 abril 2026: Penta vs Vikingo, La Catalina debut)
- [x] Investigar otros eventos frescos en CDMX/Coyoacán (Slow Art Day, Kati Horna, listening parties)
- [x] Buscar imágenes reales y subirlas a CDN (3 imágenes subidas)
- [x] Redactar 3 artículos: Penta/AAA, Gimnasio Juan de la Barrera, Qué hacer CDMX fin de semana
- [x] Insertar artículos en BD (newsArticles IDs 90001-90003)
- [x] Crear página de detalle para newsArticles (NewsArticleDetail.tsx)
- [x] Unificar Noticias.tsx para mostrar articles + newsArticles juntos (36 artículos total)
- [x] Verificar renderizado y guardar checkpoint

## Poner artículos nuevos de lucha libre en la portada principal
- [x] Hacer que la portada muestre los newsArticles nuevos como artículo principal
- [x] Bajar los artículos viejos (Semana Santa) de la primera plana
- [x] Verificar renderizado y guardar checkpoint

## Artículo de última hora - Acontecimientos Coyoacán (22 abril 2026)
- [x] Investigar noticias: telescopios+cerveza+terror, CCXP MX (Aaron Paul), Leonora Carrington, Fiesta del Libro UNAM, 31 Minutos Zócalo, Carrillo Gil
- [x] Buscar imágenes reales con créditos: Chilango, CCXP México, Caras, Milenio, DóndeIr, MACG/INBAL
- [x] Redactar artículo mega-SEO con 6 secciones, slug largo, fuentes citadas y CTAs agresivos
- [x] Insertar artículo en BD (newsArticle ID 120001) y verificar en portada
- [x] Verificar renderizado y guardar checkpoint

## Rediseño profesional del Diario Coyoacán (igualar calidad del blog superanfitrion.com)
- [x] Rediseñar NewsArticleDetail.tsx: layout 2 columnas, imágenes con créditos, CTAs de hospedaje integrados
- [x] Agregar botones de compartir (WhatsApp, Facebook, X/Twitter, Copiar enlace)
- [x] Agregar sidebar sticky con banner de reserva directa, 7 propiedades con precios y ratings
- [x] Mejorar tipografía (Playfair Display), espaciado y jerarquía visual profesional
- [x] Agregar breadcrumbs (Inicio > Noticias > título) + header con Portada/Noticias/Reservar
- [x] Agregar tiempo de lectura, artículos relacionados, CTA móvil, footer de 3 columnas
- [x] Verificar renderizado y guardar checkpoint

## Rediseño profesional de la página de inicio (Home/Portada)
- [x] Rediseñar DiarioCoyoacan.tsx con el mismo estilo profesional que NewsArticleDetail
- [x] Implementar layout 2 columnas con sidebar sticky de propiedades (ReservaSidebar reutilizable)
- [x] Header y footer consistentes con la vista de artículos (4 columnas)
- [x] Tipografía Playfair Display, colores amber, diseño limpio con Tailwind CSS
- [x] Mantener ticker de divisas, clima, newsletter, agenda del barrio, efeméride
- [x] Artículo principal grande + 4 secundarios en grid 2 columnas
- [x] CTA banner de hospedaje + CTA móvil
- [x] Verificar renderizado responsive y ejecutar tests (59 tests passed)

## Mejoras aprobadas: Hemeroteca, Modo Oscuro, Paginación Infinita
- [ ] Rediseñar Hemeroteca con el mismo estilo profesional (header, sidebar, footer consistentes)
- [ ] Implementar modo oscuro con toggle en el header
- [ ] Implementar paginación infinita en grid de artículos secundarios

## Banner de Alerta CDMX en Sidebar
- [ ] Agregar banner de alerta amarilla en el sidebar con enlace a superanfitrion.com/aviso-cdmx
- [ ] Mostrar que SúperAnfitrión se preocupa por la seguridad y salud de los huéspedes
- [ ] Integrar en el componente ReservaSidebar compartido (DiarioCoyoacan + NewsArticleDetail)

## Noticia Semanal: Coyoacán explota (semana 23-30 abril 2026) — Diario Coyoacán
- [ ] Publicar crónica periodística en pasado: telescopios, CCXP, Leonora Carrington, Fiesta del Libro, 31 Minutos
- [ ] Imágenes reales con créditos: Reuters/Raquel Cunha, Infobae, UNAM, Chilango, CDMX Secreta
- [ ] SEO completo: schema.org NewsArticle, meta description, keywords long-tail, H1/H2/H3 semántico
- [ ] CTAs de conversión a reservas integrados naturalmente en el contenido
- [ ] Script de inserción directa en base de datos

## SEO: Sitemap.xml dinámico mejorado
- [x] Corregir URLs de newsArticles en sitemap.xml de /diario?slug= a /noticias/{slug}
- [x] Corregir sitemap-news.xml para usar createdAt en lugar de date (campo date en formato español)
- [x] Ampliar ventana de sitemap-news.xml de 2 a 30 días para incluir más noticias recientes
- [x] Verificar: sitemap.xml con 77 URLs, sitemap-news.xml con 5 noticias recientes en /noticias/{slug}
- [x] 59 tests pasando correctamente

## Rediseño profesional de la Hemeroteca
- [ ] Reescribir Hemeroteca.tsx con header/footer/sidebar idénticos a DiarioCoyoacan y NewsArticleDetail
- [ ] Importar ReservaSidebar compartido (con alerta CDMX y propiedades)
- [ ] Grid de artículos moderno: tarjetas con imagen, categoría, fecha, extracto y CTA
- [ ] Filtros por categoría y búsqueda con el mismo estilo visual
- [ ] Verificar renderizado y ejecutar tests

## Rediseño profesional de la Hemeroteca

- [x] Leer Hemeroteca.tsx actual y componentes compartidos (ReservaSidebar)
- [x] Reescribir Hemeroteca.tsx con header idéntico a DiarioCoyoacan (Playfair Display, nav: Portada/Noticias/Hemeroteca resaltada/Mundial 2026/Reservar)
- [x] Sub-header con fecha y contador de artículos en el archivo
- [x] Breadcrumbs (Inicio > Hemeroteca)
- [x] Barra de búsqueda + filtros por categoría (9 categorías)
- [x] Grid 2 columnas con tarjetas: imagen, categoría, badge Noticia, fecha, tiempo de lectura, título Playfair, resumen, CTA
- [x] Paginación "Cargar más" (12 artículos por página, 38 artículos totales)
- [x] Sidebar sticky con alerta CDMX + propiedades (ReservaSidebar compartido)
- [x] Bloque SEO al final del contenido con enlace a reservas
- [x] Footer de 4 columnas idéntico a DiarioCoyoacan
- [x] 59 tests pasando, sin errores TypeScript

## Rediseño: Página Mundial 2026 — Álbum Panini Digital

- [ ] Investigar clasificados, grupos, sedes, noticias más relevantes del Mundial 2026 hasta hoy
- [ ] Rediseñar la página como álbum Panini digital: selecciones con escudos, grupos, estadios, jugadores estrella
- [ ] Noticias más relevantes del torneo hasta la fecha
- [ ] CTAs de conversión a reservas en Coyoacán para visitantes del Mundial
- [ ] SEO completo: schema.org SportsEvent, meta tags, keywords long-tail
- [x] Verificar renderizado y guardar checkpoint

## Sección: Atractivos turísticos y culturales cerca del Estadio Azteca
- [ ] Investigar atractivos reales con datos verificados (distancia, horarios, precios)
- [ ] Implementar sección visual en HospedajeMundial2026.tsx con tarjetas tipo guía
- [ ] Incluir sitios poco conocidos/locales además de los obvios
- [ ] CTAs de conversión integrados naturalmente
- [ ] Guardar checkpoint

## Bugs móvil reportados (4 mayo 2026)

- [ ] Agregar menú hamburguesa en el header para pantallas pequeñas (todas las páginas)
- [ ] Corregir ticker de divisas que se solapa con la barra de búsqueda del navegador en móvil

## Fix SEO: Redirects 301 para Google Search Console (5 mayo 2026)

- [x] Agregar redirect 301 de `/diario?slug=X` → `/noticias/X` en el servidor Express
- [x] Verificar redirect: HTTP 301 confirmado con curl (slug → /noticias/{slug}, sin slug → /)
- [x] Guardar checkpoint

## Fix: Banner Alerta CDMX sin salida (5 mayo 2026)

- [x] Agregar links de salida en el banner de alerta: Protección Civil CDMX, aviso completo SúperAnfitrión, 911
- [x] Agregar mini-nav (Portada, Noticias, Hemeroteca, Mundial 2026) dentro del banner de alerta CDMX
- [x] Verificar renderizado y guardar checkpoint
