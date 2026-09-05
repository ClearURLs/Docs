import { visit } from 'unist-util-visit';

/**
 * Turns `## Heading [#custom-id]` (produced by the MkDocs attr_list
 * conversion) into heading ids — Fumadocs strips the `[#...]` text when
 * rendering so only the anchor slug remains.
 */
export function remarkCustomHeadingId() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const last = node.children[node.children.length - 1];
      if (!last || last.type !== 'text') return;
      const m = /^(.*?)\s*\[#([\w.-]+)\]\s*$/.exec(last.value);
      if (!m) return;
      last.value = m[1];
      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.hProperties.id = m[2];
    });
  };
}
