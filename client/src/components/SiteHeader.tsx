import React, { useState } from 'react';
import { Link } from 'wouter';
import { Home, Menu, X, BookOpen, Trophy } from 'lucide-react';
import { LODGIFY_URL } from '@/components/ReservaSidebar';

interface SiteHeaderProps {
  /** Which nav item is currently active */
  active?: 'portada' | 'noticias' | 'hemeroteca' | 'mundial';
}

interface NavItem {
  key: string;
  label: string;
  href: string;
  external: boolean;
  icon?: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'home',
    label: 'Home',
    href: 'https://superanfitrion.com.mx/',
    external: true,
    icon: <Home className="w-4 h-4" />,
  },
  {
    key: 'portada',
    label: 'Portada',
    href: '/',
    external: false,
  },
  {
    key: 'noticias',
    label: 'Noticias',
    href: '/noticias',
    external: false,
  },
  {
    key: 'hemeroteca',
    label: 'Hemeroteca',
    href: '/hemeroteca',
    external: false,
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    key: 'mundial',
    label: 'Mundial 2026',
    href: '/hospedaje-mundial-2026',
    external: false,
    icon: <Trophy className="w-4 h-4" />,
  },
];

export default function SiteHeader({ active }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  const baseLink =
    'flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors';
  const activeLink = 'font-semibold text-amber-800 bg-amber-50';
  const inactiveLink = 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663072521459/Q8BeTaWP8ahBzzm2xVz4Wa/ajolote-logo-diario-EsVJhEWQzfVopJF6YnvBQb.webp"
                alt="Ajolote — Diario Coyoacán"
                className="w-10 h-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <h1
                className="text-2xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Diario Coyoacán
              </h1>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              const cls = `${baseLink} ${isActive ? activeLink : inactiveLink}`;
              if (item.external) {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                );
              }
              return (
                <Link key={item.key} href={item.href} className={cls}>
                  {item.icon && item.icon}
                  {item.label}
                </Link>
              );
            })}
            <a
              href={LODGIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-amber-800 text-white text-sm font-medium rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
            >
              Reservar
            </a>
          </nav>

          {/* Mobile: Reservar + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={LODGIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-amber-800 text-white text-sm font-medium rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
            >
              Reservar
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              const cls = `${baseLink} ${isActive ? activeLink : inactiveLink} w-full`;
              if (item.external) {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cls}
                  onClick={() => setOpen(false)}
                >
                  {item.icon && item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
