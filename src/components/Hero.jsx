import React, { useEffect, useState } from 'react';
import { Calendar, Phone, Star, DoorOpen, DoorClosed, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import doctorCabinetImg from '../assets/images/doctor-cabinet.webp';
import logoImg from '../assets/images/logo.png';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import { evaluateClinicStatus } from '../utils/clinicStatus';

export default function Hero({ onOpenModal }) {
  const { lang, t } = useLanguage();
  const [status, setStatus] = useState(() => evaluateClinicStatus(lang));

  useEffect(() => {
    setStatus(evaluateClinicStatus(lang));
    const timer = setInterval(() => setStatus(evaluateClinicStatus(lang)), 60000);
    return () => clearInterval(timer);
  }, [lang]);

  const cardIcons = [Sparkles, ShieldCheck, MapPin];

  return (
    <section
      id="accueil"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-brand-sand/70 via-brand-ivory to-brand-ivory"
    >
      <div className="pointer-events-none absolute -top-24 -end-24 w-96 h-96 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -start-24 w-80 h-80 rounded-full bg-brand-bronze/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${
                  status.isOpen
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}
              >
                {status.isOpen ? (
                  <DoorOpen className="w-4 h-4 text-emerald-600" />
                ) : (
                  <DoorClosed className="w-4 h-4 text-amber-700" />
                )}
                <span>{status.label}</span>
                {status.sublabel && (
                  <span className="font-normal opacity-80">• {status.sublabel}</span>
                )}
              </span>

              <a
                href="#avis"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-brand-gold/40 text-brand-espresso text-xs sm:text-sm font-bold shadow-sm hover:border-brand-bronze transition-colors"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{t.hero.googleBadge}</span>
              </a>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-espresso tracking-tight leading-[1.18] whitespace-pre-line">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenModal()}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-brand-bronze hover:bg-brand-espresso text-white font-bold text-base shadow-lg shadow-brand-bronze/20 transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.hero.primaryCta}</span>
              </button>

              <a
                href={CLINIC_INFO.telHref}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full glass-card hover:bg-white text-brand-espresso font-bold text-base transition-all"
              >
                <Phone className="w-5 h-5 text-brand-bronze" />
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-[28px] overflow-hidden shadow-glass-lg border-4 border-white bg-brand-sand">
                <img
                  src={doctorCabinetImg}
                  alt="Dr. Zhor Mengouch — Cabinet de Médecine Esthétique à Rabat Agdal"
                  className="w-full h-[460px] sm:h-[510px] object-cover object-top"
                />
              </div>

              <div className="absolute -bottom-5 start-5 glass-card px-4 py-3 flex items-center gap-3.5 shadow-lg">
                <img
                  src={logoImg}
                  alt="Logo Dr Z"
                  className="w-14 h-14 rounded-full object-contain shrink-0"
                />
                <div>
                  <p className="font-extrabold text-brand-espresso text-sm sm:text-base">
                    Dr. Zhor Mengouch
                  </p>
                  <p className="text-xs sm:text-sm text-brand-bronze font-medium">
                    {t.hero.badge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-16 lg:mt-20">
          {t.hero.cards.map((card, idx) => {
            const Icon = cardIcons[idx] || Sparkles;
            return (
              <div key={card.title} className="glass-card p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-bronze/10 text-brand-bronze flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-brand-espresso text-base sm:text-lg mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed">{card.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
