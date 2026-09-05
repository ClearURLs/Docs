'use client';

import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { versions } from '@/lib/site';

const ids = new Set<string>(versions.map((v) => v.id));

/** Docs version selector rendered at the top of the sidebar. */
export function VersionSelect() {
  const pathname = usePathname() ?? '/';
  const router = useRouter();

  const parts = pathname.split('/').filter(Boolean);
  const active = ids.has(parts[0]) ? parts[0] : 'latest';
  const rest = parts.slice(ids.has(parts[0]) ? 1 : 0).join('/');

  return (
    <div className="fd-version-select relative mb-2 mt-2 flex flex-col gap-1.5">
      <label
        htmlFor="fd-version-select"
        className="text-xs font-medium text-fd-muted-foreground"
      >
        Documentation version
      </label>
      <div className="relative">
        <select
          id="fd-version-select"
          aria-label="Select documentation version"
          className="w-full cursor-pointer rounded-lg border border-fd-border bg-fd-secondary/50 py-2 pe-8 ps-3 text-sm font-medium text-fd-secondary-foreground shadow-sm transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
          value={active}
          onChange={(e) => {
            const next = e.target.value;
            const base = next === 'latest' ? '' : `/${next}`;
            router.push(`${base}/${rest}`.replace(/\/$/, '') || '/');
          }}
        >
          {versions.map((v) => (
            <option key={v.id} value={v.id} title={v.title}>
              {v.label === 'latest' ? `latest (${versions[1]?.label ?? 'dev'})` : v.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 size-4 -translate-y-1/2 text-fd-muted-foreground" />
      </div>
      {active !== 'latest' ? (
        <p className="text-xs text-fd-muted-foreground">
          Old release docs —{' '}
          <a href={`/${rest}`.replace(/\/$/, '') || '/'} className="underline underline-offset-2">
            switch to the latest version
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
