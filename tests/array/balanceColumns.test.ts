import { expect, describe, it } from "vite-plus/test";

import { balanceColumns } from "../../src/array/balanceColumns.ts";

type Item = { name: string; weight: number };

const getWeight = ({ weight }: Item) => weight;
const getNames = (columns: Item[][]) => columns.map((column) => column.map(({ name }) => name));

describe("balanceColumns", () => {
  it("returns empty columns for no items", () => {
    expect(balanceColumns([], 2, getWeight)).toEqual([[], []]);
  });

  it("sends ties to the leftmost column", () => {
    const items = [{ name: "a", weight: 1 }];

    expect(getNames(balanceColumns(items, 2, getWeight))).toEqual([["a"], []]);
  });

  it("gives the first items the top of each column", () => {
    const items = [
      { name: "a", weight: 1 },
      { name: "b", weight: 1 },
      { name: "c", weight: 1 },
    ];

    expect(getNames(balanceColumns(items, 3, getWeight))).toEqual([["a"], ["b"], ["c"]]);
  });

  it("places each item in the lightest column", () => {
    // a=3 fills the left, so b and c both land on the right until it
    // outweighs the left.
    const items = [
      { name: "a", weight: 3 },
      { name: "b", weight: 1 },
      { name: "c", weight: 1 },
      { name: "d", weight: 2 },
    ];

    expect(getNames(balanceColumns(items, 2, getWeight))).toEqual([["a"], ["b", "c", "d"]]);
  });

  it("keeps input order within each column", () => {
    const items = [
      { name: "a", weight: 1 },
      { name: "b", weight: 1 },
      { name: "c", weight: 1 },
      { name: "d", weight: 1 },
    ];

    expect(getNames(balanceColumns(items, 2, getWeight))).toEqual([
      ["a", "c"],
      ["b", "d"],
    ]);
  });
});
