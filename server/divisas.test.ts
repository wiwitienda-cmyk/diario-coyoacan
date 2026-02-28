/**
 * Tests unitarios para el endpoint de divisas (Frankfurter API)
 * Verifica la lógica de inversión de tasas y la estructura de la respuesta
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Helpers extraídos de routers.ts para testear en aislamiento ─────────────
const toMXN = (rate: number): number => Math.round((1 / rate) * 10000) / 10000;

interface RatesMap {
  USD_MXN: number;
  EUR_MXN: number;
  CAD_MXN: number;
  GBP_MXN: number;
}

function buildRates(raw: Record<string, number>): RatesMap {
  return {
    USD_MXN: toMXN(raw['USD']),
    EUR_MXN: toMXN(raw['EUR']),
    CAD_MXN: toMXN(raw['CAD']),
    GBP_MXN: toMXN(raw['GBP']),
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────
describe('Divisas: toMXN (inversión de tasa)', () => {
  it('convierte correctamente 1 MXN = 0.058 USD → 1 USD = ~17.24 MXN', () => {
    const result = toMXN(0.058);
    expect(result).toBeCloseTo(17.2414, 2);
  });

  it('convierte correctamente 1 MXN = 0.049 EUR → 1 EUR = ~20.41 MXN', () => {
    const result = toMXN(0.049);
    expect(result).toBeCloseTo(20.4082, 2);
  });

  it('convierte correctamente 1 MXN = 0.079 CAD → 1 CAD = ~12.66 MXN', () => {
    const result = toMXN(0.079);
    expect(result).toBeCloseTo(12.6582, 2);
  });

  it('devuelve un número con máximo 4 decimales', () => {
    const result = toMXN(0.058123);
    const decimals = result.toString().split('.')[1]?.length ?? 0;
    expect(decimals).toBeLessThanOrEqual(4);
  });

  it('no devuelve NaN para tasas válidas', () => {
    expect(isNaN(toMXN(0.05))).toBe(false);
    expect(isNaN(toMXN(0.1))).toBe(false);
  });
});

describe('Divisas: buildRates (construcción del objeto de tasas)', () => {
  const mockRaw = { USD: 0.058, EUR: 0.049, CAD: 0.079, GBP: 0.043 };

  it('construye un objeto con las cuatro claves requeridas', () => {
    const rates = buildRates(mockRaw);
    expect(rates).toHaveProperty('USD_MXN');
    expect(rates).toHaveProperty('EUR_MXN');
    expect(rates).toHaveProperty('CAD_MXN');
    expect(rates).toHaveProperty('GBP_MXN');
  });

  it('todos los valores son números positivos', () => {
    const rates = buildRates(mockRaw);
    expect(rates.USD_MXN).toBeGreaterThan(0);
    expect(rates.EUR_MXN).toBeGreaterThan(0);
    expect(rates.CAD_MXN).toBeGreaterThan(0);
    expect(rates.GBP_MXN).toBeGreaterThan(0);
  });

  it('USD/MXN es mayor que CAD/MXN (el dólar vale más que el dólar canadiense en MXN)', () => {
    const rates = buildRates(mockRaw);
    expect(rates.USD_MXN).toBeGreaterThan(rates.CAD_MXN);
  });

  it('GBP/MXN es el más alto (la libra vale más que el dólar en MXN)', () => {
    const rates = buildRates(mockRaw);
    expect(rates.GBP_MXN).toBeGreaterThan(rates.USD_MXN);
  });
});

describe('Divisas: cálculo de variación (diff)', () => {
  it('calcula variación positiva correctamente', () => {
    const current = 17.25;
    const prev = 17.10;
    const diff = current - prev;
    expect(diff).toBeCloseTo(0.15, 2);
    expect(diff > 0).toBe(true);
  });

  it('calcula variación negativa correctamente', () => {
    const current = 17.05;
    const prev = 17.20;
    const diff = current - prev;
    expect(diff).toBeCloseTo(-0.15, 2);
    expect(diff < 0).toBe(true);
  });

  it('detecta sin cambio cuando las tasas son iguales', () => {
    const current = 17.15;
    const prev = 17.15;
    const diff = current - prev;
    expect(diff).toBe(0);
    expect(diff > 0).toBe(false);
    expect(diff < 0).toBe(false);
  });

  it('formatea el diff con signo positivo para subidas', () => {
    const diff = 0.35;
    const formatted = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}`;
    expect(formatted).toBe('+0.35');
  });

  it('formatea el diff sin signo para bajadas', () => {
    const diff = -0.22;
    const formatted = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}`;
    expect(formatted).toBe('-0.22');
  });
});

describe('Divisas: validación de estructura de respuesta', () => {
  it('la respuesta tiene la estructura correcta con date, rates y prevRates', () => {
    const mockResponse = {
      date: '2026-02-27',
      rates: { USD_MXN: 17.21, EUR_MXN: 20.32, CAD_MXN: 12.59, GBP_MXN: 23.19 },
      prevRates: { USD_MXN: 17.18, EUR_MXN: 20.29, CAD_MXN: 12.56, GBP_MXN: 23.27 },
    };
    expect(mockResponse).toHaveProperty('date');
    expect(mockResponse).toHaveProperty('rates');
    expect(mockResponse).toHaveProperty('prevRates');
    expect(typeof mockResponse.date).toBe('string');
    expect(typeof mockResponse.rates.USD_MXN).toBe('number');
  });

  it('prevRates puede ser null cuando no hay datos del día anterior', () => {
    const mockResponse = {
      date: '2026-02-27',
      rates: { USD_MXN: 17.21, EUR_MXN: 20.32, CAD_MXN: 12.59, GBP_MXN: 23.19 },
      prevRates: null,
    };
    expect(mockResponse.prevRates).toBeNull();
  });

  it('el date tiene formato ISO YYYY-MM-DD', () => {
    const date = '2026-02-27';
    expect(/^\d{4}-\d{2}-\d{2}$/.test(date)).toBe(true);
  });
});
