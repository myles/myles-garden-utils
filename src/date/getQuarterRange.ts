import { TZDate } from "@date-fns/tz";
import { endOfQuarter } from "date-fns";

import { localizeDate, type TimeZoneOptions } from "./localizeDate.ts";

const MONTHS_PER_QUARTER = 3;

/**
 * Get the first and last instants of a quarter (1 to 4) in a time zone.
 */
export const getQuarterRange = (
  year: number,
  quarter: number,
  options: TimeZoneOptions = {},
): [startsAt: TZDate, endsAt: TZDate] => {
  if (!Number.isInteger(quarter) || quarter < 1 || quarter > 4) {
    throw new RangeError("Quarter must be an integer from 1 to 4");
  }

  // Borrow localizeDate's resolved zone so the default lives in one place.
  const { timeZone } = localizeDate(new Date(), options);
  const startsAt = new TZDate(year, (quarter - 1) * MONTHS_PER_QUARTER, 1, timeZone);
  return [startsAt, endOfQuarter(startsAt)];
};

export default getQuarterRange;
