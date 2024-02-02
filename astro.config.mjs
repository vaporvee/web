import { defineConfig } from 'astro/config';
import minify from 'astro-min';
import metaTags from "astro-meta-tags";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [minify(), metaTags(), mdx()],
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: 'prepend'
    }]],
    drafts: true,
    shikiConfig: {
      theme: 'dracula'
    }
  }
});