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
    previousEditions: 'Ediciones Anteriores',
    recommended: 'Recomendado',
    scanCode: 'Escanea para llevar',
    home: 'Inicio',
    reservations: 'Reservaciones',
    archive: 'Ediciones Anteriores',
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
    previousEditions: 'Previous Editions',
    recommended: 'Featured',
    scanCode: 'Scan to take away',
    home: 'Home',
    reservations: 'Reservations',
    archive: 'Previous Editions',
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
        <meta name="description" content={t.summary} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={t.headline} />
        <meta property="og:description" content={t.summary} />
        <meta property="og:image" content={currentArticle.heroImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content={lang === 'es' ? 'es_MX' : 'en_US'} />
        <meta property="article:published_time" content={currentArticle.createdAt.toISOString()} />
        <meta property="article:author" content="Diario Coyoacán" />
        <meta property="article:section" content={t.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={t.headline} />
        <meta name="twitter:description" content={t.summary} />
        <meta name="twitter:image" content={currentArticle.heroImage} />
        <meta name="twitter:site" content="@DiarioCoyoacan" />
        <meta name="twitter:creator" content="@DiarioCoyoacan" />
        
        {/* Additional SEO */}
        <meta name="keywords" content="Coyoacán, hospedaje CDMX, cultura México, gastronomía Coyoacán, SúperAnfitrión, turismo Ciudad de México" />
        <meta name="author" content="Diario Coyoacán" />
        <link rel="canonical" content={shareUrl} />
      </Helmet>

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
              className="relative w-full h-[400px] md:h-[500px] object-cover border-4 border-ink grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute top-4 right-4 bg-rust text-white px-4 py-2 font-subhead uppercase text-sm border-2 border-ink rotate-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
              {t.recommended}
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-headline leading-tight mt-8">
            {t.headline}
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
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                value="https://superanfitrion.com.mx/diario" 
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

          {/* Previous Editions */}
          {allArticles && allArticles.length > 1 && (
            <div className="bg-white border-4 border-ink p-6 neo-shadow">
              <h3 className="text-xl font-headline mb-4">{t.previousEditions}</h3>
              <div className="space-y-3">
                {allArticles.map((art) => (
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
