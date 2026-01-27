import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { createArticle, addSubscriber } from "./articles-db";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("articles API", () => {
  it("should fetch all articles", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const articles = await caller.articles.list();

    expect(Array.isArray(articles)).toBe(true);
    expect(articles.length).toBeGreaterThan(0);
  });

  it("should fetch latest article", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const article = await caller.articles.latest();

    expect(article).toBeDefined();
    expect(article?.slug).toBeDefined();
    expect(article?.headlineEs).toBeDefined();
  });

  it("should fetch article by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const article = await caller.articles.bySlug({ slug: "cafe-avellaneda" });

    expect(article).toBeDefined();
    expect(article?.slug).toBe("cafe-avellaneda");
    expect(article?.headlineEs).toContain("Café Avellaneda");
  });

  it("should return null for non-existent slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const article = await caller.articles.bySlug({ slug: "non-existent-article" });

    expect(article).toBeNull();
  });
});

describe("newsletter API", () => {
  it("should accept valid email subscription", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `test-${Date.now()}@example.com`;
    const result = await caller.newsletter.subscribe({ email: testEmail });

    expect(result.success).toBe(true);
  });

  it("should reject duplicate email subscription", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `duplicate-${Date.now()}@example.com`;
    
    // First subscription should succeed
    const firstResult = await caller.newsletter.subscribe({ email: testEmail });
    expect(firstResult.success).toBe(true);

    // Second subscription should fail
    const secondResult = await caller.newsletter.subscribe({ email: testEmail });
    expect(secondResult.success).toBe(false);
    expect(secondResult.error).toBeDefined();
  });

  it("should reject invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.newsletter.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
  });
});
