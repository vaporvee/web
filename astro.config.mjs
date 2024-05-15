import { defineConfig } from "astro/config";
import minify from "astro-min";
import metaTags from "astro-meta-tags";
import codeTheme from "./src/styles/moonlight-ii.json";
import mdx from "@astrojs/mdx";
import lighthouse from "astro-lighthouse";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    minify(),
    metaTags(),
    mdx(),
    lighthouse(),
    icon(),
  ],
});
