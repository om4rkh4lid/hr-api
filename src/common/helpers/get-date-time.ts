export function getDateTime(date: Date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hr: date.getHours(),
    min: date.getMinutes(),
    timestamp: date.toISOString(),
  };
}
