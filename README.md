# JuStAI-Web

Website and documentation for [JuStAI5](https://github.com/julianstricker/JuStAI5), built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).
English is the main language, German lives under `/de/`.

* **Landing page:** `src/components/Landing.astro`, texts in `src/i18n/landing.ts` (EN + DE)
* **Mascot:** `src/components/Mascot.astro`
* **Docs:** not stored here. `scripts/sync-docs.mjs` copies `README.md` and `docs/**` from the JuStAI5 repo on every build (English at `/docs/…`, German from `docs/de` at `/de/docs/…`) and rewrites the links. Edit the docs in the JuStAI5 repo.
* **Settings:** `site.config.mjs` (URL, base path, install command). For a custom domain set `base` to `''`.

```bash
npm install
JUSTAI_SRC=../JuStAI5 npm run dev     # use a local checkout of JuStAI5 for the docs
npm run build                         # without JUSTAI_SRC the docs are cloned from GitHub
```

Deployment: GitHub Actions builds and publishes to GitHub Pages on every push and nightly
(Settings → Pages → Source: *GitHub Actions*).

## Single source of truth

Texts **and images** of the documentation live only in the JuStAI5 repo (`README.md`, `docs/**`, `docs/img/**`) and render on GitHub as well as on this site. `npm run sync-docs` copies them here (generated, git-ignored). Diagrams are generated there with `node scripts/make-doc-diagrams.mjs`. Only presentation lives in this repo: navigation (`astro.config.mjs`), the docs home (`src/hub/`) and styling.
