export type ToDisplayPercentageOptions = {
  locale?: string;
  maxFractionDigits?: number;
};

// Fixed rather than the runtime default, so server and browser render the
// same text.
const DEFAULT_LOCALE = "en";

/**
 * Format a ratio as a percentage, e.g. 0.75 to "75%". Rounds to whole
 * numbers unless maxFractionDigits allows more.
 */
export const toDisplayPercentage = (
  value: number,
  options: ToDisplayPercentageOptions = {},
): string => {
  const numberFormat = new Intl.NumberFormat(options.locale ?? DEFAULT_LOCALE, {
    style: "percent",
    maximumFractionDigits: options.maxFractionDigits ?? 0,
  });
  return numberFormat.format(value);
};

export default toDisplayPercentage;
