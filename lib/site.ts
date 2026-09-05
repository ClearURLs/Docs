export const site = {
  name: 'ClearURLs',
  title: 'ClearURLs Documentation',
  description:
    'ClearURLs automatically removes tracking elements from URLs to help protect your privacy.',
  url: 'https://docs.clearurls.xyz',
} as const;

export const repos = {
  /** Main add-on repository (issue tracker). */
  addon: 'https://github.com/ClearURLs/Addon',
  /** Mirror on GitLab. */
  gitlab: 'https://gitlab.com/KevinRoebert/ClearUrls',
  /** This documentation — “Edit this page” target. */
  docsGitLab: 'https://gitlab.com/ClearURLs/docs',
  mastodon: 'https://infosec.exchange/@clearurls',
} as const;

/**
 * All released documentation versions, newest first.
 * The first entry is the default (unversioned) build; it is also aliased
 * to /latest/ during the static export. Older versions are built from git
 * tags of the docs repository and output under /<version>/.
 */
export const versions = [
  { id: 'latest', label: 'latest', title: 'Latest (development)', ref: null as string | null },
  { id: '1.27.3', label: '1.27.3', title: 'Documentation for ClearURLs 1.27.3', ref: 'v1.27.3' },
] as const;

export type VersionId = (typeof versions)[number]['id'];

/** The version that replaces the old mike “latest” alias at deploy time. */
export const latestVersion = versions[0];

export function isLatest(version: string): boolean {
  return version === latestVersion.id;
}

export function isVersionId(id: string): id is VersionId {
  return (versions as readonly { id: string }[]).some((v) => v.id === id);
}

export function editOnGitLabUrl(contentPath: string): string {
  return `${repos.docsGitLab}/-/edit/master/content/docs/${contentPath}`;
}
