
import { Suggestion, SuggestionCard } from "./suggestion-card";

interface SuggestionsListProps {
  suggestions: Suggestion[];
  onAction?: (suggestion: Suggestion) => void;
}

export function SuggestionsList({ suggestions, onAction }: SuggestionsListProps) {
  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <SuggestionCard 
          key={suggestion.id} 
          suggestion={suggestion} 
          onAction={() => onAction?.(suggestion)}
        />
      ))}
    </div>
  );
}
