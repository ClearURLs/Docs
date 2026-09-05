/* Sanity check of every exported page via Puppeteer: extracts title, sidebar
 * version selector, visible errors, and scans console for React key warnings.
 * Run: node scripts/verify-pages.mjs
 */
import puppeteer from 'puppeteer-core';

const BASE = process.env.BASE ?? 'http://localhost:8123';
const pages = [
  ['/', '/index.html'],
  ['/faq', '/faq.html'],
  ['/troubleshooting', '/troubleshooting.html'],
  ['/reporting', '/reporting.html'],
  ['/permissions', '/permissions.html'],
  ['/specs/rules', '/specs/rules.html'],
  ['/specs/new-rules', '/specs/new-rules.html'],
  ['/specs/compiled-lists', '/specs/compiled-lists.html'],
  ['/further_readings/similar_addons', '/further_readings/similar_addons.html'],
  ['/further_readings/excluded_fields', '/further_readings/excluded_fields.html'],
  ['/latest/', '/latest/index.html'],
  ['/latest/troubleshooting', '/latest/troubleshooting.html'],
  ['/1.27.3/', '/1.27.3/index.html'],
  ['/1.27.3/faq', '/1.27.3/faq.html'],
];

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'shell',
  args: [
    '--no-sandbox', '--disable-crash-reporter', '--disable-breakpad',
    '--crash-dumps-dir=/tmp', '--user-data-dir=/tmp/cu-pptr-verify',
  ],
});

let failures = 0;
for (const [publicPath, staticPath] of pages) {
  const page = await browser.newPage();
  const keyWarnings = [];
  page.on('console', (m) => {
    const t = m.text();
    if (/key.*prop|Each child/i.test(t)) keyWarnings.push(t.slice(0, 120));
  });
  try {
    const res = await page.goto(BASE + staticPath, { waitUntil: 'networkidle0', timeout: 30000 });
    const status = res.status();
    const info = await page.evaluate(() => {
      const title = document.querySelector('h1')?.textContent?.trim() ?? document.title;
      const version = document.querySelector('#fd-version-select')?.value ?? '(none)';
      const edit = document.querySelector('a[href*="/-/edit/"]')?.href ?? '(none)';
      const errors = [...document.querySelectorAll('body *')].filter((el) =>
        /Internal Server Error|Application error|missing required error/i.test(el.textContent ?? ''),
      ).length;
      return { title, version, edit, errors };
    });
    const note = keyWarnings.length ? ` ⚠ ${keyWarnings.length} key warning(s)` : '';
    const ok = status === 200 && info.errors === 0 && keyWarnings.length === 0;
    if (!ok) failures++;
    console.log(`${ok ? '✓' : '✗'} ${publicPath.padEnd(38)} ${info.title.slice(0, 34).padEnd(34)} v=${info.version}${note}`);
    if (keyWarnings.length) console.log('   →', keyWarnings[0]);
  } catch (e) {
    failures++;
    console.log(`✗ ${publicPath}  ${e.message.slice(0, 100)}`);
  }
  await page.close();
}

await browser.close();
if (failures) {
  console.error(`\n${failures} page(s) failed`);
  process.exit(1);
}
console.log(`\nAll ${pages.length} pages verified.`);
