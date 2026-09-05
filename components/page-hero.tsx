/**
 * Hero header for a docs page: page title + subtitle next to an app icon.
 * Replaces the default DocsTitle / DocsDescription rendering when used.
 */
export function PageHero({
  icon,
  iconAlt = '',
  title,
  description,
  iconWidth = 72,
}: {
  icon: string;
  iconAlt?: string;
  title: string;
  description: string;
  iconWidth?: number;
}) {
  return (
    <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
      <img
        src={icon}
        alt={iconAlt}
        width={iconWidth}
        height={iconWidth}
        className="shrink-0"
      />
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[1.75em] font-semibold tracking-tight m-0">{title}</h1>
        <p className="text-lg text-fd-muted-foreground m-0">{description}</p>
      </div>
    </header>
  );
}
