
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
  trend?: number;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  variant = "default",
  className,
  trend,
}: StatCardProps) {
  const variantStyles = {
    default: "border-primary/10 bg-primary/5",
    success: "border-success/10 bg-success/5",
    warning: "border-warning/10 bg-warning/5",
    destructive: "border-destructive/10 bg-destructive/5",
  };

  const trendDisplay = trend ? (
    <span
      className={cn(
        "text-xs font-medium inline-flex items-center",
        trend > 0 ? "text-success" : "text-destructive"
      )}
    >
      {trend > 0 ? "+" : ""}
      {trend}%
    </span>
  ) : null;

  return (
    <div
      className={cn(
        "relative rounded-xl border p-4 shadow-sm transition-all hover:shadow-md",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          {trendDisplay}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
    </div>
  );
}
