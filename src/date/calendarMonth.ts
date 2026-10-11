import { isMonday, isSunday, nextSunday, previousMonday } from "date-fns";

/**
 * Get the Monday on or before a date, keeping its time. Pass the first of a
 * month to get the first cell of a Monday-start month grid.
 */
export const startOfCalendarMonth = (date: Date): Date =>
  isMonday(date) ? date : previousMonday(date);

/**
 * Get the Sunday on or after a date, keeping its time. Pass the last of a
 * month to get the last cell of a Monday-start month grid.
 */
export const endOfCalendarMonth = (date: Date): Date => (isSunday(date) ? date : nextSunday(date));
