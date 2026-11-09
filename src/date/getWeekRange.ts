import type { TZDate } from "@date-fns/tz";
import { endOfWeek, startOfWeek, type Day } from "date-fns";

import { localizeDate, type TimeZoneOptions } from "./localizeDate.ts";

const MONDAY: Day = 1;

/**
 * Get the first and last instants of the Monday-start week containing a date,
 * reading the day in a time zone.
 */
export const getWeekRange = (
  date: Date,
  options: TimeZoneOptions = {},
): [startsAt: TZDate, endsAt: TZDate] => {
  const localDate = localizeDate(date, options);
  return [
    startOfWeek(localDate, { weekStartsOn: MONDAY }),
    endOfWeek(localDate, { weekStartsOn: MONDAY }),
  ];
};

export default getWeekRange;
