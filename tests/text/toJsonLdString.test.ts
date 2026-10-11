import { expect, describe, it } from "vite-plus/test";

import { toJsonLdString } from "../../src/text/toJsonLdString.ts";

describe("toJsonLdString", () => {
  it("escapes a closing script tag", () => {
    const output = toJsonLdString({ name: "</script><script>alert(1)" });

    expect(output).not.toContain("<");
    expect(output).toBe('{"name":"\\u003c/script>\\u003cscript>alert(1)"}');
  });

  it("parses back to the same value", () => {
    const value = { "@type": "Thing", name: "a < b" };

    expect(JSON.parse(toJsonLdString(value))).toEqual(value);
  });
});
