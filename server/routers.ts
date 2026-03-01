import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllArticles, getLatestArticle, getArticleBySlug, addSubscriber, getAllSubscribers } from "./articles-db";
import { getAllNewsArticles, getLatestNewsArticle, getNewsArticleBySlug } from "./news-articles-db";
import { sendNewsletter } from "./newsletter";

// ─── Cache simple de IPC/BMV (15 minutos) ──────────────────────────────────
interface IpcData {
  price: number;
  prevClose: number;
  change: number;
  changePct: number;
  date: string;
}
let ipcCache: { data: IpcData | null; fetchedAt: number } = { data: null, fetchedAt: 0 };
const IPC_CACHE_TTL_MS = 15 * 60 * 1000;

async function fetchIPC(): Promise<IpcData | null> {
  const now = Date.now();
  if (ipcCache.data && now - ipcCache.fetchedAt < IPC_CACHE_TTL_MS) return ipcCache.data;
  try {
    const res = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/%5EMXX?interval=1d&range=5d',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (!res.ok) return null;
    const json = await res.json() as { chart: { result: Array<{ meta: Record<string, number | string> }> } };
    const meta = json.chart.result[0].meta;
    const price = meta.regularMarketPrice as number;
    const prevClose = meta.chartPreviousClose as number;
    const change = Math.round((price - prevClose) * 100) / 100;
    const changePct = Math.round(((price - prevClose) / prevClose) * 10000) / 100;
    const result: IpcData = {
      price: Math.round(price * 100) / 100,
      prevClose: Math.round(prevClose * 100) / 100,
      change,
      changePct,
      date: new Date().toISOString().split('T')[0],
    };
    ipcCache = { data: result, fetchedAt: now };
    return result;
  } catch {
    return null;
  }
}

// ─── Cache simple de petróleo WTI/Brent (15 minutos) ──────────────────────────
interface OilData {
  wti: { price: number; prevClose: number; change: number; changePct: number };
  brent: { price: number; prevClose: number; change: number; changePct: number };
  date: string;
}
let oilCache: { data: OilData | null; fetchedAt: number } = { data: null, fetchedAt: 0 };
const OIL_CACHE_TTL_MS = 15 * 60 * 1000;

async function fetchOilPrices(): Promise<OilData | null> {
  const now = Date.now();
  if (oilCache.data && now - oilCache.fetchedAt < OIL_CACHE_TTL_MS) return oilCache.data;
  try {
    const [wtiRes, brentRes] = await Promise.all([
      fetch('https://query1.finance.yahoo.com/v8/finance/chart/CL%3DF?interval=1d&range=2d', { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch('https://query1.finance.yahoo.com/v8/finance/chart/BZ%3DF?interval=1d&range=2d', { headers: { 'User-Agent': 'Mozilla/5.0' } }),
    ]);
    if (!wtiRes.ok || !brentRes.ok) return null;
    const [wtiJson, brentJson] = await Promise.all([wtiRes.json(), brentRes.json()]) as [any, any];
    const wtiMeta = wtiJson.chart.result[0].meta;
    const brentMeta = brentJson.chart.result[0].meta;
    const calcChange = (price: number, prev: number) => ({
      price: Math.round(price * 100) / 100,
      prevClose: Math.round(prev * 100) / 100,
      change: Math.round((price - prev) * 100) / 100,
      changePct: Math.round(((price - prev) / prev) * 10000) / 100,
    });
    const result: OilData = {
      wti: calcChange(wtiMeta.regularMarketPrice, wtiMeta.chartPreviousClose),
      brent: calcChange(brentMeta.regularMarketPrice, brentMeta.chartPreviousClose),
      date: new Date().toISOString().split('T')[0],
    };
    oilCache = { data: result, fetchedAt: now };
    return result;
  } catch {
    return null;
  }
}

// ─── Cache simple de divisas Latam (15 minutos) ─────────────────────────────
interface LatamRates {
  ARS_MXN: number;
  ARS_MXN_prev: number;
  COP_MXN: number;
  COP_MXN_prev: number;
  date: string;
}
let latamCache: { data: LatamRates | null; fetchedAt: number } = { data: null, fetchedAt: 0 };
const LATAM_CACHE_TTL_MS = 15 * 60 * 1000;

async function fetchLatamRates(): Promise<LatamRates | null> {
  const now = Date.now();
  if (latamCache.data && now - latamCache.fetchedAt < LATAM_CACHE_TTL_MS) return latamCache.data;
  try {
    // Obtener USD/MXN, USD/ARS y USD/COP para calcular cruces
    const [mxnRes, arsRes, copRes] = await Promise.all([
      fetch('https://query1.finance.yahoo.com/v8/finance/chart/USDMXN%3DX?interval=1d&range=2d', { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch('https://query1.finance.yahoo.com/v8/finance/chart/USDARS%3DX?interval=1d&range=2d', { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch('https://query1.finance.yahoo.com/v8/finance/chart/COP%3DX?interval=1d&range=2d', { headers: { 'User-Agent': 'Mozilla/5.0' } }),
    ]);
    if (!mxnRes.ok) return null;
    const [mxnJson, arsJson, copJson] = await Promise.all([mxnRes.json(), arsRes.json(), copRes.json()]) as [any, any, any];
    const usdMxn = mxnJson.chart.result[0].meta.regularMarketPrice as number;
    const usdMxnPrev = mxnJson.chart.result[0].meta.chartPreviousClose as number;
    // ARS/MXN = USD/MXN ÷ USD/ARS
    const usdArs = arsJson.chart.result[0].meta.regularMarketPrice as number;
    const usdArsPrev = arsJson.chart.result[0].meta.chartPreviousClose as number;
    const arsMxn = Math.round((usdMxn / usdArs) * 10000) / 10000;
    const arsMxnPrev = Math.round((usdMxnPrev / usdArsPrev) * 10000) / 10000;
    // COP/MXN = USD/MXN ÷ USD/COP
    const usdCop = copJson.chart.result[0].meta.regularMarketPrice as number;
    const usdCopPrev = copJson.chart.result[0].meta.chartPreviousClose as number;
    const copMxn = Math.round((usdMxn / usdCop) * 100000) / 100000;
    const copMxnPrev = Math.round((usdMxnPrev / usdCopPrev) * 100000) / 100000;
    const result: LatamRates = {
      ARS_MXN: arsMxn,
      ARS_MXN_prev: arsMxnPrev,
      COP_MXN: copMxn,
      COP_MXN_prev: copMxnPrev,
      date: new Date().toISOString().split('T')[0],
    };
    latamCache = { data: result, fetchedAt: now };
    return result;
  } catch {
    return null;
  }
}

// ─── Cache simple de divisas (10 minutos) ───────────────────────────────────
let exchangeRateCache: {
  data: ExchangeRates | null;
  fetchedAt: number;
} = { data: null, fetchedAt: 0 };

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos

interface ExchangeRates {
  date: string;
  rates: {
    USD_MXN: number;
    EUR_MXN: number;
    CAD_MXN: number;
    GBP_MXN: number;
  };
  prevRates: {
    USD_MXN: number;
    EUR_MXN: number;
    CAD_MXN: number;
    GBP_MXN: number;
  } | null;
}

async function fetchExchangeRates(): Promise<ExchangeRates> {
  const now = Date.now();
  if (exchangeRateCache.data && now - exchangeRateCache.fetchedAt < CACHE_TTL_MS) {
    return exchangeRateCache.data;
  }

  // Obtener tipo de cambio actual: 1 USD = ? MXN, 1 EUR = ? MXN, etc.
  const latestRes = await fetch('https://api.frankfurter.app/latest?from=MXN&to=USD,EUR,CAD,GBP');

  if (!latestRes.ok) throw new Error('Error al obtener tipos de cambio');

  const latest = await latestRes.json() as { date: string; rates: Record<string, number> };

  // Invertir: cuántos MXN vale 1 USD/EUR/CAD/GBP
  const toMXN = (rate: number) => Math.round((1 / rate) * 10000) / 10000;

  const rates = {
    USD_MXN: toMXN(latest.rates['USD']),
    EUR_MXN: toMXN(latest.rates['EUR']),
    CAD_MXN: toMXN(latest.rates['CAD']),
    GBP_MXN: toMXN(latest.rates['GBP']),
  };

  // Obtener tasa del día anterior para calcular variación
  let prevRates: ExchangeRates['prevRates'] = null;
  try {
    const yesterday = new Date(latest.date);
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = yesterday.toISOString().split('T')[0];
    const prevResponse = await fetch(`https://api.frankfurter.app/${yDate}?from=MXN&to=USD,EUR,CAD,GBP`);
    if (prevResponse.ok) {
      const prev = await prevResponse.json() as { rates: Record<string, number> };
      prevRates = {
        USD_MXN: toMXN(prev.rates['USD']),
        EUR_MXN: toMXN(prev.rates['EUR']),
        CAD_MXN: toMXN(prev.rates['CAD']),
        GBP_MXN: toMXN(prev.rates['GBP']),
      };
    }
  } catch {
    // Si falla la tasa anterior, no mostramos variación
  }

  const result: ExchangeRates = { date: latest.date, rates, prevRates };
  exchangeRateCache = { data: result, fetchedAt: now };
  return result;
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  articles: router({
    list: publicProcedure.query(async () => {
      return await getAllArticles();
    }),
    latest: publicProcedure.query(async () => {
      return await getLatestArticle();
    }),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getArticleBySlug(input.slug);
      }),
  }),
  
  divisas: router({
    rates: publicProcedure.query(async () => {
      return await fetchExchangeRates();
    }),
    ipc: publicProcedure.query(async () => {
      return await fetchIPC();
    }),
    oil: publicProcedure.query(async () => {
      return await fetchOilPrices();
    }),
    latam: publicProcedure.query(async () => {
      return await fetchLatamRates();
    }),
  }),

  newsArticles: router({
    list: publicProcedure.query(async () => {
      return await getAllNewsArticles();
    }),
    latest: publicProcedure.query(async () => {
      return await getLatestNewsArticle();
    }),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getNewsArticleBySlug(input.slug);
      }),
  }),
  
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return await addSubscriber(input.email);
      }),
    preview: publicProcedure
      .query(async () => {
        // Get latest article
        const article = await getLatestArticle();
        if (!article) {
          throw new Error("No article found");
        }

        // Return article data and preview URL
        const baseUrl = "https://diario-coyo.manus.space";
        const articleUrl = `${baseUrl}/diario?slug=${article.slug}`;
        
        return {
          article: {
            headline: article.headlineEs,
            summary: article.summaryEs,
            heroImage: article.heroImage,
            slug: article.slug,
            category: article.categoryEs,
            date: article.dateISO,
          },
          articleUrl,
          subscriberCount: (await getAllSubscribers()).length,
        };
      }),
    validateUrl: publicProcedure
      .input(z.object({ url: z.string().url() }))
      .query(async ({ input }) => {
        try {
          const response = await fetch(input.url, { method: 'HEAD' });
          return {
            valid: response.ok,
            status: response.status,
            url: input.url,
          };
        } catch (error) {
          return {
            valid: false,
            status: 0,
            url: input.url,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      }),
    sendDaily: publicProcedure
      .mutation(async () => {
        // Get latest article
        const article = await getLatestArticle();
        if (!article) {
          throw new Error("No article found to send");
        }

        // Validate article URL before sending
        const baseUrl = "https://diario-coyo.manus.space";
        const articleUrl = `${baseUrl}/diario?slug=${article.slug}`;
        
        try {
          const response = await fetch(articleUrl, { method: 'HEAD' });
          if (!response.ok) {
            throw new Error(`Article URL is not accessible (HTTP ${response.status}). Please verify the article exists at: ${articleUrl}`);
          }
        } catch (error) {
          throw new Error(`Failed to validate article URL: ${error instanceof Error ? error.message : 'Unknown error'}. URL: ${articleUrl}`);
        }

        // Get all subscribers
        const subscribers = await getAllSubscribers();
        if (subscribers.length === 0) {
          return { success: true, sent: 0, failed: 0, message: "No subscribers found" };
        }

        // Send newsletter
        const result = await sendNewsletter({
          article: {
            headline: article.headlineEs,
            summary: article.summaryEs,
            heroImage: article.heroImage,
            slug: article.slug,
            category: article.categoryEs,
            date: article.dateISO,
          },
          subscribers: subscribers.map(s => s.email),
        });

        return result;
      }),
  }),
});

export type AppRouter = typeof appRouter;
