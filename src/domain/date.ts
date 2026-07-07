/** Local-time YYYY-MM-DD for a date (defaults to now). Avoids UTC-shift bugs from toISOString. */
export function todayISO(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
