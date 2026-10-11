import type { Duration } from "date-fns";

/**
 * Convert a duration to an ISO 8601 duration string, e.g. { hours: 1,
 * minutes: 30 } to "PT1H30M". Zero and missing fields are left out.
 */
export const toIsoDuration = (duration: Duration): string => {
  const { years, months, weeks, days, hours, minutes, seconds } = duration;
  const date = [
    years && `${years}Y`,
    months && `${months}M`,
    weeks && `${weeks}W`,
    days && `${days}D`,
  ];
  const time = [hours && `${hours}H`, minutes && `${minutes}M`, seconds && `${seconds}S`];

  const datePart = date.filter(Boolean).join("");
  const timePart = time.filter(Boolean).join("");
  if (!datePart && !timePart) {
    return "PT0S";
  }

  return `P${datePart}${timePart ? `T${timePart}` : ""}`;
};

export default toIsoDuration;
