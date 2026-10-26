// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://hafsausmani.com',
  // Pages stay static; only /api/ask runs on demand (as a Vercel function) for Ask Hafsa's AI
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap({
    // Match the canonical URLs and internal links (no trailing slash); skip the /contact redirect
    filter: (page) => !page.endsWith('/contact/'),
    serialize: (item) => ({ ...item, url: item.url.replace(/(.)\/$/, '$1') }),
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});