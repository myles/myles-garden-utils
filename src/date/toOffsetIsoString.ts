import { formatISO } from "date-fns";

import { localizeDate, type TimeZoneOptions } from "./localizeDate.ts";

/**
 * Format a date as ISO 8601 with the time zone's offset, so a reader can
 * tell "midnight in Toronto" apart from "midnight UTC", e.g.
 * "2023-10-05T10:30:00-04:00".
 */
export const toOffsetIsoString = (date: Date, options: TimeZoneOptions = {}): string =>
  formatISO(localizeDate(date, options));

export default toOffsetIsoString;
