# ClearURLs Documentation

Source of the official ClearURLs documentation, published at
<https://docs.clearurls.xyz/>.

Built with [Fumadocs](https://fumadocs.dev) on Next.js, exported as a fully
static site (no server-side runtime, no external search service).

## Develop

Requires Node.js ≥ 20.

```bash
npm install
npm run dev        # http://localhost:3000
```

or with Docker:

```bash
make docs-serve    # http://localhost:8000
```

## Build

```bash
npm run build      # full static export into ./out
```

The build also materializes the legacy `mike` URL layout (`/latest/**`,
`/<version>/**`, `versions.json`, `CNAME`, `.nojekyll`) so existing deep
links keep working.

## Release / deploy

Publishing a version means building the docs for both `latest` (the default
branch content) and for released tags, then pushing `out/` to the `gh-pages`
branch.

```bash
npm run build
# deploy ./out to the gh-pages branch
```

Documentation versions are declared in [`versions.json`](./versions.json).
