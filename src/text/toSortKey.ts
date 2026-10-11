// Fixed rather than the runtime default: some locales order letters
// differently (Swedish sorts "Ä" after "Z"), and local and hosted machines
// can disagree.
const SORT_LOCALE = "en";

/**
 * Normalise a title for sorting: lowercase, drop one leading article, and
 * collapse punctuation to spaces, e.g. "The Great Gatsby" to "great gatsby".
 */
export const toSortKey = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/^(the|a|an)\s+/, "")
    // Unicode-aware so "Émile" keeps its "É" rather than becoming "mile".
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

/**
 * Compare two titles by their sort keys, for use with `Array#sort`.
 */
export const compareBySortKey = (a: string, b: string): number =>
  toSortKey(a).localeCompare(toSortKey(b), SORT_LOCALE);

export default toSortKey;
