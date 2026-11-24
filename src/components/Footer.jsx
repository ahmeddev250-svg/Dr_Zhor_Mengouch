import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
} from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { useLanguage } from './LanguageContext.jsx';
import { BUSINESS_INFO } from './translations.js';

export default function Footer() {
  const { language, t } = useLanguage();

  const quickLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#docteur', label: t.nav.about },
    { href: '#soins', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#avis', label: t.nav.testimonials },
    { href: '#contact', label: t.nav.contact },
  ];

  const defaultWhatsAppText =
    language === 'ar'
      ? 'مرحباً دكتورة زهور منكوش، أرغب في الحصول على معلومات حول العلاجات في العيادة.'
      : 'Bonjour Dr. Zhor Mengouch, je souhaite obtenir des informations concernant vos soins au cabinet.';

  const whatsappDirectUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    defaultWhatsAppText
  )}`;

  return (
    <>
      <footer className="bg-brand-plum text-white pt-16 pb-12 mt-12 border-t border-brand-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            {/* Brand Identity Column */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-bronzeDark/80 p-2 ring-2 ring-brand-goldLight/50 flex items-center justify-center shrink-0">
                  <img
                    src={logoImg}
                    alt={t.brand.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {t.brand.name}
                  </h2>
                  <p className="text-sm sm:text-base text-brand-goldLight font-medium mt-0.5">
                    {t.brand.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                {t.footer.description}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-white/12 hover:bg-brand-gold text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full bg-white/12 hover:bg-brand-gold text-white flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-display text-lg sm:text-xl font-bold text-brand-goldLight">
                {t.footer.quickLinksTitle}
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm sm:text-base text-white/85 hover:text-brand-goldLight transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordonnées Column */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-display text-lg sm:text-xl font-bold text-brand-goldLight">
                {t.footer.contactTitle}
              </h3>

              <ul className="space-y-3.5 text-sm sm:text-base text-white/90">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-goldLight mt-1 shrink-0" />
                  <span>
                    {language === 'ar' ? BUSINESS_INFO.addressAr : BUSINESS_INFO.addressFr}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-goldLight shrink-0" />
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    dir="ltr"
                    className="font-bold hover:text-brand-goldLight transition-colors"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-goldLight shrink-0" />
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    dir="ltr"
                    className="hover:text-brand-goldLight transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </li>

                <li className="flex items-start gap-3 pt-1">
                  <Clock className="w-5 h-5 text-brand-goldLight mt-1 shrink-0" />
                  <div>
                    <p>{t.footer.scheduleWeekday}</p>
                    <p>{t.footer.scheduleSaturday}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/75">
            <p>
              © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
            </p>
            <p className="text-brand-goldLight/90 font-medium">
              Agdal • Rabat, Maroc
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Direct Button */}
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer.whatsappFloatLabel}
        className="fixed bottom-5 end-5 z-30 inline-flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-xl hover:bg-emerald-700 hover:scale-105 transition-all"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline">{t.footer.whatsappFloatLabel}</span>
      </a>
    </>
  );
}
