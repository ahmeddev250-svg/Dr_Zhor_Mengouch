import React, { useState } from 'react';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';

export default function Navbar({ onOpenModal }) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '#accueil', label: t.nav.home },
    { href: '#docteur', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#avis', label: t.nav.reviews },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-navigation">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-6">
        <a href="#accueil" className="flex items-center gap-3 shrink-0 group">
          <img
            src={logoImg}
            alt="Logo Cabinet Dr. Zhor Mengouch"
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-contain shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
          <div className="min-w-0">
            <p className="text-lg sm:text-xl font-extrabold text-brand-espresso leading-tight whitespace-nowrap">
              {t.brandName}
            </p>
            <p className="text-xs sm:text-sm font-medium text-brand-bronze whitespace-nowrap">
              {t.brandSubtitle}
            </p>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base font-semibold text-stone-700 hover:text-brand-bronze transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div className="flex items-center rounded-full bg-brand-sand/90 p-1 border border-brand-bronze/15">
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                lang === 'fr'
                  ? 'bg-brand-bronze text-white shadow-sm'
                  : 'text-stone-700 hover:text-brand-bronze'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                lang === 'ar'
                  ? 'bg-brand-bronze text-white shadow-sm'
                  : 'text-stone-700 hover:text-brand-bronze'
              }`}
            >
              AR
            </button>
          </div>

          <a
            href={CLINIC_INFO.telHref}
            dir="ltr"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-brand-bronze/25 bg-white/80 text-brand-espresso hover:bg-brand-cream text-sm font-bold transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 text-brand-bronze" />
            <span>{CLINIC_INFO.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenModal()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-bronze hover:bg-brand-espresso text-white text-sm font-bold shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.nav.book}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
            className="px-3 py-1.5 rounded-full bg-brand-sand text-brand-espresso text-xs font-extrabold border border-brand-bronze/20"
          >
            {lang === 'fr' ? 'AR' : 'FR'}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="p-2.5 rounded-xl bg-white/80 border border-brand-bronze/15 text-brand-espresso"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-brand-ivory/95 backdrop-blur-xl border-b border-brand-bronze/15 px-5 py-5 space-y-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-stone-800 hover:text-brand-bronze py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-brand-bronze/10 flex flex-col gap-2.5">
            <a
              href={CLINIC_INFO.telHref}
              dir="ltr"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-bronze/25 bg-white text-brand-espresso font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-brand-bronze" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-bronze text-white font-bold text-sm shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.book}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
