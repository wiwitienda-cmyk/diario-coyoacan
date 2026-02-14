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
