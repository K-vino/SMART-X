
import { cn } from "@/lib/utils";

interface BadgeStreakProps {
  count: number;
  variant?: "default" | "success" | "warning" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BadgeStreak({
  count,
  variant = "default",
  size = "md",
  className,
}: BadgeStreakProps) {
  const variantStyles = {
    default: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  };

  const sizeStyles = {
    sm: "h-5 min-w-5 text-xs",
    md: "h-6 min-w-6 text-sm",
    lg: "h-8 min-w-8 text-base",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold px-2",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {count}
    </div>
  );
}
