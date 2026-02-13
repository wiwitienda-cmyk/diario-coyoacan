import { ENV } from "./_core/env";

interface NewsletterArticle {
  headline: string;
  summary: string;
  heroImage: string;
  slug: string;
  category: string;
  date: string;
}

interface SendNewsletterParams {
  article: NewsletterArticle;
  subscribers: string[];
}

/**
 * Send newsletter email to subscribers using Resend API
 */
export async function sendNewsletter({ article, subscribers }: SendNewsletterParams): Promise<{ success: boolean; sent: number; failed: number }> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const emailHtml = generateNewsletterHTML(article);
  const emailText = generateNewsletterText(article);

  let sent = 0;
  let failed = 0;

  // Send emails in batches to avoid rate limits
  const batchSize = 50;
  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);
    
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Diario Coyoacán <newsletter@superanfitrion.com.mx>",
          to: batch,
          subject: `📰 ${article.headline}`,
          html: emailHtml,
          text: emailText,
        }),
      });

      if (response.ok) {
        sent += batch.length;
      } else {
        console.error(`Failed to send newsletter batch:`, await response.text());
        failed += batch.length;
      }
    } catch (error) {
      console.error(`Error sending newsletter batch:`, error);
      failed += batch.length;
    }

    // Add delay between batches to respect rate limits
    if (i + batchSize < subscribers.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return { success: sent > 0, sent, failed };
}

/**
 * Generate HTML template for newsletter email
 */
function generateNewsletterHTML(article: NewsletterArticle): string {
  const baseUrl = "https://diario-coyo.manus.space";
  const articleUrl = `${baseUrl}/diario?slug=${article.slug}`;
  const unsubscribeUrl = `${baseUrl}/unsubscribe`;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.headline}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Georgia', serif;
      background-color: #f5f5dc;
      color: #1a1a1a;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 4px solid #1a1a1a;
    }
    .header {
      background-color: #1a1a1a;
      color: #f5f5dc;
      padding: 20px;
      text-align: center;
      border-bottom: 4px solid #d4511e;
    }
    .header h1 {
      margin: 0;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .header p {
      margin: 5px 0 0 0;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #d4511e;
    }
    .hero-image {
      width: 100%;
      height: auto;
      display: block;
      border-bottom: 2px solid #1a1a1a;
    }
    .content {
      padding: 30px;
    }
    .category {
      display: inline-block;
      background-color: #d4511e;
      color: #ffffff;
      padding: 5px 15px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 15px;
    }
    .headline {
      font-size: 28px;
      font-weight: bold;
      line-height: 1.3;
      margin: 15px 0;
      color: #1a1a1a;
    }
    .date {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .summary {
      font-size: 18px;
      line-height: 1.6;
      font-style: italic;
      color: #333;
      border-left: 4px solid #d4511e;
      padding-left: 20px;
      margin: 20px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #d4511e;
      color: #ffffff;
      padding: 15px 40px;
      text-decoration: none;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      border: 2px solid #1a1a1a;
      box-shadow: 4px 4px 0px 0px #1a1a1a;
      margin: 20px 0;
      transition: all 0.3s ease;
    }
    .cta-button:hover {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0px 0px #1a1a1a;
    }
    .footer {
      background-color: #1a1a1a;
      color: #f5f5dc;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      border-top: 4px solid #d4511e;
    }
    .footer a {
      color: #d4511e;
      text-decoration: none;
    }
    .footer p {
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Diario Coyoacán</h1>
      <p>Periodismo Local • Cultura • Gastronomía</p>
    </div>
    
    <img src="${article.heroImage}" alt="${article.headline}" class="hero-image" />
    
    <div class="content">
      <span class="category">${article.category}</span>
      <h2 class="headline">${article.headline}</h2>
      <p class="date">${article.date}</p>
      <p class="summary">"${article.summary}"</p>
      
      <center>
        <a href="${articleUrl}" class="cta-button">Leer Artículo Completo</a>
      </center>
    </div>
    
    <div class="footer">
      <p><strong>Diario Coyoacán</strong></p>
      <p>Tu fuente diaria de noticias culturales y eventos en Coyoacán y CDMX</p>
      <p>
        <a href="${baseUrl}">Inicio</a> • 
        <a href="${baseUrl}/hemeroteca">Hemeroteca</a> • 
        <a href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades">Alojamientos</a>
      </p>
      <p style="margin-top: 20px; font-size: 11px; color: #999;">
        Recibiste este correo porque te suscribiste al boletín de Diario Coyoacán.<br/>
        <a href="${unsubscribeUrl}" style="color: #d4511e;">Cancelar suscripción</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text version for newsletter email
 */
function generateNewsletterText(article: NewsletterArticle): string {
  const baseUrl = "https://diario-coyo.manus.space";
  const articleUrl = `${baseUrl}/diario?slug=${article.slug}`;

  return `
DIARIO COYOACÁN
Periodismo Local • Cultura • Gastronomía

${article.category.toUpperCase()}
${article.headline}
${article.date}

"${article.summary}"

Leer artículo completo: ${articleUrl}

---
Diario Coyoacán
Tu fuente diaria de noticias culturales y eventos en Coyoacán y CDMX

Inicio: ${baseUrl}
Hemeroteca: ${baseUrl}/hemeroteca
Alojamientos: https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades

Recibiste este correo porque te suscribiste al boletín de Diario Coyoacán.
Cancelar suscripción: ${baseUrl}/unsubscribe
  `.trim();
}
