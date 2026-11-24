import React from 'react';
import { GraduationCap, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import treatmentImg from '../assets/images/treatment-injection.webp';
import { useLanguage } from './LanguageContext.jsx';
import { BUSINESS_INFO } from './translations.js';

export default function About() {
  const { t } = useLanguage();
  const pillarIcons = [HeartHandshake, ShieldCheck, Sparkles];

  return (
    <section id="docteur" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Authentic Clinical Procedure Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="glass-card p-3 sm:p-4 shadow-glass-lg">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-brand-sand">
                <img
                  src={treatmentImg}
                  alt={BUSINESS_INFO.doctorNameFr}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Narrative & Academic Diplomas */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-xs sm:text-sm font-bold tracking-wide">
              {t.about.eyebrow}
            </span>

            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-ink leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base sm:text-lg font-medium text-brand-ink/90 leading-relaxed">
              {t.about.lead}
            </p>

            <p className="text-base text-brand-ink/75 leading-relaxed">
              {t.about.description}
            </p>

            {/* Verified Academic Credentials */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-plum text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-ink">
                  {t.about.credentialsTitle}
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                {t.about.credentials.map((cred) => (
                  <div
                    key={cred.degree}
                    className="rounded-2xl bg-brand-cream/90 border border-brand-plum/12 p-4"
                  >
                    <p className="font-display text-sm sm:text-base font-bold text-brand-plum">
                      {cred.degree}
                    </p>
                    <p className="text-xs sm:text-sm text-brand-ink/75 mt-1">
                      {cred.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {t.about.pillars.map((pillar, idx) => {
                const Icon = pillarIcons[idx % pillarIcons.length];
                return (
                  <div key={pillar.title} className="glass-card p-5">
                    <Icon className="w-5 h-5 text-brand-plum mb-2.5" />
                    <h3 className="font-display text-sm sm:text-base font-bold text-brand-ink">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-ink/75 mt-1.5 leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
