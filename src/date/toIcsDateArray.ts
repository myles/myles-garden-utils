export type IcsDateArray = [
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
];

/**
 * Convert a date to the UTC [year, month, day, hours, minutes] array the
 * `ics` package expects. Months are 1-based, unlike `Date`.
 */
export const toIcsDateArray = (date: Date): IcsDateArray => [
  date.getUTCFullYear(),
  date.getUTCMonth() + 1,
  date.getUTCDate(),
  date.getUTCHours(),
  date.getUTCMinutes(),
];

export default toIcsDateArray;
