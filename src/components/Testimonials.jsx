import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { BUSINESS_INFO } from './translations.js';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="avis" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Verified Google Rating */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-xs sm:text-sm font-bold">
            {t.testimonials.eyebrow}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-ink">
            {t.testimonials.title}
          </h2>

          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full glass-card">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm sm:text-base font-bold text-brand-ink">
              {t.testimonials.ratingBadge}
            </span>
          </div>

          {/* Recurring Patient Keyword Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs sm:text-sm font-semibold text-brand-ink/70">
              {t.testimonials.keywordsLabel}
            </span>
            {t.testimonials.keywords.map((kw) => (
              <span
                key={kw.word}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-plum/10 text-brand-plum text-xs sm:text-sm font-bold border border-brand-plum/15"
              >
                <span>{kw.word}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/80 text-xs">
                  {kw.count}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Authentic Google Maps Review Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {t.testimonials.reviews.map((review) => (
            <article
              key={review.author}
              className="glass-card p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-gold/60" />
                </div>

                <p
                  dir={review.lang === 'ar' ? 'rtl' : 'ltr'}
                  className="text-sm sm:text-base text-brand-ink/85 leading-relaxed"
                >
                  “{review.text}”
                </p>
              </div>

              <div className="pt-4 border-t border-brand-plum/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-plum text-white font-display font-bold flex items-center justify-center shrink-0">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base font-bold text-brand-ink">
                    {review.author}
                  </p>
                  <p className="text-xs text-brand-ink/65">{review.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Link to Official Google Maps Listing */}
        <div className="text-center">
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-pill text-sm sm:text-base font-bold text-brand-plum hover:bg-brand-plum hover:text-white transition-all"
          >
            <span>{t.testimonials.viewAllGoogle}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
