import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Use full width without max-width constraint */
  fullWidth?: boolean;
}

/**
 * Base page wrapper component with consistent max-width and padding.
 * Provides the foundation layout for all pages.
 */
export function PageWrapper({
  children,
  className,
  fullWidth = false,
}: PageWrapperProps) {
  return (
    <div
      data-testid="page-wrapper"
      className={cn(
        "w-full px-4 md:px-6 lg:px-8",
        !fullWidth && "mx-auto max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
