export type ToApaStyleTitleCaseOptions = {
  minorWords?: Set<string>;
};

export const APA_MINOR_WORDS = new Set([
  // Articles
  "a",
  "an",
  "the",
  // Coordinating conjunctions
  "and",
  "but",
  "for",
  "or",
  "nor",
  // Short prepositions
  "as",
  "at",
  "by",
  "in",
  "of",
  "on",
  "to",
  "up",
]);

/**
 * APA Style Title Case
 *
 * @param value The string to title case
 */
export const toApaStyleTitleCase = (
  value: string,
  options: ToApaStyleTitleCaseOptions = {},
): string => {
  const minorWords = options.minorWords ?? APA_MINOR_WORDS;
  const words = value.split(" ");
  const lastWordIndex = words.length - 1;

  return words
    .map((word, wordIndex) => {
      const isStartWord = wordIndex === 0 || words[wordIndex - 1].endsWith(":");
      const isLastWord = wordIndex === lastWordIndex;

      // An unhyphenated word is a single part. Minor parts stay lowercase
      // unless they open or close the title (e.g. "The-End", "Follow-Up").
      const parts = word.split("-");
      const lastPartIndex = parts.length - 1;

      return parts
        .map((part, partIndex) => {
          const isTitleEdge =
            (isStartWord && partIndex === 0) || (isLastWord && partIndex === lastPartIndex);

          if (minorWords.has(part) && !isTitleEdge) {
            return part;
          }

          return capitalize(part);
        })
        .join("-");
    })
    .join(" ");
};

const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export default toApaStyleTitleCase;
