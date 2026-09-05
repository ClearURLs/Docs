import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import {
  rehypeCodeDefaultOptions,
  transformerIcon,
} from 'fumadocs-core/mdx-plugins';
import { remarkCustomHeadingId } from './lib/remark-custom-heading-id.mjs';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkCustomHeadingId],
    rehypeCodeOptions: {
      themes: { light: 'github-light', dark: 'github-dark' },
      // Parse fence meta like ` ```yaml title="new-rules.yaml" icon="…" ` —
      // rehype-code then renders the CodeBlock header with title + language icon.
      parseMetaString: (meta: string) => {
        const out: Record<string, unknown> = {};
        const t = /title=(?:"([^"]*)"|'([^']*)')/.exec(meta);
        if (t) out.title = t[1] ?? t[2];
        const icon = /icon=(?:"([^"]*)"|'([^']*)')/.exec(meta);
        if (icon) out.icon = icon[1] ?? icon[2];
        return out;
      },
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerIcon()],
    },
    remarkImageOptions: {
      // Static export without a server-side image optimizer; keep plain
      // <img> tags so converted width/loading attributes keep working.
      external: true,
      useImport: false,
    },
  },
});
