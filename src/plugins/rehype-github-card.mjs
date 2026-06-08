import { visit } from 'unist-util-visit';

export function rehypeGithubCard() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const regex = /::github\{repo="([^"]+)"\}/g;
      const matches = [...node.value.matchAll(regex)];
      if (matches.length === 0) return;

      const children = [];
      let lastIndex = 0;

      for (const match of matches) {
        const [fullMatch, repo] = match;
        const matchIndex = match.index;

        if (matchIndex > lastIndex) {
          children.push({ type: 'text', value: node.value.slice(lastIndex, matchIndex) });
        }

        const [owner, repoName] = repo.split('/');
        const repoUrl = `https://github.com/${repo}`;

        children.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['github-card'] },
          children: [{
            type: 'element',
            tagName: 'a',
            properties: { href: repoUrl, target: '_blank', rel: 'noopener noreferrer', className: ['github-card-link'] },
            children: [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['github-card-header'] },
                children: [
                  {
                    type: 'element',
                    tagName: 'svg',
                    properties: { className: ['github-card-icon'], viewBox: '0 0 16 16', width: '20', height: '20' },
                    children: [{
                      type: 'element',
                      tagName: 'path',
                      properties: {
                        fill: 'currentColor',
                        d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
                      },
                      children: [],
                    }],
                  },
                  { type: 'text', value: `${owner} / ` },
                  { type: 'element', tagName: 'span', properties: { className: ['github-card-repo'] }, children: [{ type: 'text', value: repoName }] },
                ],
              },
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['github-card-body'] },
                children: [
                  { type: 'element', tagName: 'p', properties: { className: ['github-card-description'], id: `gh-desc-${owner}-${repoName}` }, children: [{ type: 'text', value: 'Loading...' }] },
                ],
              },
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['github-card-footer'] },
                children: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: { className: ['github-card-stat'] },
                    children: [
                      {
                        type: 'element',
                        tagName: 'svg',
                        properties: { viewBox: '0 0 16 16', width: '14', height: '14' },
                        children: [{
                          type: 'element',
                          tagName: 'path',
                          properties: { fill: 'currentColor', d: 'M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z' },
                          children: [],
                        }],
                      },
                      { type: 'element', tagName: 'span', properties: { id: `gh-stars-${owner}-${repoName}` }, children: [{ type: 'text', value: '-' }] },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: { className: ['github-card-stat'] },
                    children: [
                      {
                        type: 'element',
                        tagName: 'svg',
                        properties: { viewBox: '0 0 16 16', width: '14', height: '14' },
                        children: [{
                          type: 'element',
                          tagName: 'path',
                          properties: { fill: 'currentColor', d: 'M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z' },
                          children: [],
                        }],
                      },
                      { type: 'element', tagName: 'span', properties: { id: `gh-forks-${owner}-${repoName}` }, children: [{ type: 'text', value: '-' }] },
                    ],
                  },
                ],
              },
            ],
          }],
        });

        lastIndex = matchIndex + fullMatch.length;
      }

      if (lastIndex < node.value.length) {
        children.push({ type: 'text', value: node.value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
