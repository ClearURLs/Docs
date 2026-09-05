import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const cache = new Map<string, number>();

/**
 * Last git modification time of a docs content file (ms epoch).
 * Falls back to build time (matches the old fallback_to_build_date
 * behaviour of mkdocs-git-revision-date-localized).
 */
export function getGitLastModified(...segments: string[]): Date | undefined {
  const key = segments.join('/');
  const hit = cache.get(key);
  if (hit) return new Date(hit);
  try {
    const file = join('content', ...segments);
    const out = execFileSync('git', ['log', '-1', '--format=%at', '--', file], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    const ts = Number(out);
    if (!Number.isFinite(ts) || ts <= 0) return new Date();
    cache.set(key, ts * 1000);
    return new Date(ts * 1000);
  } catch {
    return new Date();
  }
}
