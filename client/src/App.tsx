import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Clock, Coffee, Navigation, Share2, Menu, X } from 'lucide-react';
import { articleData } from './data';
import 'leaflet/dist/leaflet.css';

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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const shareUrl = window.location.href;
  const title = articleData.headline;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: articleData.summary,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback
      alert('Link copiado al portapapeles');
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-newsprint text-ink font-body selection:bg-rust selection:text-white">
        <Helmet>
          <title>{articleData.headline} | Diario Coyoacán</title>
          <meta name="description" content={articleData.summary} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://diariocoyoacan.com/cafe-avellaneda" />
          <meta property="og:title" content={articleData.headline} />
          <meta property="og:description" content={articleData.summary} />
          <meta property="og:image" content="/images/cafe-avellaneda-hero.jpg" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://diariocoyoacan.com/cafe-avellaneda" />
          <meta property="twitter:title" content={articleData.headline} />
          <meta property="twitter:description" content={articleData.summary} />
          <meta property="twitter:image" content="/images/cafe-avellaneda-hero.jpg" />
        </Helmet>

        {/* Marquee Header */}
        <div className="bg-ink text-newsprint py-2 overflow-hidden whitespace-nowrap border-b-4 border-rust">
          <div className="animate-marquee inline-block font-subhead uppercase tracking-widest text-sm">
            HOY EN COYOACÁN: {articleData.headline} • CLIMA: {articleData.weather.condition.toUpperCase()} {articleData.weather.temp}°C • 
            HOY EN COYOACÁN: {articleData.headline} • CLIMA: {articleData.weather.condition.toUpperCase()} {articleData.weather.temp}°C •
          </div>
        </div>

        {/* Main Header */}
        <header className="border-b-4 border-ink p-4 md:p-8 flex justify-between items-center bg-newsprint sticky top-0 z-40">
          <div>
            <h1 className="text-4xl md:text-6xl font-headline leading-none">Diario Coyoacán</h1>
            <p className="font-subhead text-sm md:text-base uppercase tracking-widest mt-1 text-rust">
              {articleData.date} • {articleData.category}
            </p>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 border-2 border-ink hover:bg-ink hover:text-newsprint transition-colors"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Hero Section */}
          <section className="md:col-span-8 space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-ink translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
              <img 
                src="/images/cafe-avellaneda-hero.jpg" 
                alt="Interior de Café Avellaneda" 
                className="relative w-full h-[400px] md:h-[500px] object-cover border-4 border-ink grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-4 right-4 bg-rust text-white px-4 py-2 font-subhead uppercase text-sm border-2 border-ink rotate-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
                Recomendado
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-headline leading-tight mt-8">
              {articleData.headline}
            </h2>
            
            <p className="text-xl md:text-2xl font-body italic text-gray-700 border-l-4 border-rust pl-6 py-2">
              "{articleData.summary}"
            </p>

            <div className="prose prose-lg prose-headings:font-headline prose-p:font-body max-w-none">
              {articleData.content.map((section, idx) => (
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
                <Coffee className="w-8 h-8 text-rust" />
                <h3 className="text-2xl font-subhead uppercase">Menú Destacado</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articleData.menuHighlights.map((item, idx) => (
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
            <div className="bg-white border-4 border-ink p-4 neo-shadow sticky top-32">
              <div className="h-[300px] w-full border-2 border-ink mb-4 relative z-0">
                <MapContainer 
                  center={[articleData.location.lat, articleData.location.lng]} 
                  zoom={16} 
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[articleData.location.lat, articleData.location.lng]}>
                    <Popup>
                      Café Avellaneda <br /> ¡Aquí estamos!
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-rust mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-subhead font-bold uppercase">Ubicación</h4>
                    <p className="text-sm">{articleData.location.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-rust mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-subhead font-bold uppercase">Horarios</h4>
                    <p className="text-sm">Lun-Sáb: {articleData.hours.week}</p>
                    <p className="text-sm">Dom: {articleData.hours.sunday}</p>
                  </div>
                </div>

                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${articleData.location.lat},${articleData.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-ink text-newsprint text-center py-3 font-subhead uppercase tracking-wider hover:bg-rust transition-colors border-2 border-transparent hover:border-ink flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Cómo Llegar
                </a>
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-rust text-white border-4 border-ink p-6 neo-shadow">
              <h3 className="text-xl font-headline mb-4">¿Te gustó este artículo?</h3>
              <p className="mb-6 font-body text-sm">Comparte este descubrimiento con tus amigos y planeen su próxima visita a Coyoacán.</p>
              <button 
                onClick={handleShare}
                className="w-full bg-white text-ink py-3 font-subhead uppercase tracking-wider border-2 border-ink hover:bg-newsprint hover:translate-x-1 hover:translate-y-1 transition-transform flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A]"
              >
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>

            {/* Image Gallery Preview */}
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/coffee-detail.jpg" alt="Detalle café" className="w-full h-32 object-cover border-2 border-ink grayscale hover:grayscale-0 transition-all" />
              <img src="/images/panque-naranja.jpg" alt="Panqué" className="w-full h-32 object-cover border-2 border-ink grayscale hover:grayscale-0 transition-all" />
            </div>

          </aside>
        </main>

        {/* Footer */}
        <footer className="bg-ink text-newsprint py-12 mt-12 border-t-8 border-rust">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-headline mb-4">Diario Coyoacán</h2>
            <p className="font-subhead uppercase tracking-widest text-sm opacity-70 mb-8">
              Periodismo local • Cultura • Gastronomía
            </p>
            <p className="text-xs font-mono opacity-50">
              &copy; 2026 Diario Coyoacán. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;
