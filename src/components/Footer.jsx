import React from 'react';
import { Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';

export default function Footer({ onOpenModal }) {
  const { t } = useLanguage();

  return (
    <>
      <footer className="bg-brand-bronze text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={logoImg}
                  alt="Logo Cabinet Dr. Zhor Mengouch"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain shadow-md"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {t.brandName}
                  </h2>
                  <p className="text-sm sm:text-base text-brand-champagne font-medium">
                    {t.brandSubtitle}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-brand-cream/90 leading-relaxed max-w-md">
                {t.footer.tagline}
              </p>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-brand-champagne">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base">
                <li>
                  <a href="#accueil" className="text-white/90 hover:text-brand-champagne">
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#docteur" className="text-white/90 hover:text-brand-champagne">
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-white/90 hover:text-brand-champagne">
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#cabinet" className="text-white/90 hover:text-brand-champagne">
                    {t.nav.cabinet}
                  </a>
                </li>
                <li>
                  <a href="#avis" className="text-white/90 hover:text-brand-champagne">
                    {t.nav.reviews}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-brand-champagne">
                {t.footer.contactHeading}
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-white/95">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-brand-champagne shrink-0 mt-1" />
                  <span>{t.cabinet.addressValue}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-brand-champagne shrink-0" />
                  <a href={CLINIC_INFO.telHref} dir="ltr" className="font-bold hover:underline">
                    {CLINIC_INFO.phoneIntl}
                  </a>
                </li>
              </ul>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-full bg-white/15 hover:bg-brand-gold hover:text-brand-espresso text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={CLINIC_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-full bg-white/15 hover:bg-brand-gold hover:text-brand-espresso text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-cream/80">
            <p>
              © {new Date().getFullYear()} {t.brandName}. {t.footer.rights}
            </p>
            <button
              type="button"
              onClick={() => onOpenModal()}
              className="text-brand-champagne font-bold hover:underline"
            >
              {t.nav.book} →
            </button>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${CLINIC_INFO.whatsappRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer.whatsappFloat}
        className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{t.footer.whatsappFloat}</span>
      </a>
    </>
  );
}
