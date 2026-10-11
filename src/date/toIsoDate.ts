import { format } from "date-fns";

import { localizeDate, type TimeZoneOptions } from "./localizeDate.ts";

const ISO_DATE_PATTERN = "yyyy-MM-dd";

/**
 * Format a date as an ISO 8601 calendar date in a time zone, so a late
 * evening in Toronto isn't read as the next day in UTC, e.g. "2023-10-05".
 */
export const toIsoDate = (date: Date, options: TimeZoneOptions = {}): string =>
  format(localizeDate(date, options), ISO_DATE_PATTERN);

export default toIsoDate;
