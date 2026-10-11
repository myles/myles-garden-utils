/**
 * Split items into columns of roughly equal total weight, e.g. masonry
 * widgets of different heights. Each item goes to the lightest column so
 * far, with ties going to the leftmost, so input order runs top to bottom.
 */
export const balanceColumns = <T>(
  items: readonly T[],
  columnCount: number,
  getWeight: (item: T) => number,
): T[][] => {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  const weights: number[] = Array(columnCount).fill(0);

  for (const item of items) {
    const lightestIndex = weights.indexOf(Math.min(...weights));
    columns[lightestIndex].push(item);
    weights[lightestIndex] += getWeight(item);
  }

  return columns;
};

export default balanceColumns;
