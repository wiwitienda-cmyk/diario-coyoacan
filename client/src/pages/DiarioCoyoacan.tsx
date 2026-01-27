import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Clock, Coffee, Navigation, Share2, Menu, X, Globe, Map, QrCode } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { QRCodeSVG } from 'qrcode.react';

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

// Translations
const translations = {
  es: {
    headline: "Café Avellaneda: Un rincón auténtico para café y antojos en Coyoacán",
    summary: "Descubre Café Avellaneda, un local emblemático en Coyoacán donde el café de especialidad y la atmósfera bohemia se combinan para una experiencia auténtica y accesible.",
    category: "Gastronomía",
    date: "27 de enero de 2026",
    weather: "Lluvioso",
    menuTitle: "Menú Destacado",
    locationTitle: "Ubicación",
    hoursTitle: "Horarios",
    weekHours: "Lun-Sáb",
    sundayHours: "Dom",
    getDirections: "Cómo llegar",
    openMaps: "Abrir en Maps",
    share: "Compartir",
    subscribeTitle: "¡Suscríbete al Diario!",
    subscribeText: "Recibe las mejores recomendaciones de Coyoacán directamente en tu correo cada semana.",
    subscribePlaceholder: "Tu correo electrónico",
    subscribeButton: "Suscribirse",
    previousEditions: "Ediciones Anteriores",
    recommended: "Recomendado",
    scanCode: "Escanea para llevar",
    home: "Inicio",
    reservations: "Reservaciones",
    content: [
      {
        title: "Ambiente",
        text: "Desde que cruzas su puerta, te envuelve un ambiente íntimo y relajado que invita a sentarse, leer o platicar. Sus paredes decoradas con arte local y fotografías en blanco y negro crean una atmósfera bohemia y cálida."
      },
      {
        title: "La Experiencia",
        text: "Café Avellaneda es más que un lugar para tomar café; es una experiencia que conecta al visitante con la cultura cafetalera mexicana y el espíritu de Coyoacán, lejos de las aglomeraciones."
      }
    ],
    menuItems: [
      { item: "Café filtrado V60", desc: "Granos de Oaxaca, notas cítricas." },
      { item: "Espresso Doble", desc: "Intenso y perfectamente equilibrado." },
      { item: "Panqué de Naranja", desc: "Con chocolate, dulce y fresco." },
      { item: "Sándwich Panela", desc: "Con aguacate y jitomate." }
    ]
  },
  en: {
    headline: "Café Avellaneda: An Authentic Corner for Coffee and Cravings in Coyoacán",
    summary: "Discover Café Avellaneda, an emblematic spot in Coyoacán where specialty coffee and a bohemian atmosphere combine for an authentic and accessible experience.",
    category: "Gastronomy",
    date: "January 27, 2026",
    weather: "Rainy",
    menuTitle: "Menu Highlights",
    locationTitle: "Location",
    hoursTitle: "Opening Hours",
    weekHours: "Mon-Sat",
    sundayHours: "Sun",
    getDirections: "Get Directions",
    openMaps: "Open in Maps",
    share: "Share",
    subscribeTitle: "Subscribe to the Daily!",
    subscribeText: "Get the best Coyoacán recommendations directly to your inbox every week.",
    subscribePlaceholder: "Your email address",
    subscribeButton: "Subscribe",
    previousEditions: "Previous Editions",
    recommended: "Recommended",
    scanCode: "Scan to take away",
    home: "Home",
    reservations: "Reservations",
    content: [
      {
        title: "Atmosphere",
        text: "From the moment you walk through the door, you are enveloped in an intimate and relaxed atmosphere that invites you to sit, read, or chat. Its walls decorated with local art and black and white photographs create a warm, bohemian vibe."
      },
      {
        title: "The Experience",
        text: "Café Avellaneda is more than just a place to drink coffee; it is an experience that connects the visitor with Mexican coffee culture and the spirit of Coyoacán, away from the crowds."
      }
    ],
    menuItems: [
      { item: "V60 Pour-over", desc: "Oaxacan beans, citrus notes." },
      { item: "Double Espresso", desc: "Intense and perfectly balanced." },
      { item: "Orange Pound Cake", desc: "With chocolate, sweet and fresh." },
      { item: "Panela Cheese Sandwich", desc: "With avocado and tomato." }
    ]
  }
};

// Static Data
const staticData = {
  slug: "cafe-avellaneda-un-rincon-autentico-para-cafe-y-antojos-en-coyoacan-2026-01-27",
  weatherTemp: 27,
  location: {
    address: "Higuera 40, Coyoacán, CDMX",
    lat: 19.3495, 
    lng: -99.1625,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+Avellaneda+Coyoacan"
  },
  hours: {
    week: "08:00 - 18:00",
    sunday: "09:00 - 15:00"
  },
  menuPrices: ["$40 - $70", "$45", "$45", "$60"]
};

export default function DiarioCoyoacan() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];

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
      alert('Link copiado al portapapeles');
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-newsprint text-ink font-body-news selection:bg-rust selection:text-white pt-20">
      <Helmet>
        <title>{t.headline} | Diario Coyoacán</title>
        <meta name="description" content={t.summary} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://superanfitrion.com.mx/diario" />
        <meta property="og:title" content={t.headline} />
        <meta property="og:description" content={t.summary} />
        <meta property="og:image" content="/images/cafe-avellaneda-real.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://superanfitrion.com.mx/diario" />
        <meta property="twitter:title" content={t.headline} />
        <meta property="twitter:description" content={t.summary} />
        <meta property="twitter:image" content="/images/cafe-avellaneda-real.jpg" />
      </Helmet>

      {/* Marquee Header */}
      <div className="bg-ink text-newsprint py-2 overflow-hidden whitespace-nowrap border-b-4 border-rust">
        <div className="animate-marquee inline-block font-subhead uppercase tracking-widest text-sm">
          HOY EN COYOACÁN: {t.headline} • CLIMA: {t.weather.toUpperCase()} {staticData.weatherTemp}°C • 
          HOSPÉDATE EN EL CORAZÓN DE COYOACÁN: RESERVA EN SUPERANFITRION.COM.MX • 
          DESCUBRE LOS MEJORES LUGARES DE LA CDMX • 
          HOY EN COYOACÁN: {t.headline} • CLIMA: {t.weather.toUpperCase()} {staticData.weatherTemp}°C • 
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
        <div className="flex gap-4 items-center">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="https://superanfitrion.com.mx/" className="px-4 py-2 border-2 border-ink font-subhead uppercase text-sm hover:bg-ink hover:text-newsprint transition-colors">
            {t.home}
          </a>
          <a href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-rust text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-ink transition-colors shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]">
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
              src="/images/cafe-avellaneda-real.jpg" 
              alt="Café Avellaneda" 
              className="relative w-full h-[400px] md:h-[500px] object-cover border-4 border-ink grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute top-4 right-4 bg-rust text-white px-4 py-2 font-subhead uppercase text-sm border-2 border-ink rotate-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
              {t.recommended}
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-headline leading-tight mt-8">
            {t.headline}
          </h2>
          
          <p className="text-xl md:text-2xl font-body-news italic text-gray-700 border-l-4 border-rust pl-6 py-2">
            "{t.summary}"
          </p>

          <div className="prose prose-lg prose-headings:font-headline prose-p:font-body-news max-w-none">
            {t.content.map((section, idx) => (
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

          {/* Newsletter Section */}
          <div className="bg-newsprint border-4 border-ink p-8 neo-shadow mt-12 text-center">
            <h3 className="text-3xl font-headline mb-4">{t.subscribeTitle}</h3>
            <p className="font-body-news text-lg mb-6">{t.subscribeText}</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t.subscribePlaceholder}
                className="flex-1 p-3 border-2 border-ink font-body-news focus:outline-none focus:border-rust"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-ink text-white font-subhead uppercase tracking-wider hover:bg-rust transition-colors"
              >
                {t.subscribeButton}
              </button>
            </form>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-8">
          
          {/* Map Widget */}
          <div className="border-4 border-ink p-4 bg-white neo-shadow">
            <div className="h-64 w-full mb-4 border-2 border-ink">
              <MapContainer 
                center={[staticData.location.lat, staticData.location.lng]} 
                zoom={16} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[staticData.location.lat, staticData.location.lng]}>
                  <Popup>
                    Café Avellaneda <br /> {staticData.location.address}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-rust mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-subhead uppercase text-sm text-gray-500">{t.locationTitle}</h4>
                  <p className="font-body-news font-bold">{staticData.location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-rust mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-subhead uppercase text-sm text-gray-500">{t.hoursTitle}</h4>
                  <p className="font-body-news">{t.weekHours}: {staticData.hours.week}</p>
                  <p className="font-body-news">{t.sundayHours}: {staticData.hours.sunday}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <a 
                  href={staticData.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 border-2 border-ink flex items-center justify-center gap-2 font-subhead uppercase text-sm hover:bg-ink hover:text-white transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  {t.getDirections}
                </a>
                
                <a 
                  href={staticData.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-blue-600 text-white border-2 border-ink flex items-center justify-center gap-2 font-subhead uppercase text-sm hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  <Map className="w-4 h-4" />
                  {t.openMaps}
                </a>
              </div>
            </div>
          </div>

          {/* Menu Highlights */}
          <div className="border-4 border-ink p-6 bg-newsprint neo-shadow relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-rust rotate-45"></div>
            <h3 className="text-2xl font-headline mb-6 flex items-center gap-2">
              <Coffee className="w-6 h-6 text-rust" />
              {t.menuTitle}
            </h3>
            <ul className="space-y-4">
              {t.menuItems.map((item, idx) => (
                <li key={idx} className="border-b border-gray-300 pb-2 last:border-0">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold font-subhead uppercase">{item.item}</span>
                    <span className="font-mono text-sm text-rust">{staticData.menuPrices[idx]}</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code Widget */}
          <div className="border-4 border-ink p-6 bg-white neo-shadow text-center">
            <h3 className="text-xl font-headline mb-4 flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-rust" />
              {t.scanCode}
            </h3>
            <div className="bg-white p-2 inline-block border-2 border-ink mb-2">
              <QRCodeSVG 
                value="https://superanfitrion.com.mx/diario" 
                size={150}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-xs font-mono text-gray-500 mt-2">superanfitrion.com.mx/diario</p>
          </div>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="w-full py-4 bg-rust text-white font-headline text-xl uppercase tracking-widest border-4 border-ink hover:bg-ink transition-colors flex items-center justify-center gap-3 neo-shadow"
          >
            <Share2 className="w-6 h-6" />
            {t.share}
          </button>

          {/* Previous Editions */}
          <div className="border-4 border-ink p-4 bg-gray-100">
            <h4 className="font-subhead uppercase text-sm text-gray-500 mb-3 border-b-2 border-gray-300 pb-1">
              {t.previousEditions}
            </h4>
            <ul className="space-y-2">
              <li className="text-sm font-body-news text-gray-400 italic">
                No hay ediciones anteriores disponibles.
              </li>
            </ul>
          </div>

        </aside>
      </main>

      <footer className="bg-ink text-newsprint py-8 mt-12 border-t-8 border-rust">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-headline mb-4">Diario Coyoacán</h2>
          <p className="font-mono text-sm opacity-70">
            &copy; 2026 SuperAnfitrión. Hecho con ❤️ en Coyoacán.
          </p>
        </div>
      </footer>
    </div>
  );
}
