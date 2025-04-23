
import { Lightbulb } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: "habit" | "workout" | "learning" | "news";
  action?: string;
  actionUrl?: string;
}

interface SuggestionCardProps {
  suggestion: Suggestion;
  onAction?: () => void;
}

export function SuggestionCard({ suggestion, onAction }: SuggestionCardProps) {
  const typeStyles = {
    habit: "bg-primary/10 border-primary/20",
    workout: "bg-accent/10 border-accent/20",
    learning: "bg-secondary/10 border-secondary/20", 
    news: "bg-warning/10 border-warning/20",
  };
  
  return (
    <div className={`rounded-xl border p-4 ${typeStyles[suggestion.type]}`}>
      <div className="flex gap-3">
        <div className="shrink-0 h-8 w-8 rounded-full bg-background flex items-center justify-center">
          <Lightbulb size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-sm">{suggestion.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
          
          {suggestion.action && (
            <button 
              onClick={onAction}
              className="text-xs font-medium text-primary mt-2 hover:underline"
            >
              {suggestion.action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
