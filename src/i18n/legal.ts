// Legal pages: where they live and how they are labelled (EN at /legal, /privacy; DE at /de/impressum, /de/datenschutz).
export function legalLinks(base: string, lang: 'en' | 'de') {
  return lang === 'de'
    ? { notice: { href: `${base}/de/impressum/`, label: 'Impressum' }, privacy: { href: `${base}/de/datenschutz/`, label: 'Datenschutz' } }
    : { notice: { href: `${base}/legal/`, label: 'Legal notice' }, privacy: { href: `${base}/privacy/`, label: 'Privacy' } };
}
