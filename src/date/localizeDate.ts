import { TZDate } from "@date-fns/tz";

export type TimeZoneOptions = {
  timeZone?: string;
};

const DEFAULT_TIME_ZONE = "America/Toronto";

/**
 * Convert a date to one that reads and does date-fns maths in a time zone,
 * defaulting to now in America/Toronto.
 */
export const localizeDate = (date: Date = new Date(), options: TimeZoneOptions = {}): TZDate =>
  new TZDate(date, options.timeZone ?? DEFAULT_TIME_ZONE);

export default localizeDate;
