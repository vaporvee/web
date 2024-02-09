import { defineConfig } from "astro/config";
import minify from "astro-min";
import metaTags from "astro-meta-tags";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkDirective from "remark-directive";
import remarkCalloutDirectives from "@microflash/remark-callout-directives";
import remarkExternalLinks from "remark-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import codeTheme from "./src/styles/moonlight-ii.json";
import mdx from "@astrojs/mdx";
import lighthouse from "astro-lighthouse";
import icon from "astro-icon";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    minify(),
    metaTags(),
    expressiveCode({
      themes: [codeTheme],
      styleOverrides: {
        frames: {
          tooltipSuccessBackground: "#7ECA9C",
        },
      },
    }),
    mdx(),
    lighthouse(),
    icon(),
  ],
  markdown: {
    syntaxHighlight: false,
    // Disable syntax built-in syntax hightlighting from astro
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: codeTheme,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
    remarkPlugins: [
      remarkDirective,
      remarkCalloutDirectives,
      [
        remarkExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
  },
});
