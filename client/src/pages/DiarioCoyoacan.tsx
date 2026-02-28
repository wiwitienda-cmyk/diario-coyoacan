import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Clock, Coffee, Navigation, Share2, Menu, X, Globe, Map, QrCode } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

import SocialShareButtons from '@/components/SocialShareButtons';
import { PromoBanner } from '@/components/PromoBanner';
import { RelatedArticles } from '@/components/RelatedArticles';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

// Fix Leaflet marker icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function DiarioCoyoacan() {
  const [location, setLocation] = useLocation();
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [email, setEmail] = useState('');
  
  // Obtener el slug del artículo de la URL (query param ?slug=...)
  const searchParams = new URLSearchParams(window.location.search);
  const articleSlug = searchParams.get('slug');

  // Fetch article data from database
  const { data: article, isLoading } = trpc.articles.bySlug.useQuery(
    { slug: articleSlug || '' },
    { 
      enabled: !!articleSlug,
    }
  );
  
  const { data: latestArticle, isLoading: isLoadingLatest } = trpc.articles.latest.useQuery(
    undefined,
    { enabled: !articleSlug }
  );
  
  const { data: allArticles } = trpc.articles.list.useQuery();
  
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(lang === 'es' ? '¡Gracias por suscribirte!' : 'Thank you for subscribing!');
        setEmail('');
      } else {
        toast.error(data.error || 'Error al suscribirse');
      }
    },
    onError: (error) => {
      toast.error(lang === 'es' ? 'Error al suscribirse' : 'Subscription error');
    }
  });

  const currentArticle = articleSlug ? article : latestArticle;
  
  // SOLUCIÓN DEFINITIVA: Interceptar creación de elementos img de Leaflet ANTES de que se agreguen al DOM
  useEffect(() => {
    // Sobrescribir el método createElement de Leaflet para agregar alt text INMEDIATAMENTE
    const originalCreateElement = document.createElement.bind(document);
    
    // @ts-ignore - Monkey patching para interceptar creación de imágenes
    document.createElement = function(tagName: string, options?: any) {
      const element = originalCreateElement(tagName, options);
      
      // Si es una imagen, agregar alt text INMEDIATAMENTE
      if (tagName.toLowerCase() === 'img') {
        // Usar setTimeout(0) para agregar atributos después de que Leaflet configure la imagen
        setTimeout(() => {
          if (!element.hasAttribute('alt')) {
            element.setAttribute('alt', '');
          }
          if (!element.hasAttribute('aria-hidden')) {
            element.setAttribute('aria-hidden', 'true');
          }
        }, 0);
      }
      
      return element;
    };
    
    // Función de respaldo para agregar alt text a imágenes existentes
    const addAltToLeafletImages = () => {
      const allMapImages = document.querySelectorAll('.leaflet-container img, .leaflet-pane img, .leaflet-tile, img[src*="tile.openstreetmap.org"], img[src*="marker"]');
      allMapImages.forEach(img => {
        if (!img.hasAttribute('alt')) {
          img.setAttribute('alt', '');
        }
        if (!img.hasAttribute('aria-hidden')) {
          img.setAttribute('aria-hidden', 'true');
        }
      });
    };
    
    // Ejecutar inmediatamente
    addAltToLeafletImages();
    
    // Ejecutar múltiples veces en los primeros 100ms
    const timers = [0, 1, 5, 10, 20, 50, 100, 200, 500, 1000].map(delay => 
      setTimeout(addAltToLeafletImages, delay)
    );
    
    // MutationObserver como respaldo
    const observer = new MutationObserver(() => {
      addAltToLeafletImages();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'class']
    });
    
    return () => {
      // Restaurar createElement original
      document.createElement = originalCreateElement;
      timers.forEach(timer => clearTimeout(timer));
      observer.disconnect();
    };
  }, [currentArticle]);
  
  if (isLoading || isLoadingLatest || !currentArticle) {
    return (
      <div className="min-h-screen bg-newsprint flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-ink mx-auto mb-4"></div>
          <p className="font-subhead text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  // Parse JSON fields
  const contentEs = JSON.parse(currentArticle.contentEs);
  const contentEn = JSON.parse(currentArticle.contentEn);
  const menuItemsEs = JSON.parse(currentArticle.menuItemsEs);
  const menuItemsEn = JSON.parse(currentArticle.menuItemsEn);

  const t = lang === 'es' ? {
    headline: currentArticle.headlineEs,
    summary: currentArticle.summaryEs,
    category: currentArticle.categoryEs,
    date: currentArticle.dateEs,
    weather: currentArticle.weatherConditionEs,
    content: contentEs,
    menuItems: menuItemsEs,
    menuTitle: 'Menú Destacado',
    locationTitle: 'Ubicación',
    hoursTitle: 'Horarios',
    weekHours: 'Lun-Sáb',
    sundayHours: 'Dom',
    getDirections: 'Cómo llegar',
    openMaps: 'Abrir en Maps',
    share: 'Compartir',
    subscribeTitle: '¡Suscríbete al Diario!',
    subscribeText: 'Recibe las mejores recomendaciones de Coyoacán directamente en tu correo cada semana.',
    subscribePlaceholder: 'Tu correo electrónico',
    subscribeButton: 'Suscribirse',
    previousEditions: 'Artículos Anteriores',
    recommended: 'Recomendado',
    scanCode: 'Escanea para llevar',
    home: 'Home',
    reservations: 'Reservaciones',
    archive: 'NOTICIAS',
    ctaTitle: '¿Quieres explorar Coyoacán?',
    ctaText: 'Hospédate en el corazón de Coyoacán y descubre todos estos lugares increíbles a solo unos pasos de nuestras propiedades.',
    ctaButton: 'Ver Alojamientos Disponibles',
    hoursWeek: currentArticle.hoursWeekEs,
    hoursSunday: currentArticle.hoursSundayEs,
  } : {
    headline: currentArticle.headlineEn,
    summary: currentArticle.summaryEn,
    category: currentArticle.categoryEn,
    date: currentArticle.dateEn,
    weather: currentArticle.weatherConditionEn,
    content: contentEn,
    menuItems: menuItemsEn,
    menuTitle: 'Featured Menu',
    locationTitle: 'Location',
    hoursTitle: 'Opening Hours',
    weekHours: 'Mon-Sat',
    sundayHours: 'Sun',
    getDirections: 'Get Directions',
    openMaps: 'Open in Maps',
    share: 'Share',
    subscribeTitle: 'Subscribe to the Daily!',
    subscribeText: 'Get the best Coyoacán recommendations directly to your inbox every week.',
    subscribePlaceholder: 'Your email address',
    subscribeButton: 'Subscribe',
    previousEditions: 'Previous Articles',
    recommended: 'Featured',
    scanCode: 'Scan to take away',
    home: 'Home',
    reservations: 'Reservations',
    archive: 'NEWS',
    ctaTitle: 'Want to explore Coyoacán?',
    ctaText: 'Stay in the heart of Coyoacán and discover all these amazing places just steps away from our properties.',
    ctaButton: 'View Available Accommodations',
    hoursWeek: currentArticle.hoursWeekEn,
    hoursSunday: currentArticle.hoursSundayEn,
  };

  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.headline,
          text: t.summary,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      alert(lang === 'es' ? 'Link copiado al portapapeles' : 'Link copied to clipboard');
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate({ email });
    }
  };

  return (
    <div className="min-h-screen bg-newsprint text-ink font-body selection:bg-rust selection:text-white">
      <Helmet>
        <title>{t.headline.length > 45 ? t.headline.substring(0, 45) + '...' : t.headline} | Coyoacán</title>
        <meta name="description" content={t.summary.length > 160 ? t.summary.substring(0, 157) + '...' : t.summary} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={t.headline} />
        <meta property="og:description" content={t.summary.length > 160 ? t.summary.substring(0, 157) + '...' : t.summary} />
        <meta property="og:image" content={currentArticle.heroImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content={lang === 'es' ? 'es_MX' : 'en_US'} />
        <meta property="article:published_time" content={currentArticle.createdAt.toISOString()} />
        <meta property="article:modified_time" content={currentArticle.updatedAt.toISOString()} />
        <meta property="article:author" content="Diario Coyoacán" />
        <meta property="article:section" content={t.category} />
        <meta property="article:tag" content="Coyoacán" />
        <meta property="article:tag" content="CDMX" />
        <meta property="article:tag" content="turismo" />
        <meta property="article:tag" content="gastronomía" />
        <meta property="og:image:alt" content={`Imagen del artículo: ${t.headline}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={t.headline} />
        <meta name="twitter:description" content={t.summary.length > 160 ? t.summary.substring(0, 157) + '...' : t.summary} />
        <meta name="twitter:image" content={currentArticle.heroImage} />
        <meta name="twitter:image:alt" content={`Imagen del artículo: ${t.headline}`} />
        <meta name="twitter:site" content="@DiarioCoyoacan" />
        <meta name="twitter:creator" content="@DiarioCoyoacan" />
        <meta name="twitter:label1" content="Tiempo de lectura" />
        <meta name="twitter:data1" content="5 min" />
        
        {/* Additional SEO */}
        <meta name="keywords" content="Coyoacán, hospedaje CDMX, cultura México, gastronomía Coyoacán, SúperAnfitrión, turismo Ciudad de México" />
        <meta name="author" content="Diario Coyoacán" />
        <link rel="canonical" href={shareUrl} />
        
        {/* Schema.org JSON-LD for Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": t.headline,
            "description": t.summary,
            "image": {
              "@type": "ImageObject",
              "url": currentArticle.heroImage,
              "width": 1200,
              "height": 630
            },
            "datePublished": currentArticle.createdAt.toISOString(),
            "dateModified": currentArticle.updatedAt.toISOString(),
            "author": {
              "@type": "Organization",
              "name": "Diario Coyoacán",
              "url": "https://diario-coyo.manus.space"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SúperAnfitrión Coyoacán",
              "url": "https://superanfitrion.com.mx",
              "logo": {
                "@type": "ImageObject",
                "url": "https://superanfitrion.com.mx/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": shareUrl
            },
            "articleSection": t.category,
            "inLanguage": lang === 'es' ? 'es-MX' : 'en-US',
            "about": {
              "@type": "Place",
              "name": currentArticle.locationAddress,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": currentArticle.locationLat,
                "longitude": currentArticle.locationLng
              }
            }
          })}
        </script>
      </Helmet>

      {/* Top Header - Contact Info */}
      <div className="bg-newsprint border-b-2 border-ink py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 text-xs md:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://wa.me/5215511427252" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-rust transition-colors font-subhead"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>5511427252</span>
            </a>
            <a 
              href="mailto:superanfitrioncoyoacan@gmail.com"
              className="flex items-center gap-2 hover:text-rust transition-colors font-subhead"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden md:inline">superanfitrioncoyoacan@gmail.com</span>
              <span className="md:hidden">Correo</span>
            </a>
            <a 
              href="tel:5511427252"
              className="flex items-center gap-2 hover:text-rust transition-colors font-subhead px-3 py-1 border-2 border-ink bg-white hover:bg-rust hover:text-white"
              aria-label={lang === 'es' ? 'Llamar ahora' : 'Call now'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-bold">{lang === 'es' ? 'Llamar' : 'Call'}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-subhead uppercase text-xs hover:text-rust transition-colors"
            >
              {lang === 'es' ? 'Alojamientos en Coyoacán' : 'Accommodations in Coyoacán'}
            </a>
            <span className="text-gray-400">|</span>
            <a 
              href="https://superanfitrion.com.mx/acceso-huespedes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-subhead uppercase text-xs hover:text-rust transition-colors"
            >
              {lang === 'es' ? 'Crear cuenta' : 'Create account'}
            </a>
          </div>
        </div>
      </div>

      {/* Marquee Header */}
      <div className="bg-ink text-newsprint py-2 overflow-hidden whitespace-nowrap border-b-4 border-rust">
        <div className="animate-marquee inline-block font-subhead uppercase tracking-widest text-sm">
          HOY EN COYOACÁN: {t.headline} • CLIMA: {t.weather.toUpperCase()} {currentArticle.weatherTemp}°C • 
          HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX • 
          DESCUBRE LOS MEJORES LUGARES DE LA CDMX • 
          HOY EN COYOACÁN: {t.headline} • CLIMA: {t.weather.toUpperCase()} {currentArticle.weatherTemp}°C • 
          HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX • 
          DESCUBRE LOS MEJORES LUGARES DE LA CDMX •
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b-4 border-ink p-4 md:p-8 flex flex-col md:flex-row justify-between items-center bg-newsprint sticky top-0 z-40 gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-headline leading-none">Diario Coyoacán</h1>
          <p className="font-subhead text-sm md:text-base uppercase tracking-widest mt-1 text-rust">
            {t.date} • {t.category}
          </p>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="https://superanfitrion.com.mx/" className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors hidden md:inline-block">
            {t.home}
          </a>
          <a href="/hemeroteca" className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors">
            {t.archive}
          </a>
          <a href="https://superanfitrion.com.mx/blog" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors">
            BLOG
          </a>
          <a href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-rust text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-white transition-colors shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]">
            {t.reservations}
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Hero Section */}
        <section className="md:col-span-8 space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-ink translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
            <img 
              src={currentArticle.heroImage}
              alt={t.headline}
              loading="lazy"
              className="relative w-full h-[400px] md:h-[500px] object-cover border-4 border-ink grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute top-4 right-4 bg-rust text-white px-4 py-2 font-subhead uppercase text-sm border-2 border-ink rotate-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
              {t.recommended}
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-headline leading-tight mt-8">
            {t.headline.length > 80 ? t.headline.substring(0, 77) + '...' : t.headline}
          </h2>
          
          <p className="text-xl md:text-2xl font-body italic text-gray-700 border-l-4 border-rust pl-6 py-2">
            "{t.summary}"
          </p>
          
          {/* Social Share Buttons */}
          <div className="border-t-2 border-b-2 border-ink py-4 my-6">
            <SocialShareButtons 
              url={shareUrl}
              title={t.headline}
              description={t.summary}
            />
          </div>

          <div className="prose prose-lg prose-headings:font-headline prose-p:font-body max-w-none">
            {t.content.map((section: any, idx: number) => (
              <div key={idx} className="mb-8">
                <h3 className="text-2xl font-bold mb-4 uppercase font-subhead border-b-2 border-ink inline-block pb-1">
                  {section.title}
                </h3>
                <p className="text-lg leading-relaxed text-justify">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* Mundial 2026 CTA */}
          <div className="bg-gradient-to-r from-green-700 to-green-900 text-white border-4 border-ink p-8 neo-shadow my-12">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl" aria-hidden="true">⚽</div>
                <h3 className="text-3xl font-headline">{lang === 'es' ? 'Mundial 2026 en Coyoacán' : 'World Cup 2026 in Coyoacán'}</h3>
              </div>
              <p className="text-lg mb-6 font-body leading-relaxed">
                {lang === 'es' 
                  ? 'Coyoacán será sede del Mundial de Fútbol 2026 por tercera ocasión. Hospédate en el corazón de la acción y vive la experiencia del torneo más importante del planeta a solo pasos del Estadio Azteca. Reserva ahora tu alojamiento con SúperAnfitrión Coyoacán y forma parte de la historia.'
                  : 'Coyoacán will host the 2026 FIFA World Cup for the third time. Stay in the heart of the action and experience the world\'s most important tournament just steps from Estadio Azteca. Book your accommodation now with SúperAnfitrión Coyoacán and be part of history.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/hospedaje-mundial-2026"
                  className="inline-block bg-white text-green-900 px-8 py-4 font-subhead uppercase text-lg hover:bg-gray-100 transition-colors border-2 border-white hover:border-ink shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1A1A1A] text-center"
                >
                  {lang === 'es' ? '⚡ RESERVAR AHORA - SOLO 3 DISPONIBLES' : '⚡ BOOK NOW - ONLY 3 LEFT'}
                </a>
                <a
                  href="https://wa.me/525511427252?text=Hola%2C%20me%20interesa%20hospedarme%20en%20Coyoac%C3%A1n%20para%20el%20Mundial%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-transparent text-white px-8 py-4 font-subhead uppercase text-lg hover:bg-white hover:text-green-900 transition-colors border-2 border-white hover:border-ink text-center"
                >
                  {lang === 'es' ? '📱 WhatsApp' : '📱 WhatsApp'}
                </a>
              </div>
            </div>
          </div>

          {/* Conversion CTA */}
          <div className="bg-gradient-to-r from-rust to-orange-700 text-white border-4 border-ink p-8 neo-shadow my-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-headline mb-4">{t.ctaTitle}</h3>
              <p className="text-lg mb-6 font-body">{t.ctaText}</p>
              <a
                href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-rust px-8 py-4 font-subhead uppercase text-lg hover:bg-newsprint transition-colors border-2 border-ink shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1A1A1A]"
              >
                {t.ctaButton}
              </a>
            </div>
          </div>

          {/* Menu Highlights Grid */}
          <div className="bg-white border-4 border-ink p-6 neo-shadow mt-12">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-ink pb-4">
              <Coffee className="w-8 h-8 text-rust" aria-hidden="true" />
              <h3 className="text-2xl font-subhead uppercase">{t.menuTitle}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.menuItems.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-start border-b border-dashed border-gray-400 pb-2">
                  <div>
                    <h4 className="font-bold font-subhead text-lg">{item.item}</h4>
                    <p className="text-sm text-gray-600 italic">{item.desc}</p>
                  </div>
                  <span className="font-bold bg-newsprint px-2 py-1 border border-ink text-sm">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
          

          {/* Related Articles */}
          {allArticles && (
            <RelatedArticles 
              currentArticleSlug={currentArticle.slug}
              currentCategory={lang === 'es' ? currentArticle.categoryEs : currentArticle.categoryEn}
              allArticles={allArticles.map(art => ({
                slug: art.slug,
                headlineEs: art.headlineEs,
                summaryEs: art.summaryEs,
                heroImage: art.heroImage,
                categoryEs: art.categoryEs,
                dateEs: art.dateEs
              }))}
            />
          )}

        </section>

        {/* Sidebar / Info Panel */}
        <aside className="md:col-span-4 space-y-8">
          
          {/* Map Card */}
          <div className="bg-white border-4 border-ink p-4 neo-shadow">
            <div className="h-[300px] w-full border-2 border-ink mb-4 relative z-0">
              <MapContainer 
                center={[parseFloat(currentArticle.locationLat), parseFloat(currentArticle.locationLng)]} 
                zoom={16} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                aria-label={lang === 'es' ? 'Mapa de ubicación' : 'Location map'}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  className="leaflet-tile-layer"
                  eventHandlers={{
                    tileload: (e: any) => {
                      // Agregar alt text INMEDIATAMENTE cuando cada tile se carga
                      if (e.tile && !e.tile.hasAttribute('alt')) {
                        e.tile.setAttribute('alt', '');
                        e.tile.setAttribute('aria-hidden', 'true');
                      }
                    }
                  }}
                />
                <Marker position={[parseFloat(currentArticle.locationLat), parseFloat(currentArticle.locationLng)]}>
                  <Popup>
                    {t.headline}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-rust mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-subhead font-bold uppercase">{t.locationTitle}</h4>
                  <p className="text-sm">{currentArticle.locationAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-rust mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-subhead font-bold uppercase">{t.hoursTitle}</h4>
                  <p className="text-sm">{t.weekHours}: {t.hoursWeek}</p>
                  <p className="text-sm">{t.sundayHours}: {t.hoursSunday}</p>
                </div>
              </div>

              <a 
                href={currentArticle.locationMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center py-3 font-subhead uppercase tracking-wider hover:bg-blue-700 transition-colors border-2 border-ink flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A]"
              >
                <Map className="w-4 h-4" aria-hidden="true" />
                {t.openMaps}
              </a>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="bg-white border-4 border-ink p-6 neo-shadow">
            <h3 className="text-xl font-headline mb-4 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-rust" aria-hidden="true" />
              {t.scanCode}
            </h3>
            <div className="flex justify-center bg-white p-4 border-2 border-ink">
              <QRCodeSVG 
                value="https://diario-coyo.manus.space/" 
                size={180}
                level="H"
                includeMargin={true}
                title={lang === 'es' ? 'Código QR para acceder al Diario Coyoacán' : 'QR Code to access Diario Coyoacán'}
              />
            </div>
            <p className="text-sm text-center mt-4 text-gray-600">
              superanfitrion.com.mx/diario
            </p>
          </div>

          {/* Previous Editions - Limited to 5 */}
          {allArticles && allArticles.length > 1 && (
            <div className="bg-white border-4 border-ink p-6 neo-shadow">
              <h3 className="text-xl font-headline mb-4">{t.previousEditions}</h3>
              <div className="space-y-3">
                {allArticles.slice(0, 5).map((art) => (
                  <a
                    key={art.id}
                    href={`/diario?slug=${art.slug}`}
                    className={`block p-3 border-2 border-ink hover:bg-newsprint transition-colors ${
                      art.slug === currentArticle.slug ? 'bg-rust text-white' : ''
                    }`}
                  >
                    <p className="font-subhead text-sm uppercase">{art.dateISO}</p>
                    <p className="text-sm font-bold line-clamp-2">
                      {lang === 'es' ? art.headlineEs : art.headlineEn}
                    </p>
                  </a>
                ))}
              </div>
              {/* Botón Ver Todos */}
              <a
                href="/hemeroteca"
                className="block w-full mt-4 bg-ink text-newsprint text-center py-3 font-subhead uppercase tracking-wider hover:bg-rust transition-colors border-2 border-ink shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                {lang === 'es' ? 'Ver Todos los Artículos →' : 'See All Articles →'}
              </a>
            </div>
          )}

          {/* Newsletter Subscription */}
          <div className="bg-rust text-white border-4 border-ink p-6 neo-shadow">
            <h3 className="text-xl font-headline mb-2">{t.subscribeTitle}</h3>
            <p className="mb-4 font-body text-sm">{t.subscribeText}</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.subscribePlaceholder}
                className="w-full px-4 py-2 border-2 border-ink text-ink"
                required
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="w-full bg-white text-ink py-3 font-subhead uppercase tracking-wider border-2 border-ink hover:bg-newsprint hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_#1A1A1A] disabled:opacity-50"
              >
                {subscribeMutation.isPending ? (lang === 'es' ? 'Enviando...' : 'Sending...') : t.subscribeButton}
              </button>
            </form>
          </div>

          {/* Share Card */}
          <div className="bg-ink text-white border-4 border-rust p-6 neo-shadow">
            <h3 className="text-xl font-headline mb-4">
              {lang === 'es' ? '¿Te gustó este artículo?' : 'Did you like this article?'}
            </h3>
            <p className="mb-6 font-body text-sm">
              {lang === 'es' 
                ? 'Comparte este descubrimiento con tus amigos y planeen su próxima visita a Coyoacán.' 
                : 'Share this discovery with your friends and plan your next visit to Coyoacán.'}
            </p>
            <button 
              onClick={handleShare}
              className="w-full bg-white text-ink py-3 font-subhead uppercase tracking-wider border-2 border-rust hover:bg-newsprint hover:translate-x-1 hover:translate-y-1 transition-transform flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#C1666B]"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              {t.share}
            </button>
          </div>

        </aside>
      </main>

      {/* Sección Publicitaria Mundial 2026 */}
      <section className="mundial-2026-section" style={{
        background: 'linear-gradient(135deg, #1e7e34 0%, #0d5c24 100%)',
        padding: '60px 20px',
        margin: '40px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Badge */}
          <div style={{ textAlign: 'center' }}>
            <span style={{
              display: 'inline-block',
              background: 'white',
              color: '#1A1A1A',
              padding: '12px 30px',
              border: '3px solid #1A1A1A',
              fontWeight: 700,
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '30px',
              boxShadow: '6px 6px 0px 0px #1A1A1A'
            }}>
              ⚽ Mundial de Fútbol 2026
            </span>
          </div>
          
          {/* Título y subtítulo */}
          <h2 style={{
            fontSize: '42px',
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Hospédate en Coyoacán Durante el Mundial 2026
          </h2>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 20px',
            lineHeight: 1.6
          }}>
            Propiedades verificadas a 20-25 minutos del Estadio Azteca. Evita el tráfico con Metro Línea 2 directo. Vive la experiencia cultural de Coyoacán mientras disfrutas del evento deportivo más grande del mundo.
          </p>
          <p style={{
            marginTop: '20px',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: '900px',
            margin: '20px auto 0'
          }}>
            📺 <strong>¿No alcanzaste boletos?</strong> No te preocupes. En nuestras <strong>pantallas gigantes</strong> podrás ver todos los partidos en la comodidad de <strong>SúperAnfitrión Coyoacán</strong>. ¡Ambiente de estadio sin salir de casa!
          </p>
          
          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            <a 
              href="https://superanfitrion.com.mx/mundial-2026" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 40px',
                background: 'white',
                color: '#1A1A1A',
                border: '4px solid #1A1A1A',
                fontWeight: 700,
                fontSize: '18px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '8px 8px 0px 0px #1A1A1A',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '4px 4px 0px 0px #1A1A1A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '8px 8px 0px 0px #1A1A1A';
              }}
            >
              <span>📅</span>
              <span>Ver Disponibilidad y Prereservas</span>
            </a>
            
            <a 
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 40px',
                background: 'transparent',
                color: 'white',
                border: '4px solid white',
                fontWeight: 700,
                fontSize: '18px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '8px 8px 0px 0px rgba(255, 255, 255, 0.3)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#1e7e34';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              <span>📅</span>
              <span>Reservar Ahora</span>
            </a>
          </div>
          
          {/* Banner de urgencia */}
          <div style={{
            background: 'rgba(220, 53, 69, 0.9)',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            border: '3px solid #1A1A1A',
            marginTop: '40px',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <span>⚠️</span>
            <span>ALTA DEMANDA: Solo quedan 3 propiedades disponibles para junio 2026. Reserva ahora y asegura tu lugar.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-newsprint py-12 mt-12 border-t-8 border-rust">
        <div className="max-w-7xl mx-auto px-8">
          {/* Newsletter Subscription */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-newsprint text-ink p-8 border-4 border-rust neo-shadow">
              <h3 className="text-2xl font-headline mb-3 text-center">
                {lang === 'es' ? '📨 Suscríbete al Newsletter' : '📨 Subscribe to Newsletter'}
              </h3>
              <p className="text-sm font-body mb-6 text-center opacity-80">
                {lang === 'es' 
                  ? 'Recibe las noticias más importantes de Coyoacán directamente en tu correo cada día.'
                  : 'Get the most important news from Coyoacán directly to your email every day.'}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email || !email.includes('@')) {
                    toast.error(lang === 'es' ? 'Por favor ingresa un email válido' : 'Please enter a valid email');
                    return;
                  }
                  
                  subscribeMutation.mutate({ email });
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'es' ? 'Tu correo electrónico' : 'Your email address'}
                  className="flex-1 px-4 py-3 border-2 border-ink font-body text-sm focus:outline-none focus:ring-2 focus:ring-rust"
                  disabled={subscribeMutation.isPending}
                />
                <button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="px-6 py-3 bg-rust text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-ink transition-colors shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {subscribeMutation.isPending 
                    ? (lang === 'es' ? 'Enviando...' : 'Sending...') 
                    : (lang === 'es' ? 'Suscribirse' : 'Subscribe')}
                </button>
              </form>
            </div>
          </div>

          {/* Directorio de enlaces */}
          <div className="border-t-2 border-newsprint/20 pt-10 mb-10">
            <h3 className="text-xs font-subhead uppercase tracking-widest opacity-50 mb-6 text-center">
              {lang === 'es' ? 'DIRECTORIO DE SITIOS' : 'SITE DIRECTORY'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

              {/* Columna 1: Diario Coyoacán */}
              <div>
                <h4 className="font-subhead uppercase text-sm tracking-wider mb-4 border-b border-newsprint/30 pb-2 text-rust">
                  Diario Coyoacán
                </h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Portada' : 'Front Page'}</a></li>
                  <li><a href="/noticias" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Noticias' : 'News'}</a></li>
                  <li><a href="/hemeroteca" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Hemeroteca' : 'Archive'}</a></li>
                  <li><a href="/hospedaje-mundial-2026" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Hospedaje Mundial 2026' : 'World Cup 2026 Lodging'}</a></li>
                </ul>
              </div>

              {/* Columna 2: SúperAnfitrión — Hospedaje */}
              <div>
                <h4 className="font-subhead uppercase text-sm tracking-wider mb-4 border-b border-newsprint/30 pb-2 text-rust">
                  {lang === 'es' ? 'Hospedaje' : 'Lodging'}
                </h4>
                <ul className="space-y-2">
                  <li><a href="https://superanfitrion.com.mx/" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">SúperAnfitrión Coyoacán</a></li>
                  <li><a href="https://superanfitrion.com.mx/alojamientos" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Alojamientos' : 'Accommodations'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/hospedaje-estudiantes" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Para Estudiantes' : 'For Students'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/nomadas-digitales" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Nómadas Digitales' : 'Digital Nomads'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/renta-mensual" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Renta Mensual' : 'Monthly Rental'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/mundial-2026" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">Mundial 2026</a></li>
                  <li><a href="https://superanfitrion.com.mx/en/world-cup-2026" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">World Cup 2026 (EN)</a></li>
                </ul>
              </div>

              {/* Columna 3: SúperAnfitrión — El Barrio */}
              <div>
                <h4 className="font-subhead uppercase text-sm tracking-wider mb-4 border-b border-newsprint/30 pb-2 text-rust">
                  {lang === 'es' ? 'El Barrio' : 'The Neighborhood'}
                </h4>
                <ul className="space-y-2">
                  <li><a href="https://superanfitrion.com.mx/barrio" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Coyoacán' : 'Coyoacán'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/lugares-pet-friendly" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Lugares Pet-Friendly' : 'Pet-Friendly Places'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/blog" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">Blog</a></li>
                  <li><a href="https://superanfitrion.com.mx/ayuda" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Ayuda' : 'Help'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/politica-mascotas" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Política de Mascotas' : 'Pet Policy'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/politicas" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Políticas de Convivencia' : 'House Rules'}</a></li>
                  <li><a href="https://superanfitrion.com.mx/acceso-huespedes" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">{lang === 'es' ? 'Acceso Huéspedes' : 'Guest Access'}</a></li>
                </ul>
              </div>

              {/* Columna 4: Contacto y Reservas */}
              <div>
                <h4 className="font-subhead uppercase text-sm tracking-wider mb-4 border-b border-newsprint/30 pb-2 text-rust">
                  {lang === 'es' ? 'Contacto' : 'Contact'}
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://wa.me/525511427252" target="_blank" rel="noopener noreferrer" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">
                      📱 +52 55 1142 7252
                    </a>
                  </li>
                  <li>
                    <a href="mailto:superanfitrioncoyoacan@gmail.com" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-rust transition-colors block">
                      ✉️ superanfitrioncoyoacan@gmail.com
                    </a>
                  </li>
                  <li className="pt-2">
                    <a
                      href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-rust text-white border-2 border-newsprint font-subhead uppercase text-xs hover:bg-newsprint hover:text-ink transition-colors shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                    >
                      {lang === 'es' ? 'RESERVAR AHORA' : 'BOOK NOW'}
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Footer Info + Redes Sociales */}
          <div className="text-center border-t border-newsprint/20 pt-8">
            <h2 className="text-3xl font-headline mb-3">Diario Coyoacán</h2>
            <p className="font-subhead uppercase tracking-widest text-xs opacity-50 mb-6">
              {lang === 'es' ? 'Periodismo local • Cultura • Gastronomía' : 'Local Journalism • Culture • Gastronomy'}
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/SuperAnfitrionCoyoacan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook SúperAnfitrión Coyoacán"
                className="w-9 h-9 border-2 border-newsprint/40 flex items-center justify-center hover:border-rust hover:text-rust transition-colors opacity-70 hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/superanfitrioncoyo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram SúperAnfitrión Coyoacán"
                className="w-9 h-9 border-2 border-newsprint/40 flex items-center justify-center hover:border-rust hover:text-rust transition-colors opacity-70 hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@SuperAnfitrioncoyo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube SúperAnfitrión Coyoacán"
                className="w-9 h-9 border-2 border-newsprint/40 flex items-center justify-center hover:border-rust hover:text-rust transition-colors opacity-70 hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/525511427252"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp SúperAnfitrión Coyoacán"
                className="w-9 h-9 border-2 border-newsprint/40 flex items-center justify-center hover:border-rust hover:text-rust transition-colors opacity-70 hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>

              {/* Web */}
              <a
                href="https://superanfitrion.com.mx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sitio web SúperAnfitrión Coyoacán"
                className="w-9 h-9 border-2 border-newsprint/40 flex items-center justify-center hover:border-rust hover:text-rust transition-colors opacity-70 hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
            </div>

            <p className="text-xs font-mono opacity-40">
              &copy; 2026 Diario Coyoacán • SúperAnfitrión Coyoacán. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
      
      {/* Banner flotante de conversión */}
      <PromoBanner />
      
      {/* Widget flotante de WhatsApp */}
      <WhatsAppWidget />
    </div>
  );
}
