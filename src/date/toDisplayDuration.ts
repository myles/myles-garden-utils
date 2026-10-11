import { formatDuration, intervalToDuration } from "date-fns";

const UNDER_A_MONTH_TEXT = "Less than a month";

/**
 * Describe the time between two dates in years and months, e.g. for a
 * resume: "2 years 3 months". The end defaults to now.
 */
export const toDisplayDuration = (startDate: Date, endDate: Date = new Date()): string => {
  // intervalToDuration leaves out zero units, so both are missing when the
  // interval is under a month.
  const duration = intervalToDuration({ start: startDate, end: endDate });
  if (duration.years === undefined && duration.months === undefined) {
    return UNDER_A_MONTH_TEXT;
  }

  return formatDuration(duration, { format: ["years", "months"] });
};

export default toDisplayDuration;
