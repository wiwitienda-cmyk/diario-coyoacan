import { useEffect } from 'react';

interface DisqusCommentsProps {
  articleSlug: string;
  articleTitle: string;
}

/**
 * Componente de comentarios usando Disqus
 * 
 * Para configurar:
 * 1. Ve a https://disqus.com/admin/create/
 * 2. Crea un nuevo sitio con el nombre "diario-coyoacan"
 * 3. El shortname será "diario-coyoacan"
 * 4. Configura la URL del sitio como: https://diario-coyoacan.manus.space
 */
export default function DisqusComments({ articleSlug, articleTitle }: DisqusCommentsProps) {
  useEffect(() => {
    // Configuración de Disqus
    const disqusShortname = 'diario-coyoacan'; // Cambiar por tu shortname de Disqus
    const disqusConfig = {
      url: `${window.location.origin}/diario?slug=${articleSlug}`,
      identifier: articleSlug,
      title: articleTitle,
    };

    // Limpiar instancia anterior de Disqus si existe
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = disqusConfig.identifier;
          this.page.url = disqusConfig.url;
          this.page.title = disqusConfig.title;
        },
      });
    } else {
      // Cargar Disqus por primera vez
      window.disqus_config = function () {
        this.page.url = disqusConfig.url;
        this.page.identifier = disqusConfig.identifier;
        this.page.title = disqusConfig.title;
      };

      const script = document.createElement('script');
      script.src = `https://${disqusShortname}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', String(+new Date()));
      (document.head || document.body).appendChild(script);
    }
  }, [articleSlug, articleTitle]);

  return (
    <div className="bg-white border-4 border-ink p-6 neo-shadow mt-12">
      <h3 className="text-2xl font-subhead uppercase mb-6 border-b-2 border-ink pb-4">
        Comentarios
      </h3>
      <div id="disqus_thread"></div>
      <noscript>
        Por favor habilita JavaScript para ver los{' '}
        <a href="https://disqus.com/?ref_noscript">comentarios powered by Disqus.</a>
      </noscript>
    </div>
  );
}

// Declaración de tipos para window.DISQUS
declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config: (this: DisqusConfig) => void }) => void;
    };
    disqus_config?: (this: DisqusConfig) => void;
    page?: {
      url?: string;
      identifier?: string;
      title?: string;
    };
  }
  
  interface DisqusConfig {
    page: {
      url: string;
      identifier: string;
      title: string;
    };
  }
}
