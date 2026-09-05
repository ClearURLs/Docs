import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { repos, site } from '@/lib/site';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/assets/img/logo.svg"
            alt=""
            width={26}
            height={26}
            className="dark:hidden"
            priority
          />
          <Image
            src="/assets/img/logo-inverse.svg"
            alt=""
            width={26}
            height={26}
            className="hidden dark:block"
            priority
          />
          <span className="font-semibold">{site.name}</span>
          <span className="rounded-md border border-fd-border px-1.5 py-0.5 text-xs text-fd-muted-foreground">
            docs
          </span>
        </>
      ),
      transparentMode: 'top',
    },
    githubUrl: repos.addon,
    links: [
      {
        type: 'icon',
        label: 'GitLab mirror',
        icon: (
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0752.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0737.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a1.913 1.913 0 0 0 .09 1.418 1.9527 1.9527 0 0 0 .7567.8871l11.284 8.4527L12.0006 21.5l11.6004-8.653a1.9527 1.9527 0 0 0 .7566-.8871 1.913 1.913 0 0 0 .0901-1.418z" />
          </svg>
        ),
        text: 'GitLab',
        url: repos.gitlab,
        external: true,
      },
      {
        type: 'icon',
        label: 'Issues',
        icon: (
          <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        ),
        text: 'Issue tracker',
        url: `${repos.addon}/issues`,
        external: true,
      },
      {
        type: 'icon',
        label: 'Mastodon',
        icon: (
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-6.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.974 4.047 5.2 4.43 1.272.219 2.584.294 3.887.244 1.148-.044 2.29-.197 3.427-.477l-.003-.875c-.004-.18-.036-.318-.21-.396-1.005-.464-2.012-.923-2.994-1.424-.785-.4-1.133-1.024-1.2-1.852-.016-.176.003-.354.049-.525.213-.482.544-.524 1.02-.313 2.28 1.01 4.6 1.476 6.972 1.469 3.258-.01 6.396-.736 5.678-5.5 0 0 .788-.002.874-.586.018-.115.055-.227.082-.34.087-.377 0-.37.09-.9l-.001-.001c.134-1.01-.249-4.587-.864-6.277zm-4.071 8.037h-2.49v-6.1c0-1.295-.543-1.952-1.63-1.952-1.2 0-1.802.777-1.802 2.313v3.353h-2.484V7.61c0-1.535-.602-2.313-1.802-2.313-1.088 0-1.63.657-1.63 1.952v6.1H4.866V7.154c0-1.305.333-2.34.997-3.104.686-.786 1.585-1.19 2.698-1.19 1.29 0 2.265.496 2.91 1.488l.626 1.05.626-1.05c.645-.992 1.62-1.488 2.91-1.488 1.112 0 2.011.404 2.697 1.19.665.764.997 1.8.997 3.104z" />
          </svg>
        ),
        text: 'Mastodon',
        url: repos.mastodon,
        external: true,
      },
    ],
  };
}
