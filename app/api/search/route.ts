import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

// Fully static (Orama) search index — generated at build time,
// no external service required.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  localeMap: { en: 'english' },
});
