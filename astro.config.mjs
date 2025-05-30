import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://lenar.dev",
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  redirects: {
    "/posts/validots-performance-explained": "https://github.com/bartoszlenar/Validot/blob/main/docs/articles/validots-performance-explained.md",
    "/posts/crafting-model-specifications-using-validot": "https://github.com/bartoszlenar/Validot/blob/main/docs/articles/crafting-model-specifications-using-validot.md",
  }
});
