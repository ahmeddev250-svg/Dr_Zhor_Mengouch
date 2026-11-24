import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  DoorOpen,
  DoorClosed,
  Instagram,
  Facebook,
} from 'lucide-react';
import imgRoom from '../assets/images/dr-zhor-cabinet.webp';
import imgProc from '../assets/images/treatment-injection.webp';
import imgResult1 from '../assets/images/result-lips-jawline.jpg';
import imgResult2 from '../assets/images/result-lips.webp';
import imgNeck from '../assets/images/treatment-neck-meso-3.webp';
import imgScalp from '../assets/images/treatment-scalp-meso.webp';
import { useLanguage } from './LanguageContext.jsx';
import { BUSINESS_INFO } from './translations.js';
import { getClinicLiveStatus } from '../utils/clinicStatus.js';

export default function Cabinet({ onOpenBooking }) {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [status, setStatus] = useState(() => getClinicLiveStatus(language));

  useEffect(() => {
    setStatus(getClinicLiveStatus(language));
    const timer = setInterval(() => {
      setStatus(getClinicLiveStatus(language));
    }, 60000);
    return () => clearInterval(timer);
  }, [language]);

  const photos = [imgRoom, imgProc, imgResult1, imgResult2, imgNeck, imgScalp];

  const galleryItems = t.cabinet.galleryCaptions.map((caption, index) => ({
    ...caption,
    src: photos[index % photos.length],
  }));

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const filterKeys = [
    { key: 'all', label: t.cabinet.filters.all },
    { key: 'cabinet', label: t.cabinet.filters.cabinet },
    { key: 'results', label: t.cabinet.filters.results },
  ];

  return (
    <section id="cabinet" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-xs sm:text-sm font-bold">
              {t.cabinet.eyebrow}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-ink">
              {t.cabinet.title}
            </h2>
            <p className="text-base text-brand-ink/75 leading-relaxed">
              {t.cabinet.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterKeys.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeFilter === tab.key
                    ? 'bg-brand-plum text-white shadow-sm'
                    : 'glass-pill text-brand-ink/80 hover:text-brand-plum'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Authentic Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="glass-card p-3 group overflow-hidden"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-sand">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bronzeDark/75 via-transparent to-transparent" />
                <span className="absolute top-3 start-3 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-plum">
                  {item.tag}
                </span>
                <p className="absolute bottom-3 inset-x-3.5 text-sm font-bold text-white leading-snug">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact, Hours & Interactive Google Map */}
        <div id="contact" className="grid lg:grid-cols-12 gap-8 items-stretch pt-4">
          {/* Operating Hours Card */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-brand-plum text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-ink">
                    {t.cabinet.hoursTitle}
                  </h3>
                </div>

                {/* Live DoorOpen / DoorClosed Status Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                    status.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  {status.isOpen ? (
                    <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <DoorClosed className="w-4 h-4 text-amber-700 shrink-0" />
                  )}
                  <span>{status.badgeLabel}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-brand-bronze">
                {status.detailLabel}
              </p>

              {/* Active Open Days Schedule */}
              <div className="divide-y divide-brand-plum/10 border-y border-brand-plum/10">
                {t.cabinet.hoursList.map((row) => (
                  <div
                    key={row.days}
                    className="py-3.5 flex items-center justify-between gap-4 text-sm sm:text-base"
                  >
                    <span className="font-bold text-brand-ink">{row.days}</span>
                    <span className="font-semibold text-brand-plum">{row.time}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-brand-ink/75">{t.cabinet.hoursNote}</p>
            </div>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-plum text-white text-sm sm:text-base font-bold hover:bg-brand-bronzeDark transition-colors shadow-md"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{t.cabinet.bookCardBtn}</span>
            </button>
          </div>

          {/* Coordonnées & Embedded Map Card */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-brand-ink">
                {t.cabinet.contactTitle}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Street Address + Landmark */}
                <div className="rounded-2xl bg-brand-cream/90 border border-brand-plum/12 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-brand-plum font-bold text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{t.cabinet.addressLabel}</span>
                  </div>
                  <p className="text-sm font-semibold text-brand-ink">
                    {language === 'ar' ? BUSINESS_INFO.addressAr : BUSINESS_INFO.addressFr}
                  </p>
                  <p className="text-xs text-brand-ink/70">
                    {language === 'ar' ? BUSINESS_INFO.landmarkAr : BUSINESS_INFO.landmarkFr}
                  </p>
                </div>

                {/* Unified Phone & WhatsApp + Email + Social Icons */}
                <div className="rounded-2xl bg-brand-cream/90 border border-brand-plum/12 p-4 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-brand-plum font-bold text-sm">
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>{t.cabinet.phoneLabel}</span>
                    </div>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneTel}`}
                      dir="ltr"
                      className="inline-block mt-1 text-base font-extrabold text-brand-ink hover:text-brand-plum"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-brand-plum font-bold text-xs">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.cabinet.emailLabel}</span>
                    </div>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      dir="ltr"
                      className="inline-block mt-0.5 text-sm font-medium text-brand-ink/85 hover:text-brand-plum"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>

                  {/* Instagram & Facebook Links inside Coordonnées */}
                  <div className="pt-1 flex items-center gap-2.5">
                    <a
                      href={BUSINESS_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Dr. Zhor Mengouch"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-xs font-bold hover:bg-brand-plum hover:text-white transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={BUSINESS_INFO.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Dr. Zhor Mengouch"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-xs font-bold hover:bg-brand-plum hover:text-white transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border border-brand-plum/15 h-56 sm:h-64 bg-brand-sand">
                <iframe
                  title="Localisation Cabinet Dr. Zhor Mengouch Rabat Agdal"
                  src={BUSINESS_INFO.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex justify-end">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-plum hover:text-brand-bronzeDark"
                >
                  <span>{t.cabinet.directionsBtn}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
