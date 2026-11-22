// Horaires officiels : Lun–Ven 09:00–18:00 (continu), Sam 09:00–13:00, Dim Fermé
export const SCHEDULE_HOURS = {
  0: null, // Dimanche
  1: { open: 9 * 60, close: 18 * 60 },
  2: { open: 9 * 60, close: 18 * 60 },
  3: { open: 9 * 60, close: 18 * 60 },
  4: { open: 9 * 60, close: 18 * 60 },
  5: { open: 9 * 60, close: 18 * 60 },
  6: { open: 9 * 60, close: 13 * 60 },
};

export function getCasablancaNow() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Casablanca',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = dayMap[map.weekday] ?? now.getDay();
  const hour = parseInt(map.hour, 10) % 24;
  const minute = parseInt(map.minute, 10);
  const dateStr = `${map.year}-${map.month}-${map.day}`;

  return {
    dayOfWeek,
    minutes: hour * 60 + minute,
    dateStr,
  };
}

export function evaluateClinicStatus(lang = 'fr') {
  const { dayOfWeek, minutes } = getCasablancaNow();
  const today = SCHEDULE_HOURS[dayOfWeek];

  if (today && minutes >= today.open && minutes < today.close) {
    const closeH = String(Math.floor(today.close / 60)).padStart(2, '0');
    const closeM = String(today.close % 60).padStart(2, '0');
    return {
      isOpen: true,
      label: lang === 'ar' ? 'مفتوح الآن' : 'Ouvert maintenant',
      sublabel:
        lang === 'ar'
          ? `يغلق اليوم على الساعة ${closeH}:${closeM}`
          : `Ferme à ${closeH}:${closeM}`,
    };
  }

  if (today && minutes < today.open) {
    return {
      isOpen: false,
      label: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
      sublabel: lang === 'ar' ? 'يفتح اليوم على 09:00' : 'Ouvre aujourd’hui à 09:00',
    };
  }

  const dayNamesFr = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const dayNamesAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (dayOfWeek + offset) % 7;
    if (SCHEDULE_HOURS[nextDay]) {
      const nextLabel =
        offset === 1
          ? lang === 'ar'
            ? 'يفتح غداً على 09:00'
            : 'Ouvre demain à 09:00'
          : lang === 'ar'
          ? `يفتح ${dayNamesAr[nextDay]} على 09:00`
          : `Ouvre ${dayNamesFr[nextDay]} à 09:00`;
      return {
        isOpen: false,
        label: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
        sublabel: nextLabel,
      };
    }
  }

  return {
    isOpen: false,
    label: lang === 'ar' ? 'مغلق' : 'Fermé',
    sublabel: '',
  };
}

export function generateSlotsForDate(dateString) {
  if (!dateString) return [];
  const [y, m, d] = dateString.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dayOfWeek = dateObj.getUTCDay();
  const schedule = SCHEDULE_HOURS[dayOfWeek];
  if (!schedule) return [];

  const { dateStr: todayStr, minutes: nowMinutes } = getCasablancaNow();
  if (dateString < todayStr) return [];

  const slots = [];
  for (let start = schedule.open; start + 30 <= schedule.close; start += 30) {
    const end = start + 30;
    const fmt = (mins) =>
      `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
    const label = `${fmt(start)} – ${fmt(end)}`;
    const disabled = dateString === todayStr && start <= nowMinutes + 15;
    slots.push({ value: label, disabled });
  }
  return slots;
}
