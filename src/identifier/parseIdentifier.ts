import { IDENTIFIER_REGEX } from "../regex/identifier.ts";

export type IdentifierParts = {
  series: string;
  item: number;
  part?: number;
};

/**
 * Split a registry ID into its parts, e.g. "MB-100-1" to
 * { series: "MB", item: 100, part: 1 }, or return undefined when
 * the value isn't an identifier.
 */
export const parseIdentifier = (value: string): IdentifierParts | undefined => {
  const groups = IDENTIFIER_REGEX.exec(value)?.groups;
  if (!groups) {
    return undefined;
  }

  const { series, item, part } = groups;

  return {
    series,
    item: Number(item),
    // Omitted rather than undefined, so "MB-100" has no part key.
    ...(part !== undefined && { part: Number(part) }),
  };
};
