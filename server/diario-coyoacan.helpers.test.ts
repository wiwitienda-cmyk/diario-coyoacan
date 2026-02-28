/**
 * Tests unitarios para las funciones auxiliares del componente DiarioCoyoacan.
 * Estas funciones se replican aquí para poder testearlas en el entorno de Node.js
 * sin necesidad de montar el componente React completo.
 */
import { describe, it, expect } from 'vitest';

// ─── Réplicas de las funciones auxiliares del componente ─────────────────────

function parseSections(raw: string): string[] {
  return raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !s.startsWith('---') && !s.startsWith('**Fuentes') && !s.startsWith('Fuentes:'));
}

function extractPullQuote(paragraphs: string[]): string {
  for (const p of paragraphs) {
    const match = p.match(/"([^"]{40,150})"/);
    if (match) return match[1];
  }
  const first = paragraphs.find((p) => p.length > 120);
  if (first) {
    const sentences = first.split(/(?<=[.!?])\s+/);
    if (sentences[1] && sentences[1].length > 40) return sentences[1].substring(0, 150);
  }
  return paragraphs[0]?.substring(0, 130) || '';
}

function getEditionNumber(dateStr: string): string {
  let d: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    d = new Date(dateStr + 'T12:00:00');
  } else {
    d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      const meses: Record<string, number> = {
        enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
        julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
      };
      const match = dateStr.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
      if (match) {
        const day = parseInt(match[1], 10);
        const month = meses[match[2].toLowerCase()] ?? 0;
        const year = parseInt(match[3], 10);
        d = new Date(year, month, day, 12, 0, 0);
      } else {
        return '001';
      }
    }
  }
  if (isNaN(d.getTime())) return '001';
  const start = new Date('2026-01-01');
  const diff = Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return String(Math.max(1, diff + 1)).padStart(3, '0');
}

function formatDateEs(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  const d = new Date(dateStr + 'T12:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getContextualAd(category: string, title: string): { headline: string; body: string; cta: string; url: string } {
  const lower = (category + ' ' + title).toLowerCase();
  if (lower.includes('mundial') || lower.includes('fútbol') || lower.includes('futbol')) {
    return {
      headline: 'Asegura tu lugar para el Mundial 2026',
      body: 'SúperAnfitrión Coyoacán tiene disponibilidad para junio y julio con tarifas directas, sin comisiones de plataforma y con factura incluida. A 20–25 minutos del Estadio Azteca.',
      cta: 'Reservar para el Mundial →',
      url: 'https://superanfitrion.com.mx/mundial-2026',
    };
  }
  if (lower.includes('gentrificaci') || lower.includes('vivienda') || lower.includes('vecin')) {
    return {
      headline: 'Hospédate con quienes conocen el barrio',
      body: 'Antes de que se acaben los lugares. SúperAnfitrión Coyoacán ofrece hospedaje directo con anfitriones locales, no con corporativos. Reserva sin intermediarios.',
      cta: 'Reservar directo →',
      url: 'https://superanfitrion.com.mx',
    };
  }
  if (lower.includes('festival') || lower.includes('feria') || lower.includes('cultura') || lower.includes('arte')) {
    return {
      headline: 'Vive el festival desde adentro del barrio',
      body: 'SúperAnfitrión Coyoacán tiene alojamientos auténticos a pasos del Jardín Centenario. WiFi de alta velocidad, sin hoteles, sin clichés.',
      cta: 'Ver alojamientos →',
      url: 'https://superanfitrion.com.mx',
    };
  }
  return {
    headline: 'Hospédate en el corazón de Coyoacán',
    body: 'Alojamientos auténticos en el barrio más bonito de México. Reserva directa sin comisiones. Anfitriones locales que conocen cada rincón de Coyoacán.',
    cta: 'Ver disponibilidad →',
    url: 'https://superanfitrion.com.mx',
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('parseSections', () => {
  it('divide el contenido por punto y coma', () => {
    const raw = 'Párrafo uno; Párrafo dos; Párrafo tres';
    const result = parseSections(raw);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe('Párrafo uno');
    expect(result[2]).toBe('Párrafo tres');
  });

  it('filtra líneas de separador y fuentes', () => {
    const raw = 'Párrafo uno; --- separador; **Fuentes: El Universal; Párrafo dos; Fuentes: La Jornada';
    const result = parseSections(raw);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('Párrafo uno');
    expect(result[1]).toBe('Párrafo dos');
  });

  it('filtra cadenas vacías', () => {
    const raw = 'Párrafo uno;;; Párrafo dos';
    const result = parseSections(raw);
    expect(result).toHaveLength(2);
  });

  it('devuelve array vacío para cadena vacía', () => {
    expect(parseSections('')).toHaveLength(0);
  });
});

describe('extractPullQuote', () => {
  it('extrae cita directa entre comillas dobles de longitud adecuada', () => {
    const paragraphs = [
      'Texto introductorio corto.',
      'El alcalde declaró "Este proyecto transformará completamente la vida de los vecinos de Coyoacán en los próximos años" durante la inauguración.',
    ];
    const result = extractPullQuote(paragraphs);
    expect(result).toBe('Este proyecto transformará completamente la vida de los vecinos de Coyoacán en los próximos años');
  });

  it('no extrae citas demasiado cortas (menos de 40 chars)', () => {
    const paragraphs = [
      'El alcalde dijo "Bien hecho" y se fue.',
      'Este es un párrafo mucho más largo que supera los ciento veinte caracteres para que pueda ser considerado como candidato para el pull quote del artículo periodístico. La segunda oración también es bastante larga para cumplir con el requisito mínimo de cuarenta caracteres.',
    ];
    const result = extractPullQuote(paragraphs);
    // Debe caer al fallback de segunda oración
    expect(result.length).toBeGreaterThan(40);
  });

  it('devuelve el primer párrafo truncado si no hay citas ni párrafos largos', () => {
    const paragraphs = ['Texto corto sin citas.'];
    const result = extractPullQuote(paragraphs);
    expect(result).toBe('Texto corto sin citas.');
  });

  it('devuelve cadena vacía para array vacío', () => {
    expect(extractPullQuote([])).toBe('');
  });
});

describe('getEditionNumber', () => {
  it('calcula correctamente el número para formato ISO', () => {
    // 2026-01-01 → edición 001
    expect(getEditionNumber('2026-01-01')).toBe('001');
    // 2026-01-02 → edición 002
    expect(getEditionNumber('2026-01-02')).toBe('002');
    // 2026-02-24 → edición 055 (31 días enero + 24 días febrero = 55)
    expect(getEditionNumber('2026-02-24')).toBe('055');
  });

  it('calcula correctamente para texto largo en español', () => {
    // "24 de febrero de 2026" → edición 055
    expect(getEditionNumber('Lunes, 24 de febrero de 2026')).toBe('055');
    expect(getEditionNumber('15 de febrero de 2026')).toBe('046');
  });

  it('devuelve 001 para fechas inválidas', () => {
    expect(getEditionNumber('fecha-invalida')).toBe('001');
    expect(getEditionNumber('')).toBe('001');
  });

  it('el número tiene siempre 3 dígitos con padding', () => {
    const num = getEditionNumber('2026-01-05');
    expect(num).toMatch(/^\d{3}$/);
    expect(num).toBe('005');
  });
});

describe('formatDateEs', () => {
  it('devuelve el texto tal cual si ya está en formato largo', () => {
    const longDate = 'Lunes, 24 de febrero de 2026';
    expect(formatDateEs(longDate)).toBe(longDate);
  });

  it('devuelve el texto tal cual para cualquier formato no-ISO', () => {
    const textDate = 'Domingo, 15 de febrero de 2026';
    expect(formatDateEs(textDate)).toBe(textDate);
  });

  it('formatea correctamente una fecha ISO', () => {
    const result = formatDateEs('2026-02-24');
    // Debe contener "febrero" y "2026"
    expect(result.toLowerCase()).toContain('febrero');
    expect(result).toContain('2026');
  });

  it('devuelve el string original si la fecha ISO es inválida', () => {
    expect(formatDateEs('2026-99-99')).toBe('2026-99-99');
  });
});

describe('getContextualAd', () => {
  it('devuelve anuncio del Mundial para artículos sobre fútbol', () => {
    const ad = getContextualAd('Deportes', 'Coyoacán se prepara para el Mundial 2026');
    expect(ad.headline).toContain('Mundial 2026');
    expect(ad.url).toContain('mundial-2026');
  });

  it('devuelve anuncio de vecinos para artículos sobre vivienda', () => {
    const ad = getContextualAd('Sociedad', 'Gentrificación en Coyoacán preocupa a vecinos');
    expect(ad.headline).toContain('barrio');
  });

  it('devuelve anuncio de festival para artículos culturales', () => {
    const ad = getContextualAd('Cultura', 'Festival de Jazz en el Jardín Centenario');
    expect(ad.headline).toContain('festival');
  });

  it('devuelve anuncio genérico para otros temas', () => {
    const ad = getContextualAd('Gobierno Local', 'Obras en la alcaldía de Coyoacán');
    expect(ad.headline).toContain('corazón de Coyoacán');
    expect(ad.url).toBe('https://superanfitrion.com.mx');
  });

  it('el anuncio siempre tiene headline, body, cta y url', () => {
    const ad = getContextualAd('Cualquier categoría', 'Cualquier título');
    expect(ad.headline).toBeTruthy();
    expect(ad.body).toBeTruthy();
    expect(ad.cta).toBeTruthy();
    expect(ad.url).toContain('superanfitrion.com.mx');
  });
});
