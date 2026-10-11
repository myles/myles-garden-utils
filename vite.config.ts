import mylesOxlintConfig from "@mylesb/oxlint-config";
import mylesOxfmtConfig from "@mylesb/oxfmt-config";
import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  pack: {
    // date-fns and zod are optional peers, so the modules that import them
    // live behind their own subpaths and stay out of the root entry.
    entry: {
      index: "src/index.ts",
      array: "src/array/index.ts",
      date: "src/date/index.ts",
      identifier: "src/identifier/index.ts",
      regex: "src/regex/index.ts",
      text: "src/text/index.ts",
      zod: "src/zod/index.ts",
    },
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    dts: {
      generator: "tsgo",
    },
    exports: true,
  },
  test: {
    projects: [
      {
        test: { name: "default" },
      },
      {
        // The zod schemas run again against zod 3, which the peer range
        // also allows; `zod3` is an npm alias for it.
        resolve: {
          alias: [{ find: /^zod$/, replacement: "zod3" }],
        },
        test: {
          name: "zod3",
          include: ["tests/zod/**/*.test.ts"],
        },
      },
    ],
  },
  lint: {
    extends: [mylesOxlintConfig],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    extends: [mylesOxfmtConfig],
  },
});
