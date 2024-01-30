import { defineConfig } from 'astro/config';
import minify from 'astro-min';

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [minify(), metaTags()]
});