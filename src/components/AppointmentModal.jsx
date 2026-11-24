import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  Send,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { BUSINESS_INFO } from './translations.js';
import { getCasablancaNow, generateSlotsForDate } from '../utils/clinicStatus.js';

export default function AppointmentModal({ isOpen, onClose, initialServiceId = '' }) {
  const { language, t } = useLanguage();
  const minDate = useMemo(() => getCasablancaNow().isoDate, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState(minDate);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setServiceId(initialServiceId || t.services.items[0]?.id || '');
      setSubmitted(false);
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialServiceId, t.services.items]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const slots = useMemo(() => generateSlotsForDate(date), [date]);

  useEffect(() => {
    const stillValid = slots.some((s) => s.label === selectedSlot && !s.disabled);
    if (!stillValid) {
      setSelectedSlot('');
    }
  }, [slots, selectedSlot]);

  if (!isOpen) return null;

  const isSundaySelected = (() => {
    if (!date) return false;
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d).getDay() === 0;
  })();

  const selectedServiceObj = t.services.items.find((item) => item.id === serviceId);
  const selectedServiceTitle = selectedServiceObj ? selectedServiceObj.title : serviceId;

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = t.modal.errors.name;
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      nextErrors.phone = t.modal.errors.phone;
    }
    if (!serviceId) nextErrors.service = t.modal.errors.service;
    if (!date || date < minDate) nextErrors.date = t.modal.errors.date;
    if (!selectedSlot) nextErrors.slot = t.modal.errors.slot;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanNotes = notes.trim() || (language === 'ar' ? 'لا توجد ملاحظات' : 'Aucune');

    const message =
      language === 'ar'
        ? `مرحباً،\n\nأرغب في حجز موعد.\n\nالاسم : ${name.trim()}\nرقم الهاتف : ${phone.trim()}\nالخدمة المطلوبة : ${selectedServiceTitle}\nالتاريخ : ${date}\nالوقت : ${selectedSlot}\nمدة الموعد : 30 دقيقة\nملاحظات : ${cleanNotes}\n\nشكراً، يرجى تأكيد الموعد.`
        : `Bonjour,\n\nJe souhaite prendre un rendez-vous.\n\nNom : ${name.trim()}\nTéléphone : ${phone.trim()}\nPrestation : ${selectedServiceTitle}\nDate : ${date}\nHeure : ${selectedSlot}\nDurée : 30 minutes\nNotes : ${cleanNotes}\n\nMerci de me confirmer la disponibilité.`;

    const waUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-brand-ink/60 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl border border-brand-plum/15 shadow-2xl">
        {/* Pinned Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 bg-brand-plum text-white shrink-0">
          <div>
            <h2
              id="appointment-modal-title"
              className="font-display text-lg sm:text-xl font-extrabold"
            >
              {t.modal.title}
            </h2>
            <p className="text-xs sm:text-sm text-brand-goldLight mt-0.5">
              {t.modal.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.modal.closeLabel}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
            <span>{t.modal.closeLabel}</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-5">
          {submitted && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-bold">{t.modal.submittedTitle}</p>
                <p className="mt-1 text-emerald-800">{t.modal.submittedText}</p>
              </div>
            </div>
          )}

          <form id="appointment-booking-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold text-brand-ink mb-1.5">
                  <User className="w-4 h-4 text-brand-plum" />
                  <span>{t.modal.nameLabel}</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.modal.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-brand-cream/60 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-plum"
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 font-semibold mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold text-brand-ink mb-1.5">
                  <Phone className="w-4 h-4 text-brand-plum" />
                  <span>{t.modal.phoneLabel}</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.modal.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-brand-cream/60 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-plum"
                />
                {errors.phone && (
                  <p className="text-xs text-rose-600 font-semibold mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Service & Date */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-brand-ink mb-1.5">
                  {t.modal.serviceLabel}
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-brand-cream/60 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-plum"
                >
                  <option value="">{t.modal.servicePlaceholder}</option>
                  {t.services.items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-xs text-rose-600 font-semibold mt-1">
                    {errors.service}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold text-brand-ink mb-1.5">
                  <Calendar className="w-4 h-4 text-brand-plum" />
                  <span>{t.modal.dateLabel}</span>
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-brand-cream/60 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-plum"
                />
                {errors.date && (
                  <p className="text-xs text-rose-600 font-semibold mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            {/* 30-Minute Time Slots Grid */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="flex items-center gap-1.5 text-sm font-bold text-brand-ink">
                  <Clock className="w-4 h-4 text-brand-plum" />
                  <span>{t.modal.slotsLabel}</span>
                </label>
                <span className="text-xs font-semibold text-brand-bronze">
                  {t.modal.durationNotice}
                </span>
              </div>

              {isSundaySelected ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs sm:text-sm text-amber-900">
                  {t.modal.noSlotsClosed}
                </div>
              ) : slots.every((s) => s.disabled) ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs sm:text-sm text-amber-900">
                  {t.modal.noSlotsToday}
                </div>
              ) : (
                <div
                  dir="ltr"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1"
                >
                  {slots.map((slot) => {
                    const isSelected = selectedSlot === slot.label;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={slot.disabled}
                        onClick={() => setSelectedSlot(slot.label)}
                        className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                          slot.disabled
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                            : isSelected
                              ? 'bg-brand-plum text-white border-brand-plum shadow-sm'
                              : 'bg-brand-cream/80 text-brand-ink border-brand-plum/15 hover:border-brand-plum'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {errors.slot && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5">{errors.slot}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-bold text-brand-ink mb-1.5">
                <FileText className="w-4 h-4 text-brand-plum" />
                <span>{t.modal.notesLabel}</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.modal.notesPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-plum/20 bg-brand-cream/60 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-plum"
              />
            </div>

            {/* Pending Confirmation Notice */}
            <div className="rounded-2xl bg-brand-sand/80 border border-brand-plum/15 p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-brand-ink/85">
              <AlertCircle className="w-4 h-4 text-brand-plum mt-0.5 shrink-0" />
              <p>{t.modal.pendingNotice}</p>
            </div>
          </form>
        </div>

        {/* Pinned Footer Actions */}
        <div className="px-5 sm:px-7 py-4 bg-brand-cream/90 border-t border-brand-plum/10 flex flex-wrap items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-brand-plum/25 text-sm font-bold text-brand-ink hover:bg-brand-sand transition-colors"
          >
            {t.modal.cancelLabel}
          </button>

          <button
            type="submit"
            form="appointment-booking-form"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-bold shadow-md hover:bg-emerald-700 transition-colors"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>{t.modal.submitBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
