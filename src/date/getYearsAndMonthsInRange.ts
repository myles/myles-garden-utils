import {
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfYear,
  getYear,
  isAfter,
  isBefore,
} from "date-fns";

export type YearAndMonths = {
  year: number;
  months: Date[];
};

/**
 * Group the start of every month between two dates by year, clamped to the
 * range, e.g. for a calendar archive's navigation.
 */
export const getYearsAndMonthsInRange = (start: Date, end: Date): YearAndMonths[] =>
  eachYearOfInterval({ start, end }).map((yearStart) => {
    const yearEnd = endOfYear(yearStart);
    const months = eachMonthOfInterval({
      start: isBefore(yearStart, start) ? start : yearStart,
      end: isAfter(yearEnd, end) ? end : yearEnd,
    });
    return { year: getYear(yearStart), months };
  });

export default getYearsAndMonthsInRange;
