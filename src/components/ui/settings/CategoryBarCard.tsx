import { Badge } from "@/components/Badge";
import { cx } from "@/lib/utils";
import { CategoryBar } from "@/components/CategoryBar";
import type { KpiEntryExtended } from "@/app/(main)/page";

export type CardProps = {
  title: string;
  change: string;
  value: string;
  valueDescription: string;
  subtitle: string;
  ctaDescription: string;
  ctaText: string;
  ctaLink: string;
  data: KpiEntryExtended[];
  marker?: { value: number; tooltip?: string };
};

export function CategoryBarCard({
  title,
  change,
  value,
  valueDescription,
  subtitle,
  ctaDescription,
  ctaText,
  ctaLink,
  data,
  marker,
}: CardProps) {
  const values = data.map(item => item.percentage);
  const colors = data.map(item => item.color);

  return (
    <>
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 sm:text-sm dark:text-gray-50">
              {title}
            </h3>
            <Badge variant="neutral">{change}</Badge>
          </div>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-xl text-gray-900 dark:text-gray-50">
              {value}
            </span>
            <span className="text-sm text-gray-500">{valueDescription}</span>
          </p>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {subtitle}
            </p>
            {/* Replace hardcoded bar with CategoryBar */}
            <CategoryBar 
              values={values} // Pass the array of percentages
              colors={colors} // Pass the array of colors
              marker={marker} // Pass the marker if provided
              showLabels={false} // Adjust as needed, this hides labels in the bar
            />
          </div>
          <ul role="list" className="mt-5 space-y-2">
            {data.map((item) => (
              <li key={item.title} className="flex items-center gap-2 text-xs">
                <span
                  className={cx(item.color, "size-2.5 rounded-sm")}
                  aria-hidden="true"
                />
                <span className="text-gray-900 dark:text-gray-50">
                  {item.title}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({item.value} / {item.percentage}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          {ctaDescription}{" "}
          <a
            href={ctaLink}
            className="text-gb-secondary-600 dark:text-gb-secondary-400"
          >
            {ctaText}
          </a>
        </p>
      </div>
    </>
  );
}
