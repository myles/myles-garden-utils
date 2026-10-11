export type PluralizeOptions = {
  plural?: string;
};

/**
 * Choose the singular or plural form of a word for a count.
 */
export const pluralize = (
  count: number,
  singular: string,
  options: PluralizeOptions = {},
): string => {
  if (count === 1) {
    return singular;
  }

  return options.plural ?? `${singular}s`;
};

export default pluralize;
