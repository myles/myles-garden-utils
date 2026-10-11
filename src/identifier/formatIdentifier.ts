import type { IdentifierParts } from "./parseIdentifier.ts";

/**
 * Join identifier parts into a registry ID, e.g. { series: "MB", item: 100,
 * part: 1 } to "MB-100-1". The inverse of `parseIdentifier`.
 */
export const formatIdentifier = ({ series, item, part }: IdentifierParts): string => {
  if (part === undefined) {
    return `${series}-${item}`;
  }

  return `${series}-${item}-${part}`;
};
