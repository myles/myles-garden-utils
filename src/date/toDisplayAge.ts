import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  differenceInYears,
  isAfter,
  sub,
} from "date-fns";

import { pluralize } from "../text/pluralize.ts";
import { toDisplayAndList } from "../text/toDisplayList.ts";
import { localizeDate, type TimeZoneOptions } from "./localizeDate.ts";

export type ToDisplayAgeOptions = TimeZoneOptions & {
  now?: Date;
};

/**
 * Describe how long someone has been alive, Pushing Daisies style, e.g.
 * "36 years, 21 weeks, 3 days, 6 hours, and 34 minutes". Zero units are
 * left out.
 */
export const toDisplayAge = (birthDate: Date, options: ToDisplayAgeOptions = {}): string => {
  let remainder = localizeDate(options.now, options);
  if (isAfter(birthDate, remainder)) {
    throw new RangeError("Birth date cannot be in the future");
  }

  // Peel off each unit largest first, so the next only counts what is left.
  const years = differenceInYears(remainder, birthDate);
  remainder = sub(remainder, { years });

  const weeks = differenceInWeeks(remainder, birthDate, {
    roundingMethod: "floor",
  });
  remainder = sub(remainder, { weeks });

  const days = differenceInDays(remainder, birthDate);
  remainder = sub(remainder, { days });

  const hours = differenceInHours(remainder, birthDate, {
    roundingMethod: "floor",
  });
  remainder = sub(remainder, { hours });

  const minutes = differenceInMinutes(remainder, birthDate);

  const units: [count: number, unit: string][] = [
    [years, "year"],
    [weeks, "week"],
    [days, "day"],
    [hours, "hour"],
    [minutes, "minute"],
  ];
  const parts = units
    .filter(([count]) => count > 0)
    .map(([count, unit]) => `${count} ${pluralize(count, unit)}`);

  return toDisplayAndList(parts);
};

export default toDisplayAge;
