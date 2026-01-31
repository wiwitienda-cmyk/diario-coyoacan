import { X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Banner flotante con descuento especial para lectores del Diario Coyoacán
 * - Aparece después de 3 segundos de navegación
 * - Se puede cerrar y no vuelve a aparecer en la sesión
 * - Diseño coherente con el estilo periodístico del sitio
 */
// Variantes de A/B testing
const VARIANTS = [
  {
    id: 'variant-a',
    delay: 2000, // 2 segundos
    discount: '15%',
    code: 'DIARIO15',
    title: '15% de Descuento para Lectores del Diario',
    description: 'Hospédate en el corazón de Coyoacán y vive la experiencia local que acabas de leer. Usa el código',
  },
  {
    id: 'variant-b',
    delay: 5000, // 5 segundos
    discount: '20%',
    code: 'PRIMERA20',
    title: '20% de Descuento en tu Primera Noche',
    description: 'Reserva ahora y obtén 20% de descuento en tu primera noche en Coyoacán. Usa el código',
  },
  {
    id: 'variant-c',
    delay: 3000, // 3 segundos (scroll 50%)
    discount: '15%',
    code: 'DIARIO15',
    title: 'Oferta Exclusiva: 15% de Descuento',
    description: 'Descubre Coyoacán desde nuestras propiedades. Reserva con el código',
  },
];

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [variant, setVariant] = useState(VARIANTS[0]);

  useEffect(() => {
    // Verificar si el banner ya fue cerrado en esta sesión
    const wasClosed = sessionStorage.getItem("promoBannerClosed");
    if (wasClosed) return;

    // Seleccionar variante aleatoria (A/B testing)
    const randomVariant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    setVariant(randomVariant);

    // Guardar variante en sessionStorage para analytics
    sessionStorage.setItem("promoBannerVariant", randomVariant.id);

    // Mostrar el banner después del delay de la variante
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, randomVariant.delay);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("promoBannerClosed", "true");
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-md transition-all duration-300 ${
        isClosing ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="relative bg-rust border-4 border-ink shadow-[8px_8px_0px_0px_#1A1A1A] p-6">
        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 hover:bg-ink/10 rounded transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="w-5 h-5 text-newsprint" />
        </button>

        {/* Contenido del banner */}
        <div className="text-newsprint">
          <div className="font-headline text-xs uppercase tracking-widest mb-2 opacity-90">
            Oferta Exclusiva
          </div>
          <h3 className="font-headline text-2xl leading-tight mb-3">
            {variant.title}
          </h3>
          <p className="font-body text-sm mb-4 opacity-95">
            {variant.description}{' '}
            <strong className="font-subhead">{variant.code}</strong> al reservar.
          </p>
          <a
            href="https://superanfitrioncoyoacan.lodgify.com/es/httpswwwsuperanfitrioncomespropiedades"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-ink text-newsprint text-center py-3 font-subhead uppercase tracking-wider hover:bg-newsprint hover:text-ink transition-colors border-2 border-ink"
          >
            Reservar Ahora
          </a>
        </div>

        {/* Detalle decorativo */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-newsprint border-2 border-ink rotate-45"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-newsprint border-2 border-ink rotate-45"></div>
      </div>
    </div>
  );
}
