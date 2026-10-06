const monthYear = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Formats an ISO date as e.g. "Oct 2024". */
export function formatMonthYear(iso: string): string {
  return monthYear.format(new Date(iso));
}

/** Human friendly duration between two dates, e.g. "1 yr 3 mos". */
export function formatDuration(startIso: string, end: Date): string {
  const start = new Date(startIso);
  const totalMonths =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth()) +
    1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [
    years ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '',
    months ? `${months} ${months === 1 ? 'mo' : 'mos'}` : '',
  ].filter(Boolean);
  return parts.join(' ') || '1 mo';
}

/** "Oct 2024 — Present · 1 yr 1 mo" */
export function formatPeriod(startIso: string, endIso: string | null, now: Date): string {
  const end = endIso ? new Date(endIso) : now;
  const endLabel = endIso ? formatMonthYear(endIso) : 'Present';
  return `${formatMonthYear(startIso)} — ${endLabel} · ${formatDuration(startIso, end)}`;
}
