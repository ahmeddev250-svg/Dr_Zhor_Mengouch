import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  DoorOpen,
  DoorClosed,
  ExternalLink,
  Instagram,
  Facebook,
} from 'lucide-react';
import cabinetRoomImg from '../assets/images/doctor-cabinet.webp';
import consultDeskImg from '../assets/images/doctor-consultation.webp';
import hiemtImg from '../assets/images/equip-hiemt.webp';
import skinboosterImg from '../assets/images/service-skinbooster.webp';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import { evaluateClinicStatus } from '../utils/clinicStatus';

export default function Cabinet() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState(() => evaluateClinicStatus(lang));

  useEffect(() => {
    setStatus(evaluateClinicStatus(lang));
    const timer = setInterval(() => setStatus(evaluateClinicStatus(lang)), 60000);
    return () => clearInterval(timer);
  }, [lang]);

  const gallery = [
    {
      src: cabinetRoomImg,
      category: 'cabinet',
      caption: lang === 'ar' ? 'قاعة العلاجات التجميلية' : 'Salle de soins esthétiques',
    },
    {
      src: consultDeskImg,
      category: 'cabinet',
      caption: lang === 'ar' ? 'مكتب الاستشارة الطبية' : 'Espace de consultation médicale',
    },
    {
      src: hiemtImg,
      category: 'soins',
      caption: lang === 'ar' ? 'تجهيزات تكنولوجية HIEMT' : 'Technologie médicale HIEMT',
    },
    {
      src: skinboosterImg,
      category: 'soins',
      caption: lang === 'ar' ? 'بروتوكول Skinbooster' : 'Protocole Skinbooster & Mésothérapie',
    },
  ];

  const visiblePhotos =
    filter === 'all' ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <section id="cabinet" className="py-16 lg:py-24 bg-brand-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs sm:text-sm font-bold">
              {t.cabinet.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-espresso">
              {t.cabinet.title}
            </h2>
            <p className="text-base text-stone-600">{t.cabinet.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(t.cabinet.filters).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  filter === key
                    ? 'bg-brand-bronze text-white shadow'
                    : 'bg-white/80 text-stone-700 hover:bg-white border border-brand-bronze/15'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visiblePhotos.map((photo) => (
            <div
              key={photo.caption}
              className="group relative rounded-2xl overflow-hidden shadow-glass border-2 border-white bg-white h-72"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-espresso/90 via-brand-espresso/50 to-transparent p-4">
                <p className="text-white text-sm font-bold">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-brand-bronze font-bold">
                <MapPin className="w-5 h-5" />
                <h3>{t.cabinet.addressTitle}</h3>
              </div>
              <p className="text-base font-semibold text-brand-espresso">
                {t.cabinet.addressValue}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-brand-bronze/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-brand-bronze font-bold">
                  <Clock className="w-5 h-5" />
                  <h3>{t.cabinet.hoursTitle}</h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    status.isOpen
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {status.isOpen ? (
                    <DoorOpen className="w-3.5 h-3.5" />
                  ) : (
                    <DoorClosed className="w-3.5 h-3.5" />
                  )}
                  <span>{status.label}</span>
                </span>
              </div>

              <ul className="space-y-2">
                {t.cabinet.hoursList.map((row) => (
                  <li
                    key={row.days}
                    className="flex items-center justify-between text-sm sm:text-base text-stone-700"
                  >
                    <span className="font-semibold">{row.days}</span>
                    <span dir="ltr" className="font-bold text-brand-espresso">
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-brand-bronze/10">
              <h3 className="text-brand-bronze font-bold">{t.cabinet.contactTitle}</h3>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={CLINIC_INFO.telHref}
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-base font-extrabold text-brand-espresso hover:text-brand-bronze"
                >
                  <Phone className="w-4 h-4 text-brand-bronze" />
                  <span>{CLINIC_INFO.phoneIntl}</span>
                </a>

                <div className="flex items-center gap-2.5">
                  <a
                    href={CLINIC_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Dr. Zhor Mengouch"
                    className="p-2.5 rounded-full bg-brand-bronze/10 hover:bg-brand-bronze text-brand-bronze hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={CLINIC_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Dr. Zhor Mengouch"
                    className="p-2.5 rounded-full bg-brand-bronze/10 hover:bg-brand-bronze text-brand-bronze hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <a
                href={CLINIC_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-bronze hover:bg-brand-espresso text-white font-bold text-sm transition-colors"
              >
                <span>{t.cabinet.directionsBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-[20px] overflow-hidden shadow-glass border-2 border-white min-h-[360px]">
            <iframe
              title="Localisation Cabinet Dr. Zhor Mengouch Rabat Agdal"
              src={CLINIC_INFO.mapsEmbedUrl}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
