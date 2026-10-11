import { ISBN_RANGE_RULES } from "./isbnRanges.ts";

const ISBN_10_PATTERN = /^\d{9}[\dX]$/;
const ISBN_13_PATTERN = /^97[89]\d{10}$/;
const SEPARATOR_PATTERN = /[\s-]/g;

// An ISBN-10 is an ISBN-13 in the 978 prefix with the prefix dropped.
const ISBN_10_PREFIX = "978";
const PREFIX_DIGIT_COUNT = 3;

// Range rules are written against the 7 digits that follow a prefix.
const RANGE_DIGIT_COUNT = 7;

/**
 * Hyphenate an ISBN-10 or ISBN-13 per the International ISBN Agency
 * ranges, e.g. "9780306406157" to "978-0-306-40615-7".
 */
export const toDisplayIsbn = (isbn: string): string => {
  const normalizedIsbn = isbn.replace(SEPARATOR_PATTERN, "").toUpperCase();

  if (ISBN_13_PATTERN.test(normalizedIsbn)) {
    return splitIsbn13(normalizedIsbn)?.join("-") ?? normalizedIsbn;
  }

  if (ISBN_10_PATTERN.test(normalizedIsbn)) {
    const parts = splitIsbn13(ISBN_10_PREFIX + normalizedIsbn);
    return parts?.slice(1).join("-") ?? normalizedIsbn;
  }

  throw new RangeError(`Invalid ISBN: "${isbn}"`);
};

/**
 * Split into prefix, group, publisher, title and check digit, or return
 * undefined when the table doesn't cover the ISBN.
 */
const splitIsbn13 = (isbn: string): string[] | undefined => {
  const prefix = isbn.slice(0, PREFIX_DIGIT_COUNT);
  const groupLength = findPartLength(prefix, isbn.slice(PREFIX_DIGIT_COUNT, -1));

  if (groupLength === undefined) {
    return undefined;
  }

  const publisherStart = PREFIX_DIGIT_COUNT + groupLength;
  const group = isbn.slice(PREFIX_DIGIT_COUNT, publisherStart);
  const publisherLength = findPartLength(`${prefix}-${group}`, isbn.slice(publisherStart, -1));

  if (publisherLength === undefined) {
    return undefined;
  }

  const titleStart = publisherStart + publisherLength;

  return [
    prefix,
    group,
    isbn.slice(publisherStart, titleStart),
    isbn.slice(titleStart, -1),
    isbn.slice(-1),
  ];
};

const findPartLength = (rulesKey: string, digits: string): number | undefined => {
  const rules = ISBN_RANGE_RULES[rulesKey];
  if (!rules) return undefined;
  const value = Number(digits.slice(0, RANGE_DIGIT_COUNT).padEnd(RANGE_DIGIT_COUNT, "0"));
  return rules.find(([start, end]) => value >= start && value <= end)?.[2];
};

export default toDisplayIsbn;
