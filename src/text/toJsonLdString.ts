/**
 * Serialise a value for an inline `<script type="application/ld+json">`.
 * Escaping `<` stops a string such as "</script>" from closing the tag
 * early; JSON parsers read `<` back as `<`.
 */
export const toJsonLdString = (value: unknown): string =>
  JSON.stringify(value).replaceAll("<", "\\u003c");

export default toJsonLdString;
