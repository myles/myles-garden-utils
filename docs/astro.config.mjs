// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";

// https://astro.build/config
export default defineConfig({
  site: "https://utils.myles.garden",
  integrations: [
    starlight({
      title: "@myles-garden/utils",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/myles/myles-garden-utils" },
      ],
      plugins: [
        starlightTypeDoc({
          // One module page per published subpath. The root entry only
          // re-exports these, so documenting it would duplicate every page.
          entryPoints: [
            "../src/array/index.ts",
            "../src/date/index.ts",
            "../src/identifier/index.ts",
            "../src/regex/index.ts",
            "../src/text/index.ts",
            "../src/zod/index.ts",
          ],
          tsconfig: "./tsconfig.typedoc.json",
          sidebar: { label: "API" },
          // Without a readme, the plugin drops each module's index page but
          // the root index still links to them.
          // Source links point at main, so they don't change on every build.
          typeDoc: { readme: "./api-overview.md", gitRevision: "main" },
        }),
      ],
      sidebar: [typeDocSidebarGroup],
    }),
  ],
});
