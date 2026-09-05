import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
  PageLastUpdate,
} from 'fumadocs-ui/layouts/docs/page';
import { getGitLastModified } from '@/lib/git';
import { editOnGitLabUrl, isVersionId, versions, latestVersion, type VersionId } from '@/lib/site';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { PageHero } from '@/components/page-hero';

function normalize(slug: string[] | undefined): { version: VersionId; slug: string[] } {
  if (
    slug &&
    slug.length > 0 &&
    isVersionId(slug[0]) &&
    (slug[0] as VersionId) !== latestVersion.id
  ) {
    return { version: slug[0] as VersionId, slug: slug.slice(1) };
  }
  return { version: latestVersion.id, slug: slug ?? [] };
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const { version, slug } = normalize(params.slug);
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const lastModified = getGitLastModified(...page.path.split('/'));

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      footer={{
        enabled: true,
      }}
    >
      {page.slugs.length === 0 ? (
        <PageHero
          icon="/assets/img/logo.svg"
          iconAlt="ClearURLs logo"
          title={page.data.title}
          description={page.data.description ?? ''}
        />
      ) : (
        <>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
        </>
      )}
      <DocsBody>
        <MDX components={getMDXComponents()} />
        <div
          role="contentinfo"
          className="mt-8 flex flex-row flex-wrap items-center justify-between gap-3 rounded-lg border border-fd-border bg-fd-card/50 px-4 py-3 text-xs text-fd-muted-foreground not-prose"
        >
          <EditOnGitHub
            href={editOnGitLabUrl(page.path)}
            target="_blank"
            rel="noreferrer"
            className="hover:text-fd-foreground transition-colors"
          >
            Edit on GitLab
          </EditOnGitHub>
          {lastModified ? <PageLastUpdate date={lastModified} /> : null}
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const unversioned = source.getPages().map((page) => ({ slug: page.slugs }));
  const versioned = versions
    .filter((v) => v.id !== latestVersion.id)
    .flatMap((v) => [
      { slug: [v.id] },
      ...source.getPages().map((page) => ({ slug: [v.id, ...page.slugs] })),
    ]);
  return [{ slug: [] }, ...unversioned, ...versioned];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { version, slug } = normalize(params.slug);
  const page = source.getPage(slug);
  if (!page) notFound();

  const isLatest = version === latestVersion.id;
  const path = isLatest ? `/${slug.join('/')}` : `/${version}/${slug.join('/')}`;
  const title = isLatest ? page.data.title : `${page.data.title} (${version})`;

  return {
    title,
    description: page.data.description,
    alternates: { canonical: path },
    robots: isLatest ? undefined : { index: false, follow: true },
    openGraph: { title, description: page.data.description ?? undefined },
  };
}
