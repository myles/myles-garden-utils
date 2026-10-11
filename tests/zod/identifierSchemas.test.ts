import { expect, describe, it } from "vite-plus/test";
import { z } from "zod";

import { IdentifierSchema } from "../../src/zod/index.ts";

describe("IdentifierSchema", () => {
  it.each(["MB-100", "MB-100-1", "TREX-1", "TREX-73"])("accepts %s", (value) => {
    expect(IdentifierSchema.parse(value)).toBe(value);
  });

  it.each([
    ["a lowercase prefix", "mb-100"],
    ["a mixed-case prefix", "Mb-100"],
    ["an underscore in the prefix", "M_X-100"],
    ["a digit in the prefix", "M2-100"],
    ["a missing number", "MB-"],
    ["a missing prefix", "-100"],
    ["no separator", "MB100"],
    ["a third number", "MB-1-2-3"],
    ["a trailing separator", "MB-100-"],
    ["letters in the number", "MB-1a"],
    ["surrounding whitespace", " MB-100 "],
  ])("rejects %s", (_, value) => {
    expect(IdentifierSchema.safeParse(value).success).toBe(false);
  });

  it("is built with the consumer's zod", () => {
    // In the zod3 test project `zod` resolves to zod 3, so this checks the
    // schema nests inside whichever version a site has installed.
    expect(IdentifierSchema).toBeInstanceOf(z.ZodType);
  });

  it("explains the format in its description", () => {
    expect(IdentifierSchema.description).toContain("MB-100");
  });
});
