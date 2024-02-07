import { defineConfig } from 'astro/config';
import minify from 'astro-min';
import metaTags from "astro-meta-tags";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from "@microflash/remark-callout-directives";
import remarkExternalLinks from 'remark-external-links';
import mdx from "@astrojs/mdx";
import lighthouse from "astro-lighthouse";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [minify(), metaTags(), mdx(), lighthouse(), icon()],
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: 'wrap'
    }]],
    remarkPlugins: [remarkDirective, remarkCalloutDirectives, [remarkExternalLinks, {
      target: '_blank'
    }]],
    shikiConfig: {
      theme: 'dracula'
    }
  }
});