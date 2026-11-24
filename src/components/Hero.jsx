import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  Star,
  MapPin,
  DoorOpen,
  DoorClosed,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import heroDoctorImg from '../assets/images/dr-zhor-cabinet.webp';
import { useLanguage } from './LanguageContext.jsx';
import { BUSINESS_INFO } from './translations.js';
import { getClinicLiveStatus } from '../utils/clinicStatus.js';

export default function Hero({ onOpenBooking }) {
  const { language, t } = useLanguage();
  const [status, setStatus] = useState(() => getClinicLiveStatus(language));

  useEffect(() => {
    setStatus(getClinicLiveStatus(language));
    const timer = setInterval(() => {
      setStatus(getClinicLiveStatus(language));
    }, 60000);
    return () => clearInterval(timer);
  }, [language]);

  const quickIcons = [Sparkles, ShieldCheck, Clock];

  return (
    <section
      id="accueil"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Decorative soft ambient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 start-1/4 w-96 h-96 rounded-full bg-brand-gold/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 end-0 w-80 h-80 rounded-full bg-brand-plum/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left / Main Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Status & Location Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-bold text-brand-plum">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{t.hero.badge}</span>
              </span>

              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${
                  status.isOpen
                    ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50/90 text-amber-900 border-amber-200'
                }`}
              >
                {status.isOpen ? (
                  <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <DoorClosed className="w-4 h-4 text-amber-700 shrink-0" />
                )}
                <span>{status.badgeLabel}</span>
                <span className="hidden sm:inline font-medium opacity-80">
                  • {status.detailLabel}
                </span>
              </div>
            </div>

            {/* Mandatory Bienvenue / مرحباً بكم Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-brand-ink tracking-tight leading-[1.16] whitespace-pre-line">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Google Maps Verified Rating Pill */}
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card hover:shadow-glass-lg transition-all"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-brand-ink">
                {t.hero.googleRatingText}
              </span>
            </a>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brand-plum text-white text-base font-bold shadow-lg hover:bg-brand-bronzeDark hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-5 h-5 shrink-0" />
                <span>{t.hero.primaryCta}</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                dir="ltr"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full glass-pill text-base font-bold text-brand-ink hover:border-brand-plum hover:text-brand-plum transition-all"
              >
                <Phone className="w-5 h-5 text-brand-plum shrink-0" />
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          {/* Right / Authentic Doctor & Clinic Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="glass-card p-3 sm:p-4 shadow-glass-lg">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-sand">
                  <img
                    src={heroDoctorImg}
                    alt={`${BUSINESS_INFO.doctorNameFr} – ${BUSINESS_INFO.specialtyFr}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bronzeDark/65 via-transparent to-transparent" />

                  {/* Floating Official Logo Badge */}
                  <div className="absolute top-4 end-4 w-14 h-14 rounded-full bg-brand-plum p-2 shadow-lg ring-2 ring-brand-goldLight/60 flex items-center justify-center">
                    <img
                      src={logoImg}
                      alt={t.brand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Bottom Glass Overlay Card */}
                  <div className="absolute bottom-4 inset-x-4 rounded-2xl bg-white/88 backdrop-blur-md p-4 border border-white/80 shadow-md">
                    <p className="font-display text-sm sm:text-base font-bold text-brand-ink">
                      {t.hero.floatingCardTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-brand-ink/75 mt-0.5">
                      {t.hero.floatingCardText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3 Glass Quick Info Cards */}
        <div className="grid sm:grid-cols-3 gap-5 mt-12 sm:mt-16">
          {t.hero.quickCards.map((card, index) => {
            const IconComponent = quickIcons[index % quickIcons.length];
            return (
              <div key={card.title} className="glass-card p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-plum/10 text-brand-plum flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-base font-bold text-brand-ink">
                    {card.title}
                  </h2>
                  <p className="text-sm text-brand-ink/75 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
