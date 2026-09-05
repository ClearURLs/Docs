'use client';

import { useEffect, useState } from 'react';

const REPO = { owner: 'ClearURLs', repo: 'Addon' } as const;

type State = { stars: string; forks: string } | 'loading' | { error: true };

function format(count: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
    count,
  );
}

/**
 * Live GitHub repo chip (stars + forks) — like fumadocs' GithubInfo, but
 * client-side fetched so values are always current. Falls back to a link-only
 * chip when the GitHub API is unreachable.
 */
export function OverviewGithubInfo() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${REPO.owner}/${REPO.repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`GitHub API ${r.status}`))))
      .then((d: { stargazers_count: number; forks_count: number }) => {
        if (cancelled) return;
        setState({ stars: format(d.stargazers_count), forks: format(d.forks_count) });
      })
      .catch(() => {
        if (!cancelled) setState({ error: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === 'loading') {
    return (
      <span className="my-3 inline-flex h-9 w-56 animate-pulse rounded-lg border bg-fd-muted/40" />
    );
  }

  const isError = 'error' in state;
  const stars = isError ? null : state.stars;
  const forks = isError ? null : state.forks;

  return (
    <a
      href={`https://github.com/${REPO.owner}/${REPO.repo}`}
      rel="noreferrer noopener"
      target="_blank"
      className="my-3 inline-flex items-center gap-2 rounded-lg border bg-fd-card px-3 py-2 text-sm text-fd-foreground/80 shadow-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground not-prose"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      <span className="font-semibold">
        {REPO.owner}/{REPO.repo}
      </span>
      <span className="text-fd-muted-foreground">·</span>
      <span>
        <span className={stars ? 'font-medium text-fd-foreground' : 'text-fd-muted-foreground'}>
          {stars ?? '—'}
        </span>
        <span className="text-fd-muted-foreground"> ★</span>
      </span>
      <span className="text-fd-muted-foreground">·</span>
      <span>
        <span className={forks ? 'font-medium text-fd-foreground' : 'text-fd-muted-foreground'}>
          {forks ?? '—'}
        </span>
        <span className="text-fd-muted-foreground"> forks</span>
      </span>
    </a>
  );
}
