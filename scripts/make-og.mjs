// Renders the link-preview images (1200x630) public/og/og.<lang>.png from the mascot and the landing page headline.
// Run after changing the headline: node scripts/make-og.mjs  (needs a built dist/ for the mascot SVG)
import { readFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';
import { copy } from '../src/i18n/landing.ts';

const html = readFileSync('dist/index.html', 'utf8');
const from = html.indexOf('<svg', html.indexOf('class="hero-art"'));
const mascot = html.slice(from, html.indexOf('</svg>', from) + 6)
  .replace(/ class="[^"]*"/g, '').replace(/width="300" height="300"/, 'x="700" y="120" width="420" height="420"');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
mkdirSync('public/og', { recursive: true });
for (const lang of ['en', 'de']) {
  const h = copy[lang].hero;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e0d24"/><stop offset="1" stop-color="#1c1a44"/></linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.45" r="0.5"><stop offset="0" stop-color="#7c5cff" stop-opacity="0.55"/><stop offset="1" stop-color="#7c5cff" stop-opacity="0"/></radialGradient>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9b82ff"/><stop offset="1" stop-color="#3ee8b5"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="Noto Sans, DejaVu Sans, sans-serif" font-weight="700">
    <text x="80" y="110" font-size="34" fill="#f4f1ff">JuStAI</text>
    <text x="80" y="285" font-size="78" fill="#f4f1ff">${esc(h.h1a)}</text>
    <text x="80" y="378" font-size="78" fill="url(#grad)">${esc(h.h1b)}</text>
    <text x="80" y="470" font-size="30" font-weight="400" fill="#b4b0d6">${esc(lang === 'de' ? 'Läuft auf deinem NAS oder PC.' : 'Runs on your NAS or PC.')}</text>
    <text x="80" y="515" font-size="30" font-weight="400" fill="#b4b0d6">${esc(lang === 'de' ? 'Mit günstigen Kameras in jedem Raum.' : 'With cheap cameras in every room.')}</text>
  </g>
  ${mascot}
</svg>`;
  await sharp(Buffer.from(svg)).png({ palette: true, quality: 90 }).toFile(`public/og/og.${lang}.png`);
}
console.log('wrote public/og/og.en.png, og.de.png');
