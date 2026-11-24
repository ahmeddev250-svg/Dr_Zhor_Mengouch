import React from 'react';
import { Calendar, Check, Clock } from 'lucide-react';
import imgInjections from '../assets/images/result-lips-jawline.jpg';
import imgSkinCare from '../assets/images/treatment-neck-meso-1.webp';
import imgAntiAge from '../assets/images/treatment-neck-meso-2.webp';
import imgConsultation from '../assets/images/dr-zhor-cabinet.webp';
import { useLanguage } from './LanguageContext.jsx';

export default function Services({ onOpenBooking }) {
  const { t } = useLanguage();

  const serviceImages = [imgInjections, imgSkinCare, imgAntiAge, imgConsultation];

  return (
    <section id="soins" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-xs sm:text-sm font-bold">
            {t.services.eyebrow}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-ink">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 gap-7 lg:gap-8">
          {t.services.items.map((service, idx) => {
            const imgSrc = serviceImages[idx % serviceImages.length];
            return (
              <article
                key={service.id}
                className="glass-card overflow-hidden flex flex-col justify-between hover:shadow-glass-lg transition-all duration-300 group"
              >
                <div>
                  {/* Authentic Visual Header */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-brand-sand">
                    <img
                      src={imgSrc}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bronzeDark/70 via-brand-bronzeDark/15 to-transparent" />
                    <span className="absolute top-4 start-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-brand-plum shadow-sm">
                      {service.category}
                    </span>
                    <span className="absolute bottom-3.5 start-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/95">
                      <Clock className="w-3.5 h-3.5 text-brand-goldLight" />
                      <span>{t.services.durationBadge}</span>
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-brand-plum/8 text-brand-plum text-xs font-semibold border border-brand-plum/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 pt-2 border-t border-brand-plum/10">
                      {service.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-brand-ink/85"
                        >
                          <Check className="w-4 h-4 text-brand-plum mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(service.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-plum text-white text-sm sm:text-base font-bold hover:bg-brand-bronzeDark transition-colors shadow-sm"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{t.services.bookServiceBtn}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
