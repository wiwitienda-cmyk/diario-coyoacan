import { Link } from 'wouter';

interface Article {
  slug: string;
  headlineEs: string;
  summaryEs: string;
  heroImage: string;
  categoryEs: string;
  dateEs: string;
}

interface RelatedArticlesProps {
  currentArticleSlug: string;
  currentCategory: string;
  allArticles: Article[];
}

export function RelatedArticles({ currentArticleSlug, currentCategory, allArticles }: RelatedArticlesProps) {
  // Filter articles by same category, exclude current article, and limit to 3
  const relatedArticles = allArticles
    .filter(article => 
      article.categoryEs === currentCategory && 
      article.slug !== currentArticleSlug
    )
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t-4 border-ink">
      <h2 className="text-3xl font-headline mb-8 uppercase">
        Artículos Relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {relatedArticles.map((article) => (
          <Link key={article.slug} href={`/articulo/${article.slug}`} className="block group">
            <div className="relative overflow-hidden border-4 border-ink mb-4">
              <img 
                src={article.heroImage} 
                alt={article.headlineEs}
                className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-rust text-white px-3 py-1 text-xs font-subhead uppercase border-2 border-ink">
                {article.categoryEs}
              </div>
            </div>
            <h3 className="font-headline text-lg mb-2 group-hover:text-rust transition-colors">
              {article.headlineEs}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {article.summaryEs}
            </p>
            <p className="text-xs text-gray-500 mt-2 font-subhead uppercase">
              {article.dateEs}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
