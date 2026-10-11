export enum ListStyle {
  And = "and",
  Or = "or",
  None = "",
}

export type ToDisplayListOptions = {
  locale?: string;
};

// Fixed rather than the runtime default, so server and browser render the
// same text.
const DEFAULT_LOCALE = "en";

const LIST_FORMAT_TYPES: Record<ListStyle, Intl.ListFormatType> = {
  [ListStyle.And]: "conjunction",
  [ListStyle.Or]: "disjunction",
  [ListStyle.None]: "unit",
};

/**
 * Join items into a readable list, e.g. ["tea", "coffee", "juice"] to
 * "tea, coffee, and juice". The serial comma follows the locale.
 */
export const toDisplayList = (
  items: readonly string[],
  style: ListStyle,
  options: ToDisplayListOptions = {},
): string => {
  const listFormat = new Intl.ListFormat(options.locale ?? DEFAULT_LOCALE, {
    type: LIST_FORMAT_TYPES[style],
  });
  return listFormat.format(items);
};

export const toDisplayAndList = (
  items: readonly string[],
  options: ToDisplayListOptions = {},
): string => toDisplayList(items, ListStyle.And, options);

export const toDisplayOrList = (
  items: readonly string[],
  options: ToDisplayListOptions = {},
): string => toDisplayList(items, ListStyle.Or, options);

export default toDisplayList;
