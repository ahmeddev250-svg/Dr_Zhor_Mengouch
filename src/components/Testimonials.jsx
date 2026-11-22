import React from 'react';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="avis" className="py-16 lg:py-24 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs sm:text-sm font-bold">
              {t.testimonials.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-espresso">
              {t.testimonials.title}
            </h2>
            <div className="flex items-center gap-2 text-brand-espresso font-bold">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>{t.testimonials.ratingSummary}</span>
            </div>
          </div>

          <a
            href={CLINIC_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-card hover:bg-white text-brand-espresso font-bold text-sm self-start lg:self-auto"
          >
            <span>{t.testimonials.googleBtn}</span>
            <ExternalLink className="w-4 h-4 text-brand-bronze" />
          </a>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {t.testimonials.keywords.map((kw) => (
            <span
              key={kw}
              className="px-4 py-1.5 rounded-full bg-brand-cream border border-brand-gold/40 text-brand-espresso text-xs sm:text-sm font-bold"
            >
              ✓ {kw}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((review) => (
            <article
              key={review.author}
              className="glass-card p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-gold/60" />
                </div>

                <p dir="ltr" className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  « {review.text} »
                </p>
              </div>

              <div className="pt-4 border-t border-brand-bronze/10">
                <p className="font-extrabold text-brand-espresso text-base">{review.author}</p>
                <p className="text-xs text-stone-500">{review.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
