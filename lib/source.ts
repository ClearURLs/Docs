import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';
import { icons } from 'lucide-react';

// Sidebar icons for top-level pages, keyed by their URL path segment.
// Lucide v1.x renamed some legacy icon names we used in earlier drafts.
const PAGE_ICONS: Record<string, string> = {
  '': 'House',
  faq: 'CircleQuestionMark',
  troubleshooting: 'Wrench',
  reporting: 'Bug',
  permissions: 'ShieldCheck',
};

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  // Resolve icon strings (e.g. "CircleHelp" from frontmatter/meta.json) into
  // real Lucide elements. Fumadocs calls this for every node.icon value.
  icon(icon) {
    if (!icon) return undefined;
    const LucideIcon = icons[icon as keyof typeof icons];
    if (!LucideIcon) return undefined;
    return createElement(LucideIcon, { className: 'size-4 shrink-0', 'aria-hidden': true });
  },
});

/**
 * Sidebar-tree wrapper: decorate top-level pages with Lucide icons. Fumadocs
 * resolves `icon:` frontmatter only into strings at PageTree build time, and
 * the loader's `icon()` callback only runs for icons in `meta.json` — so we
 * explicitly create elements for known top-level pages here.
 */
export function getPageTree() {
  const tree = source.getPageTree();
  const PAGE_ICONS: Record<string, string> = {
    '': 'Home', // Overview (root)
    faq: 'CircleHelp',
    troubleshooting: 'Wrench',
    reporting: 'Bug',
    permissions: 'ShieldCheck',
  };
  function decorate(nodes: typeof tree.children) {
    for (const node of nodes) {
      if (node.type === 'page') {
        const raw = (node.url ?? '').replace(/^\/+/, '');
        if (raw.startsWith('1.')) continue; // keep versioned copies visually quiet
        const name = PAGE_ICONS[raw];
        if (name) {
          const LucideIcon = icons[name as keyof typeof icons];
          if (LucideIcon) node.icon = createElement(LucideIcon);
        }
      } else if (node.type === 'folder') {
        decorate(node.children);
      }
    }
  }
  decorate(tree.children);
  return tree;
}
