import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';

/**
 * Página principal que redirige automáticamente al Diario Coyoacán
 * Esta es una subpágina de superanfitrion.com.mx
 */
export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirigir automáticamente a /diario
    setLocation('/diario');
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-newsprint">
      <Helmet>
        <title>Diario Coyoacán - Noticias y Lugares</title>
        <meta name="description" content="Descubre los mejores lugares de Coyoacán, CDMX. Noticias diarias, cultura, gastronomía y recomendaciones locales." />
        <meta name="keywords" content="Coyoacán, CDMX, Ciudad de México, turismo, hospedaje, cultura, gastronomía, lugares, noticias" />
      </Helmet>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ink mx-auto"></div>
        <p className="mt-4 font-subhead text-ink">Cargando Diario Coyoacán...</p>
      </div>
    </div>
  );
}
