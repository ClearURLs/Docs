import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { BackToTop } from '@/components/back-to-top';
import { VersionSelect } from '@/components/version-select';
import { baseOptions } from '@/lib/layout.shared';
import { getPageTree } from '@/lib/source';

function SidebarFooter() {
  return (
    <p className="text-xs text-fd-muted-foreground">
      © 2017–2026 ClearURLs · built with{' '}
      <a
        href="https://fumadocs.dev"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2"
      >
        Fumadocs
      </a>
    </p>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={getPageTree()}
      sidebar={{
        banner: <VersionSelect key="version-select" />,
        footer: <SidebarFooter key="footer" />,
      }}
    >
      {children}
      <BackToTop />
    </DocsLayout>
  );
}
