import { access, readFile } from 'node:fs/promises';

const BASE_URL = (process.env.BASE_URL || 'https://motivational-quote.org').replace(/\/$/, '');
const ADS_LINE = 'google.com, pub-6175161566333696, DIRECT, f08c47fec0942fa0';

const requiredFiles = [
  'ads.txt',
  'sitemap.xml',
  'index.html',
  'about.html',
  'contact.html',
  'privacy.html',
  'editorial-standards.html',
  'quote-sources.html',
];

const requiredRoutes = [
  '/',
  '/ads.txt',
  '/sitemap.xml',
  '/about.html',
  '/contact.html',
  '/privacy.html',
  '/editorial-standards.html',
  '/quote-sources.html',
];

async function assertFile(path) {
  await access(path);
  console.log(`ok file ${path}`);
}

async function fetchText(path) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  const text = await response.text();
  console.log(`ok url ${url}`);
  return text;
}

async function main() {
  for (const path of requiredFiles) {
    await assertFile(path);
  }

  const adsTxt = await readFile('ads.txt', 'utf8');
  if (!adsTxt.includes(ADS_LINE)) {
    throw new Error('ads.txt does not contain the expected AdSense publisher line');
  }
  console.log('ok local ads.txt publisher line');

  for (const route of requiredRoutes) {
    await fetchText(route);
  }

  const [home, sitemap, liveAdsTxt] = await Promise.all([
    fetchText('/'),
    fetchText('/sitemap.xml'),
    fetchText('/ads.txt'),
  ]);

  if (!home.includes('quote-sources.html')) {
    throw new Error('Homepage does not link to quote-sources.html');
  }
  if (!sitemap.includes('/quote-sources.html')) {
    throw new Error('Sitemap does not include /quote-sources.html');
  }
  if (!liveAdsTxt.includes(ADS_LINE)) {
    throw new Error('Live ads.txt does not contain the expected AdSense publisher line');
  }

  console.log(`AdSense readiness smoke check passed for ${BASE_URL}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
