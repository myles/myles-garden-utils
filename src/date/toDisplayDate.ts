import { format } from "date-fns";

import { localizeDate, type TimeZoneOptions } from "./localizeDate.ts";

export enum DateStyle {
  Short = "short",
  Long = "long",
}

export type ToDisplayDateOptions = TimeZoneOptions & {
  style?: DateStyle;
};

// date-fns format patterns, e.g. "5 Oct, 2023" and "Thursday 5th October,
// 2023".
const DATE_PATTERNS: Record<DateStyle, string> = {
  [DateStyle.Short]: "d MMM, yyyy",
  [DateStyle.Long]: "cccc do MMMM, yyyy",
};
const TIME_PATTERN = "h:mm a";

/**
 * Format a date in a time zone, e.g. "5 Oct, 2023".
 */
export const toDisplayDate = (date: Date, options: ToDisplayDateOptions = {}): string => {
  const pattern = DATE_PATTERNS[options.style ?? DateStyle.Short];
  return format(localizeDate(date, options), pattern);
};

/**
 * Format a time in a time zone, e.g. "10:30 AM".
 */
export const toDisplayTime = (date: Date, options: TimeZoneOptions = {}): string =>
  format(localizeDate(date, options), TIME_PATTERN);

/**
 * Format a date and time in a time zone, e.g. "5 Oct, 2023 at 10:30 AM".
 */
export const toDisplayDateTime = (date: Date, options: ToDisplayDateOptions = {}): string => {
  const pattern = DATE_PATTERNS[options.style ?? DateStyle.Short];
  return format(localizeDate(date, options), `${pattern} 'at' ${TIME_PATTERN}`);
};

export default toDisplayDate;
