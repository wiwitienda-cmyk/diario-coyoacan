import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllArticles, getLatestArticle, getArticleBySlug, addSubscriber, getAllSubscribers } from "./articles-db";
import { getAllNewsArticles, getLatestNewsArticle, getNewsArticleBySlug } from "./news-articles-db";
import { sendNewsletter } from "./newsletter";

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
        const baseUrl = "https://diario-coyoacan.manus.space";
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
        const baseUrl = "https://diario-coyoacan.manus.space";
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
