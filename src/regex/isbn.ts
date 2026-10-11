// Both match a normalized ISBN: no hyphens or spaces, and an uppercase X
// check digit, e.g. "030640615X" or "9780306406157".
export const ISBN_10_REGEX = /^\d{9}[\dX]$/;
export const ISBN_13_REGEX = /^97[89]\d{10}$/;

export const isIsbn10 = (value: string): boolean => ISBN_10_REGEX.test(value);

export const isIsbn13 = (value: string): boolean => ISBN_13_REGEX.test(value);
