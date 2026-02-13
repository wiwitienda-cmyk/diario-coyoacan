import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllArticles, getLatestArticle, getArticleBySlug, addSubscriber, getAllSubscribers } from "./articles-db";
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
  
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return await addSubscriber(input.email);
      }),
    sendDaily: publicProcedure
      .mutation(async () => {
        // Get latest article
        const article = await getLatestArticle();
        if (!article) {
          throw new Error("No article found to send");
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
