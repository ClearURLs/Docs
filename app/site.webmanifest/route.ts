import { site } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    name: site.title,
    short_name: site.name,
    icons: [{ src: '/assets/img/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
    theme_color: '#ea580c',
    background_color: '#ffffff',
    display: 'browser',
  });
}
