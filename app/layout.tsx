import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.title}`,
  },
  description: site.description,
  icons: {
    icon: '/assets/img/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{
            // Make the automatic system-preference switch work on macOS
            // (Safari/Firefox): explicit default + system tie-in.
            enabled: true,
            defaultTheme: 'system',
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
          search={{
            // Static (Orama) indexes prerendered into /api/search; we must
            // pass explicit options — otherwise the default dialog falls back
            // to a server-driven fetch client, which returns undefined for
            // an empty query and breaks `items.map` during hydration.
            options: {
              type: 'static',
              api: '/api/search',
              // Avoid `items.map` on `undefined` for the initial empty state.
              allowClear: true,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
