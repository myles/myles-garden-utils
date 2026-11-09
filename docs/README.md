# `@myles-garden/utils` docs

The documentation site for [`@myles-garden/utils`](../README.md), built with [Astro Starlight](https://starlight.astro.build). The API reference is generated from the library's TSDoc comments by [starlight-typedoc](https://starlight-typedoc.vercel.app).

## Commands

This folder is an npm workspace. Run these from the repository root:

| Command              | Action                                                   |
| -------------------- | -------------------------------------------------------- |
| `vp install`         | Install dependencies for the library and the docs        |
| `npm run docs:dev`   | Start the dev server at `localhost:4321`                 |
| `npm run docs:build` | Generate the API reference and build the site to `dist/` |

## Structure

```
docs/
├── api-overview.md         # Intro on the API reference's landing page
├── astro.config.mjs        # Starlight, sidebar, and starlight-typedoc config
├── public/                 # Static files served as-is, e.g. the favicon
├── src/
│   └── content/docs/
│       ├── index.mdx       # Home page
│       └── api/            # Generated; gitignored
├── tsconfig.json           # Type checking for the Astro site
└── tsconfig.typedoc.json   # Type checking for TypeDoc, scoped to ../src
```

Each `.md` or `.mdx` file in `src/content/docs/` becomes a page, with its route taken from its path. New pages also need adding to the `sidebar` in `astro.config.mjs`.

## API reference

The pages under `src/content/docs/api/` are regenerated every time the dev server or a build starts, so don't edit them. To change one, edit the TSDoc comment in `../src/`, then restart the dev server.

There's one module per subpath export, e.g. `@myles-garden/utils/date`. When you add a subpath to the library, add its `index.ts` to `entryPoints` in `astro.config.mjs` too.

TypeDoc doesn't support TypeScript 7 yet, so this workspace pins TypeScript 6 for it. The library itself still builds with TypeScript 7.

## Deployment

The site deploys to [utils.myles.garden](https://utils.myles.garden) on Vercel. The build settings are in [`vercel.json`](../vercel.json) at the repository root rather than here, because the build needs the whole repository: TypeDoc reads the library's source from `../src`.
