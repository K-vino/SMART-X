
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: "default" | "outline" | "primary" | "secondary" | "accent";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function FeatureCard({
  title,
  description,
  icon,
  action,
  variant = "default",
  className,
  children,
  onClick,
}: FeatureCardProps) {
  const variantStyles = {
    default: "bg-card text-card-foreground border",
    outline: "bg-background border border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-5 shadow-sm transition-all hover:shadow",
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="shrink-0">{icon}</div>}
          <div>
            <h3 className="font-semibold">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>

      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
