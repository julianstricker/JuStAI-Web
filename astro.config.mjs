import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { site, base, repo } from './site.config.mjs';

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'JuStAI5',
      description: 'A local AI assistant for every room of your home.',
      logo: { src: './src/assets/logo.svg', alt: 'JuStAI5' },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: { root: { label: 'English', lang: 'en' }, de: { label: 'Deutsch', lang: 'de' } },
      social: [{ icon: 'github', label: 'GitHub', href: `https://github.com/${repo}` }],
      customCss: ['./src/styles/theme.css'],
      components: { Head: './src/components/Head.astro', Header: './src/components/Header.astro', Sidebar: './src/components/Sidebar.astro' },
      sidebar: [
        { label: 'Start here', translations: { de: 'Loslegen' }, items: [
          { slug: 'docs/overview' }, { slug: 'docs/installation' }, { slug: 'docs/examples' } ] },
        { label: 'Using JuStAI5', translations: { de: 'Benutzen' }, items: [
          { slug: 'docs/rooms' }, { slug: 'docs/devices' }, { slug: 'docs/displays' }, { slug: 'docs/ai' },
          { slug: 'docs/vision' }, { slug: 'docs/ptz' }, { slug: 'docs/memory' }, { slug: 'docs/automations' }, { slug: 'docs/audio' } ] },
        { label: 'Operate', translations: { de: 'Betrieb' }, items: [
          { slug: 'docs/deployment' }, { slug: 'docs/security' }, { slug: 'docs/testing' } ] },
        { label: 'Build & extend', translations: { de: 'Entwickeln' }, items: [
          { slug: 'docs/vibe-coding' }, { slug: 'docs/plugins' }, { slug: 'docs/development' }, { slug: 'docs/architecture' }, { slug: 'docs/tech-stack' },
          { label: 'Decisions (ADR)', translations: { de: 'Entscheidungen (ADR)' }, items: [{ autogenerate: { directory: 'docs/adr' } }] } ] },
      ],
    }),
  ],
});
