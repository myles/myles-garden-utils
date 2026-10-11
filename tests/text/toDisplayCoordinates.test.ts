import { expect, describe, it } from "vite-plus/test";

import { toDisplayCoordinates } from "../../src/text/toDisplayCoordinates.ts";

describe("toDisplayCoordinates", () => {
  it("formats each hemisphere", () => {
    expect(toDisplayCoordinates(43.6532, -79.3832)).toBe("43.65° N, 79.38° W");
    expect(toDisplayCoordinates(-33.8688, 151.2093)).toBe("33.87° S, 151.21° E");
  });

  it("treats zero as north and east", () => {
    expect(toDisplayCoordinates(0, 0)).toBe("0.00° N, 0.00° E");
  });

  it("treats values that round to zero as north and east", () => {
    expect(toDisplayCoordinates(-0.001, -0.004)).toBe("0.00° N, 0.00° E");
  });
});
