import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://clean-up-fest.example',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
