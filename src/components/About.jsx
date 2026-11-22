import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import doctorConsultImg from '../assets/images/doctor-consultation.webp';
import { useLanguage } from './LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="docteur" className="py-16 lg:py-24 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-[26px] overflow-hidden shadow-glass-lg border-4 border-brand-cream max-w-md mx-auto">
              <img
                src={doctorConsultImg}
                alt="Dr. Zhor Mengouch en consultation"
                loading="lazy"
                className="w-full h-[440px] object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-bronze/10 text-brand-bronze text-xs sm:text-sm font-bold">
              {t.about.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-espresso leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base text-stone-700 leading-relaxed">{t.about.p1}</p>
            <p className="text-base text-stone-700 leading-relaxed">{t.about.p2}</p>

            <div className="glass-card p-6 space-y-3 border border-brand-gold/30">
              <div className="flex items-center gap-2.5 text-brand-espresso font-bold text-base sm:text-lg">
                <GraduationCap className="w-6 h-6 text-brand-bronze shrink-0" />
                <h3>{t.about.credentialsTitle}</h3>
              </div>
              <ul className="space-y-2.5">
                {t.about.credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {t.about.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-4 rounded-2xl bg-brand-ivory border border-brand-bronze/10"
                >
                  <p className="font-bold text-brand-espresso text-sm sm:text-base mb-1">
                    {pillar.title}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
