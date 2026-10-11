/**
 * Pick a random item from a non-empty array.
 */
export const randomChoice = <T>(choices: readonly T[]): T => {
  if (choices.length === 0) {
    throw new RangeError("randomChoice() requires a non-empty array");
  }

  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};

export default randomChoice;
