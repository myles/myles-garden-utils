import { parseIdentifier } from "./parseIdentifier.ts";

/**
 * Whether `child` sits directly beneath `parent`, e.g. "MB-404-14" under
 * "MB-404". Nesting is one level deep and series-local: a part has no
 * children, and "MB-404" never claims "TREX-404-14".
 */
export const isNestedUnder = (child: string, parent: string): boolean => {
  const childParts = parseIdentifier(child);
  const parentParts = parseIdentifier(parent);

  if (!childParts || !parentParts) {
    return false;
  }

  if (parentParts.part !== undefined || childParts.part === undefined) {
    return false;
  }

  return childParts.series === parentParts.series && childParts.item === parentParts.item;
};
