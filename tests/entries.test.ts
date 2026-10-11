import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { expect, describe, it } from "vite-plus/test";

const SRC_DIR = resolve(import.meta.dirname, "../src");
const IMPORT_PATTERN = /from\s+"([^"]+)"/g;
const OPTIONAL_PEERS = ["date-fns", "@date-fns/tz", "zod"];

// Walk relative imports from an entry and collect every package it pulls in.
const collectPackages = (entryPath: string): Set<string> => {
  const packages = new Set<string>();
  const visited = new Set<string>();
  const pending = [entryPath];

  while (pending.length > 0) {
    const filePath = pending.pop()!;
    if (visited.has(filePath)) {
      continue;
    }
    visited.add(filePath);

    const source = readFileSync(filePath, "utf8");
    for (const [, specifier] of source.matchAll(IMPORT_PATTERN)) {
      if (specifier.startsWith(".")) {
        pending.push(resolve(dirname(filePath), specifier));
        continue;
      }
      packages.add(specifier);
    }
  }

  return packages;
};

describe("entry points", () => {
  it.each(["index.ts", "array/index.ts", "identifier/index.ts", "regex/index.ts", "text/index.ts"])(
    "%s imports no optional peers",
    (entry) => {
      const packages = collectPackages(resolve(SRC_DIR, entry));

      for (const peer of OPTIONAL_PEERS) {
        expect(packages).not.toContain(peer);
      }
    },
  );

  it("can see the date entry's peers", () => {
    // Guards the walker itself: if it found nothing here, the test above
    // would pass vacuously.
    const packages = collectPackages(resolve(SRC_DIR, "date/index.ts"));

    expect(packages).toContain("date-fns");
    expect(packages).toContain("@date-fns/tz");
  });
});
