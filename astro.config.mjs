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
        { slug: 'docs', label: 'Docs home', translations: { de: 'Doku-Start' } },
        { label: '1 · Start here', translations: { de: '1 · Loslegen' }, items: [
          { slug: 'docs/overview', label: 'What is JuStAI5?', translations: { de: 'Was ist JuStAI5?' } },
          { slug: 'docs/installation', label: 'Install', translations: { de: 'Installieren' } },
          { slug: 'docs/examples', label: 'Ideas: what to ask', translations: { de: 'Ideen: was fragen?' } } ] },
        { label: '2 · Set up your home', translations: { de: '2 · Zuhause einrichten' }, items: [
          { slug: 'docs/rooms', label: 'Rooms and endpoints', translations: { de: 'Räume und Endpoints' } },
          { slug: 'docs/devices', label: 'Cameras and devices', translations: { de: 'Kameras und Geräte' } },
          { slug: 'docs/displays', label: 'Screens and device app', translations: { de: 'Bildschirme und Geräte-App' } },
          { slug: 'docs/audio', label: 'Voice and wakeword', translations: { de: 'Sprache und Wakeword' } } ] },
        { label: '3 · Use it', translations: { de: '3 · Benutzen' }, items: [
          { slug: 'docs/ai', label: 'AI models and languages', translations: { de: 'KI-Modelle und Sprachen' } },
          { slug: 'docs/vision', label: 'Seeing and recognising', translations: { de: 'Sehen und Erkennen' } },
          { slug: 'docs/ptz', label: 'Moving cameras (PTZ)', translations: { de: 'Bewegliche Kameras (PTZ)' } },
          { slug: 'docs/memory', label: 'Memory', translations: { de: 'Gedächtnis' } },
          { slug: 'docs/automations', label: 'Automations', translations: { de: 'Automationen' } } ] },
        { label: '4 · Extend it', translations: { de: '4 · Erweitern' }, items: [
          { slug: 'docs/vibe-coding', label: 'Build by vibe coding', translations: { de: 'Per Vibe Coding bauen' }, badge: { text: 'New', variant: 'tip' } },
          { slug: 'docs/plugins', label: 'Plugins and SDK', translations: { de: 'Plugins und SDK' } } ] },
        { label: '5 · Run and secure', translations: { de: '5 · Betreiben und absichern' }, collapsed: true, items: [
          { slug: 'docs/deployment', label: 'Deployment and backups', translations: { de: 'Betrieb und Backups' } },
          { slug: 'docs/security', label: 'Security and privacy', translations: { de: 'Sicherheit und Datenschutz' } } ] },
        { label: '6 · Under the hood', translations: { de: '6 · Unter der Haube' }, collapsed: true, items: [
          { slug: 'docs/architecture', label: 'Architecture', translations: { de: 'Architektur' } },
          { slug: 'docs/tech-stack', label: 'Technology stack', translations: { de: 'Technik-Stack' } },
          { slug: 'docs/development', label: 'Development', translations: { de: 'Entwicklung' } },
          { slug: 'docs/testing', label: 'Testing', translations: { de: 'Tests' } },
          { label: 'Decisions (ADR)', translations: { de: 'Entscheidungen (ADR)' }, collapsed: true, items: [{ autogenerate: { directory: 'docs/adr' } }] } ] },
      ],
    }),
  ],
});
