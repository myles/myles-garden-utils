import type { TZDate } from "@date-fns/tz";
import { endOfWeek, startOfWeek, type Day } from "date-fns";

import { localizeDate, type TimeZoneOptions } from "./localizeDate.ts";

const MONDAY: Day = 1;
const WEEK_OPTIONS = { weekStartsOn: MONDAY };

/**
 * Get the first and last instants of the Monday-start week containing a date,
 * reading the day in a time zone.
 */
export const getWeekRange = (
  date: Date,
  options: TimeZoneOptions = {},
): [startsAt: TZDate, endsAt: TZDate] => {
  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid date");
  }

  const localDate = localizeDate(date, options);
  return [startOfWeek(localDate, WEEK_OPTIONS), endOfWeek(localDate, WEEK_OPTIONS)];
};

export default getWeekRange;
