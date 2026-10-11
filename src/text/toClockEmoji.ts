// Indexed by hour on a twelve-hour face, so 0 (midnight or noon) is 🕛.
const CLOCK_EMOJIS = [
  "🕛",
  "🕐",
  "🕑",
  "🕒",
  "🕓",
  "🕔",
  "🕕",
  "🕖",
  "🕗",
  "🕘",
  "🕙",
  "🕚",
] as const;

/**
 * Get the clock face emoji for a date's hour in local time, e.g. 13:45
 * to "🕐". Minutes are ignored.
 */
export const toClockEmoji = (date: Date): string => {
  const hours = date.getHours();
  if (Number.isNaN(hours)) {
    throw new RangeError("Invalid date");
  }
  return CLOCK_EMOJIS[hours % CLOCK_EMOJIS.length];
};

export default toClockEmoji;
