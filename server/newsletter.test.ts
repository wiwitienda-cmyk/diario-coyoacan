import { describe, it, expect } from 'vitest';
import { Resend } from 'resend';

describe('Newsletter - Resend API Configuration', () => {
  it('should have valid Resend API key configured', async () => {
    const apiKey = process.env.RESEND_API_KEY;
    
    expect(apiKey).toBeDefined();
    expect(apiKey).toMatch(/^re_[a-zA-Z0-9_-]+$/);
    
    // Test actual API connection
    const resend = new Resend(apiKey);
    
    try {
      // Try to list API keys to verify the key is valid
      const result = await resend.apiKeys.list();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data.data)).toBe(true);
    } catch (error: any) {
      throw new Error(`Resend API key validation failed: ${error.message}`);
    }
  });

  it('should have correct API key format', () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey?.startsWith('re_')).toBe(true);
    expect(apiKey!.length).toBeGreaterThan(20);
  });
});
