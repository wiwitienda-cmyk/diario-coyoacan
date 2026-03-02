import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Globe, ArrowLeft } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';

export default function Hemeroteca() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const { data: articles, isLoading } = trpc.articles.list.useQuery();

  const t = lang === 'es' ? {
    title: 'Artículos',
    subtitle: 'Todos los artículos del Diario Coyoacán',
    loading: 'Cargando archivo...',
    backToHome: 'Volver al Inicio',
    readMore: 'Leer Artículo',
    noArticles: 'No hay artículos disponibles',
  } : {
    title: 'Articles',
    subtitle: 'All articles from Diario Coyoacán',
    loading: 'Loading articles...',
    backToHome: 'Back to Home',
    readMore: 'Read Article',
    noArticles: 'No articles available',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-newsprint flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-ink mx-auto mb-4"></div>
          <p className="font-subhead text-lg">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-newsprint text-ink font-body">
      <Helmet>
        <title>{lang === 'es' ? 'Hemeroteca | Diario Coyoacán' : 'Archive | Diario Coyoacán'}</title>
        <meta name="description" content={lang === 'es'
          ? 'Hemeroteca completa del Diario Coyoacán: archivo de todas las ediciones, noticias locales, cultura y gastronomía de Coyoacán CDMX. Hospeda con SúperAnfitrión.'
          : 'Complete archive of Diario Coyoacán: all editions, local news, culture and gastronomy from Coyoacán Mexico City. Stay with SúperAnfitrión.'
        } />
        <meta name="keywords" content="hemeroteca Coyoacán, archivo noticias Coyoacán, Diario Coyoacán, ediciones anteriores, periodismo local CDMX" />
        <meta name="author" content="Diario Coyoacán" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://diario.superanfitrion.com.mx/hemeroteca" />
        <link rel="alternate" hrefLang="es-MX" href="https://diario.superanfitrion.com.mx/hemeroteca" />
        <link rel="alternate" hrefLang="en" href="https://diario.superanfitrion.com.mx/hemeroteca?lang=en" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diario.superanfitrion.com.mx/hemeroteca" />
        <meta property="og:title" content={lang === 'es' ? 'Hemeroteca | Diario Coyoacán' : 'Archive | Diario Coyoacán'} />
        <meta property="og:description" content={lang === 'es'
          ? 'Hemeroteca completa del Diario Coyoacán: archivo de todas las ediciones, noticias locales, cultura y gastronomía de Coyoacán CDMX.'
          : 'Complete archive of Diario Coyoacán: all editions, local news, culture and gastronomy from Coyoacán Mexico City.'
        } />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content={lang === 'es' ? 'es_MX' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@DiarioCoyoacan" />
        <meta name="twitter:title" content={lang === 'es' ? 'Hemeroteca | Diario Coyoacán' : 'Archive | Diario Coyoacán'} />
        <meta name="twitter:description" content={lang === 'es'
          ? 'Hemeroteca completa del Diario Coyoacán: archivo de todas las ediciones, noticias locales, cultura y gastronomía de Coyoacán CDMX.'
          : 'Complete archive of Diario Coyoacán: all editions, local news, culture and gastronomy from Coyoacán Mexico City.'
        } />
      </Helmet>

      {/* Header */}
      <header className="border-b-4 border-ink p-4 md:p-8 bg-newsprint sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-headline leading-none">Diario Coyoacán</h1>
              <p className="font-subhead text-sm md:text-base uppercase tracking-widest mt-1 text-rust flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t.title}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
              <Link href="/">
                <button className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {t.backToHome}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-headline mb-4">{t.title}</h2>
          <p className="text-xl font-body text-gray-700">{t.subtitle}</p>
        </div>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/diario?slug=${article.slug}`}>
                <div className="group block cursor-pointer">
                  <div className="relative">
                    {/* Shadow effect */}
                    <div className="absolute inset-0 bg-ink translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
                    
                    {/* Card */}
                    <div className="relative bg-white border-4 border-ink overflow-hidden">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.heroImage}
                          alt={lang === 'es' ? article.headlineEs : article.headlineEn}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                        />
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-rust text-white px-3 py-1 font-subhead uppercase text-xs border-2 border-ink shadow-[2px_2px_0px_0px_#1A1A1A]">
                          {article.dateISO}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-subhead uppercase tracking-wider text-rust">
                            {lang === 'es' ? article.categoryEs : article.categoryEn}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-headline mb-3 line-clamp-2 group-hover:text-rust transition-colors">
                          {lang === 'es' ? article.headlineEs : article.headlineEn}
                        </h3>
                        
                        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                          {lang === 'es' ? article.summaryEs : article.summaryEn}
                        </p>
                        
                        <div className="flex items-center gap-2 font-subhead uppercase text-sm text-ink group-hover:text-rust transition-colors">
                          <span>{t.readMore}</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">{t.noArticles}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-ink text-newsprint py-12 mt-12 border-t-8 border-rust">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-headline mb-4">Diario Coyoacán</h2>
          <p className="font-subhead uppercase tracking-widest text-sm opacity-70 mb-8">
            {lang === 'es' ? 'Periodismo local • Cultura • Gastronomía' : 'Local Journalism • Culture • Gastronomy'}
          </p>
          <p className="text-xs font-mono opacity-50">
            &copy; 2026 Diario Coyoacán. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
