import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { remarkGithubCard } from './src/plugins/remark-github-card.mjs';
import { rehypeGithubCard } from './src/plugins/rehype-github-card.mjs';

export default defineConfig({
  integrations: [tailwind()],
  devToolbar: { enabled: false },
  markdown: {
    remarkPlugins: [remarkGfm, remarkDirective, remarkGithubCard],
    rehypePlugins: [rehypeRaw, rehypeGithubCard],
  },
});
