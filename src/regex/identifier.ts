// A registry ID, e.g. "MB-100", "MB-100-1" or "TREX-1".
export const IDENTIFIER_REGEX = /^(?<series>[A-Z]+)-(?<item>\d+)(?:-(?<part>\d+))?$/;

export const isIdentifier = (value: string): boolean => IDENTIFIER_REGEX.test(value);
