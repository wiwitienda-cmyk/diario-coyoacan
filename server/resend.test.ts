import { describe, expect, it } from "vitest";

describe("Resend API Key Validation", () => {
  it("should validate Resend API key by sending a test email", async () => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    expect(RESEND_API_KEY).toBeDefined();
    expect(RESEND_API_KEY).toMatch(/^re_/);

    // Test the API key with a lightweight verification request
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Diario Coyoacán <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "Test de validación de API key",
        html: "<p>Este es un email de prueba para validar la API key de Resend.</p>",
      }),
    });

    const data = await response.json();

    // If the API key is invalid, Resend returns 401 or 403
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(403);
    
    // A successful response should return 200 and include an id
    if (response.ok) {
      expect(data).toHaveProperty("id");
    } else {
      // If it's not 401/403 but still fails, log the error for debugging
      console.error("Resend API Error:", data);
      throw new Error(`Resend API returned ${response.status}: ${JSON.stringify(data)}`);
    }
  });
});
