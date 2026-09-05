'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { twMerge as cn } from 'tailwind-merge';

const SHOW_THRESHOLD = 400;

/**
 * Floating "Back to top" button — appears after scrolling down, triggers a
 * smooth scroll back to the top. Matches the old Material feature.
 */
export function BackToTop({ threshold = SHOW_THRESHOLD }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-50 inline-flex size-10 items-center justify-center',
        'rounded-full border bg-fd-background/90 text-fd-muted-foreground shadow-lg',
        'backdrop-blur transition-all hover:bg-fd-accent hover:text-fd-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
