import { type IdentifierParts, parseIdentifier } from "./parseIdentifier.ts";

/**
 * Compare two catalogue IDs for `Array#sort`, by series, then item, then
 * part, e.g. "MB-2" before "MB-10", and "MB-100" before "MB-100-1".
 * Invalid IDs sort last.
 */
export const compareIdentifiers = (a: string, b: string): number => {
  const aParts = parseIdentifier(a);
  const bParts = parseIdentifier(b);

  if (aParts && bParts) {
    return compareParts(aParts, bParts);
  }

  if (aParts) {
    return -1;
  }

  if (bParts) {
    return 1;
  }

  return a < b ? -1 : a > b ? 1 : 0;
};

const compareParts = (a: IdentifierParts, b: IdentifierParts): number => {
  if (a.series !== b.series) {
    return a.series < b.series ? -1 : 1;
  }

  if (a.item !== b.item) {
    return a.item - b.item;
  }

  // A missing part sorts first, so "MB-100" comes before "MB-100-0".
  return (a.part ?? -1) - (b.part ?? -1);
};
