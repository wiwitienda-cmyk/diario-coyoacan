# Sistema de Automatización Diaria - Diario Coyoacán

## ✅ Implementación Completada

### 1. Ejecución Exitosa del Sistema
**Fecha de prueba**: 14 de febrero de 2026, 5:01 PM

**Artículo generado**:
- **Título**: "Vecinos de Coyoacán Exigen Mejoras Urbanas; Preocupación por Canales de Xochimilco"
- **Slug**: `vecinos-de-coyoacan-exigen-mejoras-urbanas-preocupacion-por-canales-de-xochimilc-2026-02-14`
- **Categoría**: COMUNIDAD
- **Fecha**: Viernes, 14 de febrero de 2026

**Fuentes citadas**:
- La Jornada (13 de febrero de 2026)
- El Proceso (10 de febrero de 2026)
- El Universal (12 de febrero de 2026)

**Imagen generada**:
- URL: `https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/diario-coyoacan/articles/vecinos-de-coyoacan-exigen-mejoras-urbanas-preocupacion-por-canales-de-xochimilc-2026-02-14-1np5xacp.png`
- Descripción: Muro agrietado con grafiti reflejando canal contaminado de Xochimilco
- Estilo: Editorial, subjetivo, atmosférico

**Newsletter**:
- ✅ Enviado exitosamente a todos los suscriptores

---

## 📋 Componentes del Sistema

### 1. Script de Automatización
**Ubicación**: `/home/ubuntu/cafe-avellaneda/scripts/daily-article-automation.mjs`

**Funcionalidades**:
1. Determina el tema del día según el día de la semana
2. Busca noticias recientes de fuentes prioritarias
3. Genera artículo periodístico con LLM (invokeLLM)
4. Genera imagen subjetiva editorial con DALL-E (generateImage)
5. Sube imagen a S3 con URL no enumerable
6. Publica artículo en base de datos MySQL
7. Envía newsletter automáticamente a suscriptores

**Tiempo de ejecución**: ~3-4 minutos

### 2. Cron Job Configurado
- **Horario**: 7:00 AM todos los días
- **Comando**: `cd /home/ubuntu/cafe-avellaneda && npx tsx scripts/daily-article-automation.mjs`
- **Estado**: Activo y listo para ejecución automática

### 3. Skill Actualizado
**Ubicación**: `/home/ubuntu/skills/diario-coyoacan-generator/SKILL.md`

**Mejoras implementadas**:
- Fuentes periodísticas prioritarias (La Jornada, El Universal, El Proceso)
- Estrategia SEO Mundial 2026
- Guía de imágenes subjetivas "bajo la lupa"
- Formato de citas: "reportó [Fuente] el [fecha]"

### 4. Estrategia SEO Mundial 2026
**Implementación**:
- Todos los artículos incluyen mención del Mundial 2026
- Keywords integradas: Mundial 2026, Coyoacán hospedaje Mundial, alojamiento Mundial 2026
- Sección publicitaria verde con ⚽ después del contenido
- Contexto en prompts del LLM para conectar cualquier tema con el Mundial

---

## 🎯 Temas por Día de la Semana

| Día | Tema | Enfoque |
|-----|------|---------|
| Lunes | Noticias principales | Eventos más importantes de la semana |
| Martes | Cultura y gastronomía | Restaurantes, cafés, arte, música |
| Miércoles | Patrimonio y conservación | Historia, arquitectura, monumentos |
| Jueves | Seguridad y servicios | Policía, bomberos, servicios públicos |
| Viernes | Eventos culturales | Conciertos, exposiciones, festivales |
| Sábado | Comunidad y sociedad | Vecinos, organizaciones, iniciativas |
| Domingo | Eventos de fin de semana | Actividades, mercados, paseos |

---

## 📰 Fuentes Periodísticas Prioritarias

### Primarias (SIEMPRE buscar primero)
1. **La Jornada** (jornada.com.mx) - Perspectiva pro-4T, izquierda
2. **El Universal** (eluniversal.com.mx) - Mainstream, centro
3. **El Proceso** (proceso.com.mx) - Periodismo investigativo, crítico

### Secundarias (Complementarias)
4. SinEmbargo (sinembargo.mx) - Periodismo independiente
5. Aristegui Noticias (aristeguinoticias.com) - Análisis político
6. Publimetro (publimetro.com.mx) - Noticias locales
7. La Prensa (la-prensa.com.mx) - Popular
8. Milenio (milenio.com) - Nacional

### Influencers Pro-4T (Redes Sociales)
- John Ackerman (@JohnMAckerman)
- Epigmenio Ibarra (@epigmenioibarra)
- Beatriz Gutiérrez Müller (@BeatrizGMuller)

---

## 🎨 Guía de Imágenes Subjetivas "Bajo la Lupa"

### Características Clave
- **Perspectiva**: Subjetiva, NO documental
- **Estilo**: Artístico, atmosférico, simbólico
- **Composición**: Close-up, enfoque selectivo, detalles evocativos
- **Técnica**: Iluminación dramática, sombras fuertes, contraste alto
- **Mood**: Melancólico, nostálgico, crítico, esperanzador

### Ejemplos de Prompts
- "Close-up de un balón de fútbol viejo en calle mojada, pie de niño, sombras dramáticas"
- "Muro agrietado con grafiti reflejando canal contaminado, planta luchando por crecer"
- "Detalle de manos arrugadas sosteniendo periódico, luz de ventana, blanco y negro"

### Lo que NO hacer
- ❌ Imágenes genéricas de stock
- ❌ Perspectiva documental objetiva
- ❌ Colores saturados y brillantes
- ❌ Composiciones centradas y simétricas
- ❌ Imágenes literales del tema

---

## 📊 Verificación de Funcionamiento

### Base de Datos
```sql
SELECT id, slug, headlineEs, dateEs, categoryEs 
FROM articles 
ORDER BY createdAt DESC 
LIMIT 1;
```

**Resultado**:
- ✅ Artículo guardado correctamente
- ✅ Todos los campos poblados
- ✅ Imagen URL válida

### Logs del Sistema
```bash
cd /home/ubuntu/cafe-avellaneda
npx tsx scripts/daily-article-automation.mjs
```

**Salida**:
```
🚀 Starting daily article automation...
📅 Today's theme: Community & society (Comunidad)
🔍 Searching for news...
✅ Found 4 news items
📝 Generating journalistic article...
✅ Article generated
🎨 Generating subjective editorial image...
✅ Image uploaded
💾 Publishing article to database...
✅ Article published successfully
📧 Sending newsletter to subscribers...
✅ Newsletter sent successfully
✅ Daily automation completed successfully!
```

### Newsletter
- ✅ Enviado a todos los suscriptores
- ✅ Formato HTML responsive
- ✅ Imagen hero incluida
- ✅ Link al artículo completo

---

## 🔧 Troubleshooting

### Problema: No se encuentran noticias
**Solución**: Ampliar rango de fechas o buscar temas más amplios

### Problema: Artículo muy corto
**Solución**: Aumentar max_tokens en llamada a invokeLLM

### Problema: Tono no periodístico
**Solución**: Reforzar system prompt con énfasis en "reportero de periódico"

### Problema: Fuentes no citadas
**Solución**: Verificar que el prompt requiera explícitamente citas

### Problema: Imagen muy documental
**Solución**: Enfatizar perspectiva subjetiva/editorial en prompt

---

## 📝 Próximos Pasos Recomendados

1. **Monitoreo de calidad**: Revisar artículos generados durante la primera semana
2. **Ajuste de prompts**: Refinar system prompts basándose en resultados
3. **A/B testing de CTAs**: Probar diferentes mensajes del Mundial 2026
4. **Dashboard de métricas**: Implementar panel de estadísticas
5. **Backup automático**: Configurar respaldo de artículos publicados

---

## 📧 Contacto y Soporte

Para cualquier problema con el sistema de automatización:
1. Revisar logs en `/home/ubuntu/cafe-avellaneda/.manus-logs/`
2. Ejecutar manualmente el script para debugging
3. Verificar conexión a base de datos
4. Confirmar que las variables de entorno estén configuradas

**Última actualización**: 14 de febrero de 2026
