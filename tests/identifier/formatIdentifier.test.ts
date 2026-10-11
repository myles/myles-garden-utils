import { expect, describe, it } from "vite-plus/test";

import { formatIdentifier } from "../../src/identifier/formatIdentifier.ts";
import { parseIdentifier } from "../../src/identifier/parseIdentifier.ts";

describe("formatIdentifier", () => {
  it("formats an item", () => {
    expect(formatIdentifier({ series: "ARC", item: 5 })).toBe("ARC-5");
  });

  it("formats a part", () => {
    expect(formatIdentifier({ series: "MB", item: 100, part: 1 })).toBe("MB-100-1");
  });

  it("formats part zero", () => {
    expect(formatIdentifier({ series: "MB", item: 100, part: 0 })).toBe("MB-100-0");
  });

  it("round-trips with parseIdentifier", () => {
    for (const id of ["MB-100", "MB-100-1", "TREX-0"]) {
      const parts = parseIdentifier(id);

      expect(parts && formatIdentifier(parts)).toBe(id);
    }
  });
});
