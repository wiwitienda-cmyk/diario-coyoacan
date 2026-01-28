import { Facebook, Twitter, MessageCircle } from 'lucide-react';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export default function SocialShareButtons({ url, title, description }: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=DiarioCoyoacan`,
  };

  const handleShare = (platform: string, link: string) => {
    window.open(link, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex gap-3 items-center">
      <span className="font-subhead uppercase text-sm text-gray-700">Compartir:</span>
      
      <button
        onClick={() => handleShare('whatsapp', shareLinks.whatsapp)}
        className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-[#1da851] transition-colors shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A1A1A]"
        aria-label="Compartir en WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      <button
        onClick={() => handleShare('facebook', shareLinks.facebook)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-[#0c63d4] transition-colors shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A1A1A]"
        aria-label="Compartir en Facebook"
      >
        <Facebook className="w-4 h-4" />
        <span className="hidden sm:inline">Facebook</span>
      </button>

      <button
        onClick={() => handleShare('twitter', shareLinks.twitter)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white border-2 border-ink font-subhead uppercase text-sm hover:bg-[#0c85d0] transition-colors shadow-[2px_2px_0px_0px_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1A1A1A]"
        aria-label="Compartir en Twitter"
      >
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">Twitter</span>
      </button>
    </div>
  );
}
