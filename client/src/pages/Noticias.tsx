import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Calendar, ArrowRight } from "lucide-react";

export default function Noticias() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: articles, isLoading } = trpc.articles.list.useQuery();

  // Filtrar artículos por categoría
  const filteredArticles = articles?.filter((article: any) => {
    if (selectedCategory === "all") return true;
    return article.categoryEs?.toLowerCase() === selectedCategory.toLowerCase();
  }) || [];

  // Obtener categorías únicas
  const categories = Array.from(
    new Set(articles?.map((a: any) => a.categoryEs).filter(Boolean) || [])
  ) as string[];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-newsprint flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ink mx-auto mb-4"></div>
          <p className="font-subhead text-ink">Cargando archivo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-newsprint text-ink font-body selection:bg-rust selection:text-white">
      <Helmet>
        <title>Noticias de Coyoacán | Diario Coyoacán</title>
        <meta name="description" content="Todas las noticias de Coyoacán: cultura, gastronomía, gobierno local, comunidad y hospedaje. El periódico digital del corazón de la Ciudad de México." />
        <meta name="keywords" content="noticias Coyoacán, periódico Coyoacán, cultura CDMX, gastronomía Coyoacán, hospedaje Coyoacán, SúperAnfitrión, Diario Coyoacán" />
        <meta name="author" content="Diario Coyoacán" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diario.superanfitrion.com.mx/noticias" />
        <meta property="og:title" content="Noticias de Coyoacán | Diario Coyoacán" />
        <meta property="og:description" content="Todas las noticias de Coyoacán: cultura, gastronomía, gobierno local, comunidad y hospedaje. El periódico digital del corazón de la Ciudad de México." />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Noticias de Coyoacán | Diario Coyoacán" />
        <meta name="twitter:description" content="Todas las noticias de Coyoacán: cultura, gastronomía, gobierno local, comunidad y hospedaje. El periódico digital del corazón de la Ciudad de México." />
        {/* Canonical */}
        <link rel="canonical" href="https://diario.superanfitrion.com.mx/noticias" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Noticias de Coyoacán',
            description: 'Todas las noticias de Coyoacán: cultura, gastronomía, gobierno local, comunidad y hospedaje.',
            url: 'https://diario.superanfitrion.com.mx/noticias',
            publisher: {
              '@type': 'Organization',
              name: 'SúperAnfitrión Coyoacán',
              url: 'https://superanfitrion.com.mx',
            },
            inLanguage: 'es-MX',
          })}
        </script>
      </Helmet>

      {/* Marquee Header */}
      <div className="bg-ink text-newsprint py-2 overflow-hidden whitespace-nowrap border-b-4 border-rust">
        <div className="animate-marquee inline-block font-subhead uppercase tracking-widest text-sm">
          ARCHIVO HISTÓRICO: TODAS LAS EDICIONES DE DIARIO COYOACÁN • 
          HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX • 
          DESCUBRE LOS MEJORES LUGARES DE LA CDMX • 
          ARCHIVO HISTÓRICO: TODAS LAS EDICIONES DE DIARIO COYOACÁN • 
          HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX • 
          DESCUBRE LOS MEJORES LUGARES DE LA CDMX •
        </div>
      </div>

      {/* Top Header */}
      <div className="bg-white border-b-2 border-ink py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:5511427252" className="hover:text-rust transition-colors">
              5511427252
            </a>
            <a href="mailto:superanfitrioncoyoacan@gmail.com" className="hover:text-rust transition-colors hidden sm:inline">
              superanfitrioncoyoacan@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rust transition-colors font-subhead uppercase"
            >
              Alojamientos en Coyoacán
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="https://superanfitrion.com.mx/acceso-huespedes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rust transition-colors font-subhead uppercase"
            >
              Crear Cuenta
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b-4 border-ink p-4 md:p-8 bg-newsprint sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/diario">
            <div className="cursor-pointer">
              <h1 className="text-4xl md:text-6xl font-headline leading-none">Diario Coyoacán</h1>
              <p className="font-subhead text-sm md:text-base uppercase tracking-widest mt-1 text-rust">
                Archivo • Hemeroteca
              </p>
            </div>
          </Link>
          <div className="flex gap-3 items-center flex-wrap justify-center">
            <Link
              href="/diario"
              className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors"
            >
              Home
            </Link>
            <Link
              href="/noticias"
              className="px-4 py-2 bg-ink text-newsprint border-2 border-ink font-subhead uppercase text-sm"
            >
              Noticias
            </Link>
            <a
              href="https://superanfitrion.com.mx/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors"
            >
              Blog
            </a>
            <a
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-rust text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-ink transition-colors shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]"
            >
              Reservaciones
            </a>
          </div>
        </div>
      </header>

      {/* Filtros de Categoría - Estilo Periódico */}
      <div className="bg-white border-b-4 border-ink py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-headline mb-4 text-center uppercase border-b-2 border-ink inline-block pb-2 w-full">
            Clasificar por Sección
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 font-subhead uppercase text-sm border-4 border-ink transition-all shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] ${
                selectedCategory === "all"
                  ? "bg-ink text-newsprint"
                  : "bg-newsprint text-ink hover:bg-gray-100"
              }`}
            >
              Todas las Ediciones ({articles?.length || 0})
            </button>
            {categories.map((category: string) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as string)}
                className={`px-6 py-3 font-subhead uppercase text-sm border-4 border-ink transition-all shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] ${
                  selectedCategory === category
                    ? "bg-ink text-newsprint"
                    : "bg-newsprint text-ink hover:bg-gray-100"
                }`}
              >
                {category} ({articles?.filter((a: any) => a.categoryEs === category).length || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Artículos - Estilo Hemeroteca */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article: any) => (
            <Link key={article.id} href={`/diario?slug=${article.slug}`}>
              <article className="group cursor-pointer bg-white border-4 border-ink transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#1A1A1A] hover:translate-x-[-4px] hover:translate-y-[-4px]">
                {/* Imagen con efecto periódico */}
                <div className="relative overflow-hidden h-64 border-b-4 border-ink">
                  <img
                    src={article.heroImage}
                    alt={article.headlineEs}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  {/* Etiqueta de categoría estilo periódico */}
                  <div className="absolute top-4 right-4 bg-rust text-white px-3 py-2 font-subhead uppercase text-xs border-2 border-ink rotate-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
                    {article.categoryEs}
                  </div>
                </div>

                {/* Contenido estilo primera plana */}
                <div className="p-6">
                  {/* Fecha estilo periódico */}
                  <div className="flex items-center gap-2 text-sm mb-3 pb-3 border-b-2 border-dashed border-gray-300">
                    <Calendar className="w-4 h-4 text-rust" />
                    <span className="font-mono uppercase tracking-wider">{article.dateEs}</span>
                  </div>

                  {/* Título estilo headline */}
                  <h2 className="text-2xl font-headline leading-tight mb-4 group-hover:text-rust transition-colors">
                    {article.headlineEs}
                  </h2>

                  {/* Resumen estilo copete */}
                  <p className="text-gray-700 leading-relaxed mb-4 text-justify border-l-2 border-rust pl-3 italic">
                    {article.summaryEs}
                  </p>

                  {/* Botón Leer Edición Completa */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-ink">
                    <span className="font-subhead uppercase text-sm text-ink group-hover:text-rust transition-colors flex items-center gap-2">
                      Leer Edición Completa <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mensaje si no hay artículos */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white border-4 border-ink p-12">
            <p className="text-3xl font-headline text-gray-500 mb-4">
              No hay ediciones en esta sección
            </p>
            <p className="text-lg font-body text-gray-600 mb-6">
              Explora otras secciones del archivo histórico
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-8 py-4 bg-rust text-white font-subhead uppercase border-4 border-ink hover:bg-ink transition-colors shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1A1A1A]"
            >
              Ver Todas las Ediciones
            </button>
          </div>
        )}
      </main>

      {/* Footer estilo periódico */}
      <footer className="bg-ink text-newsprint py-12 mt-12 border-t-8 border-rust">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-headline mb-4">Diario Coyoacán</h2>
          <p className="font-subhead uppercase tracking-widest text-sm opacity-70 mb-8">
            Periodismo local • Cultura • Gastronomía
          </p>
          <div className="border-t border-newsprint/30 pt-6 mt-6">
            <p className="text-xs font-mono opacity-50">
              © 2026 Diario Coyoacán. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
