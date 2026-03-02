import { Helmet } from 'react-helmet-async';
import { MapPin, Star, Shield, Wifi, Coffee, Calendar, Users, Check, ExternalLink, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Landing Page Optimizada para SEO y Conversión
 * Objetivo: Convertir búsquedas de "hospedaje mundial 2026 coyoacán" en reservas
 */
export default function HospedajeMundial2026() {
  const handleReservarClick = () => {
    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_reservar', {
        event_category: 'conversion',
        event_label: 'landing_mundial_2026',
      });
    }
    
    // Redirect to Lodgify
    window.open('https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/525511427252?text=Hola%2C%20me%20interesa%20hospedarme%20en%20Coyoac%C3%A1n%20para%20el%20Mundial%202026', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-newsprint to-white">
      <Helmet>
        <title>Hospedaje en Coyoacán para el Mundial 2026 | SúperAnfitrión</title>
        <meta name="description" content="Hospédate en el corazón de Coyoacán para el Mundial de Fútbol 2026. Propiedades verificadas, cerca del Estadio Azteca, transporte directo. ¡Reserva ahora y asegura tu lugar!" />
        <meta name="keywords" content="hospedaje mundial 2026, alojamiento mundial 2026 méxico, donde hospedarse mundial 2026 cdmx, airbnb coyoacán mundial 2026, hoteles cerca estadio azteca, hospedaje coyoacán, alojamiento coyoacán" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diario.superanfitrion.com.mx/hospedaje-mundial-2026" />
        <meta property="og:title" content="Hospedaje en Coyoacán para el Mundial 2026 | SúperAnfitrión" />
        <meta property="og:description" content="Hospédate en el corazón de Coyoacán para el Mundial de Fútbol 2026. Propiedades verificadas, cerca del Estadio Azteca, transporte directo." />
        <meta property="og:site_name" content="Diario Coyoacán" />
        <meta property="og:locale" content="es_MX" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hospedaje en Coyoacán para el Mundial 2026 | SúperAnfitrión" />
        <meta name="twitter:description" content="Hospédate en el corazón de Coyoacán para el Mundial de Fútbol 2026. Propiedades verificadas, cerca del Estadio Azteca, transporte directo." />
        {/* Canonical */}
        <link rel="canonical" href="https://diario.superanfitrion.com.mx/hospedaje-mundial-2026" />
        {/* Schema.org LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": "SúperAnfitrión Coyoacán",
            "description": "Hospedaje verificado en Coyoacán para el Mundial 2026",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Coyoacán",
              "addressRegion": "CDMX",
              "addressCountry": "MX"
            },
            "telephone": "+52-55-1142-7252",
            "email": "superanfitrioncoyoacan@gmail.com",
            "url": "https://diario-coyo.manus.space/hospedaje-mundial-2026",
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          })}
        </script>
      </Helmet>

      {/* Header con Navegación */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-ink shadow-md">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="https://superanfitrion.com.mx/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center text-white font-headline text-xl">
              SA
            </div>
            <div>
              <p className="font-headline text-xl text-ink leading-none">SúperAnfitrión</p>
              <p className="text-xs text-gray-600 font-subhead uppercase tracking-wider">Coyoacán</p>
            </div>
          </a>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="https://superanfitrion.com.mx/" 
              className="font-subhead uppercase text-sm text-ink hover:text-green-700 transition-colors"
            >
              Home
            </a>
            <a 
              href="/diario" 
              className="font-subhead uppercase text-sm text-ink hover:text-green-700 transition-colors"
            >
              Blog
            </a>
            <a 
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rust text-white px-6 py-2 font-subhead uppercase text-sm hover:bg-orange-700 transition-colors border-2 border-ink shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1A1A]"
            >
              Reservaciones
            </a>
          </nav>

          {/* Menú Móvil */}
          <div className="md:hidden flex gap-2">
            <a 
              href="/diario" 
              className="px-4 py-2 border-2 border-ink font-subhead uppercase text-xs hover:bg-gray-100 transition-colors"
            >
              Blog
            </a>
            <a 
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rust text-white px-4 py-2 font-subhead uppercase text-xs hover:bg-orange-700 transition-colors border-2 border-ink"
            >
              Reservar
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-subhead uppercase tracking-wider">⚽ Mundial de Fútbol 2026</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-headline leading-tight mb-6">
                Hospédate en el Corazón de Coyoacán
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Propiedades verificadas a minutos del Estadio Azteca. Transporte directo, WiFi de alta velocidad, y la mejor experiencia cultural de la CDMX.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleReservarClick}
                  size="lg" 
                  className="bg-white text-green-900 hover:bg-gray-100 text-lg px-8 py-6 shadow-2xl transform hover:scale-105 transition-all"
                >
                  <Calendar className="mr-2" />
                  Ver Disponibilidad
                </Button>
                
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  <Phone className="mr-2" />
                  WhatsApp
                </Button>
              </div>
              
              {/* Prueba Social */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  ))}
                </div>
                <p className="text-white/90">
                  <strong>127 huéspedes</strong> ya reservaron para el Mundial 2026
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-subhead font-bold">20-25 min al Estadio Azteca</h3>
                      <p className="text-sm text-white/80">Metro Línea 2 directo (evita tráfico)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-subhead font-bold">Zona Segura</h3>
                      <p className="text-sm text-white/80">Coyoacán, la colonia más segura de CDMX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-subhead font-bold">Calificación 4.9/5</h3>
                      <p className="text-sm text-white/80">Basado en 127 reseñas verificadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgencia Banner */}
      <div className="bg-red-600 text-white py-3 px-4 text-center">
        <p className="font-subhead text-sm md:text-base">
          ⚠️ <strong>ALTA DEMANDA:</strong> Solo quedan 3 propiedades disponibles para junio 2026. Reserva ahora y asegura tu lugar.
        </p>
      </div>

      {/* Beneficios Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
            ¿Por Qué Hospedarte en Coyoacán?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-2 border-ink hover:shadow-xl transition-shadow">
              <MapPin className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-subhead font-bold mb-3">Ubicación Estratégica</h3>
              <p className="text-gray-700">
                A 20-25 minutos del Estadio Azteca en Metro (Línea 2). Evita el tráfico del Mundial con transporte público confiable. Además, disfruta de restaurantes, cafés, museos y la vida cultural de Coyoacán.
              </p>
            </Card>
            
            <Card className="p-6 border-2 border-ink hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-subhead font-bold mb-3">Seguridad Garantizada</h3>
              <p className="text-gray-700">
                Coyoacán es una de las colonias más seguras de la CDMX. Vigilancia 24/7, calles bien iluminadas, y comunidad amigable.
              </p>
            </Card>
            
            <Card className="p-6 border-2 border-ink hover:shadow-xl transition-shadow">
              <Coffee className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-subhead font-bold mb-3">Experiencia Auténtica</h3>
              <p className="text-gray-700">
                Vive como local en el corazón cultural de México. Mercados, plazas, arte callejero, y la mejor gastronomía mexicana.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Amenidades Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
            Amenidades Incluidas
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wifi, text: 'WiFi Alta Velocidad' },
              { icon: Coffee, text: 'Cocina Equipada' },
              { icon: Shield, text: 'Seguridad 24/7' },
              { icon: MapPin, text: 'Guía de Coyoacán' },
              { icon: Phone, text: 'Soporte 24/7' },
              { icon: Star, text: 'Limpieza Profunda' },
              { icon: Users, text: 'Espacios Compartidos' },
              { icon: Calendar, text: 'Check-in Flexible' },
            ].map((amenidad, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
                <amenidad.icon className="w-6 h-6 text-green-700 flex-shrink-0" />
                <span className="font-subhead text-sm">{amenidad.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
            Lo Que Dicen Nuestros Huéspedes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                country: 'España',
                rating: 5,
                text: 'Excelente ubicación, muy cerca del Metro y de todo. La propiedad estaba impecable y el anfitrión súper atento. ¡Volveré para el Mundial!'
              },
              {
                name: 'John Smith',
                country: 'USA',
                rating: 5,
                text: 'Perfect location in Coyoacán. Safe neighborhood, great restaurants nearby. The host was very helpful with recommendations.'
              },
              {
                name: 'Lucas Silva',
                country: 'Brasil',
                rating: 5,
                text: 'Melhor hospedagem que já tive na CDMX. Coyoacán é incrível, cheio de cultura e boa comida. Recomendo 100%!'
              }
            ].map((testimonio, idx) => (
              <Card key={idx} className="p-6 border-2 border-ink">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonio.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonio.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-subhead font-bold text-sm">{testimonio.name}</p>
                    <p className="text-xs text-gray-500">{testimonio.country}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-headline mb-6">
            ¿Listo para Vivir el Mundial 2026 en Coyoacán?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            No esperes más. Las propiedades se están agotando rápidamente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleReservarClick}
              size="lg" 
              className="bg-white text-green-900 hover:bg-gray-100 text-xl px-12 py-8 shadow-2xl transform hover:scale-105 transition-all"
            >
              <Calendar className="mr-2 w-6 h-6" />
              Reservar Ahora
            </Button>
            
            <Button 
              onClick={handleWhatsAppClick}
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 text-xl px-12 py-8"
            >
              <Phone className="mr-2 w-6 h-6" />
              Contactar por WhatsApp
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Cancelación flexible</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Confirmación inmediata</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Pago seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Botones de Navegación con Diagonales */}
      <section className="bg-gradient-to-b from-green-900 to-ink py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Botón: Regresar Arriba */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative bg-white text-ink p-6 border-4 border-ink transform hover:scale-105 transition-all shadow-[8px_8px_0px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[4px] hover:translate-y-[4px]"
              style={{ transform: 'skewY(-2deg)' }}
            >
              <div style={{ transform: 'skewY(2deg)' }} className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="font-subhead uppercase text-sm font-bold">Arriba</span>
              </div>
            </button>

            {/* Botón: Home */}
            <a
              href="https://superanfitrion.com.mx/"
              className="group relative bg-rust text-white p-6 border-4 border-ink transform hover:scale-105 transition-all shadow-[8px_8px_0px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[4px] hover:translate-y-[4px]"
              style={{ transform: 'skewY(2deg)' }}
            >
              <div style={{ transform: 'skewY(-2deg)' }} className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-subhead uppercase text-sm font-bold">Home</span>
              </div>
            </a>

            {/* Botón: Blog */}
            <a
              href="/diario"
              className="group relative bg-white text-ink p-6 border-4 border-ink transform hover:scale-105 transition-all shadow-[8px_8px_0px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[4px] hover:translate-y-[4px]"
              style={{ transform: 'skewY(-2deg)' }}
            >
              <div style={{ transform: 'skewY(2deg)' }} className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="font-subhead uppercase text-sm font-bold">Blog</span>
              </div>
            </a>

            {/* Botón: Reservaciones */}
            <a
              href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-green-700 text-white p-6 border-4 border-ink transform hover:scale-105 transition-all shadow-[8px_8px_0px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[4px] hover:translate-y-[4px]"
              style={{ transform: 'skewY(2deg)' }}
            >
              <div style={{ transform: 'skewY(-2deg)' }} className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-subhead uppercase text-sm font-bold">Reservar</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-newsprint py-8 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="font-subhead text-sm mb-4">
            <strong>SúperAnfitrión Coyoacán</strong> - Hospedaje Verificado para el Mundial 2026
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-xs opacity-70">
            <a href="tel:+525511427252" className="flex items-center gap-2 hover:opacity-100">
              <Phone className="w-4 h-4" />
              +52 55 1142 7252
            </a>
            <a href="mailto:superanfitrioncoyoacan@gmail.com" className="flex items-center gap-2 hover:opacity-100">
              <Mail className="w-4 h-4" />
              superanfitrioncoyoacan@gmail.com
            </a>
            <a href="https://superanfitrion.com.mx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-100">
              <ExternalLink className="w-4 h-4" />
              superanfitrion.com.mx
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
