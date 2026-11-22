import React from 'react';
import { Calendar } from 'lucide-react';
import lipsImg from '../assets/images/service-injections-lips.webp';
import profiloplastieImg from '../assets/images/service-profiloplastie.webp';
import skinboosterImg from '../assets/images/service-skinbooster.webp';
import mesotherapieImg from '../assets/images/service-mesotherapie.webp';
import antiageImg from '../assets/images/service-antiage.webp';
import capillaireImg from '../assets/images/service-capillaire.webp';
import { useLanguage } from './LanguageContext';

const SERVICE_IMAGES = {
  injections: lipsImg,
  profiloplastie: profiloplastieImg,
  skinbooster: skinboosterImg,
  mesotherapie: mesotherapieImg,
  antiage: antiageImg,
  capillaire: capillaireImg,
};

export default function Services({ onOpenModal }) {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-16 lg:py-24 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs sm:text-sm font-bold">
            {t.services.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-espresso">
            {t.services.title}
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">{t.services.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {t.services.items.map((item) => (
            <article
              key={item.id}
              className="glass-card overflow-hidden flex flex-col justify-between group hover:shadow-glass-lg transition-all duration-300"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-brand-sand">
                  <img
                    src={SERVICE_IMAGES[item.id]}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 start-3.5 px-3 py-1 rounded-full bg-brand-espresso/85 backdrop-blur-md text-brand-cream text-xs font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-brand-espresso">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-brand-sand text-brand-bronze text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenModal(item.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-bronze/10 hover:bg-brand-bronze text-brand-espresso hover:text-white font-bold text-sm transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.services.bookService}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
