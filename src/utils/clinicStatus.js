/**
 * Real-time Open / Closed evaluator for Cabinet Dr. Zhor Mengouch (Africa/Casablanca)
 * Schedule:
 * - Monday (1) to Friday (5): 09:00 – 18:00 (continuous)
 * - Saturday (6): 09:00 – 13:00
 * - Sunday (0): Closed
 */

export const CLINIC_SCHEDULE = {
  0: null, // Sunday closed
  1: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  2: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  3: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  4: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  5: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  6: { open: 9 * 60, close: 13 * 60, openStr: '09:00', closeStr: '13:00' },
};

const DAY_NAMES = {
  fr: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
};

export function getCasablancaNow(referenceDate = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Casablanca',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(referenceDate);
    const map = {};
    for (const part of parts) {
      map[part.type] = part.value;
    }
    const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const dayOfWeek = weekdayMap[map.weekday] ?? referenceDate.getDay();
    const hour = parseInt(map.hour === '24' ? '0' : map.hour, 10);
    const minute = parseInt(map.minute, 10);
    const isoDate = `${map.year}-${map.month}-${map.day}`;

    return {
      dayOfWeek,
      hour,
      minute,
      totalMinutes: hour * 60 + minute,
      isoDate,
    };
  } catch {
    const dayOfWeek = referenceDate.getDay();
    const hour = referenceDate.getHours();
    const minute = referenceDate.getMinutes();
    const y = referenceDate.getFullYear();
    const m = String(referenceDate.getMonth() + 1).padStart(2, '0');
    const d = String(referenceDate.getDate()).padStart(2, '0');
    return {
      dayOfWeek,
      hour,
      minute,
      totalMinutes: hour * 60 + minute,
      isoDate: `${y}-${m}-${d}`,
    };
  }
}

export function getClinicLiveStatus(lang = 'fr', referenceDate = new Date()) {
  const { dayOfWeek, totalMinutes } = getCasablancaNow(referenceDate);
  const todayRule = CLINIC_SCHEDULE[dayOfWeek];

  if (todayRule && totalMinutes >= todayRule.open && totalMinutes < todayRule.close) {
    const minsLeft = todayRule.close - totalMinutes;
    const h = Math.floor(minsLeft / 60);
    const m = minsLeft % 60;
    const durationText =
      lang === 'ar'
        ? h > 0
          ? `${h} س ${m > 0 ? `و ${m} د` : ''}`.trim()
          : `${m} دقيقة`
        : h > 0
          ? `${h}h${m > 0 ? String(m).padStart(2, '0') : ''}`
          : `${m} min`;

    return {
      isOpen: true,
      badgeLabel: lang === 'ar' ? 'مفتوح الآن' : 'Ouvert maintenant',
      detailLabel:
        lang === 'ar'
          ? `يغلق على الساعة ${todayRule.closeStr} (بعد ${durationText})`
          : `Ferme à ${todayRule.closeStr} (dans ${durationText})`,
    };
  }

  // If today opens later
  if (todayRule && totalMinutes < todayRule.open) {
    const minsUntil = todayRule.open - totalMinutes;
    const h = Math.floor(minsUntil / 60);
    const m = minsUntil % 60;
    const durationText =
      lang === 'ar'
        ? h > 0
          ? `${h} س ${m > 0 ? `و ${m} د` : ''}`.trim()
          : `${m} دقيقة`
        : h > 0
          ? `${h}h${m > 0 ? String(m).padStart(2, '0') : ''}`
          : `${m} min`;

    return {
      isOpen: false,
      badgeLabel: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
      detailLabel:
        lang === 'ar'
          ? `يفتح اليوم على الساعة ${todayRule.openStr} (بعد ${durationText})`
          : `Ouvre aujourd'hui à ${todayRule.openStr} (dans ${durationText})`,
    };
  }

  // Otherwise find next open day
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (dayOfWeek + offset) % 7;
    const nextRule = CLINIC_SCHEDULE[nextDay];
    if (nextRule) {
      const dayLabel =
        offset === 1
          ? lang === 'ar'
            ? 'غداً'
            : 'demain'
          : DAY_NAMES[lang === 'ar' ? 'ar' : 'fr'][nextDay];

      return {
        isOpen: false,
        badgeLabel: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
        detailLabel:
          lang === 'ar'
            ? `يفتح ${dayLabel} على الساعة ${nextRule.openStr}`
            : `Ouvre ${dayLabel} à ${nextRule.openStr}`,
      };
    }
  }

  return {
    isOpen: false,
    badgeLabel: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
    detailLabel: lang === 'ar' ? 'يفتح الإثنين 09:00' : 'Ouvre lundi à 09:00',
  };
}

/**
 * Generates 30-minute appointment slots for a given YYYY-MM-DD date string
 * Synchronized strictly with CLINIC_SCHEDULE and disabling past slots on current day.
 */
export function generateSlotsForDate(dateStr, referenceDate = new Date()) {
  if (!dateStr) return [];
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return [];

  const targetDate = new Date(y, m - 1, d);
  const dayOfWeek = targetDate.getDay();
  const rule = CLINIC_SCHEDULE[dayOfWeek];
  if (!rule) return [];

  const nowCasa = getCasablancaNow(referenceDate);
  const isToday = dateStr === nowCasa.isoDate;
  const isPastDay = dateStr < nowCasa.isoDate;

  const slots = [];
  for (let start = rule.open; start + 30 <= rule.close; start += 30) {
    const end = start + 30;
    const startH = String(Math.floor(start / 60)).padStart(2, '0');
    const startM = String(start % 60).padStart(2, '0');
    const endH = String(Math.floor(end / 60)).padStart(2, '0');
    const endM = String(end % 60).padStart(2, '0');
    const label = `${startH}:${startM} – ${endH}:${endM}`;

    // Disable if date is in the past or slot starts within the next 15 minutes today
    const disabled = isPastDay || (isToday && start <= nowCasa.totalMinutes + 15);

    slots.push({
      id: `${startH}:${startM}`,
      startTime: `${startH}:${startM}`,
      endTime: `${endH}:${endM}`,
      label,
      disabled,
    });
  }

  return slots;
}
