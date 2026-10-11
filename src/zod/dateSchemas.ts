import { parse } from "date-fns";
import { z } from "zod";

import { getQuarterRange } from "../date/getQuarterRange.ts";
import { localizeDate } from "../date/localizeDate.ts";

// Each partial date shape and the date-fns pattern that parses it.
const PARTIAL_DATE_FORMATS = [
  { regex: /^\d{4}$/, pattern: "yyyy" },
  { regex: /^\d{4}-\d{2}$/, pattern: "yyyy-MM" },
  { regex: /^\d{4}-\d{2}-\d{2}$/, pattern: "yyyy-MM-dd" },
] as const;
const PARTIAL_DATE_MESSAGE =
  "Must be a valid year (YYYY), year-month (YYYY-MM), or date (YYYY-MM-DD)";

const MONTH_DAY_REGEX = /^\d{2}-\d{2}$/;
const MONTH_DAY_PATTERN = "MM-dd";
const MONTH_DAY_MESSAGE = "Must be a valid month-day (MM-DD)";

const QUARTER_REGEX = /^(?<year>\d{4})-Q(?<quarter>[1-4])$/;
const QUARTER_MESSAGE = "Must be a quarter like 2025-Q1";

export type Quarter = {
  value: string;
  year: number;
  quarter: number;
  startsAt: Date;
  endsAt: Date;
};

// Each schema is typed as `z.ZodType<Output>`, the one schema type zod 3 and
// 4 share, so the published declarations work with either version.

/**
 * Parse "2025", "2025-06", or "2025-06-15" to the start of that period in
 * America/Toronto.
 */
export const PartialDateSchema: z.ZodType<Date> = z.string().transform((value, ctx) => {
  const format = PARTIAL_DATE_FORMATS.find(({ regex }) => regex.test(value));
  // parse returns an Invalid Date for impossible dates like 2025-02-30.
  const date = format && parse(value, format.pattern, localizeDate());
  if (!date || Number.isNaN(date.getTime())) {
    ctx.addIssue({ code: "custom", message: PARTIAL_DATE_MESSAGE });
    return z.NEVER;
  }

  return date;
});

/**
 * Parse "06-15" to that day in the current year in America/Toronto, e.g. for
 * birthdays and anniversaries.
 */
export const MonthDaySchema: z.ZodType<Date> = z
  .string()
  .regex(MONTH_DAY_REGEX, MONTH_DAY_MESSAGE)
  .transform((value, ctx) => {
    const date = parse(value, MONTH_DAY_PATTERN, localizeDate());
    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({ code: "custom", message: MONTH_DAY_MESSAGE });
      return z.NEVER;
    }

    return date;
  });

/**
 * Parse "2025-Q1" to its year, quarter, and first and last instants in
 * America/Toronto.
 */
export const QuarterSchema: z.ZodType<Quarter> = z
  .string()
  .regex(QUARTER_REGEX, QUARTER_MESSAGE)
  .transform((value) => {
    const groups = QUARTER_REGEX.exec(value)?.groups ?? {};
    const year = Number(groups.year);
    const quarter = Number(groups.quarter);
    const [startsAt, endsAt] = getQuarterRange(year, quarter);

    return { value, year, quarter, startsAt, endsAt };
  });
