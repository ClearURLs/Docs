/**
 * Post-build smoke check. Verifies the static export preserved the public URL
 * space of the old mike-based site. Exits non-zero on failure.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'out');

const pages = [
  '',
  'faq',
  'troubleshooting',
  'reporting',
  'permissions',
  'specs/rules',
  'specs/new-rules',
  'specs/compiled-lists',
  'further_readings/similar_addons',
  'further_readings/excluded_fields',
];

let failures = 0;
const check = (ok, msg) => {
  console.log(`${ok ? '  ✓' : '  ✗'} ${msg}`);
  if (!ok) failures++;
};

console.log('Smoke check: out/ mike-compatible URL layout');

// Core pages in all three URL spaces
for (const base of ['', 'latest/', '1.27.3/']) {
  for (const p of pages) {
    const html = join(out, base, p === '' ? 'index.html' : `${p}.html`);
    const dirIndex = join(out, base, p, 'index.html');
    check(existsSync(html) || existsSync(dirIndex), `${base || '/'}${p || '(index)'}`);
  }
}

// Hosting + versioning metadata
for (const f of ['versions.json', 'CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml', 'api/search']) {
  check(existsSync(join(out, f)), f);
}

// The old version alias map keeps working
const versions = JSON.parse(readFileSync(join(out, 'versions.json'), 'utf8'));
check(versions.some((v) => v.version === 'latest'), 'versions.json contains "latest"');
check(versions.some((v) => v.version === '1.27.3'), 'versions.json contains "1.27.3"');

// Anchors that external code/docs link to
const troubleshooting = readFileSync(join(out, 'troubleshooting.html'), 'utf8');
for (const anchor of ['id="first-check"', 'id="known-problems"', 'id="mv2"', 'id="whitelist"']) {
  check(troubleshooting.includes(anchor), `troubleshooting ${anchor}`);
}

// Versioned pages must not be indexed
check(
  readFileSync(join(out, '1.27.3.html'), 'utf8').includes('noindex'),
  '1.27.3 is marked noindex',
);
check(!readFileSync(join(out, 'index.html'), 'utf8').includes('noindex'), 'latest is indexable');

if (failures) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll checks passed.');
