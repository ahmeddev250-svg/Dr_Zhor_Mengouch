import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Clock, Send, Info } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import { getCasablancaNow, generateSlotsForDate } from '../utils/clinicStatus';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const { lang, t } = useLanguage();
  const todayStr = useMemo(() => getCasablancaNow().dateStr, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState(todayStr);
  const [slot, setSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    } else if (t.services.items.length > 0 && !service) {
      setService(t.services.items[0].title);
    }
  }, [initialService, lang]);

  const slots = useMemo(() => generateSlotsForDate(date), [date]);

  useEffect(() => {
    setSlot('');
  }, [date]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = t.modal.errors.name;
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8)
      nextErrors.phone = t.modal.errors.phone;
    if (!date || date < todayStr) nextErrors.date = t.modal.errors.date;
    if (!slot) nextErrors.slot = t.modal.errors.slot;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const noteText = notes.trim() || (lang === 'ar' ? 'لا توجد ملاحظات' : 'Aucune');
    const message =
      lang === 'ar'
        ? `مرحباً،\n\nأرغب في حجز موعد.\n\nالاسم : ${name.trim()}\nرقم الهاتف : ${phone.trim()}\nالخدمة المطلوبة : ${service}\nالتاريخ : ${date}\nالوقت : ${slot}\nمدة الموعد : 30 دقيقة\nملاحظات : ${noteText}\n\nشكراً، يرجى تأكيد الموعد.`
        : `Bonjour,\n\nJe souhaite prendre un rendez-vous.\n\nNom : ${name.trim()}\nTéléphone : ${phone.trim()}\nPrestation : ${service}\nDate : ${date}\nHeure : ${slot}\nDurée : 30 minutes\nNotes : ${noteText}\n\nMerci de me confirmer la disponibilité.`;

    const waUrl = `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-espresso/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-brand-ivory rounded-[24px] shadow-2xl border border-white p-6 sm:p-8 my-8">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-brand-bronze/15">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-espresso">
              {t.modal.title}
            </h2>
            <p className="text-xs sm:text-sm text-brand-bronze font-semibold mt-1">
              {t.modal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full bg-brand-sand hover:bg-brand-bronze hover:text-white text-brand-espresso transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                {t.modal.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.modal.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-bronze/20 focus:border-brand-bronze focus:outline-none text-sm"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                {t.modal.phoneLabel}
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.modal.phonePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-bronze/20 focus:border-brand-bronze focus:outline-none text-sm"
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                {t.modal.serviceLabel}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-bronze/20 focus:border-brand-bronze focus:outline-none text-sm"
              >
                {t.services.items.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-bronze" />
                  {t.modal.dateLabel}
                </span>
              </label>
              <input
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-bronze/20 focus:border-brand-bronze focus:outline-none text-sm"
              />
              {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-espresso mb-2">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-bronze" />
                {t.modal.slotLabel}
              </span>
            </label>

            {slots.length === 0 ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
                {t.modal.noSlots}
              </div>
            ) : (
              <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                {slots.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    disabled={s.disabled}
                    onClick={() => setSlot(s.value)}
                    className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      s.disabled
                        ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed line-through'
                        : slot === s.value
                        ? 'bg-brand-bronze text-white border-brand-bronze shadow'
                        : 'bg-white text-brand-espresso border-brand-bronze/20 hover:border-brand-bronze'
                    }`}
                  >
                    {s.value}
                  </button>
                ))}
              </div>
            )}
            {errors.slot && <p className="text-xs text-red-600 mt-1">{errors.slot}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-espresso mb-1.5">
              {t.modal.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.modal.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-bronze/20 focus:border-brand-bronze focus:outline-none text-sm"
            />
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-brand-sand/80 text-stone-700 text-xs leading-relaxed">
            <Info className="w-4 h-4 text-brand-bronze shrink-0 mt-0.5" />
            <p>{t.modal.pendingNotice}</p>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg transition-colors"
          >
            <Send className="w-5 h-5" />
            <span>{t.modal.submitBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
