import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { source } from '@/lib/source';
import { getGitLastModified } from '@/lib/git';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: `${site.url}${page.url === '/' ? '/' : page.url}`,
    lastModified: getGitLastModified(...page.path.split('/')),
    changeFrequency: 'monthly',
    priority: page.url === '/' ? 1 : 0.7,
  }));
}
