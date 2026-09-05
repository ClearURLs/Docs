/**
 * Post-processes the Next.js static export (`out/`) to keep the public URL
 * space of the old mike-based site working:
 *
 * - /latest/**           → static copy of the unversioned (latest) docs so
 *                          existing https://docs.clearurls.xyz/latest/... links
 *                          keep resolving on any static host
 * - /versions.json       → mike-compatible version manifest
 * - /CNAME, /.nojekyll   → GitHub Pages / GitLab Pages compatibility
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const out = join(root, 'out');

const versions = JSON.parse(readFileSync(join(root, 'versions.json'), 'utf8'));
const others = versions.filter((v) => v.id !== 'latest');

if (!existsSync(out)) {
  console.error('out/ does not exist — run `next build` first.');
  process.exit(1);
}



// Only the docs tree itself is aliased into /latest/ (mirrors mike).
const ALLOWED_ROOT_DIRS = new Set(['specs', 'further_readings']);
const ALLOWED_ROOT_FILES = new Set([
  'index.html',
  'faq.html',
  'troubleshooting.html',
  'reporting.html',
  'permissions.html',
]);

/** Copy released pages into /latest/ (mirrors the old mike alias). */
function copyIntoLatest(srcDir, destDir, isRoot = false) {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir)) {
    if (isRoot && !ALLOWED_ROOT_DIRS.has(entry) && !ALLOWED_ROOT_FILES.has(entry)) continue;
    const src = join(srcDir, entry);
    const dest = join(destDir, entry);
    const st = statSync(src);
    if (st.isDirectory()) {
      copyIntoLatest(src, dest);
    } else if (entry.endsWith('.html')) {
      cpSync(src, dest);
    }
  }
}

const latestDir = join(out, 'latest');
rmSync(latestDir, { recursive: true, force: true });
copyIntoLatest(out, latestDir, true);

// Version landing pages (`out/1.27.3.html`) get an index.html alias inside
// their directory so directory-index hosts serve /1.27.3/ directly.
for (const v of others) {
  const page = join(out, `${v.id}.html`);
  if (existsSync(page)) {
    mkdirSync(join(out, v.id), { recursive: true });
    cpSync(page, join(out, v.id, 'index.html'), { force: true });
  }
}

// ---- versions.json (mike-compatible manifest) --------------------------------
writeFileSync(
  join(out, 'versions.json'),
  JSON.stringify(
    [
      { version: 'latest', title: 'latest', aliases: ['latest'] },
      ...others.map((v) => ({ version: v.id, title: v.id, aliases: [] })),
    ],
    null,
    2,
  ) + '\n',
);

// ---- Pages hosting compatibility ---------------------------------------------
writeFileSync(join(out, '.nojekyll'), '');
if (existsSync(join(root, 'public', 'CNAME'))) {
  cpSync(join(root, 'public', 'CNAME'), join(out, 'CNAME'));
}

console.log('post-export: materialized /latest/ alias and versions.json');
