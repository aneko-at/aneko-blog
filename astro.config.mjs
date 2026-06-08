import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { remarkGithubCard } from './src/plugins/remark-github-card.mjs';
import { rehypeGithubCard } from './src/plugins/rehype-github-card.mjs';

export default defineConfig({
  devToolbar: { enabled: false },
  vite: {
    css: {
      postcss: './postcss.config.mjs',
    },
  },
  markdown: {
    remarkPlugins: [remarkGfm, remarkDirective, remarkGithubCard],
    rehypePlugins: [rehypeRaw, rehypeGithubCard],
  },
});
