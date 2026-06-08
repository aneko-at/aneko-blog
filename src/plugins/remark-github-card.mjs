import { visit } from 'unist-util-visit';

export function remarkGithubCard() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type !== 'containerDirective' &&
        node.type !== 'leafDirective' &&
        node.type !== 'textDirective'
      ) return;
      if (node.name !== 'github') return;

      const attributes = node.attributes || {};
      const repo = attributes.repo;
      if (!repo || !repo.includes('/')) return;

      const [owner, repoName] = repo.split('/');
      const cardId = `GC${Math.random().toString(36).slice(-6)}`;
      const repoUrl = `https://github.com/${owner}/${repoName}`;

      const data = node.data || (node.data = {});
      data.hName = 'div';
      data.hProperties = { id: `${cardId}-card`, class: 'github-card fetch-waiting' };
      data.hChildren = [
        createLink(repoUrl, [
          createTitleBar(owner, repoName, cardId),
          createDescription(cardId),
          createInfoBar(cardId),
        ]),
        createFetchScript(cardId, repo),
      ];
    });
  };
}

function createLink(href, children) {
  return {
    type: 'element',
    tagName: 'a',
    properties: { href, target: '_blank', rel: 'noopener noreferrer', class: 'gc-link' },
    children,
  };
}

function createTitleBar(owner, repoName, cardId) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { class: 'gc-titlebar' },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: { class: 'gc-titlebar-left' },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { class: 'gc-owner' },
            children: [
              { type: 'element', tagName: 'div', properties: { id: `${cardId}-avatar`, class: 'gc-avatar' }, children: [] },
              { type: 'element', tagName: 'div', properties: { class: 'gc-user' }, children: [{ type: 'text', value: owner }] },
            ],
          },
          { type: 'element', tagName: 'div', properties: { class: 'gc-divider' }, children: [{ type: 'text', value: '/' }] },
          { type: 'element', tagName: 'div', properties: { class: 'gc-repo' }, children: [{ type: 'text', value: repoName }] },
        ],
      },
      { type: 'element', tagName: 'div', properties: { class: 'github-logo' }, children: [] },
    ],
  };
}

function createDescription(cardId) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { id: `${cardId}-description`, class: 'gc-description' },
    children: [{ type: 'text', value: 'Waiting for api.github.com...' }],
  };
}

function createInfoBar(cardId) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { class: 'gc-infobar' },
    children: [
      createInfoItem('star', `${cardId}-stars`, '00K'),
      createInfoItem('fork', `${cardId}-forks`, '0K'),
      createInfoItem('license', `${cardId}-license`, 'MIT'),
      createInfoItem('language', `${cardId}-language`, 'Waiting...'),
    ],
  };
}

function createFetchScript(cardId, repo) {
  return {
    type: 'element',
    tagName: 'script',
    properties: { id: `${cardId}-script`, type: 'text/javascript', defer: true },
    children: [{
      type: 'text',
      value: `
        fetch('https://api.github.com/repos/${repo}', { referrerPolicy: "no-referrer" })
          .then(r => r.json())
          .then(data => {
            const desc = document.getElementById('${cardId}-description');
            if (desc) desc.innerText = data.description?.replace(/:[a-zA-Z0-9_]+:/g, '') || "No description";
            const lang = document.getElementById('${cardId}-language');
            if (lang) lang.innerText = data.language || "Unknown";
            const forks = document.getElementById('${cardId}-forks');
            if (forks) forks.innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks).replaceAll("\\u202f", '');
            const stars = document.getElementById('${cardId}-stars');
            if (stars) stars.innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.stargazers_count).replaceAll("\\u202f", '');
            const avatar = document.getElementById('${cardId}-avatar');
            if (avatar) { avatar.style.backgroundImage = 'url(' + data.owner.avatar_url + ')'; avatar.style.backgroundColor = 'transparent'; }
            const lic = document.getElementById('${cardId}-license');
            if (lic) lic.innerText = data.license?.spdx_id || "no-license";
            const card = document.getElementById('${cardId}-card');
            if (card) card.classList.remove("fetch-waiting");
          })
          .catch(() => {
            const card = document.getElementById('${cardId}-card');
            if (card) card.classList.add("fetch-error");
          });
      `,
    }],
  };
}

function createInfoItem(type, id, defaultValue) {
  const icons = {
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    fork: 'M7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM5 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM19 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 12h12M17 9v6',
    license: 'M6 2v6H4V2h2zm0 8v6H4v-6h2zm0 8v2H4v-2h2zm4-16v2H8V2h2zm0 4v2H8V6h2zm0 4v2H8v-2h2zm0 4v2H8v-2h2zm0 4v2H8v-2h2zm10-16l-2 2 2 2 2-2-2-2zm-2 2l-2 2 2 2 2-2-2-2zm-2 2l-2 2 2 2 2-2-2-2zm-2 2l-2 2 2 2 2-2-2-2z',
    language: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  };

  return {
    type: 'element',
    tagName: 'div',
    properties: { class: `gc-info-item gc-${type}` },
    children: [
      {
        type: 'element',
        tagName: 'svg',
        properties: { viewBox: '0 0 24 24', class: 'gc-info-icon' },
        children: [{ type: 'element', tagName: 'path', properties: { d: icons[type], fill: 'currentColor' }, children: [] }],
      },
      { type: 'element', tagName: 'span', properties: { id }, children: [{ type: 'text', value: defaultValue }] },
    ],
  };
}
