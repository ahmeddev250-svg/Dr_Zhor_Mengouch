import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Globe } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { useLanguage } from './LanguageContext.jsx';
import { BUSINESS_INFO } from './translations.js';

export default function Navbar({ onOpenBooking }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '#accueil', label: t.nav.home },
    { href: '#docteur', label: t.nav.about },
    { href: '#soins', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#avis', label: t.nav.testimonials },
  ];

  const handleMobileLink = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 glass-navigation">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-4 lg:gap-6">
          <a
            href="#accueil"
            className="flex items-center gap-3 sm:gap-3.5 shrink-0 group focus:outline-none"
          >
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-brand-plum flex items-center justify-center p-1.5 shadow-md ring-2 ring-brand-gold/40 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src={logoImg}
                alt={t.brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-extrabold text-brand-ink tracking-tight leading-tight whitespace-nowrap">
                {t.brand.name}
              </span>
              <span className="text-xs sm:text-sm font-medium text-brand-bronze whitespace-nowrap">
                {t.brand.subtitle}
              </span>
            </div>
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-5 2xl:gap-7"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-semibold text-brand-ink/85 hover:text-brand-plum transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5 lg:gap-3.5 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Changer de langue / تغيير اللغة"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full glass-pill text-sm font-bold text-brand-plum hover:bg-brand-plum hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>{language === 'fr' ? 'AR' : 'FR'}</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              dir="ltr"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-pill text-sm font-bold text-brand-ink hover:border-brand-plum/40 hover:text-brand-plum transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-brand-plum shrink-0" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-plum text-white text-sm font-bold shadow-md hover:bg-brand-bronzeDark transition-all whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full glass-pill text-xs font-bold text-brand-plum"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'AR' : 'FR'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={mobileOpen}
              className="p-2.5 rounded-xl glass-pill text-brand-ink hover:text-brand-plum"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-brand-plum/10 bg-white/95 backdrop-blur-xl px-4 pt-4 pb-6 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMobileLink}
                className="px-4 py-3 rounded-xl text-base font-semibold text-brand-ink hover:bg-brand-sand/70 hover:text-brand-plum transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-brand-plum/10 flex flex-col gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              dir="ltr"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full glass-pill text-sm font-bold text-brand-ink"
            >
              <Phone className="w-4 h-4 text-brand-plum" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-plum text-white text-sm font-bold shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
