// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hafsausmani.com',
  integrations: [sitemap({
    // Match the canonical URLs and internal links (no trailing slash); skip the /contact redirect
    filter: (page) => !page.endsWith('/contact/'),
    serialize: (item) => ({ ...item, url: item.url.replace(/(.)\/$/, '$1') }),
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});