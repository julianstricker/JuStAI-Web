// Pulls the Markdown docs from the JuStAI repo and turns them into Starlight content.
//   English: <repo>/README.md + docs/*.md      -> src/content/docs/docs/
//   German:  <repo>/docs/de/*.md               -> src/content/docs/de/docs/
// Source: JUSTAI_SRC (local checkout) or a shallow clone of the GitHub repo into .cache/.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { base, repo } from '../site.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let src = process.env.JUSTAI_SRC;
if (!src) {
  src = path.join(root, '.cache', 'JuStAI');
  if (existsSync(path.join(src, '.git'))) {
    execFileSync('git', ['-C', src, 'pull', '--ff-only', '-q'], { stdio: 'inherit' });
  } else {
    mkdirSync(path.dirname(src), { recursive: true });
    execFileSync('git', ['clone', '--depth', '1', '-q', `https://github.com/${repo}.git`, src], { stdio: 'inherit' });
  }
}

const out = path.join(root, 'src/content/docs');
// Images (diagrams, screenshots) are part of the docs in the JuStAI repo: docs/img -> public/img/docs
rmSync(path.join(root, 'public/img/docs'), { recursive: true, force: true });
cpSync(path.join(src, 'docs/img'), path.join(root, 'public/img/docs'), { recursive: true });
rmSync(path.join(out, 'docs'), { recursive: true, force: true });
rmSync(path.join(out, 'de'), { recursive: true, force: true });

// Pretty titles for the sidebar / page headings come from the first H1 of each file.
const slugOf = (rel) => {
  // rel is relative to the repo root, e.g. docs/de/BEISPIELE.md, docs/adr/README.md, README.md
  const parts = rel.replace(/\.md$/, '').split('/');
  const lang = parts[1] === 'de' ? 'de' : 'en';
  let p = parts[0] === 'README' ? ['overview'] : parts.slice(lang === 'de' ? 2 : 1);
  if (parts[0] === 'docs' && parts[1] === 'de' && parts.length === 3 && parts[2] === 'README') p = ['overview'];
  p = p.map((s) => s.toLowerCase().replace(/_/g, '-'));
  if (p.at(-1) === 'readme') p.pop(); // adr/README -> adr
  if (p.at(-1) === 'beispiele') p[p.length - 1] = 'examples';
  return { lang, slug: p.join('/') };
};

const route = (rel) => {
  const { lang, slug } = slugOf(rel);
  return `${base}${lang === 'de' ? '/de' : ''}/docs/${slug}${slug ? '/' : ''}`;
};

const isDoc = (rel) => /^docs\/(de\/)?([^/]+|adr\/[^/]+)\.md$/.test(rel) || rel === 'README.md';

function rewriteLinks(text, fromRel) {
  const fromLang = slugOf(fromRel).lang;
  return text.replace(/\]\(([^)\s]+)\)/g, (m, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return m;
    const [p, hash = ''] = href.split('#');
    let target = path.posix.normalize(path.posix.join(path.posix.dirname(fromRel), p || path.posix.basename(fromRel)));
    // a directory link like adr/ -> its README
    const abs = path.join(src, target);
    if (existsSync(abs) && !abs.endsWith('.md')) {
      const readme = path.join(abs, 'README.md');
      if (existsSync(readme)) target = path.posix.join(target, 'README.md');
    }
    // images live next to the docs (docs/img) and are copied to public/img/docs below
    if (target.startsWith('docs/img/')) return `](${base}/img/docs/${target.slice('docs/img/'.length)})`;
    if (isDoc(target)) {
      // German pages prefer the German twin of an English doc
      if (fromLang === 'de' && /^docs\/[^/]+\.md$/.test(target)) {
        const twin = target.replace('docs/', 'docs/de/').replace('EXAMPLES.md', 'BEISPIELE.md');
        if (existsSync(path.join(src, twin))) target = twin;
      }
      return `](${route(target)}${hash ? '#' + hash : ''})`;
    }
    const kind = existsSync(abs) && !abs.endsWith('.md') && readdirSyncSafe(abs) ? 'tree' : 'blob';
    return `](https://github.com/${repo}/${kind}/main/${target}${hash ? '#' + hash : ''})`;
  });
}
const readdirSyncSafe = (p) => { try { return readdirSync(p).length >= 0; } catch { return false; } };

function convert(rel) {
  let text = readFileSync(path.join(src, rel), 'utf8');
  const { lang } = slugOf(rel);
  const m = text.match(/^#\s+(.+)\n/m);
  const title = (m ? m[1] : path.basename(rel, '.md')).replace(/`/g, '').replace(/"/g, '\\"');
  if (m) text = text.replace(m[0], '');
  // drop the "Deutsch · English" switcher line, Starlight has its own language picker
  text = text.replace(/^\*(\[[^\]]+\]\([^)]*\)|Deutsch|English)( · | ?· ?)(\[[^\]]+\]\([^)]*\)|Deutsch|English)\*\s*\n/m, '');
  text = rewriteLinks(text, rel);
  // Starlight renders the title itself; keep ASCII diagrams intact (code fences untouched).
  const { slug } = slugOf(rel);
  const dir = path.join(out, lang === 'de' ? 'de' : '', 'docs');
  const file = path.join(dir, (slug || 'index') + '.md');
  mkdirSync(path.dirname(file), { recursive: true });
  const edit = `https://github.com/${repo}/edit/main/${rel}`;
  writeFileSync(file, `---\ntitle: "${title}"\neditUrl: ${edit}\n---\n\n${text}`);
}

const list = [
  'README.md',
  ...readdirSync(path.join(src, 'docs')).filter((f) => f.endsWith('.md')).map((f) => `docs/${f}`),
  ...readdirSync(path.join(src, 'docs/adr')).map((f) => `docs/adr/${f}`),
  ...readdirSync(path.join(src, 'docs/de')).filter((f) => f.endsWith('.md')).map((f) => `docs/de/${f}`),
  ...readdirSync(path.join(src, 'docs/de/adr')).map((f) => `docs/de/adr/${f}`),
];
for (const rel of list) convert(rel);

// Hub pages (docs landing, in src/hub/*.mdx) with {{base}} replaced
for (const lang of ['en', 'de']) {
  const dir = path.join(out, lang === 'de' ? 'de' : '', 'docs');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.mdx'), readFileSync(path.join(root, 'src/hub', `${lang}.mdx`), 'utf8').replaceAll('{{base}}', base));
}
console.log(`Synced ${list.length} docs from ${src}`);
